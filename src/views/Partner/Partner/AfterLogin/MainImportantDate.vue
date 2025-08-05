<template>
  <div class="flex justify-center mt-32 space-x-12">

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const router = useRouter()
const partnerId = localStorage.getItem('partnerId')
const aboutHotelId = ref(localStorage.getItem('aboutHotelId'))
const form = ref({ /* ...fields... */ })

const handleNavigation = async () => {
  try {
    const res = await axios.get(`http://localhost:9999/HotelSleepGun/partner/get/${partnerId}`);
    const partner = res.data;

    console.log('📦 partner data:', partner);
    console.log('✅ isProfileComplete:', partner.isProfileComplete);

    if (!partner.isProfileComplete) {
      router.push('/mainimportantdate');
      return;
    }

    // ➤ ถ้ากรอกครบแล้ว ไปหน้า logincompany ไม่ว่า role ไหน
    console.log('✅ ข้อมูลครบ ไปหน้า logincompany');
    router.push('/logincompany');

  } catch (err) {
    console.error('❌ ไม่สามารถตรวจสอบข้อมูลพาร์ทเนอร์ได้:', err);
  }
};


onMounted(async () => {
  const token = localStorage.getItem('token')
  if (aboutHotelId.value && token) {
    // ดึงข้อมูลมาแสดง
    const res = await axios.get(`http://localhost:9999/HotelSleepGun/pos/about-hotel`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (res.data.success && res.data.data) {
      Object.assign(form.value, res.data.data)
    }
  }
})

async function saveAboutHotel() {
  const token = localStorage.getItem('token')
  if (!aboutHotelId.value) {
    // CREATE
    const res = await axios.post('http://localhost:9999/HotelSleepGun/pos/about-hotel', form.value, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (res.data.success && res.data.data) {
      localStorage.setItem('aboutHotelId', res.data.data._id)
      aboutHotelId.value = res.data.data._id
      alert('สร้างข้อมูลสำเร็จ')
    }
  } else {
    // UPDATE
    const res = await axios.put(`http://localhost:9999/HotelSleepGun/pos/about-hotel/${aboutHotelId.value}`, form.value, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (res.data.success) {
      alert('อัปเดตข้อมูลสำเร็จ')
    }
  }
}
</script>
