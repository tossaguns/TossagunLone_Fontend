<template>
  <div class="flex max-w-4xl mx-auto gap-4 border rounded-md shadow-sm md:p-4 p-2">
    <!-- Thumbnail ด้านซ้าย -->
    <div class="flex flex-col gap-2 md:w-24 w-16 lg:h-[300px] md:h-[300px] h-[190px] overflow-y-auto pr-1 ">
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
        class="w-[800px] max-h-[310px] object-cover rounded-md shadow" />
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
      itemImageSrc: '/imgHotel/sea.jpg',
      thumbnailImageSrc: 'imgHotel/sea.jpg',
      alt: 'ภาพที่ 1'
    },
    {
      itemImageSrc: '/imgHotel/imgprovince/Bangkok.jpg',
      thumbnailImageSrc: '/imgHotel/imgprovince/Bangkok.jpg',
      alt: 'ภาพที่ 2'
    },
    {
      itemImageSrc: '/imgHotel/imgprovince/ChiangMai.jpg',
      thumbnailImageSrc: '/imgHotel/imgprovince/ChiangMai.jpg',
      alt: 'ภาพที่ 3'
    },
    {
      itemImageSrc: '/imgHotel/imgprovince/Chonburi.jpg',
      thumbnailImageSrc: '/imgHotel/imgprovince/Chonburi.jpg',
      alt: 'ภาพที่ 4'
    },
    {
      itemImageSrc: '/imgHotel/imgprovince/Phuket.jpg',
      thumbnailImageSrc: '/imgHotel/imgprovince/Phuket.jpg',
      alt: 'ภาพที่ 5'
    },
  ]
})
</script>
