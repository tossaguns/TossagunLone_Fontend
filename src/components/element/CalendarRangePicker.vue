<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

import { addMonths, format, isBefore } from "date-fns";
import CalendarMonth from "./CalendarMonth.vue";

const startDate = ref(null);  // วันที่แสดงใน input
const endDate = ref(null);

const tempStartDate = ref(null);  // วันที่เลือกในปฏิทิน (ยังไม่ยืนยัน)
const tempEndDate = ref(null);
const hoverDate = ref(null);
const isOpen = ref(false);
const calendarRef = ref(null);

const today = new Date();
const firstMonth = {
  year: today.getFullYear(),
  month: today.getMonth(),
};
const secondMonth = {
  year: addMonths(today, 1).getFullYear(),
  month: addMonths(today, 1).getMonth(),
};

function toggleCalendar() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    // เปิดปฏิทิน ให้ temp เก็บค่าปัจจุบันเพื่อแก้ไข
    tempStartDate.value = startDate.value;
    tempEndDate.value = endDate.value;
  }
}

function selectDate(date) {
  if (!tempStartDate.value || (tempStartDate.value && tempEndDate.value)) {
    tempStartDate.value = date;
    tempEndDate.value = null;
  } else if (date && isBefore(date, tempStartDate.value)) {
    tempEndDate.value = tempStartDate.value;
    tempStartDate.value = date;
  } else {
    tempEndDate.value = date;
  }
}

function setHoverDate(date) {
  hoverDate.value = date;
}

function confirmDate() {
  startDate.value = tempStartDate.value;
  endDate.value = tempEndDate.value;
  isOpen.value = false;
}

function formatDate(date) {
  return format(date, "dd/MM/yyyy");
}

onClickOutside(calendarRef, () => {
  isOpen.value = false;
});
</script>

<template>
  <div class="relative inline-block w-full max-w-sm">
    <!-- Input + icon -->
    <div class="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer"
      @click="toggleCalendar">
      <span class="flex-1 text-sm text-gray-700 truncate">
        <template v-if="startDate && endDate">
          {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
        </template>
        <template v-else-if="startDate">
          {{ formatDate(startDate) }}
        </template>
        <template v-else>
          เลือกช่วงวันที่
        </template>
      </span>
      <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>

    <!-- ปฏิทิน -->
    <div v-if="isOpen" class="absolute z-50 mt-2 bg-white border border-gray-300 shadow-lg rounded-md p-4"
      ref="calendarRef">
      <div class="flex gap-4">
        <CalendarMonth :year="firstMonth.year" :month="firstMonth.month" :startDate="tempStartDate"
          :endDate="tempEndDate" :hoverDate="hoverDate" @select-date="selectDate" @hover-date="setHoverDate" />
        <CalendarMonth :year="secondMonth.year" :month="secondMonth.month" :startDate="tempStartDate"
          :endDate="tempEndDate" :hoverDate="hoverDate" @select-date="selectDate" @hover-date="setHoverDate" />
      </div>

      <div class="flex justify-end mt-4">
        <button class="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600" :disabled="!tempStartDate"
          @click="confirmDate">
          ยืนยัน
        </button>
      </div>
    </div>
  </div>
</template>
