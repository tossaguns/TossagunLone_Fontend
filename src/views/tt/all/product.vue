<template>
  <div ref="container" class="w-full mx-auto px-4 max-w-[640px] md:max-w-[1024px] mt-32">
    <!-- หัวข้อพร้อมอนิเมชั่นเด้งขึ้น -->
    <div ref="title" :class="[
      'md:text-2xl text-xl font-bold text-green-700 italic text-center transition-all duration-700 ease-out',
      titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    ]">
      <p>สินค้า OTOP/ชุมชน</p>
    </div>

    <!-- ยกเลิก animation เดิมของ v-for -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5 justify-center">
      <div v-for="product in products" :key="product.id"
        class="bg-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300 flex flex-col">
        <div class="flex justify-center items-center h-44 overflow-hidden rounded-t-lg bg-white">
          <img :src="product.image" :alt="product.name" class="object-cover w-full h-full" />
        </div>

        <div class="py-4 bg-gray-300 rounded-b-lg text-center">
          <p>{{ product.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const container = ref(null)
const title = ref(null)

const titleVisible = ref(false)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === title.value) {
          titleVisible.value = entry.isIntersecting
        }
      })
    },
    { threshold: 0.3 }
  )

  if (title.value) observer.observe(title.value)
})

onBeforeUnmount(() => {
  if (observer && title.value) {
    observer.unobserve(title.value)
  }
})

const products = ref([
  { id: 1, name: "ผ้าทอมือ", image: "/icon1/rice.jpg" },
  { id: 2, name: "ข้าวอินทรีย์", image: "/icon1/rice.jpg" },
  { id: 3, name: "น้ำผึ้งป่า", image: "/icon1/rice.jpg" },
  { id: 4, name: "สมุนไพรอบแห้ง", image: "/icon1/rice.jpg" },
  { id: 5, name: "เครื่องจักสาน", image: "/icon1/rice.jpg" },
  { id: 6, name: "เสื่อกก", image: "/icon1/rice.jpg" },
])
</script>
