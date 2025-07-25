<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto text-stone-600">
        <div class="flex items-stretch">

          <BarProfileMember class="hidden lg:block" />

          <div class="lg:pl-6 my-12 w-full ">
            <label class="text-lg font-semibold md:pl-0 pl-6">ข้อมูลส่วนตัว</label>
            <div class="lg:border rounded-lg mt-6 p-4">

              <div class="flex flex-col space-y-2">
                <!-- เเวะมาใส่ db ด้วย -->
                <label>รูปโปรไฟล์</label>
                <input type="file" />
              </div>

              <!-- ชื่อ-นามสกุล -->
              <div class="mt-8">
                <div class="flex justify-between items-center">
                  <div>
                    <label>ชื่อ - นามสกุล : {{ firstName }} {{ lastName }}</label>
                  </div>
                  <div v-if="!isEditName">
                    <button class="bg-red-400 hover:bg-red-300 px-3 py-2 rounded-lg text-white"
                      @click="editName">แก้ไข</button>
                  </div>
                </div>

                <div v-if="isEditName" class="flex flex-col md:flex-row justify-between items-center mt-3">
                  <div
                    class="md:md:space-x-2 mt-2 space-y-2 md:space-y-0 flex flex-col md:flex-row  justify-center mb-6 ">
                    <input v-model="editFirstName" class="border rounded-lg py-2 px-4" placeholder="ชื่อ" />
                    <input v-model="editLastName" class="border rounded-lg py-2 px-4" placeholder="นามสกุล" />
                  </div>
                  <div class="space-x-3 text-white">
                    <button class="bg-stone-400 hover:bg-stone-300 px-3 py-2 rounded-lg"
                      @click="cancelEditName">ยกเลิก</button>
                    <button class="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg" @click="saveName">บันทึก</button>
                  </div>
                </div>
              </div>
              <div class="my-4">
                <hr class="border" />
              </div>

              <!-- ชื่อโปรไฟล์ -->
              <div class="mt-8">
                <div class="flex justify-between items-center">
                  <div>
                    <label>ชื่อโปรไฟล์ : {{ nameProfile }}</label>
                  </div>
                  <div v-if="!isEditProfile">
                    <button class="bg-red-400 hover:bg-red-300 px-3 py-2 rounded-lg text-white"
                      @click="editProfile">แก้ไข</button>
                  </div>
                </div>

                <div v-if="isEditProfile" class="flex flex-col md:flex-row justify-between items-center mt-3">
                  <div
                    class="md:md:space-x-2 mt-2 space-y-2 md:space-y-0 flex flex-col md:flex-row  justify-center mb-6 ">
                    <input v-model="editNameProfile" class="border rounded-lg py-2 px-4" placeholder="ชื่อโปรไฟล์" />
                  </div>
                  <div class="space-x-3 text-white">
                    <button class="bg-stone-400 hover:bg-stone-300 px-3 py-2 rounded-lg"
                      @click="cancelEditProfile">ยกเลิก</button>
                    <button class="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg"
                      @click="saveProfile">บันทึก</button>
                  </div>
                </div>
              </div>
              <div class="my-4">
                <hr class="border" />
              </div>




              <!-- อีเมล -->
              <div>
                <div class="flex justify-between items-center">
                  <div>
                    <label>อีเมล : {{ email }}</label>
                  </div>
                  <div v-if="!isEditEmail">
                    <button class="bg-red-400 hover:bg-red-300 px-3 py-2 rounded-lg text-white"
                      @click="startEditEmail">แก้ไข</button>
                  </div>
                </div>
                <div v-if="isEditEmail" class="flex justify-between  flex-col md:flex-row  items-center mt-3">
                  <div class="md:space-x-2 mt-2 space-y-2 md:space-y-0 flex flex-col md:flex-row justify-center mb-6">
                    <input v-model="editEmail" class="border rounded-lg py-2 px-4" placeholder="อีเมล" />
                  </div>
                  <div class="space-x-3 text-white">
                    <button class="bg-stone-400 hover:bg-stone-300 px-3 py-2 rounded-lg"
                      @click="cancelEditEmail">ยกเลิก</button>
                    <button class="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg"
                      @click="saveEmail">บันทึก</button>
                  </div>
                </div>
              </div>
              <div class="my-4">
                <hr class="border" />
              </div>

              <!-- หมายเลขโทรศัพท์ -->
              <div>
                <div class="flex justify-between items-center">
                  <div>
                    <label>หมายเลขโทรศัพท์ : {{ phone }}</label>
                  </div>
                  <div v-if="!isEditPhone">
                    <button class="bg-red-400 hover:bg-red-300 px-3 py-2 rounded-lg text-white"
                      @click="startEditPhone">แก้ไข</button>
                  </div>
                </div>
                <div v-if="isEditPhone" class="flex justify-between  flex-col md:flex-row  items-center mt-3">
                  <div class="md:space-x-2 mt-2 space-y-2 md:space-y-0 flex flex-col md:flex-row justify-center mb-6">
                    <input v-model="editPhone" class="border rounded-lg py-2 px-4" placeholder="หมายเลขโทรศัพท์" />
                  </div>
                  <div class="space-x-3 text-white">
                    <button class="bg-stone-400 hover:bg-stone-300 px-3 py-2 rounded-lg"
                      @click="cancelEditPhone">ยกเลิก</button>
                    <button class="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg"
                      @click="savePhone">บันทึก</button>
                  </div>
                </div>
              </div>
              <div class="my-4">
                <hr class="border" />
              </div>

              <!-- เพศ -->
              <div>
                <div class="flex justify-between items-center">
                  <div>
                    <label>เพศ : {{ sex }}</label>
                  </div>
                  <div v-if="!isEditSex">
                    <button class="bg-red-400 hover:bg-red-300 px-3 py-2 rounded-lg text-white"
                      @click="startEditSex">แก้ไข</button>
                  </div>
                </div>
                <div v-if="isEditSex" class="flex justify-between  flex-col md:flex-row  items-center mt-3">
                  <div class="md:space-x-2 mt-2 space-y-2 md:space-y-0 flex flex-col md:flex-row justify-center mb-6">
                    <input v-model="editSex" class="border rounded-lg py-2 px-4" placeholder="เพศ" />
                  </div>
                  <div class="space-x-3 text-white">
                    <button class="bg-stone-400 hover:bg-stone-300 px-3 py-2 rounded-lg"
                      @click="cancelEditSex">ยกเลิก</button>
                    <button class="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg" @click="saveSex">บันทึก</button>
                  </div>
                </div>
              </div>
              <div class="my-4">
                <hr class="border" />
              </div>

              <!-- วันเกิด -->
              <div>
                <div class="flex justify-between items-center">
                  <div>
                    <label>วันเกิด : {{ day }} {{ month }} {{ year }}</label>
                  </div>
                  <div v-if="!isEditBirthday">
                    <button class="bg-red-400 hover:bg-red-300 px-3 py-2 rounded-lg text-white"
                      @click="startEditBirthday">แก้ไข</button>
                  </div>
                </div>
                <div v-if="isEditBirthday" class="flex justify-between  flex-col md:flex-row  items-center mt-3">
                  <div class="md:space-x-2 mt-2 space-y-2 md:space-y-0 flex flex-col md:flex-row justify-center mb-6">
                    <input v-model="editDay" class="border rounded-lg py-2 px-4 md:w-[100px]" placeholder="dd" />
                    <input v-model="editMonth" class="border rounded-lg py-2 px-4 md:w-[100px]" placeholder="mm" />
                    <input v-model="editYear" class="border rounded-lg py-2 px-4 md:w-[100px]" placeholder="yyyy" />
                  </div>
                  <div class="space-x-3 text-white">
                    <button class="bg-stone-400 hover:bg-stone-300 px-3 py-2 rounded-lg"
                      @click="cancelEditBirthday">ยกเลิก</button>
                    <button class="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg"
                      @click="saveBirthday">บันทึก</button>
                  </div>
                </div>
              </div>
              <div class="my-4">
                <hr class="border" />
              </div>

              <!-- สัญชาติ / ศาสนา -->
              <div>
                <div class="flex justify-between items-center">
                  <div>
                    <label>สัญชาติ / ศาสนา : {{ nationality }} / {{ religion }}</label>
                  </div>
                  <div v-if="!isEditNationality">
                    <button class="bg-red-400 hover:bg-red-300 px-3 py-2 rounded-lg text-white"
                      @click="startEditNationality">แก้ไข</button>
                  </div>
                </div>
                <div v-if="isEditNationality" class="flex justify-between  flex-col md:flex-row  items-center mt-3">
                  <div class="md:space-x-2 mt-2 space-y-2 md:space-y-0 flex flex-col md:flex-row justify-center mb-6">
                    <input v-model="editNationality" class="border rounded-lg py-2 px-4" placeholder="สัญชาติ" />
                    <input v-model="editReligion" class="border rounded-lg py-2 px-4" placeholder="ศาสนา" />
                  </div>
                  <div class="space-x-3 text-white">
                    <button class="bg-stone-400 hover:bg-stone-300 px-3 py-2 rounded-lg"
                      @click="cancelEditNationality">ยกเลิก</button>
                    <button class="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg"
                      @click="saveNationality">บันทึก</button>
                  </div>
                </div>
              </div>
              <div class="my-4">
                <hr class="border" />
              </div>

              <!-- ที่อยู่ -->
              <div>
                <div class="flex justify-between items-center">
                  <div>
                    <label>ที่อยู่ : {{ numberAddress }} {{ subdistrict }} {{ district }} {{ province }}</label>
                  </div>
                  <div v-if="!isEditAddress">
                    <button class="bg-red-400 hover:bg-red-300 px-3 py-2 rounded-lg text-white"
                      @click="startEditAddress">แก้ไข</button>
                  </div>
                </div>
                <div v-if="isEditAddress" class="flex justify-between  flex-col md:flex-row  items-center mt-3">
                  <div class="md:space-x-2 mt-2 space-y-2 md:space-y-0 flex flex-col md:flex-row justify-center mb-6">
                    <input v-model="editNumberAddress" class="border rounded-lg py-2 px-4 md:w-[100px]"
                      placeholder="บ้านเลขที่" />
                    <input v-model="editSubdistrict" class="border rounded-lg py-2 px-4 md:w-[100px]"
                      placeholder="ตำบล" />
                    <input v-model="editDistrict" class="border rounded-lg py-2 px-4 md:w-[100px]"
                      placeholder="อำเภอ" />
                    <input v-model="editProvince" class="border rounded-lg py-2 px-4 md:w-[100px]"
                      placeholder="จังหวัด" />
                  </div>
                  <div class="space-x-3 text-white">
                    <button class="bg-stone-400 hover:bg-stone-300 px-3 py-2 rounded-lg"
                      @click="cancelEditAddress">ยกเลิก</button>
                    <button class="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg"
                      @click="saveAddress">บันทึก</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Bar from "@components/BarMember.vue";
