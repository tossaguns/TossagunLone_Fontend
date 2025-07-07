<template>
  <div class="flex h-screen">
    <!-- 👉 Aside Desktop -->
    <aside class="hidden md:flex flex-col w-72 bg-white h-screen p-4">
      <div class="flex justify-center">
        <div class="flex flex-col items-center gap-2">
          <img src="../assets/logo3.png" alt="logo-chain" class="w-14 h-14 object-cover shadow-lg" />
          <p
            class="font-bold text-2xl bg-gradient-to-r from-[#FF0000] to-[#7E0000] bg-clip-text text-transparent tracking-wide text-center">
            CHAIN PARTNER
          </p>
        </div>
      </div>

      <div class="divider"></div>

      <div class="w-full text-base">
        <!-- Dashboard -->
        <div class="border-2 rounded-lg mb-4 hover:bg-red-50 transition-colors hover:border-red-400">
          <a href="#" class="flex items-center gap-2 p-3 font-medium hover:text-red-700">
            <Home class="w-5 h-5" />
            DASHBOARD
          </a>
        </div>

        <!-- Product -->
        <div class="border-2 rounded-lg mb-4 hover:bg-red-50 transition-colors hover:border-red-400">
          <router-link to="/partnerproduct"
            class="flex items-center gap-2 text-gray-700 p-3 font-medium hover:text-red-700">
            <Package class="w-5 h-5" />
            Course
          </router-link>
        </div>

        <!-- My Order -->
        <div class="border-2 rounded-lg mb-4 hover:bg-red-50 transition-colors hover:border-red-400">
          <router-link href="#" class="flex items-center gap-2 text-gray-700 p-3 font-medium hover:text-red-700">
            <ShoppingCart class="w-5 h-5" />
            คำสั่งซื้อของฉัน
          </router-link>
        </div>

        <!-- Promotion -->
        <div class="border-2 rounded-lg mb-4 hover:bg-red-50 transition-colors hover:border-red-400">
          <router-link to="/promotion" class="flex items-center gap-2 text-gray-700 p-3 font-medium hover:text-red-700">
            <Percent class="w-5 h-5" />
            โปรโมชั่น
          </router-link>
        </div>

      </div>

      <!-- Logout -->
      <div class="mt-auto p-2">
        <button @click="authStore.logout()"
          class="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors w-full p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50">
          <LogOut class="w-5 h-5" />
          ออกจากระบบ
        </button>
      </div>
    </aside>

    <!-- 👉 Mobile Aside (Overlay + Drawer) -->
    <div v-if="isMobileAsideOpen" class="fixed inset-0 z-50 flex md:hidden">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="toggleMobileAside"></div>

      <!-- Aside Drawer -->
      <aside class="relative w-72 bg-white h-full p-4 z-50 shadow-lg animate-slide-in flex flex-col">
        <div class="flex justify-center">
          <div class="flex flex-col items-center gap-2">
            <img src="../assets/logo3.png" alt="logo-chain" class="w-14 h-14 object-cover shadow-lg" />
            <p
              class="font-bold text-2xl bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent tracking-wide text-center">
              CHAIN PARTNER
            </p>
          </div>
        </div>

        <div class="divider"></div>

        <div class="w-full text-base">
          <!-- Dashboard -->
          <div class="border-2 rounded-lg mb-4 hover:bg-red-50 transition-colors hover:border-red-400">
            <a href="#" class="flex items-center gap-2 p-3 font-medium hover:text-red-700">
              <Home class="w-5 h-5" />
              DASHBOARD
            </a>
          </div>

          <!-- Product -->
          <div class="border-2 rounded-lg mb-4 hover:bg-red-50 transition-colors hover:border-red-400">
            <router-link to="/partnerproduct"
              class="flex items-center gap-2 text-gray-700 p-3 font-medium hover:text-red-700">
              <Package class="w-5 h-5" />
              Course
            </router-link>
          </div>

          <!-- My Order -->
          <div class="border-2 rounded-lg mb-4 hover:bg-red-50 transition-colors hover:border-red-400">
            <router-link href="#" class="flex items-center gap-2 text-gray-700 p-3 font-medium hover:text-red-700">
              <ShoppingCart class="w-5 h-5" />
              คำสั่งซื้อของฉัน
            </router-link>
          </div>

          <!-- Promotion -->
          <div class="border-2 rounded-lg mb-4 hover:bg-red-50 transition-colors hover:border-red-400">
            <router-link to="/promotion"
              class="flex items-center gap-2 text-gray-700 p-3 font-medium hover:text-red-700">
              <Percent class="w-5 h-5" />
              โปรโมชั่น
            </router-link>
          </div>


        </div>

        <!-- Logout -->
        <div class="mt-auto p-2">
          <button @click="authStore.logout()"
            class="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors w-full p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50">
            <LogOut class="w-5 h-5" />
            ออกจากระบบ
          </button>
        </div>
      </aside>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col flex-1">
      <header
        class="h-14 bg-gradient-to-r from-[#B7033F] to-[#5F0000] shadow-md text-white flex items-center px-4 justify-between">
        <div class="flex items-center gap-2">
          <button @click="toggleMobileAside" class="md:hidden text-2xl">
            ☰
          </button>
          <span class="text-sm md:text-base">PARTNER</span>
        </div>
      </header>

      <main class="flex-1 p-4 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Settings, Home, Package, ShoppingCart, Percent, LogOut } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const isMobileAsideOpen = ref(false);

function toggleMobileAside() {
  isMobileAsideOpen.value = !isMobileAsideOpen.value;
}
</script>

<style scoped>
@keyframes slide-in {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out forwards;
}
</style>
