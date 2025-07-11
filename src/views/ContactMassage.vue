<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="bg-neutral-800  min-h-screen">
      <div class="max-w-7xl mx-auto ">
        <div class="bg-white py-20 md:px-12">
          <div class="flex flex-col md:flex-row md:justify-between items-center">

            <div class="lg:w-3/5 md:w-4/6 px-8 space-y-3">
              <div class="flex flex-col mb-10">
                <label class="text-2xl font-bold">ติดต่อเรา</label>
                <label class="text-stone-400">ทีมงานของเรายินดีที่จะรับฟังความคิดเห็ฯจากคุณเสมอ</label>
              </div>

              <div class="flex flex-col md:flex-row gap-4 items-center">
                <div class="flex flex-col w-full">
                  <label class="text-sm">ชื่อ</label>
                  <input type="text" class="border w-full rounded-full py-2 px-4" placeholder="ชื่อ" />
                </div>
                <div class="flex flex-col w-full">
                  <label class="text-sm">นามสกุล</label>
                  <input type="text" class="border w-full rounded-full py-2 px-4" placeholder="นามสกุล" />
                </div>
              </div>

              <div class="flex flex-col w-full">
                <label class="text-sm">อีเมล</label>
                <input type="email" class="border w-full rounded-full py-2 px-4" placeholder="you@company.com" />
              </div>

              <div class="flex flex-col w-full">
                <label class="text-sm">เบอร์มือถือ</label>
                <input ref="phoneInput" type="tel" class="border w-full rounded-full py-2 pr-4"
                  placeholder="+1 (555) 000-0000" />
              </div>

              <div class="flex flex-col w-full">
                <label class="text-sm">ข้อความ</label>
                <textarea class="border w-full rounded-2xl py-2 px-4 resize-none" rows="5"
                  placeholder="พิมพ์ข้อความของคุณที่นี่..."></textarea>
              </div>

              <div class="text-xs text-stone-400 space-x-2 flex justify-center items-center">
                <input type="checkbox" id="accept" v-model="isAccepted"
                  class="mt-0.5 w-4 h-4 border border-stone-200 accent-yellow-300 rounded" />
                <label>คุณยอมรับเงื่อนไขการใช้งานของเรา</label>
                <button class="underline" @click="openHouseLoan">privacy policy</button>
              </div>

              <div class="pt-5">
                <button :disabled="!isAccepted" :class="[
                  'font-bold w-full py-2 rounded-full transition',
                  isAccepted ? 'bg-yellow-400 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                ]">
                  ส่งข้อความ
                </button>
              </div>
            </div>

            <div class="lg:w-2/5 md:w-2/6 hidden md:block pr-10">
              <div class="bg-yellow-400 rounded-3xl h-[580px] flex flex-col">
                <img src="/img/Toscontact.png" class="w-full object-contain" />
                <div class="flex-grow flex flex-col justify-end lg:items-center items-end px-2 pb-4 lg:pb-6">
                  <label class="text-sm py-4 hidden lg:block">ติดตามเราได้ที่</label>
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
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, } from 'vue'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.css'

import Bar from "../components/BarLoneTossagun.vue"
import Footer from "../components/FooterLoneTossagun.vue"


const isLoading = ref(true)

const phoneInput = ref(null)
const isAccepted = ref(false)

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'auto' })
  
  intlTelInput(phoneInput.value, {
    initialCountry: 'th',
    preferredCountries: ['th', 'us', 'gb'],
    utilsScript:
      'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js',
  })
})

function openHouseLoan() {
  window.open('https://example.com/loan/house', '_blank');
}

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'auto' })
})
</script>

<style></style>