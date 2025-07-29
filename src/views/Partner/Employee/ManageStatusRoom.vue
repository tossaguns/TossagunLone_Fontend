<template>
  <TemplateEmployee>
    <template #header>
      <label>จัดการสถานะห้อง</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto text-stone-600">
        <div class="mt-4 mb-2">
          <label class="text-xl font-bold">จัดการสถานะห้องพัก</label>
        </div>
        <div>
          <TableModelBasic ref="tableRef" :customers="room" :statusOptions="statusOptions"
            :statusRoomOptions="statusRoomOptions" :statusPromotionOptions="statusPromotionOptions"
            :visibleColumns="['status', 'statusRoom', 'roomNumber', 'typeRoom', 'price', 'air', 'stayPeople', 'statusPromotion']"
            :fieldLayout="fieldLayout" :hideEditDelete="true" @confirm-status-change="onConfirmStatusChange"
            @confirm-status-room-change="onConfirmStatusRoomChange"
            @confirm-status-promotion-change="onConfirmStatusPromotionChange" :statusPromotionEditable="false"
            :statusEditable="statusEditable" :statusRoomEditable="statusRoomEditable" />
        </div>
      </div>
      <Confirm :show="showConfirm" :onConfirm="confirmStatusChange" :onCancel="cancelStatusChange">
        คุณต้องการเปลี่ยนสถานะห้องนี้เป็น "{{ pendingStatusChange.newStatus }}" ใช่หรือไม่?
      </Confirm>
      <Confirm :show="showConfirmRoom" :onConfirm="confirmStatusRoomChange" :onCancel="cancelStatusRoomChange">
        คุณต้องการเปลี่ยนสถานะห้องนี้เป็น "{{ pendingStatusRoomChange.newStatusRoom }}" ใช่หรือไม่?
      </Confirm>
      <Confirm :show="showConfirmPromotion" :onConfirm="confirmStatusPromotionChange"
        :onCancel="cancelStatusPromotionChange">
        คุณต้องการเปลี่ยนสถานะโปรโมชั่นห้องนี้เป็น "{{ pendingStatusPromotionChange.newStatusPromotion }}" ใช่หรือไม่?
      </Confirm>
    </template>
  </TemplateEmployee>
</template>

<script setup>
import TemplateEmployee from "@/components/TemplateEmployee.vue";
import TableModelBasic from "@/components/table/TableModelBasic.vue";
import { ref, onMounted, onUnmounted } from 'vue';
import Confirm from "@/components/element/Confirm.vue";
import axios from 'axios';
import Swal from 'sweetalert2';

const room = ref([]);
const statusOptions = ref([]);
const statusRoomOptions = ref(["เปิดใช้งาน", "ปิดทำการ"]);
const statusPromotionOptions = ref(["openPromotion", "closePromotion"]);

const tableRef = ref(null);

const fieldLayout = ref([
  { key: "status", label: "สถานะ", position: 1 },
  { key: "roomNumber", label: "เลขห้อง", position: 2 },
  { key: "price", label: "ราคา", position: 3 },
  { key: "typeRoom", label: "ประเภทห้องพัก", position: 4 },
  { key: "stayPeople", label: "จำนวนคนเข้าพักได้สูงสุด", position: 5 },
  { key: "roomDetail", label: "รายละเอียด", position: 6 },
  { key: "typeRoomHotel", label: "ลักษณะห้อง", position: 7 },
  { key: "imgrooms", label: "รูป", position: 8 },
  { key: "timestamps", label: "เวลา", position: 9 },
  { key: "statusRoom", label: "สถานะห้อง", position: 10 },
  { key: "statusPromotion", label: "สถานะการใช้งานโปรโมชั่น", position: 11 },
  { key: "air", label: "ประเภทพัดลม/แอร์", position: 12 },
]);

const showConfirm = ref(false)
const pendingStatusChange = ref({ row: null, newStatus: null })

function onConfirmStatusChange({ row, newStatus }) {
  pendingStatusChange.value = { row, newStatus }
  showConfirm.value = true
}

async function confirmStatusChange() {
  const { row, newStatus } = pendingStatusChange.value
  if (tableRef.value && typeof tableRef.value.applyPendingStatus === 'function') {
    tableRef.value.applyPendingStatus(row._id)
  }
  await updateRoomStatus({ id: row._id, status: newStatus })
  await fetchRooms()
  showConfirm.value = false
  pendingStatusChange.value = { row: null, newStatus: null }
}

