<template>
  <transition name="drawer">
    <div v-if="visible" class="fixed inset-0 z-50 flex justify-end">
      <!-- พื้นที่ว่างใสๆ (ไม่สามารถคลิกเพื่อปิดได้แล้ว) -->
      <div class="absolute inset-0"></div>

      <!-- Drawer -->
      <div class="relative xl:w-1/4 md:w-1/3 w-1/2 max-w-full h-full bg-white shadow-xl z-50 lg:p-2 p-4 overflow-y-auto"
        @click.stop>
        <div class="flex justify-between items-center mb-4 lg:px-4">
          <h2 class="text-lg font-semibold pt-8">{{ header }}</h2>
          <button @click="emitCloseWithReset" class="text-gray-500 hover:text-gray-800">X</button>
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  visible: Boolean,
  header: {
    type: String,
    default: 'Drawer',
  },
})

const emit = defineEmits(['update:visible'])

const emitClose = () => {
  emit('update:visible', false)
}

const emitCloseWithReset = () => {
  emit('update:visible', false)
  emit('reset')
}
</script>

<style scoped>
.drawer-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.drawer-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.drawer-leave-from {
  transform: translateX(0) scale(1);
  opacity: 1;
}

.drawer-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.8s ease;
}
</style>
