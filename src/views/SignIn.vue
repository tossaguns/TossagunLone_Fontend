<template>
  <div>

    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto ">
        <div class="bg-white md:py-20 py-12 md:px-12">
          <div class="flex flex-col md:flex-row md:justify-between items-start">

            <div class="lg:w-3/5 md:w-4/6 px-8  w-full">
              <div class="flex flex-col mb-10 text-center">
                <label class="text-sm font-bold text-amber-400 pb-5">{{ t('Tossagun') }}</label>
                <label class="md:text-3xl text-xl font-bold">{{ t('LoginTopic') }}</label>
                <label class="text-stone-400 md:text-xs text-xxs">{{ t('LoginP') }}</label>
              </div>


              <div class="flex flex-col w-full lg:px-20 md:px-12 px-4 space-y-3 md:text-base text-sm py-8">
                <div>
                  <label class="text-sm text-stone-400">{{ t('Email') }}</label>
                  <input v-model="email" type="email" class="border w-full rounded-full py-2 px-4"
                    placeholder="you@company.com" />
                </div>
                <button class="border w-full rounded-full py-2 px-4 bg-amber-300 text-stone-600 font-semibold"
                  @click="handleSendOtp">{{ t('EmailLabel') }}</button>
              </div>


              <div class="flex items-center justify-center w-full pt-12 md:px-12">
                <hr class="flex-grow border-t border-gray-300" />
                <span class="mx-4 md:text-sm text-xxs text-gray-400 whitespace-nowrap">{{ t('SignInHr') }}</span>
                <hr class="flex-grow border-t border-gray-300" />
              </div>


              <div class="flex justify-center items-center md:space-x-4 space-x-6 mt-6">
                <button @click="handleSocialLogin('google')">
                  <img src="/img/icon/google2.png" class="md:h-16 h-12" />
                </button>
                <button @click="handleSocialLogin('facebook')">
                  <img src="/img/icon/facebook2.png" class="md:h-16 h-12" />
                </button>
                <button @click="handleSocialLogin('line')">
                  <img src="/img/icon/line2.png" class="md:h-16 h-12" />
                </button>
              </div>

              <div class="md:text-sm text-xxs my-12 md:px-12 px-4">
                <div class="flex justify-center items-center">
                  <label class="text-center">{{ t('Conditions1') }}<span class="text-amber-500 px-2">{{ t('Conditions2')
                  }}</span>{{ t('Conditions3') }}<span class="text-amber-500 px-2">{{ t('Conditions4')
                      }}</span></label>
                </div>
                <div class="flex flex-col justify-center items-center mt-6 space-y-3">
                  <label>{{ t('Copyright1') }}</label>
                  <label>{{ t('Copyright2') }}</label>
                </div>
              </div>
            </div>

            <div class="lg:w-2/5 md:w-2/6 hidden md:block pr-10">
              <div class="bg-amber-300 rounded-3xl h-[650px] flex flex-col">
                <img src="/Tossagun/welcom.png" class="w-full object-contain px-4 pt-4" />
                <div class="flex-grow flex flex-col lg:justify-end justify-center items-center  px-2 pb-4 lg:pb-6">
                  <label class="text-sm py-4 hidden lg:block">{{ t('ContactLabel') }}</label>
                  <div class="flex lg:flex-row md:flex-col pb-2 lg:space-x-3 space-y-5 lg:space-y-0 px-6">
                    <button class="w-10 h-10 bg-no-repeat bg-center bg-contain"
                      style="background-image: url('/img/Product/facebook.png');"></button>
                    <button class="w-10 h-10 bg-no-repeat bg-center bg-contain"
                      style="background-image: url('/img/Product/google.png');"></button>
                    <button class="w-10 h-10 bg-no-repeat bg-center bg-contain"
                      style="background-image: url('/img/Product/gps.png');"></button>
                    <button class="w-10 h-10 bg-no-repeat bg-center bg-contain"
                      style="background-image: url('/img/Product/phone.png');"></button>
                    <button class="w-10 h-10 bg-no-repeat bg-center bg-contain"
                      style="background-image: url('/img/Product/line.png');"></button>
                  </div>
                  <label class="text-sm py-4 hidden md:block lg:hidden px-6">ติดตามเราได้ที่</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import 'intl-tel-input/build/css/intlTelInput.css'
