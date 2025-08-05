<template>
  <TemplatePartner>
    <template #header>
      <label>จัดการที่พัก</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div>
          <div
            :class="['p-4 rounded-lg my-6 flex justify-between items-center', manageHotelSleepGun === 'open' ? 'bg-yellow-200' : 'bg-stone-200']">
            <div class="w-1/2 flex justify-end pr-4 ">
              <label class="text-lg font-bold">จัดการโรงเเรมใน SleepGun ทั้งหมด</label>
            </div>
            <div class="w-1/2 flex justify-start pl-4">
              <div class="bg-white border rounded-md px-3 py-1 w-24 text-center text-lg shadow">{{ manageHotelSleepGun
              }}</div>
            </div>
          </div>
          <div>
            <p class="font-bold">1. ระยะเวลาในการเข้าพัก</p>
            <div class="max-w-3xl mx-auto mt-3 space-y-2">
              <p>Check-in เวลา<span class="border px-3 mx-3 py-1 rounded-md text-amber-600 ">{{ checkInForm }} -
                  {{ checkInTo }}</span>นาฬิกา</p>
              <p>Check-out เวลา<span class="border px-3 mx-3 py-1 rounded-md text-amber-600">{{ checkOutForm }} -
                  {{ checkOutTo }}</span>นาฬิกา</p>

              <p>สิ่งที่ต้องนำมาเมื่อทำการ check-in : <span class="border px-3 mx-3 py-1 rounded-md text-amber-600  ">{{
                VerifyIden_checkIn }}</span></p>
              <p>คิดราคาค่าเข้าพักก่อนเวลา/ชั่วโมง : <span class="border px-3 mx-3 py-1 rounded-md text-amber-600">{{
                checkInEarlyPricePerHour }}</span> บาท</p>
              <p>คิดราคาค่าออกหลังเวลา/ชั่วโมง : <span class="border px-3 mx-3 py-1 rounded-md text-amber-600">{{
                checkOutEarlyPricePerHour }}</span> บาท</p>
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
                <p>เตียงธรรมดา ราคา : <span class="border px-3 mx-3 py-1 rounded-md text-amber-600">{{
                  bedPrice.normal }}</span> บาท</p>
              </div>
            </div>
          </div>

          <hr class="border my-4" />

          <!-- คอมเม้นส่วนนโยบายการเก็บเงินมัดจำ -->
          <div>
            <p class="font-bold">3. นโยบายการเก็บเงินมัดจำ</p>

            <div class="max-w-3xl mx-auto mt-3 space-y-2">
              <p>
                ที่พักของคุณมีนโยบายการเก็บเงินมัดจำหรือไม่ :
                <span class="border px-3 mx-3 py-1 rounded-md text-amber-600">
                  {{ hasExtraCashPledgeText }}
                </span>
              </p>

              <div v-if="hasExtraCashPledge === 'yes'"
                class="max-w-xl mx-auto text-center space-y-2 p-4 shadow-md mt-3 rounded-lg">
                <p class="font-bold">นโยบายการเก็บเงินค่ามัดจำ</p>
                <p>ค่ามัดจำต่อห้องราคา : <span class="border px-3 mx-3 py-1 rounded-md text-amber-600">
                    {{ cashPledge.price }}
                  </span> บาท</p>
                <p class="text-left">รายละเอียดค่ามัดจำ : </p>
                <p class="border py-2 px-3 rounded-md text-left text-amber-600">
                  {{ cashPledge.note }}
                </p>
              </div>
            </div>
          </div>

          <hr class="border my-4" />

          <div>
            <p class="font-bold">4. เกี่ยวกับที่พัก</p>
            <div class="max-w-3xl mx-auto">
              <div class=" mt-3 space-y-2">
                <div>
                  <p>4.1 อธิบายเกี่ยวกับที่พัก</p>
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
                  <p>4.2 อธิบายเกี่ยวกับทำเลที่ตั้ง</p>
                  <p class="border mt-2 rounded-md text-amber-600 px-3 py-1 break-words">{{
                    AboutHotelLocation }}
                  </p>
                </div>
                <div class="max-w-xl mx-auto border p-4 rounded-md bg-fuchsia-50">
                  <p class="text-center text-sm font-bold mb-4">ตัวเลือกเกี่ยวกับทำเลที่ตั้ง</p>
                  <div v-if="selectedHotelLocation.length > 0" class="text-left">
                    <div v-for="location in selectedHotelLocation" :key="location._id" class="text-sm mb-2">
                      <p>• {{ location.name }}</p>
                      <!-- แสดงรายละเอียดเพิ่มเติมถ้ามี -->
                      <p v-if="hotelLocationDetails[location._id]" class="text-xs text-gray-600 ml-4 mt-1">
                        รายละเอียด: {{ hotelLocationDetails[location._id] }}
                      </p>
                    </div>
                  </div>
                  <p v-else class="text-sm text-gray-500">ไม่มีตัวเลือกที่เลือก</p>
                </div>
              </div>

              <div class=" mt-3 space-y-2">
                <div>
                  <p>4.3 อธิบายเกี่ยวกับสิ่งอำนวยความสะดวกภายในห้อง</p>
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
                  <p>4.4 อธิบายเกี่ยวกับการรองรับสัตว์เลี้ยงหรือไม่</p>
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
                  <p>4.5 อธิบายเกี่ยวกับมื้ออาหารของที่พัก</p>
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
          <button @click="goToManageHotel"
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
const hasExtraCashPledge = ref('no')
const bedPrice = ref({ child: 0, normal: 0 })
const cashPledge = ref({ price: 0, note: '' })
const checkInForm = ref('')
const checkInTo = ref('')
const checkOutForm = ref('')
const checkOutTo = ref('')
const VerifyIden_checkIn = ref('')
const checkInEarlyPricePerHour = ref('')
const checkOutEarlyPricePerHour = ref('')
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

