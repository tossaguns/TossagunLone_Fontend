<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Home, Bird, UserRoundCog, BadgeCheck, ShoppingCart, Settings, Package, ChevronDown, ChevronUp, LogOut, CheckCircle, Clock, Menu } from 'lucide-vue-next'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const authStore = useAuthStore()

const isCourseSubmenuOpen = ref(false)

const gotoDashboard = () => router.push('/admin')
const gotoApprove = () => router.push('/admin/approve')
const gotoCategory = () => router.push('/admin/courses')
const gotoProduct = () => router.push('/admin/createcourse')

// State for search input
const isUserDropdownOpen = ref(false)

// Function to handle logout (assuming authStore.logout() is available in parent)
const handleLogout = () => {
  console.log('Logging out...')
  authStore.logout();
  isUserDropdownOpen.value = false // Close dropdown after action
}

// Function to toggle mobile aside (passed from parent)
const emit = defineEmits(['toggleMobileAside', 'logout']) // Emit to parent if logout is handled there
const user = ref(JSON.parse(localStorage.getItem('user')));
console.log('user Data : ', user)


</script>

<template>

  <Header></Header>

  <div class="flex h-screen bg-gray-100 font-sans">

    <aside class="hidden md:flex flex-col w-72 bg-white border-r border-gray-200 shadow-lg h-full overflow-y-auto">
      <div class="flex flex-col items-center py-8 px-4">
        <router-link to="/admin">
          <img src="../assets/logo3.png" alt="logo"
            class="w-20 h-20 rounded-full object-cover border-4 border-purple-200 shadow-md" />
        </router-link>
        <h1
          class="mt-3 text-2xl font-extrabold bg-gradient-to-r from-purple-700 to-indigo-900 bg-clip-text text-transparent tracking-wide">
          PCElemac ADMIN
        </h1>
        <p class="text-purple-300">
          <b> user ID: </b>
          {{ user.username }}
        </p>
      </div>

      <nav class="flex-1 space-y-2 px-4">
        <p class="text-gray-400">Dashboard</p>
        <SidebarItem icon="Home" label="Attendance Report" @click="gotoDashboard" />
        <SidebarItem icon="BadgeCheck" label="Register Report" @click="gotoApprove" />

        <div class="rounded-lg transition-all duration-100"
          :class="isCourseSubmenuOpen ? 'bg-purple-100 shadow-sm' : 'hover:bg-purple-50'">


          <!-- Attendance Report -->
          <router-link to="/admin"
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors duration-200"
            active-class="bg-purple-100 text-purple-700 font-semibold">
            <Home class="w-5 h-5 text-purple-600" />
            Attendance Report
          </router-link>
        </div>

        <!-- Register User Report -->
        <router-link to="/admin/registrations"
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors duration-200"
          active-class="bg-purple-100 text-purple-700 font-semibold">
          <Bird class="w-5 h-5 text-purple-600" />
          Registration Report
        </router-link>

        <p class="text-gray-400">other</p>

        <!-- open sidebar sub menu -->
        <div @click="isCourseSubmenuOpen = !isCourseSubmenuOpen"
          class="flex justify-between items-center p-3 cursor-pointer font-medium text-gray-700 hover:text-purple-700 transition-colors duration-200">

          <!-- Course Menu -->
          <div class="flex items-center gap-3">
            <Package class="w-5 h-5 text-purple-600" />
            Add Course
          </div>

          <!-- Change Logo to Up and Down if Open Menu -->
          <component :is="isCourseSubmenuOpen ? ChevronUp : ChevronDown" class="w-4 h-4 text-gray-500" />

          <!-- Course Menu Options -->
        </div>
        <transition name="slide-fade">
          <div v-if="isCourseSubmenuOpen" class="ml-10 pb-2 space-y-2 text-sm">
            <div @click="gotoCategory"
              class="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-purple-700 transition-colors duration-200">
              <Clock class="w-4 h-4 text-purple-500" />
              รายการ Courses
            </div>
            <div @click="gotoProduct"
              class="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-purple-700 transition-colors duration-200">
              <CheckCircle class="w-4 h-4 text-purple-500" />
              สร้าง Course
            </div>
          </div>
        </transition>
        <!-- Add Employee -->
        <router-link to="/admin/addEmployee"
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors duration-200"
          active-class="bg-purple-100 text-purple-700 font-semibold">
          <UserRoundCog class="w-5 h-5 text-purple-600" />
          Add Employee
        </router-link>


        <!-- Profile Setting -->
        <router-link to="/admin/setting"
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors duration-200"
          active-class="bg-purple-100 text-purple-700 font-semibold">
          <Settings class="w-5 h-5 text-purple-600" />
          ตั้งค่าข้อมูล
        </router-link>

        <!-- Send Email -->
        <router-link to="/admin/sendemail"
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors duration-200"
          active-class="bg-purple-100 text-purple-700 font-semibold">
          <Clock class="w-5 h-5 text-purple-600" />
          SendEmail
        </router-link>
      </nav>

      <!-- Logoff -->
      <div class="p-4 border-t border-gray-200">
        <button @click="handleLogout"
          class="flex items-center justify-center gap-3 w-full p-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors duration-200 shadow-md">
          <LogOut class="w-5 h-5" />
          ออกจากระบบ
        </button>
      </div>
    </aside>

    <div class="flex flex-col flex-1">

      <main
        class="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-indigo-950 text-gray-900 dark:text-gray-100">
        <div class="max-w-full mx-auto">
          <slot />
          <Footer></Footer>
        </div>
      </main>

    </div>

  </div>

</template>

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

/* Transition for submenu */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Transition for dropdown menu */
.slide-fade-down-enter-active,
.slide-fade-down-leave-active {
  transition: all 0.2s ease-out;
}

.slide-fade-down-enter-from,
.slide-fade-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
