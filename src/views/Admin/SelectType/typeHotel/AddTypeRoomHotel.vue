<template>
  <!--================ TypeRoomHotel ======================-->
  <div>
    <div class="mb-4 text-lg font-bold text-stone-700">
      <p>4. สิ่งอำนวยความสะดวกภายในห้อง</p>
    </div>

    <!-- ฟอร์มเพิ่ม -->

    <div class="max-w-5xl mx-auto border rounded-lg shadow-md">
      <div class="px-4 py-6 ">
        <form @submit.prevent="createFacility" class="space-y-4 mb-8">
          <div>
            <label class="font-semibold">ที่พักประเภท</label>
            <input v-model="addForm.name" type="text"
              class="border w-full py-2 px-2 rounded-md mt-1 border-stone-300 hover:border-stone-600"
              placeholder="ชื่อ..." required />
          </div>

          <div>
            <label class="font-semibold">คำอธิบาย</label>
            <input v-model="addForm.description" type="text"
              class="border w-full py-2 px-2 rounded-md mt-1 border-stone-300 hover:border-stone-600"
              placeholder="คำอธิบาย..." />
          </div>



          <div class="w-full  flex justify-center items-center flex-col space-y-4 pt-3">
            <div class="w-32 h-32 relative">

              <!-- ช่องอัปโหลด (กล่องกรอบสี่เหลี่ยม) -->
              <label for="add-file-upload"
                class="absolute inset-0 border-2 border-dashed border-gray-400 rounded flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition z-10"
                v-if="!addPreview">
                + เลือกรูปภาพ
              </label>

              <!-- input ที่ซ่อน -->
              <input id="add-file-upload" type="file" accept="image/*" @change="onAddFileChange" ref="addFileInput"
                class="hidden" />

              <!-- รูป preview แสดงทับ label -->
              <div v-if="addPreview" class="absolute inset-0 z-20">
                <img :src="addPreview" alt="Preview" class="w-full h-full object-cover rounded" />
                <!-- ปุ่มลบรูป -->
                <button @click="removeAddPreview"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  title="ลบรูป">
                  ✕
                </button>
              </div>
            </div>
            <div>
              <button type="submit" class="bg-stone-600 rounded-lg 
                        px-4 py-2 text-white hover:bg-stone-700 transition">เพิ่มสิ่งอำนวยความสะดวกภายในห้อง</button>
            </div>
          </div>
        </form>


        <!-- ฟอร์มแก้ไข (แสดงเฉพาะตอนกดแก้ไข) -->
        <div v-if="isEditing" ref="editFormSection"
          class="mt-8 border-t max-w-2xl mx-auto rounded-lg border px-4 py-5 mb-8 shadow-lg bg-stone-50">
          <h2 class="text-xl font-semibold mb-2 text-stone-700 text-center">แก้ไขสิ่งอำนวยความสะดวกภายในห้อง
          </h2>
          <form @submit.prevent="updateFacility" class="space-y-4">
            <div>
              <label class="font-semibold text-sm">ชื่อสิ่งอำนวยความสะดวก</label>
              <input v-model="editForm.name" type="text" class="input" placeholder="ชื่อ..." required />
            </div>

            <div>
              <label class="font-semibold text-sm">คำอธิบาย</label>
              <input v-model="editForm.description" type="text" class="input" placeholder="คำอธิบาย..." />
            </div>

            <div>
              <label class="font-semibold text-left text-sm">แก้ไขไอคอน</label>
              <div class="flex justify-center flex-coll bg-white w-full rounded-lg py-4">
                <div class="relative w-40">

                  <input type="file" accept="image/*" @change="onEditFileChange" ref="editFileInput" class="mt-1" />

                  <!-- รูป Preview -->
                  <div v-if="editPreview" class="mt-2 relative">
                    <img :src="editPreview" alt="Icon Preview" class="w-32 h-32 object-cover rounded border" />

                    <!-- ปุ่มกากบาท -->
                    <button @click="removeEditPreview"
                      class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      title="ลบรูป">
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>



            <div class="pt-10 space-x-2 flex justify-center">
              <button type="submit" class="bg-stone-400 rounded-lg 
                        px-4 py-2  hover:bg-stone-500 transition">อัปเดตข้อมูล</button>
              <button @click="resetForm" type="button" class="bg-red-400 rounded-lg 
                        px-4 py-2  hover:bg-red-500 transition">ยกเลิก</button>
            </div>
          </form>
        </div>


        <!-- ตารางรายการ -->
        <!-- TABLE: สำหรับ desktop -->
        <div>
          <div class="hidden md:block">
            <table class="min-w-full shadow-md">
              <thead>
                <tr class="bg-stone-700 text-white text-center text-sm">
                  <th class="p-2 rounded-tl-md">ชื่อ</th>
                  <th class="p-2">คำอธิบาย</th>
                  <th class="p-2">Icon</th>
                  <th class="p-2 rounded-tr-md">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in paginated" :key="item._id"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-stone-50'" class="border-t">
                  <td class="p text-center align-middle">{{ item.name }}</td>
                  <td class="p-2 text-gray-500 text-sm text-left break-words whitespace-pre-line max-w-md">
                    {{ item.description }}
                  </td>
                  <td class="p-2">
                    <img :src="`http://localhost:9999/uploads/icons/${item.icon}`" alt="icon"
                      class="h-10 mx-auto rounded" />
                  </td>
                  <td class="p-2 flex justify-center space-x-2">
                    <button class="btn btn-sm btn-blue" @click="editFacility(item)">แก้ไข</button>
                    <button class="btn btn-sm btn-red" @click="deleteFacility(item._id)">ลบ</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- CARD: สำหรับมือถือ -->
          <div class="block md:hidden space-y-2">
            <div v-for="item in paginated" :key="item._id" class="bg-white rounded-lg shadow-md p-4 border">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-bold">{{ item.name }}</h3>
                <img :src="`http://localhost:9999/uploads/icons/${item.icon}`" alt="icon" class="h-14 rounded-full" />
              </div>
              <p class="text-gray-600 mt-2 whitespace-pre-line break-words">{{ item.description }}</p>
              <div class="flex justify-end space-x-2 mt-4">
                <button class="btn btn-sm btn-blue" @click="editFacility(item)">แก้ไข</button>
                <button class="btn btn-sm btn-red" @click="deleteFacility(item._id)">ลบ</button>
              </div>
            </div>
          </div>
        </div>



        <!-- Pagination Controls -->
        <div class="mt-4 flex justify-center space-x-2 text-gray-400">
          <button class="" :disabled="currentPage === 1" @click="currentPage--">
            <p class="text-xs mr-3 hover:text-stone-900 hover:text-sm transition">ก่อนหน้า</p>
          </button>

          <button v-for="page in totalPages" :key="page" class="px-2 rounded-full "
            :class="page === currentPage ? 'bg-stone-700 text-white hover:bg-stone-600 transition' : 'bg-gray-100'"
            @click="goToPage(page)">
            {{ page }}
          </button>

          <button class="" :disabled="currentPage === totalPages" @click="currentPage++">
            <p class="text-xs ml-3 hover:text-stone-900 hover:text-sm transition">ถัดไป</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();


