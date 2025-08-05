<!-- components/RoomCard.vue -->
<template>
  <div class="flex flex-col lg:flex-row justify-between border rounded-lg mt-2 bg-white shadow">
    <div class="xl:w-3/12 flex flex-col justify-center">
      <img :src="images[selectedImage]" class="w-full h-40 object-cover rounded-l" />
    </div>

    <div class="xl:w-6/12 items-center flex flex-col md:pl-6 min-w-0 mt-8 md:mt-0 text-sm justify-center xl:py-0 md:py-4">
      <label>ประเภทห้อง : <span class="font-bold">{{ roomType }}</span></label>
      <label>เข้าพักได้สูงสุด : <span class="font-bold">{{ maxGuests }} คน</span></label>
      <label class="text-xs block indent-5 pt-2">{{ description }}</label>
      <div class="mt-4 flex overflow-x-auto space-x-2 scrollbar-hide">
        <div v-for="(facility, index) in facilities" :key="index"
          class="inline-flex items-center space-x-2 border py-1 px-2 rounded-full shrink-0">
          <img :src="facility.icon" class="w-3 h-3" />
          <label class="text-xs">{{ facility.label }}</label>
        </div>
      </div>
    </div>

    <div
      class="xl:w-3/12 flex flex-col lg:justify-center lg:items-center md:justify-end md:items-end md:pr-12 lg:pr-0 justify-center items-center xl:py-0 py-4">
      <div class="flex flex-col items-center">
        <label v-if="originalPrice" class="line-through text-gray-400 text-sm">{{ originalPrice }} THB</label>
        <label v-if="isAddBed && addBedPrice" class="text-yellow-400 font-bold">+ {{ addBedPrice }} THB</label>
        <label class="text-2xl font-bold text-red-600">THB {{ totalPrice }}</label>
      </div>
      <div class="mt-2">
        <button class="text-red-500 border border-red-500 rounded-lg px-1  text-xs hover:text-white hover:bg-red-500 py-1">เยี่ยมชมห้องพัก</button>
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
  addBedPrice: Number,
})


const selectedImage = ref(0)
const isAddBed = ref(false)


const totalPrice = computed(() => {
  if (isAddBed.value && props.addBedPrice) {
    return props.discountPrice + props.addBedPrice
  }
  return props.discountPrice
})

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
