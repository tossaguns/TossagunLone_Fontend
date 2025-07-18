<template>
  <TemplatePartner>
    <template #header>
      <label>รายการโปรโมชั่น</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div class="flex justify-center mt-6">
          <button @click="visibleRight = true"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md">
            ประวัติการทำรายการของฉัน
          </button>
        </div>



        <div class="flex flex-col 2xl:flex-row 2xl:space-x-5 justify-center">
          <!-- ส่วนโปรโมชั่น -->
          <div class="2xl:w-2/3">
            <div class="text-center mb-10 md:mt-20 mt-6">
              <p class="md:text-3xl text-2xl font-bold text-gray-800">
                เลือกใช้ <span class="text-amber-500">บริการที่เหมาะกับคุณ</span>
              </p>
              <p class="text-gray-500 md:text-sm text-xs">
                เลือกโปรโมชั่นที่ตรงใจคุณ และเริ่มใช้งานได้ทันที
              </p>
            </div>

            <!-- ✅ ปรับ layout -->
            <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  px-4 max-w-7xl mx-auto">
              <div v-for="promotion in allPromotions" :key="promotion._id"
                class="rounded-lg bg-white shadow-md border transition hover:scale-95 flex flex-col min-h-[380px]">
                <!-- ชื่อโปรโมชั่น -->
                <div class="py-3 text-gray-400 text-center font-bold text-lg break-all whitespace-pre-wrap">
                  {{ promotion.name || 'ชื่อโปรโมชั่น' }}
                </div>

                <!-- รายละเอียดโปรโมชั่น -->
                <div class="px-3 pb-6 pt-4 text-gray-700 flex flex-col flex-1 justify-between">
                  <div>
                    <div class="text-center">
                      <template v-if="promotion.wantToReduce === 'yesReduced' && (
                        (promotion.discountType === 'reduced' && promotion.price && promotion.reducedPrice) ||
                        (promotion.discountType === 'percent' && promotion.price && promotion.percentPrice)
                      )">
                        <span class="text-gray-400 line-through mr-2">
                          {{ promotion.price }}
                        </span>
                        <br />
                        <span class="text-3xl font-bold text-red-600 align-middle">
                          <!-- ลดราคาบาท -->
                          <template v-if="promotion.discountType === 'reduced'">
                            {{ Number(promotion.price) - Number(promotion.reducedPrice) }}
                          </template>
                          <!-- ลดราคาคิดเป็น % -->
                          <template v-else-if="promotion.discountType === 'percent'">
                            {{
                              (Number(promotion.price) -
                                (Number(promotion.price) * Number(promotion.percentPrice)) /
                                100
                              ).toFixed(2)
                            }}
                          </template>
                        </span>
                      </template>
                      <template v-else>
                        <span class="font-bold text-3xl text-gray-900">
                          {{ promotion.price || '0' }}
                        </span>
                      </template>
                      <p class="text-sm text-gray-500">บาท / คน / บัญชี</p>
                    </div>

                    <!-- รายการรายละเอียด -->
                    <div class="list-none space-y-1 mt-4">
                      <div class="bg-gray-50 p-3 rounded-md">
                        <div v-for="(line, index) in (promotion.detail ? promotion.detail.split('\n') : [])"
                          :key="index" class="flex items-start">
                          <span class="mr-2 mt-1">✔</span>
                          <span class="break-all whitespace-pre-wrap flex-1 md:text-sm text-xs">
                            {{ line }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- ส่วนล่างสุด -->
                  <div class="mt-auto">
                    <div class="mt-4 md:text-sm text-xs px-6">
                      <div class="flex items-start">
                        <span class="mr-2 mt-1">📅</span>
                        <span>เริ่ม: {{ promotion.dateStart ? promotion.dateStart.slice(0, 10) : '-' }}</span>
                      </div>
                      <div class="flex items-start">
                        <span class="mr-2 mt-1">📅</span>
                        <span>สิ้นสุด: {{ promotion.dateFinish ? promotion.dateFinish.slice(0, 10) : '-' }}</span>
                      </div>
                    </div>

                    <div class="flex justify-center mt-4">
                      <button @click="openPaymentPopup(promotion._id)"
                        class="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-4 py-1 rounded-lg transition">
                        ซื้อเลย
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>






          <!-- <div class="flex flex-col 2xl:flex-row 2xl:space-x-5 justify-center">
          <div class="2xl:w-2/3">
            <div class="text-center mb-10 md:mt-20 mt-6">
              <p class="md:text-3xl text-2xl font-bold text-gray-800">
                เลือกใช้ <span class="text-amber-500">บริการที่เหมาะกับคุณ</span>
              </p>
              <p class="text-gray-500 md:text-sm text-xs">
                เลือกโปรโมชั่นที่ตรงใจคุณ และเริ่มใช้งานได้ทันที
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-auto px-4 max-w-5xl">
              <div v-for="promotion in allPromotions" :key="promotion._id"
                class="rounded-lg bg-white shadow-md border transition hover:scale-105 flex flex-col h-full">
                <div class="py-3 text-gray-400 text-center font-bold text-lg break-all whitespace-pre-wrap">
                  {{ promotion.name || 'ชื่อโปรโมชั่น' }}
                </div>
                <div class="px-3 pb-6 pt-4 text-gray-700 flex flex-col flex-1 justify-between">
                  <div>
                    <div class="text-center">
                      <template v-if="promotion.wantToReduce === 'yesReduced' && (
                        (promotion.discountType === 'reduced' && promotion.price && promotion.reducedPrice) ||
                        (promotion.discountType === 'percent' && promotion.price && promotion.percentPrice)
                      )">
                        <span class="text-gray-400 line-through mr-2">
                          {{ promotion.price }}
                        </span>
                        <br />
                        <span class="text-3xl font-bold text-red-600 align-middle">
                     
                          <template v-if="promotion.discountType === 'reduced'">
                            {{ Number(promotion.price) - Number(promotion.reducedPrice) }}
                          </template>
                  
                          <template v-else-if="promotion.discountType === 'percent'">
                            {{ (Number(promotion.price) - (Number(promotion.price) *
                              Number(promotion.percentPrice) /
                              100)).toFixed(2) }}
                          </template>
                        </span>
                      </template>
                      <template v-else>
                        <span class="font-bold text-3xl text-gray-900">
                          {{ promotion.price || '0' }}
                        </span>
                      </template>
                      <p class="text-sm text-gray-500">บาท / คน / บัญชี</p>
                    </div>

                    <div class="list-none space-y-1 mt-4">
                      <div class="bg-gray-50 p-3 rounded-md ">
                        <div v-for="(line, index) in (promotion.detail ? promotion.detail.split('\n') : [])"
                          :key="index" class="flex items-start ">
                          <span class="mr-2 mt-1">✔</span>
                          <span class="break-all whitespace-pre-wrap flex-1 md:text-sm text-xs ">
                            {{ line }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
              
                  <div class="mt-auto">
                    <div class="mt-4 md:text-sm text-xs px-6">
                      <div class="flex items-start">
                        <span class="mr-2 mt-1">📅</span>
                        <span>เริ่ม: {{ promotion.dateStart ? promotion.dateStart.slice(0, 10) : '-' }}</span>
                      </div>
                      <div class="flex items-start">
                        <span class="mr-2 mt-1">📅</span>
                        <span>สิ้นสุด: {{ promotion.dateFinish ? promotion.dateFinish.slice(0, 10) : '-' }}</span>
                      </div>
                    </div>
                    <div class="flex justify-center mt-4">
                      <button @click="openPaymentPopup(promotion._id)"
                        class="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-4 py-1 rounded-lg transition">
                        ซื้อเลย
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>-->


          <div class=" pb-20 pt-20">
            <div class="bg-stone-50 py-5 px-4 sm:px-6 lg:px-8 md:rounded-xl shadow-lg">
              <div class="mb-12">
                <p class="text-2xl md:text-3xl font-bold text-center text-amber-500">
                  บริการที่กำลังใช้งาน
                </p>
                <p class="text-xs md:text-sm text-center text-gray-500 ">
                  บริการที่ใช้งานกับ SLEEPGUN ในปัจจุบัน</p>
              </div>

              <div class="max-w-2xl mx-auto">
                <div v-for="(item, idx) in paginatedHistory" :key="idx"
                  class="bg-white rounded-lg shadow p-4 border mb-2 flex flex-col gap-y-2">
                  <div class="font-bold text-lg text-rose-600 mb-3">{{ item.name }}
                  </div>

                  <div class="flex justify-between 2xl:px-8 px-2 items-center mb-2">
                    <div>
                      <div class="text-sm  text-gray-500 mb-3">
                        <p>
                          <span class="md:inline hidden">สถานะ :</span>
                          <span class="md:ml-2" :class="[
                            'md:px-3 px-2 text-xs md:text-sm py-1 rounded-md text-white font-medium',
                            item.status === 'ใช้งานอยู่' ? 'bg-green-500' : 'bg-gray-400'
                          ]">
                            {{ item.status }}
                          </span>
                        </p>
                      </div>
                      <div class="text-xs text-gray-400">
                        <div>วันเริ่มต้น: <span class="font-medium ">{{
                          item.start }}</span></div>
                        <div>วันสิ้นสุด: <span class="font-medium ">{{
                          item.end }}</span></div>
                      </div>
                    </div>


                    <div>
                      <div class="text-right md:text-center">
                        <div v-if="displayPrice(item).hasDiscount">
                          <p class="text-xs md:text-xl line-through text-gray-500 text-right">
                            {{
                              displayPrice(item).originalPrice }}</p>
                          <p class="text-xl font-bold md:text-3xl text-rose-600">
                            {{
                              displayPrice(item).reducedPrice }}</p>
                          <p class="text-xs md:text-sm text-gray-500">
                            บาท/คน/บัญชี</p>
                        </div>

                        <div v-else>
                          <p class="text-xl font-bold md:text-3xl text-gray-900">
                            {{ displayPrice(item).originalPrice }}</p>
                          <p class="text-xs md:text-sm text-gray-500">
                            บาท/คน/บัญชี</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="w-full my-2 py-2 px-2 text-center md:text-base text-xs rounded-md text-gray-400 border">
                    <p>{{ item.detail }}</p>
                    <button
                      class="text-xxs mt-8 mb-2 py-2 px-2 text-white rounded bg-red-600">ยกเลิกการใช้บริการ</button>
                  </div>


                  <div class="flex justify-end space-x-1">
                    <button
                      class="px-2 py-1 rounded  text-stone-400 underline hover:text-stone-600 text-xxs transition">
                      ใบเสร็จกำกับภาษี
                    </button>
                    <button
                      class="px-2 py-1 rounded  text-stone-400 underline hover:text-stone-600 text-xxs  transition">
                      ใบเสร็จเเบบย่อ
                    </button>
                    <button
                      class="px-2 py-1 rounded  text-stone-400 underline hover:text-stone-600 text-xxs  transition">
                      สลิป
                    </button>
                  </div>

                </div>
              </div>

              <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-6 md:text-base text-xs">
                <button @click="prevPage" :disabled="currentPage === 1"
                  class="px-3 py-1 rounded bg-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition">
                  ก่อนหน้า
                </button>

                <span class="px-3 py-1 text-gray-700">
                  หน้า {{ currentPage }} จาก {{ totalPages }}
                </span>

                <button @click="nextPage" :disabled="currentPage === totalPages"
                  class="px-3 py-1 rounded bg-gray-400 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 transition">
                  ถัดไป
                </button>
              </div>
            </div>
          </div>
        </div>


        <div v-if="showPaymentPopup" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg md:p-6 p-4 max-w-4xl w-full relative mx-6">
            <button @click="closePaymentPopup" class="absolute top-2 right-2 text-gray-500">✕</button>
            <div class="flex flex-col md:justify-between items-center gap-4">
              <div class="w-full md:w-1/2">
                <div
                  class="py-3 text-gray-400 rounded-lg text-center font-bold md:text-lg text-sm break-all whitespace-pre-wrap">
                  {{ selectedPromotion.namePromotion || 'ชื่อโปรโมชั่น' }}
                </div>

                <div class="px-3 text-gray-700 flex flex-col flex-1 justify-between">
                  <div class=" text-center ">
                    <p class="font-bold text-3xl text-gray-900">{{ selectedPromotion.price ||
                      '0' }}
                    </p>
                    <p class="text-sm text-gray-500">บาท / คน / บัญชี</p>
                  </div>
                </div>
                <div class="flex flex-col justify-center items-center
            text-center md:text-sm text-xs md:px-6">
                  <div class="mt-2 text-gray-500">
                    <span>เริ่ม: {{ selectedPromotion.dateStart || '-' }}</span>
                  </div>
                  <div class="text-gray-500">
                    <span>สิ้นสุด: {{ selectedPromotion.dateFinish || '-' }}</span>
                  </div>
                </div>
              </div>


              <div class="w-full md:w-1/2">
                <div>
                  <p class="text-center md:text-xl text-sm font-bold mb-3">เลือกวิธีการจ่ายเงิน</p>

                  <div class="flex flex-col md:text-base text-xs">
                    <button class="border px-3 py-2 flex items-center justify-between"
                      :class="selectedMethod === 'truemoney' ? 'border-green-600 bg-green-50' : ''"
                      @click="selectedMethod = 'truemoney'" type="button">
                      <span>โอนผ่าน TrueMoney</span>
                      <span v-if="selectedMethod === 'truemoney'" class="text-green-600 text-lg ml-2">✔</span>
                    </button>

                    <button class="border px-3 py-2 flex items-center justify-between"
                      :class="selectedMethod === 'qrcode' ? 'border-green-600 bg-green-50' : ''"
                      @click="selectedMethod = 'qrcode'" type="button">
                      <span>แสกน Qrcode</span>
                      <span v-if="selectedMethod === 'qrcode'" class="text-green-600 text-lg ml-2">✔</span>
                    </button>

                    <button class="border px-3 py-2 flex items-center justify-between"
                      :class="selectedMethod === 'bank' ? 'border-green-600 bg-green-50' : ''"
                      @click="selectedMethod = 'bank'" type="button">
                      <span>โอนผ่านธนาคาร</span>
                      <span v-if="selectedMethod === 'bank'" class="text-green-600 text-lg ml-2">✔</span>
                    </button>
                  </div>


                  <!-- เนื้อหาโอนผ่านธนาคาร -->
                  <div v-if="selectedMethod === 'bank'" class="ml-4 mb-2 flex flex-col md:text-base text-xs mt-2">
                    <label class="flex items-center space-x-2 mt-2">
                      <input type="radio" name="bank" value="kbank" class="h-6" v-model="selectedBank" />
                      <span>ธนาคารกสิกรไทย</span>
                    </label>
                    <label class="flex items-center space-x-2 mt-2">
                      <input type="radio" name="bank" value="bbl" v-model="selectedBank" />
                      <span>ธนาคารกรุงเทพ</span>
                    </label>
                    <label class="flex items-center space-x-2 mt-2">
                      <input type="radio" name="bank" value="KTB" v-model="selectedBank" />
                      <span>ธนาคารกรุงไทย</span>
                    </label>
                    <label class="flex items-center space-x-2 mt-2">
                      <input type="radio" name="bank" value="scb" v-model="selectedBank" />
                      <span>ธนาคารไทยพาณิชย์</span>
                    </label>
                  </div>


                </div>
                <button class="w-full bg-green-600 px-3 mt-3 py-2 md:py-0 rounded-md text-white"
                  :disabled="!selectedMethod" @click="submitPayment">
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </div>

        <Drawer v-model:visible="visibleRight" header="ประวัติการทำรายการ">
          <div>
            <HistoryPromotion />
          </div>
        </Drawer>
      </div>
    </template>
  </TemplatePartner>