function cancelStatusChange() {
  showConfirm.value = false
  if (pendingStatusChange.value.row && tableRef.value && typeof tableRef.value.resetPendingStatus === 'function') {
    tableRef.value.resetPendingStatus(pendingStatusChange.value.row._id)
  }
  pendingStatusChange.value = { row: null, newStatus: null }
}

const showConfirmRoom = ref(false)
const pendingStatusRoomChange = ref({ row: null, newStatusRoom: null })

function onConfirmStatusRoomChange({ row, newStatusRoom }) {
  Swal.fire({
    title: 'ยืนยันการเปลี่ยนสถานะห้อง',
    text: `คุณต้องการเปลี่ยนสถานะห้องนี้เป็น "${newStatusRoom}" ใช่หรือไม่?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ยืนยัน',
    cancelButtonText: 'ยกเลิก',
  }).then(async (result) => {
    if (result.isConfirmed) {
      if (tableRef.value && typeof tableRef.value.applyPendingStatus === 'function') {
        tableRef.value.applyPendingStatus(row._id)
      }
      await updateRoomStatusRoom({ id: row._id, statusRoom: newStatusRoom })
      await fetchRooms()
      Swal.fire({
        title: 'สำเร็จ!',
        text: 'เปลี่ยนสถานะห้องเรียบร้อยแล้ว',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      if (tableRef.value && typeof tableRef.value.resetPendingStatus === 'function') {
        tableRef.value.resetPendingStatus(row._id)
      }
    }
  });
}

async function confirmStatusRoomChange() {
  const { row, newStatusRoom } = pendingStatusRoomChange.value
  if (tableRef.value && typeof tableRef.value.applyPendingStatus === 'function') {
    tableRef.value.applyPendingStatus(row._id)
  }
  await updateRoomStatusRoom({ id: row._id, statusRoom: newStatusRoom })
  await fetchRooms()
  showConfirmRoom.value = false
  pendingStatusRoomChange.value = { row: null, newStatusRoom: null }
}

function cancelStatusRoomChange() {
  showConfirmRoom.value = false
  if (pendingStatusRoomChange.value.row && tableRef.value && typeof tableRef.value.resetPendingStatus === 'function') {
    tableRef.value.resetPendingStatus(pendingStatusRoomChange.value.row._id)
  }
  pendingStatusRoomChange.value = { row: null, newStatusRoom: null }
}

const showConfirmPromotion = ref(false)
const pendingStatusPromotionChange = ref({ row: null, newStatusPromotion: null })

const statusEditable = ref(false)
const statusRoomEditable = ref(false)

// โหลดข้อมูลห้องพัก และสถานะที่เลือกได้
onMounted(async () => {
  await fetchStatusOptions(); // โหลด status options ก่อน
  await fetchRooms(); // แล้วค่อยโหลด rooms
  window.addEventListener('storage', onStorageChange)

  // โหลดค่าจาก localStorage เมื่อ component mount
  loadStatusEditableSettings()

  // เพิ่ม event listener สำหรับ localStorage changes
  window.addEventListener('storage', onStatusEditableChange)
})

onUnmounted(() => {
  window.removeEventListener('storage', onStorageChange)
  window.removeEventListener('storage', onStatusEditableChange)
})

function onStatusEditableChange(e) {
  if (e.key === 'statusEditable' || e.key === 'statusRoomEditable') {
    loadStatusEditableSettings()
  }
}

function loadStatusEditableSettings() {
  const savedStatusEditable = localStorage.getItem('statusEditable')
  const savedStatusRoomEditable = localStorage.getItem('statusRoomEditable')
  if (savedStatusEditable !== null) {
    statusEditable.value = savedStatusEditable === 'true'
  }
  if (savedStatusRoomEditable !== null) {
    statusRoomEditable.value = savedStatusRoomEditable === 'true'
  }
}

function onStorageChange(e) {
  if (e.key === 'rooms-updated') {
    fetchRooms()
  }
}

function onConfirmStatusPromotionChange({ row, newStatusPromotion }) {
  pendingStatusPromotionChange.value = { row, newStatusPromotion }
  showConfirmPromotion.value = true
}

async function confirmStatusPromotionChange() {
  const { row, newStatusPromotion } = pendingStatusPromotionChange.value
  if (tableRef.value && typeof tableRef.value.applyPendingStatus === 'function') {
    tableRef.value.applyPendingStatus(row._id)
  }
  await updateRoomStatusPromotion({ id: row._id, statusPromotion: newStatusPromotion })
  await fetchRooms()
  showConfirmPromotion.value = false
  pendingStatusPromotionChange.value = { row: null, newStatusPromotion: null }
}

function cancelStatusPromotionChange() {
  showConfirmPromotion.value = false
  if (pendingStatusPromotionChange.value.row && tableRef.value && typeof tableRef.value.resetPendingStatus === 'function') {
    tableRef.value.resetPendingStatus(pendingStatusPromotionChange.value.row._id)
  }
  pendingStatusPromotionChange.value = { row: null, newStatusPromotion: null }
}

async function fetchRooms() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get("http://localhost:9999/HotelSleepGun/room/getAll", {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log("Rooms loaded:", res.data); // debug ดูข้อมูลที่ backend ส่งมา
    // แปลงข้อมูล imgrooms เป็น array ของ object ที่ Gallery.vue ใช้ได้
    room.value = res.data.map(r => {
      console.log("Room air data:", r.air); // debug ดูข้อมูล air
      return {
        ...r,
        typeRoomName: r.typeRoom?.name || '-',
        typeRoomHotelName: Array.isArray(r.typeRoomHotel) && r.typeRoomHotel.length > 0
          ? r.typeRoomHotel.map(h => typeof h === 'object' ? h.name : h).join(', ')
          : '-',
        imgrooms: (r.imgrooms || []).map(filename => ({
          itemImageSrc: `http://localhost:9999/uploads/room/${filename}`,
          thumbnailImageSrc: `http://localhost:9999/uploads/room/${filename}`,
          alt: r.roomNumber || 'room'
        }))
      };
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
}