import Bar from "@components/BarHotelTossagun.vue"
import axios from 'axios'
import { ref, onMounted, } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isLoading = ref(true)

const email = ref('')

const handleSendOtp = async () => {
  if (!email.value) return alert('กรุณากรอกอีเมล')
  console.log('[Frontend] เริ่มส่ง OTP:', email.value)
  try {
    const res = await axios.post('http://localhost:9999/lonetossagun/otp/send-otp', {
      email: email.value
    })
    console.log('[Frontend] ส่ง OTP สำเร็จ:', res.data)
    alert('ส่ง OTP ไปที่อีเมลแล้ว')
  } catch (e) {
    console.error('[Frontend] ส่ง OTP ไม่สำเร็จ:', e)
    alert('ส่ง OTP ไม่สำเร็จ')
  }
}

const handleSocialLogin = async (provider) => {
  console.log('[Frontend] เริ่ม Social Login:', provider)
  if (provider === 'facebook') {
    window.FB.login(async (response) => {
      console.log('[Frontend] FB.login response:', response)
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken
        try {
          const res = await axios.post('http://localhost:9999/lonetossagun/registerLogin/facebook', {
            access_token: accessToken
          })
          console.log('[Frontend] Facebook login success:', res.data)
          alert('เข้าสู่ระบบด้วย Facebook สำเร็จ')
        } catch (e) {
          console.error('[Frontend] Facebook login error:', e)
          alert('เข้าสู่ระบบด้วย Facebook ล้มเหลว')
        }
      } else {
        alert('ผู้ใช้ยกเลิกการเข้าสู่ระบบ')
      }
    }, { scope: 'email' })
    return
  }
  if (provider === 'google') {
    if (!window.google || !window.google.accounts) {
      alert('Google SDK ยังไม่โหลด')
      return
    }

    window.google.accounts.id.initialize({
      client_id: '570631158736-7flpvf32qoao2ugfhqt145th0qg0nggg.apps.googleusercontent.com',
      callback: async (response) => {
        console.log('[Frontend] Google callback:', response)
        try {
          const res = await axios.post('http://localhost:9999/lonetossagun/registerLogin/google', {
            id_token: response.credential
          })
          console.log('[Frontend] Google login success:', res.data)
          alert('เข้าสู่ระบบด้วย Google สำเร็จ')
        } catch (e) {
          console.error('[Frontend] Google login error:', e)
          alert('เข้าสู่ระบบด้วย Google ล้มเหลว')
        }
      }
    })

    window.google.accounts.id.prompt()
    return
  }

  if (provider === 'line') {
    if (!window.liff) {
      alert('LIFF SDK ยังไม่โหลด')
      return
    }
    await window.liff.init({ liffId: 'YOUR_LIFF_ID' })
    if (!window.liff.isLoggedIn()) {
      window.liff.login()
      return
    }
    const idToken = window.liff.getIDToken()
    console.log('[Frontend] Line idToken:', idToken)
    try {
      const res = await axios.post('http://localhost:9999/lonetossagun/registerLogin/line', {
        id_token: idToken
      })
      console.log('[Frontend] Line login success:', res.data)
      alert('เข้าสู่ระบบด้วย Line สำเร็จ')
    } catch (e) {
      console.error('[Frontend] Line login error:', e)
      alert('เข้าสู่ระบบด้วย Line ล้มเหลว')
    }
    return
  }
}



onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'auto' })


})

</script>

<style></style>