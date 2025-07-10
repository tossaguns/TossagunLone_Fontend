<template>
  <div>
    <div v-if="isLoading"
      class="bg-neutral-800 min-h-screen flex justify-center items-center max-w-2xl mx-auto lg:px-0 px-8">
      <LoadPage class="w-full " />
    </div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="bg-neutral-800  min-h-screen">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white">
          <img src="/img/Car/NewCar.png" />
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
                    สินเชื่อสำหรับลูกค้า (บุคคลธรรมดา) ที่เป็นเจ้าของกรรมสิทธิ์รถยนต์ ที่ต้องการเสริมสภาพคล่องทางการเงิน
                    เพียงนำรถยนต์และเล่มทะเบียนรถยนต์ตัวจริงมาสมัครขอสินเชื่อ
                    ด้วยการโอนกรรมสิทธิ์รถยนต์ให้แก่ธนาคารและเช่าซื้อรถยนต์ดังกล่าวกลับคืนไป ทั้งนี้
                    ลูกค้ายังสามารถครอบครองและใช้รถยนต์ได้ตามปกติ สมัครง่าย รู้ผลอนุมัติไวภายใน 1 วันทำการ
                    นับจากวันที่ธนาคารได้รับเอกสารครบถ้วน
                  </label>
                </div>


                <div class="flex flex-col md:flex-row justify-between items-start my-16 md:space-x-2">
                  <div class="md:w-1/2 px-2">
                    <div class="mb-5">
                      <div class="flex flex-row items-start space-x-2">
                        <div
                          class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center flex-shrink-0 lg:mt-[13px] mt-[8px]">
                          <div
                            class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                            <svg class="text-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <label class="text-black font-semibold">
                          วงเงินอนุมัติสูงสุด 100% ของราคาประเมินรถยนต์ของธนาคาร สูงสุด 5 ล้านบาท
                        </label>
                      </div>
                      <label>
                        เพราะเราเชื่อว่าแต่ละคนมีความต้องการทางการเงินที่แตกต่างกัน
                        แต่รถยนต์ของคุณสามารถช่วยให้การเงินของคุณมีสภาพคล่องมากขึ้นได้ กับการนำรถแลกเงิน
                        โดยการพิจารณาอนุมัติวงเงินสินเชื่อขึ้นอยู่กับคุณสมบัติของผู้สมัคร ยี่ห้อ และปีจดทะเบียนของรถยนต์
                        โดยรถที่นำมาเป็นหลักประกัน รับเฉพาะรถเก๋ง รถกระบะ รถตู้ และต้องจดทะเบียนส่วนบุคคลเท่านั้น
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
                        <label class="text-black font-semibold">อัตราดอกเบี้ยเริ่มต้น 0.25% ต่อเดือน</label>
                      </div>
                      <label>คำนวณจากอัตราดอกเบี้ยเริ่มต้น 2.99% ต่อปี สำหรับรถยนต์ที่จดทะเบียนปี 2024-2022
                        ระยะเวลาการผ่อนไม่เกิน 60 เดือน (อาจเปลี่ยนแปลงได้ซึ่งไม่เกินตามที่ธนาคารประกาศกำหนด)</label>
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
                        <label class="text-black font-semibold">ไม่ต้องมีผู้ค้ำประกัน</label>
                      </div>
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
                        <label class="text-black font-semibold">เฉลี่ยผ่อนเริ่มต้นแสนละ 58 บาท/วัน</label>
                      </div>
                      <label>เพื่อให้การชำระหนี้เป็นเรื่องเบาสบายมากขึ้น เฉลี่ยผ่อนเริ่มต้นแสนละ 58 บาทต่อวัน
                        มีสมมติฐานการคำนวณมาจากการกู้สินเชื่อที่ผ่อนชำระเป็นงวด จากเงินต้น 100,000 บาท ประเภทรถเก๋ง
                        ปีที่จดทะเบียน 2022 อัตราดอกเบี้ยคงที่ 5% ต่อปี (อัตราดอกเบี้ยที่แท้จริง 8.96% ต่อปี)
                        และระยะเวลาผ่อน 84 เดือน (7 ปี) ค่างวด 1,720 บาทต่อเดือน จำนวนดอกเบี้ยทั้งสัญญา 35,000
                        บาท </label>
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
                        <label class="text-black font-semibold">ผ่อนชำระสบายๆ นานสูงสุด 84 เดือน</label>
                      </div>
                      <label>สามารถเลือกระยะเวลาการผ่อนชำระค่างวดได้ตามความต้องการ โดยมีให้เลือกตั้งแต่ 12, 24, 36, 48,
                        60, 72 และสูงสุด 84 เดือน</label>
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
                      <label>อัตราดอกเบี้ยคงที่อยู่ระหว่าง 2.99% - 8.65% ต่อปี (อัตราดอกเบี้ยที่แท้จริงอยู่ระหว่าง 5.65%
                        - 15% ต่อปี ตลอดอายุสัญญา) </label>
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
                <div class="min-h-[30px]  flex items-center justify-center space-x-3  text-center">
                  <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <label class="text-sm">สัญชาติไทยเเละมีภูมิลำเนาในประเทศไทย</label>
                </div>
                <div class="min-h-[30px] flex items-center justify-center space-x-3 text-center mt-2">
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
                    เป็นเจ้าของกรรมสิทธิ์รถยนต์ที่นำมาขอสินเชื่อ
                  </label>
                </div>
              </div>

              <div class="flex flex-col lg:flex-row justify-between items-stretch">
                <div class="lg:w-1/2 lg:pr-6 px-4">
                  <div class="flex flex-col items-center lg:items-start">
                    <img src="/img/icon/VerifyIden.png" />
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
                          สำเนาบัตรประชาชน
                        </label>
                      </div>

                      <div class="flex items-start space-x-3">
                        <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                          class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                          <circle cx="5" cy="5" r="5" fill="#78716c" />
                        </svg>
                        <label>
                          สำเนาใบเปลี่ยนชื่อ-นามสกุล (ถ้ามี)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="lg:w-1/2 px-3 mt-28 lg:mt-0">
                  <div class="flex flex-col items-center lg:items-start">
                    <img src="/img/icon/BookBank.png" />
                  </div>
                  <div class="mt-8 md:mt-0">
                    <label class="text-black lg:text-lg">สมุดคู่ฝาก
                    </label>
                    <div class="flex flex-col items-start my-6">
                      <div class="flex items-start space-x-3">
                        <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                          class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                          <circle cx="5" cy="5" r="5" fill="#78716c" />
                        </svg>
                        <label>
                          สำเนาสมุดบัญชีเงินฝากหน้าแรกที่ต้องการ โอนเงินเข้า (บัญชีธนาคารไทยพาณิชย์เท่านั้น)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="lg:w-1/2 md:pl-6 px-4 mt-28 lg:mt-0">
                  <div class="flex flex-col items-center lg:items-start">
                    <img src="/img/icon/InsuranceConditions.png" />
                  </div>
                  <div class="mt-8 md:mt-0">
                    <label class="text-black lg:text-lg">กรมธรรม์ประกันภัย และเอกสารเกี่ยวกับตัวรถ</label>
                    <div class="flex flex-col items-start my-6">
                      <div class="flex items-start space-x-3">
                        <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                          class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                          <circle cx="5" cy="5" r="5" fill="#78716c" />
                        </svg>
                        <label>
                          กรมธรรม์ประกันภัยฉบับจริง
                        </label>
                      </div>

                      <div class="flex items-start space-x-3">
                        <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                          class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                          <circle cx="5" cy="5" r="5" fill="#78716c" />
                        </svg>
                        <label>
                          สมุดคู่มือจดทะเบียนรถยนต์
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-4 mt-28 lg:mt-0">
                <div class="flex flex-col items-center lg:items-start">
                  <img src="/img/icon/ConfirmIncome.png" />
                </div>
                <div class="mt-8 md:mt-0">
                  <label class="text-black lg:text-lg">เอกสารยืนยันรายได้</label>
                  <div class="flex flex-col items-start my-6">
                    <label>ผู้มีรายได้ประจำ</label>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        สลิปเงินเดือนล่าสุด หรือหนังสือรับรองเงินเดือน (อายุไม่เกิน 2 เดือน)
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        สำเนาสมุดบัญชีเงินฝากที่เป็นบัญชีนำเข้าเงินเดือนย้อนหลัง 3 เดือน
                      </label>
                    </div>

                    <label class="pt-8">ผู้มีธุรกิจส่วนตัว</label>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        สำเนาสมุดบัญชีออมทรัพย์ หรือกระแสรายวันย้อนหลัง 3 เดือน กรณีรายได้ไม่ต่อเนื่อง
                        ใช้สำเนาสมุดบัญชีออมทรัพย์ หรือกระแสรายวันย้อนหลัง 6 เดือน
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        ใบทะเบียนพาณิชย์ หรือใบจดทะเบียนการค้า อายุไม่เกิน 6 เดือน
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        หนังสือรับรองการจดทะเบียนนิติบุคคล และ บอจ.5 (รายชื่อผู้ถือหุ้น) และ ภ.พ.30
                        (รายการสรุปภาษีซื้อภาษีขาย) อายุไม่เกิน 6 เดือน
                      </label>
                    </div>
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
                    <img src="/img/icon/Signing.png" />
                  </div>
                  <div class="mt-8 md:mt-0">

                    <label class="text-black lg:text-lg">เงื่อนไขรถยนต์ที่นำมาขอรับสินเชื่อ</label>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        เฉพาะรถเก๋ง รถกระบะ รถตู้ ตามสมุดคู่มือจดทะเบียนรถยนต์
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        รถยนต์ต้องมีอายุไม่เกิน 15 ปี กรณีขอสินเชื่อระยะเวลาผ่อนชำระ 84 เดือน อายุรถต้องไม่เกิน 12 ปี
                        เมื่อรวมระยะเวลาผ่อนชำระแล้วต้องไม่เกิน 19 ปี
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        รถยนต์ต้องจดทะเบียนส่วนบุคคลเท่านั้น ไม่รับรถรับจ้าง รถยนต์ดัดแปลง เปลี่ยนเครื่อง
                        หรือรถยนต์นำเข้า
                      </label>
                    </div>

                  </div>
                </div>

                <div class="lg:w-1/2 px-3 mt-28 lg:mt-0">
                  <div class="flex flex-col items-center lg:items-start">
                    <img src="/img/icon/InsuranceConditions.png" />
                  </div>
                  <div class="mt-8 md:mt-0">
                    <label class="text-black lg:text-lg">เงื่อนไขการทำประกันภัย</label>
                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        กรณีใช้กรมธรรม์เดิม ระยะเวลาคุ้มครองคงเหลือไม่น้อยกว่า 3 เดือน นับจากวันที่สมัครขอสินเชื่อ
                        เงื่อนไขการทำประกันภัยเป็นไปตามที่ธนาคารกำหนด
                      </label>
                    </div>
                  </div>
                </div>


                <div class="lg:w-1/2 md:pl-6 px-4 mt-28 lg:mt-0">
                  <div class="flex flex-col items-center lg:items-start">
                    <img src="/img/icon/Fee.png" />
                  </div>
                  <div class="mt-8 md:mt-0">
                    <label class="text-black lg:text-lg">ค่าธรรมเนียมและค่าใช้จ่าย</label>
                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label>
                        ค่าธรรมเนียมในการทำสัญญา และค่าใช้จ่ายอื่นๆ ให้เป็นไปตามที่ธนาคารกำหนด
                        โดยจะเรียกเก็บจากวงเงินที่ได้รับการอนุมัติ
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-20">
                <div class="flex md:space-x-4 space-x-2 items-center">
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
                  <label class="text-xl text-black">ตารางอัตราดอกเบี้ยเช่าซื้อ</label>
                </div>

                <div class="w-full overflow-x-auto mt-2">
                  <label class="text-xs">
                    อัตราดอกเบี้ยสินเชื่อรถคือเงิน ประกาศวันที่ - {{ announceDate }}
                  </label>

                  <table class="w-full table-auto border border-stone-300 text-left text-sm">
                    <thead class="bg-yellow-400 text-black text-center">
                      <tr>
                        <th class="border px-4 py-2">ปีจดทะเบียน</th>
                        <th class="border px-4 py-2">อัตราดอกเบี้ยคงที่ต่อปี</th>
                        <th class="border px-4 py-2">อัตราดอกเบี้ยที่เเท้จริงต่อปี</th>
                      </tr>
                    </thead>

                    <tbody class="text-center">
                      <tr v-for="(row, index) in interestRates" :key="index">
                        <td class="border px-4 py-2">{{ row.year }}</td>
                        <td class="border px-4 py-2">{{ row.fixedRate }}</td>
                        <td class="border px-4 py-2">{{ row.effectiveRate }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="text-sm mt-12">
                <label>หมายเหตุ :</label>

                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[8px]  mt-[7px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label>
                    อัตราดอกเบี้ยสินเชื่อรถคือเงิน My Car My Cash สำหรับลูกค้าที่สมัครและได้รับการอนุมัติวงเงิน
                    ระหว่างวันที่ ระหว่างวันที่ 9 ตุลาคม 2567 - 31 ธันวาคม 2567
                  </label>
                </div>
                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[8px]  mt-[7px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label>
                    อัตราดอกเบี้ยอาจมีการเปลี่ยนแปลงได้ซึ่งไม่เกินตามที่ธนาคารประกาศกำหนด
                  </label>
                </div>
                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[8px]  mt-[7px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label>
                    อัตราดอกเบี้ยแบบคงที่ คือ
                    ดอกเบี้ยในแต่ละงวดที่มีการคำนวณดอกเบี้ยครั้งเดียวจากเงินต้นเต็มจำนวนตั้งแต่วันที่ทำสัญญา
                  </label>
                </div>
                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[8px]  mt-[7px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label>
                    อัตราดอกเบี้ยที่แท้จริง คือ การคิดดอกเบี้ยแบบลดต้นลดดอก คำนวณจากยอดเงินต้นคงเหลือในแต่ละงวด
                    ซึ่งการผ่อนในแต่ละงวด จะทำให้เงินต้นลดลง และทำให้ดอกเบี้ยที่เรียกเก็บก็จะลดลงไปด้วย
                  </label>
                </div>
                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[8px]  mt-[7px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label>
                    ระยะเวลาการผ่อนชำระสูงสุด 84 เดือน
                  </label>
                </div>
                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[8px]  mt-[7px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label>
                    เงื่อนไขการอนุมัติสินเชื่อเป็นไปตามที่ธนาคารกำหนด
                  </label>
                </div>
                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[8px]  mt-[7px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label>
                    สอบถามเพิ่มเติม SCB Call Center โทร 02-777-7777
                  </label>
                </div>
              </div>

              <div class="mt-20">
                <label class="text-xl text-black">Sales Sheet</label>
                <div class="mt-4 flex space-x-2 items-center">
                  <img src="/img/icon/pdf.png" class="w-12" />
                  <label>Sales Sheet สินเชื่อรถคือเงิน</label>
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

import Bar from "../../components/BarLoneTossagun.vue";
import Footer from "../../components/FooterLoneTossagun.vue";
import AskContact from "../../components/AskContact.vue";
import Breadcrumb from 'primevue/breadcrumb';
import 'primeicons/primeicons.css'
import { ref, onMounted, nextTick } from 'vue'
import LoadPage from "../../components/LoadPage.vue";

const isLoading = ref(true)


const home = ref({
  icon: 'pi pi-home md:text-md text-xs text-stone-400',
  route: '/main'
});
const items = ref([
  { label: 'สินเชื่อรถ', route: '/maincar' },
  { label: 'สินเชื่อรถคือเงิน', route: '/carismoney' },
]);

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

//ใส่ข้อมูลในตาราง
const announceDate = '1 กรกฎาคม 2567'
const interestRates = ref([
  {
    year: '2024 - 2019',
    fixedRate: '2.99% - 6.25%',
    effectiveRate: '5.65% - 10.98%'
  },
  {
    year: '2018 - 2014',
    fixedRate: '4.25% - 7.30%',
    effectiveRate: '7.92% - 12.62%'
  }
])

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'auto' })

  await nextTick()
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

</script>
<style></style>