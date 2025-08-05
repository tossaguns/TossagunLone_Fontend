<!-- Modal.vue -->
<template>
  <transition name="dialog" appear>
    <div v-if="modelValue"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div
        class="bg-white rounded-lg shadow-lg w-[50rem] max-w-full mx-6 md:p-6 p-3 overflow-y-auto max-h-[90vh] relative transition-all duration-300"
        :class="modelValue ? 'animate-jump-in animate-ease-out' : 'animate-jump-out animate-ease-out'">
        <!-- Header -->
        <div class="flex justify-between items-center border-b pb-3 mb-6">
          <h3 class="text-xl font-semibold">{{ header }}</h3>
          <button @click="closeDialog" class="text-gray-500 hover:text-red-500 text-2xl leading-none">
            x
          </button>
        </div>

        <!-- Slot Content -->
        <div class="text-sm text-gray-700 space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  header: {
    type: String,
    default: "Modal Title",
  },
});

const emit = defineEmits(["update:modelValue"]);

const closeDialog = () => {
  // เพิ่ม animation สำหรับการปิด
  const dialog = document.querySelector('.animate-jump-in');

  if (dialog) {
    dialog.classList.remove('animate-jump-in', 'animate-ease-out');
    dialog.classList.add('animate-jump-out', 'animate-ease-out');
  }

  // รอให้ animation เสร็จแล้วค่อยปิด
  setTimeout(() => {
    emit('update:modelValue', false);
  }, 100);
};
</script>

<style scoped>
/* Animation สำหรับ Dialog */
@keyframes jumpIn {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes jumpOut {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  100% {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
  }
}

.animate-jump-in {
  animation: jumpIn 0.2s ease-out forwards;
}

.animate-jump-out {
  animation: jumpOut 0.2s ease-out forwards;
}

.animate-ease-out {
  animation-timing-function: ease-out;
}

/* Dialog transition */
.dialog-enter-from {
  opacity: 0;
}

.dialog-enter-to {
  opacity: 1;
}

.dialog-leave-from {
  opacity: 1;
}

.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}
</style>
