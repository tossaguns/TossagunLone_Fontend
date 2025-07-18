<template>
  <div class="card flex justify-center">
    <input :placeholder="mask" v-model="inputValue" @input="applyMask" class="border px-3 py-2 rounded-md" />
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';

const props = defineProps({
  modelValue: String,
  mask: {
    type: String,
    default: '99-999999',
  },
});

const emit = defineEmits(['update:modelValue']);
const inputValue = ref(props.modelValue || '');

watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal || '';
});

function applyMask(e) {
  let digits = inputValue.value.replace(/\D/g, '');
  let formatted = '';
  let mask = props.mask;
  let digitIndex = 0;

  for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
    if (mask[i] === '9') {
      formatted += digits[digitIndex++];
    } else {
      formatted += mask[i];
    }
  }

  inputValue.value = formatted;
  emit('update:modelValue', formatted);
}
</script>
