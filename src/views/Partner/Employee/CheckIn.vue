<template>
  <TemplateEmployee>
    <template #header>
      <label>Check-in</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto text-stone">
        <div>
          <label class="text-2xl font-bold">Check-in</label>
        </div>
        <div class="max-w-7xl mx-auto mt-8">
          <div class="md:p-6">
            <div class="flex justify-between items-center mb-4">
              <button @click="prevMonth"
                class="md:px-3 px-2 py-1 bg-stone-100 rounded hover:bg-stone-300 md:text-base text-xs">
                ◀ เดือนก่อนหน้า
              </button>
              <h2 class="md:text-xl text-sm font-bold cursor-pointer text-green-600" @click="openMonthYearPicker">
                {{ monthNames[currentMonth] }} {{ currentYear }}
              </h2>
              <button @click="nextMonth"
                class="md:px-3 px-2 py-1 bg-stone-100 rounded hover:bg-stone-300 md:text-base text-xs">
                เดือนถัดไป ▶
              </button>
            </div>

            <!-- ปฏิทิน -->
            <div class="grid grid-cols-7 gap-2 text-center">
              <div class="font-bold text-green-600" v-for="d in days" :key="d">{{ d }}</div>
              <div v-for="day in calendarDays" :key="day.date + Math.random()"
                class="border p-2 rounded-md relative cursor-pointer hover:bg-blue-50 min-h-[60px]"
                @click="selectDate(day)">
                <div class="text-sm font-semibold text-right">{{ day.day }}</div>
                <div v-if="day.bookings.length" class="mt-1 text-xs bg-green-200 text-green-800 rounded px-1 truncate">
                  {{ day.bookings[0].title }}
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <div class="">
              <div class="flex flex-col md:flex-row justify-end items-center md:space-x-2">
                <div class="space-x-2 mb-2 md:mb-0">
                  <input type="text" class="border rounded-md p-2" placeholder="ค้นหาห้องพัก.."></input>
                  <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">ค้นหา</button>
                </div>
                <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">ล้างค้นหา</button>
              </div>
            </div>



            <div class="mt-8">
              <label class="text-xl font-bold">รายละเอียดการ Check-in</label>
            </div>
            <div class="mt-6">
              <label class="text-base  font-bold px-4">รายการจองจาก SleepGunWeb</label>

              <div class="mt-4 lg:text-base md:text-sm text-xs">
                <div
                  class="flex flex-col xl:flex-row xl:justify-between items-center border w-full  rounded-md shadow-md p-4">

                  <div class="xl:w-4/6 w-full">
                    <div>
                      <div>
                        <label class="font-bold">วันที่เข้า check-in : </label>
                        <label>{{ dateCheckInSleepGunWebStart }} - {{ dateCheckInSleepGunWebEnd }}</label>
                      </div>
                      <div>
                        <label class="font-bold">หมายเลขห้อง : </label>
                        <label>{{ roomNumber }}</label>
                      </div>
                      <div>
                        <label class="font-bold">ประเภทห้องพัก : </label>
                        <label>{{ typeRoom }}</label>
                      </div>
                      <div>
                        <label class="font-bold">เข้าพักสูงสุดได้ : </label>
                        <label>{{ maxStayPeople }} คน</label>
                      </div>
                    </div>

                    <div class="mt-4 space-y-1">
                      <div>
                        <div>
                          <label class="font-bold">หลักฐานการจอง : </label>
                          <label>{{ proofBooking }}</label>
                        </div>
                      </div>
                      <div>
                        <label class="font-bold">เรียกใช้เตียงเสริม : </label>
                        <label :class="hasUseExtraBed ? 'bg-green-500 text-white px-2 rounded' : ''">
                          {{ hasUseExtraBed ? 'ใช้งาน' : 'ไม่ใช้งาน' }}
                        </label>
                        <label class="font-bold"> ประเภท : {{ typeExtraBed }} ,ราคา / คืน : {{
                          priceExtraBedByDay }} บาท</label>
                      </div>
                      <div>
                        <label class="font-bold">ค่ามัดจำ : ค่าจุญเเจ ({{ depositKey }}) + ค่ามัดจำห้อง ({{ depositRoom
                        }}) = {{
                            depositTotal }} บาท</label>
                      </div>
                    </div>

                    <div class="lg:mr-16">
                      <hr class="my-4 " />
                    </div>

                    <div>
                      <div>
                        <label class="font-bold">ชื่อผู้ทำการจอง : </label>
                        <label>{{ customerName }}</label>
                      </div>
                      <div>
                        <label class="font-bold">จำนวนคนที่เข้าพักทั้งหมด : </label>
                        <label>{{ numberOfPeople }}</label>
                      </div>
                    </div>
                  </div>


                  <div class="xl:w-2/6 w-full mt-6 xl:mt-0 text-stone-500 ">
                    <div>
                      <div>
                        <label class="font-bold">ราคาห้องปกติ : </label>
                        <label>{{ priceRoomOld }} บาท</label>
                      </div>
                      <div>
                        <label class="font-bold">ราคาห้องที่ลดราคาเเล้ว : </label>
                        <label>{{ priceRoomNew }} บาท</label>
                      </div>
                      <div>
                        <label class="font-bold">ราคาห้องที่ต้องชำระ : ค่าเตียงเสริม/คืน + ค่ามัดจำ + ค่าห้อง = {{
                          priceRoomTotal }}
                          บาท</label>
                      </div>
                    </div>

                    <div class="mt-8 flex space-x-2 items-center">
                      <div class="md:w-1/3 w-full">
                        <button
                          class=" text-red-500 border border-red-500 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white w-full"
                          @click="openChangeRoomModal">
                          เปลี่ยนห้องพัก
                        </button>
                      </div>
                      <div class="md:w-2/3 w-full">
                        <button
                          class="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 w-full flex flex-col justify-center items-center shadow-lg"
                          @click="openCheckInModal">
                          <label>Check-in ห้องนี้</label>
                          <label>{{ currentTime }}</label>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div class="mt-8">
              <label class="md:text-base text-sm font-bold px-4">รายการ Walk-in</label>
            </div>



          </div>
        </div>
      </div>
    </template>
  </TemplateEmployee>


  <!-- Modal รายละเอียด -->
  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-xl relative">
      <button class="absolute top-2 right-2 text-gray-500 hover:text-red-500" @click="closeModal">
        ✕
      </button>

      <h3 class="text-lg font-bold mb-4">รายละเอียดการจอง ({{ selectedDate }})</h3>

      <div v-for="(booking, index) in selectedBookings" :key="index" class="mb-4 p-4 bg-gray-50 rounded-md border">
        <p><strong>ชื่อผู่จอง:</strong> {{ booking.customerName }}</p>
        <p><strong>เลขห้อง:</strong> {{ booking.roomNumber }}</p>
        <p><strong>Check-in:</strong> {{ booking.checkIn }}</p>
        <p><strong>Check-out:</strong> {{ booking.checkOut }}</p>
        <p><strong>ราคา:</strong> {{ booking.price }} THB</p>
        <p><strong>สถานะ:</strong>
          <span :class="{
            'text-green-600': booking.status === 'checked-in',
            'text-yellow-600': booking.status === 'booked',
            'text-red-600': booking.status === 'checked-out'
          }">{{ booking.status }}</span>
        </p>

        <div class="mt-2 space-x-2">
          <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" @click="checkIn(booking)"
            v-if="booking.status === 'booked'">เช็คอิน</button>

          <button class="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800" @click="checkOut(booking)"
            v-if="booking.status === 'checked-in'">เช็คเอาท์</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal เปลี่ยนห้องพัก -->
  <div v-if="showChangeRoomModal"
    class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
      <div class="flex  justify-between items-center p-4 border-b">
        <div class="flex flex-col">
          <h2 class="text-lg font-bold">เปลี่ยนห้องพัก</h2>
          <label class="text-stone-400 md:text-sm text-xs">เเสดงรายการห้องพักทั้งหมดที่ใช้งานได้</label>
        </div>
        <button @click="closeChangeRoomModal" class="text-xl font-bold">x</button>
      </div>
      <div class="p-4 overflow-y-auto" style="max-height:60vh;">
        <div>
          <label class="font-bold">ห้องพักที่เปิดในเว็บไซต์ sleepgunweb.com</label>
          <div v-for="room in roomsWeb" :key="room.id"
            class="border rounded-md p-4 flex justify-between items-center mb-2">
            <div>
              <div>
                <label>หมายเลขห้อง : </label>
                <label>{{ room.roomNumber }}</label>
              </div>
              <div>
                <label>ประเภทห้องพัก : </label>
                <label>{{ room.typeRoom }}</label>
              </div>
              <div>
                <label>ราคา : </label>
                <label>{{ room.price }} บาท</label>
              </div>
            </div>
            <div>
              <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                @click="selectWebRoom(room)">เลือกห้องนี้</button>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <label class="font-bold">ห้องพักที่มีอยู่ในระบบ</label>
          <div v-for="room in roomsSystem" :key="room.id"
            class="border rounded-md p-4 flex justify-between items-center mb-2">
            <div>
              <div>
                <label>หมายเลขห้อง : </label>
                <label>{{ room.roomNumber }}</label>
              </div>
              <div>
                <label>ประเภทห้องพัก : </label>
                <label>{{ room.typeRoom }}</label>
              </div>
              <div>
                <label>ราคา : </label>
                <label>{{ room.price }} บาท</label>
              </div>
            </div>
            <div>
              <button class="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 w-full"
                @click="selectSystemRoom(room)">เลือกห้องนี้</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal เปลี่ยนห้องพัก 2   v-if="showChangeRoomModal2"-->
  <div v-if="showChangeRoomModal2"
    class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col md:text-base text-xs">
      <div class="flex  justify-between items-center p-4 border-b">
        <div class="flex items-center">
          <button @click="goBackToFirstModal" class="mr-3 text-blue-500 hover:text-blue-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <h2 class="lg:text-lg text-base font-bold">เหตุผลที่ทำการเปลี่ยนห้องพัก</h2>
        </div>
        <button @click="closeChangeRoomModal2" class="text-xl font-bold">x</button>
      </div>
      <div class="p-4 overflow-y-auto" style="max-height:60vh;">
        <div>
          <label class="font-bold">เหตุผลที่ทำการเปลี่ยนห้องพัก</label>
          <div class="mt-2">
            <textarea v-model="reasonChangeRoom" class="border rounded-md p-2 w-full"
              placeholder="เหตุผลที่ทำการเปลี่ยนห้องพัก.."></textarea>
          </div>
        </div>

        <div>
          <hr class="my-4" />
        </div>

        <div class="mt-4">
          <div class="my-5">
            <label>หากลูกค้าต้องการเข้าพักก่อนเวลาให้เช็คกล่องด้านล่าง</label>
            <div class="flex items-center space-x-1 px-4">
              <input type="checkbox" v-model="isCheckInEarly"></input>
              <label>ลูกค้าเข้าพักก่อนเวลา</label>
            </div>

            <!-- หากลูกกดเช็คบ๊อกให้เเสดงส่วนนนี้ -->
            <div v-if="isCheckInEarly" class="mt-8 border rounded-md p-4 shadow-md">
              <div class="flex justify-center">
                <label class="font-bold">เข้าพักก่อนเวลากี่ชั่วโมง (เกิน 35 นาทีนับเป็น 1 ชั่วโมง)</label>
              </div>
              <div class="mt-4">
                <label>ราคารวมที่ต้องชำระ : <input type="number" v-model="earlyCheckInHours"
                    class="border rounded-md p-2 w-full" placeholder="เข้าพักก่อนเวลากี่ชั่วโมง.." min="0"
                    max="24"></input> </label>
                <label class="text-xxs text-stone-500">* {{ priceLateCheckInbyHoure }}
                  บาท/ชั่วโมง ราคารวมที่ต้องชำระ : {{ priceLateCheckInbyHoureSum }} บาท</label>
              </div>
            </div>
          </div>

          <div>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full">ตกลง</button>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal Check-in -->
  <div v-if="showCheckInModal" class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col md:text-base text-xs">
      <div class="flex  justify-between items-center p-4 border-b">
        <div class="flex flex-col">
          <h2 class="lg:text-lg font-bold text-base">ยืนยันการ check-in</h2>
        </div>
        <button @click="closeCheckInModal" class="text-xl font-bold">x</button>
      </div>
      <div class="p-4 overflow-y-auto" style="max-height:60vh;">
        <div>
          <div class="mt-4">
            <div class="my-5">
              <label>หากลูกค้าต้องการเข้าพักก่อนเวลาให้เช็คกล่องด้านล่าง</label>
              <div class="flex items-center space-x-1 px-4 mt-1">
                <input type="checkbox" v-model="isCheckInEarly"></input>
                <label>ลูกค้าเข้าพักก่อนเวลา</label>
              </div>

              <!-- หากลูกกดเช็คบ๊อกให้เเสดงส่วนนนี้ -->
              <div v-if="isCheckInEarly" class="mt-8 border rounded-md p-4 shadow-md">
                <div class="flex justify-center">
                  <label class="font-bold">เข้าพักก่อนเวลากี่ชั่วโมง (เกิน 35 นาทีนับเป็น 1 ชั่วโมง)</label>
                </div>
                <div class="mt-4">
                  <label>ราคารวมที่ต้องชำระ : <input type="number" v-model="earlyCheckInHours"
                      class="border rounded-md p-2 w-full" placeholder="เข้าพักก่อนเวลากี่ชั่วโมง.." min="0"
                      max="24"></input> </label>
                  <label class="text-xxs text-stone-500">* {{ priceLateCheckInbyHoure }}
                    บาท/ชั่วโมง ราคารวมที่ต้องชำระ : {{ priceLateCheckInbyHoureSum }} บาท</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 ">
          <div class="flex justify-center">
            <label class="font-bold">ยืนยันการ Check-in ใช่หรือไม่?</label>
          </div>
          <div class="flex space-x-2 mt-4">
            <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
              @click="closeCheckInModal">ยกเลิก</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full">ตกลง</button>
          </div>
        </div>
      </div>
    </div>
  </div>





  <!-- Modal เลือกเดือนและปี -->
  <div v-if="showMonthYearPicker" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-xs relative">
      <button class="absolute top-2 right-2 text-gray-500 hover:text-red-500" @click="closeMonthYearPicker">
        ✕
      </button>
      <h3 class="text-lg font-bold mb-4">เลือกเดือนและปี</h3>
      <div class="mb-4">
        <label class="block mb-1">ปี</label>
        <input type="number" v-model="tempYear" class="border rounded px-2 py-1 w-full" min="2000" max="2100" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">เดือน</label>
        <select v-model="tempMonth" class="border rounded px-2 py-1 w-full">
          <option v-for="(m, idx) in monthNames" :key="idx" :value="idx">{{ m }}</option>
        </select>
      </div>
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full" @click="selectMonthYear">
        เลือก
      </button>
      <button
        class="mt-2 py-2 rounded hover:bg-gray-500 w-full text-xs underline underline-offset-2 hover:text-blue-500"
        @click="goToToday">
        กลับไปหน้าปัจจุบัน
      </button>
    </div>
  </div>