import Footer from "@components/FooterLoneTossagun.vue";
import BarProfileMember from "@components/BarProfileMember.vue";
import { useRouter } from 'vue-router';

import FloatInput from '@/components/element/FloatInput.vue'
const router = useRouter();

import { ref } from 'vue'

// ข้อมูล mock ตัวอย่าง
const firstName = ref('สมชาย')
const lastName = ref('ใจดี')
const email = ref('somchai@email.com')
const phone = ref('0812345678')
const sex = ref('ชาย')
const day = ref('1')
const month = ref('มกราคม')
const year = ref('2530')
const nationality = ref('ไทย')
const religion = ref('พุทธ')
const numberAddress = ref('123/45')
const subdistrict = ref('บางรัก')
const district = ref('บางรัก')
const province = ref('กรุงเทพมหานคร')

// state แยกแต่ละ section
const isEditName = ref(false)
const isEditEmail = ref(false)
const isEditPhone = ref(false)
const isEditSex = ref(false)
const isEditBirthday = ref(false)
const isEditNationality = ref(false)
const isEditAddress = ref(false)

// ตัวแปรสำหรับแก้ไข (copy ข้อมูลเดิมมาแก้)
const editFirstName = ref('')
const editLastName = ref('')
const editEmail = ref('')
const editPhone = ref('')
const editSex = ref('')
const editDay = ref('')
const editMonth = ref('')
const editYear = ref('')
const editNationality = ref('')
const editReligion = ref('')
const editNumberAddress = ref('')
const editSubdistrict = ref('')
const editDistrict = ref('')
const editProvince = ref('')

