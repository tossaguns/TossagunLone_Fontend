<template>

  <div class=" max-w-[3000px] mx-auto">
    <div class="flex justify-center md:justify-start py-4 md:py-0">
      <label class="text-3xl font-semibold">{{ t('AddRoom') }}</label>


    </div>

    <div class="flex flex-col justify-center items-start mt-8">
      <div class=" flex flex-col 2xl:flex-row 2xl:justify-between items-start  2xl:space-x-4 w-full">

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
                <Dropdown v-model="selectedTypeRoom" :options="TypeRoom[0]?.items || []" id="selectedTypeRoom"
                  placeholder="เลือกประเภทห้อง"
                  :class="highlightField === 'selectedTypeRoom' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.selectedTypeRoom" class="text-red-500 text-xs pl-2">{{ errors.selectedTypeRoom }}
                </p>
              </div>

              <div :ref="el => (inputRefs.selectedTypeAir = el)">
                <Dropdown v-model="selectedTypeAir" :options="TypeAir[0]?.items || []" id="selectedTypeAir"
                  placeholder="เลือกประเภทพัดลม/เเอร์"
                  :class="highlightField === 'selectedTypeAir' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.selectedTypeAir" class="text-red-500 text-xs pl-2">{{ errors.selectedTypeAir }}
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
              <ChooseRoomType v-model="selectedTypeRoomHotel" :options="RoomOptions" groupName="pizza" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10  w-full space-y-2">
        <label class="text-xl font-semibold">{{ t('AddImg') }}</label>
        <UploadImg :key="'UploadImgRoom'" v-model="uploadedImages" />
      </div>
    </div>

    <div class="flex justify-center items-center mb-12 mt-20 space-x-2">
      <ButtonCancel @click="handleCancel" />
      <ButtonReset @click="handleReset" />
      <ButtonSave @click="handleSave" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Define props
const props = defineProps({
  selectedFloor: {
    type: String,
    default: ''
  },
  selectedBuildingId: {
    type: String,
    default: ''
  }
});

// Debug: ตรวจสอบ props ที่ได้รับ
console.log('🏠 AddRoom props received:', {
  selectedFloor: props.selectedFloor,
  selectedBuildingId: props.selectedBuildingId
});

// ตัวแปรสำหรับเก็บข้อมูลตึก
const buildings = ref([]);

// ฟังก์ชันสำหรับดึงชื่อตึกจาก buildingId
const getBuildingName = (buildingId) => {
  // ตรวจสอบว่า buildings.value เป็น array หรือไม่
  if (!Array.isArray(buildings.value)) {
    return `ไม่พบตึก (ID: ${buildingId}) - ข้อมูลตึกไม่ถูกต้อง`;
  }

  const building = buildings.value.find(b => b._id === buildingId);

  if (building) {
    return building.nameBuilding;
  } else {
    // ลองหาแบบอื่นๆ
    const buildingByString = buildings.value.find(b => String(b._id) === String(buildingId));
    if (buildingByString) {
      return buildingByString.nameBuilding;
    }

    return `ไม่พบตึก (ID: ${buildingId})`;
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลตึกทั้งหมด
const getAllBuildings = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token');
    }

    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/buildings', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('ไม่สามารถดึงข้อมูลตึกได้');
    }

    const data = await response.json();

    // ตรวจสอบและแปลงข้อมูลให้เป็น array
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.buildings)) {
      return data.buildings;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('❌ Error fetching buildings:', error);
    return [];
  }
};

// Define emits
const emit = defineEmits(['roomSaved', 'roomData'])
import FloatInput from '@/components/element/FloatInput.vue'
import FloatInputTextarea from '@/components/element/FloatInputTextarea.vue'

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
import Swal from 'sweetalert2'

const { t } = useI18n()

const selectedRoom = ref([])
const RoomOptions = ref([])

const router = useRouter()
const inputRefs = reactive({})
const RoomTypeGroupedOptions = ref([])
const TypeRoom = ref([])
const TypeAir = ref([])
const selectedTypeRoom = ref(null)
const selectedTypeAir = ref(null)
const NumberRoom = ref('')
const Stay = ref('')
const RoomDetail = ref('')
const Price = ref('')

