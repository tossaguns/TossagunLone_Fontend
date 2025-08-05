<template>
  <div class="relative px-8">
    <!-- ปุ่มเลื่อนซ้าย -->
    <button class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full py-1 px-2"
      @click="prev" :disabled="currentIndex === 0">
      < </button>

        <!-- ปุ่มเลื่อนขวา -->
        <button
          class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full py-1 px-2"
          @click="next" :disabled="currentIndex + itemsPerView >= products.length">
          >
        </button>

        <!-- ตัวแสดงภาพ -->
        <div class="overflow-hidden">
          <div class="flex transition-transform duration-300"
            :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }">
            <div v-for="(item, index) in products" :key="index"
              class="flex-none w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2 cursor-pointer" @click="navigate(item)">
              <img :src="getImagePath(item.image)" :alt="item.name || 'product image'"
                class="w-full h-48 object-cover rounded-lg shadow" />
              <div class="text-center mt-2 text-sm text-gray-700 truncate">{{ item.name }}</div>
            </div>
          </div>
        </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['navigate']);

const currentIndex = ref(0);
const itemsPerView = ref(4);

const updateItemsPerView = () => {
  const width = window.innerWidth;
  if (width < 768) itemsPerView.value = 2; // sm
  else if (width < 1280) itemsPerView.value = 3; // md
  else itemsPerView.value = 4; // xl
};

onMounted(() => {
  updateItemsPerView();
  window.addEventListener('resize', updateItemsPerView);
});

const next = () => {
  if (currentIndex.value + itemsPerView.value < props.products.length) {
    currentIndex.value++;
  }
};

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const getImagePath = (filename) => {
  return new URL(`/public/imgHotel/imgprovince/${filename}`, import.meta.url).href;
};

const navigate = (item) => {
  emit('navigate', item); // ส่ง item กลับไปให้ไฟล์แม่
};
</script>
