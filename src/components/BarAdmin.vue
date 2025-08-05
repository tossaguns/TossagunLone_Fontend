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
        <div @click="navigateTo('dashboardadmin', 'dashboard')"
          class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-[#3D795A] hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
          :class="[
            activeMenu === 'dashboard' ? 'bg-[#3D795A] text-white drop-shadow-lg' : '',
            isCollapsed ? 'px-3' : 'px-3'
          ]">
          <div class="flex items-center gap-3 ml-3 transition-all duration-300">
            <img src="/images/icon/dashboard_nav.png" alt="icon"
              class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" />
            <transition name="fade-slide" mode="out-in" appear>
              <p class="transition-all duration-300 whitespace-nowrap overflow-hidden"
                :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'">
                {{ t('Dashboard') }}
              </p>
            </transition>
          </div>
        </div>

        <div @click="navigateTo('/mainmanageapprovepartner', 'manageapprovepartner')"
          class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-[#3D795A] hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
          :class="[
            activeMenu === 'manageapprovepartner' ? 'bg-[#3D795A] text-white drop-shadow-lg' : '',
            isCollapsed ? 'px-3' : 'px-3'
          ]">
          <div class="flex items-center gap-3 ml-3 transition-all duration-300">
            <img src="/images/icon/calendartossagun_nav.png" alt="icon"
              class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" />
            <transition name="fade-slide" mode="out-in" appear>
              <p class="transition-all duration-300 whitespace-nowrap overflow-hidden"
                :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'">
                จัดการคำขอ
              </p>
            </transition>
          </div>
        </div>

        <div @click="navigateTo('/mainselecttype', 'selecttype')"
          class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-[#3D795A] hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
          :class="[
            activeMenu === 'selecttype' ? 'bg-[#3D795A] text-white drop-shadow-lg' : '',
            isCollapsed ? 'px-3' : 'px-3'
          ]">
          <div class="flex items-center gap-3 ml-3 transition-all duration-300">
            <img src="/images/icon/calendar_nav.png" alt="icon"
              class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" />
            <transition name="fade-slide" mode="out-in" appear>
              <p class="transition-all duration-300 whitespace-nowrap overflow-hidden"
                :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'">
                จัดการตัวเลือก
              </p>
            </transition>
          </div>
        </div>


        <div @click="navigateTo('/mainmanagepromotion', 'promotion')"
          class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-[#3D795A] hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
          :class="[
            activeMenu === 'promotion' ? 'bg-[#3D795A] text-white drop-shadow-lg' : '',
            isCollapsed ? 'px-3' : 'px-3'
          ]">
          <div class="flex items-center gap-3 ml-3 transition-all duration-300">
            <img src="/images/icon/promotion_nav.png" alt="icon"
              class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" />
            <transition name="fade-slide" mode="out-in" appear>
              <p class="transition-all duration-300 whitespace-nowrap overflow-hidden"
                :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'">
                จัดการโปรโมชัน
              </p>
            </transition>
          </div>
        </div>

        <div @click="navigateTo('/mainmanagehoteladmin', 'managehotel')"
          class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-[#3D795A] hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
          :class="[
            activeMenu === 'managehotel' ? 'bg-[#3D795A] text-white drop-shadow-lg' : '',
            isCollapsed ? 'px-3' : 'px-3'
          ]">
          <div class="flex items-center gap-3 ml-3 transition-all duration-300">
            <img src="/images/icon/room_nav.png" alt="icon"
              class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" />
            <transition name="fade-slide" mode="out-in" appear>
              <p class="transition-all duration-300 whitespace-nowrap overflow-hidden"
                :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'">
                จัดการพาร์ทเนอร์
              </p>
            </transition>
          </div>
        </div>

        <div @click="navigateTo('/mainmanagemember', 'managemember')"
          class="group mb-2 font-semibold py-2 rounded-lg transition duration-300 hover:bg-[#3D795A] hover:text-white hover:drop-shadow-lg flex items-center cursor-pointer"
          :class="[
            activeMenu === 'managemember' ? 'bg-[#3D795A] text-white drop-shadow-lg' : '',
            isCollapsed ? 'px-3' : 'px-3'
          ]">
          <div class="flex items-center gap-3 ml-3 transition-all duration-300">
            <img src="/images/icon/employee_navAdmin.png" alt="icon"
              class="w-4 h-5 object-contain transition-transform duration-300 group-hover:scale-110" />
            <transition name="fade-slide" mode="out-in" appear>
              <p class="transition-all duration-300 whitespace-nowrap overflow-hidden"
                :class="isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'">
                จัดการเมมเบอร์
              </p>
            </transition>
          </div>
        </div>

        <div v-show="!isCollapsed" class="mt-12">
          <FontAndLangSelector />
        </div>


        <div class="flex flex-col justify-center mt-6 space-x-2 text-sm">
          <p class="text-center text-stone-400">
            {{ t('Role') }}
            <span class=" text-lg text-[#3D795A] font-bold">{{
              partner.role }}</span>
          </p>
          <div v-show="!isCollapsed"
            class="text-center mt-1 transition-transform duration-300 group-hover:scale-110 text-stone-500 bg-lime-100 py-1 rounded-lg mx-4">
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
    '/dashboardadmin': 'dashboard',
    '/mainemployee': 'manageemployee',
    '/addemployee': 'manageemployee',
    '/employeelist': 'manageemployee',
    '/editemployee': 'manageemployee',

    '/editprofilecompany': 'editproflie',
    '/mainprofilecompany': 'editproflie',
    '/profilecompany': 'editproflie',
    '/editdetailhotel': 'editproflie',
    '/detailhotel': 'editproflie',

    '/mainmanagehoteladmin': 'managehotel',
    '/mainmanagemember': 'managemember',


    '/mainselecttype': 'selecttype',
    '/maincheckincheckout': 'selecttype',
    '/checkin': 'selecttype',
    '/checkout': 'selecttype',
    '/mainhoteldetailroom': 'selecttype',

    '/mainbookingtossagun': 'manageapprovepartner',
    '/mainmanageapprovepartner': 'manageapprovepartner',

    '/mainreport': 'report',
    '/mainmanagepromotion': 'promotion',
    '/addpromotion': 'promotion',
    '/editpromotion': 'promotion',
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
