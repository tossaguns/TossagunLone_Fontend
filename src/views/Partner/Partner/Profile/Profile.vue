<template>
  <TemplatePartner>
    <template #header>
      <label>โปรไฟล์บริษัท</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">

        <div class="mt-2 py-2 px-4 ">
          <div class="relative max-w-5xl mx-auto w-full mt-6">
            <div class="bg-white border rounded-md shadow-md min-h-full px-3 pt-8 pb-8">
              <div class="md:flex md:justify-between mt-4">
                <div class="md:w-1/2 flex justify-center">
                  <div
                    class="relative w-52 h-52 border-2 border-dashed rounded-md bg-white flex items-center overflow-hidden group">
                    <img v-if="logoPreview" :src="logoPreview" class="w-full h-full object-cover" />
                    <div v-else class="flex items-center justify-center w-full h-full text-gray-400">
                      ไม่มีโลโก้</div>
                  </div>
                </div>
                <div class="lg:w-1/2 md:mt-3 mt-5">
                  <div class="flex space-x-2 mt-2">
                    <p class="w-1/3">ชื่อบริษัท </p>
                    <input class="border w-full py-1 px-3 rounded-md" v-model="companyName" readonly />
                  </div>
                  <div class="flex space-x-2 mt-2">
                    <p class="w-1/3">เบอร์โทร </p>
                    <input class="border w-full py-1 px-3 rounded-md" v-model="companyPhone" readonly />
                  </div>
                  <div class="flex space-x-2 mt-2">
                    <p class="w-1/3">อีเมล </p>
                    <input class="border w-full py-1 px-3 rounded-md" v-model="companyEmail" readonly />
                  </div>
                </div>
              </div>
              <hr class="border mt-6" />
              <div class="md:flex md:justify-between gap-3">
                <div class="max-w-2xl mx-auto mt-6 w-full">
                  <div class="px-4 py-3">
                    <p class="text-center font-bold mb-5 text-2xl text-stone-500">ที่อยู่บริษัท</p>
                    <div class="flex space-x-2">
                      <p class="w-1/3">เลขที่ </p>
                      <input class="border w-full py-1 px-3 rounded-md" v-model="companyAddress" readonly />
                    </div>
                    <div class="flex space-x-2 mt-2">
                      <p class="w-1/3">ตำบล </p>
                      <input class="border w-full py-1 px-3 rounded-md" v-model="companySubdistrict" readonly />
                    </div>
                    <div class="flex space-x-2 mt-2">
                      <p class="w-1/3">อำเภอ </p>
                      <input class="border w-full py-1 px-3 rounded-md" v-model="companyDistrict" readonly />
                    </div>
                    <div class="flex space-x-2 mt-2">
                      <p class="w-1/3">จังหวัด </p>
                      <input class="border w-full py-1 px-3 rounded-md" v-model="companyProvince" readonly />
                    </div>
                    <div class="flex space-x-2 mt-2">
                      <p class="w-1/3">รหัสไปรษณีย์ </p>
                      <input class="border w-full py-1 px-3 rounded-md" v-model="companyPostcode" readonly />
                    </div>
                  </div>
                </div>
                <div class="max-w-2xl mx-auto mt-6 w-full border rounded-lg shadow-md">
                  <div class="px-4 py-3">
                    <p>ละติจูด</p>
                    <input class="border" v-model="hotelLatitude" readonly />
                    <p>ลองติจูด</p>
                    <input class="border" v-model="hotelLongitude" readonly />
                  </div>
                </div>
              </div>
              <div class="bg-yellow-400 shadow-xl rounded-lg p-4 mt-6 w-full space-y-4 ">
                <div class="flex space-x-2 justify-center">
                  <p class="font-semibold">ชื่อเเละลายเซ็นสำหรับอนุมัติใบเสร็จหรือเอกสารอื่นๆ</p>
                </div>
                <div class="max-w-2xl mx-auto py-3 px-2">
                  <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                    <p class="md:w-1/3 mb-1">ชื่อ-นามสกุล</p>
                    <input type="text" class="w-full border p-2 rounded" v-model="nameSignature" readonly />
                  </div>
                  <div class="flex flex-col md:flex-row md:items-center md:gap-4 mt-4 ">
                    <p class="mb-1">ลายเซ็น</p>
                    <div
                      class="relative w-40 h-40 border-2 border-dashed rounded-md bg-white flex items-center justify-center overflow-hidden group">
                      <img v-if="signaturePreview" :src="signaturePreview" class="w-full h-full object-cover" />
                      <div v-else class="flex items-center justify-center w-full h-full text-gray-400">
                        ไม่มีลายเซ็น</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="max-w-xl mx-auto w-full my-8">
                <div class="flex space-x-2 mt-2">
                  <p class="w-1/3">เลขประจำตัวผู้เสียภาษี </p>
                  <input class="border w-full py-1 px-3 rounded-md" v-model="companyTaxId" readonly />
                </div>
                <div class="flex space-x-2 mt-2">
                  <p class="w-1/3">เลขบัญชีธนาคาร </p>
                  <input class="border w-full py-1 px-3 rounded-md" v-model="bankNumber" readonly />
                </div>
                <div class="flex space-x-2 mt-2">
                  <p class="w-1/3">ชื่อธนาคารที่ทำการเปิดบัญชี </p>
                  <input class="border w-full py-1 px-3 rounded-md" v-model="bankName" readonly />
                </div>
                <div class="flex mb-3 mt-4">
                  <p class="md:w-1/5 mb-1">รูปหน้าปกบัญชีธนาคาร</p>
                  <img v-if="bankPreview" :src="bankPreview" class="w-32 h-32 object-cover border" />
                  <div v-else class="flex items-center justify-center w-32 h-32 text-gray-400 border">
                    ไม่มีรูป</div>
                </div>
              </div>
              <div class="flex justify-center mt-14 space-x-4">
                <button @click="goToMainProfile"
                  class="bg-red-600 hover:bg-red-500 py-2 transition px-4 text-white font-bold rounded-lg">ย้อนกลับ</button>
                <button @click="goToEditProfileCompany"
                  class="bg-green-600 hover:bg-green-500 py-2 transition px-4 text-white font-bold rounded-lg">แก้ไข</button>
              </div>
            </div>
          </div>
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
import axios from 'axios'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()


