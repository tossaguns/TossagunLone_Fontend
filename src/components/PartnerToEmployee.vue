<template>
  <div class="flex justify-center items-center space-x-2 mt-10">
    <button :class="[
      selected === 'partner'
        ? 'bg-amber-400 text-white font-bold border-amber-400'
        : 'text-amber-400 border border-amber-400',
      'px-4 py-2 rounded-lg transition-colors duration-200'
    ]" @click="selected = 'partner'">
      Partner
    </button>
    <button :class="[
      selected === 'employee'
        ? 'bg-stone-400 text-white font-bold border-stone-400'
        : 'text-stone-400 border border-stone-400',
      'px-4 py-2 rounded-lg transition-colors duration-200'
    ]" @click="selected = 'employee'">
      Employee
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const selected = ref('partner');
</script>
