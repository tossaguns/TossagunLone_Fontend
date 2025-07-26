<template>
  <TemplateAdmin>
    <template #header>
      <label>จัดการเมมเบอร์</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div class="my-4">
          <label class="text-2xl font-bold">ข้อมูลเมมเบอร์</label>
        </div>

        <div class="my-12 px-4">
          <div class="flex justify-end items-center space-x-3">
            <input class="border rounded-lg py-2 px-4" type="text" placeholder="ค้นหา ..." />
            <button class="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg text-white">ค้นหา</button>
          </div>
        </div>

        <!-- หัวตาราง -->
        <div class="hidden xl:block">
          <div class="text-sm text-stone-400 px-4 py-4 flex flex-col xl:flex-row justify-center items-center ">
            <div class="w-[50px] text-center">ลำดับ</div>
            <div class="xl:w-1/12 text-center">รูปโปรไฟล์</div>
            <div class="xl:w-2/12 text-center">ชื่อ</div>
            <div class="xl:w-2/12 text-center">นามสกุล</div>
            <div class="xl:w-3/12 text-center">อีเมล</div>
            <div class="xl:w-2/12 text-center">เบอร์โทร</div>
            <div class="xl:w-1/6 text-center">วันที่สร้าง</div>
            <div class="xl:w-1/6 text-center">ดูรายละเอียด</div>
          </div>
        </div>

        <!-- Loop สมาชิก -->
        <div v-for="(member, index) in members" :key="member.id" class="mb-4">
          <!-- แถวหลัก -->
          <div
            class="border rounded-lg px-4 py-4 flex flex-col xl:flex-row justify-center items-center shadow space-y-2 xl:space-y-0">
            <div class="w-[50px] text-center bg-stone-200 rounded-full mb-4 xl:mb-0">
              <label>{{ index + 1 }}</label>
            </div>
            <div class="xl:w-1/12 flex justify-center items-center">
              <img :src="member.imageProfile" alt="profileMember"
                class="xl:w-8 w-12 xl:h-8 h-12 object-contain rounded-full shadow-lg" />
            </div>

            <div class="xl:w-2/12 text-center hidden xl:block">{{ member.firstname }}</div>
            <div class="xl:w-2/12 text-center hidden xl:block">{{ member.lastname }}</div>

            <div class="flex space-x-3 xl:hidden">
              <div class="xl:w-2/12 text-center">{{ member.firstname }}</div>
              <div class="xl:w-2/12 text-center">{{ member.lastname }}</div>
            </div>

            <div class="xl:w-3/12 text-center">{{ member.email }}</div>
            <div class="xl:w-2/12 text-center">{{ member.phone }}</div>


            <div class="xl:w-1/6 text-center hidden xl:block">{{ member.createdAt }}</div>
            <div class="xl:w-1/6 text-center  xl:hidden text-sm text-stone-400">วันที่สมัครสมาชิก : {{ member.createdAt }}</div>

            <div class="xl:w-1/6 text-center">
              <button class="mt-2 xl:mt-0 xl:ml-4 bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-lg"
                @click="toggleDetail(member.id)">
                {{ selectedMemberId === member.id ? 'ซ่อน' : 'ดูรายละเอียด' }}
              </button>
            </div>
          </div>

          <!-- รายละเอียดที่แสดงใต้ row -->
          <!-- v-if="selectedMemberId === member.id" -->
          <div v-if="selectedMemberId === member.id"
            class="bg-stone-50 border rounded-b-lg md:mx-4 mx-1 py-8 shadow-inner">
            <div
              class="max-w-7xl mx-auto flex flex-col xl:flex-row justify-between items-start xl:items-center px-4 xl:px-0">
              <div class="w-full xl:w-2/5 flex justify-center items-center mb-4 xl:mb-0">
                <img :src="member.imageProfile" alt="profileMember"
                  class="w-32 h-32 object-contain rounded-full shadow-lg" />
              </div>

              <div class="xl:w-4/5 flex flex-col lg:flex-row justify-center w-full lg:px-0 px-4">
                <div class="w-full lg:w-1/2 flex flex-col space-y-1 lg:pl-20 xl:pl-0">
                  <div><label class="font-bold">ชื่อ - นามสกุล :</label> {{ member.firstname }} {{ member.lastname }}
                  </div>
                  <div><label class="font-bold">ชื่อโปรไฟล์ :</label> {{ member.profileName || '-' }}</div>
                  <div><label class="font-bold">เพศ :</label> {{ member.sex || '-' }}</div>
                  <div><label class="font-bold">วันเกิด :</label> {{ member.birthday || '-' }}</div>
                  <div><label class="font-bold">เบอร์โทร :</label> {{ member.phone }}</div>
                  <div><label class="font-bold">อีเมล :</label> {{ member.email }}</div>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col space-y-1 lg:pl-20 xl:pl-0">
                  <div><label class="font-bold">สัญชาติ :</label> {{ member.nationality || '-' }}</div>
                  <div><label class="font-bold">บ้านเลขที่ :</label> {{ member.address || '-' }}</div>
                  <div><label class="font-bold">ตำบล :</label> {{ member.subdistrict || '-' }}</div>
                  <div><label class="font-bold">อำเภอ :</label> {{ member.district || '-' }}</div>
                  <div><label class="font-bold">จังหวัด :</label> {{ member.province || '-' }}</div>
                  <div><label class="font-bold">รหัสไปรษณีย์ :</label> {{ member.postcode || '-' }}</div>
                </div>
              </div>
            </div>

            <div class="mx-4">
              <div class="border rounded-lg p-4 my-8 max-w-4xl mx-auto bg-white">
                <div class="flex flex-col lg:flex-row justify-between items-center">
                  <div class="w-full lg:w-1/5 flex justify-center">
                    <img src="/imgHotel/payment/Wallet.png" alt="tossagun" class="w-52 hobject-contain" />
                  </div>

                  <div class="w-full lg:w-3/5 px-4 flex flex-col justify-center my-4 md:my-0 space-y-4 md:space-y-0">
                    <div class="flex flex-col md:flex-row items-center">
                      <label class="font-bold pr-2">เลขกระเป๋าเงิน TOSSAGUN :</label>
                      <span class="font-mono tracking-wider">
                        <template v-if="showWalletAccount">
                          {{ member.tossagunWalletAccount || '-' }}
                        </template>
                        <template v-else>
                          {{ (member.tossagunWalletAccount || '-').replace(/./g, '*') }}
                        </template>
                      </span>
                      <button @click="toggleWalletAccount" class="ml-2 focus:outline-none">
                        <svg v-if="showWalletAccount" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a9.956 9.956 0 012.293-3.95M6.873 6.873A9.956 9.956 0 0112 5c4.478 0 8.269 2.943 9.543 7a9.956 9.956 0 01-4.293 5.95M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
                        </svg>
                      </button>
                    </div>
                    <div class="flex flex-col md:flex-row items-center">
                      <label class="font-bold">ยอดเงินคงเหลือ :</label>
                      <label class="text-2xl font-bold pl-2">{{ member.tossagunWalletBalance || '-' }}</label>
                    </div>
                    <div class="flex flex-col md:flex-row items-center">
                      <label class="font-bold">เครดิตคงเหลือ :</label>
                      {{ member.tossagunWalletCredit || '-' }}
                    </div>
                  </div>

                  <div class="w-full lg:w-1/5 flex justify-center mt-4 xl:mt-0">
                    <button
                      class=" text-sm bg-white hover:bg-blue-400 text-blue-600 rounded-lg border border-blue-600 px-3 py-1 rounded-md:"
                      @click="openTransactionModal(member)">
                      ดูประวัติการทำรายการ
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-center px-3">
              <button
                class="border rounded-b-lg p-3 max-w-7xl mx-auto bg-stone-200 shadow-inner w-full flex justify-between items-center"
                @click="toggleBookingHistory">
                <label class="text-xl font-bold">การใช้งานการจองกับ SleepGun</label>
                <span>
                  <svg v-if="isBookingHistoryOpen" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-700 transition-transform duration-300" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-700 transition-transform duration-300" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </div>
            <!-- ประวัติการจองกับ SleepGun -->
            <div v-if="showBookingHistory" class=" max-w-7xl mx-auto">
              <div class="border rounded-b-lg p-4 bg-white mx-4 ">
                <div class="flex justify-end">
                  <label class="text-sm font-bold">รายการจองทั้งหมด {{ bookingHistory.length }} รายการ</label>
                </div>

                <div class="my-2">
                  <hr class="border" />
                </div>


                <div v-for="(item, idx) in bookingHistory" :key="idx" class="border rounded-lg xl:p-5 p-3 mb-4">
                  <div class="flex flex-col md:flex-row md:space-x-3 mb-4 text-xs md:text-xxs text-stone-400">
                    <div>รายการที่ {{ bookingHistory.length - idx }} </div>
                    <div class="flex space-x-2 mt-2 md:mt-0">
                      <div>วันที่ {{ item.bookingDate }} </div>
                      <div>เวลา {{ item.bookingTime }} </div>
                    </div>
                  </div>

                  <div class="flex flex-col xl:flex-row justify-between items-center md:text-sm text-xs">
                    <div class="flex flex-col 2xl:flex-row justify-between items-center w-full ">
                      <div class="2xl:w-1/5 flex justify-center">
                        <img :src="item.imageBookingHotel" alt="profileMember"
                          class="w-52 h-36 object-cover rounded-lg shadow-lg" />
                      </div>

                      <div class="2xl:w-4/5 w-full flex flex-col justify-center xl:px-8 mt-8 2xl:mt-0 lg:px-6">
                        <div class="flex flex-col lg:flex-row lg:space-x-3">
                          <div><label class="font-bold">ชื่อโรงเเรม :</label> {{ item.hotelName }}</div>
                          <div><label class="font-bold">ประเภทห้องพัก :</label> {{ item.roomType }}</div>
                        </div>

                        <div class="space-y-2 mt-2">
                          <div class="flex md:space-x-3 flex-col md:flex-row">
                            <div class="flex flex-col lg:flex-row lg:space-x-3">
                              <div><label class="font-bold">check-in :</label> {{ item.checkIn }}</div>
                              <div><label class="font-bold"> เวลา :</label> {{ item.checkInTimestart }} - {{
                                item.checkInTimeend }}</div>
                            </div>
                            <div>วันที่เช็คอินจริง : {{ item.checkInDate }}</div>
                          </div>
                          <div class="flex md:space-x-3 flex-col md:flex-row">
                            <div class="flex flex-col lg:flex-row lg:space-x-3">
                              <div><label class="font-bold">check-out :</label> {{ item.checkOut }}</div>
                              <div><label class="font-bold"> เวลา :</label> {{ item.checkOutTimestart }} - {{
                                item.checkOutTimeend }}</div>
                            </div>
                            <div>วันที่เช็คเช็คเอ้าจริง : {{ item.checkOutDate }}</div>
                          </div>
                        </div>

                        <div class="my-2">
                          <hr class="border" />
                        </div>

                        <div class="space-y-2">
                          <div class="flex md:space-x-3 flex-col md:flex-row">
                            <div><label class="font-bold">เวลาที่ทำการจอง :</label> {{ item.timeMember }}</div>
                            <div><label class="font-bold">เวลาที่จ่ายเงิน :</label> {{ item.timePayment }}</div>
                          </div>
                          <div>โอนเงินผ่าน : {{ item.paymentMethod }}</div>
                          <div><label class="font-bold">จำนวนคนที่เข้าพัก :</label> {{ item.countPerson }}</div>
                        </div>
                      </div>
                    </div>

                    <div class="2xl:w-1/5 px-4 flex flex-col justify-center space-y-3 mt-8 2xl:mt-0">
                      <div class="border rounded-lg p-2 text-center font-bold " :class="{
                        'text-green-600 border-green-600': item.status === 'เข้าพักเสร็จสิ้น',
                        'text-yellow-500 border-yellow-500': item.status === 'กำลังเข้าพัก',
                        'text-red-600 border-red-600': item.status === 'ยกเลิกการจอง'
                      }">
                        <label>{{ item.status }}</label>
                      </div>

                      <div class="text-center text-xl space-x-2">
                        <label class="text-sm">ราคาทั้งหมด :</label>
                        <label class="text-xl font-bold">{{ item.price }} THB</label>
                      </div>
                    </div>

                  </div>

                  <div class="flex 2xl:justify-end justify-center mt-4 2xl:mt-0 md:text-base text-xs">
                    <button @click="openReviewModal"
                      class="bg-blue-500 hover:bg-blue-400 text-white px-3 md:py-1 py-2 rounded-md">รายการรีวิวที่พักของเมมเบอร์</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </TemplateAdmin>

  <!-- Popup Modal สำหรับประวัติการทำรายการ -->
  <div v-if="showTransactionModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] flex flex-col mx-4">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-bold">ประวัติการทำรายการ</h2>
        <button @click="closeTransactionModal" class="text-xl font-bold">x</button>
      </div>
      <div class="p-4 overflow-y-auto" style="max-height:60vh;">
        <div
          v-for="(txn, txnIndex) in (selectedTransactionMember?.transactions ? [...selectedTransactionMember.transactions].reverse() : [])"
          :key="txnIndex" class="mb-4 border-b pb-2">
          <div class="flex justify-start space-x-4">
            <div>
              <label class="md:text-sm text-xxs text-stone-400">
                รายการที่ {{ (selectedTransactionMember?.transactions?.length || 0) - txnIndex }}
              </label>
            </div>
            <div class="space-x-1">
              <label class="md:text-sm text-xxs text-stone-400">{{ txn.date }}</label>
              <label class="md:text-sm text-xxs text-stone-400">/ {{ txn.time }}</label>
            </div>
          </div>
          <div class="mt-2">
            <div class="flex justify-end px-4 md:text-xl text-lg pt-4 font-bold">
              <template v-if="txn.amount > 0">
                <label class="text-lime-500"> + {{ txn.amount }} THB</label>
              </template>
              <template v-else>
                <label class="text-red-500"> {{ txn.amount }} THB</label>
              </template>
            </div>
            <div class="flex justify-end px-4 md:text-sm text-xxs text-stone-400">
              <label>ยอดเงินคงเหลือ : {{ txn.tossagunWalletBalance || '-' }} THB</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Popup Modal สำหรับรีวิวที่พักของเมมเบอร์ -->
  <div v-if="showReviewModal" class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-bold">รีวิวที่พักของเมมเบอร์</h2>
        <button @click="closeReviewModal" class="text-xl font-bold">x</button>
      </div>
      <div class="p-4 overflow-y-auto" style="max-height:60vh;">
        <Review :reviews="reviews" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TemplateAdmin from "@/components/TemplateAdmin.vue";