// ตัวอย่างชื่อโปรไฟล์เริ่มต้น
const nameProfile = ref('สมชายใจดี');
const isEditProfile = ref(false);
const editNameProfile = ref(nameProfile.value);

function editProfile() {
  isEditProfile.value = true;
  editNameProfile.value = nameProfile.value;
}
function cancelEditProfile() {
  isEditProfile.value = false;
}
function saveProfile() {
  if (editNameProfile.value.trim()) {
    nameProfile.value = editNameProfile.value.trim();
    isEditProfile.value = false;
  }
}

// ฟังก์ชันสำหรับแต่ละ section
function editName() {
  isEditName.value = true;
  editFirstName.value = firstName.value
  editLastName.value = lastName.value
  editProfileName.value = profileName.value;
}
function cancelEditName() {
  isEditName.value = false
}
function saveName() {
  firstName.value = editFirstName.value
  lastName.value = editLastName.value
  if (editProfileName.value.trim()) {
    profileName.value = editProfileName.value.trim();
  }
  isEditName.value = false
}

function startEditEmail() {
  editEmail.value = email.value
  isEditEmail.value = true
}
function cancelEditEmail() {
  isEditEmail.value = false
}
function saveEmail() {
  email.value = editEmail.value
  isEditEmail.value = false
}

