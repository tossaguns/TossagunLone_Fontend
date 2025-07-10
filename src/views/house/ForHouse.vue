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
          <img src="/img/House/ForHouse.png" />
          <div class="sticky top-16 z-40 bg-white">
            <div class="border-b border-stone-600 flex justify-center items-center space-x-10 py-2 shadow-xl px-2">
              <button @click="scrollTo('detail')"
                class="md:text-sm text-xs text-stone-500 hover:text-yellow-400">รายละเอียด</button>
              <button @click="scrollTo('survey')"
                class="md:text-sm text-xs text-stone-500 hover:text-yellow-400">ค่าสำรวจ/ประเมินราคา</button>
              <button @click="scrollTo('requirement')"
                class="md:text-sm text-xs text-stone-500 hover:text-yellow-400">คุณสมบัติ/เอกสาร</button>
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
                <label class="text-xl">รายละเอียดสินเชื่อบ้าน</label>
              </div>
              <div class="md:leading-[3] leading-[2] text-stone-500">
                <div class="flex flex-col  ">
                  <label class="mt-6">
                    สร้างบ้านในฝันด้วยสินเชื่อจากธนาคารไทยพาณิชย์ พร้อมเพิ่มวงเงินตกแต่งบ้าน
                     รับอัตราดอกเบี้ยสุดพิเศษทั้งแบบคงที่ หรือแบบลอยตัว ผ่อนสบายด้วยระยะเวลากู้นานสูงสุด 30 ปี
                  </label>
                  <div class="flex flex-col md:px-12 my-6 ">
                    <label><span class="text-2xl mr-3">-</span>ดอกเบี้ยเริ่มต้นคงที่ 2 ปีแรก 3.70%*</label>
                    <label><span class="text-2xl mr-3">-</span>ส่วนลดอัตราดอกเบี้ย**</label>
                    <label><span class="text-2xl mr-3">-</span>กู้ได้สูงสุด 100%***</label>
                  </div>
                  <div class="flex flex-col">
                    <label>*ดอกเบี้ยเริ่มต้นคงที่ 2 ปีแรก 3.70% เฉพาะลูกค้าที่ทำประกันชีวิต Credit Life</label>
                    <label>**เมื่อซื้อประกัน Credit Life ตามเงื่อนไขที่กำหนด</label>
                    <label>***วงเงินสินเชื่อสูงสุด 100% ของมูลค่าหลักประกันตามราคาประเมิน
                      หรือราคาซื้อขายในสัญญาซื้อขายของกรมที่ดิน แล้วแต่จำนวนใดจะต่ำกว่า สำหรับบ้านหลังแรกที่ราคาต่ำกว่า
                      10 ล้านบาท (สัญญาที่ 1) </label>
                  </div>
                </div>


                <div class="flex flex-col md:flex-row justify-between items-start my-16 md:space-x-2">
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
                        <label class="text-black font-semibold">วงเงินสินเชื่อ</label>
                      </div>
                      <label>รับวงเงินสินเชื่อสูงสุด 100%* ของค่าจ้างปลูกสร้าง (กรณีที่ดินปลอดภาระ)
                        วงเงินสินเชื่อรวมสูงสุดต้องไม่เกิน 90%* ของราคาประเมินที่ดินและสิ่งปลูกสร้าง</label>
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
                        <label class="text-black font-semibold">อัตราดอกเบี้ย</label>
                      </div>
                      <label>เป็นไปตามประกาศของธนาคาร</label>
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
                        <label class="text-black font-semibold">กู้เท่าที่จำเป็นและชำระคืนไหว</label>
                      </div>
                      <label>อัตราดอกเบี้ยที่แท้จริงอยู่ระหว่าง 5.190% - 7.175% ต่อปี</label>
                      <div class="mt-8">
                        <label>โดยอัตราดอกเบี้ยลูกค้ารายย่อยชั้นดี (Minimum Retail Rate : MRR) ปัจจุบันเท่ากับ 7.175%
                          ต่อปี มีผลวันที่ 1 พฤศจิกายน 2567 ซึ่งเป็นอัตราดอกเบี้ยลอยตัว
                          สามารถเปลี่ยนแปลงเพิ่มขึ้นหรือลดลงได้ตามประกาศของธนาคาร
                          รายละเอียดการคำนวณตามตารางอัตราดอกเบี้ย</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-24">
                  <label class="text-lg text-black">อัตราดอกเบี้ยเเละค่าธรรมเนียม</label>
                  <div class="flex space-x-3 mt-4">
                    <img src="/img/icon/pdf.png" class="w-12" />
                    <label>อัตราดอกเบี้ยเเละสินเชื่อ</label>
                  </div>
                </div>
              </div>
            </div>

            <div id="survey" class="bg-stone-100 py-8 md:leading-[3] leading-[2] text-stone-500 scroll-mt-24">
              <div class="flex flex-col lg:flex-row lg:justify-between items-start ">
                <div class="lg:w-1/2 lg:pl-8 lg:pr-4 px-8">
                  <div>
                    <label class="text-lg text-black">ค่าสำรวจและประเมินราคาหลักประกัน</label>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label class="">
                        กรณีที่ดินไม่เกิน 1 ไร่ ประมาณ 4,550 บาท (ไม่รวม VAT)
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px] mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label class="">
                        ค่าตรวจงวดงานก่อสร้าง 1,100 บาทต่อครั้ง (ไม่รวม VAT)
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px] mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label class="">
                        ค่าใช้จ่ายอาจเปลี่ยนแปลงได้ตามประกาศของธนาคาร
                      </label>
                    </div>
                  </div>

                  <div class="mt-6 md:mt-0">
                    <label class="text-lg text-black">ค่าเบี้ยประกันอัคคีภัย</label>
                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label class="">
                        ตามอัตราของบริษัทประกัน
                      </label>
                    </div>
                  </div>
                </div>

                <div class="lg:w-1/2 lg:pr-8 lg:pl-4 px-8">
                  <div class="mt-6 md:mt-0">
                    <label class="text-lg text-black">ค่าอากรแสตมป์</label>
                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label class="">
                        0.05% ของวงเงินสินเชื่อ สูงสุดไม่เกิน 10,000 บาท
                      </label>
                    </div>
                  </div>

                  <div class="mt-6 md:mt-0">
                    <label class="text-lg text-black">ค่าจดจำนอง</label>
                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label class="">
                        1% ของวงเงินกู้
                      </label>
                    </div>
                  </div>

                  <div class="mt-6 md:mt-0">
                    <label class="text-lg text-black">ข้อควรรู้สำหรับลูกค้าสินเชื่อเพื่อที่อยู่อาศัย</label>
                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label @click="openProductDocument" class="underline hover:text-yellow-500 cursor-pointer">
                        เอกสารข้อมูลสำคัญของผลิตภัณฑ์
                      </label>
                    </div>
                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label @click="openCompareProductDocument" class="underline hover:text-yellow-500 cursor-pointer">
                        เอกสารเปรียบเทียบผลิตภัณฑ์สินเชื่อบ้าน SCB, รายละเอียดดอกเบี้ยเเละการคำนวนสินเชื่อ
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="requirement"
              class="pb-8 pt-28 md:leading-[3] leading-[2] text-stone-500 md:px-0 px-8 scroll-mt-24">
              <div class="flex flex-col">
                <label class="text-xl text-black">คุณสมบัติเเละเอกสารการสมัคร</label>
                <label class="text-black">คุณสมบัติผู้สมัคร</label>
              </div>

              <div class="block lg:hidden">
                <div class="flex flex-col items-center mt-8">
                  <div class="min-h-[60px] flex items-center justify-center space-x-3 py-3 text-center">
                    <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                      viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <label class="text-sm">สัญชาติไทย</label>
                  </div>
                  <div class="min-h-[60px] flex items-center justify-center space-x-3 text-center">
                    <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                      viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <label class="text-sm">
                      ไม่เคยเป็นลูกหนี้ปรับโครงสร้างหนี้ของสถาบันการเงิน
                    </label>
                  </div>
                  <div class="min-h-[60px] flex items-center justify-center space-x-3 text-center">
                    <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                      viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <label class="text-sm">
                      อายุ 20 ปีบริบูรณ์ขึ้นไป เเละ ไม่เกิน 65 ปี
                    </label>
                  </div>
                </div>
              </div>



              <div class="flex flex-col lg:flex-row justify-between items-stretch">
                <div class="lg:w-1/2 lg:pr-4 px-4">
                  <div class="flex flex-col lg:items-start items-center">
                    <div class=" hidden  lg:block">
                      <div
                        class="min-h-[60px] flex lg:items-start space-x-3 items-center py-3 text-center md:text-left">
                        <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <label class="md:text-sm">สัญชาติไทย</label>
                      </div>
                    </div>
                    <img src="/img/icon/VerifyIden.png" class="mt-20 lg:mt-0" />
                  </div>
                  <div class="mt-8 md:mt-0">
                    <label class="text-black lg:text-lg">เอกสารยืนยันตัวตน</label>
                    <div class="flex items-start space-x-3 mt-6">
                      <label>1.</label>
                      <label>
                        สำเนาบัตรประชาชนเพียงอย่างเดียวเท่านั้น หรือ สำเนาบัตรข้าราชการ หรือ
                        สำเนาบัตรพนักงานรัฐวิสาหกิจ ที่มีเลขที่ประจำตัวประชาชน และ รูปถ่ายบนหน้าบัตร หรือ
                        สำเนาหนังสือเดินทาง (ใช้สำหรับคู่สมรสเป็นชาวต่างชาติ) พร้อมแนบสำเนาทะเบียนบ้าน
                      </label>
                    </div>
                    <div class="flex items-start space-x-3">
                      <label>2.</label>
                      <label>
                        สำเนาทะเบียนบ้าน
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <label>3.</label>
                      <label>
                        สำเนาทะเบียนสมรส (ถ้ามี)
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <label>4.</label>
                      <label>
                        สำเนาใบเปลี่ยนชื่อ-นามสกุล (ถ้ามี)
                      </label>
                    </div>
                  </div>
                </div>

                <div class="lg:w-1/2 px-4 mt-28 lg:mt-0">
                  <div class="flex flex-col items-center lg:items-start">
                    <div class=" hidden  lg:block">
                      <div class="min-h-[60px] flex lg:items-start py-3 items-start space-x-3 md:text-left">
                        <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <label class="md:text-sm">
                          ไม่เคยเป็นลูกหนี้ปรับโครงสร้างหนี้ของสถาบันการเงิน
                        </label>
                      </div>
                    </div>
                    <img src="/img/icon/Insurance.png" />
                  </div>
                  <div class="mt-8 md:mt-0">
                    <label class="text-black lg:text-lg">เอกสารหลักประกัน</label>
                    <div class="flex items-start space-x-3 mt-6">
                      <label>1.</label>
                      <label>
                        สำเนาเอกสารกรรมสิทธ์ (สำเนาโฉนด หน้า/หลัง) กรณีขอสินเชื่อปลูกสร้างบ้านบนที่ดินปลอดภาระของตนเอง
                      </label>
                    </div>
                    <div class="flex items-start space-x-3">
                      <label>2.</label>
                      <label>
                        ใบอนุญาตก่อสร้าง (ผู้ขออนุญาตก่อสร้างต้องเป็นผู้เดียวกับผู้ถือกรรมสิทธิ์ที่ดินเท่านั้น)
                      </label>
                    </div>
                    <div class="flex items-start space-x-3">
                      <label>3.</label>
                      <label>
                        แบบก่อสร้างที่ได้รับอนุญาต และรายการวัสดุ (BOQ)
                      </label>
                    </div>
                    <div class="flex items-start space-x-3">
                      <label>4.</label>
                      <label>
                        สำเนาสัญญาว่าจ้างปลูกสร้างบ้าน
                      </label>
                    </div>
                    <div class="flex items-start space-x-3">
                      <label>5.</label>
                      <label>
                        สัญญาซื้อ-ขายที่ดิน (กรณีกู้ซื้อที่ดิน)
                      </label>
                    </div>
                  </div>
                </div>

                <div class="lg:w-1/2 md:pl-4 px-4 mt-28 lg:mt-0">
                  <div class="flex flex-col lg:items-start items-center">
                    <div class=" hidden  lg:block">
                      <div class="min-h-[60px] flex items-start space-x-3 py-3 md:text-left">
                        <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <label class="md:text-sm">
                          อายุ 20 ปีบริบูรณ์ขึ้นไป เเละ ไม่เกิน 65 ปี
                        </label>
                      </div>
                    </div>
                    <img src="/img/icon/ConfirmIncome.png" />
                  </div>
                  <div class="mt-8 md:mt-0">
                    <label class="text-black lg:text-lg">เอกสารยืนยันรายได้</label>
                    <div class="mt-6">
                      <label class="underline">ผู้มีรายได้ประจำ</label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <label>1.</label>
                      <label>
                        หนังสือรับรองเงินเดือน และสลิปเงินเดือน
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <label>2.</label>
                      <label>
                        เอกสารการเดินบัญชีย้อนหลัง 6 เดือน
                      </label>
                    </div>

                    <label class="underline">ธุรกิจส่วนตัว</label>

                    <div class="flex items-start space-x-3">
                      <label>1.</label>
                      <label>
                        เอกสารการเดินบัญชีย้อนหลัง 6 เดือน (บัญชีส่วนตัว, บัญชีกิจการ)
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <label>2.</label>
                      <label>
                        ภาพถ่ายกิจการ 4-5 ภาพ และแผนที่ตั้งกิจการโดยสังเขป
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <label>3.</label>
                      <label>
                        สำเนาทะเบียนการค้า, หนังสือรับรองการจดทะเบียนนิติบุคคล พร้อมบัญชีรายชื่อผู้ถือหุ้น
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <label>4.</label>
                      <label>
                        หลักฐานการนำภาษีย้อนหลัง 1 ปี (ภงด.) บันทึกรายรับ-รายจ่าย, ใบเสร็จซื้อ-ใบเสร็จขายสินค้า
                      </label>
                    </div>

                    <label class="underline">ผู้มีอาชีพอิสระ</label>

                    <div class="flex items-start space-x-3">
                      <label>1.</label>
                      <label>
                        เอกสารการเดินบัญชีย้อนหลัง 6 เดือน
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <label>2.</label>
                      <label>
                        ใบอนุญาตประกอบวิชาชีพ (แพทย์, วิศวกร, ทนายความ, สถาปนิก)
                      </label>
                    </div>
                  </div>
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
  { label: 'สินเชื่อบ้าน', route: '/mainhouse' },
  { label: 'สินเชื่อเพื่อปลูกสร้างบ้าน', route: '/forhouse' },
]);


function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function openProductDocument() {
  window.open('https://www.scb.co.th/content/media/personal-banking/loans/home-loans/documents/mhmc-comparison.pdf', '_blank')
}

function openCompareProductDocument() {
  window.open('https://www.scb.co.th/content/media/personal-banking/loans/home-loans/documents/home-loan.pdf', '_blank')
}

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'auto' })

  await nextTick()
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>
<style></style>