</template>


<script setup>
import TemplatePartner from "@/components/TemplatePartner.vue";
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import Drawer from '@/components/element/Drawer.vue'
import HistoryPromotion from '@/views/Partner/Partner/Promotion/HistoryPromotion.vue'

const visibleRight = ref(false)


const historyList = [
  {
    name: 'Premium',
    start: '2024-06-01',
    end: '2024-12-01',
    price: '200',
    status: 'ใช้งานอยู่',
    reducedPrice: '180',
    detail: 'shuysrtujlkiopoi kguilo oyp809uuuu uuuuuuuuu uuuuuuuuu klgvjkhlkkkkkkk kkkkkkk hdsry hrdty u768 i67i uy56'
  },
  {
    name: 'Premium',
    start: '2024-06-01',
    end: '2024-12-01',
    price: '200',
    status: 'ใช้งานอยู่',
    reducedPrice: '',
    detail: 'shuysrtujlkiopoi'
  },
  {
    name: 'Premium',
    start: '2024-06-01',
    end: '2024-12-01',
    price: '200',
    status: 'หมดเวลาใช้งาน',
    reducedPrice: '',
    detail: 'shtujlkiopoi',
  },
  {
    name: 'Premium',
    start: '2024-06-01',
    end: '2024-12-01',
    price: '200',
    status: 'หมดเวลาใช้งาน',
    reducedPrice: '150',
  },
  {
    name: 'Premium',
    start: '2024-06-01',
    end: '2024-12-01',
    price: '200',
    status: 'ใช้งานอยู่',
    reducedPrice: ''
  },
  {
    name: 'Premium',
    start: '2024-06-01',
    end: '2024-12-01',
    price: '200',
    status: 'ใช้งานอยู่',
    reducedPrice: '50'
  },
  {
    name: 'Premium',
    start: '2024-06-01',
    end: '2024-12-01',
    price: '200',
    status: 'ใช้งานอยู่',
    reducedPrice: ''
  },

]