</template>

<script setup>
import TemplateEmployee from "@/components/TemplateEmployee.vue";


import { ref, computed, onMounted, onUnmounted } from 'vue'

const days = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']

const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())

const selectedDate = ref('')
const selectedBookings = ref([])
const showModal = ref(false)
const showMonthYearPicker = ref(false)
const tempYear = ref(currentYear.value)
const tempMonth = ref(currentMonth.value)

const currentTime = ref('')
let timeInterval = null

// ข้อมูลจำลองสำหรับห้องพักที่เปิดในเว็บไซต์ sleepgunweb.com (3 รายการ)
const roomsWeb = ref([
  {
    id: 1,
    roomNumber: '101',
    typeRoom: 'Deluxe',
    price: 2500,
    status: 'Available'
  },
  {
    id: 2,
    roomNumber: '102',
    typeRoom: 'Standard',
    price: 1800,
    status: 'Available'
  },
  {
    id: 3,
    roomNumber: '103',
    typeRoom: 'Suite',
    price: 3500,
    status: 'Available'
  }
])

// ข้อมูลจำลองสำหรับห้องพักที่มีอยู่ในระบบ (5 รายการ)
const roomsSystem = ref([
  {
    id: 1,
    roomNumber: '201',
    typeRoom: 'Deluxe',
    price: 2500,
    status: 'Available'
  },
  {
    id: 2,
    roomNumber: '202',
    typeRoom: 'Standard',
    price: 1800,
    status: 'Available'
  },
  {
    id: 3,
    roomNumber: '203',
    typeRoom: 'Suite',
    price: 3500,
    status: 'Available'
  },
  {
    id: 4,
    roomNumber: '204',
    typeRoom: 'Family',
    price: 2800,
    status: 'Available'
  },
  {
    id: 5,
    roomNumber: '205',
    typeRoom: 'Economy',
    price: 1200,
    status: 'Available'
  }
])

