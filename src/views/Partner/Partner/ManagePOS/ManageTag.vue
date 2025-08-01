<!-- FIXME: กลับมาทำพรุ่งนี้ -->
<template>
  <TemplatePartner>
    <template #header>
      <label>จัดการ POS</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">

        <label class="text-2xl font-bold">จัดการรายการห้องพัก</label>

        <div class="mt-6">
          <div>
            <!-- แสดงฟอร์มสร้างแท็กใหม่เมื่อไม่ได้อยู่ในโหมดแก้ไข -->
            <div v-if="!isEditing">
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
                  <div class="p-8 flex flex-col justify-center items-center">
                    <label class="text-gray-700 font-medium">เลือกสีของคุณ:</label>
                    <ColorPicker v-model="selectedColor" />
                    <p class="text-sm text-gray-500 mt-2">ค่าสีที่เลือก: {{ selectedColor }}</p>
                  </div>
                </div>

                <div class="mt-4 flex justify-center space-x-2">
                  <button
                    class="text-amber-400 font-bold rounded-lg px-4 py-2 hover:text-amber-500 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="addTag" :disabled="loading">
                    {{ loading ? 'กำลังเพิ่ม...' : 'เพิ่มเเท็ก' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- แสดงฟอร์มแก้ไขแท็กเมื่ออยู่ในโหมดแก้ไข -->
            <div v-if="isEditing">
              <label class="text-lg font-bold">แก้ไขเเท็ก</label>
              <div class="border rounded-lg p-4 mt-4 bg-stone-50 shadow-md">
                <div>
                  <label>ชื่อเเท็ก</label>
                  <input type="text"
                    class="border rounded-md w-full py-2 px-2 mt-1 border-stone-300 hover:border-amber-600 bg-amber-100"
                    placeholder="ชื่อเเท็ก...เช่น ห้องใต้บรรได / ห้องติดบรรไดหนีไฟ / ห้องข้างลิฟต์ ..."
                    v-model="editingTagName" />
                </div>
                <div>
                  <label>รายละเอียด</label>
                  <textarea type="text" rows="3"
                    class="border rounded-md w-full py-2 px-2 mt-1 border-stone-300 hover:border-amber-600 bg-amber-100"
                    placeholder="รายละเอียด..." v-model="editingTagDescription" />
                </div>
                <div>
                  <label>เลือกเเท็กสี</label>
                  <div class="p-8 flex flex-col justify-center items-center">
                    <label class="text-gray-700 font-medium">เลือกสีของคุณ:</label>
                    <ColorPicker v-model="editingTagColor" />
                    <p class="text-sm text-gray-500 mt-2">ค่าสีที่เลือก: {{ editingTagColor }}</p>
                  </div>
                </div>

                <div class="mt-4 flex justify-center space-x-2">
                  <button
                    class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="updateTag" :disabled="loading">
                    {{ loading ? 'กำลังอัปเดต...' : 'อัปเดตเเท็ก' }}
                  </button>
                  <button class="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition shadow-md"
                    @click="cancelEdit">
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- แสดงรายการแท็กทั้งหมด -->
          <div class="mt-6">
            <label class="text-lg font-bold">รายการแท็กทั้งหมด</label>
            <div class="mt-2 p-4 border rounded-lg bg-gray-50">
              <div class="flex flex-wrap gap-2">
                <div v-for="(tag, index) in tags" :key="index"
                  class="px-1 py-1 rounded-lg text-white font-medium text-sm flex items-center space-x-2" :style="{
                    backgroundColor: tag.color,
                    border: `2px solid ${tag.color}`,
                    color: getContrastColor(tag.color)
                  }">
                  <span class="px-2">{{ tag.name }}</span>
                  <button @click="startEditTag(tag)" class="rounded-full shadow-md p-1 bg-gray-300 hover:bg-gray-50">
                    <img src="/imgHotel/edit.png" alt="edit" class="w-3 h-3">
                  </button>
                  <button @click="removeTag(tag._id)"
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
        </div>

        <div class="mt-8 flex justify-center space-x-2">

          <button @click="goToMainManagePOS"
            class="bg-red-600 rounded-lg px-4 py-2 text-white hover:bg-red-700 transition">กลับ</button>
        </div>
      </div>
    </template>
  </TemplatePartner>
</template>

<script setup>
import TemplatePartner from "@/components/TemplatePartner.vue";
import { ref, onMounted } from 'vue';
import ColorPicker from '@/components/element/ColorPicker.vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';


// Reactive data
const selectedColor = ref('#FFBB00'); // ค่าสีเริ่มต้น
const tagName = ref(''); // ชื่อแท็ก
const tagDescription = ref(''); // รายละเอียดแท็ก
const tags = ref([]); // รายการแท็กทั้งหมด
const loading = ref(false); // สถานะการโหลด
const router = useRouter();

// เพิ่มตัวแปรสำหรับการแก้ไข
const isEditing = ref(false); // สถานะการแก้ไข
const editingTagId = ref(null); // ID ของแท็กที่กำลังแก้ไข
const editingTagName = ref(''); // ชื่อแท็กที่กำลังแก้ไข
const editingTagDescription = ref(''); // รายละเอียดแท็กที่กำลังแก้ไข
const editingTagColor = ref(''); // สีแท็กที่กำลังแก้ไข

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

function goToMainManagePOS() {
  router.push('/mainmanagepos');
}



// ฟังก์ชันสร้างแท็กใหม่
async function createTag(tagData) {
  try {
    console.log('🚀 Sending request to: http://localhost:9999/HotelSleepGun/pos/tags');
    console.log('📦 Request data:', tagData);

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/tags', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tagData)
    });

    console.log('📡 Response status:', response.status);

    const result = await response.json();
    console.log('✅ Response data:', result);

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการสร้างแท็ก');
    }

    return result;
  } catch (error) {
    console.error('❌ Error creating tag:', error);
    throw error;
  }
}

