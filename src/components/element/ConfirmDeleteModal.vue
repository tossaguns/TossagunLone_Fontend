<template>
  <teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center" v-if="show">
      <!-- เงาดำ fade -->
      <transition name="fade">
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </transition>

      <!-- กล่อง popup เด้ง -->
      <transition name="scale-fade" @after-leave="onAfterLeave">
        <div class="bg-white p-6 md:p-12 rounded shadow-lg max-w-sm mx-auto text-center z-10">
          <p class="mb-4 text-gray-800 lg:text-2xl">
            <slot>InputText....</slot>
          </p>
          <div class="flex justify-center gap-4 lg:text-xl lg:pt-8">
            <button class="bg-gray-300 px-4 py-2 rounded" @click="handleCancel">{{ t('No') }}</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded" @click="handleConfirm">{{t('Delete')}}</button>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  show: Boolean,
  onConfirm: Function,
  onCancel: Function,
})

const emit = defineEmits(['after-leave'])

function handleConfirm() {
  props.onConfirm?.()
}

function handleCancel() {
  props.onCancel?.()
}

function onAfterLeave() {
  emit('after-leave')
}
</script>

<style scoped>
/* เงาดำ: fade ธรรมดา */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* กล่อง popup: scale + fade */
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.3s ease;
}

.scale-fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.scale-fade-enter-to {
  opacity: 1;
  transform: scale(1);
}

.scale-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