// ตัวแปรสำหรับ modal เปลี่ยนห้องพัก
const showChangeRoomModal = ref(false)
const showChangeRoomModal2 = ref(false) // เพิ่มตัวแปรสำหรับ modal ที่ 2

// ตัวแปรสำหรับเหตุผลเปลี่ยนห้องพัก
const reasonChangeRoom = ref('')

// ตัวแปรสำหรับการเช็คอินก่อนเวลา
const isCheckInEarly = ref(false)
const earlyCheckInHours = ref(0)
const priceLateCheckInbyHoure = ref(500) // ราคาต่อชั่วโมง (บาท)

// คำนวณราคารวมสำหรับการเช็คอินก่อนเวลา
const priceLateCheckInbyHoureSum = computed(() => {
  return earlyCheckInHours.value * priceLateCheckInbyHoure.value
})

function openChangeRoomModal() {
  showChangeRoomModal.value = true
}

function closeChangeRoomModal() {
  showChangeRoomModal.value = false
}

function selectWebRoom(room) {
  console.log('เลือกห้องจากเว็บ:', room)
  showChangeRoomModal.value = false // ปิด modal แรก
  showChangeRoomModal2.value = true // เปิด modal ที่ 2
}

function selectSystemRoom(room) {
  console.log('เลือกห้องจากระบบ:', room)
  showChangeRoomModal.value = false // ปิด modal แรก
  showChangeRoomModal2.value = true // เปิด modal ที่ 2
}

