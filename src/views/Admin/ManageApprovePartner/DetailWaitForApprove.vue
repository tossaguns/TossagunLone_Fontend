<template>
  <TemplateAdmin>
    <template #header>
      <label>จัดการคำขอสมัครพาร์ทเนอร์</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">

        <h2 class="text-xl font-bold mb-8 text-center">ข้อมูลบริษัท {{ companyName }}</h2>

        <div class="flex md:justify-end justify-center space-x-3 mr-4 mb-2 items-center">
          <p class="block text-sm text-stone-400">ลำดับ</p>
          <p class="text-xl bg-green-100 px-4 py-1 rounded-full shadow-md">{{ index }}</p>
        </div>



        <hr class="border-2 mb-6 " />


        <div class="mb-4">
          <div class="flex">
            <p class="font-bold">ประเภทที่พัก :</p>
            <p class="bg-rose-200 rounded-md shadow-lg ml-4">
              <template v-if="partner.hotelType && partner.hotelType.name">
                <p class=" px-4 py-1">{{ partner.hotelType.name }}</p>
              </template>
              <template v-else>
                <span class="text-red-500 bg-white px-4 py-2 rounded-md">ไม่มีข้อมูลประเภทที่พัก</span>
              </template>
            </p>
          </div>


          <div class="flex space-x-4 mt-5">
            <p class="font-bold">สถานะ :</p>
            <div :class="{
              'bg-green-500': status === 'approved',
              'bg-red-500': status === 'rejected',
              'bg-amber-500': status === 'edit-requested',
              'bg-gray-200': status !== 'approved' && status !== 'rejected' && status !== 'edit-requested'

            }" class="rounded-md shadow-lg">
              <p :class="{
                'text-green-800': status === 'approved',
                'text-red-50': status === 'rejected',
                'text-amber-50': status === 'edit-requested',
                'text-gray-700': status !== 'approved' && status !== 'rejected' && status !== 'edit-requested'
              }" class="px-4 py-1">
                {{ status }}
              </p>
            </div>
          </div>
        </div>

        <hr class="border-2 mb-6 " />

        <div class="mb-4 ">
          <p class="text-green-600">1. รูปเเละข้อมูล PDF</p>
        </div>

        <div class="flex justify-center">
          <!-- รูปบัตรประชาชน -->
          <div class="max-w-7xl flex flex-col md:flex-row md:gap-2 xl:gap-4 justify-center">
            <div class="mt-4">
              <p class="block text-sm font-medium mb-2 text-center">รูปบัตรประชาชน</p>
              <div
                class="w-32 h-32 border rounded flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                @click="partner.imageIden && openImageModal(partner.imageIden)">
                <img v-if="partner.imageIden" :src="partner.imageIden" class="w-full h-full object-cover"
                  alt="รูปบัตรประชาชน" />
                <span v-else class="text-xs text-gray-400">ไม่มีรูป</span>
              </div>
            </div>

            <!-- รูปวีซ่า -->
            <div class="mt-4">
              <p class="block text-sm font-medium mb-2 text-center">รูปวีซ่า</p>
              <div
                class="w-32 h-32 border rounded flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                @click="partner.imageVisa && openImageModal(partner.imageVisa)">
                <img v-if="partner.imageVisa" :src="partner.imageVisa" class="w-full h-full object-cover"
                  alt="รูปวีซ่า" />
                <span v-else class="text-xs text-gray-400">ไม่มีรูป</span>
              </div>
            </div>

            <!-- รูปที่อยู่ด้านนอก -->
            <div class="mt-4">
              <p class="block text-sm font-medium mb-2 text-center">รูปที่พักด้านนอก</p>
              <div
                class="w-32 h-32 border rounded flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer"
                @click="partner.imageHotelOurDoor && openImageModal(partner.imageHotelOurDoor)">
                <img v-if="partner.imageHotelOurDoor || partner.imagehotelOurdoor"
                  :src="partner.imageHotelOurDoor || partner.imagehotelOurdoor" class="w-full h-full object-cover"
                  alt="รูปที่อยู่ด้านนอก" />
                <span v-else class="text-xs text-gray-400">ไม่มีรูป</span>
              </div>
            </div>

            <!-- หลักฐานใบอนุญาต (PDF) -->
            <div class="mt-4">
              <p class="block text-sm font-medium mb-2 text-center">หลักฐานใบอนุญาต (PDF)</p>
              <div v-if="partner.businessLicense">
                <a :href="partner.businessLicense" target="_blank" rel="noopener noreferrer"
                  class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  เปิดไฟล์ใบอนุญาต
                </a>
              </div>
              <span v-else class="text-xs text-gray-400 ">ไม่มีไฟล์ใบอนุญาต</span>
            </div>

            <!-- Modal แสดงรูปขนาดใหญ่ -->
            <div v-if="showImage" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              @click.self="closeImageModal">
              <img :src="modalImageSrc" alt="รูปขยาย" class="max-w-3xl max-h-[90vh] rounded shadow-lg" />
              <button @click="closeImageModal"
                class="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
                aria-label="Close modal">&times;</button>
            </div>
          </div>
        </div>

        <hr class="border my-6" />

        <div class="mb-4 ">
          <p class="text-amber-600">2. ข้อมูลบริษัท</p>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-start gap-6 pb-4">
          <!-- คอลัมน์ข้อมูลบริษัท -->
          <div class="md:w-1/2 w-full xl:ml-20">
            <div class="mb-3 w-full">
              <p class="block text-sm font-medium mb-1">ชื่อบริษัท</p>
              <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{ partner.companyName }}</p>
            </div>

            <div class="mb-3">
              <p class="block text-sm font-medium mb-1">บ้านเลขที่</p>
              <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{ partner.companyAddress ||
                partner.address }}</p>
            </div>

            <div class="mb-3">
              <p class="block text-sm font-medium mb-1">ตำบล</p>
              <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{ partner.companySubdistrict ||
                partner.subdistrict }}</p>
            </div>

            <div class="mb-3">
              <p class="block text-sm font-medium mb-1">อำเภอ</p>
              <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{ partner.companyDistrict ||
                partner.district }}</p>
            </div>

            <div class="mb-3">
              <p class="block text-sm font-medium mb-1">จังหวัด</p>
              <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{ partner.companyProvince ||
                partner.province }}</p>
            </div>

            <div class="mb-3">
              <p class="block text-sm font-medium mb-1">รหัสไปรษณีย์</p>
              <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{ partner.companyPostcode ||
                partner.postcode }}</p>
            </div>
          </div>

          <!-- คอลัมน์แผนที่ -->
          <div class="md:w-1/2 w-full xl:mr-20">
            <p class="block text-sm font-medium mb-2">ตำแหน่งโรงแรมบนแผนที่</p>
            <iframe v-if="partner.hotelLatitude && partner.hotelLongitude"
              :src="`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${partner.hotelLatitude},${partner.hotelLongitude}`"
              width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade" class="rounded-lg shadow">
            </iframe>
            <div class="flex space-x-3 text-xs justify-center mt-2">
              <p v-if="partner">Latitude : {{ partner.hotelLatitude }}</p>
              <p v-if="partner">Longitude : {{ partner.hotelLongitude }}</p>
            </div>
          </div>
        </div>

        <hr class="border-1 my-6" />

        <div class="mb-4 ">
          <p class="text-red-600">3. ข้อมูลส่วนบุคคล</p>
        </div>

        <div class="flex flex-col justify-center items-center max-w-4xl mx-auto pb-4">
          <div class="w-full">
            <div class="mt-3">
              <p class="block text-sm font-medium mb-1">ชื่อ</p>
              <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                partner.firstname }}</p>
            </div>

            <div class="mt-3">
              <p class="block text-sm font-medium mb-1">นามสกุล</p>
              <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                partner.lastname }}</p>
            </div>

            <div class="mt-3">
              <p class="block text-sm font-medium mb-1">เพศ</p>
              <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                partner.sex }}</p>
            </div>

            <div class="mt-3">
              <p class="block text-sm font-medium mb-1">เบอร์โทร</p>
              <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                partner.phone }}</p>
            </div>

            <div class="mt-3">
              <p class="block text-sm font-medium mb-1">อีเมล</p>
              <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                partner.email }}</p>
            </div>

            <div class="mt-3">
              <p class="block text-sm font-medium mb-1">เลขบัตรประชาชน</p>
              <p v-if="partner" class="border rounded-md py-1 px-3 border-stone-300">{{
                partner.idenNumber }}</p>
            </div>
          </div>
        </div>

        <hr class="border-1 my-6" />


        <div class="flex flex-col text-stone-500 text-sm">
          <div class="flex  space-x-3">
            <p class="block font-medium">วันเวลาที่ยื่นสมัคร :</p>
            <p v-if="partner">{{ partner.createdAt }}</p>
          </div>
        </div>


        <hr class="border-2 my-6" />


        <div class="flex justify-center space-x-3" v-if="partner.status !== 'reject' && partner.status !== 'rejected'">
          <button @click="approvePartner"
            class="bg-green-500 py-2 px-4 rounded-lg text-white font-bold hover:bg-green-600">อนุมัติ</button>

          <button @click="requestEditPartner"
            class="bg-yellow-400 py-2 px-4 rounded-lg text-white font-bold hover:bg-yellow-500">เเก้ไข</button>

          <button @click="rejectPartner"
            class="bg-red-500 py-2 px-4 rounded-lg text-white font-bold hover:bg-red-600">ไม่อนุมัติ</button>
        </div>
      </div>



      <div @click="navigateBack" class="flex justify-center my-6">
        <button class="bg-red-500 p-2 rounded-lg hover:bg-red-600 text-white ">ย้อนกลับ</button>
      </div>

    </template>
  </TemplateAdmin>
