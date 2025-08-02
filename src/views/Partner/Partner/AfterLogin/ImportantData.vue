<!-- <template>
  <div class="flex justify-center mt-32 space-x-12">
    <button @click="handleNavigation('partner')" class="bg-green-300">partner</button>
    <button @click="handleNavigation('employee')" class="bg-orange-300">employee</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const router = useRouter()
const partnerId = localStorage.getItem('partnerId')
const aboutHotelId = ref(localStorage.getItem('aboutHotelId'))
const form = ref({ /* ...fields... */ })

const handleNavigation = async (type) => {
  try {
    const res = await axios.get(`http://localhost:9999/HotelSleepGun/partner/get/${partnerId}`)
    const partner = res.data

    console.log('📦 partner data:', partner)  // 👉 log ข้อมูลทั้งหมด
    console.log('✅ isProfileComplete:', partner.isProfileComplete)  // 👉 log ค่านี้โดยตรง

    if (!partner.isProfileComplete) {
      console.log('⛔ ไม่ครบข้อมูล ไปหน้า mainprofileAfterLogin')
      router.push('/mainprofileAfterLogin')
      return
    }

    // ➤ กรอกครบแล้ว ไปตาม role
    if (type === 'partner') {
      console.log('➡ ไปหน้า detailhotel')
      router.push('/detailhotel')
    } else if (type === 'employee') {
      console.log('➡ ไปหน้า waitforapprove')
      router.push('/waitforapprove')
    }
  } catch (err) {
    console.error('❌ ไม่สามารถตรวจสอบข้อมูลพาร์ทเนอร์ได้:', err)
  }
}

