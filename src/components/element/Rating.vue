<!-- components/CustomRating.vue -->
<template>
  <div class="flex space-x-1">
    <button
      v-for="n in 5"
      :key="n"
      @click="updateValue(n)"
      class="text-3xl focus:outline-none transition-transform duration-150"
      :class="n <= modelValue ? 'text-yellow-400 scale-110' : 'text-gray-300 hover:text-yellow-300'"
    >
      ★
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue'])

function updateValue(newVal) {
  emit('update:modelValue', newVal)
}
</script>
