<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto text-stone-600">
        <div class="flex">

          <div class="hidden lg:block">
            <BarProfileMember />
          </div>

          <div class="md:pl-6 mt-12 w-full">
            <label class="text-lg font-semibold">ประวัติการทำรายการ</label>

            <!-- วนแสดง block ประวัติการจอง 3 อัน -->
            <div class="mt-6 space-y-6">
              <div v-for="(hotel, idx) in historyHotels" :key="idx" class="border rounded-lg p-4">
                <div>
                  <button class="flex justify-start items-center space-x-3">
                    <img src="/images/icon/room_nav.png" class="w-8" />
                    <label class="font-bold"> {{ hotel.hotelname }} <span
                        class="text-lg text-stone-300 hover:text-stone-500  pl-5">></span></label>
                  </button>
                </div>
                <div class="mt-2 mb-4">
                  <hr class="border " />
                </div>
                <div class="flex flex-col lg:flex-row w-full">
                  <div class="flex flex-col md:flex-row justify-center w-full">
                    <div class="xl:w-[250px] md:w-1/2 flex justify-center ">
                      <img :src="hotel.img" class="w-60 rounded-lg" />
                    </div>
                    <div class="xl:w-2/4 md:w-1/2 xl:pl-6 flex flex-col justify-center items-center mt-8 md:mt-0">
                      <div>
                        <div>
                          <label>ราคา : <span class="text-lg font-bold">THB {{ hotel.price }}</span></label>
                        </div>
                        <div class="xl:space-x-3  flex flex-col xl:flex-row">
                          <label>ประเภทห้องพัก : <span class="text-lg font-bold">{{ hotel.roomType }}</span></label>
                          <label>จำนวนเข้าพัก : <span class="text-lg font-bold">{{ hotel.people }} คน</span></label>
                        </div>
                        <div>
                          <label>รายละเอียดการจอง : </label>
                        </div>
                        <div class="pl-3 flex flex-col">
                          <label>เช็คอิน :
                            <span class="px-2">{{ hotel.checkInMember }}-{{ hotel.checkOutMember }}</span>
                            <span class="px-2">วันที่ {{ hotel.day }} {{ hotel.mouth }} {{ hotel.year }} </span>
                          </label>
                          <label>เช็คเอ้าท์ :
                            <span class="px-2">{{ hotel.checkInMember }}-{{ hotel.checkOutMember }}</span>
                            <span class="px-2">วันที่ {{ hotel.day }} {{ hotel.mouth }} {{ hotel.year }} </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="lg:w-[200px] flex flex-col space-y-2 justify-center mt-5 lg:mt-0">
                    <button class="border border-red-400 rounded-lg text-red-400 py-1">จองอีกครั้ง</button>
                    <button class="bg-stone-200 py-1 rounded-lg">ดาว์โหลดสลิป</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Bar from "@components/BarMember.vue";
import Footer from "@components/FooterLoneTossagun.vue";
import BarProfileMember from "@components/BarProfileMember.vue";
import { useRouter } from 'vue-router';

import FloatInput from '@/components/element/FloatInput.vue'
const router = useRouter();

import { ref } from 'vue'

// Mock ข้อมูลโรงแรมที่จอง
const historyHotels = [
  {
    hotelname: 'โรงแรมทะเลสวย',
    price: 2000,
    roomType: 'ธรรมดา',
    people: 2,
    checkInMember: '14:00',
    checkOutMember: '12:00',
    day: '10',
    mouth: 'มิถุนายน',
    year: '2024',
    img: '/imgHotel/sea.jpg',
  },
  {
    hotelname: 'โรงแรมอินรูม',
    price: 1500,
    roomType: 'ดีลักซ์',
    people: 3,
    checkInMember: '15:00',
    checkOutMember: '11:00',
    day: '5',
    mouth: 'พฤษภาคม',
    year: '2024',
    img: '/imgHotel/InRoom.jpg',
  },
  {
    hotelname: 'โรงแรมของขวัญ',
    price: 1800,
    roomType: 'สวีท',
    people: 2,
    checkInMember: '13:00',
    checkOutMember: '12:00',
    day: '20',
    mouth: 'เมษายน',
    year: '2024',
    img: '/imgHotel/gift.png',
  },
]
</script>
