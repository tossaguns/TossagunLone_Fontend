<!-- Modal.vue -->
<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-[50rem] max-w-full mx-6 md:p-6 p-3 overflow-y-auto max-h-[90vh] relative"
    >
      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-3 mb-6">
        <h3 class="text-xl font-semibold">{{ header }}</h3>
        <button @click="$emit('update:modelValue', false)" class="text-gray-500 hover:text-red-500 text-2xl leading-none">
          x
        </button>
      </div>

      <!-- Slot Content -->
      <div class="text-sm text-gray-700 space-y-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  header: {
    type: String,
    default: "Modal Title",
  },
});

defineEmits(["update:modelValue"]);
</script>
