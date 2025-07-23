<template>
  <div class="relative w-full">
    <input
      v-model="searchQuery"
      @input="handleSearch"
      @keyup.enter="handleSearch"
      type="text"
      :placeholder="placeholder"
      class="border rounded-md w-full pl-10 pr-3 py-2 md:text-base text-xs"
    />
    <svg
      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      fill="none" viewBox="0 0 24 24" stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
    </svg>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'ค้นหา...',
  },
});

const emit = defineEmits(['update:modelValue', 'search']);

const searchQuery = ref(props.modelValue || '');

watch(searchQuery, (val) => {
  emit('update:modelValue', val);
});

const handleSearch = () => {
  emit('search', searchQuery.value);
};
</script>
