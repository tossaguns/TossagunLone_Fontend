TODO: หน้า project เอามาใส่เเทนเเบรนเนอร์เก่า

<template>
  <div class="max-w-5xl mx-auto">
    <div
      class="relative w-full h-80 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      @click="openGallery()">
      <!-- Grid Layout for Images -->
      <div class="flex h-full">
        <!-- Left Half - First Image -->
        <div class="w-1/2 h-full relative group">
          <img :src="images[0]" alt="เเบรนเนอร์1"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        </div>

        <!-- Right Half - Remaining 4 Images -->
        <div class="w-1/2 h-full flex flex-col">
          <!-- Top Row -->
          <div class="h-1/2 flex">
            <!-- Image 2 - Top Left Quarter -->
            <div class="w-1/2 h-full relative group border-l border-white">
              <img :src="images[1]" alt="เเบรนเนอร์2"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div
                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>

            <!-- Image 3 - Top Right Quarter -->
            <div class="w-1/2 h-full relative group border-l border-white">
              <img :src="images[2]" alt="เเบรนเนอร์3"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div
                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>
          </div>

          <!-- Bottom Row -->
          <div class="h-1/2 flex border-t border-white">
            <!-- Image 4 - Bottom Left Quarter -->
            <div class="w-1/2 h-full relative group border-l border-white">
              <img :src="images[3]" alt="เเบรนเนอร์4"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div
                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>

            <!-- Image 5 - Bottom Right Quarter -->
            <div class="w-1/2 h-full relative group border-l border-white">
              <img :src="images[4]" alt="เเบรนเนอร์5"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div
                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

              <!-- Image Counter Overlay -->
              <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <span class="text-white text-lg font-bold">+{{ images.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hover Overlay -->
      <div
        class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
        <div class="text-white text-xl font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
          คลิกเพื่อดูภาพทั้งหมด
        </div>
      </div>
    </div>

    <!-- Full Screen Gallery Modal -->
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      <!-- Close Button -->
      <button @click="closeGallery"
        class="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors duration-200 z-60">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Previous Button -->
      <button @click="prevImage"
        class="absolute left-6 text-white hover:text-gray-300 transition-colors duration-200 z-60">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Next Button -->
      <button @click="nextImage"
        class="absolute right-6 text-white hover:text-gray-300 transition-colors duration-200 z-60">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Main Image -->
      <div class="max-w-xl max-h-full p-8 mb-12">
        <img :src="images[currentImage]" :alt="`Gallery image ${currentImage + 1}`"
          class="w-full h-full object-contain rounded-lg" />
      </div>

      <!-- Image Counter -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-lg">
        {{ currentImage + 1 }} / {{ images.length }}
      </div>

      <!-- Thumbnail Strip -->
      <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button v-for="(src, index) in images" :key="index" @click="setCurrentImage(index)" :class="[
          'w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200',
          index === currentImage ? 'border-white' : 'border-gray-400 hover:border-gray-200'
        ]">
          <img :src="src" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
        </button>
      </div>

      <!-- Click outside to close -->
      <div class="absolute inset-0 -z-10" @click="closeGallery" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const currentImage = ref(0)

const images = [
  '/graphics/pmh-04.jpg',
  '/graphics/pmh-05.jpg',
  '/graphics/pmh-06_02-06.jpg',
  '/graphics/pmh333-03.jpg',
  '/graphics/pmh-02.jpg'
]

const openGallery = (index = 0) => {
  currentImage.value = index
  isOpen.value = true
}

const closeGallery = () => {
  isOpen.value = false
}

const nextImage = () => {
  currentImage.value = (currentImage.value + 1) % images.length
}

const prevImage = () => {
  currentImage.value = (currentImage.value - 1 + images.length) % images.length
}

const setCurrentImage = (index) => {
  currentImage.value = index
}
</script>

<style scoped></style>