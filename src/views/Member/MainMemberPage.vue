<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto text-stone-600">
        <div>
          <div>
            <div class="relative">
              <img src="/imgHotel/sea.jpg" class="h-[400px] w-full object-cover" />

              <div class="md:absolute md:inset-0 md:flex md:items-center md:justify-center">
                <div
                  class="bg-stone-600 md:bg-stone-600/40 md:backdrop-blur md:py-8 py-4 md:mx-20 md:px-8 px-3 md:rounded-2xl flex flex-col items-center md:w-auto w-full">
                  <div class="mb-6 mt-3 flex justify-center">
                    <label class="text-3xl text-white font-semibold">SleepGun</label>
                  </div>
                  <div
                    class="w-full flex flex-col md:flex-row justify-center items-center md:space-x-4 space-y-3 md:space-y-0">
                    <div class="w-full">
                      <SearchInput v-model="searchKeyword" placeholder="ค้นหาโรงแรมหรือจังหวัด" @search="onSearch" />
                    </div>
                    <div class="w-full">
                      <InputNumber label="จำนวนคนเข้าพัก" />
                    </div>
                    <div class="w-full flex justify-center">
                      <CalendarRangePicker class="lg:w-[350px]  w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="mb-4">
              <!-- หน้าถูกใจ -->
              <div class="p-4">
                <div class="flex justify-between">
                  <h2 class="md:text-xl px-6 font-bold">ถูกใจ</h2>

                </div>
                <ProductCarouselHart :products="products" />
              </div>
            </div>

            <div class="mb-4">
              <!-- หน้าโปรโมชั่น Hotel -->
              <div class="p-4">
                <div class="flex justify-between">
                  <h2 class="md:text-xl px-6 font-bold">ที่พักราคาโปรโมชั่น</h2>
                  <label class="underline underline-offset-4 text-stone-400 hover:text-stone-500">ดูเพิ่มเติม</label>
                </div>
                <ProductCarouselHart :products="products" />
              </div>
            </div>

            <div class="mb-4">
              <!-- หน้าเเนะนำ hotel -->
              <div class="p-4">
                <div class="flex justify-between">
                  <h2 class="md:text-xl px-6 font-bold">ที่พักแนะนำ</h2>
                  <label class="underline underline-offset-4 text-stone-400 hover:text-stone-500">ดูเพิ่มเติม</label>
                </div>
                <ProductCarouselHart :products="products" />
              </div>
            </div>

            <div class="mb-4">
              <!-- หน้าหมวดหมู่จังหวัด -->
              <div class="p-4">
                <div class="flex justify-between">
                  <h2 class="md:text-xl px-6 font-bold">จังหวัดยอดฮิต</h2>
                  <label class="underline underline-offset-4 text-stone-400 hover:text-stone-500">ดูเพิ่มเติม</label>
                </div>
                <ProductCarouselImg :products="province" @navigate="handleNavigate" />
              </div>
            </div>

            <!-- เดี๋ยวค่อยทำต่อ
            <div>
               หน้ารีวิว
            </div> -->

          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Bar from "@components/BarMember.vue";
import CalendarRangePicker from "@/components/element/CalendarRangePicker.vue";
import InputNumber from "@/components/element/InputNumber.vue";
import SearchInput from "@/components/element/SearchInput.vue";
import Footer from "@components/FooterLoneTossagun.vue";
import ProductCarouselHart from '@/components/element/ProductCarouselHart.vue';
import ProductCarouselImg from '@/components/element/ProductCarouselImg.vue';
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useRouter } from 'vue-router';
const router = useRouter();

const searchKeyword = ref('');
const products = ref([]); // ✅ เพิ่มตัวแปรนี้ เพื่อหลีกเลี่ยง undefined

const onSearch = (val) => {
  console.log('ค้นหา:', val);
};

const province = ref([
  { image: 'Bangkok.jpg', slug: 'sea', name: 'กรุงเทพ' },
  { image: 'ChiangMai.jpg', slug: 'mountain', name: 'เชียงใหม่' },
  { image: 'Chonburi.jpg', slug: 'city', name: 'ภูเก็ต' },
  { image: 'Phuket.jpg', slug: 'island', name: 'ชลบุรี' },
  { image: 'Phuket.jpg', slug: 'city', name: 'ลำปาง' },
  { image: 'Phuket.jpg', slug: 'island', name: 'ขอนเเก่น' },
  { image: 'Phuket.jpg', slug: 'city', name: 'เพชรบุรี' },
  { image: 'Phuket.jpg', slug: 'island', name: 'ระนอง' },
  { image: 'Phuket.jpg', slug: 'city', name: 'สงขลา' },
  { image: 'Phuket.jpg', slug: 'island', name: 'ตราด' },
]);

const handleNavigate = (item) => {
  router.push(`/hotel/${item.slug}`);
};



onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'auto' });
  const result = await ProductService.getProductsSmall();
  products.value = result.slice(0, 9); // หรือใช้ทั้งหมดก็ได้
});
</script>