// ฟังก์ชันดึงข้อมูลแท็กทั้งหมด
async function getAllTags() {
  try {
    console.log('🔄 Fetching tags from: http://localhost:9999/HotelSleepGun/pos/tags');

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/tags', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
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

// ฟังก์ชันลบแท็กตาม ID
async function deleteTagById(tagId) {
  try {
    console.log('🗑️ Deleting tag with ID:', tagId);

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch(`http://localhost:9999/HotelSleepGun/pos/tags/${tagId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Response status:', response.status);

    const result = await response.json();
    console.log('✅ Response data:', result);

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการลบแท็ก');
    }

    return result;
  } catch (error) {
    console.error('❌ Error deleting tag:', error);
    throw error;
  }
}

// ฟังก์ชันอัปเดตแท็ก
async function updateTagById(tagId, tagData) {
  try {
    console.log('🔄 Updating tag with ID:', tagId);
    console.log('📦 Update data:', tagData);

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch(`http://localhost:9999/HotelSleepGun/pos/tags/${tagId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tagData)
    });

    console.log('📡 Response status:', response.status);

    const result = await response.json();
    console.log('✅ Response data:', result);

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการอัปเดตแท็ก');
    }

    return result;
  } catch (error) {
    console.error('❌ Error updating tag:', error);
    throw error;
  }
}

// ฟังก์ชันเพิ่มแท็ก
async function addTag() {
  if (tagName.value.trim() === '') {
    alert('กรุณากรอกชื่อแท็ก');
    return;
  }

  loading.value = true;

  try {
    console.log('🎯 Starting to add tag...');

    const tagData = {
      name: tagName.value.trim(),
      description: tagDescription.value.trim(),
      color: selectedColor.value
    };

    console.log('📝 Tag data to send:', tagData);

    const result = await createTag(tagData);

    console.log('✅ Tag created successfully:', result);

    // เพิ่มแท็กใหม่เข้าไปในรายการ
    tags.value.push(result.data);

    // รีเซ็ตฟอร์ม
    tagName.value = '';
    tagDescription.value = '';
    selectedColor.value = '#FFBB00';

    // แสดงข้อความสำเร็จ
    await Swal.fire({
      icon: 'success',
      title: 'เพิ่มแท็กสำเร็จ',
      showConfirmButton: false,
      timer: 1200
    });
  } catch (error) {
    console.error('❌ Error in addTag:', error);

    // แสดงข้อความผิดพลาด
    await Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: `เกิดข้อผิดพลาด: ${error.message}`
    });
  } finally {
    loading.value = false;
  }
}

// ฟังก์ชันเริ่มการแก้ไขแท็ก
function startEditTag(tag) {
  console.log('✏️ Starting to edit tag:', tag);

  // ตั้งค่าข้อมูลสำหรับการแก้ไข
  editingTagId.value = tag._id;
  editingTagName.value = tag.name;
  editingTagDescription.value = tag.description || '';
  editingTagColor.value = tag.color;

  // เปลี่ยนเป็นโหมดแก้ไข
  isEditing.value = true;
}

