<!-- components/RoomCard.vue -->
<template>
  <div class=" border rounded-lg mt-4">
    <div class="w-full flex flex-col md:flex-row md:justify-between justify-center items-center p-3">

      <div class="w-full md:w-1/2 flex flex-col gap-2">
        <img :src="images[selectedImage]" class="w-full h-[200px] object-cover rounded" @click="showGallery = true" />
        <div class="flex gap-2 h-[60px]">
          <div class="w-2/3">
            <img :src="images[0]" class="h-full w-full object-cover rounded cursor-pointer"
              @click="showGallery = true" />
          </div>
          <div class="w-1/3 relative cursor-pointer" @click="showGallery = true">
            <img :src="images[1]" class="h-full w-full object-cover rounded opacity-80" />
            <div
              class="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-xl font-semibold rounded">
              +{{ images.length - 1 }}
            </div>
          </div>
        </div>
      </div>

      <div class="w-full md:w-1/2 flex flex-col md:pl-6 min-w-0 mt-8 md:mt-0">
        <label>ประเภทห้อง : <span class="font-bold">{{ roomType }}</span></label>
        <label>เข้าพักได้สูงสุด : <span class="font-bold">{{ maxGuests }} คน</span></label>
        <label class="text-sm block indent-5 pt-2">{{ description }}</label>
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
