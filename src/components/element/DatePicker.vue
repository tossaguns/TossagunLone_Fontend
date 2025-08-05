<template>
  <div class="relative w-full max-w-xs">
    <input type="text" class="w-full border rounded px-3 py-2 cursor-pointer" :value="displayValue" readonly
      @click="togglePopup" />

    <div v-if="showPopup"
      class="absolute z-50 bg-white shadow-md border mt-1 p-4 w-[320px] max-w-[90vw] right-0 sm:left-0 sm:right-auto">
      <!-- Navigation -->
      <div class="flex justify-between mb-2 items-center">
        <button @click="prevMonth" class="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">←</button>
        <div class="text-sm font-semibold">
          {{ monthNames[currentMonth1.getMonth()] }} - {{ monthNames[currentMonth2.getMonth()] }}
        </div>
        <button @click="nextMonth" class="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">→</button>
      </div>

      <!-- 2 Months -->
      <div class="flex gap-2">
        <div v-for="month in [currentMonth1, currentMonth2]" :key="month.toISOString()" class="w-1/2">
          <div class="grid grid-cols-7 text-xs text-center font-semibold mb-1">
            <span v-for="d in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="d">{{ d }}</span>
          </div>
          <div class="grid grid-cols-7 text-center text-sm">
            <span v-for="day in getDaysOfMonth(month)" :key="day.date" @click="selectDate(day.date)"
              :class="dayClass(day.date)" class="py-1 rounded hover:bg-blue-100 cursor-pointer">
              {{ day.label }}
            </span>
          </div>
        </div>
      </div>

      <div class="text-right mt-4">
        <button @click="confirmSelection" class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
          ยืนยัน
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['update:modelValue', 'dateRangeSelected'])

const props = defineProps({
  modelValue: String,
})

const showPopup = ref(false)
const startDate = ref(null)
const endDate = ref(null)

const currentMonth1 = ref(new Date())
const currentMonth2 = ref(new Date(new Date().setMonth(new Date().getMonth() + 1)))

const monthNames = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']

// ตั้งค่าวันที่ปัจจุบันเป็นค่าเริ่มต้น
onMounted(() => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  startDate.value = today
  endDate.value = tomorrow

  // ส่งข้อมูลเริ่มต้นไปยัง parent
  setTimeout(() => {
    emit('dateRangeSelected', {
      startDate: today.toISOString().split('T')[0],
      endDate: tomorrow.toISOString().split('T')[0],
      displayValue: displayValue.value
    })
  }, 100)
})

const togglePopup = () => {
  showPopup.value = !showPopup.value
}

const displayValue = computed(() => {
  if (startDate.value && endDate.value) {
    if (startDate.value.toDateString() === endDate.value.toDateString()) {
      // วันเดียว
      return formatDate(startDate.value)
    } else {
      // หลายวัน
      return `${formatDate(startDate.value)} ถึง ${formatDate(endDate.value)}`
    }
  } else if (startDate.value) {
    return formatDate(startDate.value)
  }
  return ''
})

const formatDate = (date) => {
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}-${m}-${y}`
}

const getDaysOfMonth = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []
  const startWeekday = firstDay.getDay()

  for (let i = 0; i < startWeekday; i++) {
    days.push({ label: '', date: null })
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dt = new Date(year, month, d)
    days.push({ label: d, date: dt })
  }

  return days
}

const isPastDate = (date) => {
  if (!date) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

const selectDate = (date) => {
  if (!date || isPastDate(date)) return

  // ถ้ายังไม่มีวันที่เริ่มต้น หรือมีทั้งวันที่เริ่มต้นและสิ้นสุดแล้ว ให้เริ่มใหม่
  if (!startDate.value || (startDate.value && endDate.value)) {
    startDate.value = date
    endDate.value = null
  } else {
    // ถ้ามีวันที่เริ่มต้นแล้ว ให้เลือกวันที่สิ้นสุด
    if (date >= startDate.value) {
      endDate.value = date
    } else {
      // ถ้าวันที่เลือกน้อยกว่าวันที่เริ่มต้น ให้สลับ
      endDate.value = startDate.value
      startDate.value = date
    }
  }
}

const dayClass = (date) => {
  if (!date) return ''

  // วันที่ผ่านมาแล้วแสดงเป็นสีเทา
  if (isPastDate(date)) {
    return 'text-gray-400 cursor-not-allowed'
  }

  const s = startDate.value?.toDateString()
  const e = endDate.value?.toDateString()
  const d = date.toDateString()

  if (s === d || e === d) return 'bg-blue-400 text-white'
  if (startDate.value && endDate.value && date > startDate.value && date < endDate.value) return 'bg-blue-200'
  return ''
}

const nextMonth = () => {
  currentMonth1.value = new Date(currentMonth1.value.setMonth(currentMonth1.value.getMonth() + 1))
  currentMonth2.value = new Date(currentMonth1.value.getFullYear(), currentMonth1.value.getMonth() + 1, 1)
}

const prevMonth = () => {
  currentMonth1.value = new Date(currentMonth1.value.setMonth(currentMonth1.value.getMonth() - 1))
  currentMonth2.value = new Date(currentMonth1.value.getFullYear(), currentMonth1.value.getMonth() + 1, 1)
}

const confirmSelection = () => {
  showPopup.value = false
  emit('update:modelValue', displayValue.value)

  // ส่งข้อมูลวันที่เริ่มต้นและสิ้นสุดไปยัง parent component
  if (startDate.value) {
    const result = {
      startDate: startDate.value.toISOString().split('T')[0],
      displayValue: displayValue.value
    }

    if (endDate.value) {
      result.endDate = endDate.value.toISOString().split('T')[0]
    } else {
      // ถ้าไม่มีวันที่สิ้นสุด ให้ใช้วันที่เริ่มต้นเป็นวันที่สิ้นสุด (วันเดียว)
      result.endDate = startDate.value.toISOString().split('T')[0]
    }

    emit('dateRangeSelected', result)
  }
}
</script>
