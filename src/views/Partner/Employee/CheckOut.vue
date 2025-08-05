<template>
  <TemplateEmployee>
    <template #header>
      <label>Check-out</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto text-stone">
        <div>
          <label class="text-2xl font-bold">Check-out</label>
        </div>
        <div class="max-w-7xl mx-auto mt-8">
          <div class="md:p-6">
            <div class="flex justify-between items-center mb-4">
              <button @click="prevMonth"
                class="md:px-3 px-2 py-1 bg-stone-100 rounded hover:bg-stone-300 md:text-base text-xs">
                ◀ เดือนก่อนหน้า
              </button>
              <h2 class="md:text-xl text-sm font-bold cursor-pointer text-red-600" @click="openMonthYearPicker">
                {{ monthNames[currentMonth] }} {{ currentYear }}
              </h2>
              <button @click="nextMonth"
                class="md:px-3 px-2 py-1 bg-stone-100 rounded hover:bg-stone-300 md:text-base text-xs">
                เดือนถัดไป ▶
              </button>
            </div>

            <!-- ปฏิทิน -->
            <div class="grid grid-cols-7 gap-2 text-center">
              <div class="font-bold text-red-600" v-for="d in days" :key="d">{{ d }}</div>
              <div v-for="day in calendarDays" :key="day.date + Math.random()"
                class="border p-2 rounded-md relative cursor-pointer hover:bg-blue-50 min-h-[60px]"
                @click="selectDate(day)">
                <div class="text-sm font-semibold text-right">{{ day.day }}</div>
                <div v-if="day.bookings.length" class="mt-1 text-xs bg-red-200 text-red-800 rounded px-1 truncate">
                  {{ day.bookings[0].title }}
                </div>
              </div>
            </div>
          </div>

           <div class="mt-8">
            <div>
              <label class="text-xl font-bold">รายละเอียดการ Check-in</label>
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
        <p><strong>ชื่อผู้จอง:</strong> {{ booking.customerName }}</p>
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
      <button class="mt-2 py-2 rounded hover:bg-gray-500 w-full text-xs underline underline-offset-2 hover:text-blue-500" @click="goToToday">
        กลับไปวหน้าปัจจุบัน
      </button>
    </div>
  </div>
</template>

<script setup>
import TemplateEmployee from "@/components/TemplateEmployee.vue";


import { ref, computed, onMounted } from 'vue'

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

onMounted(() => {
  // future: ดึงข้อมูลจาก backend
})
</script>
