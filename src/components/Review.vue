<template>
  <div class="mx-4 md:p-4">
    <div>
      <div
        class="flex flex-col md:flex-row justify-between items-center mt-2  border shadow py-8 md:mx-12 px-8 rounded-lg mb-12">
        <div class="md:w-1/2 flex flex-col md:flex-row justify-center md:pr-6">
          <div>
            <label class="text-xs md:text-base">จำนวนรีวิวทั้งหมด : <span class="font-bold px-2">{{ reviews.length
                }}</span></label>
          </div>
          <div class="flex items-center justify-center">
            <span v-for="n in 5" :key="n" class="text-xl"
              :class="n <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'">★</span>
          </div>
        </div>
        <div class="md:w-1/2 mt-4 md:mt-0 w-[200px]">
          <div class="card">
            <MeterGroup :value="meterGroupData" />
          </div>
        </div>
      </div>


      <!-- member ที่เข้าพักเป็ฯคนรีวิว -->
      <div class="mt-16">
        <div v-for="(item, idx) in paginatedReviews" :key="idx"
          class="border rounded-lg py-4 md:px-12 px-4  md:mb-4 mb-2">
          <div>
            <div class="flex space-x-2">
              <div>
                <label class="text-xs md:text-base font-bold text-stone-600">{{ item.name }}</label>
              </div>
              <div class="flex items-end md:px-0">
                <div class="flex items-start space-x-4">
                  <div><span v-for="n in 5" :key="n" class="text-sm md:text-xl"
                      :class="n <= item.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <hr class="border mt-2" />
            </div>

            <div class="text-stone-400 mb-4">
              <div class="flex items-center space-x-2">
                <svg viewBox="0 0 64 64" class="w-6 h-6 text-stone-300 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="24" width="56" height="24" rx="2" ry="2" />
                  <rect x="8" y="20" width="20" height="8" fill="white" stroke="currentColor" stroke-width="1.5" />
                  <rect x="36" y="20" width="20" height="8" fill="white" stroke="currentColor" stroke-width="1.5" />
                </svg>
                <label class="text-xxs md:text-sm">ประเภทห้องพัก : {{ item.roomType }}</label>
              </div>

              <div class="flex items-center space-x-2">
                <label class="text-xxs md:text-sm">วันที่เข้าพักจำนวน : {{ item.dateStay }} คืน,  {{ item.monthStay }} {{
                  item.yearStay }}</label>
              </div>
            </div>
            <div>
              <div>
                <label class="text-xs md:text-base text-stone-600">{{ item.detail }}</label>
              </div>
            </div>

            <div class="flex flex-col justify-end items-end text-stone-400 mt-4">
              <label class="text-xxxs md:text-sm">วันที่รีวิว : {{ item.dateReview }}</label>

              <button class="bg-stone-400 text-white px-2 py-1 rounded text-xxxs md:text-xs mt-2"
                @click="toggleReplyBox(idx)">ตอบกลับ</button>
              <div v-if="replyBoxOpen[idx]" class="w-full mt-2">
                <textarea v-model="replyText[idx]" rows="3" class="w-full border rounded p-2 text-xs md:text-base bg-stone-50"
                  placeholder="พิมพ์ข้อความตอบกลับ..."></textarea>
                <div class="flex justify-end space-x-2 mt-2">
                  <button class="bg-red-500 text-white px-2 py-1 rounded text-xxxs md:text-xs"
                    @click="cancelReply(idx)">ยกเลิก</button>
                  <button class="bg-blue-500 text-white px-2 py-1 rounded text-xxxs md:text-xs"
                    @click="sendReply(idx)">ส่งข้อความ</button>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div v-if="totalPages > 1" class="flex justify-center mt-4 space-x-2">
          <button v-for="page in totalPages" :key="page" @click="currentPage = page"
            :class="['px-3 py-1 rounded text-xs md:text-base', currentPage === page ? 'bg-yellow-400 text-white' : 'bg-gray-200']">
            {{ page }}
          </button>
        </div>
      </div>
    </div>


    <!-- ตอบกลับรีวิวคนที่ไม่ได้เข้าพัก เเละคนที่เข้าพักรีวิว
    <div class="mt-4 xl:pl-28 md:pl-16 pl-8">
      <div class="border rounded-lg py-4 md:px-12 px-4 md:mx-12">
        <div>
          <div class="flex space-x-2">
            <div>
              <label class="text-xs md:text-base font-bold text-stone-400">{{ nameLogin }}</label>
            </div>
          </div>
          <div>
            <hr class="border mt-2" />
          </div>
          <div>
            <div class="mt-2">
              <textarea rows="4" v-model="detail"
                class="text-xs md:text-base text-stone-600 bg-gray-100 w-full p-2 border rounded"></textarea>
            </div>
          </div>
          <div class="flex justify-end md:space-x-2 space-x-1">
            <button class="bg-red-500 text-white px-2 py-1 rounded text-xxxs md:text-xs">ยกเลิก</button>
            <button class="bg-blue-500 text-white px-2 py-1 rounded text-xxxs md:text-xs">ส่งข้อความ</button>
          </div>
        </div>
      </div>
    </div>

    ตอบกลับรีวิวเจ้าของที่พัก 
    <div class="mt-4 xl:pl-28 md:pl-16 pl-8">
      <div class="border rounded-lg py-4 md:px-12 px-4 md:mx-12 bg-stone-50">
        <div>
          <div class="flex space-x-2">
            <div>
              <label class="text-xs md:text-base font-bold text-stone-600">{{ nameLogin }}ถัะ</label>
            </div>
            <div>
              <label class="bg-yellow-400 px-2 font-bold text-white rounded-lg text-xxxs md:text-xs">{{ hotelName
              }}juyft</label>
            </div>
          </div>
          <div>
            <hr class="border mt-2" />
          </div>
          <div>
            <div class="mt-2">
              <textarea rows="4" v-model="detail"
                class="text-xs md:text-base text-stone-600 bg-white w-full p-2 border rounded"></textarea>
            </div>
          </div>
          <div class="flex justify-end md:space-x-2 space-x-1">
            <button class="bg-red-500 text-white px-2 py-1 rounded text-xxxs md:text-xs">ยกเลิก</button>
            <button class="bg-blue-500 text-white px-2 py-1 rounded text-xxxs md:text-xs">ส่งข้อความ</button>
          </div>
        </div>
      </div>
    </div> -->

    <!-- member ที่ไม่ได้เข้าพักรีวิว
    <div class="mt-4 xl:pl-28 md:pl-16 pl-8">
      <div v-for="(item, idx) in paginatedReviews" :key="idx"
        class="border rounded-lg py-4 md:px-12 px-4 md:mx-12 md:mb-4 mb-2">
        <div>
          <div class="flex space-x-2">
            <div>
              <label class="text-xs md:text-base font-bold text-stone-400">{{ item.name }}</label>
            </div>
          </div>
          <div>
            <hr class="border mt-2" />
          </div>

          <div>
            <div>
              <label class="text-xs md:text-base text-stone-600">{{ item.detail }}</label>
            </div>
          </div>

          <div class="flex items-center justify-end text-stone-400 mt-4">
            <label class="text-xxxs md:text-sm">วันที่เขียน : {{ item.dateReview }}</label>
          </div>
        </div>
      </div>
    </div>


    เจ้าของที่พักเข้ามาตอบกลับรีวิว 
    <div class="mt-4 xl:pl-28 md:pl-16 pl-8">
      <div v-for="(item, idx) in paginatedReviews" :key="idx"
        class="border rounded-lg py-4 md:px-12 px-4 md:mx-12 md:mb-4 mb-2 bg-stone-50">
        <div>
          <div class="flex space-x-1">
            <div>
              <label class="text-xs md:text-base font-bold text-stone-600">{{ item.name }}</label>
            </div>
            <div>
              <label class="bg-yellow-400 px-2 font-bold text-white rounded-lg text-xxxs md:text-xs">{{ item.hotelName
              }}juyft</label>
            </div>
          </div>
          <div>
            <hr class="border mt-2" />
          </div>

          <div class="mt-2 bg-white p-2 rounded">
            <label class="text-xs md:text-base text-stone-600">{{ item.detail
            }}</label>
          </div>


          <div class="flex items-center justify-end text-stone-400 mt-4">
            <label class="text-xxxs md:text-sm">วันที่เขียน : {{ item.dateReview }}</label>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue';
