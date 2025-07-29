<template>
  <TemplateEmployee>
    <template #header>
      <label>POS ห้องพัก</label>
    </template>
    <template #content>
      <div>
        
      </div>
    </template>
  </TemplateEmployee>


  <!-- Modal รายละเอียด -->
  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-xl relative">
      <button class="absolute top-2 right-2 text-gray-500 hover:text-red-500" @click="closeModal">
        ✕
      </button>

      <h3 class="text-lg font-bold mb-4">รายละเอียดการจอง ({{ selectedDate }})</h3>

      <div v-for="(booking, index) in selectedBookings" :key="index" class="mb-4 p-4 bg-gray-50 rounded-md border">
        <p><strong>ชื่อผู้จอง:</strong> {{ booking.customerName }}</p>
        <p><strong>เลขห้อง:</strong> {{ booking.roomNumber }}</p>
        <p><strong>Check-in:</strong> {{ booking.checkIn }}</p>
        <p><strong>Check-out:</strong> {{ booking.checkOut }}</p>
        <p><strong>ราคา:</strong> {{ booking.price }} THB</p>
        <p><strong>สถานะ:</strong>
          <span :class="{
            'text-green-600': booking.status === 'checked-in',
            'text-yellow-600': booking.status === 'booked',
            'text-red-600': booking.status === 'checked-out'
          }">{{ booking.status }}</span>
        </p>

        <div class="mt-2 space-x-2">
          <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" @click="checkIn(booking)"
            v-if="booking.status === 'booked'">เช็คอิน</button>

          <button class="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800" @click="checkOut(booking)"
            v-if="booking.status === 'checked-in'">เช็คเอาท์</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal เลือกเดือนและปี -->
  <div v-if="showMonthYearPicker" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-xs relative">
      <button class="absolute top-2 right-2 text-gray-500 hover:text-red-500" @click="closeMonthYearPicker">
        ✕
      </button>
      <h3 class="text-lg font-bold mb-4">เลือกเดือนและปี</h3>
      <div class="mb-4">
        <label class="block mb-1">ปี</label>
        <input type="number" v-model="tempYear" class="border rounded px-2 py-1 w-full" min="2000" max="2100" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">เดือน</label>
        <select v-model="tempMonth" class="border rounded px-2 py-1 w-full">
          <option v-for="(m, idx) in monthNames" :key="idx" :value="idx">{{ m }}</option>
        </select>
      </div>
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full" @click="selectMonthYear">
        เลือก
      </button>
      <button
        class="mt-2 py-2 rounded hover:bg-gray-500 w-full text-xs underline underline-offset-2 hover:text-blue-500"
        @click="goToToday">
        กลับไปวหน้าปัจจุบัน
      </button>
    </div>
  </div>
</template>

<script setup>
import TemplateEmployee from "@/components/TemplateEmployee.vue";



</script>