function goBackToFirstModal() {
  showChangeRoomModal2.value = false
  showChangeRoomModal.value = true
}

function closeChangeRoomModal2() {
  showChangeRoomModal2.value = false
}

// ฟังก์ชันอัปเดตเวลาเรียลไทม์
function updateCurrentTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// ✅ ตัวอย่างข้อมูลจำลอง
const bookings = ref([
  {
    date: '2025-07-26',
    title: 'คุณสมชาย',
    customerName: 'สมชาย ใจดี',
    roomNumber: '101',
    checkIn: '14:00',
    checkOut: '12:00',
    price: 2500,
    note: '',
    status: 'booked',
  },
  {
    date: '2025-07-27',
    title: 'คุณณัฐวุฒิ',
    customerName: 'ณัฐวุฒิ แสงทอง',
    roomNumber: '201',
    checkIn: '13:00',
    checkOut: '11:30',
    price: 3100,
    note: 'ต้องการเตียงเสริม',
    status: 'checked-in',
  },
  {
    date: '2025-07-28',
    title: 'คุณสุรีย์',
    customerName: 'สุรีย์ สมหวัง',
    roomNumber: '105',
    checkIn: '15:00',
    checkOut: '12:00',
    price: 2800,
    note: '',
    status: 'booked',
  },
  {
    date: '2025-08-01',
    title: 'คุณเจน',
    customerName: 'เจนจิรา ลมดี',
    roomNumber: '303',
    checkIn: '12:00',
    checkOut: '10:00',
    price: 3300,
    note: 'มีสัตว์เลี้ยง',
    status: 'booked',
  },
  {
    date: '2025-08-02',
    title: 'คุณภัทร',
    customerName: 'ภัทร เมืองใหม่',
    roomNumber: '204',
    checkIn: '13:30',
    checkOut: '11:00',
    price: 4000,
    note: '',
    status: 'checked-out',
  }
])