const itemsPerPage = 5
const currentPage = ref(1)
const historyContainer = ref(null)
const showReceiptModal = ref(false)
const selectedReceipt = ref(null)

// คำนวณข้อมูลที่แสดงในหน้าปัจจุบัน
const paginatedHistory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return historyList.slice(start, end)
})

// คำนวณจำนวนหน้าทั้งหมด
const totalPages = computed(() => {
  return Math.ceil(historyList.length / itemsPerPage)
})

// Pagination functions
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    // เลื่อนมาที่ส่วน "บริการที่กำลังใช้งาน"
    const serviceSection = document.querySelector('.bg-stone-50')
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    // เลื่อนมาที่ส่วน "บริการที่กำลังใช้งาน"
    const serviceSection = document.querySelector('.bg-stone-50')
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const displayPrice = computed(() => {
  return (promotion) => {
    if (promotion.reducedPrice) {
      return {
        originalPrice: promotion.price || '0',
        reducedPrice: promotion.reducedPrice,
        hasDiscount: true
      }
    } else {
      return {
        originalPrice: promotion.price || '0',
        reducedPrice: null,
        hasDiscount: false
      }
    }
  }
})

const openReceiptModal = (item) => {
  selectedReceipt.value = item
  showReceiptModal.value = true
}
const closeReceiptModal = () => {
  showReceiptModal.value = false
  selectedReceipt.value = null
}

