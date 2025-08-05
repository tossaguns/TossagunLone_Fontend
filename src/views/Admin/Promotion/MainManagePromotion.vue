<template>
  <TemplateAdmin>
    <template #header>
      <label>จัดการโปรโมชัน</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">

        <div class="flex justify-center pt-7 mb-5">
          <button @click="navigateToAddPromotion" class="rounded-lg px-2 py- text-lg hover:bg-emerald-500 shadow-lg">
            + เพิ่มโปรโมชั่น
          </button>

        </div>

        <!-- เพิ่ม wrapper -->

        <div class="overflow-x-auto px-2 ">
          <table
            class="responsive-table-mainpromotion w-full table-auto border-separate border-spacing-0 text-xs md:text-sm ">
            <thead>
              <tr class="bg-gray-200 whitespace-nowrap">
                <th class="col-no border px-2 py-1 rounded-tl-xl">ลำดับ</th>
                <th class="border px-2 py-1">ชื่อ โปรโมชั่น</th>
                <th class="col-detail border px-2 py-1">รายละเอียด</th>
                <th class="border px-2 py-1">ราคา</th>
                <th class="col-reducedprice border px-2 py-1">ราคาลด</th>
                <th class="col-percentprice border px-2 py-1">เปอร์เซ็นต์ส่วนลด</th>
                <th class="border px-2 py-1">ราคาที่ลดเเล้ว</th>
                <th class="col-start border px-2 py-1">วันเริ่มโปรโมชั่น</th>
                <th class="col-finish border px-2 py-1">วันสิ้นสุดโปรโมชั่น</th>
                <th class="border px-2 py-1">ผู้ทำการอัปเดต</th>
                <th class="col-updated border px-2 py-1">วันเวลาที่อัปเดต</th>
                <th class="px-2 py-2 border sm:px-3 sm:py-3 rounded-tr-xl">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in promotion" :key="item._id" class="hover:bg-gray-50 whitespace-nowrap">
                <td class="col-no border px-2 py-1">{{ index + 1 }}</td>
                <td class="border px-2 py-1">{{ item.name }}</td>
                <td class="col-detail border px-2 py-1"
                  style="max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                  :title="item.detail">
                  {{ item.detail }}
                </td>
                <td class="border px-2 py-1">{{ item.price }}</td>
                <td class="col-reducedprice border px-2 py-1">{{ item.reducedPrice ?? '-' }}</td>
                <td class="col-percentprice border px-2 py-1">{{ item.percentPrice ?? '-' }}</td>
                <td class="border px-2 py-1">{{ item.finalPrice }}</td>
                <td class="col-start border px-2 py-1">{{ item.dateReducedPercentPriceStart ?
                  item.dateReducedPercentPriceStart.slice(0, 10) :
                  '-' }}</td>
                <td class="col-finish border px-2 py-1">{{ item.dateReducedPercentPriceFinish ?
                  item.dateReducedPercentPriceFinish.slice(0, 10)
                  : '-' }}</td>

                <td class="border px-2 py-1">{{ item.nameUpdate ?? '-' }}</td>
                <td class="col-updated border px-2 py-1">{{ item.updatedAt ? item.updatedAt.slice(0, 10) : '-' }}</td>
                <td class="border px-2 py-1 space-x-2">
                  <button @click="detailRoom(item._id)"
                    class="text-white bg-emerald-700 px-2 py-2 rounded-lg hover:bg-emerald-500 shadow-lg transition">
                    👁️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </TemplateAdmin>
  <!-- เนื้อหา Modal Preview -->
  <div v-if="showPreviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="showPreviewModal = false">
    <div class="py-8 mx-auto mt2 sm:mt-6 rounded-lg shadow-lg border-2 bg-white relative w-full max-w-[285px]">
      <!-- ปุ่มกากบาท -->
      <button class="absolute top-2 right-2 text-gray-400 hover:text-red-600 text-2xl font-bold"
        @click="showPreviewModal = false" aria-label="ปิด">×</button>
      <!-- หัวโปรโมชั่น -->
      <div class="py-4 text-center font-bold text-lg break-all whitespace-pre-wrap text-gray-400">
        {{ selectedPromotion?.name || 'ชื่อโปรโมชั่น' }}
      </div>
      <!-- เนื้อหาข้างใน -->
      <div>
        <div class="bg-white px-2 pb-2 sm:pb-6 space-y-2 text-gray-700">
          <!-- ถ้ามีลดราคา -->
          <div v-if="selectedPromotion?.wantToReduce === 'yesReduced' && (
            (selectedPromotion?.discountType === 'reduced' && selectedPromotion?.price && selectedPromotion?.reducedPrice) ||
            (selectedPromotion?.discountType === 'percent' && selectedPromotion?.price && selectedPromotion?.percentPrice)
          )" class="text-center mt-2">
            <div class="flex flex-col justify-center items-center">
              <span class="text-xl text-gray-400 line-through mr-2">
                {{ selectedPromotion.price }}
              </span>
              <span class="text-4xl font-bold text-red-600 align-middle">
                <!-- ลดราคาบาท -->
                <template v-if="selectedPromotion.discountType === 'reduced'">
                  {{ Number(selectedPromotion.price) - Number(selectedPromotion.reducedPrice) }}
                </template>
                <!-- ลดราคาคิดเป็น % -->
                <template v-else-if="selectedPromotion.discountType === 'percent'">
                  {{ (Number(selectedPromotion.price) - (Number(selectedPromotion.price) *
                    Number(selectedPromotion.percentPrice) / 100)).toFixed(2) }}
                </template>
              </span>
            </div>
            <div>
              <span class="text-sm font-thin text-gray-400">บาท / คน / บัญชี</span>
            </div>
          </div>
          <!-- ถ้าไม่มีลดราคา -->
          <div v-else class="text-3xl font-bold text-center text-gray-900">
            {{ selectedPromotion?.price || '0' }} <br>
            <span class="text-sm font-thin text-gray-400">บาท / คน / บัญชี</span>
          </div>
          <ul class="list-none space-y-1 mt-4">
            <div class="bg-gray-200 p-3 mx-3 my-5 rounded-md max-h-60 overflow-y-auto">
              <li v-for="(line, index) in (selectedPromotion?.detail?.split('\n') || [])" :key="index"
                class="flex items-start">
                <span class="mr-2">✔</span>
                <span class="break-all whitespace-pre-wrap w-0 flex-1 text-gray-700">{{ line }}</span>
              </li>
            </div>
            <li class="flex px-6 items-center mt-5">
              <span class="mr-2 mt-1">📅</span>
              <span class="text-sm">เริ่ม: {{ selectedPromotion?.dateStart ? selectedPromotion.dateStart.slice(0,
                10)
                : '-'
              }}</span>
            </li>
            <li class="flex px-6 items-center">
              <span class="mr-2 mt-1">📅</span>
              <span class="text-sm">สิ้นสุด: {{ selectedPromotion?.dateFinish ?
                selectedPromotion.dateFinish.slice(0, 10) : '-'
              }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex justify-center space-x-4 mt-4 mb-3">
        <button @click="editPromotion"
          class="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 shadow-md transition">
          แก้ไข
        </button>
        <button @click="deletePromotion"
          class="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 shadow-md transition">
          ลบ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import TemplateAdmin from "@/components/TemplateAdmin.vue";
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'


const showPreviewModal = ref(false)
const selectedPromotion = ref(null)
const router = useRouter()

const promotion = ref([]) // ลบข้อมูลตัวอย่างออก



function navigateToAddPromotion() {
  router.push("/addpromotion")
}

function detailRoom(promotionId) {
  const found = promotion.value.find(p => p._id === promotionId)
  if (found) {
    selectedPromotion.value = { ...found }
    showPreviewModal.value = true
  }
}

function editPromotion() {
  // ไปหน้าแก้ไข (ส่ง id ไปด้วย)
  router.push(`/editpromotion/${selectedPromotion.value._id}`)
}

async function deletePromotion() {
  const result = await Swal.fire({
    title: 'ยืนยันการลบ',
    text: 'คุณต้องการลบโปรโมชั่นนี้ใช่หรือไม่?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ลบ',
    cancelButtonText: 'ยกเลิก'
  })
  if (result.isConfirmed) {
    try {
      const res = await fetch(`http://localhost:9999/HotelSleepGun/promotion/delete/${selectedPromotion.value._id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('ลบไม่สำเร็จ')
      showPreviewModal.value = false
      promotion.value = promotion.value.filter(p => p._id !== selectedPromotion.value._id)
      Swal.fire('ลบสำเร็จ', '', 'success')
    } catch (err) {
      Swal.fire('เกิดข้อผิดพลาด', err.message, 'error')
    }
  }
}

// ดึงข้อมูลโปรโมชั่นจาก backend
onMounted(async () => {

  try {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:9999/HotelSleepGun/promotion/getAll', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    promotion.value = data
  } catch (err) {
    alert('ไม่สามารถโหลดข้อมูลโปรโมชั่นได้')
  }
})
</script>

<style>
.responsive-table-mainpromotion {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.responsive-table-mainpromotion th,
.responsive-table-mainpromotion td {
  border: 1px solid #ccc;
  padding: 6px;
  text-align: center;
}

/* ✅ ซ่อนคอลัมน์เมื่อหน้าจอเล็ก */
@media (max-width: 1300px) {
  .col-no {
    display: none;
  }
}

@media (max-width: 1250px) {
  .col-finish {
    display: none;
  }
}

@media (max-width: 1135px) {
  .col-start {
    display: none;
  }
}

@media (max-width: 1030px) {
  .col-updated {
    display: none;
  }
}

@media (max-width: 930px) {
  .col-percentprice {
    display: none;
  }

  .col-reducedprice {
    display: none;
  }
}

@media (max-width: 460px) {
  .col-detail {
    display: none;
  }

  .responsive-table-mainpromotion th:nth-child(1),
  .responsive-table-mainpromotion td:nth-child(1) {
    display: none;
    /* ซ่อนลำดับ */
  }
}
</style>