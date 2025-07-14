<!-- components/ConfirmSaveButton.vue -->
<template>
  <div>
    <button
      class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      @click="showPopup = true"
    >
      {{ t('No') }}
    </button>

    <!-- Modal ยืนยัน -->
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="showPopup"
          class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        >
          <transition name="scale">
            <div class="bg-white p-6 rounded shadow-lg w-[300px] text-center" v-if="showPopup">
              <h2 class="text-lg font-semibold mb-2">{{ t('ConfirmCancel_Button') }}</h2>
              <p class="text-sm text-gray-600 mb-4">{{ t('ConfirmCancelDetail_Button') }}</p>
              <div class="flex justify-center gap-3">
                <button
                  class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  @click="showPopup = false"
                >
                  {{ t('NO_Button') }}
                </button>
                <button
                  class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  @click="confirmSave"
                >
                  {{ t('Yes_Button') }}
                </button>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const showPopup = ref(false)
const emit = defineEmits(['confirm'])

function confirmSave() {
  emit('confirm')         // 👈 ส่ง event ไปให้ component แม่ handle
  showPopup.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.25s ease;
}
.scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
