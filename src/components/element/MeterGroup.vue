
<template>
  <div class=" w-full max-w-md">
    <div v-for="(item, index) in value" :key="index" class="mb-4">
      <div class="flex justify-between">
        <span class="md:text-sm text-xxs font-medium">{{ item.label }}</span>
        <span class="md:text-sm text-xxs font-medium">{{ item.value }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="h-2 rounded-full transition-all duration-500"
          :style="{ width: `${item.value}%`, backgroundColor: item.color }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: Array,
    required: true
  }
});
</script>

