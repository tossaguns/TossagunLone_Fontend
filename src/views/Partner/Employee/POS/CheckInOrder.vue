<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Check-In Order</h2>

    <div class="space-y-4">
      <!-- ข้อมูลลูกค้า -->
      <div class="border rounded-lg p-4">
        <h3 class="font-semibold mb-3">ข้อมูลลูกค้า</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">ชื่อ-นามสกุล</label>
            <input v-model="customerData.name" type="text" class="w-full border rounded px-3 py-2"
              placeholder="กรอกชื่อ-นามสกุล" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">เบอร์โทรศัพท์</label>
            <input v-model="customerData.phone" type="tel" class="w-full border rounded px-3 py-2"
              placeholder="กรอกเบอร์โทรศัพท์" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">อีเมล</label>
            <input v-model="customerData.email" type="email" class="w-full border rounded px-3 py-2"
              placeholder="กรอกอีเมล" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">จำนวนคน</label>
            <input v-model="customerData.guestCount" type="number" min="1" class="w-full border rounded px-3 py-2"
              placeholder="จำนวนคน" />
          </div>
        </div>
      </div>

      <!-- ข้อมูลการจอง -->
      <div class="border rounded-lg p-4">
        <h3 class="font-semibold mb-3">ข้อมูลการจอง</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">วันที่ Check-in</label>
            <input v-model="bookingData.checkInDate" type="date" class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">วันที่ Check-out</label>
            <input v-model="bookingData.checkOutDate" type="date" class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">เวลาที่ต้องการ Check-in</label>
            <input v-model="bookingData.checkInTime" type="time" class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">ประเภทการจอง</label>
            <select v-model="bookingData.bookingType" class="w-full border rounded px-3 py-2">
              <option value="SleepGunWeb">SleepGunWeb</option>
              <option value="Walkin">Walkin</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ข้อมูลการชำระเงิน -->
      <div class="border rounded-lg p-4">
        <h3 class="font-semibold mb-3">ข้อมูลการชำระเงิน</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">ราคาต่อคืน</label>
            <input v-model="paymentData.pricePerNight" type="number" min="0" class="w-full border rounded px-3 py-2"
              placeholder="ราคาต่อคืน" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">จำนวนคืน</label>
            <input v-model="paymentData.nights" type="number" min="1" class="w-full border rounded px-3 py-2"
              placeholder="จำนวนคืน" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">ราคารวม</label>
            <input :value="totalPrice" type="text" class="w-full border rounded px-3 py-2 bg-gray-100" readonly />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">วิธีการชำระเงิน</label>
            <select v-model="paymentData.paymentMethod" class="w-full border rounded px-3 py-2">
              <option value="cash">เงินสด</option>
              <option value="credit">บัตรเครดิต</option>
              <option value="transfer">โอนเงิน</option>
            </select>
          </div>
        </div>
      </div>

      <!-- หมายเหตุ -->
      <div class="border rounded-lg p-4">
        <h3 class="font-semibold mb-3">หมายเหตุ</h3>
        <textarea v-model="bookingData.notes" rows="3" class="w-full border rounded px-3 py-2"
          placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"></textarea>
      </div>

      <!-- ปุ่มดำเนินการ -->
      <div class="flex justify-end space-x-3 pt-4">
        <button @click="resetForm" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
          รีเซ็ต
        </button>
        <button @click="submitCheckIn" :disabled="isSubmitting"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400">
          {{ isSubmitting ? 'กำลังดำเนินการ...' : 'ยืนยัน Check-in' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive data
const customerData = ref({
  name: '',
  phone: '',
  email: '',
  guestCount: 1
})

const bookingData = ref({
  checkInDate: '',
  checkOutDate: '',
  checkInTime: '14:00',
  bookingType: 'Walkin',
  notes: ''
})

const paymentData = ref({
  pricePerNight: 0,
  nights: 1,
  paymentMethod: 'cash'
})

const isSubmitting = ref(false)

// Computed properties
const totalPrice = computed(() => {
  return (paymentData.value.pricePerNight * paymentData.value.nights).toLocaleString()
})

// Methods
const resetForm = () => {
  customerData.value = {
    name: '',
    phone: '',
    email: '',
    guestCount: 1
  }

  bookingData.value = {
    checkInDate: '',
    checkOutDate: '',
    checkInTime: '14:00',
    bookingType: 'Walkin',
    notes: ''
  }

  paymentData.value = {
    pricePerNight: 0,
    nights: 1,
    paymentMethod: 'cash'
  }
}

const submitCheckIn = async () => {
  try {
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!customerData.value.name || !customerData.value.phone) {
      alert('กรุณากรอกข้อมูลลูกค้าที่จำเป็น')
      return
    }

    if (!bookingData.value.checkInDate || !bookingData.value.checkOutDate) {
      alert('กรุณาเลือกวันที่ Check-in และ Check-out')
      return
    }

    if (paymentData.value.pricePerNight <= 0) {
      alert('กรุณาระบุราคาที่ถูกต้อง')
      return
    }

    isSubmitting.value = true

    // TODO: ส่งข้อมูลไปยัง backend
    console.log('Submitting check-in data:', {
      customer: customerData.value,
      booking: bookingData.value,
      payment: paymentData.value
    })

    // จำลองการส่งข้อมูล
    await new Promise(resolve => setTimeout(resolve, 1000))

    alert('Check-in สำเร็จ!')
    resetForm()

  } catch (error) {
    console.error('Error submitting check-in:', error)
    alert('เกิดข้อผิดพลาดในการ Check-in')
  } finally {
    isSubmitting.value = false
  }
}
</script>