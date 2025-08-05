<template>
  <!-- Desktop Sidebar -->
  <div
    class="hidden ml-2 md:flex flex-col fixed left-0 bg-white rounded-lg z-40 transition-[width] duration-300 ease-in-out"
    style="top: 1rem; bottom: 1rem; height: auto;" :class="isCollapsed ? 'w-[80px]' : 'w-[240px]'">

    <nav class="flex flex-col space-y-1 p-2 overflow-y-auto custom-scrollbar">

      <div class="m-2" :class="isCollapsed ? 'flex justify-center' : ''">
        <img v-if="!isCollapsed" src="/images/icon/closeopenbar.png" @click="toggleSidebar" alt="Close icon bar"
          class="w-5 cursor-pointer hover:opacity-70 ml-auto" />
        <img v-if="isCollapsed" src="/images/icon/closeopenbar.png" @click="toggleSidebar" alt="Open icon bar"
          class="w-5 cursor-pointer hover:scale-110 transition-transform" />
      </div>
      <div class="flex flex-col items-center mt-5 mb-4">
        <img alt="Company Logo" class="object-contain mb-2 shadow-lg rounded-full transition-all duration-300"
          :class="isCollapsed ? 'w-11 h-11' : 'w-20 h-20'" />
        <p v-show="!isCollapsed" class="text-center text-sm text-stone-500 transition-opacity duration-300">
          {{ partner.companyName }}
        </p>
      </div>


      <div class="pt-8 text-stone-700">

        <div @click="navigateTo('/mainpos', 'POS')"
          class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-stone-500 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
          :class="[
            activeMenu === 'POS' ? 'bg-stone-500 text-white drop-shadow-lg' : '',
            isCollapsed ? 'px-3' : 'px-3'
          ]">
          <div class="flex items-center gap-3 ml-3 transition-all duration-300">
            <img src="/images/icon/promotion_nav.png" alt="icon"
              class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" />
            <transition name="fade-slide" mode="out-in" appear>
              <p class="transition-all duration-300 whitespace-nowrap overflow-hidden"
                :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'">
                POS ห้องพัก
              </p>
            </transition>
          </div>
        </div>

        <div @click="navigateTo('/managesleepgunWeb', 'sleepgun')"
          class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-stone-500 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
          :class="[
            activeMenu === 'sleepgun' ? 'bg-stone-500 text-white drop-shadow-lg' : '',
            isCollapsed ? 'px-3' : 'px-3'
          ]">
          <div class="flex items-center gap-3 ml-3 transition-all duration-300">
            <img src="/images/icon/room_nav.png" alt="icon"
              class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" />
            <transition name="fade-slide" mode="out-in" appear>
              <p class="transition-all duration-300 whitespace-nowrap overflow-hidden"
                :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'">
                จองกับ SLEEPGUN
              </p>
            </transition>
          </div>
        </div>
        <div @click="navigateTo('/checkin', 'checkin')"
          class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-stone-500 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
          :class="[
            activeMenu === 'checkin' ? 'bg-stone-500 text-white drop-shadow-lg' : '',
            isCollapsed ? 'px-3' : 'px-3'
          ]">
          <div class="flex items-center gap-3 ml-3 transition-all duration-300">
            <img src="/images/icon/room_nav.png" alt="icon"
              class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" />
            <transition name="fade-slide" mode="out-in" appear>
              <p class="transition-all duration-300 whitespace-nowrap overflow-hidden"
                :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'">
                Check-in
              </p>
            </transition>
          </div>
        </div>
        <div @click="navigateTo('/checkout', 'checkout')"
          class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-stone-500 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
          :class="[
            activeMenu === 'checkout' ? 'bg-stone-500 text-white drop-shadow-lg' : '',
            isCollapsed ? 'px-3' : 'px-3'
          ]">
          <div class="flex items-center gap-3 ml-3 transition-all duration-300">
            <img src="/images/icon/people_nav.png" alt="icon"
              class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" />
            <transition name="fade-slide" mode="out-in" appear>
              <p class="transition-all duration-300 whitespace-nowrap overflow-hidden"
                :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'">
                Check-out
              </p>
            </transition>
          </div>
        </div>
        <div @click="navigateTo('/mainincomeemployee', 'income')"
          class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-stone-500 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
          :class="[
            activeMenu === 'income' ? 'bg-stone-500 text-white drop-shadow-lg' : '',
            isCollapsed ? 'px-3' : 'px-3'
          ]">
          <div class="flex items-center gap-3 ml-3 transition-all duration-300">
            <img src="/images/icon/profile.png" alt="icon"
              class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" />
            <transition name="fade-slide" mode="out-in" appear>
              <p class="transition-all duration-300 whitespace-nowrap overflow-hidden"
                :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'">
                รายได้รวม
              </p>
            </transition>
          </div>
        </div>
        <div @click="navigateTo('/profileemployee', 'proflie')"
          class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-stone-500 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
          :class="[
            activeMenu === 'proflie' ? 'bg-stone-500 text-white drop-shadow-lg' : '',
            isCollapsed ? 'px-3' : 'px-3'
          ]">
          <div class="flex items-center gap-3 ml-3 transition-all duration-300">
            <img src="/images/icon/profile.png" alt="icon"
              class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" />
            <transition name="fade-slide" mode="out-in" appear>
              <p class="transition-all duration-300 whitespace-nowrap overflow-hidden"
                :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'">
                {{ t('Profile') }}
              </p>
            </transition>
          </div>
        </div>
        <div v-show="!isCollapsed" class="mt-12">
          <FontAndLangSelector />
        </div>


        <div class="flex flex-col justify-center mt-6 space-x-2 text-sm">
          <p class="text-center text-stone-500">
            {{ t('Role') }}
            <span class=" text-lg text-stone-500 font-bold">{{
              partner.role }}</span>
          </p>
          <div v-show="!isCollapsed"
            class="text-center mt-1 transition-transform duration-300 group-hover:scale-110 text-stone-500 bg-stone-100 py-1 rounded-lg mx-4">
            <div class="flex space-x-2 justify-center">
              <p>{{ partner.firstname }}</p>
              <p> {{ partner.lastname }}</p>
            </div>
          </div>
        </div>

        <div @click="navigateTo('/logout', 'logout')"
          class="mt-12 group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-red-400 hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
          :class="[
            activeMenu === 'logout' ? 'bg-red-400 text-white drop-shadow-lg' : '',
            isCollapsed ? 'px-3' : 'px-3'
          ]">
          <div class="flex items-center gap-3 ml-3 transition-all duration-300">
            <img src="/images/icon/logout.png" alt="icon"
              class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" />
            <transition name="fade-slide" mode="out-in" appear>
              <p class="transition-all duration-300 whitespace-nowrap overflow-hidden"
                :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'">
                {{ t('LogOut') }}
              </p>
            </transition>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FontAndLangSelector from '@components/FontAndLangSelector.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const partner = ref({
  firstname: '',
  lastname: '',
  companyName: '',
  role: ''
})

