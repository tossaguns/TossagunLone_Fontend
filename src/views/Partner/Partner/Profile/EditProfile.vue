<template>
  <TemplatePartner>
    <template #header>
      <label>โปรไฟล์บริษัท</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div class="mt-2 py-2 px-4 ">

          <div class="relative max-w-5xl mx-auto w-full mt-6">
            <!--<div class="bg-stone-400 h-8 rounded-t-md"></div>-->

            <div class="bg-white border rounded-md shadow-md min-h-full px-3 pt-8 pb-8">

              <div class="md:flex md:justify-between mt-4">
                <!-- ✅ คอลัมน์แรก: จัดให้อยู่กลางแนวตั้ง -->
                <div class="md:w-1/2 flex justify-center">
                  <div
                    class="relative w-52 h-52 border-2 border-dashed rounded-md bg-white flex items-center overflow-hidden group">
                    <button type="button"
                      class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm z-10 hover:bg-black/10"
                      v-if="!logoPreview" @click="logoInputRef?.click()">
                      + อัปโหลดรูปโลโก้บริษัท
                    </button>

                    <input type="file" accept="image/*" class="hidden" @change="onLogoChange" ref="logoInputRef" />

                    <div v-if="logoPreview" class="absolute inset-0 z-0">
                      <img :src="logoPreview" class="w-full h-full object-cover" />
                      <button @click.prevent.stop="removeLogo"
                        class="absolute top-1 right-1 bg-red-700 hover:bg-red-600 bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center z-20">
                        &times;
                      </button>
                    </div>
                  </div>
                </div>

                <!-- ✅ คอลัมน์ที่สอง -->
                <div class="lg:w-1/2 md:mt-3 mt-5">
                  <div class="flex space-x-2 mt-2">
                    <p class="w-1/3">ชื่อบริษัท </p>
                    <input class="border w-full py-1 px-3 rounded-md " v-model="companyName" />
                  </div>
                  <div class="flex space-x-2 mt-2">
                    <p class="w-1/3">เบอร์โทร </p>
                    <input class="border w-full py-1 px-3 rounded-md" v-model="companyPhone" />
                  </div>
                  <div class="flex space-x-2 mt-2">
                    <p class="w-1/3">อีเมล </p>
                    <input class="border w-full py-1 px-3 rounded-md" v-model="companyEmail" />
                  </div>
                </div>
              </div>

              <hr class="border mt-6" />

              <div class="md:flex md:justify-between gap-3">
                <div class="max-w-2xl mx-auto mt-6 w-full">
                  <div class="px-4 py-3">
                    <p class="text-center font-bold mb-5 text-2xl text-stone-500">ที่อยู่บริษัท<span
                        class="text-red-600 px-2">*</span></p>
                    <div class="flex space-x-2">
                      <p class="w-1/3">เลขที่ </p>
                      <input class="border w-full py-1 px-3 rounded-md" v-model="companyAddress" />
                    </div>

                    <div class="flex space-x-2 mt-2">
                      <p class="w-1/3">ตำบล </p>
                      <input class="border w-full py-1 px-3 rounded-md" v-model="companySubdistrict" />
                    </div>

                    <div class="flex space-x-2 mt-2">
                      <p class="w-1/3">อำเภอ </p>
                      <input class="border w-full py-1 px-3 rounded-md" v-model="companyDistrict" />
                    </div>

                    <div class="flex space-x-2 mt-2">
                      <p class="w-1/3">จังหวัด </p>
                      <input class="border w-full py-1 px-3 rounded-md" v-model="companyProvince" />
                    </div>
                    <div class="flex space-x-2 mt-2">
                      <p class="w-1/3">รหัสไปรษณีย์ </p>
                      <input class="border w-full py-1 px-3 rounded-md" v-model="companyPostcode" />
                    </div>

                  </div>
                </div>

                <div class="max-w-2xl mx-auto mt-6 w-full border rounded-lg shadow-md">
                  <div class="px-4 py-3">
                    <p>เดี๋ยวกลับมาใส่ map</p>
                    <p>ละติจูด</p>
                    <input class="border" v-model="hotelLatitude" />
                    <p>ลองติจูด</p>
                    <input class="border" v-model="hotelLongitude" />
                  </div>
                </div>
              </div>

              <div class="bg-yellow-400 shadow-xl rounded-lg p-4 mt-6 w-full space-y-4 ">
                <div class="flex space-x-2 justify-center">
                  <p class="font-semibold">เพิ่มชื่อเเละลายเซ็นสำหรับอนุมัติใบเสร็จหรือเอกสารอื่นๆ
                  </p>
                  <p class="text-red-700">**</p>
                </div>

                <div class="max-w-2xl mx-auto py-3 px-2">
                  <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                    <p class="md:w-1/3 mb-1">ชื่อ-นามสกุล</p>
                    <input type="text" class="w-full border p-2 rounded" v-model="nameSignature" />
                  </div>

                  <div class="flex flex-col md:flex-row md:items-center md:gap-4 mt-4 ">
                    <p class="mb-1">ลายเซ็น (ภาพพื้นหลังสีขาวหรือไม่มีพื้นหลังเท่านั้น)</p>

                    <div
                      class="relative w-40 h-40 border-2 border-dashed rounded-md bg-white flex items-center justify-center overflow-hidden group">

                      <button type="button"
                        class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm z-10 hover:bg-black/10"
                        v-if="!signaturePreview" @click="signatureInputRef?.click()">
                        + อัปโหลดรูปลายเซ็น
                      </button>

                      <input type="file" accept="image/*" class="hidden" @change="onSignatureChange"
                        ref="signatureInputRef" />


                      <div v-if="signaturePreview" class="absolute inset-0 z-0">
                        <img :src="signaturePreview" class="w-full h-full object-cover" />


                        <button @click.prevent.stop="removeSignature"
                          class="absolute top-1 right-1 bg-red-700 hover:bg-red-600 bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center z-20">
                          &times;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="max-w-xl mx-auto w-full my-8">
                <p class="text-sm font-bold text-red-600">ข้อมูลไม่สามารถเปลี่ยนเเปลงได้
                  หากต้องการเปลี่ยนกรุณาเเจ้งเจ้าหน้าที่ **</p>
                <div class="flex space-x-2 mt-2">
                  <p class="w-1/3">เลขประจำตัวผู้เสียภาษี </p>
                  <p>{{ companyTaxId }}</p>
                </div>
                <div class="flex space-x-2 mt-2">
                  <p class="w-1/3">เลขบัญชีธนาคาร </p>
                  <p>{{ bankNumber }}</p>
                </div>
                <div class="flex space-x-2 mt-2">
                  <p class="w-1/3">ชื่อธนาคารที่ทำการเปิดบัญชี </p>
                  <p>{{ bankName }}</p>
                </div>
                <div class="flex mb-3 mt-4">
                  <p class="md:w-1/5 mb-1">รูปหน้าปกบัญชีธนาคาร</p>
                  <img :src="bankPreview" class="w-32 h-32 object-cover border" />
                </div>
              </div>


              <div class="flex justify-center mt-14 space-x-4">
                <button @click="navigateBackToMainProfileCompany"
                  class="bg-red-600 hover:bg-red-500 py-2 transition  px-4 text-white font-bold rounded-lg">ย้อนกลับ</button>
                <button class="bg-stone-500 hover:bg-stone-400 py-2 transition  px-4 text-white font-bold rounded-lg"
                  @click="resetForm">รีเซ็ท</button>
                <button class="bg-green-600 hover:bg-green-500 py-2 transition  px-4 text-white font-bold rounded-lg"
                  @click="saveProfile">บันทึก</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </TemplatePartner>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import TemplatePartner from "@/components/TemplatePartner.vue";
