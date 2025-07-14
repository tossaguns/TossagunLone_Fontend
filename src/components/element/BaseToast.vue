<template>
  <div class="fixed top-4 right-4 z-50 mt-5">

    <TransitionGroup name="toast" tag="div" class="flex flex-col gap-y-3 relative">
      <div v-for="toast in toasts" :key="toast.id"
        class="bg-lime-200 bg-opacity-70 border border-lime-500 px-6 py-3 rounded shadow-lg w-[250px]">
        <label class="text-lime-600 font-medium">{{ toast.title }}</label>
        <div class="text-sm">{{ toast.message }}</div>
      </div>
    </TransitionGroup>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toasts = ref([])

function showToast(title, message, duration = 3000) {
  const id = Date.now() + Math.random()
  toasts.value.push({ id, title, message })

  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }, duration)
}

defineExpose({ showToast })
</script>

<style scoped>
.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-enter-active {
  transition: all 0.3s ease;
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-move {
  transition: transform 0.3s ease;
  will-change: transform;

}
</style>
