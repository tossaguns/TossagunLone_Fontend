<!-- components/RoomCard.vue -->
<template>
  <div class="flex flex-col lg:flex-row justify-between border rounded-lg mt-2 bg-white shadow">
    <div class="w-3/12 flex flex-col justify-center">
      <img :src="images[selectedImage]" class="w-full h-40 object-cover rounded" @click="showGallery = true" />
    </div>

    <div class="w-6/12 flex flex-col md:pl-6 min-w-0 mt-8 md:mt-0 text-sm justify-center">
      <label>ประเภทห้อง : <span class="font-bold">{{ roomType }}</span></label>
      <label>เข้าพักได้สูงสุด : <span class="font-bold">{{ maxGuests }} คน</span></label>
      <label class="text-xs block indent-5 pt-2">{{ description }}</label>
      <div class="mt-4 flex overflow-x-auto space-x-2 scrollbar-hide">
        <div v-for="(facility, index) in facilities" :key="index"
          class="inline-flex items-center space-x-2 border py-1 px-3 rounded-full shrink-0">
          <img :src="facility.icon" class="w-4 h-4" />
          <label>{{ facility.label }}</label>
        </div>
      </div>
    </div>

    <div
      class="w-3/12 flex flex-col lg:justify-center lg:items-center md:justify-end md:items-end md:pr-12 lg:pr-0 justify-center items-center ">
      <div class="flex flex-col items-center">
        <label v-if="originalPrice" class="line-through text-gray-400">{{ originalPrice }} THB</label>
        <label v-if="isAddBed && addBedPrice" class="text-yellow-400 font-bold">+ {{ addBedPrice }} THB</label>
        <label class="text-2xl font-bold text-red-600">THB {{ totalPrice }}</label>
      </div>
      <div class="mt-2">
        <button class="text-red-500 border border-red-500 rounded-lg px-1 py-1">เยี่ยมชมห้องพัก</button>
      </div>
    </div>

    <!-- Popup Gallery -->
    <div v-if="showGallery"
      class="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center p-4 mx-">
      <!-- ปุ่มปิด (กากบาท) อยู่มุมขวาบนสุดของ overlay -->
      <button @click="showGallery = false"
        class="fixed md:top-8 md:right-8 top-3 right-3 bg-white text-black text-xl font-bold md:w-12 md:h-12 w-8 h-8 flex items-center justify-center rounded-full shadow-md hover:bg-gray-200 z-50"
        aria-label="Close gallery">
        X
      </button>
      <div class="relative max-w-[80vw] max-h-[80vh] w-full flex justify-center items-center">
        <!-- ปุ่มเลื่อนซ้าย/ขวาอยู่นอกกรอบรูป -->
        <button @click="prevImage"
          class="absolute left-[-48px] top-1/2 -translate-y-1/2 text-white text-4xl select-none cursor-pointer user-select-none z-40 md:bg-black bg-opacity-40 rounded-full md:w-10 md:h-10 flex items-center justify-center hover:bg-opacity-70 ml-6 md:ml-0"
          aria-label="Previous image">
          ‹
        </button>
        <img :src="images[selectedImage]" class="max-w-full max-h-full rounded" />
        <button @click="nextImage"
          class="absolute right-[-48px] top-1/2 -translate-y-1/2 text-white text-4xl select-none cursor-pointer user-select-none z-40 md:bg-black bg-opacity-40 rounded-full md:w-10 md:h-10 flex items-center justify-center hover:bg-opacity-70 mr-6 md:mr-0"
          aria-label="Next image">
          ›
        </button>
      </div>
      <div class="flex gap-2 mt-4 overflow-x-auto">
        <img v-for="(img, index) in images" :key="index" :src="img" @click="selectedImage = index" :class="[
          'w-16 h-16 object-cover rounded cursor-pointer border',
          selectedImage === index ? 'border-yellow-400' : 'border-transparent',
        ]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['add-to-cart', 'remove-from-cart'])

const props = defineProps({
  roomCode: String,
  roomType: String,
  maxGuests: Number,
  description: String,
  originalPrice: Number,
  discountPrice: Number,
  facilities: Array,
  images: Array,
  extraBed: Boolean,
  addBedPrice: Number,
})

const showGallery = ref(false)
const selectedImage = ref(0)
const isAddBed = ref(false)
const isSelected = ref(false)

function handleCartClick() {
  isSelected.value = !isSelected.value
  const roomData = {
    roomCode: props.roomCode,
    total: totalPrice.value,
  }
  if (isSelected.value) {
    emit('add-to-cart', roomData)
  } else {
    emit('remove-from-cart', roomData)
  }
}

function handleAddBedClick() {
  isAddBed.value = !isAddBed.value
  if (isSelected.value) {
    emit('add-to-cart', {
      roomCode: props.roomCode,
      total: totalPrice.value,
    })
  }
}

const totalPrice = computed(() => {
  if (isAddBed.value && props.addBedPrice) {
    return props.discountPrice + props.addBedPrice
  }
  return props.discountPrice
})

const nextImage = () => {
  selectedImage.value = (selectedImage.value + 1) % props.images.length
}
const prevImage = () => {
  selectedImage.value = (selectedImage.value - 1 + props.images.length) % props.images.length
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
</style>