//============== TypeRoomHotel  =================

const item = ref([])
const currentPage = ref(1)
const itemsPerPage = 10

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const totalPages = computed(() => Math.ceil(item.value.length / itemsPerPage))
const paginated = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return item.value.slice(start, start + itemsPerPage)
})
const isEditing = ref(false)
const addPreview = ref(null)
const editPreview = ref(null)
const selectedId = ref(null)


const addForm = ref({
  name: '',
  description: '',
  iconFile: null,
})

const editForm = ref({
  id: null,
  name: '',
  description: '',
  iconFile: null,
  icon: null,
})


const fetch = async () => {
  try {
    const res = await axios.get('http://localhost:9999/HotelSleepGun/typeRoomHotel/getAll')
    item.value = res.data
    currentPage.value = 1
  } catch (err) {
    console.error(err)
  }
}
const createFacility = async () => {
  try {
    const fd = new FormData()
    fd.append('name', addForm.value.name)
    fd.append('description', addForm.value.description)
    if (addForm.value.iconFile) fd.append('icon', addForm.value.iconFile)

    await axios.post('http://localhost:9999/HotelSleepGun/typeRoomHotel/create', fd)
    alert('เพิ่มสิ่งอำนวยความสะดวกภายในห้องเรียบร้อยแล้ว')
    resetForm()
    fetch()
  } catch (err) {
    console.error(err)
  }
}

