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

          <div class="md:pl-6 px-4 mt-12 w-full">
            <label class="text-lg font-semibold">รีวิว</label>

            <div class=" mt-6 p-4">
              <!-- แท็บเลือก section -->
              <div class="flex justify-between items-center space-x-4">
                <button class="w-1/2 flex flex-col justify-center items-center rounded-lg py-4 transition"
                  :class="activeTab === 'toReview' ? 'bg-yellow-300' : 'bg-yellow-50'" @click="activeTab = 'toReview'">
                  <label class="text-stone-500 text-xs md:text-base">ยังไม่ได้ทำการรีวิว</label>
                  <label class="md:text-xl font-bold">{{ hotelsToReview.length }} รายการ</label>
                </button>
                <button class="w-1/2 flex flex-col justify-center items-center rounded-lg py-4 transition"
                  :class="activeTab === 'myReview' ? 'bg-yellow-300' : 'bg-yellow-50'" @click="activeTab = 'myReview'">
                  <label class="text-stone-500 text-xs md:text-base">รีวิวของคุณ</label>
                  <label class="md:text-xl font-bold">{{ reviews.length }} รายการ</label>
                </button>
              </div>


              <!-- กรุณารีวิวที่พักที่ใช้บริการ -->
              <div v-if="activeTab === 'toReview'">
                <div class="mt-4 space-y-3">
                  <div v-for="(img, idx) in hotelsToReview" :key="idx" class="p-4 border 
                rounded-md ">
                    <div class="flex justify-start items-center ">
                      <h2 class="text-xl font-bold pr-4">ให้คะแนน</h2>
                      <Rating v-model="ratingsToReview[idx]" />
                    </div>
                    <p class="text-gray-700">คะแนนที่เลือก: {{ ratingsToReview[idx] }}</p>

                    <div class="flex flex-col md:flex-row md:justify-between md:items-start mt-6">
                      <div class="flex justify-center items-center">
                        <img :src="img" class="h-40 rounded-lg" />
                      </div>

                      <div class="md:w-3/4 w-full md:pl-6 mt-4 md:mt-0">
                        <div class="flex flex-col">
                          <label class="pb-2">เนื้อหาการใช้บริการ : </label>
                          <textarea rows="3" v-model="detailsToReview[idx]" class="border pt-2 px-4 
                        rounded-lg" placeholder="เขียนรีวิวการใช้บริการที่พัก....." />
                        </div>
                        <div class="flex justify-end items-center mt-2 space-x-2">
                          <div>
                            <button :class="[
                              'border rounded-lg px-4 py-2',
                              anonymousReview[idx] ? 'bg-stone-400 text-white border-stone-400' : 'text-stone-400 border-stone-400'
                            ]" @click="toggleAnonymous(idx)">
                              ไม่ต้องเปิดเผยตัวตน
                            </button>
                          </div>
                          <button class="bg-red-500 py-2 px-4 text-white rounded-md"
                            @click="submitReviewBlock(idx)">ตกลง</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div v-else>
                <!-- section แสดงรายการรีวิว -->
                <div class="mt-10">
                  <h3 class="text-lg font-bold mb-4">รีวิวของคุณ</h3>
                  <div v-for="(item, idx) in reviews" :key="idx" class="flex items-start space-x-4 mb-6 border-b pb-4">
                    <img :src="item.img" class="h-20 w-20 object-cover rounded-lg" />
                    <div class="flex-1">
                      <div class="flex flex-col md:flex-row md:items-center space-x-2">
                        <div><span v-for="n in 5" :key="n" class="text-2xl"
                            :class="n <= item.rating ? 'text-yellow-400' : 'text-gray-300'">★</span></div>
                        <span class="text-xs text-gray-400 ml-2">{{ item.date }}</span>
                      </div>
                      <div class="mt-2 text-gray-700">{{ item.detail }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import Bar from "@components/BarMember.vue";
import Footer from "@components/FooterLoneTossagun.vue";
import BarProfileMember from "@components/BarProfileMember.vue";
import Rating from "@/components/element/Rating.vue";
import { ref } from 'vue'

const rating = ref(0)
const detailHotel = ref('')

// Tab state
const activeTab = ref('toReview') // 'toReview' หรือ 'myReview'

// Mock รูปภาพโรงแรมที่ยังไม่ได้รีวิว
const hotelsToReview = [
  '/imgHotel/sea.jpg',
  '/imgHotel/InRoom.jpg',
  '/imgHotel/gift.png',
]

// Mock รูปภาพสำหรับรีวิวที่ทำแล้ว
const reviewImages = [
  '/imgHotel/sea.jpg',
  '/imgHotel/InRoom.jpg',
  '/imgHotel/gift.png',
]

// Mock ข้อมูลรีวิวเริ่มต้น
const reviews = ref([
  {
    img: reviewImages[0],
    rating: 5,
    detail: 'ห้องพักสะอาด บริการดีมาก ประทับใจสุดๆ',
    date: '2024-06-01'
  },
  {
    img: reviewImages[1],
    rating: 4,
    detail: 'วิวสวย อาหารเช้าอร่อย แต่ที่จอดรถน้อย',
    date: '2024-06-02'
  },
  {
    img: reviewImages[2],
    rating: 3,
    detail: 'โดยรวมโอเค แต่แอร์เสียงดังไปหน่อย',
    date: '2024-06-03'
  },
])

// สำหรับแต่ละโรงแรมที่ยังไม่ได้รีวิว เก็บ state แยก
const ratingsToReview = ref([0, 0, 0])
const detailsToReview = ref(['', '', ''])
const anonymousReview = ref([])

function toggleAnonymous(idx) {
  anonymousReview.value[idx] = !anonymousReview.value[idx]
}

function submitReviewBlock(idx) {
  if (!detailsToReview.value[idx] || ratingsToReview.value[idx] === 0) return;
  reviews.value.unshift({
    img: hotelsToReview[idx],
    rating: ratingsToReview.value[idx],
    detail: detailsToReview.value[idx],
    date: new Date().toISOString().split('T')[0]
  })
  // reset form เฉพาะบล็อกนั้น
  detailsToReview.value[idx] = ''
  ratingsToReview.value[idx] = 0
}

function submitReview() {
  if (!detailHotel.value || rating.value === 0) return;
  // สุ่มรูป mock
  const img = reviewImages[Math.floor(Math.random() * reviewImages.length)]
  reviews.value.unshift({
    img,
    rating: rating.value,
    detail: detailHotel.value,
    date: new Date().toISOString().split('T')[0]
  })
  // reset form
  detailHotel.value = ''
  rating.value = 0
}
</script>
