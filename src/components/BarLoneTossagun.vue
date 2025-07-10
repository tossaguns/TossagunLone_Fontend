<template>
  <div class="bg-neutral-800 w-full">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex flex-row items-center justify-between py-4 px-4">

        <div @click="goToMain" class="flex items-center gap-2 w-1/4">
          <img class="w-8 h-8 object-contain" src="/img/Bar/Tossagun.png" alt="Logo" />
          <label class="text-white font-bold text-lg leading-none">TOSSAGUN</label>
        </div>

        <div class="hidden lg:block w-2/4">
          <div class="bg-neutral-700 rounded-full px-6 py-2">
            <div class="flex justify-between text-sm font-semibold ">
              <button @click="goToMain" class="text-white hover:text-yellow-400">หน้าหลัก</button>

              <div class="relative group">
                <button class="text-white hover:text-yellow-400">ผลิตภัณฑ์</button>
                <div
                  class="absolute top-full left-0 bg-white text-black rounded-md mt-2 p-4 shadow-lg w-48 hidden group-hover:block z-50">
                  <ul class="space-y-2 text-sm">
                    <li><a href="/mainhouse" class="hover:underline">สินเชื่อบ้าน</a></li>
                    <li><a href="#" class="hover:underline">สินเชื่อรถ</a></li>
                    <li><a href="#" class="hover:underline">สินเชื่อบุคล</a></li>
                    <li><a href="#" class="hover:underline">บริการอื่นๆ</a></li>
                  </ul>
                </div>
              </div>

              <div class="relative group">
                <button class="text-white hover:text-yellow-400">โปรโมชั่น</button>
                <div
                  class="absolute top-full left-0 bg-white text-black rounded-md mt-2 p-4 shadow-lg w-48 hidden group-hover:block z-50">
                  <ul class="space-y-2 text-sm">
                    <li><a href="#" class="hover:underline">สินเชื่อบ้าน</a></li>
                    <li><a href="#" class="hover:underline">สินเชื่อรถ</a></li>
                    <li><a href="#" class="hover:underline">สินเชื่อบุคล</a></li>
                    <li><a href="#" class="hover:underline">บริการอื่นๆ</a></li>
                  </ul>
                </div>
              </div>

              <div class="relative group">
                <button class="text-white hover:text-yellow-400">เกี่ยวกับ</button>
                <div
                  class="absolute top-full left-0 bg-white text-black rounded-md mt-2 p-4 shadow-lg w-48 hidden group-hover:block z-50">
                  <ul class="space-y-2 text-sm">
                    <li><a href="#" class="hover:underline">เกี่ยวกับเรา</a></li>
                    <li><a href="#" class="hover:underline">ข่าวสาร</a></li>
                  </ul>
                </div>
              </div>

              <button class="text-white hover:text-yellow-400">FAQ</button>
              <button @click="goToContact" class="text-white hover:text-yellow-400">ติดต่อเรา</button>
            </div>
          </div>
        </div>

        <div class="lg:hidden w-2/4 flex justify-end">
          <button class="text-white focus:outline-none">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div class="hidden lg:block w-1/4 ">
          <div class="flex lg:justify-end">
            <button @click="goToSignin"
              class="bg-yellow-400 hover:bg-yellow-500 py-2 px-4 rounded-full text-sm font-semibold text-black">
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToContact() {
  router.push('/maptossagun')
}
function goToSignin() {
  router.push('/signin')
}
function goToMain() {
  router.push('/main')
}
</script>
<style></style>