</template>

<script setup>

import TemplateAdmin from "@/components/TemplateAdmin.vue";
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'


const partner = ref({})
const index = ref(null)
const status = ref('-')
const showImage = ref(false)
const modalImageSrc = ref(null)

// router
const route = useRoute()
const router = useRouter()

// ฟังก์ชันเปิด modal ดูรูป
function openImageModal(imageUrl) {
  modalImageSrc.value = imageUrl
  showImage.value = true
}

// ฟังก์ชันปิด modal รูป
function closeImageModal() {
  showImage.value = false
  modalImageSrc.value = null
}



// ย้อนกลับหน้าเดิม
function navigateBack() {
  router.go(-1)
}

// อนุมัติ partner
async function approvePartner() {
  try {
    await axios.put(`http://localhost:9999/HotelSleepGun/partner/approve/${partner.value._id}`)
    alert("✅ อนุมัติเรียบร้อย")
    router.push("/admin/partnerlist")
  } catch (err) {
    console.error("❌ Error approving partner:", err)
    alert("เกิดข้อผิดพลาดในการอนุมัติ")
  }
}

// ปฏิเสธ partner
async function rejectPartner() {
  const reason = prompt("กรุณาระบุเหตุผลที่ไม่อนุมัติ:")
  if (!reason) return

  try {
    await axios.put(`http://localhost:9999/HotelSleepGun/partner/reject/${partner.value._id}`, { reason })
    alert("❌ ปฏิเสธเรียบร้อย")
    router.push("/admin/partnerlist")
  } catch (err) {
    console.error("❌ Error rejecting partner:", err)
    alert("เกิดข้อผิดพลาดในการปฏิเสธ")
  }
}