function goToEditProfileCompany() {
  router.push('/editprofile')
}

function goToMainProfile() {
  router.push('/mainprofile')
}


const companyName = ref('')
const companyPhone = ref('')
const companyEmail = ref('')
const companyTaxId = ref('')
const bankNumber = ref('')
const bankName = ref('')
const nameSignature = ref('')
const companyAddress = ref('')
const companySubdistrict = ref('')
const companyDistrict = ref('')
const companyProvince = ref('')
const companyPostcode = ref('')
const hotelLatitude = ref('')
const hotelLongitude = ref('')
const signaturePreview = ref(null)
const logoPreview = ref(null)
const bankPreview = ref(null)

// ดึงข้อมูล partner จาก backend
async function fetchPartnerData() {
  const partnerId = localStorage.getItem('partnerId')
  if (!partnerId) return
  try {
    // เชื่อมต่อ endpoint /partner/get/:id
    const res = await axios.get(`http://localhost:9999/HotelSleepGun/partner/get/${partnerId}`)
    const data = res.data
    companyName.value = data.companyName || ''
    companyPhone.value = data.companyPhone || ''
    companyEmail.value = data.companyEmail || ''
    companyTaxId.value = data.companyTaxId || ''
    bankNumber.value = data.bankNumber || ''
    bankName.value = data.bankName || ''
    nameSignature.value = data.nameSignature || ''
    companyAddress.value = data.companyAddress || ''
    companySubdistrict.value = data.companySubdistrict || ''
    companyDistrict.value = data.companyDistrict || ''
    companyProvince.value = data.companyProvince || ''
    companyPostcode.value = data.companyPostcode || ''
    hotelLatitude.value = data.hotelLatitude || ''
    hotelLongitude.value = data.hotelLongitude || ''
    logoPreview.value = data.imageLogoCompany ? `http://localhost:9999/uploads/partners/${data.imageLogoCompany}` : null
    signaturePreview.value = data.imageSignature ? `http://localhost:9999/uploads/partners/${data.imageSignature}` : null
    bankPreview.value = data.imageBank ? `http://localhost:9999/uploads/partners/${data.imageBank}` : null
  } catch (error) {
    console.error('โหลดข้อมูล partner ไม่สำเร็จ', error)
  }
}

onMounted(() => {

  fetchPartnerData()
})

// เพิ่ม watch เพื่อโหลดข้อมูลใหม่ทุกครั้งที่ route เปลี่ยน
watch(() => route.fullPath, () => {
  fetchPartnerData()
})

</script>
