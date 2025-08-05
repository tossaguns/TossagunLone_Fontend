<template>
  <div>
    <div class="bg-white  lg:p-4 z-40  flex-col md:space-y-4 space-y-2 min-h-screen overflow-y-auto custom-scrollbar">

      <div v-for="(promo, index) in promotions" :key="index" class="bg-stone-100 py-3 rounded-lg shadow space-y-2">
        <p class="text-lg px-4 text-red-600 font-bold">{{ promo.title }}</p>
        <div class="text-center py-6 ">
          <p v-if="promo.discountPrice && promo.discountPrice < promo.originalPrice"
            class="line-through text-sm text-gray-400">{{ promo.originalPrice }} บาท</p>
          <p class="text-xl font-bold text-black">
            {{ promo.discountPrice && promo.discountPrice < promo.originalPrice ? promo.discountPrice :
              promo.originalPrice }} <span class="text-sm font-thin">บาท/คน/บัญชี</span>
          </p>
          <p class="text-xxs text-gray-500">ใช้งานได้ถึง : {{ promo.end }}</p>
        </div>

        <div class="flex justify-center text-xs">
          <button class="px-2 py-1 rounded text-stone-500 underline hover:text-stone-700" @click="toggleDetail(index)">
            {{ openedIndex === index ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด' }}
          </button>
        </div>

        <transition name="fade">
          <div v-if="openedIndex === index"
            class="mx-2 rounded-md py-4 px-3 bg-white mt-2 md:text-sm text-xs  text-gray-400" ref="detailRef">
            <div v-if="promo.status" class="flex justify-end">
              <div class="font-bold" :class="promo.status === 'ใช้งานอยู่' ? 'text-green-500' : 'text-red-400'">{{
                promo.status }}
              </div>
            </div>
            <div class="text-xxs pt-4">
              <p>วันเริ่มต้น: {{ promo.start }}</p>
              <p>วันสิ้นสุด: {{ promo.end }}</p>
            </div>
            <div class="mt-3">
              <p>รายละเอียด: </p>
              <p class="text-center">{{ promo.detail }}</p>
            </div>

            <div class="mt-5 space-y-1 flex flex-col">
              <button
                class="bg-amber-500 w-full text-white text-xs font-bold px-2 py-2 rounded-md">ใบเสร็จกำกับภาษี</button>
              <button
                class="bg-rose-500 w-full text-white text-xs font-bold px-2 py-2 rounded-md">ใบเสร็จเเบบย่อ</button>
              <button class="bg-blue-500 w-full text-white text-xs font-bold px-2 py-2 rounded-md">สลิป</button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, nextTick } from 'vue'



const openedIndex = ref(null)
const detailRef = ref(null)



function toggleDetail(idx) {
  openedIndex.value = openedIndex.value === idx ? null : idx

  // ถ้าเปิดรายละเอียด ให้เลื่อน item มาตรงกลาง
  if (openedIndex.value === idx) {
    nextTick(() => {
      const container = document.querySelector('.custom-scrollbar')
      const item = document.querySelectorAll('.bg-stone-100')[idx]

      if (container && item) {
        const containerRect = container.getBoundingClientRect()
        const itemRect = item.getBoundingClientRect()
        const containerCenter = containerRect.top + containerRect.height / 2
        const itemCenter = itemRect.top + itemRect.height / 2
        const scrollOffset = itemCenter - containerCenter

        container.scrollBy({
          top: scrollOffset,
          behavior: 'smooth'
        })
      }
    })
  }
}




const promotions = ref([
  {
    title: 'รักนี้หัวใจมีคืน',
    originalPrice: '200',
    discountPrice: '180',
    status: 'ใช้งานได้',
    detail: 'suytr hujsi jto8 664jh ynu',
    name: 'แพ็กเกจหัวใจ',
    start: '10/11/2565',
    end: '20/11/2565',
    status: 'ใช้งานอยู่',
    detail: 'hyfsijudki kfhyl',
  },
  {
    title: 'โปรลับสุดคุ้ม',
    originalPrice: '150',
    discountPrice: '',

    status: 'หมดเวลา',
    detail: 'suytr hujsi jto8 664jh ynu',
    name: 'แพ็กเกจลับ',
    start: '20/12/2565',
    end: '30/12/2565',
    status: 'หมดอายุ'
  },
  {
    title: 'โปรลับสุดคุ้ม',
    originalPrice: '150',
    discountPrice: '',

    status: 'หมดเวลา',
    detail: 'suytr hujsi jto8 664jh ynu',
    name: 'แพ็กเกจลับ',
    start: '20/12/2565',
    end: '30/12/2565',
    status: 'หมดอายุ'
  },
  {
    title: 'โปรลับสุดคุ้ม',
    originalPrice: '150',
    discountPrice: '120',

    status: 'หมดเวลา',
    detail: 'suytr hujsi jto8 664jh ynu',
    name: 'แพ็กเกจลับ',
    start: '20/12/2565',
    end: '30/12/2565',
    status: 'หมดอายุ'
  },
  {
    title: 'โปรลับสุดคุ้ม',
    originalPrice: '150',
    discountPrice: '120',

    status: 'หมดเวลา',
    detail: 'suytr hujsi jto8 664jh ynu',
    name: 'แพ็กเกจลับ',
    start: '20/12/2565',
    end: '30/12/2565',
    status: 'หมดอายุ'
  },
  {
    title: 'โปรลับสุดคุ้ม',
    originalPrice: '150',
    discountPrice: '120',
    status: 'หมดเวลา',
    detail: 'suytr hujsi jto8 664jh ynu',
    name: 'แพ็กเกจลับ',
    start: '20/12/2565',
    end: '30/12/2565',
    status: 'หมดอายุ'
  },
])
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>