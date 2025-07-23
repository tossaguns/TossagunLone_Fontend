<template>
  <div class="mx-4 p-4">
    <div>
      <div>
        <label class="font-bold text-lg">รีวิวที่พัก {{ hotelName }}</label>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-center">

        <div class="px-4 w-1/2 flex justify-center items-center">
          <label>จำนวนรีวิวทั้งหมด : </label>
          <div>
            <!-- ดาว -->
          </div>
        </div>

        <div class="w-1/2">
          <div class="card">
            <MeterGroup :value="meterData" />
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="border rounded-lg py-4 px-12 mx-12">
          <div>
            <!-- ชื่อบอกด้วยว่าเปิดเผยตัวตนหรือไม่ -->
            <div class="flex space-x-2">
              <div>
                <label class="font-bold text-stone-400">{{ nameMember }} dd</label>
              </div>
              <div class="flex  items-end px-4 md:px-0">
                <div v-for="(item, idx) in reviews" :key="idx" class="flex items-start space-x-4">
                  <div><span v-for="n in 5" :key="n" class="text-xl"
                      :class="n <= item.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <hr class="border my-2" />
            </div>

            <div>
              <div>
                <label>{{ detailReview }}fdckugyiolu</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import MeterGroup from '@/components/element/MeterGroup.vue';

const meterData = ref([
  { label: 'คะเเนนรีวิวทั้งหมด', value: 15, color: ' #facc15' },
]);

const reviews = ref([
  {
    rating: 5,
  }
])
</script>



<style scoped></style>