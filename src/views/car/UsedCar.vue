<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="bg-neutral-800  min-h-screen">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white">
          <img src="/img/Car/UsedCar.svg" />
          <div class="sticky top-16 z-40 bg-white">
            <div class="border-b border-stone-600 flex justify-center items-center space-x-10 py-2 shadow-xl px-2">
              <button @click="scrollTo('detail')"
                class="md:text-sm text-xs text-stone-500 hover:text-yellow-400">รายละเอียด</button>
              <button @click="scrollTo('requirement')"
                class="md:text-sm text-xs text-stone-500 hover:text-yellow-400">คุณสมบัติ/เอกสาร</button>
              <button @click="scrollTo('condition')"
                class="md:text-sm text-xs text-stone-500 hover:text-yellow-400">เงื่อนไข</button>
            </div>
          </div>

           <Breadcrumb :home="home" :model="items"
            class="flex overflow-x-auto no-scrollbar mx-2 md:text-sm text-xxs text-stone-400 whitespace-nowrap">
            <template #item="{ item, props }">
              <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a :href="href" v-bind="props.action" @click="navigate"
                  class="flex items-center text-stone-500 transition duration-150 whitespace-nowrap">
                  <i :class="[item.icon, 'text-lg']"></i>
                  <span>{{ item.label }}</span>
                </a>
              </router-link>
            </template>

            <template #separator>
              <span class="text-stone-300 mx-1 select-none">/</span>
            </template>
          </Breadcrumb>

          <div class="py-16 md:px-24">
            <div id="detail" class="px-6 md:px-0 scroll-mt-24">
              <div class="flex md:space-x-4 space-x-2 items-center">
                <div
                  class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                  <div
                    class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                    <svg class="text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <label class="text-xl">รายละเอียดสินเชื่อรถ</label>
              </div>
              <div class="md:leading-[3] leading-[2] text-stone-500">
                <div class="flex flex-col  ">
                  <label class="mt-6">
                    สินเชื่อรถมือสองจากธนาคารไทยพาณิชย์ คือบริการสินเชื่อรถยนต์รูปแบบใหม่ ให้คุณเป็นเจ้าของรถได้ง่ายๆ
                    รับความคุ้มค่ากับวงเงินสูงสุดถึง 90% ของราคาประเมิน พร้อมอัตราดอกเบี้ยในราคาเบาๆ ผ่อนยาวสูงสุดถึง 84
                    เดือน ให้คุณสามารถโอนสิทธิเช่าซื้อให้แก่บุคคลอื่นได้ รวมถึงรับความสะดวกสบายของบริการอีกมากมายจากเรา
                  </label>
                </div>


                <div class="flex flex-col md:flex-row justify-between items-start my-16 md:space-x-2">
                  <div class="md:w-1/2 px-2">
                    <div class="mb-5">
                      <div class="flex flex-row items-start space-x-2">
                        <div
                          class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center flex-shrink-0 lg:mt-[13px] mt-[8px]">
                          <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <label class="text-black font-semibold">
                          สะดวกและรวดเร็ว
                        </label>
                      </div>
                      <label>
                        เราจะไม่ปล่อยให้คุณต้องติดอยู่กับการรอคอย
                        เติมเต็มทุกความต้องการให้เป็นจริงด้วยขั้นตอนการขอสมัครสินเชื่อง่ายๆ ที่สะดวกและรวดเร็ว
                      </label>
                    </div>

                    <div class="mb-5">
                      <div class="flex flex-row items-center space-x-2">
                        <div
                          class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                          <div
                            class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                            <svg class="text-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <label class="text-black font-semibold">กู้เท่าที่จำเป็นและชำระคืนไหว</label>
                      </div>
                      <label>กู้เท่าที่จำเป็นและชำระคืนไหว อัตราดอกเบี้ยคงที่อยู่ระหว่าง 4.00% – 8.60% ต่อปี
                        โดยอัตราดอกเบี้ยที่แท้จริงเท่ากับ 7.51%- 14.84% ต่อปี ตลอดอายุสัญญา
                        ทั้งนี้อาจมึการเปลี่ยนแปลงได้ซึ่งไม่เกินตามที่ธนาคารประกาศกำหนด</label>
                    </div>
                  </div>

                  <div class="md:w-1/2 px-2">
                    <div class="mb-5">
                      <div class="flex flex-row items-center space-x-2">
                        <div
                          class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                          <div
                            class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                            <svg class="text-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <label class="text-black font-semibold">หมดกังวลเรื่องแผนการผ่อนชำระ</label>
                      </div>
                      <label>เพราะเราจะช่วยคุณจัดสรรเงื่อนไขต่างๆ
                        ไม่ว่าจะเป็นอายุสัญญาหรือจำนวนเงินเรียกเก็บในแต่ละงวดให้สอดคล้องกับสภาพคล่องของคุณได้อย่างลงตัว</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="requirement" class="pb-8  md:leading-[3] leading-[2] text-stone-500 md:px-0 px-8 scroll-mt-24">
              <div class="flex flex-col">
                <label class="text-xl text-black">คุณสมบัติเเละเอกสารการสมัคร</label>
                <label class="text-black">คุณสมบัติผู้สมัคร</label>
              </div>

              <div class="flex flex-col items-center md:items-start mt-8 md:mt-0 mb-20">
                <div class="min-h-[30px] flex items-center justify-center space-x-3 text-center">
                  <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <label class="text-sm">
                    บุคคลธรรมดา อายุ 20 - 60 ปี (ระยะเวลาผ่อนชำระเมื่อรวมกับอายุผู้ขอสินเชื่อแล้วต้องไม่เกิน 65 ปี)
                  </label>
                </div>
                <div class="min-h-[30px] flex items-center justify-center space-x-3 text-center mt-2">
                  <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <label class="text-sm">
                    มีภูมิลำเนาในประเทศไทย
                  </label>
                </div>
              </div>

              <div class="flex flex-col lg:flex-row justify-between items-stretch">
                <div class="lg:w-1/2 lg:pr-6 px-4">
                  <div class="flex flex-col items-center lg:items-start">
                    <img src="/img/icon/VerifyIden.svg" />
                  </div>
                  <div class="mt-8 md:mt-0">
                    <label class="text-black lg:text-lg">เอกสารยืนยันตัวตน</label>
                    <div class="flex flex-col items-start my-6">
                      <div class="flex items-start space-x-3">
                        <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                          class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                          <circle cx="5" cy="5" r="5" fill="#78716c" />
                        </svg>
                        <label>
                          สำเนาบัตรประชาชนเพียงอย่างเดียวเท่านั้น หรือสำเนาบัตรข้าราชการหรือสำเนาบัตร
                          รัฐวิสาหกิจที่มีเลขที่ประจำตัวประชาชน และรูปถ่ายหน้าบัตร
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="lg:w-1/2 px-3 mt-28 lg:mt-0">
                  <div class="flex flex-col items-center lg:items-start">
                    <img src="/img/icon/ConfirmAddress.svg" />
                  </div>
                  <div class="mt-8 md:mt-0">
                    <label class="text-black lg:text-lg">เอกสารยืนยันที่อยู่
                    </label>
                    <div class="flex flex-col items-start my-6">
                      <div class="flex items-start space-x-3">
                        <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                          class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                          <circle cx="5" cy="5" r="5" fill="#78716c" />
                        </svg>
                        <label>
                          เอกสารจากหน่วยงานของรัฐที่ระบุที่อยู่ของคุณ
                        </label>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="lg:w-1/2 md:pl-6 px-4 mt-28 lg:mt-0">
                  <div class="flex flex-col items-center lg:items-start">
                    <img src="/img/icon/ConfirmIncome.svg" />
                  </div>
                  <div class="mt-8 md:mt-0">
                    <label class="text-black lg:text-lg">เอกสารยืนยันรายได้</label>
                    <div class="flex flex-col items-start my-6">
                      <div class="flex items-start space-x-3">
                        <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                          class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                          <circle cx="5" cy="5" r="5" fill="#78716c" />
                        </svg>
                        <label>
                          สลิปเงินเดือนปัจจุบัน สำเนาใบแจ้งยอดเงินฝากย้อนหลัง 6 เดือน
                          หรือหนังสือรับรองเงินเดือนจากบริษัท
                        </label>
                      </div>
                    </div>
                    <label>กรณีเจ้าของกิจการ ใช้หนังสือรับรองของสำนักงานทะเบียนหุ้นส่วนบริษัท และใบทะเบียนพาณิชย์
                      อายุไม่เกิน 6 เดือน</label>
                  </div>
                </div>
              </div>
            </div>

            <div id="condition" class="pb-8 mt-20  md:leading-[3] leading-[2] text-stone-500 md:px-0 px-8 scroll-mt-24">
              <div class="flex flex-col">
                <label class="text-xl text-black">เงื่อนไขการให้บริการ</label>
              </div>

              <div class="flex flex-col lg:flex-row justify-between items-stretch mt-8">
                <div class="lg:w-1/2 lg:pr-6 px-4 mt-28 lg:mt-0">
                  <div class="flex flex-col items-center lg:items-start">
                    <img src="/img/icon/Signing.svg" />
                  </div>
                  <div class="mt-8 md:mt-0">

                    <label class="text-black lg:text-lg">เงื่อนไขรถยนต์ที่นำมาขอรับสินเชื่อ</label>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        ประเภทรถยนต์เฉพาะ รถเก๋ง รถกระบะและรถตู้
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        รถยนต์ต้องปลอดภาระและมีอายุไม่เกิน 12 ปี
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        รถยนต์ต้องจดทะเบียนส่วนบุคคลเท่านั้น
                      </label>
                    </div>

                  </div>
                </div>

                <div class="lg:w-1/2 px-3 mt-28 lg:mt-0">
                  <div class="flex flex-col items-center lg:items-start">
                    <img src="/img/icon/InsuranceConditions.svg" />
                  </div>
                  <div class="mt-8 md:mt-0">
                    <label class="text-black lg:text-lg">เงื่อนไขการทำประกันภัย</label>
                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        เงื่อนไขการทำประกันภัย เป็นไปตามเงื่อนไขของธนาคารฯ
                      </label>
                    </div>
                  </div>
                </div>


                <div class="lg:w-1/2 md:pl-6 px-4 mt-28 lg:mt-0">
                  <div class="flex flex-col items-center lg:items-start">
                    <img src="/img/icon/Fee.svg" />
                  </div>
                  <div class="mt-8 md:mt-0">
                    <label class="text-black lg:text-lg">ค่าธรรมเนียมและค่าใช้จ่าย</label>
                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        ค่าธรรมเนียมในการทำสัญญาและค่าใช้จ่ายอื่นๆ ให้เป็นไปตามที่ธนาคารฯกำหนด
                        โดยจะเรียกเก็บจากวงเงินที่ได้รับการอนุมัติ (ดูรายละเอียดค่าธรรมเนียมในลำดับต่อไป)
                      </label>
                    </div>
                  </div>
                </div>
              </div>


              <div class="text-sm mt-20">
                <label>หมายเหตุ :</label>

                <div class="flex items-start space-x-3">
                  <label>
                    วงเงินที่ลูกค้าได้รับขึ้นอยู่กับสภาพรถยนต์ และคุณสมบัติของลูกค้า
                    ซึ่งอาจทำให้แตกต่างกันไปสำหรับลูกค้าแต่ละราย / อัตราค่าธรรมเนียม หลักเกณฑ์และเงื่อนไขต่าง ๆ
                    เป็นไปตามประกาศที่ธนาคารกำหนด / ธนาคารขอสงวนสิทธิในการยกเลิก
                    และ/หรือเปลี่ยนแปลงหลักเกณฑ์เงื่อนไขต่าง ๆ ซึ่งธนาคารจะแจ้งให้ทราบ
                    และ/หรือประกาศแจ้งเป็นการทั่วไปบนเว็บไซต์ของธนาคาร
                  </label>
                </div>
              </div>

              <div class="mt-20">
                <label class="text-xl text-black">Sales Sheet</label>
                <div class="mt-4 flex space-x-2 items-center">
                  <img src="/img/icon/pdf.svg" class="w-12" />
                  <label>Sales Sheet สินเชื่อรถยนต์ใช้แล้ว</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AskContact />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Bar from "../../components/BarLoneTossagun.vue";
import Footer from "../../components/FooterLoneTossagun.vue";
import AskContact from "../../components/AskContact.vue";
import Breadcrumb from 'primevue/breadcrumb';
import 'primeicons/primeicons.css'

const home = ref({
  icon: 'pi pi-home md:text-md text-xs text-stone-400',
  route: '/main'
});
const items = ref([
  { label: 'สินเชื่อบ้าน', route: '/inputtext' },
  { label: 'สินเชื่อรถใช้เเล้ว', route: '/newhouse' },
]);

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}


</script>
<style></style>