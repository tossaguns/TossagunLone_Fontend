<template>
  <div v-if="isMainPosPage" class="xl:hidden">
    <div class="fixed bottom-0 left-0 w-full shadow-lg z-50 transition-all duration-300" :class="mobileBarClass">
      <div class="md:py-6 py-2 bg-green-600 md:rounded-b-lg">
        <div class="text-xs md:text-lg flex justify-between items-center px-2 md:px-6">
          <div class="flex items-baseline md:space-x-4 space-x-2">
            <div class="bg-green-500 rounded-full py-3 px-2">
              <label class="bg-white py-1 px-3 rounded-full font-bold text-red-600">{{ cartCount }}</label>
            </div>
            <label class="font-bold text-white">รายการ เพิ่มลงในตะกร้า</label>
          </div>
          <div>
            <button class="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-100 font-bold">
              <div class="flex items-center space-x-2">
                <div class="bg-green-200 rounded-full p-1 md:p-2">
                  <img src="/imgHotel/cart.png" alt="cart" class="md:w-6 md:h-6 w-4 h-4"></img>
                </div>
                <label class="font-bold">Check-In</label>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Props
const props = defineProps({
  isSidebarCollapsed: {
    type: Boolean,
    default: false
  },
  cartCount: {
    type: Number,
    default: 0
  }
})

const route = useRoute()

// Computed properties
const isMainPosPage = computed(() => {
  return route.path === '/mainpos'
})

const mobileBarClass = computed(() => {
  if (props.isSidebarCollapsed) {
    return 'md:pl-[95px] md:pb-4 md:pr-2'
  } else {
    return 'md:pl-[255px] md:pb-4 md:pr-2'
  }
})
</script>