import axios from 'axios'
import Swal from 'sweetalert2'

const { t } = useI18n()
const router = useRouter()

const employees = ref([])
const loading = ref(true)


function navigateBackToMainProfileCompany() {
  router.push('/profile')
}

// --- ข้อมูลฟอร์ม ---
const companyName = ref('')
const companyPhone = ref('')
const companyEmail = ref('')
const companyTaxId = ref('')
const bankNumber = ref('')
bankNumber.value = ''
const bankName = ref('')
const nameSignature = ref('')
const companyAddress = ref('')
const companySubdistrict = ref('')
const companyDistrict = ref('')
const companyProvince = ref('')
const companyPostcode = ref('')
const hotelLatitude = ref('')
const hotelLongitude = ref('')
const address = ref('')
const subdistrict = ref('')
const district = ref('')
const province = ref('')
const postcode = ref('')
const email = ref('')
const phone = ref('')

// Image preview
const logoFile = ref(null)
const logoPreview = ref(null)
const logoInputRef = ref(null)
const signatureFile = ref(null)
const signaturePreview = ref(null)
const signatureInputRef = ref(null)
const bankFile = ref(null)
const bankPreview = ref(null)
const bankInputRef = ref(null)

// เก็บข้อมูลตั้งต้นสำหรับรีเซ็ต
let initialData = {}

