<template>
  <!-- Sidebar Overlay (for mobile) -->
  <div v-if="isOpen && isMobile" class="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden" @click="closeSidebar"></div>

  <!-- Sidebar -->
  <aside :class="[isMobile
    ? 'fixed top-0 left-0 h-full bg-white shadow-lg border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 w-[250px]'
    : 'h-full bg-white shadow-lg border-r border-gray-200 flex flex-col w-[250px]',
    isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : '',
  ]">
    <!-- Close Button -->
    <button v-if="isMobile" @click="closeSidebar"
      class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" aria-label="Close Menu">
      ✕
    </button>

    <!-- Logo -->
    <div class="w-full px-4 py-6 flex justify-center border-b border-gray-100">
      <img src="https://via.placeholder.com/100x40?text=Logo" alt="Logo" class="h-12 w-auto" />
    </div>

    <!-- Menu Items -->
    <nav class="flex-1 flex flex-col px-4 py-2">
      <a href="#" class="flex items-center gap-3 p-3 rounded-lg text-gray-700 mb-1 hover:bg-gray-100">
        🏠
        <span class="text-sm">หน้าหลัก</span>
      </a>

      <a href="#" class="flex items-center gap-3 p-3 rounded-lg text-gray-700 mb-1 hover:bg-gray-100">
        📅
        <span class="text-sm">ปฏิทินนัดหมาย</span>
      </a>

      <!-- Employees -->
      <div class="mb-1">
        <button @click="toggleMenu('employees')"
          class="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
          <div class="flex items-center gap-3">
            👤
            <span class="text-sm">พนักงาน</span>
          </div>
          <span :class="['transition-transform duration-200', openMenu === 'employees' ? 'rotate-180' : '']">▼</span>
        </button>
        <div v-show="openMenu === 'employees'" class="ml-6 mt-1 space-y-1">
          <a href="#" class="block p-2 text-sm text-gray-600 hover:bg-gray-100 rounded">ข้อมูลพนักงาน</a>
          <a href="#" class="block p-2 text-sm text-gray-600 hover:bg-gray-100 rounded">ตั้งค่าตำแหน่ง</a>
          <a href="#" class="block p-2 text-sm text-gray-600 hover:bg-gray-100 rounded">ประวัติลงเวลา</a>
        </div>
      </div>

      <!-- Documents -->
      <div class="mb-1">
        <button @click="toggleMenu('documents')"
          class="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
          <div class="flex items-center gap-3">
            📄
            <span class="text-sm">เอกสาร</span>
          </div>
          <span :class="['transition-transform duration-200', openMenu === 'documents' ? 'rotate-180' : '']">▼</span>
        </button>
        <div v-show="openMenu === 'documents'" class="ml-6 mt-1 space-y-1">
          <a href="#" class="block p-2 text-sm text-gray-600 hover:bg-gray-100 rounded">ยื่นเอกสาร</a>
          <a href="#" class="block p-2 text-sm text-gray-600 hover:bg-gray-100 rounded">เอกสารของฉัน</a>
        </div>
      </div>
    </nav>
  </aside>

  <!-- Burger Button -->
  <button v-if="!isOpen && isMobile" @click="openSidebar"
    class="fixed top-4 left-4 z-50 bg-white shadow-md rounded-full p-2 text-gray-500 hover:text-gray-700 md:hidden"
    aria-label="Open Menu">
    ☰
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const isMobile = ref(false)
const openMenu = ref('')

// Mobile open/close
const openSidebar = () => { isOpen.value = true }
const closeSidebar = () => { isOpen.value = false }
const toggleMenu = (menuName) => {
  openMenu.value = openMenu.value === menuName ? '' : menuName
}

// Resize watcher
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