// ฟังก์ชันคำนวณส่วนลด (ส่วนน้ำ)
const calcDiscount = (item) => {
  if (!item || !item.reducedPrice) return 0
  // แปลงราคาต้นทางเป็นตัวเลข (ตัด ' บาท' ออกถ้ามี)
  const original = parseFloat((item.price || '0').replace(/[^\d.]/g, ''))
  const reduced = parseFloat(item.reducedPrice)
  return original - reduced
}


const isSidebarCollapsed = ref(false)
const allPromotions = ref([])
const showHistory = ref(false)
const showBuyModal = ref(false)
const selectedPromotion = ref(null)
const toggleMobilePromo = ref(false)
const showPaymentPopup = ref(false)

// Refs สำหรับ GSAP animation
const mobilePromoContainer = ref(null)
const mobilePromoContent = ref(null)

const handleSidebarToggle = (isCollapsed) => {
  isSidebarCollapsed.value = isCollapsed
}


const activePromotions = computed(() => {
  const today = new Date()
  return allPromotions.value.filter((promo) => {
    const finish = new Date(promo.dateFinish)
    return finish >= today
  })
})

function openPaymentPopup(promotionId) {
  const found = activePromotions.value.find(p => p.promotion_id === promotionId)
  if (found) {
    selectedPromotion.value = found
    showPaymentPopup.value = true
  }
}