import MeterGroup from '@/components/element/MeterGroup.vue';

const props = defineProps({
  reviews: {
    type: Array,
    default: () => []
  }
});
const averageRating = computed(() => {
  if (!props.reviews.length) return 0;
  return (
    props.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
    props.reviews.length
  );
});

const meterGroupData = computed(() => [
  {
    label: 'คะแนนเฉลี่ย',
    value: Math.round((averageRating.value / 5) * 100), // แปลงเป็นเปอร์เซ็นต์
    color: '#facc15'
  }
]);

// Pagination
const reviewsPerPage = 5;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(props.reviews.length / reviewsPerPage));
const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * reviewsPerPage;
  return props.reviews.slice(start, start + reviewsPerPage);
});

// ตอบกลับรีวิว: สถานะเปิด-ปิดกล่องตอบกลับแต่ละรีวิว
const replyBoxOpen = ref({}); // { idx: true/false }
const replyText = ref({}); // { idx: 'ข้อความ' }

function toggleReplyBox(idx) {
  replyBoxOpen.value[idx] = !replyBoxOpen.value[idx];
  if (!replyBoxOpen.value[idx]) replyText.value[idx] = '';
}
function sendReply(idx) {
  // ส่งข้อความ replyText.value[idx] ไป backend หรือจัดการตามต้องการ
  replyBoxOpen.value[idx] = false;
  replyText.value[idx] = '';
}
function cancelReply(idx) {
  replyBoxOpen.value[idx] = false;
  replyText.value[idx] = '';
}
</script>

<style scoped></style>