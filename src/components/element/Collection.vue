<!-- components/ProductGrid.vue -->
<template>
  <div class="card px-4">
    <div class="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div v-for="(item, index) in products" :key="index"
        class="border rounded md:p-4 p-2 flex flex-col h-full relative">
        <div class="relative mb-4">
          <img :src="'https://primefaces.org/cdn/primevue/images/product/' + item.image" :alt="item.name"
            class="w-full md:h-40 h-32 object-cover rounded" />
          <span class="absolute left-2 top-2 text-xs text-white px-2 py-1 rounded"
            :class="statusColor(item.inventoryStatus)">
            {{ item.inventoryStatus }}
          </span>
          <button
            class="absolute right-2 top-2 hover:bg-white/30 rounded-full p-1 shadow w-6 h-6 flex items-center justify-center z-20"
            @click="toggleLike(index)" type="button">
            <i class="pi pi-heart" :class="liked[index] ? 'text-red-500' : 'text-white'" style="font-size: 1.2rem;"></i>
          </button>
        </div>

        <div class="mb-2 font-medium truncate w-full">{{ item.name }}</div>

        <div class="flex justify-between items-center mb-2">
          <div class="font-semibold text-xl">THB {{ item.price }}</div>

        </div>

        <div class="text-stone-400 truncate w-full mt-auto">{{ item.detail }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
})

// 👉 เซ็ต liked ทั้งหมดเป็น true โดยอิงจาก products
const liked = ref({})

watchEffect(() => {
  props.products.forEach((_, index) => {
    liked.value[index] = true  // ❤️ เริ่มต้นเป็น true
  })
})

const toggleLike = (index) => {
  liked.value[index] = !liked.value[index]
}

const statusColor = (status) => {
  switch (status) {
    case 'แนะนำ':
      return 'bg-green-500'
    case 'แคมเปญ':
      return 'bg-yellow-500'
    case 'ลดราคา':
      return 'bg-red-500'
    default:
      return 'bg-gray-400'
  }
}
</script>