function closePaymentPopup() {
  showPaymentPopup.value = false
  selectedPromotion.value = {}
}

// GSAP Animation functions
function openMobilePromo() {
  toggleMobilePromo.value = true
  nextTick(() => {
    // เริ่มต้นจากขวา
    gsap.set(mobilePromoContent.value, { x: '100%' })
    gsap.set(mobilePromoContainer.value, { opacity: 0 })

    // Animate เข้ามา
    gsap.to(mobilePromoContainer.value, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
    gsap.to(mobilePromoContent.value, {
      x: '0%',
      duration: 0.4,
      ease: 'power2.out'
    })
  })
}

function closeMobilePromo() {
  gsap.to(mobilePromoContent.value, {
    x: '100%',
    duration: 0.3,
    ease: 'power2.in'
  })
  gsap.to(mobilePromoContainer.value, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      toggleMobilePromo.value = false
    }
  })
}


watch(toggleMobilePromo, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})


onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:9999/HotelSleepGun/promotion/getAll', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    allPromotions.value = data
  } catch (e) {
    console.error('โหลดโปรโมชั่นไม่สำเร็จ:', e)
  }
})

const selectedMethod = ref(null)
const selectedBank = ref(null)

function submitPayment() {
  alert('คุณเลือกวิธี: ' + selectedMethod.value + ', ธนาคาร: ' + selectedBank.value)
}
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