async function fetchStatusOptions() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get("http://localhost:9999/HotelSleepGun/room/status-options", {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log("Status options loaded:", res.data);
    statusOptions.value = res.data;
  } catch (error) {
    console.error("Error fetching status options:", error);
    // กรณี error ตั้งสถานะ default เอง
    statusOptions.value = ["SleepGunWeb", "Walkin", "Available", "Occupied", "Maintenance"];
  }
}

async function updateRoomStatus({ id, status }) {
  console.log("Updating room status:", { id, status });

  try {
    const token = localStorage.getItem('token');
    // ส่ง PATCH request ไป backend
    const response = await axios.patch(`http://localhost:9999/HotelSleepGun/room/update/${id}/status`, { status }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    localStorage.setItem('rooms-updated', Date.now())
    console.log("Status updated successfully:", response.data);

    // อัปเดต UI หลังบันทึกสำเร็จ
    const idx = room.value.findIndex(r => r._id === id);
    if (idx !== -1) {
      room.value[idx].status = status;
    }
    // (ถ้าต้องการ) await fetchRooms(); // เพื่อ sync กับ backend

  } catch (error) {
    console.error("Error updating room status:", error);
    await fetchRooms();
    alert("เกิดข้อผิดพลาดในการอัปเดตสถานะห้อง");
  }
}

async function updateRoomStatusRoom({ id, statusRoom }) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`http://localhost:9999/HotelSleepGun/room/update/${id}/status-room`, { statusRoom }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    localStorage.setItem('rooms-updated', Date.now())
    // อัปเดต UI
    const idx = room.value.findIndex(r => r._id === id);
    if (idx !== -1) {
      room.value[idx].statusRoom = statusRoom;
    }
  } catch (error) {
    await fetchRooms();
    alert("เกิดข้อผิดพลาดในการอัปเดตสถานะห้อง");
  }
}

async function updateRoomStatusPromotion({ id, statusPromotion }) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`http://localhost:9999/HotelSleepGun/room/update/${id}/status-promotion`, { statusPromotion }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    localStorage.setItem('rooms-updated', Date.now())
    // อัปเดต UI
    const idx = room.value.findIndex(r => r._id === id);
    if (idx !== -1) {
      room.value[idx].statusPromotion = statusPromotion;
    }
  } catch (error) {
    await fetchRooms();
    alert("เกิดข้อผิดพลาดในการอัปเดตสถานะโปรโมชั่นห้อง");
  }
}

</script>