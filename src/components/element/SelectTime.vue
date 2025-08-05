<template>
  <div class="w-full max-w-xs relative">
    <!-- Input + icon -->
    <div
      class="border rounded px-3 py-2 flex items-center cursor-pointer bg-white"
      @click="togglePicker"
      ref="inputRef"
    >
      <input
        type="text"
        :value="formattedTime"
        readonly
        class="flex-1 outline-none cursor-pointer"
        placeholder="เลือกเวลา"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 8v4l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>

    <!-- Time picker dropdown -->
    <div
      v-if="showPicker"
      class="absolute z-50 bg-white border rounded shadow p-4 mt-1 w-full"
      ref="pickerRef"
    >
      <div class="flex items-center space-x-2">
        <label class="text-sm font-medium">ชั่วโมง:</label>
        <select v-model="tempHour" class="border rounded px-2 py-1" aria-label="เลือกชั่วโมง">
          <option v-for="h in 24" :key="h" :value="h - 1">{{ (h - 1).toString().padStart(2, '0') }}</option>
        </select>

        <label class="text-sm font-medium">นาที:</label>
        <select v-model="tempMinute" class="border rounded px-2 py-1" aria-label="เลือกนาที">
          <option v-for="m in 60" :key="m" :value="m - 1">{{ (m - 1).toString().padStart(2, '0') }}</option>
        </select>
      </div>

      <div class="mt-4 text-right">
        <button
          @click="confirmTime"
          class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          ยืนยัน
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const showPicker = ref(false);
const pickerRef = ref(null);
const inputRef = ref(null);

// เวลาที่ยืนยันแล้ว (แสดงใน input)
const selectedHour = ref(null);
const selectedMinute = ref(null);

// เวลาชั่วคราวที่แก้ไขใน dropdown
const tempHour = ref(new Date().getHours());
const tempMinute = ref(new Date().getMinutes());

const formattedTime = computed(() => {
  if (selectedHour.value === null || selectedMinute.value === null) return '';
  return `${selectedHour.value.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')}`;
});

function togglePicker() {
  // เมื่อเปิด picker เซ็ต temp ให้เท่ากับ selected เพื่อแก้ไข
  tempHour.value = selectedHour.value !== null ? selectedHour.value : new Date().getHours();
  tempMinute.value = selectedMinute.value !== null ? selectedMinute.value : new Date().getMinutes();
  showPicker.value = !showPicker.value;
}

function confirmTime() {
  selectedHour.value = tempHour.value;
  selectedMinute.value = tempMinute.value;
  showPicker.value = false;
}

// ปิด dropdown เมื่อคลิกนอก
function handleClickOutside(e) {
  if (
    pickerRef.value && !pickerRef.value.contains(e.target) &&
    inputRef.value && !inputRef.value.contains(e.target)
  ) {
    showPicker.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
button {
  outline: none;
}
</style>
