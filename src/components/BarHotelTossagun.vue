<template>
  <div class="bg-stone-700 w-full">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex flex-row items-center justify-between py-4 px-4">

        <div @click="goToMain" class="flex items-center gap-2 w-1/6">
          <img class="w-8 h-8 object-contain" src="/img/Bar/Tossagun.png" alt="Logo" />
          <label class="text-white font-bold text-lg leading-none">TOSSAGUN</label>
        </div>

        <div class="hidden lg:block w-3/6">
          <div class="bg-stone-600 rounded-full px-6 py-2">
            <div class="flex justify-between text-sm font-semibold ">
              <button @click="goToMain" class="text-white hover:text-yellow-400">{{ t('MainTossagun') }}</button>

              <div class="relative group">
                <button class="text-white hover:text-yellow-400">ผลิตภัณฑ์</button>
                <div
                  class="absolute top-full left-0 bg-white text-black rounded-md mt-2 p-4 shadow-lg w-[700px] hidden group-hover:block z-50">

                  <label class="font-bold">ผลิตภัณฑ์</label>
                  <div class="flex flex-row justify-between items-start w-full mt-5">
                    <div class="w-1/4">
                      <label class="font-bold">สินเชื่อบ้าน</label>
                      <div class="mt-2 pl-3 space-y-2">
                        <button @click="goToMainHouse"
                          class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">หน้าหลักสินเชื่อบ้าน</button>
                        <button @click="goToNewHouse"
                          class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">สินเชื่อบ้านใหม่</button>
                        <button @click="goToHouseIsMoney"
                          class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">สินเชื่อบ้านคือเงิน</button>
                        <button @click="goToHouse2"
                          class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">สินเชื่อบ้านมือสอง</button>
                        <button @click="goToCreditHasIncreased"
                          class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">สินเชื่อบ้านได้เพิ่ม</button>
                        <button @click="goToForHouse"
                          class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">สินเชื่อเพื่อปลูกสร้างบ้าน</button>
                        <button @click="goToHouseRefinance"
                          class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">สินเชื่อบ้านรีไฟเเเนนซ์</button>
                      </div>
                    </div>

                    <div class="w-1/4 ">
                      <label class="font-bold">สินเชื่อรถ</label>
                      <div class="mt-2 pl-3 space-y-2">
                        <button @click="goToMainCar"
                          class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">หน้าหลักสินเชื่อรถ</button>
                        <button @click="goToNewCar"
                          class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">สินเชื่อเช่ารถยนต์ใหม่</button>
                        <button @click="goToCarIsMoney"
                          class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">สินเชื่อรถคือเงิน</button>
                        <button @click="goToCarRefinance"
                          class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">สินเชื่อรถรีไฟเเนนซ์</button>
                        <button @click="goToUsedCar"
                          class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">สินเชื่อรถใช้เเล้ว</button>
                      </div>
                    </div>
                    <div class="w-1/4">
                      <label class="font-bold">สินเชื่อส่วนบุคคล</label>
                      <div class="mt-2 space-y-2">
                        <button
                          class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">หน้าหลักสินเชื่อส่วนบุคคล</button>
                        <button class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">....</button>
                        <button class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">....</button>
                        <button class="w-full text-left font-normal text-stone-500 hover:text-yellow-400">....</button>
                      </div>
                    </div>
                    <div class="pr-5">
                      <label class="font-bold">อื่นๆ</label>
                    </div>
                  </div>
                  <!-- <ul class="space-y-2 text-sm">
                    <li><a href="/mainhouse" class="hover:underline">สินเชื่อบ้าน</a></li>
                    <li><a href="/maincar" class="hover:underline">สินเชื่อรถ</a></li>
                    <li><a href="#" class="hover:underline">สินเชื่อบุคล</a></li>
                    <li><a href="#" class="hover:underline">บริการอื่นๆ</a></li>
                  </ul> -->
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
    route: '/main',
    command: () => router.push('/main')
  },
  {
    key: '1',
    label: 'ผลิตภัณฑ์',
    class: 'pl-2 font-bold ',
    items: [
      {
        key: '0_1',
        label: 'สินเชื่อบ้าน',
        class: 'pl-4 py-1',
        items: [
          {
            key: '0_1_0',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: 'หน้าหลักสินเชื่อบ้าน',
            command: () => router.push('/mainhouse')
          },
          {
            key: '0_1_1',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: 'สินเชื่อบ้านใหม่',
            command: () => router.push('/newhouse')
          },
          {
            key: '0_1_2',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: 'สินเชื่อบ้านคือเงิน',
            command: () => router.push('/houseismoney')
          },
          {
            key: '0_1_3',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: 'สินเชื่อบ้านมือสอง',
            command: () => router.push('/house2')
          },
          {
            key: '0_1_4',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: 'สินเชื่อบ้านได้เพิ่ม',
            command: () => router.push('/credithasincreased')
          },
          {
            key: '0_1_5',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: 'สินเชื่อเพื่อปลูกสร้างบ้าน',
            command: () => router.push('/forhouse')
          },
          {
            key: '0_1_6',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: 'สินเชื่อบ้านรีไฟเเนนซ์'
          }
        ]
      },
      {
        key: '0_2',
        label: 'สินเชื่อรถ',
        class: 'pl-4 py-1',
        items: [
          {
            key: '0_2_0',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: 'หน้าหลักสินเชื่อรถ',
            command: () => router.push('/maincar')
          },
          {
            key: '0_2_1',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: 'สินเชื่อเช่ารถยนต์ใหม่',
            command: () => router.push('/newcar')
          },
          {
            key: '0_2_2',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: 'สินเชื่อรถคือเงิน',
            command: () => router.push('/carismoney')
          },
          {
            key: '0_2_3',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: 'สินเชื่อรถรีไฟเเนนซ์',
            command: () => router.push('/carrefinance')
          },
          {
            key: '0_2_4',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: 'สินเชื่อรถใช้เเล้ว',
            command: () => router.push('/usedcar')
          },

        ]
      },
      {
        key: '0_3',
        label: 'สินเชื่อส่วนบุคคล',
        class: 'pl-4 py-1',
        items: [
          {
            key: '0_3_0',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: 'หน้าหลักสินเชื่อส่วนบุคคล'
          },
          {
            key: '0_3_1',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: '...'
          },
          {
            key: '0_3_2',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: '...'
          },
          {
            key: '0_3_3',
            class: 'pl-4 font-medium py-1 hover:text-yellow-500',
            label: '...'
          },
        ]
      },
      {
        key: '0_4',
        class: 'pl-8',
        label: 'อื่นๆ',
      },
    ]
  },
  {
    key: '3',
    label: 'เกี่ยวกับ',
    class: 'pl-2 font-bold',
    items: [
      {
        key: '2_0',
        class: 'pl-8 font-medium py-1 hover:text-yellow-500',
        label: 'เกี่ยวกับเรา'
      },
      {
        key: '2_1',
        class: 'pl-8 font-medium py-1 hover:text-yellow-500',
        label: 'ข่าวสาร'
      },
    ]
  },
  {
    key: '2',
    label: 'FAQ',
    class: 'pl-2 font-bold',
    items: [
      {
        key: '2_0',
        class: 'pl-8 font-medium py-1 hover:text-yellow-500',
        label: 'New Event'
      },
      {
        key: '2_1',
        class: 'pl-8 font-medium py-1 hover:text-yellow-500',
        label: 'Today'
      },
      {
        key: '2_2',
        class: 'pl-8 font-medium py-1 hover:text-yellow-500',
        label: 'This Week'
      }
    ]
  },
  {
    key: '2',
    class: ' pl-6 font-bold',
    label: 'ติดต่อเรา',
    command: () => router.push('/contactmasage')
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


function goToMainHouse() {
  router.push('/mainhouse')
}

function goToMainCar() {
  router.push('/maincar')
}

function goToCreditHasIncreased() {
  router.push('/credithasincreased')
}

function goToForHouse() {
  router.push('/forhouse')
}

function goToHouse2() {
  router.push('/house2')
}

function goToHouseIsMoney() {
  router.push('/houseismoney')
}

function goToNewHouse() {
  router.push('/newhouse')
}

function goToCarIsMoney() {
  router.push('/carismoney')
}

function goToCarRefinance() {
  router.push('/carismoney')
}

function goToNewCar() {
  router.push('/newcar')
}

function goToUsedCar() {
  router.push('/usedcar')
}

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