// โหลดข้อมูล partner
async function fetchPartnerData() {
  const partnerId = localStorage.getItem('partnerId')
  if (!partnerId) return
  try {
    const res = await axios.get(`http://localhost:9999/HotelSleepGun/partner/get/${partnerId}`)
    const data = res.data
    // เซ็ตค่าทุกช่อง
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
    address.value = data.address || ''
    subdistrict.value = data.subdistrict || ''
    district.value = data.district || ''
    province.value = data.province || ''
    postcode.value = data.postcode || ''
    email.value = data.email || ''
    phone.value = data.phone || ''
    logoPreview.value = data.imageLogoCompany ? `http://localhost:9999/uploads/partners/${data.imageLogoCompany}` : null
    signaturePreview.value = data.imageSignature ? `http://localhost:9999/uploads/partners/${data.imageSignature}` : null
    bankPreview.value = data.imageBank ? `http://localhost:9999/uploads/partners/${data.imageBank}` : null
    // เก็บข้อมูลตั้งต้นไว้สำหรับรีเซ็ต
    initialData = {
      companyName: companyName.value,
      companyPhone: companyPhone.value,
      companyEmail: companyEmail.value,
      companyTaxId: companyTaxId.value,
      bankNumber: bankNumber.value,
      bankName: bankName.value,
      nameSignature: nameSignature.value,
      companyAddress: companyAddress.value,
      companySubdistrict: companySubdistrict.value,
      companyDistrict: companyDistrict.value,
      companyProvince: companyProvince.value,
      companyPostcode: companyPostcode.value,
      hotelLatitude: hotelLatitude.value,
      hotelLongitude: hotelLongitude.value,
      address: address.value,
      subdistrict: subdistrict.value,
      district: district.value,
      province: province.value,
      postcode: postcode.value,
      email: email.value,
      phone: phone.value,
      logoPreview: logoPreview.value,
      signaturePreview: signaturePreview.value,
      bankPreview: bankPreview.value
    }
  } catch (error) {
    console.error('โหลดข้อมูล partner ไม่สำเร็จ', error)
  }
}

// รีเซ็ตข้อมูลกลับเป็นค่าที่โหลดจาก backend (initialData)
function resetForm() {
  Swal.fire({
    title: 'ยืนยันการรีเซ็ตข้อมูล?',
    text: 'คุณต้องการรีเซ็ตข้อมูลกลับเป็นค่าที่บันทึกไว้ล่าสุดใช่หรือไม่',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    if (!result.isConfirmed) return;
    companyName.value = initialData.companyName
    companyPhone.value = initialData.companyPhone
    companyEmail.value = initialData.companyEmail
    companyTaxId.value = initialData.companyTaxId
    bankNumber.value = initialData.bankNumber
    bankName.value = initialData.bankName
    nameSignature.value = initialData.nameSignature
    companyAddress.value = initialData.companyAddress
    companySubdistrict.value = initialData.companySubdistrict
    companyDistrict.value = initialData.companyDistrict
    companyProvince.value = initialData.companyProvince
    companyPostcode.value = initialData.companyPostcode
    hotelLatitude.value = initialData.hotelLatitude
    hotelLongitude.value = initialData.hotelLongitude
    address.value = initialData.address
    subdistrict.value = initialData.subdistrict
    district.value = initialData.district
    province.value = initialData.province
    postcode.value = initialData.postcode
    email.value = initialData.email
    phone.value = initialData.phone
    logoPreview.value = initialData.logoPreview
    signaturePreview.value = initialData.signaturePreview
    bankPreview.value = initialData.bankPreview
    logoFile.value = null
    signatureFile.value = null
    bankFile.value = null
    Swal.fire({
      icon: 'info',
      title: 'รีเซ็ตข้อมูลเรียบร้อย',
      showConfirmButton: false,
      timer: 1200
    })
  })
}

