<template>
  <TemplatePartner>
    <template #header>
      <label>จัดการพนักงาน</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div class="flex justify-center md:justify-start py-4 md:py-0">
          <label class="text-3xl font-semibold">เพิ่มรายชื่อพนักงาน</label>
        </div>



        <div class="flex flex-col 2xl:flex-row 2xl:justify-between 2xl:items-start mt-12">
          <div class="2xl:w-1/3 mb-12 flex flex-col justify-center items-center">
            <label>รูปพนักงาน</label>
            <div
              class="mt-2 w-52 h-52 border-2 border-dashed border-gray-400 rounded flex items-center justify-center relative cursor-pointer overflow-hidden"
              @click="triggerFileInput">
              <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
              <template v-if="imagePreview">
                <img :src="imagePreview" class="object-cover w-full h-full" />
                <button class="absolute top-1 right-1 bg-white rounded-full shadow p-1 text-red-500 hover:bg-red-100"
                  @click.stop="removeImage" type="button">✕</button>
              </template>
              <template v-else>
                <span class="text-gray-400">คลิกเพื่ออัปโหลด</span>
              </template>
            </div>
          </div>


          <div class="2xl:w-2/3 flex flex-col lg:flex-row lg:justify-between lg:items-start">
            <div class="lg:w-1/2 px-4 space-y-3">
              <div :ref="el => (inputRefs.firstname = el)">
                <FloatInput v-model="firstname" id="firstname" label="ชื่อ"
                  :class="highlightField === 'firstname' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
              </div>

              <div :ref="el => (inputRefs.lastname = el)">
                <FloatInput v-model="lastname" id="lastname" label="นามสกุล"
                  :class="highlightField === 'lastname' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
              </div>

              <div :ref="el => (inputRefs.nickname = el)">
                <FloatInput v-model="nickname" id="nickname" label="ชื่อเล่น"
                  :class="highlightField === 'nickname' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
              </div>

              <div class="" :ref="el => (inputRefs.sex = el)">
                <select v-model="sex" class="w-full py-3 border rounded-md px-3"
                  :class="highlightField === 'sex' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''">
                  <option value="" disabled selected>เลือกเพศ</option>
                  <option value="male">เพศชาย</option>
                  <option value="female">เพศหญิง</option>
                </select>
              </div>
            </div>

            <div class="lg:w-1/2 px-4 space-y-3 lg:mt-0 mt-3">
              <div :ref="el => (inputRefs.employeeCode = el)">
                <FloatInput v-model="employeeCode" id="employeeCode" label="รหัสประจำตัวพนักงาน"
                  :class="highlightField === 'employeeCode' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
              </div>

              <div :ref="el => (inputRefs.positionEmployee = el)">
                <FloatInput v-model="positionEmployee" id="positionEmployee" label="ตำเเหน่ง"
                  :class="highlightField === 'positionEmployee' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
              </div>

              <div :ref="el => (inputRefs.email = el)">
                <FloatInput v-model="email" id="email" label="อีเมล"
                  :class="highlightField === 'email' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
              </div>

              <div :ref="el => (inputRefs.phone = el)">
                <FloatInput v-model="phone" id="phone" label="เบอร์โทร"
                  :class="highlightField === 'phone' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
              </div>
            </div>
          </div>
        </div>


        <div class="max-w-xl mx-auto mt-12 space-y-3 px-4">
          <div :ref="el => (inputRefs.statusByPartner = el)">
            <div class="flex space-x-1  my-1">
              <p class="pl-3">สำคัญ</p><!--sex-->
              <p class="text-red-600">*</p>
            </div>
            <select v-model="statusByPartner" class="w-full border rounded-md p-3"
              :class="highlightField === 'statusByPartner' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''">
              <option value="" disabled selected>เลือกสถานะ</option>
              <option value="adminPartner">adminPartner</option>
              <option value="employee">employee</option>
            </select>
          </div>

          <div :ref="el => (inputRefs.username = el)">
            <FloatInput v-model="username" id="username" label="UserName"
              :class="highlightField === 'username' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
          </div>

          <div :ref="el => (inputRefs.password = el)" class="relative">
            <FloatInput v-model="password" :type="showPassword ? 'text' : 'password'" id="password" label="Password"
              :class="highlightField === 'password' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
            <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              @click="showPassword = !showPassword" tabindex="-1">
              <span v-if="showPassword">🙈</span>
              <span v-else>👁️</span>
            </button>
          </div>
        </div>

      </div>

      <div class="flex justify-center items-center mb-12 mt-20 space-x-2">
        <ButtonCancel @click="handleCancel" />
        <ButtonReset @click="handleReset" />
        <ButtonSave @click="handleSave" />

        <button></button>
        <button></button>
        
      </div>

    </template>
  </TemplatePartner>
</template>

<script setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FloatInput from '@/components/element/FloatInput.vue'
import TemplatePartner from "@/components/TemplatePartner.vue";
import ButtonSave from "@/components/element/ButtonSave.vue";
import ButtonReset from "@/components/element/ButtonReset.vue";
import ButtonCancel from "@/components/element/ButtonCancel.vue";
import { useI18n } from 'vue-i18n'
import Swal from 'sweetalert2'

const { t } = useI18n()

const router = useRouter()
const route = useRoute()
const employeeId = route.params.id

const username = ref('')
const password = ref('')
const firstname = ref('')
const lastname = ref('')
const nickname = ref('')
const employeeCode = ref('')
const positionEmployee = ref('')
const email = ref('')
const phone = ref('')
const sex = ref('')
const statusByPartner = ref('')
const employeeImage = ref(null)
const imagePreview = ref(null)
const fileInput = ref(null)
const showPassword = ref(false)
const originalData = ref({})

