<template>
  <TemplatePartner>
    <template #header>
      <label>โปรไฟล์บริษัท</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div>
          <div>
            <p class="font-bold">1. ระยะเวลาในการเข้าพัก</p>
            <div class="max-w-3xl mx-auto mt-3 space-y-2">
              <p>Check-in เวลา<span class="border px-3 mx-3 py-1 rounded-md text-amber-600 ">{{ checkInForm }} -
                  {{ checkInTo }}</span>นาฬิกา</p>
              <p>Check-out เวลา<span class="border px-3 mx-3 py-1 rounded-md text-amber-600">{{ checkOutForm }} -
                  {{ checkOutTo }}</span>นาฬิกา</p>

              <p>สิ่งที่ต้องนำมาเมื่อทำการ check-in : <span class="border px-3 mx-3 py-1 rounded-md text-amber-600  ">{{
                VerifyIden_checkIn }}</span></p>
            </div>
          </div>

          <hr class="border my-4" />

          <div>
            <p class="font-bold">2. เตียงเสริม</p>

            <div class="max-w-3xl mx-auto mt-3 space-y-2">
              <p>
                ที่พักของคุณมีให้เพิ่มเตียงเสริมหรือไม่ :
                <span class="border px-3 mx-3 py-1 rounded-md text-amber-600">{{ hasExtraBedText
                }}</span>
              </p>

              <!-- แสดงเฉพาะเมื่อ hasExtraBed เป็น true -->
              <div v-if="hasExtraBed === 'yes'"
                class="max-w-xl mx-auto text-center space-y-2 p-4 shadow-md mt-3 rounded-lg">
                <p class="font-bold">ลักษณะเตียงเเละราคา</p>
                <p>เตียงเด็ก ราคา : <span class="border px-3 mx-3 py-1 rounded-md text-amber-600">{{
                  bedPrice.child }}</span> บาท</p>
                <p>เตียงปกติ ราคา : <span class="border px-3 mx-3 py-1 rounded-md text-amber-600">{{
                  bedPrice.normal }}</span> บาท</p>
              </div>
            </div>
          </div>

          <hr class="border my-4" />

          <!-- คอมเม้นส่วนนโยบายการเก็บเงินมัดจำ -->
          <!-- <div>
            <p class="font-bold">3. นโยบายการเก็บเงินมัดจำ</p>

            <div class="max-w-3xl mx-auto mt-3 space-y-2">
              <p>
                ที่พักของคุณมีให้เพิ่มเตียงเสริมหรือไม่ :
                <span class="border px-3 mx-3 py-1 rounded-md text-amber-600">{{
                  }}</span>
              </p>

              <div v-if="hasExtraBed" class="max-w-xl mx-auto text-center space-y-2 p-4 shadow-md mt-3 rounded-lg">
                <p class="font-bold">นโยบายการเก็บเงินค่ามัดจำ</p>
                <p>ค่ามัดจำต่อห้องราคา : <span class="border px-3 mx-3 py-1 rounded-md text-amber-600">{{
                    }}</span> บาท</p>
                <p class="text-left">ราคาที่ต้องจ่ายของค่ามัดจำมีอะไรบ้าง : </p>
                <p class="border py-2 px-3 rounded-md text-left text-amber-600">{{ cashPledge.note
                }}</p>
              </div>
            </div>
          </div>

          <hr class="border my-4" /> -->

          <div>
            <p class="font-bold">3. เกี่ยวกับที่พัก</p>
            <div class="max-w-3xl mx-auto">
              <div class=" mt-3 space-y-2">
                <div>
                  <p>3.1 อธิบายเกี่ยวกับที่พัก</p>
                  <p class="border mt-2 rounded-md text-amber-600 px-3 py-1 break-words">{{ AboutFacilityHotel }}
                  </p>
                </div>
                <div class="max-w-xl mx-auto border p-4 rounded-md bg-lime-50">
                  <p class="text-center text-sm font-bold mb-4">ตัวเลือกเกี่ยวกับที่พัก</p>
                  <div v-if="selectedFacilities.length > 0" class="text-left">
                    <p v-for="facility in selectedFacilities" :key="facility._id" class="text-sm">
                      • {{ facility.name }}
                    </p>
                  </div>
                  <p v-else class="text-sm text-gray-500">ไม่มีตัวเลือกที่เลือก</p>
                </div>
              </div>

              <div class=" mt-3 space-y-2">
                <div>
                  <p>3.2 อธิบายเกี่ยวกับทำเลที่ตั้ง</p>
                  <p class="border mt-2 rounded-md text-amber-600 px-3 py-1 break-words">{{
                    AboutHotelLocation }}
                  </p>
                </div>
                <div class="max-w-xl mx-auto border p-4 rounded-md bg-fuchsia-50">
                  <p class="text-center text-sm font-bold mb-4">ตัวเลือกเกี่ยวกับทำเลที่ตั้ง</p>
                  <div v-if="selectedHotelLocation.length > 0" class="text-left">
                    <p v-for="location in selectedHotelLocation" :key="location._id" class="text-sm">
                      • {{ location.name }}
                    </p>
                  </div>
                  <p v-else class="text-sm text-gray-500">ไม่มีตัวเลือกที่เลือก</p>
                </div>
              </div>

              <div class=" mt-3 space-y-2">
                <div>
                  <p>3.3 อธิบายเกี่ยวกับสิ่งอำนวยความสะดวกภายในห้อง</p>
                  <p class="border mt-2 rounded-md text-amber-600 px-3 py-1 break-words">{{ AboutRoomHotel }}
                  </p>
                </div>
                <div class="max-w-xl mx-auto border p-4 rounded-md bg-stone-50">
                  <p class="text-center text-sm font-bold mb-4">
                    ตัวเลือกเกี่ยวกับสิ่งอำนวยความสะดวกภายในห้อง</p>
                  <div v-if="selectedRoomHotel.length > 0" class="text-left">
                    <p v-for="room in selectedRoomHotel" :key="room._id" class="text-sm">
                      • {{ room.name }}
                    </p>
                  </div>
                  <p v-else class="text-sm text-gray-500">ไม่มีตัวเลือกที่เลือก</p>
                </div>
              </div>


              <div class=" mt-3 space-y-2">
                <div>
                  <p>3.4 อธิบายเกี่ยวกับการรองรับสัตว์เลี้ยงหรือไม่</p>
                  <p class="border mt-2 rounded-md text-amber-600 px-3 py-1 break-words">{{ AboutHotelFor }}
                  </p>
                </div>
                <div class="max-w-xl mx-auto border p-4 rounded-md bg-indigo-50">
                  <p class="text-center text-sm font-bold mb-4">
                    ตัวเลือกเกี่ยวกับการรองรับสัตว์เลี้ยงหรือไม่</p>
                  <div v-if="selectedHotelFor.length > 0" class="text-left">
                    <p v-for="hotelFor in selectedHotelFor" :key="hotelFor._id" class="text-sm">
                      • {{ hotelFor.name }}
                    </p>
                  </div>
                  <p v-else class="text-sm text-gray-500">ไม่มีตัวเลือกที่เลือก</p>
                </div>
              </div>

              <div class=" mx-auto mt-3 space-y-2">
                <div>
                  <p>3.5 อธิบายเกี่ยวกับมื้ออาหารของที่พัก</p>
                  <p class="border mt-2 rounded-md text-amber-600 px-3 py-1 break-words">{{ AboutFoodHotel }}
                  </p>
                </div>
                <div class="max-w-xl mx-auto border p-4 rounded-md bg-amber-50">
                  <p class="text-center text-sm font-bold mb-4">
                    ตัวเลือกเกี่ยวกับมื้ออาหารของที่พัก</p>
                  <div v-if="selectedFoodHotel.length > 0" class="text-left">
                    <p v-for="food in selectedFoodHotel" :key="food._id" class="text-sm">
                      • {{ food.name }}
                    </p>
                  </div>
                  <p v-else class="text-sm text-gray-500">ไม่มีตัวเลือกที่เลือก</p>
                </div>
              </div>
            </div>
          </div>
          <hr class="border my-4" />
        </div>

        <div class="flex justify-center mt-8 mb-6 space-x-3">
          <button @click="goToMainProfile"
            class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">ย้อนกลับ</button>
          <button @click="goToEditDetailHotel"
            class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500">เเก้ไข</button>
        </div>
      </div>
    </template>
  </TemplatePartner>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import TemplatePartner from "@/components/TemplatePartner.vue";
