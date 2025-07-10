<template>
  <!-- Sidebar Overlay (for mobile) -->
  <div
    v-if="isOpen && isMobile"
    class="fixed inset-0 bg-white bg-opacity-40 z-40 md:hidden"
    @click="closeSidebar"
  ></div>

  <!-- Sidebar -->
  <aside
    :class="[
      isMobile
        ? 'fixed top-0 left-0 h-full bg-white shadow-lg border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 w-[250px]'
        : 'h-full bg-white shadow-lg border-r border-gray-200 flex flex-col w-[250px]',
      isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : '',
    ]"
  >
    <!-- Close Button (mobile only) -->
    <button
      v-if="isMobile"
      @click="closeSidebar"
      class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      aria-label="Close Menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <!-- Logo -->
    <div class="w-full px-4 py-6 flex justify-center border-b border-gray-100">
      <img src="" alt="Logo" class="h-12 w-auto" />
    </div>

    <!-- Menu Items -->
    <nav class="flex-1 flex flex-col px-4 py-2">
      <!-- Home -->
      <router-link
        to="/"
        class="flex items-center gap-3 p-3 rounded-lg text-gray-700 mb-1"
        active-class="bg-[#2c344e] text-white border-l-4 border-blue-400"
        exact
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span class="text-sm">หน้าหลัก</span>
      </router-link>

      <!-- Calendar -->
      <router-link
        to="/reports"
        class="flex items-center gap-3 p-3 rounded-lg text-gray-700  mb-1"
        active-class="bg-[#2c344e] text-white border-l-4 border-blue-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span class="text-sm">ปฎิทินนัดหมาย</span>
      </router-link>

      <!-- Employees -->
      <div class="mb-1">
        <button
          @click="toggleMenu('employees')"
          class="flex items-center justify-between w-full p-3 rounded-lg text-gray-700"
        >
          <div class="flex items-center gap-3">
            <Users class="h-5 w-5" />
            <span class="text-sm">พนักงาน</span>
          </div>
          <svg
            :class="[
              'h-4 w-4 transition-transform duration-200',
              openMenu === 'employees' ? 'rotate-180' : '',
            ]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div v-show="openMenu === 'employees'" class="ml-8 mt-1 space-y-1">
          <router-link
            to="/users/employee"
            class="block p-2 text-sm text-gray-700"
            active-class="bg-[#2c344e] text-white font-medium border-l-2 border-blue-400"
          >ข้อมูลพนักงาน</router-link>
          <router-link
            to="/users/position"
            class="block p-2 text-sm text-gray-700"
            active-class="bg-[#2c344e] text-white font-medium border-l-2 border-blue-400"
          >ตำแหน่งงาน</router-link>
          <router-link
            to="/users/employeehistory"
            class="block p-2 text-sm text-gray-700"
            active-class="bg-[#2c344e] text-white font-medium border-l-2 border-blue-400"
          >ประวัติลงเวลา</router-link>
          <router-link
            to="/users/setworklocation"
            class="block p-2 text-sm text-gray-700"
            active-class="bg-[#2c344e] text-white font-medium border-l-2 border-blue-400"
          >ตั้งค่าสถานที่ทำงาน</router-link>
        </div>
      </div>

      <!-- Documents -->
      <div class="mb-1">
        <button
          @click="toggleMenu('documents')"
          class="flex items-center justify-between w-full p-3 rounded-lg text-gray-700"
        >
          <div class="flex items-center gap-3">
            <File class="h-5 w-5" />
            <span class="text-sm">เอกสาร</span>
          </div>
          <svg
            :class="[
              'h-4 w-4 transition-transform duration-200',
              openMenu === 'documents' ? 'rotate-180' : '',
            ]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div v-show="openMenu === 'documents'" class="ml-8 mt-1 space-y-1">
          <router-link
            to="/users/adddocument"
            class="block p-2 text-sm text-gray-700"
            active-class="bg-[#2c344e] text-white font-medium border-l-2 border-blue-400"
          >ยื่นเอกสาร</router-link>
          <router-link
            to="/users/mydocument"
            class="block p-2 text-sm text-gray-700"
            active-class="bg-[#2c344e] text-white font-medium border-l-2 border-blue-400"
          >เอกสารของฉัน</router-link>
        </div>
      </div>

      <!-- Finance -->
      <div class="mb-1">
        <button
          @click="toggleMenu('finance')"
          class="flex items-center justify-between w-full p-3 rounded-lg text-gray-700"
        >
          <div class="flex items-center gap-3">
            <Landmark class="h-5 w-5" />
            <span class="text-sm">การเงิน</span>
          </div>
          <svg
            :class="[
              'h-4 w-4 transition-transform duration-200',
              openMenu === 'finance' ? 'rotate-180' : '',
            ]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div v-show="openMenu === 'finance'" class="ml-8 mt-1 space-y-1">
          <router-link
            to="/finance/salary"
            class="block p-2 text-sm text-gray-700"
            active-class="bg-[#2c344e] text-white font-medium border-l-2 border-blue-400"
          >เงินเดือน</router-link>
          <router-link
            to="/finance/loan"
            class="block p-2 text-sm text-gray-700"
            active-class="bg-[#2c344e] text-white font-medium border-l-2 border-blue-400"
          >เงินกู้สวัสดิการ</router-link>
        </div>
      </div>

      <!-- Company -->
      <div class="mb-1">
        <button
          @click="toggleMenu('company')"
          class="flex items-center justify-between w-full p-3 rounded-lg text-gray-700"
        >
          <div class="flex items-center gap-3">
            <Building class="h-5 w-5" />
            <span class="text-sm">บริษัท</span>
          </div>
          <svg
            :class="[
              'h-4 w-4 transition-transform duration-200',
              openMenu === 'company' ? 'rotate-180' : '',
            ]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div v-show="openMenu === 'company'" class="ml-8 mt-1 space-y-1">
          <router-link
            to="/organization/structure"
            class="block p-2 text-sm text-gray-700"
            active-class="bg-[#2c344e] text-white font-medium border-l-2 border-blue-400"
          >โครงสร้างองค์กร</router-link>
          <router-link
            to="/organization/departments"
            class="block p-2 text-sm text-gray-700"
            active-class="bg-[#2c344e] text-white font-medium border-l-2 border-blue-400"
          >ตั้งค่าแผนก</router-link>
        </div>
      </div>
    </nav>
  </aside>

  <!-- Burger Button (mobile only) -->
  <button
    v-if="!isOpen && isMobile"
    @click="openSidebar"
    class="fixed top-4 left-4 z-50 bg-white shadow-md rounded-full p-2 text-gray-700 md:hidden"
    aria-label="Open Menu"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ไม่ต้อง import backend/module ใด ๆ แล้ว
const isOpen = ref(false)
const isMobile = ref(false)
const openMenu = ref('')

// ฟังก์ชันเปิด/ปิด sidebar
const openSidebar = () => { isOpen.value = true }
const closeSidebar = () => { isOpen.value = false }

// Toggle submenu
const toggleMenu = (menuName) => {
  openMenu.value = openMenu.value === menuName ? '' : menuName
}

// ตรวจสอบหน้าจอว่าเป็น mobile หรือไม่
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>




<style scoped>
@media (max-width: 767px) {
  aside {
    transition: transform 0.3s;
    z-index: 50;
  }
}
</style>