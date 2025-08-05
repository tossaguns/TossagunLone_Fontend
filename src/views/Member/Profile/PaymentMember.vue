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

          <div class="md:pl-6 px-6 mt-12 w-full">
            <label class="text-lg font-semibold">กระเป๋า TOSSAGUN</label>

            <div class="mt-12">
              <div>
                <label class="pl-4 text-stone-400">การชำระเงินด้วยกระเป๋า TOSSAGUN
                  ท่านจะได้รับสิทธิพิเศษอื่นๆมากมาย</label>
                <div class="md:pl-8 mt-8">
                  <label class="font-bold">
                    สิทธิพิเศษ
                  </label>
                  <div class="text-stone-600 pl-4 flex flex-col">
                    <label>- ได้รับเงินคืนเพื่อใช้ในครั้งต่อไป</label>
                    <label>- โค้ดส่วนลดโปรโมชั่นพิเศษสำหรับสมาชิก</label>
                    <label>- ..................</label>
                    <label>- ..................</label>
                  </div>
                </div>
              </div>


              <div class="border rounded-lg mt-6 px-4 py-8 shadow-md mx-4 my-12">
                <div class="flex flex-col md:flex-row justify-between items-center">

                  <div class="md:w-1/3 flex justify-center">
                    <div class="bg-yellow-100 rounded-full p-4">
                      <div class="bg-yellow-300 rounded-full py-6">
                        <img src="/imgHotel/payment/Wallet.png" class="w-52 " />
                      </div>
                    </div>
                  </div>

                  <div class="md:w-1/3 flex flex-col justify-center items-center md:pl-6 pl-0 md:mt-0 mt-12">
                    <label class="text-xl font-bold text-stone-400">เครดิต TOSSAGUN</label>
                    <label class="text-4xl font-bold pt-4">THB {{ }}2000</label>
                  </div>

                  <div class="md:w-1/3 flex flex-col justify-center items-center pl-0 md:mt-0 mt-12">
                    <label class="text-stone-400">เครดิตเงินคืนคงเหลือ</label>
                    <label class="md:pl-4 text-xl pt-2">THB{{ }}120</label>
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

</script>