import axios from 'axios'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

// Data variables
const hasExtraBed = ref('no')
const bedPrice = ref({ child: 0, normal: 0 })
const checkInForm = ref('')
const checkInTo = ref('')
const checkOutForm = ref('')
const checkOutTo = ref('')
const VerifyIden_checkIn = ref('')
const AboutFacilityHotel = ref('')
const AboutHotelLocation = ref('')
const AboutRoomHotel = ref('')
const AboutHotelFor = ref('')
const AboutFoodHotel = ref('')

// Selected items
const selectedFacilities = ref([])
const selectedHotelLocation = ref([])
const selectedRoomHotel = ref([])
const selectedHotelFor = ref([])
const selectedFoodHotel = ref([])

// Computed properties
const hasExtraBedText = computed(() => {
  return hasExtraBed.value === 'yes' ? 'มี' : 'ไม่มี'
})

// Load about hotel data
async function loadAboutHotelData() {
  try {
    const partnerId = localStorage.getItem('partnerId')
    if (partnerId) {
      const res = await axios.get(`http://localhost:9999/HotelSleepGun/aboutHotel/getByPartnerId/${partnerId}`)

      if (res.data) {
        const data = res.data

        // Populate form data
        hasExtraBed.value = data.hasExtraBed || 'no'
        bedPrice.value = data.typeBedPrice || { child: 0, normal: 0 }
        checkInForm.value = data.checkInForm || ''
        checkInTo.value = data.checkInTo || ''
        checkOutForm.value = data.checkOutForm || ''
        checkOutTo.value = data.checkOutTo || ''
        VerifyIden_checkIn.value = data.VerifyIden_checkIn || ''
        AboutFacilityHotel.value = data.AboutFacilityHotel || ''
        AboutHotelLocation.value = data.AboutHotelLocation || ''
        AboutRoomHotel.value = data.AboutRoomHotel || ''
        AboutHotelFor.value = data.AboutHotelFor || ''
        AboutFoodHotel.value = data.AboutFoodHotel || ''

        // Populate selected items - handle arrays
        selectedFacilities.value = data.typeFacilityHotel ?
          (Array.isArray(data.typeFacilityHotel) ? data.typeFacilityHotel : [data.typeFacilityHotel]) : []
        selectedHotelLocation.value = data.typeHotelLocation ?
          (Array.isArray(data.typeHotelLocation) ? data.typeHotelLocation : [data.typeHotelLocation]) : []
        selectedRoomHotel.value = data.typeRoomHotel ?
          (Array.isArray(data.typeRoomHotel) ? data.typeRoomHotel : [data.typeRoomHotel]) : []
        selectedHotelFor.value = data.typeHotelFor ?
          (Array.isArray(data.typeHotelFor) ? data.typeHotelFor : [data.typeHotelFor]) : []
        selectedFoodHotel.value = data.typeFoodHotel ?
          (Array.isArray(data.typeFoodHotel) ? data.typeFoodHotel : [data.typeFoodHotel]) : []
      }
    }
  } catch (e) {
    console.error('loadAboutHotelData error', e)
  }
}

function goToEditDetailHotel() {
  router.push('/editdetailhotel')
}

function goToMainProfile() {
  router.push('/mainprofile')
}

onMounted(async () => {
  await loadAboutHotelData()
})
</script>
