<template>
  <div class="w-full max-w-xs relative">
    <!-- Input -->
    <div class="border rounded px-3 py-2 cursor-pointer bg-white" @click="toggleCalendar" ref="inputRef">
      <input type="text" :value="formattedDate" readonly class="w-full outline-none cursor-pointer"
        placeholder="เลือกวันที่" />
    </div>

    <!-- ปฏิทิน -->
    <div v-if="isOpen" class="absolute z-50 mt-1 bg-white border rounded shadow p-4 w-full" ref="calendarRef">
      <div class="grid grid-cols-7 gap-2 text-center text-sm font-medium mb-2">
        <div v-for="d in daysShort" :key="d">{{ d }}</div>
      </div>
      <div class="grid grid-cols-7 gap-2 text-center text-sm">
        <button v-for="(date, index) in days" :key="index" :class="buttonClass(date)" @click="selectDate(date)"
          type="button">
          {{ date.getDate() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from "date-fns";

const isOpen = ref(false);
const calendarRef = ref(null);
const inputRef = ref(null);

const selectedDate = ref(null);

const today = new Date();
const daysShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const days = eachDayOfInterval({
  start: startOfMonth(today),
  end: endOfMonth(today),
});

function toggleCalendar() {
  isOpen.value = !isOpen.value;
}

function selectDate(date) {
  selectedDate.value = date;
  isOpen.value = false; // ปิดปฏิทินทันทีที่เลือกวัน
}

function buttonClass(date) {
  const isSelected = selectedDate.value && isSameDay(date, selectedDate.value);
  return [
    "h-8 w-8 rounded-full",
    isSelected ? "bg-blue-500 text-white font-bold" : "hover:bg-gray-200",
  ].join(" ");
}

function formatDate(date) {
  return date ? format(date, "dd/MM/yyyy") : "";
}

const formattedDate = computed(() => formatDate(selectedDate.value));

// ปิดปฏิทินเมื่อคลิกนอก
function handleClickOutside(e) {
  if (calendarRef.value && !calendarRef.value.contains(e.target) && inputRef.value && !inputRef.value.contains(e.target)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
button {
  outline: none;
}
</style>
