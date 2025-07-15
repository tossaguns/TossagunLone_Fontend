<template>
  <div class="flex max-w-4xl mx-auto gap-4 border rounded-md shadow-sm p-4">
    <!-- Thumbnail ด้านซ้าย -->
    <div class="flex flex-col gap-2 w-24 max-h-[200px] overflow-y-auto pr-1">
      <img v-for="(img, index) in images" :key="index" :src="img.thumbnailImageSrc" :alt="img.alt"
        @click="currentIndex = index"
        class="h-24 w-24 object-cover cursor-pointer border-2 rounded-md transition-all duration-200" :class="{
          'border-blue-500': index === currentIndex,
          'border-transparent hover:border-gray-300': index !== currentIndex
        }" />
    </div>
    <!-- ภาพใหญ่ด้านขวา -->
    <div class="flex-1 flex items-center justify-center">
      <img v-if="images[currentIndex]" :src="images[currentIndex].itemImageSrc" :alt="images[currentIndex].alt"
        class="w-full max-h-[500px] object-contain rounded-md shadow" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const images = ref([])
const currentIndex = ref(0)

onMounted(() => {
  images.value = [
    {
      itemImageSrc: '/img/Car/NewCar.png',
      thumbnailImageSrc: '/img/Car/NewCar.png',
      alt: 'ภาพที่ 1'
    },
    {
      itemImageSrc: '/img/Car/MainCar.png',
      thumbnailImageSrc: '/img/Car/MainCar.png',
      alt: 'ภาพที่ 2'
    },
    {
      itemImageSrc: '/img/Car/UsedCar.png',
      thumbnailImageSrc: '/img/Car/UsedCar.png',
      alt: 'ภาพที่ 3'
    },
    {
      itemImageSrc: '/img/Car/MainCar.png',
      thumbnailImageSrc: '/img/Car/MainCar.png',
      alt: 'ภาพที่ 4'
    },
    {
      itemImageSrc: '/img/Car/MainCar.png',
      thumbnailImageSrc: '/img/Car/MainCar.png',
      alt: 'ภาพที่ 5'
    },
    {
      itemImageSrc: '/img/Car/MainCar.png',
      thumbnailImageSrc: '/img/Car/MainCar.png',
      alt: 'ภาพที่ 6'
    },
    {
      itemImageSrc: '/img/Car/MainCar.png',
      thumbnailImageSrc: '/img/Car/MainCar.png',
      alt: 'ภาพที่ 7'
    },
    {
      itemImageSrc: '/img/Car/MainCar.png',
      thumbnailImageSrc: '/img/Car/MainCar.png',
      alt: 'ภาพที่ 8'
    },
    {
      itemImageSrc: '/img/Car/MainCar.png',
      thumbnailImageSrc: '/img/Car/MainCar.png',
      alt: 'ภาพที่ 9'
    },
    {
      itemImageSrc: '/img/Car/MainCar.png',
      thumbnailImageSrc: '/img/Car/MainCar.png',
      alt: 'ภาพที่ 10'
    },
  ]
})
</script>
