<template>
  <TemplatePartner>
    <template #header>
      <label>จัดการห้องพัก</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div class="flex justify-center md:justify-start py-4 md:py-0">
          <label class="text-3xl font-semibold text-red-800">เเก้ไขห้องพัก</label>
        </div>

        <div class="flex flex-col md:flex-row md:justify-between items-start md:space-x-4 mt-8">
          <div class="md:w-1/2 flex flex-col 2xl:flex-row 2xl:justify-between items-start  2xl:space-x-4 w-full">

            <div class="flex flex-col 2xl:justify-between w-full">
              <label class="text-xl font-semibold pb-2">รายละเอียดห้องพัก</label>

              <div class="flex flex-col 2xl:flex-row justify-between 2xl:space-x-4 w-full">

                <div class="2xl:w-1/2 w-full space-y-4">
                  <div :ref="el => (inputRefs.NumberRoom = el)">
                    <FloatInput v-model="NumberRoom" id="NumberRoom" label="หมายเลขห้องพัก"
                      :class="highlightField === 'NumberRoom' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                    <p v-if="errors.NumberRoom" class="text-red-500 text-xs pl-2">{{ errors.NumberRoom }}</p>
                  </div>

                  <div :ref="el => (inputRefs.selectedTypeRoom = el)">
                    <Dropdown v-model="selectedTypeRoom" :groupedCities="TypeRoom" id="selectedTypeRoom"
                      :class="highlightField === 'selectedTypeRoom' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                    <p v-if="errors.selectedTypeRoom" class="text-red-500 text-xs pl-2">{{ errors.selectedTypeRoom }}
                    </p>
                  </div>

                  <div :ref="el => (inputRefs.Price = el)">
                    <InputNumber v-model="Price" id="Price" label="ราคาห้องพัก / บาท"
                      :class="highlightField === 'Price' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                    <p v-if="errors.Price" class="text-red-500 text-xs pl-2">{{ errors.Price }}</p>
                  </div>
                </div>

                <div class="2xl:w-1/2 w-full space-y-4  2xl:mt-0 mt-4">
                  <div :ref="el => (inputRefs.Stay = el)">
                    <InputNumber v-model="Stay" id="Stay" label="จำนวนเข้าพักได้สูงสุด / คน"
                      :class="highlightField === 'Stay' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                    <p v-if="errors.Stay" class="text-red-500 text-xs pl-2">{{ errors.Stay }}</p>
                  </div>

                  <div :ref="el => (inputRefs.RoomDetail = el)">
                    <FloatInputTextarea v-model="RoomDetail" id="RoomDetail" label="รายละเอียดห้องพัก"
                      :class="highlightField === 'RoomDetail' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                    <p v-if="errors.RoomDetail" class="text-red-500 text-xs pl-2">{{ errors.RoomDetail }}</p>
                  </div>
                </div>
              </div>

              <div class=" md:mt-8 mt-20 space-y-2">
                <label class="text-xl font-semibold">เลือกลักษณะห้องพัก</label>
                <div class="border rounded-md py-2">
                  <ChooseRoomType v-model="selectedRoom" :options="RoomOptions" groupName="pizza" />
                </div>
              </div>
            </div>
          </div>

          <div class="md:w-1/2 mt-20 md:mt-0 2xl:mt-0 w-full space-y-2">
            <label class="text-xl font-semibold">เพิ่มรูปภาพ</label>
            <UploadImg :key="'UploadImgRoom'" />
          </div>
        </div>

        <div class="flex justify-center items-center mb-12 mt-20 space-x-2">
          <ButtonCancel @confirm="handleCancel" />
          <ButtonReset @confirm="handleReset" />
          <ButtonSave @confirm="handleSave" />
        </div>
      </div>

    </template>
  </TemplatePartner>
</template>



<script setup>

import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FloatInput from '@/components/element/FloatInput.vue'
import FloatInputTextarea from '@/components/element/FloatInputTextarea.vue'
import TemplatePartner from '@/components/TemplatePartner.vue'
import InputNumber from '@/components/element/InputNumber.vue'
import UploadImg from '@/components/element/UploadImg.vue'
import Dropdown from '@/components/element/Dropdown.vue'
import ButtonSave from '@/components/element/ButtonSave.vue'
import ButtonReset from '@/components/element/ButtonReset.vue'
import ButtonCancel from '@/components/element/ButtonCancel.vue'
import ChooseRoomType from '@/components/element/ChooseRoomType.vue'

// Router
const router = useRouter()
const route = useRoute()
const roomId = route.params.roomId

// ฟอร์ม
const NumberRoom = ref('')
const selectedTypeRoom = ref(null)
const Price = ref(null)
const Stay = ref(null)
const RoomDetail = ref('')
const selectedRoom = ref([])

// รีเซ็ตกลับค่าเดิม
const initialData = ref({
  NumberRoom: '',
  selectedTypeRoom: null,
  Price: null,
  Stay: null,
  RoomDetail: '',
  selectedRoom: []
})

// ตัวเลือก Room type
const RoomOptions = ref([])