import { ref } from "vue";
import Review from "@/components/Review.vue";


const selectedMemberId = ref(null)
const showTransactionModal = ref(false)
const selectedTransactionMember = ref(null)
const showReviewModal = ref(false);
function openReviewModal() { showReviewModal.value = true; }
function closeReviewModal() { showReviewModal.value = false; }

const showBookingHistory = ref(false);
function toggleBookingHistory() { showBookingHistory.value = !showBookingHistory.value; }

const bookingHistory = [
  {
    bookingDate: "2024-06-10",
    imageBookingHotel: "/imgHotel/sea.jpg",
    bookingTime: "14:00",
    hotelName: "โรงแรมตัวอย่าง 1",
    roomType: "Deluxe",
    checkIn: "2024-06-15",
    checkInTimestart: "14:00",
    checkInTimeend: "18:00",
    checkInDate: "2024-06-15",
    checkOut: "2024-06-17",
    checkOutTimestart: "11:00",
    checkOutTimeend: "12:00",
    checkOutDate: "2024-06-17",
    timeMember: "2024-06-10 13:00",
    timePayment: "2024-06-10 13:30",
    paymentMethod: "โอนผ่านธนาคาร",
    countPerson: 2,
    status: "เข้าพักเสร็จสิ้น",
    price: 3500
  },
  {
    bookingDate: "2024-05-10",
    imageBookingHotel: "/imgHotel/sea.jpg",
    bookingTime: "10:00",
    hotelName: "โรงแรมตัวอย่าง 2",
    roomType: "Standard",
    checkIn: "2024-05-12",
    checkInTimestart: "13:00",
    checkInTimeend: "17:00",
    checkInDate: "2024-05-12",
    checkOut: "2024-05-14",
    checkOutTimestart: "10:00",
    checkOutTimeend: "11:00",
    checkOutDate: "2024-05-14",
    timeMember: "2024-05-10 09:00",
    timePayment: "2024-05-10 09:30",
    paymentMethod: "บัตรเครดิต",
    countPerson: 1,
    status: "ยกเลิกการจอง",
    price: 2200
  },
  {
    bookingDate: "2024-04-01",
    imageBookingHotel: "/imgHotel/sea.jpg",
    bookingTime: "08:00",
    hotelName: "โรงแรมตัวอย่าง 3",
    roomType: "Suite",
    checkIn: "2024-04-03",
    checkInTimestart: "15:00",
    checkInTimeend: "19:00",
    checkInDate: "2024-04-03",
    checkOut: "2024-04-05",
    checkOutTimestart: "12:00",
    checkOutTimeend: "13:00",
    checkOutDate: "2024-04-05",
    timeMember: "2024-04-01 07:00",
    timePayment: "2024-04-01 07:30",
    paymentMethod: "พร้อมเพย์",
    countPerson: 3,
    status: "กำลังเข้าพัก",
    price: 5000
  }
];

