<template>
  <div class="shadow-lg rounded-lg bg-white p-2">
    <!-- Profile Button -->
    <button @click="isOpen = !isOpen" class="flex items-center space-x-3 focus:outline-none group">
      <!-- Profile Picture (Left) -->
      <div
        class="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-200 group-hover:border-indigo-400 transition-colors duration-200">
        <img :src="imageError ? fallbackAvatar : userData.profile_img" alt="Profile" class="w-full h-full object-cover"
          @error="handleImageError" />
      </div>

      <!-- Name and Position (Right) -->
      <div class="text-left">
        <p class="text-base font-semibold text-gray-800 leading-tight">
          {{ userData.title }} {{ userData.firstName }} {{ userData.lastName }}
        </p>
        <p class="text-xs text-indigo-600 font-medium">
          {{ userData.position }}
        </p>
      </div>

      <!-- Dropdown Arrow -->
      <svg class="w-5 h-5 text-gray-500 transition-all duration-200" :class="{ 'rotate-180 text-indigo-600': isOpen }"
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <div v-show="isOpen" @click.away="isOpen = false"
        class="absolute right-0 mt-2 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 w-full">
        <!-- User Info -->
        <div class="px-4 py-3 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-200">
              <img :src="imageError ? fallbackAvatar : userData.profile_img" alt="Profile"
                class="w-full h-full object-cover" @error="handleImageError" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">
                {{ userData.title }} {{ userData.firstName }} {{ userData.lastName }}
              </p>
              <p class="text-xs text-gray-500 truncate">
                {{ userData.email }}
              </p>
              <p class="text-xs text-indigo-500 mt-1">
                {{ userData.position }}
              </p>
            </div>
          </div>
        </div>

        <!-- Profile Button -->
        <a href="#" @click="isOpen = false"
          class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150">
          <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>โปรไฟล์ของฉัน</span>
        </a>

        <!-- Logout Button -->
        <button @click="logout"
          class="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-150">
          <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const imageError = ref(false)

const userData = {
  title: 'คุณ',
  firstName: 'สมชาย',
  lastName: 'ใจดี',
  email: 'somchai@example.com',
  position: 'เจ้าหน้าที่บัญชี',
  profile_img: ''
}

const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
  userData.firstName
)}+${encodeURIComponent(userData.lastName)}&background=4f46e5&color=fff&size=128`

const handleImageError = () => {
  imageError.value = true
}

const logout = () => {
  alert('ออกจากระบบแล้ว (mock)')
  isOpen.value = false
}
</script>
