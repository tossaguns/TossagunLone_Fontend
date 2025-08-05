<template>
  <div class="relative min-h-screen bg-gradient-to-b from-white via-stone-300 to-stone-500 overflow-hidden">
    <!-- 👇 ส่วนเนื้อหาอื่น เช่นกล่อง login หรือรูป -->
    <div class="relative z-10">
      <div class="flex items-center justify-center min-h-screen mx-6">
        <div class="flex flex-col w-[500px] px-5 py-12 bg-white/30 hover:bg-white/60 transition-all duration-300 rounded-xl">
          <!-- ฝั่งรูปภาพ -->

          <div class="w-full flex items-center justify-center mb-12">
           <div class="bg-white/30  rounded-full p-2">
            <div class="bg-white/50 rounded-full p-4">
              <img :src="computedHotelImage" alt="logo"
                class=" w-[140px] h-[140px] object-cover rounded-l-full rounded-r-full shadow-xl ">
            </div>
           </div>
          </div>

          <!-- ฝั่งฟอร์ม -->
          <div class="w-full  h-auto lg:h-ful flex items-center justify-center ">
            <div class="w-full max-w-xl p-6  bg-white/60 hover:bg-white transition-all duration-300 mx-4 lg:rounded-r-l rounded-xl shadow-xl">
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
                  class="w-full bg-stone-600 text-white font-bold py-3 rounded-full hover:bg-stone-700 lg:text-base text-xs">
                  เข้าสู่ระบบ
                </button>

                <div class="flex items-center justify-center mt-4">
                  <button class="text-blue-500 text-sm underline underline-offset-2 hover:text-blue-600"
                    @click="router.push('/mainpartner')">
                    กลับเข้าสู่ SleepGunWeb
                  </button>
                </div>

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
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
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

    // เรียก API login พร้อม partnerId
    const loginData = {
      ...form,
      partnerId: currentPartnerId
    };
    console.log("Login data being sent:", loginData);
    const res = await axios.post("http://localhost:9999/HotelSleepGun/auth/login", loginData);
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

    // ใช้ authStore.login() แทนการจัดการ localStorage เอง
    const loginSuccess = authStore.login(res.data);

    if (loginSuccess) {
      console.log("Auth store login successful");
      console.log("Auth store user:", authStore.user);

      // route ไปตามสิทธิ์
      console.log("Routing based on role:", role);
      try {
        if (role === "adminPartner") {
          await router.push("/mainmanagepos");
        } else if (role === "employee") {
          await router.push("/profileemployee");
        } else if (role === "partner") {
          await router.push("/mainmanagepos");
        } else {
          error.value = "สิทธิ์ไม่ถูกต้อง";
        }
        console.log("Navigation successful");
      } catch (navError) {
        console.error("Navigation error:", navError);
        error.value = "เกิดข้อผิดพลาดในการนำทาง";
      }
    } else {
      error.value = "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
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
