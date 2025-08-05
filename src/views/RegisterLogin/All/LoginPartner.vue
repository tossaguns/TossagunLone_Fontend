<template>
  <div class="px-10 mt-8">
    <div class="flex flex-col justify-center items-center">
      <div>
        <div class="relative mt-8">
          <div class="relative">
            <p class="my-1">UserName</p><!--username-->
            <input v-model="username" placeholder="Username" class="border w-full py-2 px-3 mb-4 rounded-md" />
            <p class="my-1">Password</p><!--password-->
            <div class="relative w-full mb-4 ">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password"
                class="border w-full py-2 px-3 pr-10 rounded-md" />
              <button type="button" @click="togglePassword"
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <span v-if="showPassword">🙉</span>
                <span v-else>🙈</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <div class="flex justify-center space-x-3 mt-12 text-xs">
        <button @click="submitForm" class="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-500">Login
          Partner</button>
        <button class="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-500">กลับหน้าหลัก</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import axios from 'axios'


const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

function navigateToRegisterPartner() {
  router.push('/registerpartner')
}

function goBack() {
  router.back()
}

const submitForm = async () => {
  errorMessage.value = ''
  try {
    // 1. Login
    const response = await axios.post('http://localhost:9999/HotelSleepGun/partnerLogin/login', {
      username: username.value,
      password: password.value,
    })

    const { token, partner } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('partnerId', partner._id)
    localStorage.setItem('partner', JSON.stringify(partner))

    // 2. ตรวจสอบ isProfileComplete
    const partnerRes = await axios.get(`http://localhost:9999/HotelSleepGun/partner/get/${partner._id}`)
    const partnerData = partnerRes.data

    if (!partnerData.isProfileComplete) {
      router.push('/importantdata')
    } else {
      router.push('/logincompany')
    }
  } catch (error) {
    console.error("❌ Login failed:", error)
    if (error.response) {
      errorMessage.value = error.response.data.message || 'Login ล้มเหลว'
    } else {
      errorMessage.value = 'เกิดข้อผิดพลาดในการเชื่อมต่อ'
    }
  }
}
</script>
