<template>
  <div class="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
    <h2 class="text-2xl font-bold mb-4 text-center">เข้าสู่ระบบพนักงาน</h2>

    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label class="block mb-1">Username</label>
        <input type="text" v-model="form.username" class="w-full border px-3 py-2 rounded" required />
      </div>

      <div class="mb-4">
        <label class="block mb-1">Password</label>
        <input type="password" v-model="form.password" class="w-full border px-3 py-2 rounded" required />
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        เข้าสู่ระบบ
      </button>

      <p v-if="error" class="text-red-600 mt-3">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const form = reactive({
  username: "",
  password: "",
});

const error = ref("");

const handleLogin = async () => {
  error.value = "";
  try {
    const res = await axios.post("http://localhost:9999/HotelSleepGun/auth/login", form);
    const { token, role } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    // route ไปตามสิทธิ์
    if (role === "adminPartner") {
      router.push("/addroom");
    } else if (role === "employee") {
      router.push("/addpromotion");
      // มาเเก้เราท์ตรงนี้
    } else if (role === "partner") {
      router.push("/addroom"); // เพิ่มกรณี partner หลัก login ได้
    } else {
      error.value = "สิทธิ์ไม่ถูกต้อง";
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      error.value = err.response.data.message;
    } else {
      error.value = "เกิดข้อผิดพลาดในระบบ";
    }
  }
};
</script>