// ฟังก์ชันยกเลิกการแก้ไข
function cancelEdit() {
  console.log('❌ Canceling edit mode');

  // รีเซ็ตข้อมูลการแก้ไข
  editingTagId.value = null;
  editingTagName.value = '';
  editingTagDescription.value = '';
  editingTagColor.value = '';

  // ออกจากโหมดแก้ไข
  isEditing.value = false;
}

// ฟังก์ชันอัปเดตแท็ก
async function updateTag() {
  if (editingTagName.value.trim() === '') {
    await Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: 'กรุณากรอกชื่อแท็ก'
    });
    return;
  }

  loading.value = true;

  try {
    console.log('🔄 Starting to update tag...');

    const tagData = {
      name: editingTagName.value.trim(),
      description: editingTagDescription.value.trim(),
      color: editingTagColor.value
    };

    console.log('📝 Tag data to update:', tagData);

    const result = await updateTagById(editingTagId.value, tagData);

    console.log('✅ Tag updated successfully:', result);

    // อัปเดตข้อมูลในรายการ
    const index = tags.value.findIndex(tag => tag._id === editingTagId.value);
    if (index > -1) {
      tags.value[index] = {
        ...tags.value[index],
        name: tagData.name,
        description: tagData.description,
        color: tagData.color
      };
    }

    // รีเซ็ตโหมดแก้ไข
    cancelEdit();

    // แสดงข้อความสำเร็จ
    await Swal.fire({
      icon: 'success',
      title: 'อัปเดตแท็กสำเร็จ',
      showConfirmButton: false,
      timer: 1200
    });
  } catch (error) {
    console.error('❌ Error in updateTag:', error);

    // แสดงข้อความผิดพลาด
    await Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: `เกิดข้อผิดพลาดในการอัปเดตแท็ก: ${error.message}`
    });
  } finally {
    loading.value = false;
  }
}

// ฟังก์ชันลบแท็ก
async function removeTag(tagId) {
  try {
    console.log('🗑️ Removing tag with ID:', tagId);
    console.log('🔍 Tag ID type:', typeof tagId);
    console.log('🔍 Tag ID value:', tagId);

    // ตรวจสอบว่า tagId มีค่าหรือไม่
    if (!tagId) {
      console.error('❌ Tag ID is undefined or null');
      await Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่พบ ID ของแท็กที่ต้องการลบ'
      });
      return;
    }

    // ยืนยันการลบด้วย SweetAlert
    const result = await Swal.fire({
      title: 'ยืนยันการลบแท็ก?',
      text: 'คุณต้องการลบแท็กนี้ใช่หรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    });

    if (!result.isConfirmed) {
      return;
    }

    // เรียก API ลบแท็ก
    await deleteTagById(tagId);

    // ลบออกจากรายการในหน้า
    const index = tags.value.findIndex(tag => tag._id === tagId || tag.id === tagId);
    if (index > -1) {
      tags.value.splice(index, 1);
    }

    // แสดงข้อความสำเร็จ
    await Swal.fire({
      icon: 'success',
      title: 'ลบแท็กสำเร็จ',
      showConfirmButton: false,
      timer: 1200
    });
  } catch (error) {
    console.error('❌ Error in removeTag:', error);

    // แสดงข้อความผิดพลาด
    await Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: `เกิดข้อผิดพลาดในการลบแท็ก: ${error.message}`
    });
  }
}

// ฟังก์ชันบันทึกข้อมูล
function saveData() {
  console.log('บันทึกข้อมูล:', {
    tags: tags.value
  });

  alert('บันทึกข้อมูลเรียบร้อยแล้ว!');
}

// โหลดข้อมูลแท็กเมื่อ component ถูกสร้าง
onMounted(async () => {
  try {
    console.log('🔄 Loading tags on mount...');
    const fetchedTags = await getAllTags();
    console.log('📦 Fetched tags:', fetchedTags);

    // Debug: ตรวจสอบโครงสร้างของ tag object
    if (fetchedTags && fetchedTags.length > 0) {
      console.log('🔍 First tag structure:', fetchedTags[0]);
      console.log('🔍 First tag keys:', Object.keys(fetchedTags[0]));
      console.log('🔍 First tag _id:', fetchedTags[0]._id);
      console.log('🔍 First tag id:', fetchedTags[0].id);
    }

    tags.value = fetchedTags;
  } catch (error) {
    console.error('❌ Error loading tags:', error);

    // Check if it's an authentication error
    if (error.message.includes('token') || error.message.includes('เข้าสู่ระบบ')) {
      alert('เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่');
      // Redirect to login page
      router.push('/loginpartner');
    } else {
      alert(`เกิดข้อผิดพลาดในการโหลดข้อมูล: ${error.message}`);
    }
  }
});
</script>
