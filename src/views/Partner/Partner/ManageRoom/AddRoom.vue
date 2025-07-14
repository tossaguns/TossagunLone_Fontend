<template>
  <TemplatePartner>
    <template #header>
      <label>จัดการห้องพัก</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div class="flex justify-center md:justify-start py-4 md:py-0">
          <label class="text-3xl font-semibold">เพิ่มห้องพัก</label>
        </div>

        <div class="flex flex-col md:flex-row md:justify-between items-start md:space-x-4 mt-4">
          <div class="md:w-1/2 flex flex-col 2xl:flex-row 2xl:justify-between items-start  2xl:space-x-4 w-full">

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

          <div class="md:w-1/2 mt-4 md:mt-0 2xl:mt-0 w-full">
            <UploadImg :key="'UploadImgRoom'" />
          </div>
        </div>

        <div class="flex justify-center items-center my-12 space-x-2">
          <ButtonSave @confirm="handleSave" />
          <ButtonReset @confirm="handleReset" />
        </div>
      </div>

    </template>
  </TemplatePartner>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import FloatInput from '@/components/element/FloatInput.vue'
import FloatInputTextarea from '@/components/element/FloatInputTextarea.vue'
import TemplatePartner from "@/components/TemplatePartner.vue";
import InputNumber from "@/components/element/InputNumber.vue";
import UploadImg from "@/components/element/UploadImg.vue";
import Dropdown from "@/components/element/Dropdown.vue";
import ButtonSave from "@/components/element/ButtonSave.vue";
import ButtonReset from "@/components/element/ButtonReset.vue";
import { watch } from 'vue'
import { nextTick } from 'vue'

const inputRefs = reactive({})
const selectedTypeRoom = ref(null)
const NumberRoom = ref('')
const Stay = ref('')
const RoomDetail = ref('')
const Price = ref('')

const errors = ref({
  NumberRoom: '',
  selectedTypeRoom: '',
  Price: '',
  Stay: '',
  RoomDetail: '',
})

const highlightField = ref('')

function scrollToFirstErrorWithAnimation() {
  const firstErrorKey = Object.keys(errors.value).find((key) => errors.value[key])
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

const TypeRoom = [
  {
    label: 'Standard Rooms',
    code: 'standard',
    items: [
      { label: 'Single Room', value: 'single' },
      { label: 'Double Room', value: 'double' },
      { label: 'Twin Room', value: 'twin' },
    ],
  },
  {
    label: 'Deluxe Rooms',
    code: 'deluxe',
    items: [
      { label: 'Deluxe Single', value: 'deluxe_single' },
      { label: 'Deluxe Double', value: 'deluxe_double' },
      { label: 'Deluxe Suite', value: 'deluxe_suite' },
    ],
  },
  {
    label: 'Suites',
    code: 'suite',
    items: [
      { label: 'Junior Suite', value: 'junior_suite' },
      { label: 'Executive Suite', value: 'executive_suite' },
      { label: 'Presidential Suite', value: 'presidential_suite' },
    ],
  },
]

watch(NumberRoom, (val) => {
  if (val.trim()) errors.value.NumberRoom = ''
})
watch(selectedTypeRoom, (val) => {
  if (val) errors.value.selectedTypeRoom = ''
})
watch(Price, (val) => {
  if (val) errors.value.Price = ''
})
watch(Stay, (val) => {
  if (val) errors.value.Stay = ''
})
watch(RoomDetail, (val) => {
  if (val.trim()) errors.value.RoomDetail = ''
})

function handleSave() {
  const isValid = validateForm()
  if (!isValid) {
    scrollToFirstErrorWithAnimation()
    return
  }

  showConfirmSave.value = true
}

function handleReset() {
  // เคลียร์ค่าฟอร์ม
  NumberRoom.value = ''
  selectedTypeRoom.value = null
  Price.value = null
  Stay.value = null
  RoomDetail.value = ''

  // เคลียร์ข้อความ error
  errors.value = {
    NumberRoom: '',
    selectedTypeRoom: '',
    Price: '',
    Stay: '',
    RoomDetail: '',
  }

  // ล้างการไฮไลต์
  highlightField.value = ''
}

// 👉 เก็บสถานะ popup save
const showConfirmSave = ref(false)

function confirmSave() {
  console.log('✅ บันทึกสำเร็จ! ส่ง API ได้เลย')
  showConfirmSave.value = false
}

function validateForm() {
  let isValid = true

  // ล้าง error เดิม
  errors.value = {
    NumberRoom: '',
    selectedTypeRoom: '',
    Price: '',
    Stay: '',
    RoomDetail: '',
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
</script>
