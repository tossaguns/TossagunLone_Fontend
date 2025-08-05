<template>
  <div class="relative w-full">
    <input :type="type" :id="id" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      class="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-base placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
      placeholder=" " />
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
defineProps({
  modelValue: String,
  label: String,
  id: String,
  type: {
    type: String,
    default: 'text'
  }
});
defineEmits(['update:modelValue']);
</script>