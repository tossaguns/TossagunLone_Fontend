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



      <!-- รายการไฟล์แบบเดิม -->
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

    <!-- แสดงตัวอย่างการแสดงรูปภาพแบบ Roomlist -->
    <div class="border rounded-lg mt-4 mb-4">
      <div class="w-full flex flex-col md:flex-row md:justify-between justify-center items-center p-3">
        <div class="w-full md:w-1/2 flex flex-col gap-2">
          <img :src="files[selectedImage]?.preview" class="w-full h-[200px] object-cover rounded"
            @click="showGallery = true" />
          <div class="flex gap-2 h-[60px]">
            <div class="w-2/3">
              <img :src="files[0]?.preview" class="h-full w-full object-cover rounded cursor-pointer"
                @click="showGallery = true" />
            </div>
            <div class="w-1/3 relative cursor-pointer" @click="showGallery = true" v-if="files.length > 1">
              <img :src="files[1]?.preview" class="h-full w-full object-cover rounded opacity-80" />
              <div
                class="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-xl font-semibold rounded">
                +{{ files.length - 1 }}
              </div>
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/2 flex flex-col md:pl-6 min-w-0 mt-8 md:mt-0">
          <label class="text-sm text-gray-600 font-bold">ตัวอย่างการแสดงรูปภาพ</label>
          <label class="text-sm text-gray-500">รูปภาพจะแสดงแบบนี้เมื่ออัปโหลดเสร็จ</label>
        </div>
      </div>
    </div>

    <!-- Gallery Popup - ย้ายออกนอก template ด้วย Teleport -->
    <Teleport to="body">
      <div v-if="showGallery" class="gallery-overlay flex flex-col items-center justify-center p-4">
        <button @click="showGallery = false"
          class="fixed md:top-8 md:right-8 top-3 right-3 bg-white text-black text-xl font-bold md:w-12 md:h-12 w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-gray-200 z-[10000]"
          aria-label="Close gallery">
          X
        </button>
        <div class="relative max-w-[80vw] max-h-[80vh] w-full flex justify-center items-center">
          <button @click="prevImage"
            class="absolute left-[-48px] top-1/2 -translate-y-1/2 text-white text-4xl select-none cursor-pointer user-select-none z-[10000] md:bg-black bg-opacity-40 rounded-full md:w-10 md:h-10 flex items-center justify-center hover:bg-opacity-70 ml-6 md:ml-0"
            aria-label="Previous image">
            ‹
          </button>
          <img :src="files[selectedImage]?.preview" class="max-w-full max-h-full rounded" />
          <button @click="nextImage"
            class="absolute right-[-48px] top-1/2 -translate-y-1/2 text-white text-4xl select-none cursor-pointer user-select-none z-[10000] md:bg-black bg-opacity-40 rounded-full md:w-10 md:h-10 flex items-center justify-center hover:bg-opacity-70 mr-6 md:mr-0"
            aria-label="Next image">
            ›
          </button>
        </div>
        <div class="flex gap-2 mt-4 overflow-x-auto">
          <img v-for="(file, index) in files" :key="index" :src="file.preview" @click="selectedImage = index" :class="[
            'w-16 h-16 object-cover rounded cursor-pointer border',
            selectedImage === index ? 'border-yellow-400' : 'border-transparent',
          ]" />
        </div>
      </div>
    </Teleport>

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
import { Teleport } from 'vue'
import BaseToast from '@/components/element/BaseToast.vue'
import ConfirmDeleteModal from '@/components/element/ConfirmDeleteModal.vue'
import BadToast from '@/components/element/BadToast.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Define props and emits
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const badToastRef = ref(null)
const toastRef = ref(null)
const showConfirm = ref(false)
const deleteIndex = ref(null)
const files = ref(props.modelValue || [])
const fileInput = ref(null)
const maxFiles = 10
const showGallery = ref(false)
const selectedImage = ref(0)

const totalSize = computed(() =>
  files.value.reduce((sum, f) => sum + f.size, 0)
)
const totalSizeText = computed(() => formatSize(totalSize.value))
const totalSizePercent = computed(() =>
  Math.min((totalSize.value / 1000000) * 100, 100)
)

function removeFile(index) {
  files.value.splice(index, 1)
  // รีเซ็ต selectedImage หากรูปที่เลือกถูกลบ
  if (selectedImage.value >= files.value.length) {
    selectedImage.value = Math.max(0, files.value.length - 1)
  }
  // Emit updated files
  emit('update:modelValue', files.value)
}

function clearFiles() {
  showConfirm.value = true
}

function confirmDelete() {
  files.value = []
  selectedImage.value = 0
  if (fileInput.value) fileInput.value.value = ''
  showConfirm.value = false
  // Emit updated files
  emit('update:modelValue', files.value)
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
      // Emit updated files after each file is added
      emit('update:modelValue', files.value)
    }
    reader.readAsDataURL(file)
  })
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  else return (bytes / 1048576).toFixed(1) + ' MB'
}

const nextImage = () => {
  selectedImage.value = (selectedImage.value + 1) % files.value.length
}

const prevImage = () => {
  selectedImage.value = (selectedImage.value - 1 + files.value.length) % files.value.length
}

</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

/* Gallery popup styles */
.gallery-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: 9999 !important;
  background-color: rgba(0, 0, 0, 0.9) !important;
}
</style>
