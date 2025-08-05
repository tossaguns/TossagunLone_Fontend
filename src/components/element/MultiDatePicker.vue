<template>
  <div class="w-full max-w-md relative">
    <!-- ปุ่ม input -->
    <div class="border px-3 py-2 rounded-md cursor-pointer bg-white flex items-center justify-between"
      @click="toggleCalendar" ref="inputRef">
      <span class="text-sm text-gray-700">เลือกวันที่ (หลายวัน)</span>
      <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>

    <!-- ปฏิทิน -->
    <div v-if="isOpen" class="absolute z-50 bg-white shadow-md border rounded-md mt-2 p-4" ref="calendarRef">
      <div class="grid grid-cols-7 gap-2 text-center text-sm font-medium mb-2">
        <div v-for="d in daysShort" :key="d">{{ d }}</div>
      </div>
      <div class="grid grid-cols-7 gap-2 text-center text-sm">
        <button v-for="(date, index) in days" :key="index" :class="buttonClass(date)" @click="toggleSelect(date)">
          {{ date.getDate() }}
        </button>
      </div>

      <div class="text-right mt-4">
        <button class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" @click="confirmDates">
          ยืนยัน
        </button>
      </div>
    </div>

    <!-- รายการวันที่ที่เลือก -->
    <div class="mt-2">
      <label>รายการวันหยุด (จะไม่เเสดงโรงเเรมให้เลือกในหน้าเว็บ SleepGun ในวันที่เลือก)</label>
      <div v-if="confirmedDates.length > 0" class="mt-4 flex flex-wrap gap-2">
        <span v-for="(d, i) in confirmedDates" :key="i"
          class="bg-amber-100 text-stone-800 text-sm px-3 py-1 rounded-full">
          {{ formatDate(d) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  format,
} from "date-fns";

const isOpen = ref(false);
const calendarRef = ref(null);
const inputRef = ref(null);  // เพิ่ม ref สำหรับ input container
const selectedDates = ref([]);
const confirmedDates = ref([]);

const today = new Date();
const daysShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const days = eachDayOfInterval({
  start: startOfMonth(today),
  end: endOfMonth(today),
});

// เปิด/ปิดปฏิทิน
function toggleCalendar() {
  isOpen.value = !isOpen.value;
}

// toggle วันที่
function toggleSelect(date) {
  const index = selectedDates.value.findIndex((d) => isSameDay(d, date));
  if (index !== -1) {
    selectedDates.value.splice(index, 1); // เอาออก
  } else {
    selectedDates.value.push(date); // เพิ่ม
  }
}

function confirmDates() {
  confirmedDates.value = [...selectedDates.value].sort((a, b) => a - b);
  isOpen.value = false;
}

function formatDate(date) {
  return format(date, "dd/MM/yyyy");
}

// ปิดปฏิทินเมื่อคลิกนอก input หรือ calendar
function handleClickOutside(e) {
  const target = e.target;
  if (
    calendarRef.value &&
    !calendarRef.value.contains(target) &&
    inputRef.value &&
    !inputRef.value.contains(target)
  ) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

function buttonClass(date) {
  const isSelected = selectedDates.value.some((d) => isSameDay(d, date));
  return [
    "h-8 w-8 rounded-full",
    isSelected ? "bg-blue-500 text-white font-bold" : "hover:bg-gray-200",
  ].join(" ");
}
</script>

<style scoped>
button {
  outline: none;
}
</style>