// ขอแก้ไข partner
async function requestEditPartner() {
  const reason = prompt("กรุณาระบุสิ่งที่ต้องการให้แก้ไข:")
  if (!reason) return

  try {
    await axios.post(`http://localhost:9999/HotelSleepGun/partner/request-edit/${partner.value._id}`, { reason })
    alert("📩 ส่งคำขอแก้ไขเรียบร้อย")
    router.push("/admin/partnerlist")
  } catch (err) {
    console.error("❌ Error requesting edit:", err)
    alert("เกิดข้อผิดพลาดในการขอแก้ไขข้อมูล")
  }
}

// โหลดข้อมูลเมื่อเปิดหน้า
onMounted(() => {

  index.value = route.query.index || null
  status.value = route.query.status || 'รอการอนุมัติ'

  const partnerId = route.params.id
  if (partnerId) {
    axios.get(`http://localhost:9999/HotelSleepGun/partner/get/${partnerId}`)
      .then(res => {
        // ตรวจสอบว่ามี res.data.partner หรือไม่ ถ้ามีให้ใช้ ถ้าไม่มีก็ใช้ res.data เดิม
        partner.value = res.data.partner ? res.data.partner : res.data
        console.log('✅ response.data:', res.data)
      })
      .catch(err => {
        console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูล partner:', err)
      })
  } else {
    console.error('❌ ไม่พบ ID ใน route params')
  }
})

</script>
<style></style>