onMounted(async () => {
  if (!employeeId) return
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:9999/HotelSleepGun/employee/get${employeeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    firstname.value = data.firstname || ''
    lastname.value = data.lastname || ''
    nickname.value = data.nickname || ''
    sex.value = data.sex || ''
    employeeCode.value = data.employeeCode || ''
    positionEmployee.value = data.positionEmployee || ''
    email.value = data.email || ''
    phone.value = data.phone || ''
    statusByPartner.value = data.statusByPartner || ''
    username.value = data.username || ''
    password.value = data.password || ''
    if (data.imageIden) {
      imagePreview.value = '/' + data.imageIden.replace(/\\/g, '/')
    }
    // เก็บค่า originalData สำหรับรีเซ็ต
    originalData.value = {
      firstname: data.firstname || '',
      lastname: data.lastname || '',
      nickname: data.nickname || '',
      sex: data.sex || '',
      employeeCode: data.employeeCode || '',
      positionEmployee: data.positionEmployee || '',
      email: data.email || '',
      phone: data.phone || '',
      statusByPartner: data.statusByPartner || '',
      username: data.username || '',
      password: data.password || '',
      imagePreview: data.imageIden ? '/' + data.imageIden.replace(/\\/g, '/') : null
    }
  } catch (e) {
    alert('ไม่พบข้อมูลพนักงาน')
  }
})

function triggerFileInput() {
  fileInput.value && fileInput.value.click()
}

function onFileChange(event) {
  const file = event.target.files[0]
  employeeImage.value = file
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    imagePreview.value = null
  }
}

function removeImage() {
  employeeImage.value = null
  imagePreview.value = null
  if (fileInput.value) fileInput.value.value = ''
}

const errors = ref({
  statusByPartner: '',
  username: '',
  password: '',
  email: '',
  phone: '',
})

const highlightField = ref('')
const inputRefs = reactive({})

function validateEmail(email) {
  // Simple email regex
  return /^\S+@\S+\.\S+$/.test(email)
}

function validatePhone(phone) {
  // Thai phone number: 9-10 digits, start with 0
  return /^0\d{8,9}$/.test(phone)
}

function validateForm() {
  let isValid = true
  errors.value = {
    statusByPartner: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  }

  if (!statusByPartner.value) {
    errors.value.statusByPartner = 'กรุณาเลือกสถานะ'
    isValid = false
  }
  if (!username.value.trim()) {
    errors.value.username = 'กรุณากรอก UserName'
    isValid = false
  }
  if (!password.value.trim()) {
    errors.value.password = 'กรุณากรอก Password'
    isValid = false
  }
  if (email.value && !validateEmail(email.value)) {
    errors.value.email = 'รูปแบบอีเมลไม่ถูกต้อง (เช่น aaaaa@gmail.com)'
    isValid = false
  }
  if (phone.value && !validatePhone(phone.value)) {
    errors.value.phone = 'รูปแบบเบอร์โทรไม่ถูกต้อง (เช่น 0812345678)'
    isValid = false
  }
  return isValid
}

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


watch(statusByPartner, (val) => { if (val) errors.value.statusByPartner = '' })
watch(username, (val) => { if (val.trim()) errors.value.username = '' })
watch(password, (val) => { if (val.trim()) errors.value.password = '' })

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
  await confirmSave()
}

async function handleReset() {
  const result = await Swal.fire({
    title: 'ยืนยันการรีเซ็ตข้อมูล?',
    text: 'คุณต้องการรีเซ็ตข้อมูลกลับเป็นค่าที่บันทึกไว้ใช่หรือไม่',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก'
  })
  if (!result.isConfirmed) return;
  // รีเซ็ตกลับเป็นค่าที่โหลดมาจาก backend
  firstname.value = originalData.value.firstname
  lastname.value = originalData.value.lastname
  nickname.value = originalData.value.nickname
  employeeCode.value = originalData.value.employeeCode
  positionEmployee.value = originalData.value.positionEmployee
  email.value = originalData.value.email
  phone.value = originalData.value.phone
  username.value = originalData.value.username
  password.value = originalData.value.password
  sex.value = originalData.value.sex
  statusByPartner.value = originalData.value.statusByPartner
  imagePreview.value = originalData.value.imagePreview
  employeeImage.value = null
  highlightField.value = ''
  Swal.fire({
    icon: 'info',
    title: 'รีเซ็ตข้อมูลเรียบร้อย',
    showConfirmButton: false,
    timer: 1200
  })
}

function handleCancel() {
  router.back()
}

async function confirmSave() {
  const formData = new FormData();
  formData.append('username', username.value);
  formData.append('password', password.value);
  formData.append('firstname', firstname.value);
  formData.append('lastname', lastname.value);
  formData.append('nickname', nickname.value);
  formData.append('sex', sex.value);
  formData.append('email', email.value);
  formData.append('phone', phone.value);
  formData.append('employeeCode', employeeCode.value);
  formData.append('positionEmployee', positionEmployee.value);
  formData.append('statusByPartner', statusByPartner.value);
  if (employeeImage.value) {
    formData.append('imageIden', employeeImage.value);
  }
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:9999/HotelSleepGun/employee/update${employeeId}`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: 'แก้ไขพนักงานสำเร็จ',
        showConfirmButton: false,
        timer: 1200
      })
      router.back();
    } else {
      Swal.fire({
        icon: 'error',
        title: data.message || 'เกิดข้อผิดพลาดในการแก้ไขพนักงาน',
      })
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาดในการเชื่อมต่อ API',
    })
  }
}
</script>
