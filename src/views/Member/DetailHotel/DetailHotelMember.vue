<template>
  <div>

    <!-- Bar แรก -->
    <div class="sticky top-0 z-50 bg-white shadow">
      <Bar />
    </div>

    <!-- BarDateMember: แสดงเมื่อ showBarDateMember เป็น true -->
    <transition name="slide-down">
      <div v-if="showBarDateMember" class="sticky md:top-[80px] top-[65px] z-40 bg-white shadow-lg">
        <BarDateMember :show-calendar="showCalendar" @close-calendar="showCalendar = false" />
      </div>
    </transition>


    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto text-stone-600">
        <div class="mt-8">
          <div class="flex flex-col md:flex-row justify-start md:items-center">
            <div class=" flex space-x-3 px-4 justify-start items-center">
              <img src="/images/icon/company_nav.png" class="w-8" />
              <label class="md:text-2xl text-xl font-bold text-black">{{ hotelName }}</label>
            </div>

            <div class="flex justify-end items-end px-4 md:px-0">
              <div class="flex items-start space-x-4">
                <div>
                  <span v-for="n in 5" :key="n" class="text-xl"
                    :class="n <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'">★</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-6 mt-2 px-4">
            <hr class="border" />
          </div>

          <div class="flex flex-col lg:flex-row justify-between items-center space-x-4 px-4">
            <div>
              <Gallery />
            </div>

            <div class="lg:w-1/3 border rounded-lg w-full hidden lg:block">
              <div>
                <iframe class="w-full h-full rounded-t-lg" frameborder="0" style="border:0" loading="lazy"
                  allowfullscreen referrerpolicy="no-referrer-when-downgrade" :src="mapUrl"></iframe>
                <div class="flex justify-center mt-2 text-xs space-x-2">
                  <label>ละติจูด : {{ latitude }}</label>
                  <label>ลองติจูด : {{ longitude }}</label>
                </div>
              </div>

              <div class="px-6 py-7">
                <div>
                  <label>บ้านเลขที่ : <span class="font-bold">{{ address }}</span></label>
                </div>
                <div>
                  <label>ตำบล : <span class="font-bold">{{ subDistrict }}</span></label>
                </div>
                <div>
                  <label>อำเภอ : <span class="font-bold"> {{ district }}</span></label>
                </div>
                <div>
                  <label>จังหวัด : <span class="font-bold">{{ province }}</span></label>
                </div>
                <div>
                  <label>รหัสไปรษณีย์ : <span class="font-bold">{{ zipcode }}</span></label>
                </div>
              </div>
            </div>
          </div>

          <div class=" mt-4 p-4">
            <div class="md:text-sm text-xs">
              <label class="block mt-2 indent-8 text-stone-400">{{
                }}ประเภทของห้องพักโรงแรมคือการจำแนกประเภทห้องพักที่มีให้บริการในโรงแรม การแบ่ง ‘ประเภท’
                ห้องพักจะช่วยให้แขกเข้าใจได้อย่างชัดเจนว่าพวกเขากำลังจองห้องพักลักษณะไหนในขณะวางแผนการท่องเที่ยว
                ประเภทห้องพักโรงแรมมีรูปแบบแตกต่างกันไปตามขนาด จำนวนและประเภทของเตียง สิ่งอำนวยความสะดวก
                และสิ่งที่แขกสามารถทำได้ภายในห้อง (เช่น ห้องที่อนุญาตให้สูบบุหรี่หรือไม่ให้สูบบุหรี่)
              </label>
            </div>
          </div>

          <div class="px-8 mt-12">
            <div class="flex flex-col justify-center items-center">
              <label class="font-bold">ช่วงเวลาในการเข้าใช้บริการ</label>
              <div class="flex items-center md:text-base text-xs">
                <div class="flex justify-center items-center flex-col md:px-6">
                  <div class="my-4">
                    <img src="/imgHotel/checkin.jpg" class="w-14 h-14 object-cover  rounded-full shadow-lg">
                  </div>
                  <label>เวลาเช็คอิน</label>
                  <label>{{ checkinTime }}</label>
                </div>

                <div class="w-px bg-gray-400 mx-4 my-6 self-stretch"></div>

                <div class="flex justify-center items-center flex-col md:px-6">
                  <div class="my-4">
                    <img src="/imgHotel/checkout.jpg" class="w-14 h-14 object-cover  rounded-full shadow-lg">
                  </div>
                  <label>เวลาเช็ค้าท์</label>
                  <label>{{ checkoutTime }}</label>
                </div>
              </div>
            </div>
          </div>

          <div class="px-4 mt-20">
            <label class="text-2xl font-bold">ห้องพัก</label>

            <div
              class="flex flex-col md:flex-row justify-center items-center space-x-3 bg-stone-500 px-12 py-3 rounded-lg mt-2">
              <label class="text-white pb-2 md:pb-0">กรุณาเลือกวันที่เข้าพัก : </label>
              <div class="md:w-[400px] w-full">
                <div
                  class="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer md:w-auto w-full"
                  @click="toggleCalendar">
                  <span class="flex-1 text-sm text-gray-400 truncate">
                    เลือกวันที่
                  </span>
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <Roomlist v-for="(room, index) in rooms" :key="index" v-bind="room" @add-to-cart="handleAddToCart"
              @remove-from-cart="handleRemoveFromCart" @open-calendar="showCalendar = true" />
          </div>

          <div class="mt-20 px-4 block lg:hidden">
            <div>
              <label class="text-2xl font-bold">ตำแหน่งที่ตั้ง</label>
            </div>
            <div class="flex text-xs space-x-2 mb-2 mt-4 font-bold">
              <div>
                <label>{{ address }}</label>
              </div>
              <div>
                <label>{{ subDistrict }}</label>
              </div>
              <div>
                <label> {{ district }}</label>
              </div>
              <div>
                <label>{{ province }}</label>
              </div>
              <div>
                <label>{{ zipcode }}</label>
              </div>
            </div>

            <div class="rounded-lg w-full block">
              <div>
                <iframe class="w-full h-full rounded-lg" frameborder="0" style="border:0" loading="lazy" allowfullscreen
                  referrerpolicy="no-referrer-when-downgrade" :src="mapUrl"></iframe>
                <div class="flex justify-center mt-1 md:text-xs text-xxs space-x-2">
                  <label>ละติจูด : {{ latitude }}</label>
                  <label>ลองติจูด : {{ longitude }}</label>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-20">
            <About :icon-hotel="iconHotel" :icon-iocation="iconIocation" :icon-room="iconRoom" :icon-pet="iconPet"
              :icon-food="iconFood" />
          </div>



          <div class="my-20">
            <div class="mb-4 px-4">
              <label class="font-bold text-2xl">รีวิวที่พัก</label>
            </div>
            <Review :reviews="reviews" />
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
import Gallery from "@components/element/Gallery.vue";
import Roomlist from "@components/element/Roomlist.vue";
import About from "./All/About.vue";
import Review from "@components/Review.vue";
import BarDateMember from "@components/BarDateMember.vue";
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
const router = useRouter();

