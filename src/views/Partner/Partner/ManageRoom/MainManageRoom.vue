<template>
  <TemplatePartner>
    <template #header>
      <label>{{ t("ManageRoom") }}</label>
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
                <TableModelBasic :customers="room" :statusOptions="statusOptions"
                  :visibleColumns="['status', 'roomNumber', 'typeRoom', 'price', 'stayPeople']"
                  :fieldLayout="fieldLayout" @update-status="updateRoomStatus" @update-row="updateRoom"
                  @delete-row="deleteRoom" @confirm-status-change="onConfirmStatusChange" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Confirm :show="showConfirm" :onConfirm="confirmStatusChange" :onCancel="cancelStatusChange">
        คุณต้องการเปลี่ยนสถานะห้องนี้เป็น "{{ pendingStatusChange.newStatus }}" ใช่หรือไม่?
      </Confirm>
    </template>
  </TemplatePartner>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import TableModelBasic from "@/components/table/TableModelBasic.vue";
import TemplatePartner from "@/components/TemplatePartner.vue";
import { useI18n } from "vue-i18n";
import Confirm from '@/components/element/Confirm.vue'
import { useRouter } from 'vue-router'

const { t } = useI18n();
const room = ref([]);
const statusOptions = ref([]);

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
]);

const showConfirm = ref(false)
const pendingStatusChange = ref({ row: null, newStatus: null })

function onConfirmStatusChange({ row, newStatus }) {
  pendingStatusChange.value = { row, newStatus }
  showConfirm.value = true
}

function confirmStatusChange() {
  const { row, newStatus } = pendingStatusChange.value
  // เรียกฟังก์ชัน updateRoomStatus ที่มีอยู่แล้ว
  updateRoomStatus({ id: row._id, status: newStatus })
  showConfirm.value = false
  pendingStatusChange.value = { row: null, newStatus: null }
}

function cancelStatusChange() {
  showConfirm.value = false
  pendingStatusChange.value = { row: null, newStatus: null }
}

const router = useRouter()

function goToAddRoom() {
  router.push('/addroom')
}

// โหลดข้อมูลห้องพัก และสถานะที่เลือกได้
onMounted(async () => {
  await fetchStatusOptions(); // โหลด status options ก่อน
  await fetchRooms(); // แล้วค่อยโหลด rooms
});

async function fetchRooms() {
  try {
    const res = await axios.get("http://localhost:9999/HotelSleepGun/room/getAll");
    console.log("Rooms loaded:", res.data);
    room.value = res.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
}

async function fetchStatusOptions() {
  try {
    const res = await axios.get("http://localhost:9999/HotelSleepGun/room/status-options");
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
    // อัปเดต UI ก่อน (optimistic update)
    const idx = room.value.findIndex(r => r._id === id);
    if (idx !== -1) {
      room.value[idx].status = status;
    }

    // ส่ง PATCH request ไป backend
    const response = await axios.patch(`http://localhost:9999/HotelSleepGun/room/update/${id}/status`, { status });
    console.log("Status updated successfully:", response.data);

    // อัปเดต UI อีกครั้งด้วยข้อมูลจาก server (ถ้าต้องการ)
    // await fetchRooms();

  } catch (error) {
    console.error("Error updating room status:", error);

    // ถ้าเกิดข้อผิดพลาด ให้คืนค่าเดิม
    await fetchRooms();

    // แสดงข้อความแจ้งเตือน
    alert("เกิดข้อผิดพลาดในการอัปเดตสถานะห้อง");
  }
}

// เพิ่มฟังก์ชันสำหรับจัดการการอัปเดตข้อมูลห้อง
async function updateRoom(updatedRoom) {
  console.log("Updating room:", updatedRoom);
  // TODO: ส่ง request ไป backend เพื่ออัปเดตข้อมูลห้อง
  try {
    const response = await axios.patch(`http://localhost:9999/HotelSleepGun/room/update/${updatedRoom._id}`, updatedRoom);
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
    const response = await axios.delete(`http://localhost:9999/HotelSleepGun/room/delete/${roomToDelete._id}`);
    console.log("Room deleted successfully:", response.data);

    // รีเฟรชข้อมูล
    await fetchRooms();
  } catch (error) {
    console.error("Error deleting room:", error);
    alert("เกิดข้อผิดพลาดในการลบห้อง");
  }
}
</script>