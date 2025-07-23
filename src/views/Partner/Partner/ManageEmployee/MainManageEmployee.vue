<template>
  <TemplatePartner>
    <template #header>
      <label>จัดการพนักงาน</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div class="flex justify-center md:justify-start py-4 md:py-0">
          <label class="text-3xl font-semibold">รายชื่อพนักงานทั้งหมด</label>
        </div>


        <div class="mt-12 mb-6 flex justify-center md:justify-end md:mx-8">
          <buton @click="goToAddEmployee" class="text-white bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg">
            เพิ่มพนักงาน</buton>
        </div>

        <div class="">
          <!-- ตารางแสดงข้อมูลพนักงาน (เฉพาะหน้าจอ xl ขึ้นไป) -->
          <div class=" hidden xl:block w-full">
            <div class="w-full overflow-x-auto border p-3 rounded-lg shadow">
              <table class=" min-w-max border border-gray-300 rounded overflow-hidden ">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="px-3 py-2 border">ลำดับ</th>
                    <th class="px-3 py-2 border">รูป</th>
                    <th class="px-3 py-2 border">ตำเเหน่ง</th>
                    <th class="px-3 py-2 border">ชื่อ</th>
                    <th class="px-3 py-2 border">นามสกุล</th>
                    <th class="px-3 py-2 border">ชื่อเล่น</th>
                    <th class="px-3 py-2 border">เพศ</th>
                    <th class="px-3 py-2 border">สถานะ</th>
                    <th class="px-3 py-2 border">เบอร์โทร</th>
                    <th class="px-3 py-2 border">อีเมล</th>
                    <th class="px-3 py-2 border">Username</th>
                    <th class="px-3 py-2 border">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td colspan="11" class="text-center py-4">กำลังโหลดข้อมูล...</td>
                  </tr>
                  <tr v-else-if="employees.length === 0">
                    <td colspan="11" class="text-center py-4">ไม่มีข้อมูลพนักงาน</td>
                  </tr>
                  <tr v-for="(emp, idx) in employees" :key="emp._id">
                    <td class="border px-2 py-1 text-center">{{ idx + 1 }}</td>
                    <td class="border px-2 py-1">{{ emp.imageIden || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.positionEmployee || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.firstname || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.lastname || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.nickname || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.sex || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.statusByPartner }}</td>
                    <td class="border px-2 py-1">{{ emp.phone || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.email || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.username }}</td>
                    <td class="border px-2 py-1 text-center flex">
                      <button class="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded mr-1"
                        @click="editEmployee(emp._id)">แก้ไข</button>
                      <button class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                        @click="deleteEmployee(emp._id)">ลบ</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Card แสดงข้อมูลพนักงาน (เฉพาะหน้าจอเล็กกว่า lg) -->
          <div class="block xl:hidden">
            <div v-if="loading" class="text-center py-4">กำลังโหลดข้อมูล...</div>
            <div v-else-if="employees.length === 0" class="text-center py-4">ไม่มีข้อมูลพนักงาน</div>
            <div v-else class="grid grid-cols-1 gap-4">
              <div v-for="(emp, idx) in employees" :key="emp._id"
                class="border rounded-lg shadow p-4 flex flex-col gap-2">
                <div class="flex items-center justify-between">
                  <div class="font-bold text-lg">{{ idx + 1 }}. {{ emp.firstname || '-' }} {{ emp.lastname || '-' }}
                  </div>
                  <div class="flex gap-2">
                    <button class="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                      @click="editEmployee(emp._id)">แก้ไข</button>
                    <button class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      @click="deleteEmployee(emp._id)">ลบ</button>
                  </div>
                </div>
                <div class="h-24 w-24">{{ emp.imageIden || '-' }}</div>
                <div><span class="font-semibold">ตำแหน่ง:</span> {{ emp.positionEmployee || '-' }}</div>
                <div><span class="font-semibold">ชื่อเล่น:</span> {{ emp.nickname || '-' }}</div>
                <div><span class="font-semibold">เพศ:</span> {{ emp.sex || '-' }}</div>
                <div><span class="font-semibold">สถานะ:</span> {{ emp.statusByPartner }}</div>
                <div><span class="font-semibold">เบอร์โทร:</span> {{ emp.phone || '-' }}</div>
                <div><span class="font-semibold">อีเมล:</span> {{ emp.email || '-' }}</div>
                <div><span class="font-semibold">Username:</span> {{ emp.username }}</div>
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
import Swal from 'sweetalert2'

const { t } = useI18n()
const router = useRouter()

const employees = ref([])
const loading = ref(true)



function goToAddEmployee() {
  router.push('/addemployee')
}


async function fetchEmployees() {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:9999/HotelSleepGun/employee/getAll', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    employees.value = Array.isArray(data) ? data : []
  } catch (e) {
    employees.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchEmployees)

function editEmployee(id) {
  router.push(`/editemployee/${id}`)
}

async function deleteEmployee(id) {
  const result = await Swal.fire({
    title: 'ยืนยันการลบพนักงาน?',
    text: 'คุณต้องการลบพนักงานคนนี้ใช่หรือไม่?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก'
  })
  if (!result.isConfirmed) return
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:9999/HotelSleepGun/employee/delete${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    if (res.ok) {
      await Swal.fire({
        icon: 'success',
        title: 'ลบพนักงานสำเร็จ',
        showConfirmButton: false,
        timer: 1200
      })
      fetchEmployees()
    } else {
      Swal.fire({
        icon: 'error',
        title: data.message || 'เกิดข้อผิดพลาดในการลบพนักงาน',
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