const reviews = [
  {
    name: "สมชาย",
    rating: 5,
    roomType: "Deluxe",
    dateStay: 2,
    monthStay: "มิถุนายน",
    yearStay: 2024,
    detail: "ห้องพักสะอาดมาก พนักงานบริการดี ประทับใจสุดๆ",
    dateReview: "10/06/2024"
  },
  {
    name: "อรทัย",
    rating: 4,
    roomType: "Standard",
    dateStay: 1,
    monthStay: "มิถุนายน",
    yearStay: 2024,
    detail: "วิวสวย อาหารเช้าอร่อย แต่ที่จอดรถน้อยไปนิด",
    dateReview: "09/06/2024"
  },
  {
    name: "ปกรณ์",
    rating: 3,
    roomType: "Suite",
    dateStay: 3,
    monthStay: "พฤษภาคม",
    yearStay: 2024,
    detail: "ห้องโอเคตามราคา แต่แอร์เสียงดังไปนิด",
    dateReview: "28/05/2024"
  },
  {
    name: "ศิริพร",
    rating: 5,
    roomType: "Family",
    dateStay: 2,
    monthStay: "พฤษภาคม",
    yearStay: 2024,
    detail: "เหมาะกับครอบครัวมาก เด็กๆชอบสระว่ายน้ำ",
    dateReview: "25/05/2024"
  },
  {
    name: "ณัฐวุฒิ",
    rating: 4,
    roomType: "Romantic",
    dateStay: 1,
    monthStay: "เมษายน",
    yearStay: 2024,
    detail: "บรรยากาศดี เหมาะกับคู่รัก",
    dateReview: "15/04/2024"
  }
];

