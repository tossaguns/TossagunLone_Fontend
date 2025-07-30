<!-- FIXME: กลับมาทำพรุ่งนี้ -->
<template>
  <TemplatePartner>
    <template #header>
      <label>จัดการ POS</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">

        <label class="text-2xl font-bold">จัดการรายการห้องพัก</label>

        <div class="mb-4 mt-12 border rounded-md p-4 bg-stone-50">
          <div class="flex justify-end">
            <button class="bg-white text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-md shadow"
              @click="goToManageTag">จัดการ Tag</button>
          </div>

          <label class="font-bold">เเสดง Tag ที่มีอยู่</label>
          <div class="mt-2">
            <div class="flex flex-wrap gap-2 ">
              <div v-for="(tag, index) in tags" :key="index"
                class="px-2  text-white font-medium text-sm flex items-center space-x-2 rounded-full" :style="{
                  backgroundColor: tag.color,
                  border: `2px solid ${tag.color}`,
                  color: getContrastColor(tag.color)
                }">
                <span class="px-2">{{ tag.name }}</span>
              </div>
            </div>
            <div v-if="tags.length === 0" class="text-gray-500 text-sm italic">
              ยังไม่มีแท็กที่สร้างขึ้น
            </div>
            <div v-if="loading" class="text-blue-500 text-sm">
              กำลังโหลดข้อมูล...
            </div>
          </div>
        </div>

        <div>
          <div class="flex flex-col xl:flex-row items-center border rounded-md p-4 bg-stone-50 md:space-x-2">
            <div class="flex flex-col md:flex-row items-center md:space-x-2 space-y-2 md:space-y-0">
              <label class="font-bold">จำนวนตึกทั้งหมด : </label>
              <div class="flex md:flex-row flex-col items-center md:space-x-2 space-y-2 md:space-y-0">
                <input type="number" class="border rounded-md p-2 w-[150px]" />
                <div class="space-x-2">
                  <button
                    class="text-red-500 bg-white hover:bg-red-50 px-3 text-lg font-bold rounded-full shadow">-</button>
                  <button
                    class="text-blue-500 bg-white hover:bg-blue-50 px-3  text-lg font-bold rounded-full shadow">+</button>
                </div>
              </div>
            </div>
            <div class="flex flex-col lg:flex-row lg:items-end items-center lg:space-x-2 mt-4 xl:mt-0">
              <div class="lg:pl-6 pb-2 lg:pb-0">
                <button class="bg-white text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-md shadow">ตกลง</button>
              </div>
              <label class="text-xs text-stone-400">(ใช้สำหรับสร้างหมวยตึก เพื่อง่ายต่อการจัดการ)</label>
            </div>
          </div>
        </div>

        <div class="mb-4 mt-20">
          <div class="flex justify-end space-x-2">
            <input type="text" placeholder="ค้นหาเลขห้อง/ชั้น/เเท็ก/..." class="border rounded-md p-2"></input>
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md">ค้นหา</button>
          </div>

          <div class="flex flex-col lg:flex-row justify-between items-start mt-6">
            <div class="lg:w-1/2 space-y-2 flex flex-col lg:justify-end lg:items-end px-5">
              <div>
                <label>จำนวนห้องพักทั้งหมด : </label>
                <label>{{ tags.lengthRoom }}</label>
              </div>
              <div>
                <label>โควต้าห้องพัก Sleep Gun :</label>
                <label>{{ tags.lengthRoomSleepGun }}</label>
              </div>
            </div>

            <div class="lg:w-1/2 space-y-2 px-5">
              <div>
                <label>เเสดง<span class="font-bold px-2">สถานะ</span>ใน employee เป็น</label>
                <button class="ml-2 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs"
                  @click="openStatusEditablePopup">{{ statusEditable ? 'Dropdown' : 'Text' }}</button>
              </div>
              <div>
                <label>เเสดง<span class="font-bold px-2">สถานะห้อง</span>ใน employee เป็น</label>
                <button class="ml-2 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs"
                  @click="openStatusRoomEditablePopup">{{ statusRoomEditable ? 'Dropdown' : 'Text' }}</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="text-stone-400">เเสดงพรีวิว POS</div>
          <div class="border  rounded-md p-4">

          </div>
        </div>
      </div>
    </template>
  </TemplatePartner>
</template>

<script setup>
import TemplatePartner from "@/components/TemplatePartner.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from 'vue';

const router = useRouter();
const tags = ref([]); // รายการแท็กทั้งหมด
const loading = ref(false); // สถานะการโหลด

// ฟังก์ชันสำหรับคำนวณสีข้อความที่เหมาะสมกับพื้นหลัง
function getContrastColor(hexColor) {
  // แปลง hex เป็น RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // คำนวณความสว่าง
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // ส่งคืนสีขาวหรือดำตามความสว่าง
  return brightness > 128 ? '#000000' : '#ffffff';
}

// ฟังก์ชันดึงข้อมูลแท็กทั้งหมด
async function getAllTags() {
  try {
    console.log('🔄 Fetching tags from: http://localhost:9999/HotelSleepGun/tag/getAll');

    const response = await fetch('http://localhost:9999/HotelSleepGun/tag/getAll');
    console.log('📡 Response status:', response.status);

    const result = await response.json();
    console.log('✅ Response data:', result);

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลแท็ก');
    }

    return result.data;
  } catch (error) {
    console.error('❌ Error fetching tags:', error);
    throw error;
  }
}

// โหลดข้อมูลแท็กเมื่อ component ถูกสร้าง
onMounted(async () => {
  try {
    loading.value = true;
    console.log('🔄 Loading tags on mount...');
    const fetchedTags = await getAllTags();
    console.log('📦 Fetched tags:', fetchedTags);
    tags.value = fetchedTags;
  } catch (error) {
    console.error('❌ Error loading tags:', error);
    alert(`เกิดข้อผิดพลาดในการโหลดข้อมูล: ${error.message}`);
  } finally {
    loading.value = false;
  }
});

const goToManageTag = () => {
  router.push("/managetag");
};

</script>
