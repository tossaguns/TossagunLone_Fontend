<template>
  <TemplatePartner>
    <template #header>
      <label>จัดการห้องพัก</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div class="flex flex-col justify-center md:justify-start py-4 md:py-0">
          <label class="text-3xl font-semibold">รายการห้องพัก</label>
          <div class="mt-12">
            <div class="flex md:justify-end justify-center pr-5 space-x-2">
              <button class="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-md" @click="goToAddRoom">
                เพิ่มห้องพัก
              </button>
            </div>
            <div class="mt-6">
              <div class="flex flex-col justify-center md:justify-start items-center md:items-start my-4">
                <div>
                  <label>จำนวนห้องพักปัจจุบัน : {{ room.length }}</label>
                </div>
              </div>
              <div class="w-full mt-2">
                <div class="flex flex-col mb-2 space-y-2">
                  <div>
                    <label>ให้เเสดง<span class="font-bold px-2">สถานะ</span>ใน Employee เป็น</label>
                    <button class="ml-2 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs"
                      @click="openStatusEditablePopup">{{ statusEditable ? 'Dropdown' : 'Text' }}</button>
                  </div>
                  <div>
                    <label>ให้เเสดง<span class="font-bold p-2">สถานะห้อง</span>ใน Employee เป็น</label>
                    <button class="ml-2 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs"
                      @click="openStatusRoomEditablePopup">{{ statusRoomEditable ? 'Dropdown' : 'Text' }}</button>
                  </div>
                </div>
                <TableModelBasic ref="tableRef" :customers="room" :statusOptions="statusOptions"
                  :statusRoomOptions="statusRoomOptions" :statusPromotionOptions="['openPromotion', 'closePromotion']"
                  :visibleColumns="['status', 'statusRoom', 'roomNumber', 'typeRoom', 'price', 'statusPromotion']"
                  :fieldLayout="fieldLayout" @update-status="updateRoomStatus" @update-row="updateRoom"
                  @delete-row="deleteRoom" @confirm-status-change="onConfirmStatusChange"
                  @confirm-status-room-change="onConfirmStatusRoomChange" @edit-row="goToEditRoom"
                  :statusPromotionEditable="true" @confirm-status-promotion-change="onConfirmStatusPromotionChange" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Confirm :show="showConfirm" :onConfirm="confirmStatusChange" :onCancel="cancelStatusChange">
        คุณต้องการเปลี่ยนสถานะห้องนี้เป็น "{{ pendingStatusChange.newStatus }}" ใช่หรือไม่?
      </Confirm>
      <Confirm :show="showConfirmRoom" :onConfirm="confirmStatusRoomChange" :onCancel="cancelStatusRoomChange">
        คุณต้องการเปลี่ยนสถานะห้องนี้เป็น "{{ pendingStatusRoomChange.newStatusRoom }}" ใช่หรือไม่?
      </Confirm>
    </template>
  </TemplatePartner>
  <!-- Popup เลือกเปิด/ปิด dropdown -->
  <div v-if="showStatusEditablePopup"
    class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-[90%] max-w-xs relative">
      <button class="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        @click="closeStatusEditablePopup">✕</button>
      <h3 class="text-lg font-bold mb-4">ตั้งค่าการแก้ไขสถานะ</h3>
      <div class="mb-4">
        <label class="block mb-1">สถานะ</label>
        <select v-model="statusEditable" class="border rounded px-2 py-1 w-full">
          <option :value="true">Dropdown</option>
          <option :value="false">Text</option>
        </select>
      </div>
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        @click="closeStatusEditablePopup">บันทึก</button>
    </div>
  </div>
  <div v-if="showStatusRoomEditablePopup"
    class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-[90%] max-w-xs relative">
      <button class="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        @click="closeStatusRoomEditablePopup">✕</button>
      <h3 class="text-lg font-bold mb-4">ตั้งค่าการแก้ไขสถานะห้อง</h3>
      <div class="mb-4">
        <label class="block mb-1">สถานะห้อง</label>
        <select v-model="statusRoomEditable" class="border rounded px-2 py-1 w-full">
          <option :value="true">Dropdown</option>
          <option :value="false">Text</option>
        </select>
      </div>
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        @click="closeStatusRoomEditablePopup">บันทึก</button>
    </div>
  </div>
