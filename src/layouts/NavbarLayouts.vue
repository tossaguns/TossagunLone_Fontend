<script setup>
import { ref } from "vue";
import Contact from '../components/Contact.vue';

const showSidebar = ref(false);
const showContact = ref(false);

function toggleSidebar() {
  showSidebar.value = !showSidebar.value;
}
</script>

<template>
  <!-- Overlay -->
  <div v-if="showSidebar" class="fixed inset-0 bg-black bg-opacity-30 z-30" @click="toggleSidebar"></div>

  <!-- Sidebar -->
  <aside class="fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-40"
    :class="{ '-translate-x-full': !showSidebar, 'translate-x-0': showSidebar }">
    <div class="p-4">
      <div class="flex justify-center cursor-pointer">
        <img src="../assets/.jpg" alt="logo-chain" class="w-24 h-24" />
      </div>

      <div class="divider"></div>
      <!-- กล่องแสดงจำนวนเงินและปุ่มเติมเงิน -->
      <div class="mt-6 bg-red-500 p-4 rounded-lg shadow-inner text-center">
        <div class="text-lg font-semibold text-white">ยอดเงินของคุณ</div>
        <div class="text-2xl font-bold mt-2">
          <span class="text-white">฿ </span>
          <span class="text-white">15,000.00</span>
        </div>
        <router-link to="/wallet">
          <button class="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
            กระเป๋าของฉัน
          </button>
        </router-link>
      </div>

      <ul class="mt-4 space-y-2">
        <li>
          <router-link to="/homepage" class="block px-2 py-1 hover:bg-gray-100 rounded">
            หน้าแรก
          </router-link>
        </li>

        <li>
          <router-link to="/filterproduct" class="block px-2 py-1 hover:bg-gray-100 rounded">
            Course
          </router-link>
        </li>
        <li>
          <router-link to="/orderhistory" class="block px-2 py-1 hover:bg-gray-100 rounded">
            ประวัติการสั่งซื้อ
          </router-link>
        </li>

        <li>
          <a @click="showContact = true" class="block px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
            ติดต่อเรา
          </a>
        </li>
      </ul>
    </div>
  </aside>
  <Contact v-if="showContact" @close="showContact = false" />

  <!-- Header -->
  <header class="bg-white shadow px-4 py-3 flex justify-between items-center">
    <div class="flex items-center space-x-4 cursor-pointer">
      <button class="px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300" @click="toggleSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <router-link to="homepage">
        <div class="flex items-center gap-2">
          <img src="../assets/logo2.jpg" alt="logo-chain" class="w-12 h-12 object-cover rounded-full" />
          <p class="font-bold text-xl bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
            CHAIN
          </p>
        </div>
      </router-link>
    </div>

    <div class="hidden lg:flex flex-1 justify-center">
      <input type="text"
        class="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="ค้นหาCourseภายในเว็บ" />
    </div>

    <div class="flex gap-3">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="badge badge-sm indicator-item">8</span>
          </div>
        </div>
        <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
          <div class="card-body">
            <span class="text-lg font-bold">8 Items</span>
            <span class="text-info">Subtotal: $999</span>
            <div class="card-actions">
              <button class="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div>

      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>

      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-white z-50 rounded-box mt-3 w-52 p-2 shadow">
          <li>
            <router-link to="/emarketprofile">โปรไฟล์</router-link>
          </li>
          <li>
            <a>ออกจากระบบ</a>
          </li>
        </ul>


      </div>
    </div>
  </header>

  <slot />
</template>