const user = ref(null)

try {
  const raw = localStorage.getItem('user')
  if (raw && raw !== 'undefined') {
    user.value = JSON.parse(raw)
  } else {
    console.warn("⚠️ localStorage ไม่มี user หรือเป็น undefined")
    user.value = null
  }
} catch (err) {
  console.error("❌ Failed to parse user JSON:", err.message)
  user.value = null
}

const emit = defineEmits(['toggle-sidebar'])
const router = useRouter()
const route = useRoute()

const isCollapsed = ref(getSidebarStateFromStorage())
const isMobileMenuOpen = ref(false)
const activeMenu = ref(getActiveMenuFromRoute())

// โหลดสถานะ sidebar เมื่อ component ถูก mount
onMounted(() => {
  isCollapsed.value = getSidebarStateFromStorage()
  emitToggleSidebar()

  const rawPartner = localStorage.getItem('partner')
  if (rawPartner && rawPartner !== 'undefined') {
    try {
      partner.value = JSON.parse(rawPartner)
      if (!partner.value.role) {
        partner.value.role = 'partner'
      }
    } catch (err) {
      console.error("❌ Failed to parse partner JSON:", err.message)
      partner.value = {
        firstname: '',
        lastname: '',
        companyName: '',
        role: 'partner'
      }
    }
  }
})

// เปลี่ยนเมนูที่ active เมื่อ route เปลี่ยน
watch(route, () => {
  activeMenu.value = getActiveMenuFromRoute()
})

// ===== METHODS =====
function getSidebarStateFromStorage() {
  try {
    const saved = localStorage.getItem('sidebarCollapsed')
    return saved && saved !== 'undefined' ? JSON.parse(saved) : false
  } catch (error) {
    console.warn('Could not load sidebar state from localStorage:', error)
    return false
  }
}

function emitToggleSidebar() {
  emit('toggle-sidebar', isCollapsed.value)
}

function getActiveMenuFromRoute() {
  const currentRoute = route.path || window.location.pathname

  const routeMenuMap = {
    '/dashboardforexecutive': 'dashboard',
    '/mainmanageemployee': 'manageemployee',
    '/addemployee': 'manageemployee',
    // '/editemployee/:id': 'manageemployee',


    '/profileemployee': 'proflie',
    '/managestatusroom': 'statusroom',
    '/checkout': 'checkout',
    '/checkin': 'checkin',
    '/mainpos': 'POS',
    '/managesleepgunWeb': 'sleepgun',
    '/addroom': 'manageroom',
    '/editroom': 'manageroom',
    '/mainhotelroom': 'stayroom',
    '/maincheckincheckout': 'stayroom',
  
    '/mainincomeemployee': 'income',
    '/mainhoteldetailroom': 'stayroom',
    '/mainbookingtossagun': 'reservetossagun',
    '/maindetailbookingtossagun': 'reservetossagun',
    '/mainreport': 'report',
    '/mainpromotion': 'promotion',
  }

  return routeMenuMap[currentRoute] || 'dashboard'
}

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed.value))
  emitToggleSidebar()
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function setActiveMobile(menu) {
  activeMenu.value = menu
  isMobileMenuOpen.value = false
}

function navigateTo(path, menuKey) {
  activeMenu.value = menuKey
  router.push(path)
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #dfdfdf #f8f8f9;
  /* thumb, track */
}

/* Chrome, Edge, Safari */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  border-radius: 8px;
  background: #f3f4f6;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(0, 0%, 68%);
  border-radius: 8px;
  transition: background 0.2s;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #f59e42;
}


.fade-slide-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transition-delay: 0.05s;
}

.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transition-delay: 0.02s;
  /* ใส่เล็กน้อยเพื่อความลื่น */
}


.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
