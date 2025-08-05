<template>
  <div class="bg-stone-700 w-full">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex flex-row items-center justify-between py-4 px-4">

        <div @click="goToMain" class="flex items-center gap-2 w-1/6">
          <img class="w-8 h-8 object-contain" src="/img/Bar/Tossagun.png" alt="Logo" />
          <label class="text-white font-bold text-lg leading-none">SLEEPGUN</label>
        </div>

        <div class="hidden lg:block w-3/6">
          <div class="bg-stone-600 rounded-full px-6 py-2">
            <div class="flex justify-between text-sm font-semibold ">
              <button @click="goToMain" class="text-white hover:text-yellow-400">{{ t('MainTossagun') }}</button>

              <div class="relative group">
                <button @click="goToSelectHotel" class="text-white hover:text-yellow-400">เลือกห้องพัก</button>  
              </div>
              <button @click="goToDetailHotel" class="text-white hover:text-yellow-400">เเสดงห้องพัก</button>              
              <button @click="goToPayment" class="text-white hover:text-yellow-400">ยืนยันการจ่ายเงิน</button>              
              <button @click="goToContact" class="text-white hover:text-yellow-400">ติดต่อเรา</button>
            </div>
          </div>
        </div>

        <div class="hidden lg:block w-2/6  ">
          <div class="flex items-center justify-end">
            <div>
              <FontAndLangSelector />
            </div>
            <div class="flex lg:justify-end">
              <button @click="goToSignin"
                class="bg-yellow-400 hover:bg-yellow-500 py-2 px-4 rounded-full text-sm font-semibold text-black">
                เข้าสู่ระบบ
              </button>
            </div>
          </div>
        </div>

        <div class="relative">
          <!-- ปุ่มเปิดเมนู (มือถือ) -->
          <div class="lg:hidden w-2/4 flex justify-end">
            <button class="text-white" @click="toggleMenu">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <!-- Overlay เฟด -->
          <transition name="fade">
            <div v-if="menuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" @click.self="toggleMenu">
            </div>
          </transition>

          <!-- Slide-in Menu -->
          <transition name="slide">
            <div v-if="menuOpen" class="fixed top-0 right-0 h-full w-64 bg-white z-50  shadow-lg p-4 overflow-y-auto">
              <div class="flex justify-end mb-2">
                <button @click="toggleMenu" class="text-xl font-bold">&times;</button>
              </div>
              <Button type="button" text @click="toggleAll" />
              <PanelMenu v-model:expandedKeys="expandedKeys" :model="items" class="w-full" unstyled :pt="{
                root: { class: 'space-y-3' },
                menuitem: { class: 'hover:text-yellow-400' },
                submenu: { class: 'ml-4 space-y-1 border-l border-stone-200 pl-2' }
              }" />

              <div class="mt-8 flex flex-col justify-center items-center space-y-8">
                <FontAndLangSelector />

                <button @click="goToSignin"
                  class="bg-yellow-400 hover:bg-yellow-500 py-2 px-4 rounded-full text-sm font-semibold text-black">
                  เข้าสู่ระบบ
                </button>
              </div>

            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PanelMenu from 'primevue/panelmenu'
import Button from 'primevue/button'
import FontAndLangSelector from '@components/FontAndLangSelector.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const menuOpen = ref(false)
const expandedKeys = ref({});

//โทรศัพท์
const items = ref([
  {
    key: '0',
    label: 'หน้าหลัก',
    class: 'font-bold',
    icon: 'pi pi-home font-bold pr-2',
    route: '/',
    command: () => router.push('/')
  },
  {
    key: '1',
    label: 'เลือกห้องพัก',
    class: 'font-bold',
    icon: '',
    route: '/selecthotel',
    command: () => router.push('/selecthotel')
  },
  {
    key: '2',
    class: '',
    label: 'เเสดงห้องพัก',
    command: () => router.push('/detailhotelmember')
  },
  {
    key: '3',
    class: '',
    label: 'ยืนยันการจ่ายเงิน',
    command: () => router.push('/datamember')
  }

]);


const toggleAll = () => {
  if (Object.keys(expandedKeys.value).length) collapseAll()
  else expandAll()
}

const expandAll = () => {
  for (let node of items.value) expandNode(node)
  expandedKeys.value = { ...expandedKeys.value }
}
const collapseAll = () => {
  expandedKeys.value = {}
}
const expandNode = (node) => {
  if (node.items && node.items.length) {
    expandedKeys.value[node.key] = true
    for (let child of node.items) expandNode(child)
  }
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}


function goToSignin() {
  router.push('/signin')
}
function goToMain() {
  router.push('/')
}
function goToSelectHotel() {
  router.push('/selecthotel')
}
function goToDetailHotel() {
  router.push('/detailhotelmemberdate')
}
function goToPayment() {
  router.push('/datamember')
}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to {
  transform: translateX(0%);
}

.slide-leave-from {
  transform: translateX(0%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
