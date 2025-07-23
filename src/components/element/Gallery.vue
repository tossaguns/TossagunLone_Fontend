<template>
  <div class="flex max-w-4xl mx-auto gap-4 border rounded-md shadow-sm md:p-4 p-2">
    <!-- Thumbnail ด้านซ้าย -->
    <div class="flex flex-col gap-2 md:w-24 w-16 lg:h-[300px] md:h-[300px] h-[190px] overflow-y-auto pr-1 ">
      <img v-for="(img, index) in props.images" :key="index" :src="img.thumbnailImageSrc" :alt="img.alt"
        @click="currentIndex = index"
        class="h-24 w-24 object-cover cursor-pointer border-2 rounded-md transition-all duration-200" :class="{
          'border-blue-500': index === currentIndex,
          'border-transparent hover:border-gray-300': index !== currentIndex
        }" />
    </div>
    <!-- ภาพใหญ่ด้านขวา -->
    <div class="flex-1 flex items-center justify-center">
      <img v-if="props.images[currentIndex]" :src="props.images[currentIndex].itemImageSrc"
        :alt="props.images[currentIndex].alt" class="w-[800px] max-h-[310px] object-cover rounded-md shadow" />
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
})
const currentIndex = ref(0)

watch(() => props.images, () => {
  currentIndex.value = 0
})
</script>
