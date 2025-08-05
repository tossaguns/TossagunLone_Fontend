<template>
  <div class="w-[280px]">
    <div class="text-center font-bold mb-2">
      {{ monthName }} {{ year }}
    </div>
    <div class="grid grid-cols-7 gap-1 text-center text-sm font-medium mb-1">
      <div v-for="d in daysShort" :key="d">{{ d }}</div>
    </div>
    <div class="grid grid-cols-7 gap-1 text-center text-sm">
      <div v-for="(date, index) in calendarDays" :key="index">
        <button
          v-if="date"
          :class="buttonClass(date)"
          @click="emit('select-date', date)"
          @mouseover="emit('hover-date', date)"
        >
          {{ date.getDate() }}
        </button>
        <span v-else class="h-8 block"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isWithinInterval,
  format
} from "date-fns";
import { computed } from "vue";

const props = defineProps({
  year: Number,
  month: Number,
  startDate: Date,
  endDate: Date,
  hoverDate: Date,
});
const emit = defineEmits(["select-date", "hover-date"]);

const daysShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const monthName = computed(() =>
  format(new Date(props.year, props.month), "MMMM")
);

const calendarDays = computed(() => {
  const start = startOfWeek(startOfMonth(new Date(props.year, props.month)));
  const end = endOfWeek(endOfMonth(new Date(props.year, props.month)));
  const days = eachDayOfInterval({ start, end });

  // เพื่อเติมช่องว่างของวันก่อนเริ่มต้นเดือน
  const leadingEmpty = new Array(days[0].getDay()).fill(null);
  return [...leadingEmpty, ...days];
});

function buttonClass(date) {
  const isSelectedStart = props.startDate && isSameDay(date, props.startDate);
  const isSelectedEnd = props.endDate && isSameDay(date, props.endDate);
  const inRange =
    props.startDate &&
    (props.endDate || props.hoverDate) &&
    isWithinInterval(date, {
      start: props.startDate,
      end: props.endDate || props.hoverDate,
    });

  return [
    "h-8 w-8 rounded-md",
    isSelectedStart || isSelectedEnd
      ? "bg-blue-500 text-white font-bold"
      : inRange
      ? "bg-blue-100 text-blue-700"
      : "hover:bg-gray-200",
  ];
}
</script>