const errors = ref({
  NumberRoom: '',
  selectedTypeRoom: '',
  selectedTypeAir: '',
  Price: '',
  Stay: '',
  RoomDetail: '',
})

const highlightField = ref('')
const typeRoomHotelOptions = ref([])
const selectedTypeRoomHotel = ref([])
const uploadedImages = ref([]) // เก็บข้อมูลรูปภาพที่อัปโหลด

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
watch(selectedTypeAir, (val) => {
  if (val) errors.value.selectedTypeAir = ''
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

async function handleSave() {
  const isValid = validateForm()
  if (!isValid) {
    scrollToFirstErrorWithAnimation()
    return
  }
  const result = await Swal.fire({
    title: 'ยืนยันการบันทึกข้อมูล?',
    text: 'คุณต้องการบันทึกข้อมูลนี้ใช่หรือไม่',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก'
  })
  if (!result.isConfirmed) return;
  confirmSave();
}

async function handleReset() {
  const result = await Swal.fire({
    title: 'ยืนยันการรีเซ็ตข้อมูล?',
    text: 'คุณต้องการรีเซ็ตข้อมูลกลับเป็นค่าว่างใช่หรือไม่',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก'
  })
  if (!result.isConfirmed) return;
  NumberRoom.value = ''
  selectedTypeRoom.value = null
  selectedTypeAir.value = null
  Price.value = null
  Stay.value = null
  RoomDetail.value = ''
  selectedRoom.value = []
  selectedTypeRoomHotel.value = []
  errors.value = {
    NumberRoom: '',
    selectedTypeRoom: '',
    selectedTypeAir: '',
    Price: '',
    Stay: '',
    RoomDetail: '',
  }
  highlightField.value = ''
  Swal.fire({
    icon: 'info',
    title: 'รีเซ็ตข้อมูลเรียบร้อย',
    showConfirmButton: false,
    timer: 1200
  })
}

function handleCancel() {
  // รีเซ็ตค่าทั้งหมด
  NumberRoom.value = '';
  selectedTypeRoom.value = null;
  selectedTypeAir.value = null;
  Price.value = null;
  Stay.value = null;
  RoomDetail.value = '';
  selectedRoom.value = [];
  selectedTypeRoomHotel.value = [];
  uploadedImages.value = [];
  errors.value = {
    NumberRoom: '',
    selectedTypeRoom: '',
    selectedTypeAir: '',
    Price: '',
    Stay: '',
    RoomDetail: '',
  };
  highlightField.value = '';

  // ส่ง event ไปยัง parent component เพื่อปิด Dialog
  emit('roomSaved', null);
}

// 👉 เก็บสถานะ popup save
const showConfirmSave = ref(false)

function confirmSave() {
  console.log('confirmSave called');
  console.log('🏠 Props data:', {
    selectedFloor: props.selectedFloor,
    selectedBuildingId: props.selectedBuildingId
  });
  
  // สร้าง FormData
  const formData = new FormData();
  formData.append('roomNumber', NumberRoom.value);
  formData.append('typeRoom', typeof selectedTypeRoom.value === 'object' ? selectedTypeRoom.value.value : selectedTypeRoom.value);
  formData.append('air', typeof selectedTypeAir.value === 'object' ? selectedTypeAir.value.value : selectedTypeAir.value);
  formData.append('price', Price.value);
  formData.append('stayPeople', Stay.value);
  formData.append('roomDetail', RoomDetail.value);
  formData.append('floor', props.selectedFloor); // เพิ่ม floor field
  formData.append('buildingId', props.selectedBuildingId); // เพิ่ม buildingId field
  // แนบ typeRoomHotel เป็น array
  selectedTypeRoomHotel.value.forEach(id => formData.append('typeRoomHotel', id));

  // เพิ่มไฟล์รูปภาพ
  uploadedImages.value.forEach((file, index) => {
    formData.append('imgrooms', file);
  });

  const token = localStorage.getItem('token');
  console.log('token:', token);
  // Debug: log ข้อมูล formData ที่จะส่งไป backend
  for (let pair of formData.entries()) {
    console.log(pair[0] + ':', pair[1]);
  }
  fetch('http://localhost:9999/HotelSleepGun/pos/rooms', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(async res => {
      let data;
      try {
        data = await res.json();
      } catch (e) {
        data = {};
      }
      console.log('API response:', res.status, data);
      showConfirmSave.value = false;
      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'บันทึกข้อมูลห้องสำเร็จ',
          showConfirmButton: false,
          timer: 1200
        });

        // ส่งข้อมูลห้องที่บันทึกสำเร็จไปยัง parent component
        const roomData = {
          roomNumber: NumberRoom.value,
          typeRoom: typeof selectedTypeRoom.value === 'object' ? selectedTypeRoom.value.value : selectedTypeRoom.value,
          air: typeof selectedTypeAir.value === 'object' ? selectedTypeAir.value.value : selectedTypeAir.value,
          price: Price.value,
          stayPeople: Stay.value,
          roomDetail: RoomDetail.value,
          floor: props.selectedFloor, // เพิ่ม floor field
          buildingId: props.selectedBuildingId, // เพิ่ม buildingId field
          typeRoomHotel: selectedTypeRoomHotel.value,
          images: uploadedImages.value
        };

        // ส่งข้อมูลห้องที่บันทึกสำเร็จไปยัง parent component
        emit('roomSaved', roomData);

        // รีเซ็ตค่าทั้งหมดหลังจากบันทึกสำเร็จ
        NumberRoom.value = '';
        selectedTypeRoom.value = null;
        selectedTypeAir.value = null;
        Price.value = null;
        Stay.value = null;
        RoomDetail.value = '';
        selectedRoom.value = [];
        selectedTypeRoomHotel.value = [];
        uploadedImages.value = [];
        errors.value = {
          NumberRoom: '',
          selectedTypeRoom: '',
          selectedTypeAir: '',
          Price: '',
          Stay: '',
          RoomDetail: '',
        };
        highlightField.value = '';
      } else {
        alert('เกิดข้อผิดพลาด: ' + (data.message || JSON.stringify(data)));
        console.error('เกิดข้อผิดพลาด:', data);
      }
    })
    .catch((err) => {
      console.error('API error:', err);
      showConfirmSave.value = false;
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ API: ' + err);
    });
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

  if (!selectedTypeAir.value) {
    errors.value.selectedTypeAir = 'กรุณาเลือกประเภทพัดลม/แอร์'
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

  if (!selectedTypeRoomHotel.value.length) {
    errors.value.selectedTypeRoomHotel = 'กรุณาเลือกลักษณะห้องอย่างน้อย 1 รายการ'
    isValid = false
  }



  console.log('validateForm errors:', JSON.parse(JSON.stringify(errors.value)), 'isValid:', isValid);



  return isValid
}


onMounted(async () => {
  // โหลดข้อมูลตึก
  try {
    const fetchedBuildings = await getAllBuildings();
    buildings.value = fetchedBuildings;
  } catch (error) {
    console.error('❌ Error loading buildings:', error);
  }

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

  // ดึงข้อมูล typeRoomHotel ทั้งหมด
  try {
    const res = await fetch('http://localhost:9999/HotelSleepGun/typeRoomHotel/getAll')
    const data = await res.json()
    typeRoomHotelOptions.value = data.map(item => ({
      label: item.name,
      value: item._id
    }))
  } catch (e) {
    console.error('โหลดข้อมูล typeRoomHotel ไม่สำเร็จ:', e)
  }

  // ดึงข้อมูล TypeAir
  try {
    TypeAir.value = [
      {
        label: 'ประเภทพัดลม/แอร์ทั้งหมด',
        code: 'all',
        items: [
          { label: 'ห้องแอร์', value: 'ห้องเเอร์' },
          { label: 'ห้องพัดลม', value: 'ห้องพัดลม' },
          { label: 'ห้องแอร์และพัดลม', value: 'ห้องเเอร์และพัดลม' }
        ]
      }
    ]
  } catch (e) {
    console.error('โหลดข้อมูล TypeAir ไม่สำเร็จ:', e)
  }
})
</script>