// ตัวแปรข้อมูลโรงแรม
const hotelName = ref('BlackListHOtel');
const latitude = ref('1245.1574');
const longitude = ref('15.149');
const address = ref('12/8');
const subDistrict = ref('sujoikuol');
const district = ref('dyujyrtiko');
const province = ref('dyjuk');
const zipcode = ref('54878');
const checkinTime = ref('14.00 - 20.00');
const checkoutTime = ref('9.00 - 12.00');

const mapUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.725152370527!2d100.52318681534138!3d13.736717401027756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2992e2dc0db0d%3A0x78e9f0aa1d401c6c!2z4LiB4Li44Lih4LiE4Lij4Li04Lip4Lix4LiU4Lij4Liw4Lia4Li54LiZ4LiiIOC4l-C4quC4suC4geC4seC4meC4suC4geC4peC4seC4lOC4hOC4meC4reC4mQ!5e0!3m2!1sth!2sth!4v1620278354921!5m2!1sth!2sth'

const rooms = ref([])
const selectedRooms = ref([])
const showCalendar = ref(false)
const showBarDateMember = ref(false)

function toggleCalendar() {
  showBarDateMember.value = true
  showCalendar.value = true
}

function handleAddToCart(room) {
  // ถ้ามี roomCode นี้อยู่แล้ว ให้ update total
  const idx = selectedRooms.value.findIndex(r => r.roomCode === room.roomCode)
  if (idx === -1) {
    selectedRooms.value.push(room)
  } else {
    selectedRooms.value[idx].total = room.total
  }
}
function handleRemoveFromCart(room) {
  selectedRooms.value = selectedRooms.value.filter(r => r.roomCode !== room.roomCode)
}

