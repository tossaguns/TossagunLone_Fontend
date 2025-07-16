<template>
  <TemplateAdmin>
    <template #header>
      <label>จัดการโปรโมชัน</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">


        <div class="md:rounded-b-lg px-4 pt-4 max-w-7xl mx-auto">
          <p class="text-2xl font-bold text-center py-4">
            เพิ่มโปรโมชั่น
          </p>

          <div class="flex flex-col xl:flex-row justify-center lg:space-x-5 item-center">

            <div class="w-full lg:w-4/6">
              <div>
                <p class="mb-2">ชื่อโปรโมชั่น</p>
                <input class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4"
                  v-model="promotion.name" />
              </div>
              <div>
                <p class="mb-2">รายละเอียด</p>
                <textarea rows="5" v-model="promotion.detail"
                  class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4"
                  placeholder="พิมพ์ทีละบรรทัด เช่น&#10;พื้นที่อีเมล 50GB&#10;พื้นที่ Cloud 1TB..."></textarea>
              </div>

              <div>
                <p class="mb-2">วันเริ่มโปรโมชั่น</p>
                <input type="date" v-model="promotion.dateStart" :min="new Date().toISOString().split('T')[0]"
                  class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
              </div>
              <div>
                <div>
                  <p>มีวันสิ้นสุดโปรโมชั่นหรือไม่ ?</p>
                  <div class="flex items-center gap-4 mb-4">
                    <label class="flex items-center">
                      <input type="radio" value="yes" v-model="hasEndDate" class="mr-2" />
                      มี
                    </label>
                    <label class="flex items-center">
                      <input type="radio" value="no" v-model="hasEndDate" class="mr-2" />
                      ไม่มี
                    </label>
                  </div>
                </div>

                <!-- แสดง input วันสิ้นสุดเฉพาะเมื่อเลือก "มี" -->
                <div v-if="hasEndDate === 'yes'">
                  <p class="mb-2">วันสิ้นสุดโปรโมชั่น</p>
                  <input type="date" v-model="promotion.dateFinish" :min="promotion.dateStart"
                    class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
                </div>
              </div>

              <div>
                <p class="mb-2">ราคาเต็ม</p>
                <input type="number" v-model="promotion.price"
                  class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
              </div>

              <div>
                <p>ต้องการลดราคาหรือไม่ ?</p>
                <div class="flex items-center gap-4 mb-4">
                  <label class="flex items-center">
                    <input type="radio" value="yesReduced" v-model="promotion.wantToReduce" class="mr-2" />
                    ใช่
                  </label>
                  <label class="flex items-center">
                    <input type="radio" value="noReduced" v-model="promotion.wantToReduce" class="mr-2" />
                    ไม่
                  </label>
                </div>
              </div>

              <div v-if="promotion.wantToReduce === 'yesReduced'">
                <div>
                  <p>การลดราคา</p>
                  <div class="flex items-center gap-4 mb-4">
                    <label class="flex items-center">
                      <input type="radio" value="reduced" v-model="promotion.discountType" class="mr-2" />
                      ลดราคาบาท
                    </label>
                    <label class="flex items-center">
                      <input type="radio" value="percent" v-model="promotion.discountType" class="mr-2" />
                      ลดราคาคิดเป็น %
                    </label>
                  </div>

                  <div v-if="promotion.discountType === 'reduced'">
                    <p class="mb-2">ลดราคา</p>
                    <input type="number" v-model="promotion.reducedPrice" :max="promotion.price || null" :min="0"
                      @input="handleReducedInput"
                      class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
                  </div>

                  <div v-if="promotion.discountType === 'percent'">
                    <p class="mb-2">คิดเป็น %</p>
                    <input type="number" v-model="promotion.percentPrice" :max="100" :min="0"
                      @input="handlePercentInput"
                      class="border border-gray-300 px-3 py-2 rounded w-full resize-none mb-4" />
                  </div>
                </div>
              </div>
            </div>


            <div class="lg:w-3/6">
              <div class="md:max-w-md mx-auto rounded-lg mt-3 shadow-lg border-2">
                <!-- หัวโปรโมชั่น -->
                <div class="py-4 text-center font-bold text-lg break-all whitespace-pre-wrap text-black">
                  {{ promotion.name || 'ชื่อโปรโมชั่น' }}
                </div>

                <!-- เนื้อหาข้างใน -->
                <div>
                  <div class="bg-white px-6 pb-6 space-y-2 text-gray-700">
                    <!-- ถ้ามีลดราคา -->
                    <div v-if="promotion.wantToReduce === 'yesReduced' && (
                      (promotion.discountType === 'reduced' && promotion.price && promotion.reducedPrice) ||
                      (promotion.discountType === 'percent' && promotion.price && promotion.percentPrice)
                    )" class="text-center mt-2">
                      <div class="flex flex-col justify-center items-center">
                        <span class="text-xl text-gray-400 line-through mr-2">
                          {{ promotion.price }}
                        </span>
                        <span class="text-6xl font-bold text-red-600 align-middle">
                          <!-- ลดราคาบาท -->
                          <template v-if="promotion.discountType === 'reduced'">
                            {{ Number(promotion.price) - Number(promotion.reducedPrice) }}
                          </template>
                          <!-- ลดราคาคิดเป็น % -->
                          <template v-else-if="promotion.discountType === 'percent'">
                            {{ (Number(promotion.price) - (Number(promotion.price) * Number(promotion.percentPrice) /
                              100)).toFixed(2) }}
                          </template>
                        </span>
                      </div>
                      <div>
                        <span class="text-sm font-thin text-gray-400">บาท / คน / บัญชี</span>
                      </div>
                    </div>
                    <!-- ถ้าไม่มีลดราคา -->
                    <div v-else class="text-6xl font-bold text-center text-gray-900">
                      {{ promotion.price || '0' }} <br>
                      <span class="text-sm font-thin text-gray-400">บาท / คน / บัญชี</span>
                    </div>
                    <ul class="list-none mt-4">
                      <li v-for="(line, index) in promotion.detail.split('\n')" :key="index" class="flex items-start">
                        <span class="mr-2">✔</span>
                        <span class="break-all whitespace-pre-wrap w-0 flex-1 text-gray-700">{{ line }}</span>
                      </li>
                      <li class="flex items-center mt-5">
                        <span class="mr-2 mt-1">📅</span>
                        <span class="text-sm">เริ่ม: {{ promotion.dateStart || '-' }}</span>
                      </li>
                      <li v-if="hasEndDate === 'yes'" class="flex items-center">
                        <span class="mr-2 mt-1">📅</span>
                        <span class="text-sm">สิ้นสุด: {{ promotion.dateFinish || '-' }}</span>
                      </li>
                      <!-- วันที่ลดราคา -->

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="my-6 flex justify-center space-x-3">
            <button @click="navigateBackToMainPromotion"
              class="bg-red-500 py-2 px-3 text-white rounded-lg hover:bg-red-600">ย้อนกลับ</button>
            <button class="bg-gray-400 py-2 px-3 text-white rounded-lg hover:bg-gray-600">รีเซ็ท</button>
            <button @click="updatePromotion"
              class="bg-green-500 py-2 px-3 text-white rounded-lg hover:bg-green-600">บันทึก</button>
          </div>
        </div>
      </div>
    </template>
  </TemplateAdmin>
