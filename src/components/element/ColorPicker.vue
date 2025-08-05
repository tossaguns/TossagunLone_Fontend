<template>
  <div class="flex flex-col items-center justify-center">
    <input type="color" v-model="localColor" class="md:w-16 md:h-16 w-10 h-10 cursor-pointer " />
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '#ffcc00',
  },
});

const emit = defineEmits(['update:modelValue']);

const localColor = ref(props.modelValue);

// sync ค่าเมื่อเปลี่ยน
watch(localColor, (newVal) => {
  emit('update:modelValue', newVal);
});

// sync เมื่อ prop เปลี่ยนจากภายนอก
watch(
  () => props.modelValue,
  (newVal) => {
    localColor.value = newVal;
  }
);
</script>

<style scoped>
.card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
