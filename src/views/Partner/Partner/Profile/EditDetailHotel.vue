<template>
  <TemplatePartner>
    <template #header>
      <label>โปรไฟล์บริษัท</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">

        <div>
          <p class="font-bold">1. ระยะเวลาในการเข้าพัก</p>

          <div class="max-w-3xl mx-auto px-5 pt-4 pb-6 text-center">
            <div class="mb-6">
              <p class="mb-2 font-semibold text-sm text-stone-500">เวลา Check-in <span class="text-red-600">*</span></p>
              <div class="flex justify-center items-center space-x-3">
                <p>จาก :</p>
                <input v-model="checkInForm" class="border rounded-md px-3 py-1 w-24 text-center" placeholder="00:00" />
                <p>ถึง :</p>
                <input v-model="checkInTo" class="border rounded-md px-3 py-1 w-24 text-center" placeholder="00:00" />
              </div>
              <div class="max-w-xl mx-auto">
                <input v-model="VerifyIden_checkIn" class="border mt-3 text-xs md:text-sm  p-3 rounded-md w-full"
                  placeholder="กรอกสิ่งที่ต้องเเสดงในการ check-in เช่น เเสดงวีซ่าหรือเลขบัตรประชาชน..." />
              </div>
            </div>


            <div>
              <p class="mb-2 font-semibold text-sm text-stone-500">เวลา Check-out <span class="text-red-600">*</span>
              </p>
              <div class="flex justify-center items-center space-x-3">
                <p>จาก :</p>
                <input v-model="checkOutForm" class="border rounded-md px-3 py-1 w-24 text-center"
                  placeholder="00:00" />
                <p>ถึง :</p>
                <input v-model="checkOutTo" class="border rounded-md px-3 py-1 w-24 text-center" placeholder="00:00" />
              </div>
            </div>
          </div>
        </div>

        <hr class="border-2 my-6" />

        <div>
          <p class="font-bold">2. เตียงเสริม</p>

          <div class="max-w-3xl mx-auto px-5 pt-4 pb-2 text-center">
            <!-- คำถาม -->
            <div class="mb-6 space-x-8 space-y-2">
              <p>ที่พักของคุณมีให้เพิ่มเตียงเสริมหรือไม่<span class="text-red-600 px-1">*</span>
              </p>
              <label>
                <input type="radio" value="yes" v-model="hasExtraBed" />
                มี
              </label>
              <label>
                <input type="radio" value="no" v-model="hasExtraBed" />
                ไม่มี
              </label>
            </div>


            <transition name="fade-slide" mode="out-in">
              <div v-if="hasExtraBed === 'yes'" class="mb-6 shadow-md rounded-lg p-4">
                <p class="mb-2 font-semibold text-sm text-stone-500">
                  ลักษณะเตียงเเละราคา (หากไม่มีอันไหนไม่ต้องใส่ข้อมูล) <span class="text-red-600 px-1">*</span>
                </p>

                <div class="flex flex-col justify-center items-center space-y-3">
                  <div class="flex space-x-3">
                    <InputNumber v-model="extraBed.child" id="child" label="ราคาเตียงเด็ก / บาท"
                      :class="highlightField === 'child' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                  </div>
                  <div class="flex space-x-3">
                    <InputNumber v-model="extraBed.normal" id="normal" label="ราคาเตียงปกติ / บาท"
                      :class="highlightField === 'normal' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                  </div>

                </div>
              </div>
            </transition>
          </div>
        </div>



        <!-- TODO: เอาไว้ใช้ตอนทำเเบรนด์เอง -->
        <!-- <div>
          <hr class="border-2 my-6" />
          <p class="font-bold">3. นโยบายการเก็บเงินมัดจำ</p>

          <div class="max-w-3xl mx-auto px-5 pt-4 pb-2 text-center">
      
            <div class="mb-6 space-x-8 space-y-2">
              <p>ที่พักขอคุณมีนโยบายเรียกเก็บเงินมัดจำหรือไม่<span class="text-red-600 px-1">*</span>
              </p>
              <label>
                <input type="radio" value="yes" v-model="hasExtraCashPledge" />
                มี
              </label>
              <label>
                <input type="radio" value="no" v-model="hasExtraCashPledge" />
                ไม่มี
              </label>
            </div>

            <transition name="fade-slide" mode="out-in">
              <div v-if="hasExtraCashPledge === 'yes'" class="mb-6 shadow-md rounded-lg p-4">
                <p class="mb-2 font-semibold text-sm text-stone-500">
                  นโยบายการเก็บเงินมัดจำ<span class="text-red-600 px-1">*</span>
                </p>
                <div class="flex space-x-3">
                  <p>ค่ามัดจำต่อห้องราคา :</p>
                  <input class="border rounded-md px-3 py-1 w-24 " placeholder="ราคา" /><span>บาท</span>
                </div>
                <div class="flex-col mt-2">
                  <p class="text-left">ราคาที่ต้องจ่ายของค่ามัดจำมีอะไรบ้าง :</p>
                  <input class="border rounded-md px-3 py-2 w-full mt-2" placeholder="ค่ากุญเเจ ค่าคีย์การ์ด..." />
                </div>
              </div>
            </transition>
          </div>
        </div>-->

        <hr class="border-2 my-6" />

        <p class="font-bold">3. เกี่ยวกับที่พัก</p>

        <div class="mt-5">
          <div class="mx-5">
            <p class="mb-2 text-lime-700">3.1 อธิบายเกี่ยวกับที่พัก</p>
            <textarea v-model="AboutFacilityHotel" rows="3"
              class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
              placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
          </div>
          <div>
            <p class="text-center my-4 text-lime-600">
              โปรดคลิ๊กกล่องข้อความให้ตรงกับที่พักของท่าน</p>
            <div class="max-w-3xl mx-auto">
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 border p-4 rounded-lg shadow-md bg-lime-50">
                <div v-for="facility in facilities" :key="facility._id"
                  class="flex items-center border p-3 space-x-2 rounded shadow bg-white">
                  <input type="checkbox" v-model="selectedFacilities" :value="facility._id" />
                  <img :src="`http://localhost:9999/uploads/icons/${facility.icon}`" alt="icon"
                    class="h-5 object-contain pl-2" />

                  <span class="text-gray-700">{{ facility.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="mt-5">
          <div class="mx-5">
            <p class="mb-2 text-fuchsia-700">3.2 อธิบายเกี่ยวกับทำเลที่ตั้ง</p>
            <textarea v-model="AboutHotelLocation" rows="3"
              class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
              placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
          </div>
          <div>
            <p class="text-center my-4 text-fuchsia-400">
              โปรดคลิ๊กกล่องข้อความให้ตรงกับทำเลที่พักของท่าน</p>
            <div class="max-w-3xl mx-auto">
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 border p-4 rounded-lg shadow-md bg-fuchsia-50">
                <div v-for="hotelLocation in hotelLocation" :key="hotelLocation._id"
                  class="flex items-center border p-3 space-x-2 rounded shadow bg-white">
                  <input type="checkbox" v-model="selectedHotelLocation" :value="hotelLocation._id" />
                  <img :src="`http://localhost:9999/uploads/icons/${hotelLocation.icon}`" alt="icon"
                    class="h-5 object-contain pl-2" />

                  <span class="text-gray-700">{{ hotelLocation.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="border-2 my-6" />

        <div class="mt-5">
          <div class="mx-5">
            <p class="mb-2 text-stone-700">3.3 อธิบายเกี่ยวกับสิ่งอำนวยความสะดวกภายในที่พัก</p>
            <textarea v-model="AboutRoomHotel" rows="3"
              class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
              placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
          </div>
          <div>
            <p class="text-center my-4 text-stone-400">
              โปรดคลิ๊กกล่องข้อความให้ตรงกับสิ่งอำนวยความสะดวกภายในที่พักของท่าน</p>
            <div class="max-w-3xl mx-auto">
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 border p-4 rounded-lg shadow-md bg-stone-50">
                <div v-for="roomHotel in roomHotel" :key="roomHotel._id"
                  class="flex items-center border p-3 space-x-2 rounded shadow bg-white">
                  <input type="checkbox" v-model="selectedRoomHotel" :value="roomHotel._id" />
                  <img :src="`http://localhost:9999/uploads/icons/${roomHotel.icon}`" alt="icon"
                    class="h-5 object-contain pl-2" />

                  <span class="text-gray-700">{{ roomHotel.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="border-2 my-6" />

        <div class="mt-5">
          <div class="mx-5">
            <p class="mb-2 text-indigo-700">3.4 ที่พักของท่านรองรับสัตว์เลี้ยงหรือไม่</p>
            <textarea v-model="AboutHotelFor" rows="3"
              class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
              placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
          </div>
          <div>
            <p class="text-center my-4 text-indigo-400">
              โปรดคลิ๊กกล่องข้อความให้ตรงกับการรองรับสัตว์เลี้ยงของที่พัก</p>
            <div class="max-w-3xl mx-auto">
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 border p-4 rounded-lg shadow-md bg-indigo-50">
                <div v-for="hotelFor in hotelFor" :key="hotelFor._id"
                  class="flex items-center border p-3 space-x-2 rounded shadow bg-white">
                  <input type="checkbox" v-model="selectedHotelFor" :value="hotelFor._id" />
                  <img :src="`http://localhost:9999/uploads/icons/${hotelFor.icon}`" alt="icon"
                    class="h-5 object-contain pl-2" />

                  <span class="text-gray-700">{{ hotelFor.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="border-2 my-6" />

        <div class="mt-5">
          <div class="mx-5">
            <p class="mb-2 text-amber-600">3.5 มื้ออาหาร</p>
            <textarea v-model="AboutFoodHotel" rows="3"
              class="border border-gray-300 px-3 py-2 rounded w-full resize-none"
              placeholder="พิมพ์รายละเอียดที่นี่..."></textarea>
          </div>
          <div>
            <p class="text-center my-4 text-amber-500">
              โปรดคลิ๊กกล่องข้อความให้ตรงกับการรับประทานอาหารของที่พัก</p>
            <div class="max-w-3xl mx-auto">
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 border p-4 rounded-lg shadow-md bg-amber-50">
                <div v-for="foodHotel in foodHotel" :key="foodHotel._id"
                  class="flex items-center border p-3 space-x-2 rounded shadow bg-white">
                  <input type="checkbox" v-model="selectedFoodHotel" :value="foodHotel._id" />
                  <img :src="`http://localhost:9999/uploads/icons/${foodHotel.icon}`" alt="icon"
                    class="h-5 object-contain pl-2" />

                  <span class="text-gray-700">{{ foodHotel.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="border-2 my-6" />



        <div class="mt-8">

        </div>



        <div class="flex justify-center mt-8 mb-6 space-x-3">
          <button @click="goToMainProfile" class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">ย้อนกลับ
          </button>
          <button @click="resetForm" class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500">รีเซต
          </button>
          <button @click="saveAboutHotel" class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">บันทึก
          </button>
        </div>
      </div>

    </template>
  </TemplatePartner>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import TemplatePartner from "@/components/TemplatePartner.vue";
import InputNumber from "@/components/element/InputNumber.vue";
import axios from 'axios'

const { t } = useI18n()
const router = useRouter()


const hasExtraBed = ref(null)
const extraBed = ref({ child: '', normal: '' })
const hasExtraCashPledge = ref(null)

// Add form data variables
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

// Add variables to track if data exists
const existingAboutHotelId = ref(null)
const isDataExists = ref(false)

const facilities = ref([])
const hotelLocation = ref([])
const roomHotel = ref([])
const hotelFor = ref([])
const foodHotel = ref([])

const selectedFacilities = ref([])
const selectedHotelLocation = ref([])
const selectedRoomHotel = ref([])
const selectedHotelFor = ref([])
const selectedFoodHotel = ref([])


function goToMainProfile() {
  router.push("/mainprofile")
}



// Load dropdown data
async function fetchFacilities() {
  try {
    const res = await axios.get('http://localhost:9999/HotelSleepGun/typeFacilityHotel/getAll')
    facilities.value = res.data
  } catch (e) {
    console.error('fetchFacilities error', e)
  }
}

async function fetchHotelLocation() {
  try {
    const res = await axios.get('http://localhost:9999/HotelSleepGun/typeHotelLocation/getAll')
    hotelLocation.value = res.data
  } catch (e) {
    console.error('fetchHotelLocation error', e)
  }
}

async function fetchRoomHotel() {
  try {
    const res = await axios.get('http://localhost:9999/HotelSleepGun/typeRoomHotel/getAll')
    roomHotel.value = res.data
  } catch (e) {
    console.error('fetchRoomHotel error', e)
  }
}

async function fetchHotelFor() {
  try {
    const res = await axios.get('http://localhost:9999/HotelSleepGun/typeHotelFor/getAll')
    hotelFor.value = res.data
  } catch (e) {
    console.error('fetchHotelFor error', e)
  }
}

async function fetchFoodHotel() {
  try {
    const res = await axios.get('http://localhost:9999/HotelSleepGun/typeFoodHotel/getAll')
    foodHotel.value = res.data
  } catch (e) {
    console.error('fetchFoodHotel error', e)
  }
}

// Load existing about hotel data
async function loadExistingAboutHotel() {
  try {
    // You might need to get the partner ID from auth store or route params
    const partnerId = localStorage.getItem('partnerId') // Adjust based on your auth system
    console.log('Partner ID:', partnerId) // Debug log

    if (partnerId) {
      const res = await axios.get(`http://localhost:9999/HotelSleepGun/aboutHotel/getByPartnerId/${partnerId}`)
      console.log('API Response:', res.data) // Debug log

      if (res.data) {
        const existingData = res.data
        console.log('Loaded existing data:', existingData) // Debug log
        existingAboutHotelId.value = existingData._id
        isDataExists.value = true

        // Populate form with existing data
        hasExtraBed.value = existingData.hasExtraBed
        extraBed.value = existingData.typeBedPrice || { child: '', normal: '' }
        checkInForm.value = existingData.checkInForm || ''
        checkInTo.value = existingData.checkInTo || ''
        checkOutForm.value = existingData.checkOutForm || ''
        checkOutTo.value = existingData.checkOutTo || ''
        VerifyIden_checkIn.value = existingData.VerifyIden_checkIn || ''
        AboutFacilityHotel.value = existingData.AboutFacilityHotel || ''
        AboutHotelLocation.value = existingData.AboutHotelLocation || ''
        AboutRoomHotel.value = existingData.AboutRoomHotel || ''
        AboutHotelFor.value = existingData.AboutHotelFor || ''
        AboutFoodHotel.value = existingData.AboutFoodHotel || ''

        console.log('Populated form data:', {
          checkInForm: checkInForm.value,
          checkInTo: checkInTo.value,
          checkOutForm: checkOutForm.value,
          checkOutTo: checkOutTo.value,
          hasExtraBed: hasExtraBed.value
        }) // Debug log

        // Populate selected items - handle arrays
        selectedFacilities.value = existingData.typeFacilityHotel ?
          existingData.typeFacilityHotel.map(item => item._id || item) : []
        selectedHotelLocation.value = existingData.typeHotelLocation ?
          existingData.typeHotelLocation.map(item => item._id || item) : []
        selectedRoomHotel.value = existingData.typeRoomHotel ?
          existingData.typeRoomHotel.map(item => item._id || item) : []
        selectedHotelFor.value = existingData.typeHotelFor ?
          existingData.typeHotelFor.map(item => item._id || item) : []
        selectedFoodHotel.value = existingData.typeFoodHotel ?
          existingData.typeFoodHotel.map(item => item._id || item) : []
      } else {
        console.log('No existing data found for partner:', partnerId)
      }
    } else {
      console.log('No partner ID found in localStorage')
    }
  } catch (e) {
    console.error('loadExistingAboutHotel error', e)
  }
}

// Save about hotel data
async function saveAboutHotel() {
  try {
    const partnerId = localStorage.getItem('partnerId') // Adjust based on your auth system

    const aboutHotelData = {
      partnerId: partnerId,
      hasExtraBed: hasExtraBed.value,
      typeBedPrice: extraBed.value,
      checkInForm: checkInForm.value,
      checkInTo: checkInTo.value,
      checkOutForm: checkOutForm.value,
      checkOutTo: checkOutTo.value,
      VerifyIden_checkIn: VerifyIden_checkIn.value,
      AboutFacilityHotel: AboutFacilityHotel.value,
      AboutHotelLocation: AboutHotelLocation.value,
      AboutRoomHotel: AboutRoomHotel.value,
      AboutHotelFor: AboutHotelFor.value,
      AboutFoodHotel: AboutFoodHotel.value,
      typeFacilityHotel: selectedFacilities.value.length > 0 ? selectedFacilities.value : [],
      typeHotelLocation: selectedHotelLocation.value.length > 0 ? selectedHotelLocation.value : [],
      typeRoomHotel: selectedRoomHotel.value.length > 0 ? selectedRoomHotel.value : [],
      typeHotelFor: selectedHotelFor.value.length > 0 ? selectedHotelFor.value : [],
      typeFoodHotel: selectedFoodHotel.value.length > 0 ? selectedFoodHotel.value : [],
    }

    console.log('Saving about hotel data:', aboutHotelData) // Debug log

    let response
    if (isDataExists.value && existingAboutHotelId.value) {
      // Update existing data
      response = await axios.put(`http://localhost:9999/HotelSleepGun/aboutHotel/update/${existingAboutHotelId.value}`, aboutHotelData)
      console.log('Updated about hotel:', response.data)
    } else {
      // Create new data
      response = await axios.post('http://localhost:9999/HotelSleepGun/aboutHotel/creat', aboutHotelData)
      console.log('Created about hotel:', response.data)
      existingAboutHotelId.value = response.data._id
      isDataExists.value = true
    }

    alert('บันทึกข้อมูลสำเร็จ')
    router.push("/detailhotel")
  } catch (e) {
    console.error('saveAboutHotel error', e)
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
}

// Reset form
function resetForm() {
  hasExtraBed.value = null
  extraBed.value = { child: '', normal: '' }
  checkInForm.value = ''
  checkInTo.value = ''
  checkOutForm.value = ''
  checkOutTo.value = ''
  VerifyIden_checkIn.value = ''
  AboutFacilityHotel.value = ''
  AboutHotelLocation.value = ''
  AboutRoomHotel.value = ''
  AboutHotelFor.value = ''
  AboutFoodHotel.value = ''
  selectedFacilities.value = []
  selectedHotelLocation.value = []
  selectedRoomHotel.value = []
  selectedHotelFor.value = []
  selectedFoodHotel.value = []
}


onMounted(async () => {
  await fetchFacilities()
  await fetchHotelLocation()
  await fetchRoomHotel()
  await fetchHotelFor()
  await fetchFoodHotel()
  await loadExistingAboutHotel()
})

</script>



<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>