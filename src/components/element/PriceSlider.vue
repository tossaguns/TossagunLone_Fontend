<template>
  <div class="card flex flex-col items-center space-y-4">
    <div class="md:text-xs text-xxs font-semibold text-stone-500">
      ระยะราคา: {{ formattedMin }} - {{ formattedMax }} บาท
    </div>

    <Slider
      v-model="value"
      :min="0"
      :max="50000"
      :step="100"
      range
      class="w-32"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Slider from 'primevue/slider';

const value = ref([0, 50000]);

const formatCurrency = (num) => {
  return num.toLocaleString('th-TH');
};

const formattedMin = computed(() => formatCurrency(value.value[0]));
const formattedMax = computed(() => formatCurrency(value.value[1]));
</script>

<style>
.p-slider-range {
  background-color: #facc15 !important; /* yellow-400 */
}

.p-slider-handle {
  background-color: #facc15 !important;
  border-color: #facc15 !important;
}
</style>
