<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="bg-neutral-800 min-h-screen">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white">
          <img src="/img/House/HouseIsMoney.svg" />
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
                    เปลี่ยนบ้านเป็นเงิน จะซ่อมแซมต่อเติมบ้าน ค่าใช้จ่ายฉุกเฉิน หรือ ทำตามความฝัน
                    โดยการนำอสังหาริมทรัพย์ที่ปลอดภาระมาเป็นหลักประกันในการขอสินเชื่อ เช่น บ้านเดี่ยว, บ้านแฝด,
                    ทาวน์เฮ้าส์, ทาวน์โฮม, คอนโดมิเนียม, อาคารพาณิชย์, ที่ดินว่างเปล่า (ไม่รกร้าง
                    และอยู่ในชุมชนพักอาศัย) หรือ รีไฟแนนซ์สินเชื่อบ้านคือเงินจากสถาบันการเงินอื่นมาที่ Tossagun
                  </label>
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
                        <label class="text-black font-semibold">วงเงินสินเชื่อสูงสุด 20 ล้านบาท</label>
                      </div>
                      <label>การอนุมัติวงเงินสินเชื่อ พิจารณาขึ้นอยู่กับรายได้ มูลค่าหลักประกัน
                        และเงื่อนไขที่ธนาคารกำหนด</label>
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
                        <label class="text-black font-semibold">ใช้อสังหาริมทรัพย์มาเป็นหลักประกัน</label>
                      </div>
                      <label>บ้านเดี่ยว, บ้านแฝด, ทาวน์เฮ้าส์, ทาวน์โฮม, คอนโดมิเนียม, อาคารพาณิชย์, ที่ดินว่างเปล่า
                        (ไม่รกร้าง และอยู่ในชุมชนพักอาศัย) ก็กู้ได้</label>
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
                        <label class="text-black font-semibold">ผ่อนสบายนานสูงสุด 30 ปี</label>
                      </div>
                      <label>เลือกระยะเวลาผ่อนชำระได้นานสุด 30 ปี
                        โดยรวมระยะเวลาผ่อนชำระเมื่อรวมกับอายุของผู้กู้แล้วจะต้องไม่เกิน 65 ปี (กรณีมีผู้กู้ร่วมหลายคน
                        จะใช้อายุของผู้กู้ที่น้อยที่สุด)</label>
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
                        <label class="text-black font-semibold">รู้ผลอนุมัติเบื้องต้นทันใจใน 1 วันทำการ</label>
                      </div>
                      <label>รวดเร็ว เมื่อส่งเอกสารให้ธนาคารครบถ้วน ไม่ต้องมีผู้ค้ำประกัน
                        แถมไม่เสียค่าธรรมเนียมเมื่อปิดบัญชีก่อนกำหนด</label>
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
                      <label>อัตราดอกเบี้ยที่แท้จริงอยู่ระหว่าง 6.56%-14.42% ต่อปี โดยอัตราดอกเบี้ยลูกค้ารายย่อยชั้นดี
                        (Minimum Retail Rate : MRR) ปัจจุบันเท่ากับ 7.175% ต่อปี มีผลวันที่ 1 พฤศจิกายน 2567 ทั้งนี้
                        อัตราดอกเบี้ย MRR ซึ่งเป็นอัตราดอกเบี้ยลอยตัว
                        สามารถเปลี่ยนแปลงเพิ่มขึ้นหรือลดลงได้ตามประกาศของธนาคาร รายละเอียดการคำนวณตามตารางอัตราดอกเบี้ย
                        (อัตราดอกเบี้ยดังกล่าวไม่รวมสำหรับลูกค้าสิทธิพิเศษ SCB Payroll)</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-8 md:px-0 md:leading-[3] leading-[2] text-stone-500 my-16">
              <div class="flex space-x-3">
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
                <label class="text-xl text-black">เงื่อนไขการให้บริการ</label>
              </div>

              <div class="flex items-start space-x-3 mt-8">
                <label>1.</label>
                <label>
                  เงื่อนไขผลิตภัณฑ์
                </label>
              </div>

              <div class="px-0 md:px-8">
                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label class="">
                    จำนวนเงินกู้สูงสุด 20 ล้านบาท และผ่อนชำระนานสูงสุด 30 ปี
                    โดยระยะเวลาผ่อนชำระเมื่อรวมกับอายุของผู้กู้จะต้องไม่เกิน 65 ปี กรณีมีผู้กู้ร่วมหลายคน
                    จะใช้อายุของผู้กู้ที่น้อยที่สุด
                  </label>
                </div>
              </div>

              <div class="px-0 md:px-8">
                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label class="">
                    รู้ผลอนุมัติเบื้องต้นใน 1 วันทำการ
                    เมื่อธนาคารได้รับเอกสารครบถ้วนและได้รับราคาประเมินหลักประกันเฉพาะหลักประกันที่ดินพร้อมสิ่งปลูกสร้างในโครงการอสังหาริมทรัพย์
                  </label>
                </div>
              </div>

              <div class="px-0 md:px-8">
                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label class="">
                    ทั้งนี้การอนุมัติวงเงินกู้ ระยะเวลาผ่อนชำระ
                    ขึ้นอยู่กับเอกสารประกอบการพิจารณารายได้และมูลค่าหลักประกัน และเงื่อนไขที่ธนาคารกำหนด
                  </label>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <label>2.</label>
                <label>
                  สิทธิการทำประกันอัคคีภัยและประกันชีวิตคุ้มครองวงเงินสินเชื่อเพื่อที่อยู่อาศัย
                </label>
              </div>

              <div class="px-0 md:px-8">
                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label class="">
                    ลูกค้ามีสิทธิที่จะเลือกทำประกันอัคคีภัยกับบริษัทประกันรายใดก็ได้ตามความสมัครใครของลูกค้า
                  </label>
                </div>
              </div>

              <div class="px-0 md:px-8">
                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label class="">
                    การทำประกันอัคคีภัยต้องมีทุนประกันภัยตามราคาประเมินสิ่งปลูกสร้าง (ไม่รวมที่ดินและรากฐาน) 
                    และทำประกันภัยคุ้มครองตลอดระยะเวลาเงินกู้
                    (ต้องสอดคล้องกับหลักเกณฑ์ที่สำคัญที่สำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย
                    (คปภ.) กำหนด
                  </label>
                </div>
              </div>

              <div class="px-0 md:px-8">
                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label class="">
                    ธนาคารไม่ได้บังคับต้องทำประกันคุ้มครองวงเงินสินเชื่อ (Credit Life)
                    เป็นสิทธิของลูกค้าที่จะเลือกทำหรือไม่ก็ได้ ไม่มีผลต่อการพิจารณาอนุมัติสินเชื่อของธนาคาร
                  </label>
                </div>
              </div>


              <div class="flex items-start space-x-3">
                <label>3.</label>
                <label>
                  เงื่อนไขเกี่ยวกับเจ้าของหลักประกัน
                </label>
              </div>

              <div class="px-0 md:px-8">
                <div class="flex items-start space-x-3">
                  <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                    class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                    <circle cx="5" cy="5" r="5" fill="#78716c" />
                  </svg>
                  <label class="">
                    กรรมสิทธิ์ของคนอื่นประกอบด้วย (1)บิดา,มารดา หรือพี่น้องที่มีบิดามารดาเดียวกันกับผู้กู้/ผู้กู้ร่วม
                    (กรณีวงเงินกู้มากกว่า 10 ล้านบาท
                    ต้องไม่มีส่วนที่ประกอบธุรกิจและกรรมสิทธิ์ของผู้กู้/ผู้กู้ร่วมและไม่ใช่อาคารพาณิชย์) (2) บุคคลอื่นๆ
                    ที่ไม่ใช่กรรมสิทธิ์ของบิดา,มารดา หรือพี่น้องที่มีบิดามารดาเดียวกับผู้กู้/ผู้กู้ร่วม
                    โดยต้องมีเอกสารลงนามยินยอมกรรมสิทธิ์ให้ผู้กู้/ผู้กู้ร่วมให้สามารถนำมากู้กับธนาคาร
                    โดยวงเงินกู้ต้องไม่เกิน 5 ล้านบาท
                  </label>
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
                        บ้านเดี่ยว, คอนโดมิเนียม ตั้งแต่ 60 ตร.ม.ขึ้นไป และที่ดินว่างเปล่า เนื้อที่ไม่เกิน 3 ไร่: 5,000
                        บาท ต่อหลัง (ไม่รวม VAT)
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px] mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label class="">
                        บ้านแฝด, ทาวน์เฮาส์, คอนโดมิเนียม ไม่เกิน 60 ตร.ม. และอาคารพาณิชย์: 3,450 บาท ต่อยูนิต (ไม่รวม
                        VAT)
                      </label>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px] mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label class="">
                        กรณีไม่เป็นไปตามเงื่อนไขข้างต้น ธนาคารจะยังคงเรียกเก็บค่าประเมินหลักประกันตามอัตราปกติ
                      </label>
                    </div>
                  </div>

                  <div class="mt-6 md:mt-0">
                    <label class="text-lg text-black">ค่าธรรมเนียมการให้บริการสินเชื่อ</label>
                    <div class="flex items-start space-x-3">
                      <svg width="6" height="6" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
                        class="md:mt-[21px]  mt-[13px] flex-shrink-0">
                        <circle cx="5" cy="5" r="5" fill="#78716c" />
                      </svg>
                      <label class="">
                        ยกเว้น
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
                        1% ของวงเงินจำนอง
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

                    <img src="/img/icon/VerifyIden.svg" class="mt-20 lg:mt-0" />
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
                    <img src="/img/icon/Insurance.svg" />
                  </div>
                  <div class="mt-8 md:mt-0">
                    <label class="text-black lg:text-lg">เอกสารหลักประกัน</label>
                    <div class="flex items-start space-x-3 mt-6">
                      <label>1.</label>
                      <label>
                        สำเนาสัญญาซื้อขาย
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
                    <img src="/img/icon/ConfirmIncome.svg" />
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
import { ref } from "vue";
import 'primeicons/primeicons.css'

const home = ref({
  icon: 'pi pi-home md:text-md text-xs text-stone-400',
  route: '/main'
});
const items = ref([
  { label: 'สินเชื่อบ้าน', route: '/inputtext' },
  { label: 'สินเชื่อบ้านคือเงิน', route: '/houseismoney' },
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
</script>
<style></style>