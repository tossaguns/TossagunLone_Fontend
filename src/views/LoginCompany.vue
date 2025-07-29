<template>
  <div class="relative min-h-screen bg-gradient-to-b from-white via-stone-300 to-stone-500 overflow-hidden">

   

    <!-- 👇 ส่วนเนื้อหาอื่น เช่นกล่อง login หรือรูป -->
    <div class="relative z-10">
      <div class="flex items-center justify-center min-h-screen mx-6">
        <div class="flex flex-col lg:flex-row lg:h-[40vh] w-full lg:shadow-lg">
          <!-- ฝั่งรูปภาพ -->
          <div
            class="w-full lg:w-1/2 2xl:w-2/3 lg:h-full flex items-center justify-center relative overflow-hidden rounded-t-xl lg:rounded-l-xl lg:rounded-none">
            <!-- รูปภาพพื้นหลัง -->
            <div class="hidden lg:block">
              <img :src="computedHotelImage" alt="logo" class="absolute inset-0 w-full h-full object-cover z-0">

              <!-- เงาด้านบน -->
              <div class="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent z-10"></div>
              <!-- เงาด้านล่าง -->
              <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent z-10">
              </div>

              <!-- ข้อความซ้อนบนรูป -->
              <div class="absolute z-20 text-center text-white px-4 top-10 transform -translate-x-1/2">
                <h2 class="text-3xl font-bold drop-shadow-md">เข้าสู่ระบบที่พัก</h2>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/2 2xl:w-2/3 lg:h-full flex items-center justify-center lg:hidden mb-8">
            <img :src="computedHotelImage" alt="logo"
              class="lg:w-full lg:h-full w-[100px] h-[100px] object-cover lg:rounded-l-xl lg:rounded-none rounded-l-full rounded-r-full shadow-xl lg:shadow-none">
          </div>


          <!-- ฝั่งฟอร์ม -->
          <div
            class="w-full lg:w-1/2 2xl:w-1/3 h-auto lg:h-full flex items-center justify-center lg:bg-white lg:rounded-r-xl lg:py-8">
            <div
              class="w-full max-w-xl p-6  bg-white mx-4 lg:rounded-r-xl rounded-xl shadow-xl lg:shadow-none">
              <h2 class="lg:text-2xl text-base font-bold text-center text-stone-400 lg:hidden">เข้าสู่ระบบที่พัก</h2>
              <h2 class="text-center text-lg font-bold text-stone-700 mb-6 ">{{ companyName }}</h2>

              <form @submit.prevent="handleLogin">
                <div class="mb-4">
                  <label class="block mb-1 md:text-sm text-xs text-stone-500">Username</label>
                  <input type="text" v-model="form.username" class="w-full border px-3 py-2 rounded" required
                    autocomplete="username" />
                </div>

                <div class="mb-4">
                  <label class="block mb-1 md:text-sm text-xs text-stone-500">Password</label>
                  <input type="password" v-model="form.password" class="w-full border px-3 py-2 rounded" required
                    autocomplete="current-password" />
                </div>

                <button type="submit"
                  class="w-full lg:bg-amber-400 bg-stone-600 text-white font-bold py-3 rounded-full lg:hover:bg-amber-500 hover:bg-stone-700 lg:text-base text-xs">
                  เข้าสู่ระบบ
                </button>

                <p v-if="error" class="text-red-600 mt-3 text-sm">{{ error }}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const form = reactive({
  username: "",
  password: "",
});

const error = ref("");
const companyName = ref("โรงแรมตัวอย่าง"); // ข้อมูลจำลอง
const hotelImage = ref("/imgHotel/hotel/loginCompany.jpg"); // default image

// คำนวณ URL รูปภาพ
const computedHotelImage = computed(() => {
  if (hotelImage.value.startsWith('http')) {
    return hotelImage.value;
  } else if (hotelImage.value.startsWith('/uploads/')) {
    return `http://localhost:9999${hotelImage.value}`;
  } else {
    return hotelImage.value;
  }
});

