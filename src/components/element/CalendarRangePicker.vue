<script setup>
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";

import { addMonths, format, isBefore, startOfMonth, isSameMonth } from "date-fns";
import CalendarMonth from "./CalendarMonth.vue";

const startDate = ref(null);  // วันที่แสดงใน input
const endDate = ref(null);

const tempStartDate = ref(null);  // วันที่เลือกในปฏิทิน (ยังไม่ยืนยัน)
const tempEndDate = ref(null);
const hoverDate = ref(null);
const isOpen = ref(false);
const calendarRef = ref(null);

const displayDate = ref(startOfMonth(new Date()));
const today = startOfMonth(new Date());

const firstMonth = computed(() => ({
  year: displayDate.value.getFullYear(),
  month: displayDate.value.getMonth(),
}));

const secondMonth = computed(() => {
  const next = addMonths(displayDate.value, 1);
  return {
    year: next.getFullYear(),
    month: next.getMonth(),
  };
});

const canGoBack = computed(() => !isSameMonth(displayDate.value, today));

function next() {
  displayDate.value = addMonths(displayDate.value, 1);
}

function prev() {
  if (canGoBack.value) {
    displayDate.value = addMonths(displayDate.value, -1);
  }
}

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
    <div class="flex items-center border border-gray-300 rounded-md px-3 py-4 bg-white cursor-pointer"
      @click="toggleCalendar">
      <span class="flex-1 text-sm text-gray-700 truncate">
        <template v-if="startDate && endDate">
          <div class="hidden md:block">
            {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
          </div>
          <div class="block md:hidden">
            {{ format(startDate, "d MMM") }} - {{ format(endDate, "d MMM") }}
          </div>
        </template>
        <template v-else-if="startDate">
          <div class="hidden md:block">
            {{ formatDate(startDate) }}
          </div>
          <div class="block md:hidden">
            {{ format(startDate, "d MMM") }}
          </div>
        </template>
        <template v-else>
          เลือกวันที่
        </template>
      </span>
      <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>

    <!-- ปฏิทิน -->
    <div v-if="isOpen"
      class="absolute z-50 mt-2 bg-white border border-gray-300 shadow-lg rounded-md p-4 right-0 max-h-[80vh] overflow-y-auto"
      ref="calendarRef">
      <!-- Month Navigation -->
      <div class="flex justify-between items-center mb-4">
        <button @click="prev" :disabled="!canGoBack" class="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div class="flex-grow text-center font-semibold">{{ format(displayDate, 'MMMM yyyy') }}</div>
        <button @click="next" class="p-2 rounded-full hover:bg-gray-100">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <div class="flex flex-col md:flex-row gap-4">
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
