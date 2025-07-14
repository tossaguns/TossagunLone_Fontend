<template>
  <div class="relative w-full">
    <input v-bind="$attrs" :id="id" v-model="displayValue" @keydown="handleKeydown" @input="handleInput" type="text"
      inputmode="numeric" :placeholder="placeholder || ' '"
      class="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-base placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all" />
    <label :for="id" class="absolute left-3 top-1 text-amber-500 text-xxs transition-all
        peer-placeholder-shown:top-3.5
        peer-placeholder-shown:text-base
        peer-placeholder-shown:text-gray-400
        peer-focus:top-1
        peer-focus:text-xs
        peer-focus:text-amber-500">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  id: {
    type: String,
    default: 'floatingInputNumber'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])

const displayValue = ref('')

watch(
  () => props.modelValue,
  (newVal) => {
    const raw = String(newVal).replace(/\D/g, '').replace(/^0+/, '')
    displayValue.value = formatWithCommas(raw)
  },
  { immediate: true }
)

function handleKeydown(event) {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
  const isNumber = /^[0-9]$/.test(event.key)
  if (!isNumber && !allowedKeys.includes(event.key)) {
    event.preventDefault()
  }
}

function handleInput(event) {
  const rawInput = event.target.value.replace(/,/g, '')
  let digitsOnly = rawInput.replace(/\D/g, '')

  digitsOnly = digitsOnly.replace(/^0+/, '')

  displayValue.value = formatWithCommas(digitsOnly)
  emit('update:modelValue', digitsOnly)
}

function formatWithCommas(value) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>
