<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto text-stone-600">
        <div class="flex">

          <div class="hidden lg:block">
            <BarProfileMember />
          </div>

          <div class="md:pl-6 mt-12">
            <label class="text-lg font-semibold px-4">รายการที่ถูกใจ</label>
            <div class="mt-6 p-2">
              <div class="py-6">
                <Collection :products="productList" />
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Bar from "@components/BarMember.vue";
import Footer from "@components/FooterLoneTossagun.vue";
import BarProfileMember from "@components/BarProfileMember.vue";
import Collection from "@components/element/Collection.vue";
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter();

const productList = ref([
  {
    name: 'Bamboo Watch',
    image: 'bamboo-watch.jpg',
    price: 65,
    inventoryStatus: 'แนะนำ',
    detail: 'นาฬิกาไม้ไผ่ ดีไซน์เรียบหรู เป็นมิตรต่อสิ่งแวดล้อม',
  },
  {
    name: 'Black Watch',
    image: 'black-watch.jpg',
    price: 72,
    inventoryStatus: 'ลดราคา',
    detail: 'นาฬิกาสีดำ ดีไซน์คลาสสิก สำหรับทุกโอกาส',
  },
  {
    name: 'Blue Band',
    image: 'blue-band.jpg',
    price: 45,
    inventoryStatus: 'แคมเปญ',
    detail: 'สายรัดข้อมือสีฟ้า วัสดุทนทาน เหมาะกับทุกวัย',
  },
  {
    name: 'Blue T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 29,
    inventoryStatus: 'แนะนำ',
    detail: 'เสื้อยืดสีฟ้า ผ้านุ่มสบาย ใส่ได้ทุกวัน',
  },
  {
    name: 'Bracelet',
    image: 'bracelet.jpg',
    price: 15,
    inventoryStatus: 'ลดราคา',
    detail: 'สร้อยข้อมือหนังแท้ ดีไซน์วินเทจ',
  },
  {
    name: 'Brown Purse',
    image: 'brown-purse.jpg',
    price: 120,
    inventoryStatus: 'แคมเปญ',
    detail: 'กระเป๋าสตางค์สีน้ำตาล งานเย็บมือสวยงาม',
  },
  {
    name: 'Chakra Bracelet',
    image: 'chakra-bracelet.jpg',
    price: 35,
    inventoryStatus: 'แนะนำ',
    detail: 'สร้อยข้อมือหินพลังงาน เสริมสุขภาพ',
  },
])
</script>