// อัปโหลดไฟล์
function onLogoChange(event) {
  const file = event.target.files[0]
  if (file) {
    logoFile.value = file
    logoPreview.value = URL.createObjectURL(file)
  }
}
function removeLogo() {
  logoFile.value = null
  logoPreview.value = initialData.logoPreview || null
  if (logoInputRef.value) logoInputRef.value.value = ''
}
function onSignatureChange(event) {
  const file = event.target.files[0]
  if (file) {
    signatureFile.value = file
    signaturePreview.value = URL.createObjectURL(file)
  }
}
function removeSignature() {
  signatureFile.value = null
  signaturePreview.value = initialData.signaturePreview || null
  if (signatureInputRef.value) signatureInputRef.value.value = ''
}
function onBankChange(event) {
  const file = event.target.files[0]
  if (file) {
    bankFile.value = file
    bankPreview.value = URL.createObjectURL(file)
  }
}
function removeBank() {
  bankFile.value = null
  bankPreview.value = initialData.bankPreview || null
  if (bankInputRef.value) bankInputRef.value.value = ''
}

// บันทึกข้อมูล (อัปเดต)
async function saveProfile() {
  const result = await Swal.fire({
    title: 'ยืนยันการบันทึกข้อมูล?',
    text: 'คุณต้องการบันทึกข้อมูลนี้ใช่หรือไม่',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก'
  })
  if (!result.isConfirmed) return;
  try {
    const formData = new FormData()
    formData.append('companyEmail', companyEmail.value || '')
    formData.append('companyPhone', companyPhone.value || '')
    formData.append('nameSignature', nameSignature.value || '')
    formData.append('bankName', bankName.value || '')
    formData.append('bankNumber', bankNumber.value || '')
    formData.append('companyTaxId', companyTaxId.value || '')
    formData.append('isProfileComplete', 'true')
    formData.append('companyAddress', companyAddress.value || '')
    formData.append('companySubdistrict', companySubdistrict.value || '')
    formData.append('companyDistrict', companyDistrict.value || '')
    formData.append('companyProvince', companyProvince.value || '')
    formData.append('companyPostcode', companyPostcode.value || '')
    formData.append('hotelLatitude', hotelLatitude.value || '')
    formData.append('hotelLongitude', hotelLongitude.value || '')
    if (logoFile.value) formData.append('imageLogoCompany', logoFile.value)
    if (signatureFile.value) formData.append('imageSignature', signatureFile.value)
    if (bankFile.value) formData.append('imageBank', bankFile.value)
    const partnerId = localStorage.getItem('partnerId')
    if (!partnerId) {
      Swal.fire({
        icon: 'error',
        title: 'ไม่พบข้อมูลผู้ใช้ กรุณา login ใหม่',
      })
      return
    }
    const res = await axios.put(
      `http://localhost:9999/HotelSleepGun/partner/updateAfterLogin/${partnerId}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'บันทึกข้อมูลเรียบร้อยแล้ว!',
        showConfirmButton: false,
        timer: 1500
      })
      router.push('/profile')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'ไม่สามารถบันทึกข้อมูลได้',
      })
    }
  } catch (err) {
    console.error('อัปเดตผิดพลาด', err)
    Swal.fire({
      icon: 'error',
      title: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้',
    })
  }
}

onMounted(() => {

  fetchPartnerData()
})

</script>