// เพิ่ม reactive data สำหรับเก็บ detailByPartner ของแต่ละ hotel location
const hotelLocationDetails = ref({})

// Computed properties
const hasExtraBedText = computed(() => {
  return hasExtraBed.value === 'yes' ? 'มี' : 'ไม่มี'
})

const hasExtraCashPledgeText = computed(() => {
  return hasExtraCashPledge.value === 'yes' ? 'มี' : 'ไม่มี'
})

const manageHotelSleepGun = ref('open')

// Load about hotel data
async function loadAboutHotelData() {
  try {
    const partnerId = localStorage.getItem('partnerId')
    const token = localStorage.getItem('token')
    if (partnerId && token) {
      const res = await axios.get(`http://localhost:9999/HotelSleepGun/pos/about-hotel`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (res.data.success && res.data.data) {
        const data = res.data.data

        // Populate form data
        hasExtraBed.value = data.hasExtraBed || 'no'
        hasExtraCashPledge.value = data.hasExtraCashPledge || 'no'
        bedPrice.value = data.typeBedPrice || { child: 0, normal: 0 }
        cashPledge.value = data.cashPledge || { price: 0, note: '' }
        checkInForm.value = data.checkInForm || ''
        checkInTo.value = data.checkInTo || ''
        checkOutForm.value = data.checkOutForm || ''
        checkOutTo.value = data.checkOutTo || ''
        VerifyIden_checkIn.value = data.VerifyIden_checkIn || ''
        checkInEarlyPricePerHour.value = data.checkInEarlyPricePerHour || ''
        checkOutEarlyPricePerHour.value = data.checkOutEarlyPricePerHour || ''
        AboutFacilityHotel.value = data.AboutFacilityHotel || ''
        AboutHotelLocation.value = data.AboutHotelLocation || ''
        AboutRoomHotel.value = data.AboutRoomHotel || ''
        AboutHotelFor.value = data.AboutHotelFor || ''
        AboutFoodHotel.value = data.AboutFoodHotel || ''
        manageHotelSleepGun.value = data.manageHotelSleepGun || 'open'

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

        // โหลดข้อมูล detailByPartner สำหรับ hotel location
        if (data.hotelLocationDetails) {
          hotelLocationDetails.value = data.hotelLocationDetails
        }
      }
    }
  } catch (e) {
    console.error('loadAboutHotelData error', e)
  }
}

function goToManageHotel() {
  router.push('/editmanagehotel')
}

onMounted(async () => {
  await loadAboutHotelData()
  // ลบ fetch ด้วย id ออก
})
</script>
