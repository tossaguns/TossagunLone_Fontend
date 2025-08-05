<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto text-stone-600 bg-stone-100">

        <div class="flex lg:justify-between items-start">
          <div class="w-4/12 lg:block hidden p-2">
            <div class="sticky top-0 min-h-screen">
              <iframe class="w-full min-h-screen rounded-t-lg" frameborder="0" style="border:0" loading="lazy"
                allowfullscreen referrerpolicy="no-referrer-when-downgrade" :src="mapUrl"></iframe>
            </div>
          </div>


          <div class="lg:w-8/12 w-full" style="max-height:100vh;overflow-y:auto;">
            <div class="bg-white px-4 mr-2 rounded-b-lg">
              <class>
                <BarDateMember :show-calendar="showCalendar" @close-calendar="showCalendar = false" />
              </class>
            </div>
            <div class="flex justify-between items-start mt-2 space-x-2 mr-2  ">
              <div class="w-3/12 bg-white rounded-lg h-full">
                <div class="p-2">
                  <div class="p-4">
                    <PriceSlider v-model="range" :min="0" :max="100" />
                  </div>
                  <div class="p-4">
                    <div>
                      <label class="text-sm font-bold">ค้นหายอดนิยม</label>

                      <div class="flex flex-col justify-start items-start  mt-2 pl-4">
                        <div v-for="(option, idx) in popularOptions" :key="'popular-' + idx"
                          class="flex items-center space-x-1">
                          <input type="checkbox" :id="'popular-' + idx" v-model="selectedPopular" :value="option">
                          <label class="text-sm" :for="'popular-' + idx">{{ option }}</label>
                        </div>
                      </div>
                    </div>

                    <div class="my-4">
                      <hr class="border-stone-200" />
                    </div>

                    <div>
                      <label class="text-sm font-bold">สิ่งอำนวยความสะดวก</label>

                      <div class="flex flex-col justify-start items-start  mt-2 pl-4">
                        <div v-for="(option, idx) in facilityOptions" :key="'facility-' + idx"
                          class="flex items-center space-x-1">
                          <input type="checkbox" :id="'facility-' + idx" v-model="selectedFacility" :value="option">
                          <label class="text-sm" :for="'facility-' + idx">{{ option }}</label>
                        </div>
                      </div>
                    </div>

                    <div class="my-4">
                      <hr class="border-stone-200" />
                    </div>

                    <div>
                      <label class="text-sm font-bold">ทำเลที่ตั้ง</label>

                      <div class="flex flex-col justify-start items-start  mt-2 pl-4">
                        <div v-for="(option, idx) in locationOptions" :key="'location-' + idx"
                          class="flex items-center space-x-1">
                          <input type="checkbox" :id="'location-' + idx" v-model="selectedLocation" :value="option">
                          <label class="text-sm" :for="'location-' + idx">{{ option }}</label>
                        </div>
                      </div>
                    </div>


                    <div class="my-4">
                      <hr class="border-stone-200" />
                    </div>

                    <div>
                      <label class="text-sm font-bold">ภายในห้องพัก</label>

                      <div class="flex flex-col justify-start items-start  mt-2 pl-4">
                        <div v-for="(option, idx) in roomOptions" :key="'room-' + idx"
                          class="flex items-center space-x-1">
                          <input type="checkbox" :id="'room-' + idx" v-model="selectedRoom" :value="option">
                          <label class="text-sm" :for="'room-' + idx">{{ option }}</label>
                        </div>
                      </div>
                    </div>


                    <div class="my-4">
                      <hr class="border-stone-200" />
                    </div>

                    <div>
                      <label class="text-sm font-bold">มื้ออาหาร</label>

                      <div class="flex flex-col justify-start items-start  mt-2 pl-4">
                        <div v-for="(option, idx) in foodOptions" :key="'food-' + idx"
                          class="flex items-center space-x-1">
                          <input type="checkbox" :id="'food-' + idx" v-model="selectedFood" :value="option">
                          <label class="text-sm" :for="'food-' + idx">{{ option }}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div class="w-9/12">
                <div>
                  <label class="text-sm font-bold">ห้องพักทั้งหมด {{ allRooms.length }} รายการ</label>
                </div>
                <div class="">
                  <Hotellist v-for="(room, index) in rooms" :key="index" v-bind="room" @add-to-cart="handleAddToCart"
                    @remove-from-cart="handleRemoveFromCart" />
                  <div v-if="rooms.length < allRooms.length" class="flex justify-center my-4">
                    <button @click="loadMoreRooms"
                      class="bg-stone-300 text-white font-bold px-6 py-2 rounded shadow text-sm">โหลดเพิ่มเติม</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Bar from "@components/BarMember.vue";
