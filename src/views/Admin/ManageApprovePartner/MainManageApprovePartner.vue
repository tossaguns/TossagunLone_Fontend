<template>
  <TemplateAdmin>
    <template #header>
      <label>จัดการคำขอสมัครพาร์ทเนอร์</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">

        <div class="my-6 flex flex-row justify-start items-center w-full">
          <div class="flex flex-row items-center w-full">
            <label class="mr-4">ค้นหาวันที่ :</label>
            <DateSearch />
          </div>

          <div class="flex flex-row items-center w-full">
            <label>ค้นหาด้วยชื่อ :</label>
            <div class="p-4">
              <SearchInput v-model="searchText" />
              <!-- ลบ <ul>...</ul> ที่แสดงรายชื่อบริษัทใต้ช่องค้นหา -->
            </div>
          </div>
        </div>

        <div class="overflow-x-auto px-2 ">
          <table class="responsive-table w-full border border-collapse text-xs md:text-sm ">
            <thead>
              <tr class="bg-gray-200 whitespace-nowrap">
                <th class="border px-2 py-1">ลำดับ</th>
                <th class="col-img border px-2 py-1">รูปที่พักด้านนอก</th>
                <th class="border px-2 py-1">ชื่อบริษัท</th>
                <th class="col-hotel border px-2 py-1">ชื่อที่พัก</th>
                <th class="border px-2 py-1">ชื่อผู้สมัคร</th>
                <th class="border px-2 py-1">นามสกุลผู้สมัคร</th>
                <th class="col-email border px-2 py-1">อีเมล</th>
                <th class="col-phone border px-2 py-1">เบอร์โทร</th>
                <th class="col-date border px-2 py-1">วัน/เวลาที่สมัคร</th>
                <th class="border px-2 py-1">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(partner, index) in paginatedData" :key="partner._id"
                class="hover:bg-gray-50 whitespace-nowrap">
                <td class="border px-2 py-1 break-words">{{ getRowNumber(index) }}</td>
                <td class="col-img border px-2 py-1 break-words">
                  <img :src="partner.imagehotelOurdoor" :alt="partner.companyName + 'imagehotelOurdoor'"
                    class="w-10 h-10 rounded-full object-cover">
                </td>
                <td class="border px-2 py-1 break-words">{{
                  partner.companyName }}</td>
                <td class="col-hotel border px-2 py-1 break-words">{{
                  partner.hotelName }}</td>
                <td class="border px-2 py-1 break-words">{{ partner.firstname
                }}</td>
                <td class="border px-2 py-1 break-words">{{ partner.lastname
                }}</td>


                <td class="col-email border px-2 py-1 break-words">{{ partner.email }}
                </td>
                <td class="col-phone border px-2 py-1 break-words">{{ partner.phone }}
                </td>
                <td class="col-date border px-2 py-1 break-words">{{ partner.updatedAt }}
                </td>
                <td class="border px-2 py-1 break-words">
                  <div class="flex gap-2 justify-center">

                    <button @click="navigateToDetailPartnerAdmin(partner._id, index + 1)"
                      class="bg-blue-300 rounded-full text-sm px-2 py-2">ข้อมูลเพิ่มเติม</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="mt-3 flex flex-wrap justify-center gap-2 px-4">
          <button @click="currentPage--" :disabled="currentPage === 1"
            class="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50">
            ย้อนกลับ
          </button>
          <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="px-3 py-1 border rounded"
            :class="{ 'bg-emerald-500 text-white': currentPage === page }">
            {{ page }}
          </button>
          <button @click="currentPage++" :disabled="currentPage === totalPages"
            class="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50">
            ถัดไป
          </button>
        </div>

        <!-- ปุ่มย้อนกลับ -->
        <div class="flex justify-center mt-8 px-4">
          <button @click="navigateBackToMainPartner"
            class="text-white bg-red-700 px-3 py-2 rounded-lg hover:bg-red-500">
            ย้อนกลับ
          </button>
        </div>
      </div>

    </template>
  </TemplateAdmin>
</template>

<script setup>

import TemplateAdmin from "@/components/TemplateAdmin.vue";
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import SearchInput from '@/components/element/SearchInput.vue';
import DateSearch from '@/components/element/DateSearch.vue';


const searchText = ref('');
const partnerApplications = ref([]); // เพิ่มกลับเข้ามาใหม่

onMounted(async () => {
  const res = await axios.get('http://localhost:9999/HotelSleepGun/adminApprovePartner/getAllPendingPartners');
  partnerApplications.value = res.data;
});

// เพิ่ม filteredPartners สำหรับกรองข้อมูลตาม searchText
const filteredPartners = computed(() => {
  if (!searchText.value) return partnerApplications.value;
  const lower = searchText.value.toLowerCase();
  return partnerApplications.value.filter(item =>
    (item.name && item.name.toLowerCase().includes(lower)) ||
    (item.hotelName && item.hotelName.toLowerCase().includes(lower)) ||
    (item.companyName && item.companyName.toLowerCase().includes(lower)) ||
    (item.firstname && item.firstname.toLowerCase().includes(lower)) ||
    (item.lastname && item.lastname.toLowerCase().includes(lower)) ||
    (item.email && item.email.toLowerCase().includes(lower))
  );
});


const router = useRouter()
const currentPage = ref(1)
const itemsPerPage = 10


function getRowNumber(index) {
  return (currentPage.value - 1) * itemsPerPage + index + 1
}

function navigateToDetailPartnerAdmin(id, index) {
  router.push({
    path: `/detailpartnerall/${id}`,
    query: { index }
  })
}

function navigateBackToMainPartner() {
  router.push('/mainpartner')
}

// ปรับให้ใช้ filteredPartners
const totalItems = computed(() => filteredPartners.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredPartners.value.slice(start, start + itemsPerPage)
})

</script>
<style>
.responsive-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.responsive-table th,
.responsive-table td {
  border: 1px solid #ccc;
  padding: 6px;
  text-align: center;
}

/* ✅ ซ่อนคอลัมน์เมื่อหน้าจอเล็ก */
@media (max-width: 1024px) {
  .col-date {
    display: none;
  }
}

@media (max-width: 900px) {
  .col-phone {
    display: none;
  }

  .col-img {
    display: none;
  }
}

@media (max-width: 768px) {
  .col-email {
    display: none;
  }
}

@media (max-width: 640px) {
  .col-hotel {
    display: none;
  }

  .responsive-table th:nth-child(1),
  .responsive-table td:nth-child(1) {
    display: none;
    /* ซ่อนลำดับ */
  }
}
</style>