</template>


<script setup>
import TemplatePartner from "@/components/TemplatePartner.vue";
import TableModelBasic from "@/components/table/TableModelBasic.vue";
import Confirm from "@/components/element/Confirm.vue";
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const room = ref([]);
const statusOptions = ref([]);
const statusRoomOptions = ref(["เปิดใช้งาน", "ปิดทำการ"]);

const tableRef = ref(null); // <--- เพิ่ม ref สำหรับ TableModelBasic

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
]);

const showConfirm = ref(false)
const pendingStatusChange = ref({ row: null, newStatus: null })

function onConfirmStatusChange({ row, newStatus }) {
  Swal.fire({
    title: 'ยืนยันการเปลี่ยนสถานะ',
    text: `คุณต้องการเปลี่ยนสถานะห้องนี้เป็น "${newStatus}" ใช่หรือไม่?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ยืนยัน',
    cancelButtonText: 'ยกเลิก',
  }).then(async (result) => {
    if (result.isConfirmed) {
      if (tableRef.value && typeof tableRef.value.applyPendingStatus === 'function') {
        tableRef.value.applyPendingStatus(row._id)
      }
      await updateRoomStatus({ id: row._id, status: newStatus })
      await fetchRooms()
      Swal.fire({
        title: 'สำเร็จ!',
        text: 'เปลี่ยนสถานะเรียบร้อยแล้ว',
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

function cancelStatusRoomChange() {
  showConfirmRoom.value = false
  if (pendingStatusRoomChange.value.row && tableRef.value && typeof tableRef.value.resetPendingStatus === 'function') {
    tableRef.value.resetPendingStatus(pendingStatusRoomChange.value.row._id)
  }
  pendingStatusRoomChange.value = { row: null, newStatusRoom: null }
}

function onConfirmStatusPromotionChange({ row, newStatusPromotion }) {
  Swal.fire({
    title: 'ยืนยันการเปลี่ยนสถานะโปรโมชั่น',
    text: `คุณต้องการเปลี่ยนสถานะโปรโมชั่นห้องนี้เป็น "${newStatusPromotion}" ใช่หรือไม่?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ยืนยัน',
    cancelButtonText: 'ยกเลิก',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await updateRoomStatusPromotion({ id: row._id, statusPromotion: newStatusPromotion })
      await fetchRooms()
      Swal.fire({
        title: 'สำเร็จ!',
        text: 'เปลี่ยนสถานะโปรโมชั่นเรียบร้อยแล้ว',
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

async function updateRoomStatusPromotion({ id, statusPromotion }) {
  try {
    const token = localStorage.getItem('token');
    await axios.patch(`http://localhost:9999/HotelSleepGun/room/update/${id}/status-promotion`, { statusPromotion }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    await fetchRooms();
  } catch (error) {
    alert("เกิดข้อผิดพลาดในการอัปเดตสถานะโปรโมชั่นห้อง");
  }
}

const router = useRouter()

function goToAddRoom() {
  router.push('/addroom')
}

function goToEditRoom(row) {
  router.push(`/editroom/${row._id}`)
}

// โหลดข้อมูลห้องพัก และสถานะที่เลือกได้
onMounted(async () => {
  await fetchStatusOptions(); // โหลด status options ก่อน
  await fetchRooms(); // แล้วค่อยโหลด rooms
  window.addEventListener('storage', onStorageChange)
})

onUnmounted(() => {
  window.removeEventListener('storage', onStorageChange)
})

function onStorageChange(e) {
  if (e.key === 'rooms-updated') {
    fetchRooms()
  }
}

async function fetchRooms() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get("http://localhost:9999/HotelSleepGun/room/getAll", {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log("Rooms loaded:", res.data); // debug ดูข้อมูลที่ backend ส่งมา
    room.value = res.data.map(r => ({
      ...r,
      typeRoomName: r.typeRoom?.name || '-',
      // map typeRoomHotel เป็น array ของ object { name }
      typeRoomHotel: Array.isArray(r.typeRoomHotel)
        ? r.typeRoomHotel.map(h => typeof h === 'object' ? h : { name: h })
        : [],
      imgrooms: (r.imgrooms || []).map(filename => ({
        itemImageSrc: `http://localhost:9999/uploads/room/${filename}`,
        thumbnailImageSrc: `http://localhost:9999/uploads/room/${filename}`,
        alt: r.roomNumber || 'room'
      }))
    }));
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
    console.log("Status updated successfully:", response.data);

    // ถ้าเปลี่ยนเป็นสถานะอื่นที่ไม่ใช่ SleepGunWeb ให้ปิด promotion
    if (status !== 'SleepGunWeb') {
      await axios.patch(`http://localhost:9999/HotelSleepGun/room/update/${id}/status-promotion`, { statusPromotion: 'closePromotion' }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }

    // อัปเดต UI หลังบันทึกสำเร็จ
    const idx = room.value.findIndex(r => r._id === id);
    if (idx !== -1) {
      room.value[idx].status = status;
      if (status !== 'SleepGunWeb') {
        room.value[idx].statusPromotion = 'closePromotion';
      }
    }
    localStorage.setItem('rooms-updated', Date.now())
    await fetchRooms();
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
    // อัปเดต UI
    const idx = room.value.findIndex(r => r._id === id);
    if (idx !== -1) {
      room.value[idx].stastuRoom = statusRoom;
    }
    localStorage.setItem('rooms-updated', Date.now())
  } catch (error) {
    await fetchRooms();
    alert("เกิดข้อผิดพลาดในการอัปเดตสถานะห้อง");
  }
}

// เพิ่มฟังก์ชันสำหรับจัดการการอัปเดตข้อมูลห้อง
async function updateRoom(updatedRoom) {
  console.log("Updating room:", updatedRoom);
  // TODO: ส่ง request ไป backend เพื่ออัปเดตข้อมูลห้อง
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`http://localhost:9999/HotelSleepGun/room/update/${updatedRoom._id}`, updatedRoom, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log("Room updated successfully:", response.data);

    // รีเฟรชข้อมูล
    await fetchRooms();
  } catch (error) {
    console.error("Error updating room:", error);
    alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูลห้อง");
  }
}

// เพิ่มฟังก์ชันสำหรับจัดการการลบห้อง
async function deleteRoom(roomToDelete) {
  console.log("Deleting room:", roomToDelete);

  if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบห้องนี้?")) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    // เปลี่ยน endpoint ให้ตรงกับ backend
    const response = await axios.delete(`http://localhost:9999/HotelSleepGun/room/Delete${roomToDelete._id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log("Room deleted successfully:", response.data);

    // รีเฟรชข้อมูล
    await fetchRooms();
    // ปิดรายละเอียด (collapse) แถวที่ถูกลบ
    if (tableRef.value && typeof tableRef.value.collapseDetail === 'function') {
      tableRef.value.collapseDetail();
    }
  } catch (error) {
    console.error("Error deleting room:", error);
    alert("เกิดข้อผิดพลาดในการลบห้อง");
  }
}

const statusEditable = ref(true)
const statusRoomEditable = ref(true)
const showStatusEditablePopup = ref(false)
const showStatusRoomEditablePopup = ref(false)

function openStatusEditablePopup() { showStatusEditablePopup.value = true }
function closeStatusEditablePopup() {
  showStatusEditablePopup.value = false
  // บันทึกค่าไป localStorage เพื่อส่งไปหน้า ManageStatusRoom
  localStorage.setItem('statusEditable', statusEditable.value.toString())
}
function openStatusRoomEditablePopup() { showStatusRoomEditablePopup.value = true }
function closeStatusRoomEditablePopup() {
  showStatusRoomEditablePopup.value = false
  // บันทึกค่าไป localStorage เพื่อส่งไปหน้า ManageStatusRoom
  localStorage.setItem('statusRoomEditable', statusRoomEditable.value.toString())
}

// โหลดค่าจาก localStorage เมื่อ component mount
onMounted(() => {
  const savedStatusEditable = localStorage.getItem('statusEditable')
  const savedStatusRoomEditable = localStorage.getItem('statusRoomEditable')
  if (savedStatusEditable !== null) {
    statusEditable.value = savedStatusEditable === 'true'
  }
  if (savedStatusRoomEditable !== null) {
    statusRoomEditable.value = savedStatusRoomEditable === 'true'
  }
})
</script>