import Footer from "@components/FooterLoneTossagun.vue";
import { ref, onMounted } from 'vue';
import BarDateMember from "@components/BarDateMember.vue";
import PriceSlider from "@components/element/PriceSlider.vue";
import Hotellist from "@components/element/Hotellist.vue";
import { useRouter } from 'vue-router';

const range = ref([20, 80])
const router = useRouter();

// ข้อมูลตัวอย่าง checkbox
const popularOptions = ["ใกล้รถไฟฟ้า", "ติดทะเล", "มีอาหารเช้า"];
const selectedPopular = ref([]);
const facilityOptions = ["Wi-Fi", "สระว่ายน้ำ", "ฟิตเนส"];
const selectedFacility = ref([]);
const locationOptions = ["ใจกลางเมือง", "ใกล้ห้าง", "วิวภูเขา"];
const selectedLocation = ref([]);
const roomOptions = ["เตียงคู่", "อ่างอาบน้ำ", "ทีวี"];
const selectedRoom = ref([]);
const foodOptions = ["บุฟเฟต์", "อาหารไทย", "อาหารนานาชาติ"];
const selectedFood = ref([]);

const allRooms = [
  // 3 ตัวอย่างแรก
  {
    roomCode: 'R001', roomType: 'ห้องธรรมดา', maxGuests: 2, description: 'ห้องพักเรียบง่ายพร้อมสิ่งอำนวยความสะดวกพื้นฐาน', discountPrice: 1200, facilities: [{ icon: '/images/icon/bed.png', label: 'เตียงนุ่มสบาย' }, { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Fi' }], images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Bangkok.jpg'],
  },
  {
    roomCode: 'R002', roomType: 'ห้องวิวทะเล', maxGuests: 3, description: 'สัมผัสวิวทะเลสวยจากระเบียงส่วนตัว', originalPrice: 2800, discountPrice: 2500, facilities: [{ icon: '/images/icon/sea.png', label: 'วิวทะเล' }, { icon: '/images/icon/aircon.png', label: 'แอร์เย็นฉ่ำ' }], images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Phuket.jpg'],
  },
  {
    roomCode: 'R003', roomType: 'ห้องสวีท', maxGuests: 4, description: 'ห้องพักหรูหราสำหรับครอบครัวหรือคู่รัก', originalPrice: 4500, discountPrice: 4200, facilities: [{ icon: '/images/icon/bathtub.png', label: 'อ่างอาบน้ำ' }, { icon: '/images/icon/tv.png', label: 'ทีวีจอใหญ่' }], images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Chonburi.jpg'],
  },
  // mock 4-20
  ...Array.from({ length: 17 }, (_, i) => ({
    roomCode: `R${(i + 4).toString().padStart(3, '0')}`,
    roomType: ['ห้องธรรมดา', 'ห้องวิวทะเล', 'ห้องสวีท', 'ห้องแฟมิลี่', 'ห้องโรแมนติก'][i % 5],
    maxGuests: 2 + (i % 4),
    description: `รายละเอียดห้องตัวอย่าง ${i + 4}`,
    discountPrice: 1000 + (i % 5) * 500,
    facilities: [
      { icon: '/images/icon/bed.png', label: 'เตียงนุ่มสบาย' },
      { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Fi' },
    ],
    images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Bangkok.jpg'],


  }))
];
const rooms = ref([]);
const roomsPerPage = 15;
const currentPage = ref(1);

function loadMoreRooms() {
  const end = currentPage.value * roomsPerPage;
  rooms.value = allRooms.slice(0, end);
  currentPage.value++;
}

onMounted(() => {
  loadMoreRooms();
});

const mapUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.725152370527!2d100.52318681534138!3d13.736717401027756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2992e2dc0db0d%3A0x78e9f0aa1d401c6c!2z4LiB4Li44Lih4LiE4Lij4Li04Lip4Lix4LiU4Lij4Liw4Lia4Li54LiZ4LiiIOC4l-C4quC4suC4geC4seC4meC4suC4geC4peC4seC4lOC4hOC4meC4reC4mQ!5e0!3m2!1sth!2sth!4v1620278354921!5m2!1sth!2sth'

</script>