const reviews = ref([
  { rating: 5, name: 'User1', detail: 'ดีมาก', roomType: 'ห้องธรรมดา', dateStay: 2, monthStay: 'มิถุนายน', yearStay: 2024, dateReview: '2024-06-10' },
  { rating: 4, name: 'User2', detail: 'โอเค', roomType: 'ห้องวิวทะเล', dateStay: 1, monthStay: 'พฤษภาคม', yearStay: 2024, dateReview: '2024-05-22' },
  { rating: 3, name: 'User3', detail: 'ปานกลาง', roomType: 'ห้องสวีท', dateStay: 3, monthStay: 'เมษายน', yearStay: 2024, dateReview: '2024-04-15' },
  { rating: 5, name: 'User4', detail: 'สุดยอด', roomType: 'ห้องแฟมิลี่', dateStay: 2, monthStay: 'มีนาคม', yearStay: 2024, dateReview: '2024-03-30' },
  { rating: 2, name: 'User5', detail: 'ควรปรับปรุง', roomType: 'ห้องโรแมนติก', dateStay: 1, monthStay: 'กุมภาพันธ์', yearStay: 2024, dateReview: '2024-02-18' },
  { rating: 4, name: 'User6', detail: 'ดี', roomType: 'ห้องธรรมดา', dateStay: 2, monthStay: 'มกราคม', yearStay: 2024, dateReview: '2024-01-12' },
  { rating: 5, name: 'User7', detail: 'ประทับใจมาก', roomType: 'ห้องวิวทะเล', dateStay: 1, monthStay: 'ธันวาคม', yearStay: 2023, dateReview: '2023-12-25' },
  { rating: 3, name: 'User8', detail: 'เฉยๆ', roomType: 'ห้องสวีท', dateStay: 2, monthStay: 'พฤศจิกายน', yearStay: 2023, dateReview: '2023-11-09' },
  { rating: 4, name: 'User9', detail: 'ดีใช้ได้', roomType: 'ห้องแฟมิลี่', dateStay: 1, monthStay: 'ตุลาคม', yearStay: 2023, dateReview: '2023-10-03' },
  { rating: 5, name: 'User10', detail: 'แนะนำเลย', roomType: 'ห้องโรแมนติก', dateStay: 3, monthStay: 'กันยายน', yearStay: 2023, dateReview: '2023-09-27' },
])


const totalAll = computed(() => selectedRooms.value.reduce((sum, r) => sum + (r.total || 0), 0))

const averageRating = computed(() => {
  if (!reviews.value.length) return 0;
  return (
    reviews.value.reduce((sum, r) => sum + (r.rating || 0), 0) /
    reviews.value.length
  );
});

const iconHotel = [
  { label: 'Wi-Fi', icon: '/icons/wifi.svg' },
  { label: 'สระว่ายน้ำ', icon: '/icons/pool.svg' },
  { label: 'ที่จอดรถ', icon: '/icons/parking.svg' },
  { label: 'อาหารเช้า', icon: '/icons/breakfast.svg' },
  { label: 'ฟิตเนส', icon: '/icons/gym.svg' },
  { label: 'บริการซักรีด', icon: '/icons/laundry.svg' },
  { label: 'ห้องประชุม', icon: '/icons/meeting.svg' },
  { label: 'รถรับส่ง', icon: '/icons/shuttle.svg' },
  // เพิ่มได้ตามต้องการ
]
const iconIocation = [
  { label: 'Wi-Fi', icon: '/icons/wifi.svg' },
  { label: 'สระว่ายน้ำ', icon: '/icons/pool.svg' },
  { label: 'ที่จอดรถ', icon: '/icons/parking.svg' },
  { label: 'อาหารเช้า', icon: '/icons/breakfast.svg' },
  { label: 'ฟิตเนส', icon: '/icons/gym.svg' },
  { label: 'บริการซักรีด', icon: '/icons/laundry.svg' },
  { label: 'ห้องประชุม', icon: '/icons/meeting.svg' },
  { label: 'รถรับส่ง', icon: '/icons/shuttle.svg' },
  // เพิ่มได้ตามต้องการ
]
const iconRoom = [
  { label: 'Wi-Fi', icon: '/icons/wifi.svg' },
  { label: 'สระว่ายน้ำ', icon: '/icons/pool.svg' },
  { label: 'ที่จอดรถ', icon: '/icons/parking.svg' },
  { label: 'อาหารเช้า', icon: '/icons/breakfast.svg' },
  { label: 'ฟิตเนส', icon: '/icons/gym.svg' },
  { label: 'บริการซักรีด', icon: '/icons/laundry.svg' },
  { label: 'ห้องประชุม', icon: '/icons/meeting.svg' },
  { label: 'รถรับส่ง', icon: '/icons/shuttle.svg' },
  // เพิ่มได้ตามต้องการ
]
const iconPet = [
  { label: 'Wi-Fi', icon: '/icons/wifi.svg' },
  { label: 'สระว่ายน้ำ', icon: '/icons/pool.svg' },
  { label: 'ที่จอดรถ', icon: '/icons/parking.svg' },
  { label: 'อาหารเช้า', icon: '/icons/breakfast.svg' },
  { label: 'ฟิตเนส', icon: '/icons/gym.svg' },
  { label: 'บริการซักรีด', icon: '/icons/laundry.svg' },
  { label: 'ห้องประชุม', icon: '/icons/meeting.svg' },
  { label: 'รถรับส่ง', icon: '/icons/shuttle.svg' },
  // เพิ่มได้ตามต้องการ
]
const iconFood = [
  { label: 'Wi-Fi', icon: '/icons/wifi.svg' },
  { label: 'สระว่ายน้ำ', icon: '/icons/pool.svg' },
  { label: 'ที่จอดรถ', icon: '/icons/parking.svg' },
  { label: 'อาหารเช้า', icon: '/icons/breakfast.svg' },
  { label: 'ฟิตเนส', icon: '/icons/gym.svg' },
  { label: 'บริการซักรีด', icon: '/icons/laundry.svg' },
  { label: 'ห้องประชุม', icon: '/icons/meeting.svg' },
  { label: 'รถรับส่ง', icon: '/icons/shuttle.svg' },
  // เพิ่มได้ตามต้องการ
]