const showWalletAccount = ref(false);
function toggleWalletAccount() {
  showWalletAccount.value = !showWalletAccount.value;
}

function toggleDetail(id) {
  selectedMemberId.value = selectedMemberId.value === id ? null : id
}

function openTransactionModal(member) {
  selectedTransactionMember.value = member;
  showTransactionModal.value = true;
}
function closeTransactionModal() {
  showTransactionModal.value = false;
  selectedTransactionMember.value = null;
}

const memberTemplate = {
  id: 1,
  imageProfile: "/images/icon/employee_navAdmin.png",
  firstname: "สมชาย",
  lastname: "ใจดี",
  profileName: "สมชายใจดี",
  sex: "ชาย",
  birthday: "01/01/2530",
  phone: "0812345678",
  email: "somchai@email.com",
  nationality: "ไทย",
  address: "123/45",
  subdistrict: "บางรัก",
  district: "บางรัก",
  province: "กรุงเทพมหานคร",
  postcode: "10500",
  createdAt: "2024-06-01",
  tossagunWalletAccount: "TOS1234567890",
  tossagunWalletBalance: 15000,
  tossagunWalletCredit: 5000,
  tossagunWalletTransactionCount: 12,
  tossagunWalletTransactionDate: "2024-06-10",
  tossagunWalletTransactionTime: "14:35",
  tossagunWalletTransactionAmount: 2000,
  transactions: [
    {
      date: "2024-06-10",
      time: "14:35",
      amount: 2000,
      tossagunWalletBalance: 15000
    },
    {
      date: "2024-06-09",
      time: "09:20",
      amount: -1500,
      tossagunWalletBalance: 13000
    },
    {
      date: "2024-06-08",
      time: "16:10",
      amount: 3000,
      tossagunWalletBalance: 14500
    },
    {
      date: "2024-06-07",
      time: "11:45",
      amount: -500,
      tossagunWalletBalance: 11500
    },
    {
      date: "2024-06-06",
      time: "08:30",
      amount: 1000,
      tossagunWalletBalance: 12000
    }
  ]
};

const members = Array.from({ length: 10 }, (_, i) => ({ ...memberTemplate, id: i + 1 }));
</script>