const editFacility = async (item) => {
  isEditing.value = true
  selectedId.value = item._id
  editForm.value.id = item._id
  editForm.value.name = item.name
  editForm.value.description = item.description
  editForm.value.iconFile = null
  editForm.value.icon = item.icon
  editPreview.value = `http://localhost:9999/uploads/icons/${item.icon}`

  //สกอไป edit เพิ่ม
  await nextTick()
  editFormSection.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}



const updateFacility = async () => {
  try {
    const fd = new FormData()
    fd.append('name', editForm.value.name)
    fd.append('description', editForm.value.description)
    if (editForm.value.iconFile instanceof File) fd.append('icon', editForm.value.iconFile)

    await axios.put(`http://localhost:9999/HotelSleepGun/typeRoomHotel/update/${selectedId.value}`, fd)
    alert('อัปเดตสิ่งอำนวนความสะดวกภายในห้องเรียบร้อยแล้ว')
    resetForm()
    fetch()
  } catch (err) {
    console.error(err)
  }
}

const deleteFacility = async (id) => {
  if (!confirm('คุณต้องการลบใช่หรือไม่?')) return
  try {
    await axios.delete(`http://localhost:9999/HotelSleepGun/typeRoomHotel/delete/${id}`)
    fetch()
  } catch (err) {
    console.error(err)
  }
}

function onAddFileChange(e) {
  const file = e.target.files[0]
  addForm.value.iconFile = file
  if (file) {
    addPreview.value = URL.createObjectURL(file)
  } else {
    addPreview.value = null
  }
}

function onEditFileChange(e) {
  const file = e.target.files[0]
  editForm.value.iconFile = file
  if (file) {
    editPreview.value = URL.createObjectURL(file)
  } else {
    if (editForm.value.icon) {
      editPreview.value = `http://localhost:9999/uploads/icons/${editForm.value.icon}`
    } else {
      editPreview.value = null
    }
  }
}
const resetForm = () => {
  isEditing.value = false
  addForm.value = { name: '', description: '', iconFile: null }
  editForm.value = { id: null, name: '', description: '', iconFile: null }
  addPreview.value = null
  editPreview.value = null
}


//======== เพิ่มมา ==========
const editFormSection = ref(null)

const addFileInput = ref(null)
const editFileInput = ref(null)

function removeAddPreview() {
  addForm.value.iconFile = null
  addPreview.value = null
  addFileInput.value.value = '' // reset file input
}

function removeEditPreview() {
  editForm.value.iconFile = null
  editPreview.value = editForm.value.icon
    ? `http://localhost:9999/uploads/icons/${editForm.value.icon}`
    : null
  editFileInput.value.value = ''
}

// โหลดข้อมูลตอน component mounted
onMounted(() => {
  fetch();
});
</script>



<style scoped>
.input {
  @apply w-full p-2 border border-gray-300 rounded;
}

.btn {
  @apply px-4 py-2 rounded text-white cursor-pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  @apply bg-green-600 hover:bg-green-700;
}

.btn-secondary {
  @apply bg-gray-500 hover:bg-gray-600 disabled:opacity-50 cursor-not-allowed;
}

.btn-blue {
  @apply bg-blue-500 hover:bg-blue-600;
}

.btn-red {
  @apply bg-red-500 hover:bg-red-600;
}

.btn-sm {
  @apply px-2 py-1 text-sm;
}
</style>