<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto text-stone-600">
        <div class="mt-8">

          <div class="flex flex-col md:flex-row justify-start md:items-center">
            <div class=" flex space-x-3 px-4 justify-start items-center">
              <img src="/images/icon/company_nav.png" class="w-8" />
              <label class="md:text-2xl text-xl font-bold text-black">{{ hotelName }}</label>
            </div>

            <div class="flex justify-end items-end px-4 md:px-0">
              <div v-for="(item, idx) in reviews" :key="idx" class="flex items-start space-x-4">
                <div><span v-for="n in 5" :key="n" class="text-xl"
                    :class="n <= item.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
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

          <div class="mx-4 border mt-4 p-4 rounded-lg">
            <div class="">
              <label class="block mt-2 indent-8 text-stone-400">{{
                }}ประเภทของห้องพักโรงแรมคือการจำแนกประเภทห้องพักที่มีให้บริการในโรงแรม การแบ่ง ‘ประเภท’
                ห้องพักจะช่วยให้แขกเข้าใจได้อย่างชัดเจนว่าพวกเขากำลังจองห้องพักลักษณะไหนในขณะวางแผนการท่องเที่ยว
                ประเภทห้องพักโรงแรมมีรูปแบบแตกต่างกันไปตามขนาด จำนวนและประเภทของเตียง สิ่งอำนวยความสะดวก
                และสิ่งที่แขกสามารถทำได้ภายในห้อง (เช่น ห้องที่อนุญาตให้สูบบุหรี่หรือไม่ให้สูบบุหรี่)
              </label>
            </div>
          </div>

          <div class="px-8 mt-20">
            <div class="flex flex-col justify-center items-center">
              <label class="font-bold">ช่วงเวลาในการเข้าใช้บริการ</label>
              <div class="flex items-center">
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
            <label class="px-4 text-xl font-bold">ห้องพัก</label>
            <Roomlist v-for="(room, index) in rooms" :key="index" v-bind="room" @add-to-cart="handleAddToCart"
              @remove-from-cart="handleRemoveFromCart" />
          </div>


          <div class="mt-4 px-4 mb-10">
            <div
              class="flex flex-col md:flex-row md:justify-between items-center border rounded-t-lg py-5 space-y-3 md:space-y-0">

              <div class="md:w-1/2 flex justify-end items-end">
                <label class=" text-black font-bold">ราคารวม : <span class="text-3xl">THB {{ totalAll.toLocaleString()
                    }}</span></label>
              </div>

              <div class="md:w-1/2 flex flex-col justify-center items-center">
                <button
                  class="text-white text-xl font-bold bg-red-500 hover:bg-red-400 py-4 px-6 rounded-lg">จองห้องพัก</button>
              </div>

            </div>
            <div class="h-[10px] bg-yellow-300 rounded-b-lg"></div>
          </div>


          <div class="mx-4 border p-4 rounded-lg">
            <div class="mt-5">
              <div class="flex space-x-2">
                <img src="/images/icon/hotel.png" class="w-6 h-5" />
                <label class="font-bold">เกี่ยวกับที่พัก</label>
              </div>
              <div class="text-sm ">
                <label class="block indent-8">{{
                  }}ประเภทของห้องพักในโรงแรมมีบมบาทสำคัญในการตัดสินใจจองห้องพักของแขก
                  และแม้กระทั่งการตัดสินใจว่าจะจองหรือไม่
                  การเสนอห้องพักที่กลุ่มเป้าหมายของคุณต้องการจึงเป็นสิ่งสำคัญแต่ก็ควรมีตัวเลือกหลายรูปแบบสำหรับรองรับแขกคนอื่น
                  ๆ ด้วย ซึ่งจะช่วยเพิ่มอัตราการเข้าพักและรายได้ให้มากขึ้น</label>
              </div>
              <div>
                <div class="px-4 mt-2 flex flex-wrap gap-2 justify-start">
                  <div v-for="(icon, index) in iconHotel" :key="index"
                    class="flex items-center space-x-2 border py-1 px-3 rounded-full">
                    <img :src="icon.icon" class="w-4 h-4" />
                    <label>{{ icon.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <div class="flex space-x-3">
                <img src="/images/icon/pin.png" class="w-5 h-5" />
                <label class="font-bold">ทำเลที่ตั้ง</label>
              </div>
              <div class="text-sm ">
                <label class="block indent-8">{{
                  }}โรงแรมสมัยใหม่มักจะรองรับแขกหลากหลายประเภท
                  ตั้งแต่คู่รักไปจนถึงครอบครัว
                  ลายเพื่อตอบสนองความต้องการของแขกที่แตกต่างกัน</label>
              </div>
              <div>
                <div class="px-4 mt-2 flex flex-wrap gap-2 justify-start">
                  <div v-for="(icon, index) in iconIocation" :key="index"
                    class="flex items-center space-x-2 border py-1 px-3 rounded-full">
                    <img :src="icon.icon" class="w-4 h-4" />
                    <label>{{ icon.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <div class="flex space-x-2">
                <img src="/images/icon/bed.png" class="w-6 h-5" />
                <label class="font-bold">สิ่งอำนวยความสะดวกภายในห้อง</label>
              </div>
              <div class="text-sm ">
                <label class="block indent-8">{{
                  }}ห้องเดี่ยว ดับเบิ้ลรูม ห้องเตียงควีนไซซ์ ห้องสวีท?
                  ตัวเลือกประเภทของห้องพักที่สามารถมอบประสบการณ์การเข้าพักให้ตรงตามความต้องการของแขกยังมีมากกว่านี้อีก</label>
              </div>
              <div>
                <div class="px-4 mt-2 flex flex-wrap gap-2 justify-start">
                  <div v-for="(icon, index) in iconRoom" :key="index"
                    class="flex items-center space-x-2 border py-1 px-3 rounded-full">
                    <img :src="icon.icon" class="w-4 h-4" />
                    <label>{{ icon.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <div class="flex space-x-2">
                <img src="/images/icon/pet.png" class="w-6 h-5" />
                <label class="font-bold">การรองรับสัตวืเลี้ยง</label>
              </div>
              <div class="text-sm ">
                <label class="block indent-8">{{
                  }}บล็อกนี้ เราจะพาคุณไปเจาะลึกประเภทของพักโรงแรมฉบับสมบูรณ์
                  เพื่อให้โรงแรมของคุณสามารถกำหนดและวางกลยุทธ์การขายห้องพักออนไลน์ให้ประสบความสำเร็จได้มากยิ่งขึ้น</label>
              </div>
              <div>
                <div class="px-4 mt-2 flex flex-wrap gap-2 justify-start">
                  <div v-for="(icon, index) in iconPet" :key="index"
                    class="flex items-center space-x-2 border py-1 px-3 rounded-full">
                    <img :src="icon.icon" class="w-4 h-4" />
                    <label>{{ icon.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <div class="flex space-x-2">
                <img src="/images/icon/food.png" class="w-6 h-5" />
                <label class="font-bold">มื้ออาหาร</label>
              </div>
              <div class="text-sm ">
                <label class="block indent-8">{{
                  }}เป็นห้องขนาดใหญ่ที่เหมาะสำหรับแขก 4 คน และมักจะมีเตียงคู่ 2
                  เตียง</label>
              </div>
              <div>
                <div class="px-4 mt-2 flex flex-wrap gap-2 justify-start">
                  <div v-for="(icon, index) in iconFood" :key="index"
                    class="flex items-center space-x-2 border py-1 px-3 rounded-full">
                    <img :src="icon.icon" class="w-4 h-4" />
                    <label>{{ icon.label }}</label>
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
import Gallery from "@components/element/Gallery.vue";
import Roomlist from "@components/element/RoomlistDate.vue";
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
  {
    rating: 5,
  }
])


const totalAll = computed(() => selectedRooms.value.reduce((sum, r) => sum + (r.total || 0), 0))

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