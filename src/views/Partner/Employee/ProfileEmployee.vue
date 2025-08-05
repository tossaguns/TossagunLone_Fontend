<template>
  <TemplateEmployee>
    <template #header>
      <label>โปรไฟล์พนักงาน</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto text-stone">

        <div class="flex flex-col md:flex-row items-center mb-3 gap-3  text-sm md:text-base w-full">
          <div class="w-1/4 flex justify-end pr-4 mb-3 md:mb-0">
            <img :src="employee.imageUrl" alt="profile image"
              class="sm:w-32 sm:h-32 w-20 h-20 rounded-full object-cover border" />
          </div>
          <div class="w-full">
            <div class="flex justify-center md:justify-start mb-2">
              <span class="inline-block bg-yellow-400 text-white rounded-full px-3 py-1 text-xs sm:text-sm">
                ตำแหน่ง {{ employee.positionEmployee }}
              </span>
            </div>
            <div class="flex flex-row space-x-4">
              <p class="text-xl font-bold py-1">{{ employee.firstname }}</p>
              <p class="text-xl font-bold py-1">{{ employee.lastname }}</p>
            </div>

            <div>
              <div class="flex flex-wrap text-sm">
                <p><span class="text-stone-400">รหัสพนักงาน : </span>{{ employee.employeeCode }}</p>
                <p class="ml-5"><span class="text-stone-400">ชื่อเล่น : </span>{{ employee.nickname }}
                </p>
              </div>

              <div class="flex flex-wrap text-sm">
                <p><span class="text-stone-400">เบอร์โทร : </span>{{ employee.phone }}</p>
                <p class="ml-5"><span class="text-stone-400">อีเมล : </span>{{ employee.email }}</p>
              </div>
            </div>

          </div>
        </div>

        <div class="max-w-2xl mx-auto mt-12">
          <div>
            <div @click="checkIn"
              :class="['max-w-5xl mx-auto rounded-2xl px-6 py-10 text-center font-bold cursor-pointer relative transition transform duration-300 ease-in-out mt-5 mb-10 border-4  shadow-xl',
                checked ? (animationCount > 0 ? 'border-4 border-gray-400 bg-white shadow-gray-300 bounce-glow-animation' : 'border-4  bg-green-50 shadow-gray-300') : 'border bg-white hover:translate-y-2 hover:shadow-2xl']">
              <p class="text-2xl mb-2">เช็คชื่อ</p>
              <p class="text-green-600 font-bold">{{ employee.dateLogin }}</p>
              <p class="text-green-600 font-bold">{{ employee.timeLogin }}</p>
              <br>
              <hr>
              <div class="mt-6 flex justify-center relative">
                <div v-if="!checked"
                  class="text-gray-400 text-2xl xl:text-5xl lg:text-4xl font-semibold cursor-pointer transition duration-300 hover:text-shadow-glow my-8">
                  ลงชื่อเข้าใช้งาน
                </div>
                <div v-else>
                  <div v-if="animationCount > 0"
                    class="absolute w-20 h-20 rounded-full border-4 border-green-300 animate-ping z-0"></div>
                  <svg :class="[
                    'w-20 h-20 z-10 transition-transform duration-300',
                    'hover:scale-125',
                    checked ? 'text-green-500' : 'text-gray-400',
                  ]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p v-if="checked" class="text-green-600 mt-4 text-sx lg:text-3xl">เช็คชื่อสำเร็จ</p>
              <p v-if="checked" class="text-gray-600 text-sx lg:text-xl">เวลา {{ employee.timeLogin }}</p>
            </div>
          </div>
        </div>

        <div class="max-w-2xl mx-auto" v-if="checked">
          <div class="flex justify-center items-center mb-2">
            <label class="text-2xl font-bold">ตารางเวลาเข้างาน</label>
          </div>
          <table class=" w-full text-sm text-center">
            <thead>
              <tr class="text-black">
                <th class="p-2 bg-stone-600 text-white rounded-tl-lg border-r">วันที่</th>
                <th class="p-2 bg-stone-600 text-white border-x">เวลาเข้างาน</th>
                <th class="p-2 bg-stone-600 text-white rounded-tr-lg border-l">รหัสพนักงาน</th>
              </tr>
            </thead>
            <tbody v-if="paginatedRecords.length > 0">
              <tr v-for="(record, index) in paginatedRecords" :key="record.id"
                :class="['bg-white', record.justAdded ? 'bounce-glow-animation' : '']">
                <td class="p-2 border">{{ record.dateLogin }}</td>
                <td class="p-2 border">{{ record.timeLogin }}</td>
                <td class="p-2 border">{{ record.numberid }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" class="text-center text-gray-500 py-6 text-lg">
                  ไม่มีข้อมูลการเข้างาน
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </TemplateEmployee>
</template>

<script setup>
import TemplateEmployee from "@/components/TemplateEmployee.vue";
import { ref, computed, onMounted } from 'vue';

const checked = ref(false);
const animationCount = ref(0);

const employee = ref({
  imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
  positionEmployee: 'เจ้าหน้าที่ไอที',
  firstname: 'กิตติ',
  lastname: 'ใจดี',
  employeeCode: 'EMP002',
  nickname: 'กิต',
  phone: '0891234567',
  email: 'kitti@example.com',
  dateLogin: '',
  timeLogin: '',
});

const checkIn = () => {
  if (!checked.value) {
    const now = new Date();
    employee.value.dateLogin = now.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    employee.value.timeLogin = now.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    checked.value = true;
    animationCount.value = 1;
    setTimeout(() => {
      animationCount.value = 0;
    }, 1000);
    // เพิ่มข้อมูลใหม่เข้า allRecords หลังตารางแสดงแล้ว (ดีเลย์เล็กน้อย)
    setTimeout(() => {
      allRecords.value.unshift({
        id: allRecords.value.length > 0 ? allRecords.value[0].id + 1 : 1,
        dateLogin: employee.value.dateLogin,
        timeLogin: employee.value.timeLogin,
        numberid: employee.value.employeeCode,
        name: employee.value.firstname + ' ' + employee.value.lastname,
        justAdded: true,
      });
      setTimeout(() => {
        if (allRecords.value[0]) {
          allRecords.value[0].justAdded = false;
        }
      }, 1000);
    }, 100); // ดีเลย์เพื่อให้ตารางแสดงก่อน
  }
};

const allRecords = ref([
  { id: 1, dateLogin: '2025-06-24', timeLogin: '09:00', numberid: 'EMP002', name: 'กิตติ ใจดี' },
  { id: 2, dateLogin: '2025-06-23', timeLogin: '09:02', numberid: 'EMP002', name: 'กิตติ ใจดี' },
  { id: 3, dateLogin: '2025-06-22', timeLogin: '08:59', numberid: 'EMP002', name: 'กิตติ ใจดี' },
  { id: 4, dateLogin: '2025-06-22', timeLogin: '08:59', numberid: 'EMP002', name: 'กิตติ ใจดี' },
  { id: 5, dateLogin: '2025-06-22', timeLogin: '08:55', numberid: 'EMP002', name: 'กิตติ ใจดี' },
  { id: 6, dateLogin: '2025-06-22', timeLogin: '08:40', numberid: 'EMP002', name: 'กิตติ ใจดี' },
  { id: 7, dateLogin: '2025-06-22', timeLogin: '08:59', numberid: 'EMP002', name: 'กิตติ ใจดี' },
  { id: 8, dateLogin: '2025-06-22', timeLogin: '08:59', numberid: 'EMP002', name: 'กิตติ ใจดี' },
  { id: 9, dateLogin: '2025-06-22', timeLogin: '08:59', numberid: 'EMP002', name: 'กิตติ ใจดี' },
  { id: 10, dateLogin: '2025-06-22', timeLogin: '08:59', numberid: 'EMP002', name: 'กิตติ ใจดี' },
  { id: 11, dateLogin: '2025-06-22', timeLogin: '08:59', numberid: 'EMP002', name: 'กิตติ ใจดี' },
]);

const currentPage = ref(1);
const perPage = ref(10);

const totalPages = computed(() => Math.ceil(allRecords.value.length / perPage.value));

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return allRecords.value.slice(start, start + perPage.value);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(() => {

});
</script>

<style scoped>
@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  75%,
  100% {
    transform: scale(1.75);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) 1;
}

.bounce-glow-animation {
  animation: bounceGlow 1s ease forwards;
}

@keyframes bounceGlow {
  0% {
    opacity: 0;
    transform: translateY(100%);
    box-shadow: 0 0 0px rgba(255, 215, 0, 0);
  }

  50% {
    opacity: 1;
    transform: translateY(-30%);
    box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.8);
  }

  70% {
    transform: translateY(15%);
    box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.6);
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
    box-shadow: 0 0 10px 0px rgba(255, 255, 255, 0);
  }
}
</style>