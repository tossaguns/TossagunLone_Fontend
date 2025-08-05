<!-- components/ProductCarousel.vue -->
<template>
  <div class="card overflow-hidden relative px-8">
    <button class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full py-1 px-2"
      @click="prev" :disabled="currentIndex === 0">
      < </button>
        <button
          class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full py-1 px-2"
          @click="next" :disabled="currentIndex + itemsPerView >= products.length">
          >
        </button>

        <div class="overflow-hidden">
          <div class="flex transition-transform duration-300 items-stretch"
            :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }">
            <div v-for="(item, index) in products" :key="index"
              class="flex-none w-full sm:w-1/2 lg:w-1/3 p-2 box-border h-full">
              <div class="border rounded md:p-4 p-2 flex flex-col h-full">
                <div class="relative mb-4">
                  <img :src="'https://primefaces.org/cdn/primevue/images/product/' + item.image" :alt="item.name"
                    class="w-full md:h-40 h-32 object-cover rounded" />
                  <span class="absolute left-2 top-2 text-xs text-white px-2 py-1 rounded"
                    :class="statusColor(item.inventoryStatus)">
                    {{ item.inventoryStatus }}
                  </span>
                </div>
                <div class="mb-2 font-bold">{{ item.name }}</div>
                <div class="flex justify-between items-center">
                  <div class="font-semibold text-xl">THB {{ item.price }}</div>
                  <div class="flex gap-2">
                    <button class="text-gray-600 hover:text-black">
                      <i class="pi pi-shopping-cart"></i>
                    </button>
                  </div>
                </div>
                <div class="flex-1 flex items-end">
                  <div class="text-stone-400 truncate w-full">{{ item.detail }}kdcfutjgik</div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

const currentIndex = ref(0);
const itemsPerView = ref(3);

const updateItemsPerView = () => {
  const width = window.innerWidth;
  if (width < 576) itemsPerView.value = 1;
  else if (width < 768) itemsPerView.value = 2;
  else if (width < 1200) itemsPerView.value = 3;
  else itemsPerView.value = 3;
};

onMounted(() => {
  updateItemsPerView();
  window.addEventListener('resize', updateItemsPerView);
});

const next = () => {
  if (currentIndex.value + itemsPerView.value < props.products.length) {
    currentIndex.value += 1;
  }
};

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  }
};

const statusColor = (status) => {
  switch (status) {
    case 'แนะนำ':
      return 'bg-green-500';
    case 'แคมเปญ':
      return 'bg-yellow-500';
    case 'ลดราคา':
      return 'bg-red-500';
  }
};
</script>
