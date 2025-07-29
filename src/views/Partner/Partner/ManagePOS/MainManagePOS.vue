<!-- FIXME: กลับมาทำพรุ่งนี้ -->
<template>
  <TemplatePartner>
    <template #header>
      <label>จัดการ POS</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">

        <label class="text-2xl font-bold">จัดการรายการห้องพัก</label>
        <div class="flex justify-between items-start mt-6">
          <div class="w-1/2">
            <label class="font-bold">ที่พักมีจำนวนทั้งหมดกี่ตึก</label>
            <div class="px-4">
              <label>ต้องการเเบ่งตึกเพื่อให้ง่ายต่อการค้นหาหรือไม่</label>
              <div class="flex space-x-4 mt-2">
                <div class="flex items-center space-x-2">
                  <input type="radio" name="radiobuilding" id="radiobuilding" value="yes" v-model="useBuilding"
                    @change="resetBuildingCount" />
                  <label for="radiobuilding">ใช่</label>
                </div>
                <div class="flex items-center space-x-2">
                  <input type="radio" name="radiobuilding" id="radiobuilding" value="no" v-model="useBuilding"
                    @change="resetBuildingCount" />
                  <label for="radiobuilding">ไม่</label>
                </div>
              </div>
            </div>
            <div class="mt-4 px-6" v-if="useBuilding === 'yes'">
              <div class="border rounded-lg p-4">
                <div>
                  <label>ที่พักมีจำนวนกี่ตึก</label>
                  <input type="text"
                    class="border w-full py-2 px-2 rounded-md mt-1 border-stone-300 hover:border-amber-600"
                    placeholder="จำนวนตึก" v-model="buildingCount" />
                </div>
              </div>
            </div>
          </div>

          <div class="w-1/2">
            <label class="font-bold">ที่พักมีจำนวนกี่ชั้น</label>
            <div class="px-4">
              <label>ต้องการเเบ่งชั้นเพื่อให้ง่ายต่อการค้นหาหรือไม่</label>
              <div class="flex space-x-4 mt-2">
                <div class="flex items-center space-x-2">
                  <input type="radio" name="radiofloor" id="radiofloor" value="yes" v-model="useFloor"
                    @change="resetFloorCount" />
                  <label for="radiofloor">ใช่</label>
                </div>
                <div class="flex items-center space-x-2">
                  <input type="radio" name="radiofloor" id="radiofloor" value="no" v-model="useFloor"
                    @change="resetFloorCount" />
                  <label for="radiofloor">ไม่</label>
                </div>
              </div>
            </div>
            <div class="mt-4 px-6" v-if="useFloor === 'yes'">
              <div class="border rounded-lg p-4">
                <div>
                  <label>มีจำนวนกี่ชั้น</label>
                  <input type="text"
                    class="border w-full py-2 px-2 rounded-md mt-1 border-stone-300 hover:border-amber-600"
                    placeholder="จำนวนชั้น" v-model="floorCount" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <div>
            <label class="text-lg font-bold">ครีเอทเเท็กสำหรับห้องพัก</label>
            <div class="border rounded-lg p-4 mt-4">
              <div>
                <label>ชื่อเเท็ก</label>
                <input type="text"
                  class="border rounded-md w-full py-2 px-2 mt-1 border-stone-300 hover:border-amber-600"
                  placeholder="ชื่อเเท็ก...เช่น ห้องใต้บรรได / ห้องติดบรรไดหนีไฟ / ห้องข้างลิฟต์ ..."
                  v-model="tagName" />
              </div>
              <div>
                <label>รายละเอียด</label>
                <textarea type="text" rows="3"
                  class="border rounded-md w-full py-2 px-2 mt-1 border-stone-300 hover:border-amber-600"
                  placeholder="รายละเอียด..." v-model="tagDescription" />
              </div>
              <div>
                <label>เลือกเเท็กสี</label>
                <div class="p-8">
                  <ColorPicker v-model="selectedColor" />
                </div>
              </div>

              <div>
                <label>เเสดงตัวเลือกเเท็กสี</label>
                <div class="mt-2 p-4 border rounded-lg bg-gray-50">
                  <div class="flex flex-wrap gap-2">
                    <div v-for="(tag, index) in tags" :key="index"
                      class="px-1 py-1 rounded-lg text-white font-medium text-sm flex items-center space-x-2" :style="{
                        backgroundColor: tag.color,
                        border: `2px solid ${tag.color}`,
                        color: getContrastColor(tag.color)
                      }">
                      <span class="px-2">{{ tag.name }}</span>
                      <button @click="removeTag(tag.id)"
                        class="ml-1 text-xs font-bold hover:bg-black hover:bg-opacity-20 rounded-full w-5 h-5 flex items-center justify-center bg-stone-700">
                        x
                      </button>
                    </div>
                  </div>
                  <div v-if="tags.length === 0" class="text-gray-500 text-sm italic">
                    ยังไม่มีแท็กที่สร้างขึ้น
                  </div>
                </div>
              </div>

              <div class="mt-4 flex justify-center">
                <button class="text-amber-400 font-bold rounded-lg px-4 py-2 hover:text-amber-500 transition shadow-md"
                  @click="addTag">เพิ่มเเท็ก</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 flex justify-center space-x-2">
          <button class="bg-blue-600 rounded-lg px-4 py-2 text-white hover:bg-blue-700 transition"
            @click="saveData">บันทึก</button>
          <button class="bg-red-600 rounded-lg px-4 py-2 text-white hover:bg-red-700 transition">ยกเลิก</button>
        </div>
      </div>
    </template>
  </TemplatePartner>