// ใช้ mock data ตัวอย่าง
const mockRooms = [
  {
    roomCode: 'A001',
    roomType: 'ห้องธรรมดา',
    maxGuests: 2,
    description: 'ห้องพักเรียบง่ายพร้อมสิ่งอำนวยความสะดวกพื้นฐาน',
    originalPrice: 1500,
    discountPrice: 1200,
    facilities: [
      { icon: '/images/icon/bed.png', label: 'เตียงนุ่มสบาย' },
      { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Fi' },
      { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Wifi' },
      { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Wifi' },
      { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Wifi' },
      { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Wifi' },
      { icon: '/images/icon/wifi.png', label: 'ฟรี Wi-Wifi' },
    ],
    images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Chonburi.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Phuket.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/ChiangMai.jpg'],
    extraBed: true,
    addBedPrice: 400,
  },
  {
    roomCode: 'A002',
    roomType: 'ห้องวิวทะเล',
    maxGuests: 3,
    description: 'สัมผัสวิวทะเลสวยจากระเบียงส่วนตัว',

    discountPrice: 2500,
    facilities: [
      { icon: '/images/icon/sea.png', label: 'วิวทะเล' },
      { icon: '/images/icon/aircon.png', label: 'แอร์เย็นฉ่ำ' },
    ],
    images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Chonburi.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Phuket.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/ChiangMai.jpg'],
    extraBed: true,
    addBedPrice: 400,
  },
  {
    roomCode: 'A003',
    roomType: 'ห้องสวีท',
    maxGuests: 4,
    description: 'ห้องพักหรูหราสำหรับครอบครัวหรือคู่รัก',

    discountPrice: 4200,
    facilities: [
      { icon: '/images/icon/bathtub.png', label: 'อ่างอาบน้ำ' },
      { icon: '/images/icon/tv.png', label: 'ทีวีจอใหญ่' },
    ],
    images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Chonburi.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Phuket.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/ChiangMai.jpg'],
    extraBed: true,
    addBedPrice: 400,
  },
  {
    roomCode: 'A004',
    roomType: 'ห้องแฟมิลี่',
    maxGuests: 5,
    description: 'กว้างขวางเหมาะสำหรับครอบครัวใหญ่',
    originalPrice: 4500,
    discountPrice: 3900,
    facilities: [
      { icon: '/images/icon/kitchen.png', label: 'ครัวในตัว' },
      { icon: '/images/icon/parking.png', label: 'ที่จอดรถ' },
    ],
    images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Chonburi.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Phuket.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/ChiangMai.jpg'],
    extraBed: true,
    addBedPrice: 400,
  },
  {
    roomCode: 'A005',
    roomType: 'ห้องโรแมนติก',
    maxGuests: 2,
    description: 'เหมาะสำหรับคู่รัก ต้องการความเป็นส่วนตัว',

    discountPrice: 2400,
    facilities: [
      { icon: '/images/icon/heart.png', label: 'บรรยากาศโรแมนติก' },
      { icon: '/images/icon/music.png', label: 'เสียงเพลงเบาๆ' },
    ],
    images: ['/imgHotel/sea.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Chonburi.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/Phuket.jpg', '/imgHotel/imgprovince/Bangkok.jpg', '/imgHotel/imgprovince/ChiangMai.jpg'],
    extraBed: true,
    addBedPrice: 400,
  },
]

onMounted(() => {
  rooms.value = mockRooms
  // หรือดึงจาก backend:
  // axios.get('/api/rooms').then(res => rooms.value = res.data)
})
</script>

<style>
.slide-down-enter-active {
  transition: transform 0.4s cubic-bezier(.4, 0, .2, 1), opacity 0.4s;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}
</style>