</template>

<script setup>
import TemplateAdmin from "@/components/TemplateAdmin.vue";
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'



const hasEndDate = ref(null)
const router = useRouter()
const route = useRoute()

const promotion = ref({
  name: '',
  detail: '',
  dateStart: '',
  dateFinish: '',
  price: '',
  wantToReduce: '',
  reducedPrice: '',
  dateReducedPercentPriceStart: '',
  dateReducedPercentPriceFinish: '',
  percentPrice: '',
  discountType: '',
})

const loading = ref(true)
const error = ref('')

// โหลดข้อมูลโปรโมชั่นเดิม
onMounted(async () => {
  try {
    const id = route.params.id
    const res = await fetch(`http://localhost:9999/HotelSleepGun/promotion/get/${id}`)
    if (!res.ok) throw new Error('ไม่พบข้อมูลโปรโมชั่น')
    const data = await res.json()
    promotion.value = data
    // แปลงวันที่ให้เป็น YYYY-MM-DD สำหรับ input type="date"
    if (promotion.value.dateStart) {
      promotion.value.dateStart = promotion.value.dateStart.slice(0, 10)
    }
    if (promotion.value.dateFinish) {
      promotion.value.dateFinish = promotion.value.dateFinish.slice(0, 10)
    }
    // ตั้งค่า hasEndDate ตามข้อมูล
    hasEndDate.value = data.dateFinish ? 'yes' : 'no'
    loading.value = false
  } catch (e) {
    error.value = e.message
    loading.value = false
  }
})

// ฟังก์ชันบันทึกการแก้ไข
async function updatePromotion() {
  try {
    const id = route.params.id
    // ถ้าไม่มีวันสิ้นสุด ให้ลบ dateFinish ออก
    if (hasEndDate.value !== 'yes') {
      promotion.value.dateFinish = ''
    }
    const res = await fetch(`http://localhost:9999/HotelSleepGun/promotion/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promotion.value)
    })
    if (!res.ok) throw new Error('อัปเดตโปรโมชั่นไม่สำเร็จ')
    alert('อัปเดตโปรโมชั่นสำเร็จ')
    router.push('/mainpromotion')
  } catch (e) {
    alert(e.message)
  }
}


function navigateBackToMainPromotion() {
  router.push('/mainpromotion')
}

</script>