onMounted(async () => {
          const token = localStorage.getItem('token')
        if (aboutHotelId.value && token) {
          // ดึงข้อมูลมาแสดง
          const res = await axios.get(`http://localhost:9999/HotelSleepGun/pos/about-hotel`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (res.data.success && res.data.data) {
            Object.assign(form.value, res.data.data)
          }
        }
        // else: ฟอร์มว่าง
})

async function saveAboutHotel() {
          const token = localStorage.getItem('token')
        if (!aboutHotelId.value) {
          // CREATE
          const res = await axios.post('http://localhost:9999/HotelSleepGun/pos/about-hotel', form.value, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (res.data.success && res.data.data) {
            localStorage.setItem('aboutHotelId', res.data.data._id)
            aboutHotelId.value = res.data.data._id
            alert('สร้างข้อมูลสำเร็จ')
          }
        } else {
          // UPDATE
          const res = await axios.put(`http://localhost:9999/HotelSleepGun/pos/about-hotel/${aboutHotelId.value}`, form.value, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (res.data.success) {
            alert('อัปเดตข้อมูลสำเร็จ')
          }
        }
}
</script> -->

<template>
  <div class="bg-profileafterlogin min-h-full w-full relative">
    <div class="fixed inset-0 backdrop-blur-md z-[1]"></div>
    <div class="relative z-[2] w-full md:rounded-lg md:px-4 min-h-screen pb-8">
      <p class="text-xs pt-2 text-stone-500">ขอบคุณที่เป็นพาร์ทเนอร์กับเรา || SLEEP GUN</p>
      <div class="mb-10 pt-8">
        <div class="text-center">
          <h2
            class="inline-block text-2xl md:text-3xl font-semibold text-gray-800 bg-white/80 px-6 py-3 rounded-xl shadow-md backdrop-blur-sm">
            โปรดกรอกข้อมูลบริษัท และตรวจสอบความถูกต้องก่อนดำเนินการ
          </h2>
        </div>
      </div>

      <div class="relative z-[2] flex bg-white flex-col max-w-5xl mx-auto border px-4 rounded-lg shadow-sm pb-8">
        <div class="max-w-xl mx-auto w-full mt-6">
          <div class="flex mb-3">
            <p class="md:w-1/5 mb-1">โลโก้บริษัท</p>

            <div
              class="relative  mx-auto w-40 h-40 border-2 border-dashed rounded-md bg-white flex items-center overflow-hidden group">

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

          <div class="flex space-x-2 mt-2">
            <p class="w-1/3">ชื่อบริษัท </p>
            <input v-model="companyName" class="border w-full py-2 px-3 rounded-md mb-4" />
          </div>
          <div class="flex space-x-2 mt-2">
            <p class="w-1/3">เบอร์โทร </p>
            <input v-model="companyPhone" class="border w-full py-1 px-3 rounded-md" />
          </div>
          <div class="flex space-x-2 mt-2">
            <p class="w-1/3">อีเมล </p>
            <input v-model="companyEmail" class="border w-full py-1 px-3 rounded-md" />
          </div>
        </div>

        <hr class="border-2 mt-8" />

        <div class="max-w-xl mx-auto w-full my-8">
          <p class="font-bold">โปรดระวังข้อมูลในกรอบสีเเดงนี้ เมื่อทำการบันทึกเเล้วไม่สามารถเเก้ไขได้<span
              class="text-red-600 px-2">*</span></p>
          <div class="border-3 border-red-600 px-4 py-5 rounded-lg mt-3">
            <div class="flex space-x-2 mt-2">
              <p class="w-1/2">เลขประจำตัวผู้เสียภาษี </p>
              <input v-model="companyTaxId" class="border border-stone-400 w-full py-1 px-3 rounded-md" />
            </div>
            <div class="flex space-x-2 mt-2">
              <p class="w-1/2">เลขบัญชีธนาคาร </p>
              <input v-model="bankNumber" class="border border-stone-400 w-full py-1 px-3 rounded-md" />
            </div>
            <div class="flex space-x-2 mt-2">
              <p class="w-1/2">ชื่อธนาคารที่ทำการเปิดบัญชี </p>
              <input v-model="bankName" class="border border-stone-400 w-full py-1 px-3 rounded-md" />
            </div>
            <div class="flex mb-3 mt-4">
              <p class="md:w-1/3 mb-1">รูปหน้าปกบัญชีธนาคาร</p>
              <div
                class="relative md:mx-5 mx-8 w-40 h-40 border-stone-400 border-2 border-dashed rounded-md bg-white flex items-center overflow-hidden group">

                <button type="button"
                  class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm z-10 hover:bg-black/10"
                  v-if="!bankPreview" @click="bankInputRef?.click()">
                  + อัปโหลดรูปหน้าปกบัญชีธนาคาร
                </button>

                <input type="file" accept="image/*" class="hidden" @change="onBankChange" ref="bankInputRef" />

                <div v-if="bankPreview" class="absolute inset-0 z-0">
                  <img :src="bankPreview" class="w-full h-full object-cover" />


                  <button @click.prevent.stop="removeBank"
                    class="absolute top-1 right-1 bg-red-700 hover:bg-red-600  bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center z-20">
                    &times;
                  </button>
                </div>
              </div>
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
              <input v-model="nameSignature" type="text" class="w-full border p-2 rounded" />
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

        <hr class="border-2 mt-8" />

        <div class="md:flex md:justify-between gap-3">
          <div class="max-w-2xl mx-auto mt-6 w-full">
            <div class="px-4 py-3">
              <p class="text-center font-bold mb-5 text-2xl text-stone-500">ที่อยู่บริษัท<span
                  class="text-red-600 px-2">*</span></p>
              <div class="flex space-x-2">
                <p class="w-1/3">เลขที่ </p>
                <input v-model="companyAddress" class="border w-full py-1 px-3 rounded-md" />
              </div>

              <div class="flex space-x-2 mt-2">
                <p class="w-1/3">ตำบล </p>
                <input v-model="companySubdistrict" class="border w-full py-1 px-3 rounded-md" />
              </div>

              <div class="flex space-x-2 mt-2">
                <p class="w-1/3">อำเภอ </p>
                <input v-model="companyDistrict" class="border w-full py-1 px-3 rounded-md" />
              </div>

              <div class="flex space-x-2 mt-2">
                <p class="w-1/3">จังหวัด </p>
                <input v-model="companyProvince" class="border w-full py-1 px-3 rounded-md" />
              </div>
              <div class="flex space-x-2 mt-2">
                <p class="w-1/3">รหัสไปรษณีย์ </p>
                <input v-model="companyPostcode" class="border w-full py-1 px-3 rounded-md" />
              </div>

            </div>
          </div>

          <div class="max-w-2xl mx-auto mt-6 w-full border rounded-lg shadow-md">
            <div class="px-4 py-3">
              <p>เดี๋ยวกลับมาใส่ map</p>
              <p>ละติจูด</p>
              <input v-model="hotelLatitude" class="border" />
              <p>ลองติจูด</p>
              <input v-model="hotelLongitude" class="border" />
            </div>
          </div>
        </div>

        <hr class="border-2 mt-8" />

        <div class="max-w-2xl mx-auto mt-6 w-full">
          <div class="px-4 py-3">
            <p class="text-center font-bold mb-5 text-2xl text-stone-500">ที่อยู่ส่วนบุคคล<span
                class="text-red-600 px-2">*</span></p>
            <div class="flex space-x-2">
              <p class="w-1/3">เลขที่ </p>
              <input v-model="address" class="border w-full py-1 px-3 rounded-md" />
            </div>

            <div class="flex space-x-2 mt-2">
              <p class="w-1/3">ตำบล </p>
              <input v-model="subdistrict" class="border w-full py-1 px-3 rounded-md" />
            </div>

            <div class="flex space-x-2 mt-2">
              <p class="w-1/3">อำเภอ </p>
              <input v-model="district" class="border w-full py-1 px-3 rounded-md" />
            </div>

            <div class="flex space-x-2 mt-2">
              <p class="w-1/3">จังหวัด </p>
              <input v-model="province" class="border w-full py-1 px-3 rounded-md" />
            </div>
            <div class="flex space-x-2 mt-2">
              <p class="w-1/3">รหัสไปรษณีย์ </p>
              <input v-model="postcode" class="border w-full py-1 px-3 rounded-md" />
            </div>

            <div class="flex space-x-2 mt-6">
              <p class="w-1/3">เบอร์โทร </p>
              <input v-model="email" class="border w-full py-1 px-3 rounded-md" />
            </div>
            <div class="flex space-x-2 mt-2">
              <p class="w-1/3">อีเมล </p>
              <input v-model="phone" class="border w-full py-1 px-3 rounded-md" />
            </div>
          </div>
        </div>


        <div class="flex justify-center mt-8 space-x-4">
          <button @click="navigateBackToMainProfileCompany"
            class="bg-red-600 hover:bg-red-500 py-2 transition  px-4 text-white font-bold rounded-lg">ย้อนกลับ</button>
          <button
            class="bg-stone-500 hover:bg-stone-400 py-2 transition  px-4 text-white font-bold rounded-lg">รีเซ็ท</button>
          <button @click="handleSubmit"
            class="bg-green-600 hover:bg-green-500 py-2 transition  px-4 text-white font-bold rounded-lg">บันทึก</button>
        </div>

        <div>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

// เตรียม ref สำหรับข้อมูล
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

// โหลดข้อมูลจาก backend
onMounted(async () => {
  const partnerId = localStorage.getItem('partnerId')
  if (!partnerId) return

  try {
    const res = await axios.get(`http://localhost:9999/HotelSleepGun/partner/get/${partnerId}`)
    const data = res.data

    console.log("ข้อมูลที่โหลด:", data)

    companyName.value = data.companyName
    companyPhone.value = data.companyPhone
    companyEmail.value = data.companyEmail
    companyTaxId.value = data.companyTaxId
    bankNumber.value = data.bankNumber
    bankName.value = data.bankName
    nameSignature.value = data.nameSignature
    companyAddress.value = data.companyAddress
    companySubdistrict.value = data.companySubdistrict
    companyDistrict.value = data.companyDistrict
    companyProvince.value = data.companyProvince
    companyPostcode.value = data.companyPostcode
    hotelLatitude.value = data.hotelLatitude
    hotelLongitude.value = data.hotelLongitude
    address.value = data.address
    subdistrict.value = data.subdistrict
    district.value = data.district
    province.value = data.province
    postcode.value = data.postcode
    email.value = data.email
    phone.value = data.phone

    logoPreview.value = data.imageLogoCompany
    signaturePreview.value = data.imageSignature
    bankPreview.value = data.imageBank

  } catch (error) {
    console.error("โหลดข้อมูล partner ไม่สำเร็จ", error)
  }
})

async function handleSubmit() {
  try {
    const formData = new FormData();
    formData.append("companyEmail", companyEmail.value || '');
    formData.append("companyPhone", companyPhone.value || '');
    formData.append("nameSignature", nameSignature.value || '');
    formData.append("bankName", bankName.value || '');
    formData.append("bankNumber", bankNumber.value || '');
    formData.append("companyTaxId", companyTaxId.value || '');
    formData.append("isProfileComplete", 'true');

    if (logoFile.value) {
      formData.append("imageLogoCompany", logoFile.value);
    }
    if (signatureFile.value) {
      formData.append("imageSignature", signatureFile.value);
    }
    if (bankFile.value) {
      formData.append("imageBank", bankFile.value);
    }

    const partnerId = localStorage.getItem('partnerId');
    if (!partnerId) {
      Swal.fire({
        icon: 'error',
        title: 'ไม่พบข้อมูล',
        text: 'ไม่พบรหัสผู้ใช้ในระบบ',
      });
      return;
    }

    const res = await axios.put(
      `http://localhost:9999/HotelSleepGun/partner/updateAfterLogin/${partnerId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (res.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'สำเร็จ',
        text: 'บันทึกข้อมูลเรียบร้อยแล้ว!',
        confirmButtonColor: '#16a34a',
      }).then(() => {
        router.push('/logincompany');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'ผิดพลาด',
        text: 'ไม่สามารถบันทึกข้อมูลได้',
      });
    }

  } catch (err) {
    console.error("อัปเดตผิดพลาด", err);
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้',
    });
  }
}



function navigateBackToMainProfileCompany() {
  router.push('/mainprofileafterlogin')
}

function onLogoChange(event) {
  const file = event.target.files[0]
  if (file) {
    logoFile.value = file
    logoPreview.value = URL.createObjectURL(file)
  }
}

function removeLogo() {
  logoFile.value = null
  logoPreview.value = null
  if (logoInputRef.value) {
    logoInputRef.value.value = ''
  }
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
  signaturePreview.value = null
  if (signatureInputRef.value) {
    signatureInputRef.value.value = ''
  }
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
  bankPreview.value = null
  if (bankInputRef.value) {
    bankInputRef.value.value = ''
  }
}
</script>
<style>
.bg-profileafterlogin {
  /* background: url('/public/images/hotel-room/Hotel-yellow.png'); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>