</template>

<script setup>
import TemplatePartner from "@/components/TemplatePartner.vue";
import { ref } from 'vue';

import ColorPicker from '@/components/element/ColorPicker.vue';

// Reactive data
const selectedColor = ref('#00ccff'); // ค่าสีเริ่มต้น
const tagName = ref(''); // ชื่อแท็ก
const tagDescription = ref(''); // รายละเอียดแท็ก
const tags = ref([]); // รายการแท็กทั้งหมด

// ข้อมูลตึกและชั้น
const buildingCount = ref(''); // จำนวนตึก
const floorCount = ref(''); // จำนวนชั้น
const useBuilding = ref('no'); // ใช้การแบ่งตึกหรือไม่
const useFloor = ref('no'); // ใช้การแบ่งชั้นหรือไม่

// ฟังก์ชันรีเซ็ตค่าจำนวนตึกเมื่อเปลี่ยนการเลือก
function resetBuildingCount() {
  if (useBuilding.value === 'no') {
    buildingCount.value = '';
  }
}

// ฟังก์ชันรีเซ็ตค่าจำนวนชั้นเมื่อเปลี่ยนการเลือก
function resetFloorCount() {
  if (useFloor.value === 'no') {
    floorCount.value = '';
  }
}

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

// ฟังก์ชันเพิ่มแท็ก
function addTag() {
  console.log('tagName.value:', tagName.value);
  console.log('tagName.value.trim():', tagName.value.trim());
  console.log('tagName.value.length:', tagName.value.length);

  if (tagName.value.trim() === '') {
    alert('กรุณากรอกชื่อแท็ก');
    return;
  }

  const newTag = {
    id: Date.now(), // ใช้ timestamp เป็น ID
    name: tagName.value.trim(),
    description: tagDescription.value.trim(),
    color: selectedColor.value
  };

  console.log('newTag:', newTag);

  tags.value.push(newTag);

  // รีเซ็ตฟอร์ม
  tagName.value = '';
  tagDescription.value = '';
  selectedColor.value = '#00ccff';
}

// ฟังก์ชันลบแท็ก
function removeTag(tagId) {
  const index = tags.value.findIndex(tag => tag.id === tagId);
  if (index > -1) {
    tags.value.splice(index, 1);
  }
}

// ฟังก์ชันบันทึกข้อมูล
function saveData() {
  console.log('บันทึกข้อมูล:', {
    buildingCount: buildingCount.value,
    floorCount: floorCount.value,
    tags: tags.value
  });

  // TODO: เชื่อมต่อกับ backend เพื่อบันทึกข้อมูล
  alert('บันทึกข้อมูลเรียบร้อยแล้ว!');
}

</script>
