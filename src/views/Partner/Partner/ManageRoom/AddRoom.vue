<template>
  <TemplatePartner>
    <template #header>
      <label>{{ t('ManageRoom') }}</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div class="flex justify-center md:justify-start py-4 md:py-0">
          <label class="text-3xl font-semibold">{{ t('AddRoom') }}</label>
        </div>

        <div class="flex flex-col md:flex-row md:justify-between items-start md:space-x-4 mt-8">
          <div class="md:w-1/2 flex flex-col 2xl:flex-row 2xl:justify-between items-start  2xl:space-x-4 w-full">

            <div class="flex flex-col 2xl:justify-between w-full">
              <label class="text-xl font-semibold pb-2">{{ t('DetailRoom') }}</label>

              <div class="flex flex-col 2xl:flex-row justify-between 2xl:space-x-4 w-full">

                <div class="2xl:w-1/2 w-full space-y-4">
                  <div :ref="el => (inputRefs.NumberRoom = el)">
                    <FloatInput v-model="NumberRoom" id="NumberRoom" :label="t('RoomNumber')"
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
                    <InputNumber v-model="Price" id="Price" :label="t('Price_Label')"
                      :class="highlightField === 'Price' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                    <p v-if="errors.Price" class="text-red-500 text-xs pl-2">{{ errors.Price }}</p>
                  </div>
                </div>

                <div class="2xl:w-1/2 w-full space-y-4  2xl:mt-0 mt-4">
                  <div :ref="el => (inputRefs.Stay = el)">
                    <InputNumber v-model="Stay" id="Stay" :label="t('Stay_Label')"
                      :class="highlightField === 'Stay' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                    <p v-if="errors.Stay" class="text-red-500 text-xs pl-2">{{ errors.Stay }}</p>
                  </div>

                  <div :ref="el => (inputRefs.RoomDetail = el)">
                    <FloatInputTextarea v-model="RoomDetail" id="RoomDetail" :label="t('RoomDetail_Label')"
                      :class="highlightField === 'RoomDetail' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                    <p v-if="errors.RoomDetail" class="text-red-500 text-xs pl-2">{{ errors.RoomDetail }}</p>
                  </div>
                </div>
              </div>

              <div class=" md:mt-8 mt-20 space-y-2">
                <label class="text-xl font-semibold">{{ t('SelectTypeRoom') }}</label>
                <div class="border rounded-md py-2">
                  <ChooseRoomType v-model="selectedRoom" :options="RoomOptions" groupName="pizza" />
                </div>
              </div>
            </div>
          </div>

          <div class="md:w-1/2 mt-20 md:mt-0 2xl:mt-0 w-full space-y-2">
            <label class="text-xl font-semibold">{{ t('AddImg') }}</label>
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FloatInput from '@/components/element/FloatInput.vue'
import FloatInputTextarea from '@/components/element/FloatInputTextarea.vue'
import TemplatePartner from "@/components/TemplatePartner.vue";
import InputNumber from "@/components/element/InputNumber.vue";
import UploadImg from "@/components/element/UploadImg.vue";
import Dropdown from "@/components/element/Dropdown.vue";
import ButtonSave from "@/components/element/ButtonSave.vue";
import ButtonReset from "@/components/element/ButtonReset.vue";
import ButtonCancel from "@/components/element/ButtonCancel.vue";
import ChooseRoomType from "@/components/element/ChooseRoomType.vue";
import { watch } from 'vue'
import { nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const selectedRoom = ref([])
const RoomOptions = ref([])

const router = useRouter()
const inputRefs = reactive({})

const RoomTypeGroupedOptions = ref([])
const TypeRoom = ref([])
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
  NumberRoom.value = ''
  selectedTypeRoom.value = null
  Price.value = null
  Stay.value = null
  RoomDetail.value = ''
  selectedRoom.value = []

  errors.value = {
    NumberRoom: '',
    selectedTypeRoom: '',
    Price: '',
    Stay: '',
    RoomDetail: '',
  }

  highlightField.value = ''
}

function handleCancel() {
  router.back()
}

// 👉 เก็บสถานะ popup save
const showConfirmSave = ref(false)

function confirmSave() {
  console.log('✅ บันทึกสำเร็จ! ส่ง API ได้เลย')
  console.log({
    numberRoom: NumberRoom.value,
    selectedTypeRoom: selectedTypeRoom.value,
    price: Price.value,
    stay: Stay.value,
    roomDetail: RoomDetail.value,
    selectedRoom: selectedRoom.value
  })

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
    errors.value.NumberRoom = t('NumberRoom_Error')
    isValid = false
  }

  if (!selectedTypeRoom.value) {
    errors.value.selectedTypeRoom = t('selectedTypeRoom_Error')
    isValid = false
  }

  if (!Price.value) {
    errors.value.Price = t('Price_Error')
    isValid = false
  }

  if (!Stay.value) {
    errors.value.Stay = t('Stay_Error')
    isValid = false
  }

  if (!RoomDetail.value.trim()) {
    errors.value.RoomDetail = t('RoomDetail_Error')
    isValid = false
  }


  return isValid
}


onMounted(async () => {
  // ดึงข้อมูล dropdown ตัวแรก แบบเดิม
  try {
    const res = await fetch('http://localhost:9999/HotelSleepGun/typeRoomHotel/getAll')
    const data = await res.json()

    RoomOptions.value = data.map(item => ({
      label: item.name,
      value: item._id
    }))
  } catch (e) {
    console.error('โหลดข้อมูล room type ไม่สำเร็จ:', e)
  }

  // ดึงข้อมูล typeRoom แบบ array ปกติ
  try {
    const res = await fetch('http://localhost:9999/HotelSleepGun/typeRoom/getAll')
    const data = await res.json()

    TypeRoom.value = [
      {
        label: 'ประเภทห้องทั้งหมด',
        code: 'all',
        items: data.map(type => ({
          label: type.name,
          value: type._id
        }))
      }
    ]
  } catch (e) {
    console.error('โหลดข้อมูล room type ไม่สำเร็จ:', e)
  }
})
</script>
