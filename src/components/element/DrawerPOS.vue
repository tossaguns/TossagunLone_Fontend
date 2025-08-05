<template>
  <transition name="drawer" appear>
    <div v-if="visible" class="fixed inset-0 z-50 flex justify-end">
      <!-- พื้นที่ว่างใสๆ แต่ไม่ให้คลิกเพื่อปิด -->
      <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>

      <!-- Drawer -->
      <div
        class="relative lg:w-96 md:w-80 w-64 max-w-full h-full bg-white shadow-xl z-50 lg:p-2 p-4 overflow-y-auto transition-transform duration-300"
        @click.stop>
        <div class="flex justify-between items-center mb-4 lg:px-4">
          <h2 class="text-lg font-semibold pt-8">{{ header }}</h2>
          <button @click="emitClose" class="text-gray-500 hover:text-gray-800">X</button>
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
</script>

<style scoped>
/* Animation สำหรับ Drawer (เลื่อนจากขวา) */
.drawer-enter-from>div:last-child {
  transform: translateX(100%);
}

.drawer-enter-to>div:last-child {
  transform: translateX(0);
}

.drawer-leave-from>div:last-child {
  transform: translateX(0);
}

.drawer-leave-to>div:last-child {
  transform: translateX(100%);
}

/* Animation สำหรับพื้นหลัง (เฟด) */
.drawer-enter-from .bg-black {
  opacity: 0;
}

.drawer-enter-to .bg-black {
  opacity: 0.5;
}

.drawer-leave-from .bg-black {
  opacity: 0.5;
}

.drawer-leave-to .bg-black {
  opacity: 0;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
