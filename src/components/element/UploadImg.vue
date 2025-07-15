<template>
  <div class="p-4 border rounded-lg">
    <!-- Drop area -->
    <div
      class="border-dashed border-2 border-gray-300 rounded-md p-8 text-center cursor-pointer hover:bg-gray-50 transition"
      @dragover.prevent @drop.prevent="handleDrop" @click="() => fileInput.click()">
      <p class="text-gray-600">{{ t('UploadImg_Text') }}</p>
      <input type="file" ref="fileInput" class="hidden" multiple accept="image/*" @change="handleFileSelect" />
    </div>

    <!-- Clear button only -->
    <div class="flex gap-2 mt-4">
      <button class="bg-red-500 text-white px-4 py-2 rounded" @click="clearFiles" :disabled="files.length === 0">
        {{ t('Clear') }}
      </button>
    </div>

    <!-- Progress bar -->
    <div v-if="totalSize > 0" class="mt-4">
      <div class="text-sm text-gray-500 mb-1">{{ totalSizeText }} / 1MB</div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-amber-400 h-2 rounded-full" :style="{ width: totalSizePercent + '%' }"></div>
      </div>
    </div>

    <!-- Preview section -->
    <div class="mt-6" v-if="files.length > 0">
      <h5 class="text-lg font-semibold mb-2">{{ t('Pending') }}</h5>
      <div class="flex flex-wrap gap-4 justify-center">
        <div v-for="(file, index) in files" :key="file.name + file.size"
          class="relative border p-4 rounded-md w-40 flex flex-col items-center gap-2">
          <img :src="file.preview" alt="" class="w-20 h-14 object-cover rounded" />
          <div class="text-sm text-center truncate w-full">{{ file.name }}</div>
          <div class="text-xs text-gray-500">{{ formatSize(file.size) }}</div>
          <span class="text-yellow-600 text-xs">{{ t('Pending') }}</span>
          <button class="absolute top-1 right-1 text-red-500 text-xs bg-white rounded-full p-1 shadow"
            @click="removeFile(index)">
            ❌
          </button>
        </div>
      </div>
    </div>

    <ConfirmDeleteModal :show="showConfirm" :onConfirm="confirmDelete" :onCancel="cancelDelete">
      {{ t('AskDeleteImg_Upload') }}
    </ConfirmDeleteModal>

    <BaseToast ref="toastRef" />
    <BadToast ref="badToastRef" />

    <ConfirmDeleteModal :show="showConfirm" :onConfirm="confirmDelete" :onCancel="cancelDelete">
      <template #default>
        {{ t('AskDeleteImg_Upload') }}
      </template>
    </ConfirmDeleteModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseToast from '@/components/element/BaseToast.vue'
import ConfirmDeleteModal from '@/components/element/ConfirmDeleteModal.vue'
import BadToast from '@/components/element/BadToast.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const badToastRef = ref(null)
const toastRef = ref(null)
const showConfirm = ref(false)
const deleteIndex = ref(null)
const files = ref([])
const fileInput = ref(null)
const maxFiles = 10

const totalSize = computed(() =>
  files.value.reduce((sum, f) => sum + f.size, 0)
)
const totalSizeText = computed(() => formatSize(totalSize.value))
const totalSizePercent = computed(() =>
  Math.min((totalSize.value / 1000000) * 100, 100)
)

function removeFile(index) {
  files.value.splice(index, 1)
}

function clearFiles() {
  showConfirm.value = true
}

function confirmDelete() {
  files.value = []
  if (fileInput.value) fileInput.value.value = ''
  showConfirm.value = false
  toastRef.value?.showToast(t('Delete_Completed'), t('DeleteDetail_Completed'))
}

function cancelDelete() {
  showConfirm.value = false
}

function handleFileSelect(e) {
  const selected = [...e.target.files]
  prepareFiles(selected)
}

function handleDrop(e) {
  const dropped = [...e.dataTransfer.files]
  prepareFiles(dropped)
}

function prepareFiles(fileList) {
  const currentCount = files.value.length
  const availableSlots = maxFiles - currentCount

  if (availableSlots <= 0) {
    badToastRef.value?.showToast(t('OverMaxImg'), t('maxUpload_Text', { count: maxFiles }))
    return
  }

  const selectedFiles = fileList
    .filter((file) => file.type.startsWith('image/'))
    .slice(0, availableSlots)

  selectedFiles.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      file.preview = e.target.result
      files.value.push(file)
    }
    reader.readAsDataURL(file)
  })
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  else return (bytes / 1048576).toFixed(1) + ' MB'
}

</script>
