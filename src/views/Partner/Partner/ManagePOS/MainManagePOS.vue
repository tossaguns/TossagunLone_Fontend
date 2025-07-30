<template>
  <TemplatePartner>
    <template #header>
      <label>จัดการ POS</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">

        <label class="text-2xl font-bold">จัดการรายการห้องพัก</label>

        <div class="mb-4 mt-12 border rounded-md p-4 bg-stone-50">
          <div class="flex  justify-between items-center">
            <label class="font-bold">เเสดง Tag ที่มีอยู่</label>
            <div class="flex justify-end">
              <button
                class="bg-white text-blue-500 hover:bg-blue-50 md:px-4 px-2 py-2 rounded-md shadow font-bold md:text-md text-xs"
                @click="goToManageTag">จัดการ Tag</button>
            </div>
          </div>

          <div class="mt-6">
            <div class="flex flex-wrap gap-2 ">
              <div v-for="(tag, index) in tags" :key="index"
                class="px-2  text-white font-medium md:text-sm text-xs flex items-center space-x-2 rounded-full" :style="{
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
          <label class="text-stone-400">เเสดงพรีวิว POS</label>


          <div class="md:border rounded-md md:p-4">
            <div class="grid grid-cols-2 md:flex md:flex-wrap gap-2">
              <div v-for="building in buildings" :key="building._id"
                class="md:w-fit border border-stone-300 rounded-md shadow">
                <button class="w-full md:w-[160px] h-full px-4 py-3 rounded-md font-bold" :style="{
                  color: building.colorText,
                  backgroundColor: building.hascolorBG === 'colorBG' ? building.colorBG : 'transparent',
                  backgroundImage: building.hascolorBG === 'imgBG' ? `url(${building.imgBG})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  textShadow: building.hascolorBG === 'imgBG' ? '2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(0, 0, 0, 0.3)' : 'none',
                  boxShadow: building.hascolorBG === 'imgBG' ? 'inset 0 0 100px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0)' : 'none'
                }">
                  {{ building.nameBuilding }}
                </button>
              </div>
              <!-- ปุ่มเพิ่มตึกใหม่ -->
              <div class="md:w-fit border-dashed border-2 border-stone-300 rounded-md py-3">
                <button @click="openDialog" class="w-full md:w-[160px] hover:bg-stone-50">+ เพิ่มจำนวนตึก</button>
              </div>
            </div>

            <div class="mt-10">
              <div class="flex md:justify-start justify-center items-center">
                <div class="mx-1">
                  <button
                    class="xl:w-[305px] md:w-[225px] w-[160px] h-32 border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center text-3xl text-stone-400 hover:bg-stone-100 transition">
                    +
                  </button>
                </div>

                <div class="border rounded-lg md:p-3 inline-flex flex-col shadow 2xl:text-md lg:text-sm text-xs mx-1">
                  <div class="md:border md:rounded-lg md:shadow">
                    <img src="/imgHotel/sea.jpg" alt="imgRoom"
                      class="xl:w-[280px] md:w-[200px] w-[160px] xl:h-[160px] h-[120px] object-cover rounded-t-md">
                    <div class="md:border md:rounded-b-md px-2 flex justify-end">
                      <label class="text-stone-400 lg:text-xs text-xxxs">ตึก {{ }} , ชั้น {{ }}</label>
                    </div>
                  </div>

                  <div class="flex flex-col justify-center items-center mt-2">
                    <div class="font-bold mt-2">
                      <label class="text-sm bg-green-600 text-white px-2 py-1 rounded-md">เลขห้อง : 457As{{ }}</label>
                    </div>
                    <div class="text-stone-400 2xl:text-sm lg:text-xs text-xxs mt-1">
                      <label>ประเภท : {{ }}, {{ }}</label>
                    </div>
                    <div>
                      <label>ราคา : THB {{ }}</label>
                    </div>
                  </div>

                  <div class="px-2 2xl:text-sm lg:text-xs text-xxs mt-1 text-stone-400">
                    <div class="mt-6 space-x-2">
                      <label>สถานะห้อง :</label>
                      <button class="bg-white text-blue-600 px-2 rounded shadow">ว่าง</button>
                    </div>
                    <div class="mt-1 space-x-2">
                      <label>สถานะ :</label>
                      <button class="bg-white text-amber-600 px-2 rounded shadow">ว่าง</button>
                    </div>

                    <div class="my-4 bg-stone-100 rounded-md p-2">
                      <div class="mt-1 space-x-2">
                        <label>สถานะโปรโมชั่น :</label>
                        <button class="bg-white text-green-600 px-2 rounded shadow">ว่าง</button>
                      </div>

                      <div class="mt-2">
                        <div class="px-4 flex items-center space-x-2">
                          <input type="radio" name="selectPromotion" id="selectPromotion" class="border rounded-md p-2">
                          <label for="selectPromotion">โปรโมชั่นที่ 1</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </template>
  </TemplatePartner>

  <Dialog header="จัดการสถานะห้องพัก">
    <div class="p-4">
      <label class="block mb-2 font-medium">สถานะห้องพัก</label>
      <select class="w-full border rounded-md p-2">
        <option value="1">ว่าง</option>
        <option value="2">ไม่ว่าง</option>
        <option value="3">กำลังทำความสะอาด</option>
      </select>
    </div>
  </Dialog>

  <Dialog v-model="dialogVisible" header="เพิ่มตึก">
    <div class="p-4">
      <div class="flex justify-start items-center space-x-2">
        <label class="block  font-bold">ชื่อตึก :</label>
        <input type="text" class="border rounded-md p-2" placeholder="ชื่อตึก..." v-model="buildingName" />
      </div>

      <div class="flex justify-start items-center space-x-2 mt-4">
        <label class="block font-bold">เลือกสีข้อความ :</label>
        <ColorPicker v-model="textColor" />
      </div>

      <div class="flex justify-start items-center space-x-2 mt-4">
        <label class="block font-bold">เลือกสีพื้นหลัง :</label>
        <div class="flex justify-start items-center space-x-2">
          <input type="radio" id="color" name="backgroundType" value="color" v-model="backgroundType" class="border" />
          <label for="color">สี</label>
          <input type="radio" id="image" name="backgroundType" value="image" v-model="backgroundType" class="border" />
          <label for="image">รูปภาพ</label>
        </div>
      </div>

      <div>
        <!-- เลือกสี -->
        <div v-if="backgroundType === 'color'" class="border rounded-lg p-3 mt-4">
          <label>เลือกสี</label>
          <ColorPicker v-model="backgroundColor" />
          <div class="flex justify-center items-center mt-2">
            <label>โค้ดสี : {{ backgroundColor }}</label>
          </div>
        </div>

        <!-- เลือกรูปภาพ -->
        <div v-if="backgroundType === 'image'" class="border rounded-lg p-3 mt-4">
          <label>เลือกรูปภาพ</label>
          <div class="flex flex-col justify-center items-center mt-2">
            <input type="file" class="border rounded-md p-2" @change="handleImageUpload" accept="image/*" />
            <div class="text-xs text-gray-500 mt-1">รองรับไฟล์ JPG, PNG, GIF ขนาดไม่เกิน 5MB</div>
            <div v-if="backgroundImage" class="mt-2">
              <img :src="backgroundImage" alt="Preview" class="w-20 h-20 object-cover rounded border" />
            </div>
          </div>

        </div>
      </div>

      <!-- preview -->
      <div class="mt-4 border rounded-lg p-3">
        <label class="font-bold">Preview</label>

        <div class="flex justify-center items-center mt-2">
          <button class="px-12 py-6 rounded-xl text-xl font-bold" :style="previewStyle">
            {{ buildingName || 'ชื่อตึก' }}
          </button>
        </div>

      </div>

      <div class="flex justify-end items-center space-x-2 mt-4">
        <button @click="cancelDialog" class="bg-white text-red-500 px-4 py-2 rounded-md border hover:bg-stone-50"
          :disabled="savingBuilding">ยกเลิก</button>
        <button @click="saveBuilding"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="savingBuilding">
          {{ savingBuilding ? 'กำลังบันทึก...' : 'ตกลง' }}
        </button>
      </div>

    </div>
  </Dialog>

</template>

<script setup>
import TemplatePartner from "@/components/TemplatePartner.vue";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from 'vue';
import Dialog from "@/components/element/Dialog.vue";
import ColorPicker from "@/components/element/ColorPicker.vue";

const router = useRouter();
const tags = ref([]); // รายการแท็กทั้งหมด
const buildings = ref([]); // รายการตึกทั้งหมด
const loading = ref(false); // สถานะการโหลด
const savingBuilding = ref(false); // สถานะการบันทึกตึก
const statusRoomEditable = ref(false); // สถานะการเปิด/ปิด Drawer
const dialogVisible = ref(false); // สถานะการเปิด/ปิด Dialog
const backgroundType = ref('color'); // ประเภทพื้นหลัง (color/image)
const selectedColor = ref('#FFBB00'); // สีที่เลือก

// ตัวแปรสำหรับการสร้างตึกใหม่
const buildingName = ref(''); // ชื่อตึก
const textColor = ref('#000000'); // สีข้อความ
const backgroundColor = ref('#FFBB00'); // สีพื้นหลัง
const backgroundImage = ref(''); // รูปภาพพื้นหลัง

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

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch('http://localhost:9999/HotelSleepGun/tag/getAll', {
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

// ฟังก์ชันดึงข้อมูลตึกทั้งหมด
async function getAllBuildings() {
  try {
    console.log('🔄 Fetching buildings from: http://localhost:9999/HotelSleepGun/building/getAll');

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch('http://localhost:9999/HotelSleepGun/building/getAll', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('📡 Response status:', response.status);

    const result = await response.json();
    console.log('✅ Response data:', result);

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลตึก');
    }

    return result.data;
  } catch (error) {
    console.error('❌ Error fetching buildings:', error);
    throw error;
  }
}

// โหลดข้อมูลแท็กและตึกเมื่อ component ถูกสร้าง
onMounted(async () => {
  try {
    loading.value = true;
    console.log('🔄 Loading tags and buildings on mount...');

    // โหลดข้อมูลแท็ก
    const fetchedTags = await getAllTags();
    console.log('📦 Fetched tags:', fetchedTags);
    tags.value = fetchedTags;

    // โหลดข้อมูลตึก
    const fetchedBuildings = await getAllBuildings();
    console.log('📦 Fetched buildings:', fetchedBuildings);
    buildings.value = fetchedBuildings;

  } catch (error) {
    console.error('❌ Error loading data:', error);

    // Check if it's an authentication error
    if (error.message.includes('token') || error.message.includes('เข้าสู่ระบบ')) {
      alert('เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่');
      // Redirect to login page
      router.push('/loginpartner');
    } else {
      alert(`เกิดข้อผิดพลาดในการโหลดข้อมูล: ${error.message}`);
    }
  } finally {
    loading.value = false;
  }
});

const goToManageTag = () => {
  router.push("/managetag");
};

// ฟังก์ชันเปิด Drawer
const openDrawer = () => {
  console.log('🎯 Opening drawer...');
  console.log('📊 statusRoomEditable before:', statusRoomEditable.value);
  statusRoomEditable.value = true;
  console.log('📊 statusRoomEditable after:', statusRoomEditable.value);
};

const openDialog = () => {
  console.log('🎯 Opening dialog...');
  console.log('📊 dialogVisible before:', dialogVisible.value);
  dialogVisible.value = true;
  console.log('📊 dialogVisible after:', dialogVisible.value);
};

// Computed property สำหรับ preview style
const previewStyle = computed(() => {
  const style = {
    color: textColor.value,
  };

  if (backgroundType.value === 'color') {
    style.backgroundColor = backgroundColor.value;
  } else if (backgroundType.value === 'image' && backgroundImage.value) {
    style.backgroundImage = `url(${backgroundImage.value})`;
    style.backgroundSize = 'cover';
    style.backgroundPosition = 'center';
    // เพิ่มเงาดำเพื่อให้ข้อความชัดเจนขึ้นเมื่อใช้รูปภาพพื้นหลัง
    style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8), -2px -2px 4px rgba(0, 0, 0, 0.8)';
    style.boxShadow = 'inset 0 0 100px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 0, 0, 0.5)';
  }

  return style;
});

// ฟังก์ชันจัดการการอัปโหลดรูปภาพ
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // ตรวจสอบขนาดไฟล์ (ไม่เกิน 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('ขนาดไฟล์ใหญ่เกินไป กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 5MB');
      event.target.value = ''; // รีเซ็ต input
      return;
    }

    // ตรวจสอบประเภทไฟล์
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น (JPG, PNG, GIF)');
      event.target.value = ''; // รีเซ็ต input
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      backgroundImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// ฟังก์ชันยกเลิกการสร้างตึก
const cancelDialog = () => {
  dialogVisible.value = false;
  // รีเซ็ตค่าทั้งหมด
  buildingName.value = '';
  textColor.value = '#000000';
  backgroundColor.value = '#FFBB00';
  backgroundImage.value = '';
  backgroundType.value = 'color';
};

// ฟังก์ชันบันทึกข้อมูลตึก
const saveBuilding = async () => {
  if (!buildingName.value.trim()) {
    alert('กรุณากรอกชื่อตึก');
    return;
  }

  // ตรวจสอบข้อมูลรูปภาพ
  if (backgroundType.value === 'image' && !backgroundImage.value) {
    alert('กรุณาเลือกรูปภาพพื้นหลัง');
    return;
  }

  savingBuilding.value = true;

  // แปลงข้อมูลให้ตรงกับ building schema
  const buildingData = {
    nameBuilding: buildingName.value,
    colorText: textColor.value,
    hascolorBG: backgroundType.value === 'color' ? 'colorBG' : 'imgBG',
    colorBG: backgroundType.value === 'color' ? backgroundColor.value : undefined,
    imgBG: backgroundType.value === 'image' ? backgroundImage.value : undefined,
  };

  console.log('💾 Saving building data:', {
    ...buildingData,
    imgBG: buildingData.imgBG ? 'present (base64)' : 'undefined'
  });

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    // เรียก API เพื่อบันทึกข้อมูลลงฐานข้อมูล
    const response = await fetch('http://localhost:9999/HotelSleepGun/building/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildingData),
    });

    // ตรวจสอบ response type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response. Please try again.');
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }

    alert('บันทึกข้อมูลตึกเรียบร้อยแล้ว');
    cancelDialog();

    // รีเฟรชข้อมูลตึกที่แสดงในหน้า
    try {
      const fetchedBuildings = await getAllBuildings();
      buildings.value = fetchedBuildings;
    } catch (error) {
      console.error('❌ Error refreshing buildings:', error);
    }

  } catch (error) {
    console.error('❌ Error saving building:', error);

    // Check if it's an authentication error
    if (error.message.includes('token') || error.message.includes('เข้าสู่ระบบ')) {
      alert('เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่');
      // Redirect to login page
      router.push('/loginpartner');
    } else {
      alert(`เกิดข้อผิดพลาดในการบันทึกข้อมูล: ${error.message}`);
    }
  } finally {
    savingBuilding.value = false;
  }
};

</script>