const calendarDays = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value, 1)
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const startDay = date.getDay()

  const days = []

  for (let i = 0; i < startDay; i++) {
    days.push({ day: '', date: '', bookings: [] })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    const dayBookings = bookings.value.filter(b => b.date === dateStr)
    days.push({ day: i, date: dateStr, bookings: dayBookings })
  }

  return days
})

function selectDate(day) {
  if (!day.date) return
  selectedDate.value = day.date
  selectedBookings.value = [...day.bookings]
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function checkIn(booking) {
  booking.status = 'checked-in'
}

function checkOut(booking) {
  booking.status = 'checked-out'
}

function openMonthYearPicker() {
  tempYear.value = currentYear.value
  tempMonth.value = currentMonth.value
  showMonthYearPicker.value = true
}
function closeMonthYearPicker() {
  showMonthYearPicker.value = false
}
function selectMonthYear() {
  currentYear.value = tempYear.value
  currentMonth.value = tempMonth.value
  showMonthYearPicker.value = false
}

function goToToday() {
  const today = new Date()
  tempYear.value = today.getFullYear()
  tempMonth.value = today.getMonth()
  currentYear.value = tempYear.value
  currentMonth.value = tempMonth.value
  showMonthYearPicker.value = false
}

const showCheckInModal = ref(false)
function openCheckInModal() {
  showCheckInModal.value = true
}
function closeCheckInModal() {
  showCheckInModal.value = false
}

// ข้อมูลจำลองสำหรับรายละเอียดการ Check-in
const dateCheckInSleepGunWebStart = ref('2025-07-26')
const dateCheckInSleepGunWebEnd = ref('2025-07-28')
const roomNumber = ref('101')
const typeRoom = ref('Deluxe Room')
const maxStayPeople = ref(4)
const proofBooking = ref('Booking ID: SGW-2025-001234')
const hasUseExtraBed = ref(true)
const typeExtraBed = ref('เตียงเสริมเดี่ยว')
const priceExtraBedByDay = ref(500)
const depositKey = ref(1000)
const depositRoom = ref(2000)
const depositTotal = computed(() => depositKey.value + depositRoom.value)
const customerName = ref('คุณสมชาย ใจดี')
const numberOfPeople = ref(3)
const priceRoomOld = ref(3500)
const priceRoomNew = ref(2800)
const priceRoomTotal = computed(() => {
  let total = priceRoomNew.value + depositTotal.value
  if (hasUseExtraBed.value) {
    total += priceExtraBedByDay.value
  }
  return total
})

onMounted(() => {
  // future: ดึงข้อมูลจาก backend
  updateCurrentTime() // อัปเดตเวลาครั้งแรก
  timeInterval = setInterval(updateCurrentTime, 1000) // อัปเดตทุก 1 วินาที
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>