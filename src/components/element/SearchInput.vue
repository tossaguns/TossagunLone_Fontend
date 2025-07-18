<template>
  <div class="flex gap-2">
    <input v-model="searchQuery" type="text" placeholder="ค้นหา..." class="border rounded px-3 py-2 w-full" />
    <button @click="handleSearch" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      ค้นหา
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue', 'search']);

const searchQuery = ref(props.modelValue || '');

const handleSearch = () => {
  emit('update:modelValue', searchQuery.value);
  emit('search', searchQuery.value);
};
</script>
