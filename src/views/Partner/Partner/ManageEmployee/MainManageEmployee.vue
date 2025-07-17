<template>
  <TemplatePartner>
    <template #header>
      <label>จัดการพนักงาน</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div class="flex justify-center md:justify-start py-4 md:py-0">
          <label class="text-3xl font-semibold">พนักงานทั้งหมด</label>
        </div>

        <div class="flex flex-col md:flex-row md:justify-between items-start md:space-x-4 mt-8">
          <div class="md:w-1/2 flex flex-col 2xl:flex-row 2xl:justify-between items-start  2xl:space-x-4 w-full">
            <!-- ตารางแสดงข้อมูลพนักงาน -->
            <div class="w-full">
              <table class="min-w-full border border-gray-300 rounded overflow-hidden">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="px-3 py-2 border">ลำดับ</th>
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
                    <td colspan="9" class="text-center py-4">กำลังโหลดข้อมูล...</td>
                  </tr>
                  <tr v-else-if="employees.length === 0">
                    <td colspan="9" class="text-center py-4">ไม่มีข้อมูลพนักงาน</td>
                  </tr>
                  <tr v-for="(emp, idx) in employees" :key="emp._id">
                    <td class="border px-2 py-1 text-center">{{ idx + 1 }}</td>
                    <td class="border px-2 py-1">{{ emp.firstname || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.lastname || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.nickname || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.sex || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.statusByPartner }}</td>
                    <td class="border px-2 py-1">{{ emp.phone || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.email || '-' }}</td>
                    <td class="border px-2 py-1">{{ emp.username }}</td>
                    <td class="border px-2 py-1 text-center">
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

const { t } = useI18n()
const router = useRouter()

const employees = ref([])
const loading = ref(true)

async function fetchEmployees() {
  loading.value = true
  try {
    const res = await fetch('http://localhost:9999/HotelSleepGun/employee/getAll')
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
  if (!confirm('คุณต้องการลบพนักงานคนนี้ใช่หรือไม่?')) return
  try {
    const res = await fetch(`http://localhost:9999/HotelSleepGun/employee/delete${id}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    if (res.ok) {
      alert('ลบพนักงานสำเร็จ')
      fetchEmployees()
    } else {
      alert(data.message || 'เกิดข้อผิดพลาดในการลบพนักงาน')
    }
  } catch (err) {
    alert('เกิดข้อผิดพลาดในการเชื่อมต่อ API')
  }
}
</script>
