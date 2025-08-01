<template>
  <div class="space-y-4 w-full ">
    <!-- แสดงรายการที่เลือก -->
    <div v-if="modelValue.length > 0" class="flex flex-wrap gap-2 border-b rounded-t-md p-3 justify-center">
      <span v-for="(selected, i) in selectedOptions" :key="i"
        class="flex items-center space-x-2 px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
        <span>{{ selected.label }}</span>
        <button @click="removeItem(selected.value)" class="text-xs text-red-500 hover:text-red-700 bg-white rounded-full py-1 px-2"
          aria-label="ลบรายการ">
          ✕
        </button>
      </span>
    </div>

    <!-- ปุ่ม toggle เลือกรายการ -->
    <div class="flex flex-wrap md:gap-3 gap-2 p-3 justify-center">
      <button v-for="(item, index) in options" :key="index" @click="toggleItem(item.value)" :class="[
        'px-4 py-2 rounded-full border transition-all duration-200 text-xs',
        isSelected(item.value)
          ? 'bg-amber-400 text-white border-amber-400'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-amber-50'
      ]">
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

// เช็คว่าเลือกอยู่ไหม
function isSelected(value) {
  return props.modelValue.includes(value)
}

// toggle เลือก/ยกเลิก
function toggleItem(value) {
  const current = [...props.modelValue]
  const index = current.indexOf(value)
  if (index >= 0) {
    current.splice(index, 1)
  } else {
    current.push(value)
  }
  emit('update:modelValue', current)
}

// ยกเลิกเลือกจากปุ่มกากบาท
function removeItem(value) {
  const updated = props.modelValue.filter((v) => v !== value)
  emit('update:modelValue', updated)
}

// หา label ของสิ่งที่เลือกอยู่
const selectedOptions = computed(() =>
  props.options.filter((item) => props.modelValue.includes(item.value))
)
</script>