// Error state
const errors = ref({
  NumberRoom: '',
  selectedTypeRoom: '',
  Price: '',
  Stay: '',
  RoomDetail: ''
})

// อ้างอิง input เพื่อ scroll
const inputRefs = reactive({})
const highlightField = ref('')

// ป็อปอัปยืนยันบันทึก
const showConfirmSave = ref(false)

// ตรวจสอบความถูกต้องของฟอร์ม
function validateForm() {
  let isValid = true

  errors.value = {
    NumberRoom: '',
    selectedTypeRoom: '',
    Price: '',
    Stay: '',
    RoomDetail: ''
  }

  if (!NumberRoom.value.trim()) {
    errors.value.NumberRoom = 'กรุณากรอกหมายเลขห้องพัก'
    isValid = false
  }

  if (!selectedTypeRoom.value) {
    errors.value.selectedTypeRoom = 'กรุณาเลือกประเภทห้องพัก'
    isValid = false
  }

  if (!Price.value) {
    errors.value.Price = 'กรุณากรอกราคาห้องพัก'
    isValid = false
  }

  if (!Stay.value) {
    errors.value.Stay = 'กรุณากรอกจำนวนเข้าพักสูงสุด'
    isValid = false
  }

  if (!RoomDetail.value.trim()) {
    errors.value.RoomDetail = 'กรุณากรอกรายละเอียดห้องพัก'
    isValid = false
  }

  return isValid
}

// แสดง error พร้อม scroll
function scrollToFirstErrorWithAnimation() {
  const firstErrorKey = Object.keys(errors.value).find(key => errors.value[key])
  const el = inputRefs[firstErrorKey]

  if (el) {
    nextTick(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      highlightField.value = firstErrorKey
      setTimeout(() => {
        highlightField.value = ''
      }, 1000)
    })
  }
}

// กดปุ่ม "บันทึก"
function handleSave() {
  if (!validateForm()) {
    scrollToFirstErrorWithAnimation()
    return
  }
  showConfirmSave.value = true
}

// ยืนยันบันทึก
async function confirmSave() {
  try {
    const payload = {
      NumberRoom: NumberRoom.value,
      selectedTypeRoom: selectedTypeRoom.value,
      Price: Price.value,
      Stay: Stay.value,
      RoomDetail: RoomDetail.value,
      selectedRoom: selectedRoom.value
    }

    const res = await fetch(`http://localhost:9999/HotelSleepGun/room/update/${roomId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error('การบันทึกไม่สำเร็จ')

    console.log('✅ แก้ไขห้องพักสำเร็จ')
    router.back()
  } catch (err) {
    console.error('❌ บันทึกไม่สำเร็จ:', err)
  } finally {
    showConfirmSave.value = false
  }
}

// รีเซ็ตค่าเป็นข้อมูลเดิม
function handleReset() {
  NumberRoom.value = initialData.value.NumberRoom
  selectedTypeRoom.value = initialData.value.selectedTypeRoom
  Price.value = initialData.value.Price
  Stay.value = initialData.value.Stay
  RoomDetail.value = initialData.value.RoomDetail
  selectedRoom.value = initialData.value.selectedRoom

  errors.value = {
    NumberRoom: '',
    selectedTypeRoom: '',
    Price: '',
    Stay: '',
    RoomDetail: ''
  }

  highlightField.value = ''
}

// ย้อนกลับ
function handleCancel() {
  router.back()
}
// // โหลดข้อมูลเดิม
// onMounted(async () => {
//   try {
//     const res = await fetch(`http://localhost:9999/HotelSleepGun/room/getOne/${roomId}`)
//     const data = await res.json()

//     NumberRoom.value = data.NumberRoom
//     selectedTypeRoom.value = data.selectedTypeRoom
//     Price.value = data.Price
//     Stay.value = data.Stay
//     RoomDetail.value = data.RoomDetail
//     selectedRoom.value = data.selectedRoom || []

//     initialData.value = {
//       NumberRoom: data.NumberRoom,
//       selectedTypeRoom: data.selectedTypeRoom,
//       Price: data.Price,
//       Stay: data.Stay,
//       RoomDetail: data.RoomDetail,
//       selectedRoom: data.selectedRoom || []
//     }

//     const roomTypeRes = await fetch('http://localhost:9999/HotelSleepGun/typeRoomHotel/getAll')
//     const roomTypeData = await roomTypeRes.json()

//     RoomOptions.value = roomTypeData.map(item => ({
//       label: item.name,
//       value: item._id
//     }))
//   } catch (err) {
//     console.error('❌ โหลดข้อมูลห้องพักไม่สำเร็จ:', err)
//   }
// })
// เคลียร์ error เมื่อผู้ใช้กรอก
watch(NumberRoom, val => {
  if (val.trim()) errors.value.NumberRoom = ''
})
watch(selectedTypeRoom, val => {
  if (val) errors.value.selectedTypeRoom = ''
})
watch(Price, val => {
  if (val) errors.value.Price = ''
})
watch(Stay, val => {
  if (val) errors.value.Stay = ''
})
watch(RoomDetail, val => {
  if (val.trim()) errors.value.RoomDetail = ''
})

</script>