// โหลดข้อมูล hotel จากฐานข้อมูล
const loadHotelData = async () => {
  try {
    const partnerId = localStorage.getItem('partnerId');

    if (!partnerId) {
      console.log("ไม่พบ partnerId ใน localStorage - redirect ไปหน้า login");
      router.push('/loginpartner');
      return;
    }

    const response = await axios.get(`http://localhost:9999/HotelSleepGun/partner/hotelLogin/${partnerId}`);
    const data = response.data;

    // ตรวจสอบว่าข้อมูลที่ได้เป็นของ partner นี้จริงหรือไม่
    if (!data.companyName) {
      console.error("ไม่พบข้อมูลโรงแรมสำหรับ partner นี้");
      router.push('/loginpartner');
      return;
    }

    companyName.value = data.companyName || "โรงแรมตัวอย่าง";
    hotelImage.value = data.imageHotelOurDoor || "/imgHotel/hotel/loginCompany.jpg";

    console.log("โหลดข้อมูล hotel สำเร็จ:", data);
  } catch (error) {
    console.error("ไม่สามารถโหลดข้อมูล hotel ได้:", error);
    // ถ้าเกิด error ให้ redirect ไปหน้า login
    router.push('/loginpartner');
  }
};

const handleLogin = async () => {
  error.value = "";
  try {
    // ตรวจสอบว่ามี partnerId ใน localStorage หรือไม่
    const currentPartnerId = localStorage.getItem('partnerId');
    if (!currentPartnerId) {
      error.value = "กรุณาเข้าสู่ระบบเป็น Partner ก่อน";
      return;
    }

    // เรียก API login
    const res = await axios.post("http://localhost:9999/HotelSleepGun/auth/login", form);
    const { token, role, user, partner } = res.data;

    console.log("Login response:", res.data);
    console.log("Current partnerId:", currentPartnerId);
    console.log("User object:", user);
    console.log("User _id:", user?._id);
    console.log("User partnerId:", user?.partnerId);
    console.log("Partner object:", partner);
    console.log("Partner _id:", partner?._id);

    // ตรวจสอบว่า user ที่ login เป็นของโรงแรมนี้หรือไม่
    if (role === "partner") {
      // ถ้าเป็น partner ต้องเป็นคนเดียวกันกับที่ login ไว้
      // ตรวจสอบจาก user._id เพราะ API ส่งข้อมูลมาใน user object
      console.log("Checking partner login - user._id:", user._id, "currentPartnerId:", currentPartnerId);
      if (user._id !== currentPartnerId) {
        error.value = "คุณไม่มีสิทธิ์เข้าสู่ระบบโรงแรมนี้";
        return;
      }
      console.log("Partner login successful");
    } else if (role === "adminPartner" || role === "employee") {
      // ถ้าเป็น employee ต้องตรวจสอบว่าเป็นของ partner นี้หรือไม่
      if (user.partnerId && user.partnerId !== currentPartnerId) {
        error.value = "คุณไม่มีสิทธิ์เข้าสู่ระบบโรงแรมนี้";
        return;
      }
      // ถ้าไม่มี partnerId ใน user object ให้ผ่าน (อาจเป็น employee เก่าหรือ admin)
      console.log("Employee login successful - no partnerId check needed");
    } else {
      error.value = "สิทธิ์ไม่ถูกต้อง";
      return;
    }

    // ถ้าผ่านการตรวจสอบแล้ว บันทึกข้อมูล
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Storing data in localStorage:", { token, role, user });
      console.log("localStorage after setting:", {
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
        user: localStorage.getItem("user")
      });
    } catch (storageError) {
      console.error("localStorage error:", storageError);
      error.value = "เกิดข้อผิดพลาดในการบันทึกข้อมูล";
      return;
    }

    // route ไปตามสิทธิ์
    console.log("Routing based on role:", role);
    try {
      if (role === "adminPartner") {
        await router.push("/addroom");
      } else if (role === "employee") {
        await router.push("/profileemployee");
      } else if (role === "partner") {
        await router.push("/addroom");
      } else {
        error.value = "สิทธิ์ไม่ถูกต้อง";
      }
      console.log("Navigation successful");
    } catch (navError) {
      console.error("Navigation error:", navError);
      error.value = "เกิดข้อผิดพลาดในการนำทาง";
    }
  } catch (err) {
    console.error("Login error:", err);
    if (err.response && err.response.data && err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = "เกิดข้อผิดพลาดในระบบ";
    }
  }
};

// โหลดข้อมูลเมื่อ component mount
onMounted(() => {
  // ตรวจสอบว่ามี partnerId ใน localStorage หรือไม่
  const partnerId = localStorage.getItem('partnerId');
  if (!partnerId) {
    // ถ้าไม่มี partnerId ให้ redirect ไปหน้า login partner
    router.push('/loginpartner');
    return;
  }

  loadHotelData();
});
</script>