function startEditPhone() {
  editPhone.value = phone.value
  isEditPhone.value = true
}
function cancelEditPhone() {
  isEditPhone.value = false
}
function savePhone() {
  phone.value = editPhone.value
  isEditPhone.value = false
}

function startEditSex() {
  editSex.value = sex.value
  isEditSex.value = true
}
function cancelEditSex() {
  isEditSex.value = false
}
function saveSex() {
  sex.value = editSex.value
  isEditSex.value = false
}

function startEditBirthday() {
  editDay.value = day.value
  editMonth.value = month.value
  editYear.value = year.value
  isEditBirthday.value = true
}
function cancelEditBirthday() {
  isEditBirthday.value = false
}
function saveBirthday() {
  day.value = editDay.value
  month.value = editMonth.value
  year.value = editYear.value
  isEditBirthday.value = false
}

function startEditNationality() {
  editNationality.value = nationality.value
  editReligion.value = religion.value
  isEditNationality.value = true
}
function cancelEditNationality() {
  isEditNationality.value = false
}
function saveNationality() {
  nationality.value = editNationality.value
  religion.value = editReligion.value
  isEditNationality.value = false
}

function startEditAddress() {
  editNumberAddress.value = numberAddress.value
  editSubdistrict.value = subdistrict.value
  editDistrict.value = district.value
  editProvince.value = province.value
  isEditAddress.value = true
}
function cancelEditAddress() {
  isEditAddress.value = false
}
function saveAddress() {
  numberAddress.value = editNumberAddress.value
  subdistrict.value = editSubdistrict.value
  district.value = editDistrict.value
  province.value = editProvince.value
  isEditAddress.value = false
}
</script>
