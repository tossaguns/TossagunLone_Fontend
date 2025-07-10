<template>
  <div>

    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="bg-neutral-800  min-h-screen">
      <div class="max-w-7xl mx-auto ">
        <MainHouse />
        <div class="bg-yellow-300 ">
          <div class="w-full bg-no-repeat bg-cover bg-center xl:py-20 pt-12"
            style="background-image: url('/img/bgHCP.png');">

            <div class="inset-0 xl:px-24 ">
              <div class="md:px-12 px-12 xl:px-6 flex flex-col  text-center md:text-left">
                <label class="text-stone-500">ผลิตภัณฑ์สินเชื่อของเรา</label>
                <label class="text-lg md:text-2xl md:font-semibold">ตอบโจทย์ทุกความต้องการ
                  ด้วยตัวเลือกสินเชื่อที่เหมาะกับคุณ</label>
              </div>
              <div class="py-8 px-12 sm:px-16 xl:px-6">
                <div class="flex flex-col md:flex-row  md:justify-between md:space-x-5 items-stretch">
                  <div class="md:w-1/3 flex justify-center items-stretch">
                    <div @click="goToNewHouse"
                      class="w-full h-full border bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-3 rounded-xl flex flex-col">
                      <img src="/img/House/NewHouse.png" alt="สินเชื่อบ้านใหม่" class="w-full h-auto  rounded-xl" />
                      <div class="flex mt-3">
                        <label>สินเชื่อบ้านใหม่</label>
                        <label class="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="black" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                          </svg>
                        </label>
                      </div>
                      <div class="flex flex-col text-xs text-gray-400 my-4">
                        <label>สินเชื่อเงินกู้ซื้อบ้านใหม่ ผ่อนคอนโด อัตราดอกเบี้ยบ้านกำหนดได้</label>
                        <label>พร้อมให้คำปรึกษาและมอบสิทธิประโยชน์สูงสุดให้คุณ</label>
                      </div>
                    </div>
                  </div>
                  <div class="md:w-1/3 mt-8 md:mt-0 flex justify-center items-stretch">
                    <div @click="goToHouseIsMoney"
                      class="w-full h-full border bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-3 rounded-xl flex flex-col">
                      <img src="/img/House/HouseIsMoney.png" alt="สินเชื่อบ้านคือเงิน"
                        class="w-full h-auto rounded-xl" />
                      <div class="flex mt-3">
                        <label>สินเชื่อบ้านคือเงิน</label>
                        <label class="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="black" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                          </svg>
                        </label>
                      </div>
                      <div class="flex flex-col text-xs text-gray-400 my-4">
                        <label>สินเชื่อบ้านแลกเงิน ใช้บ้านแลกเงินก้อน สูงสุด 20 ล้านบาท</label>
                        <label>รู้ผลไวรับเงินเร็ว ผ่อนสบาย ๆ สูงสุด 30 ป</label>
                      </div>
                    </div>
                  </div>
                  <div class="md:w-1/3 mt-8 md:mt-0 flex justify-center  items-stretch">
                    <div @click="goToHouse2"
                      class="w-full h-full border bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-3 rounded-xl flex flex-col">
                      <img src="/img/House/House2.png" alt="สินเชื่อบ้านมือสอง" class="w-full h-auto  rounded-xl" />
                      <div class="flex mt-3">
                        <label>สินเชื่อบ้านมือสอง</label>
                        <label class="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="black" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                          </svg>
                        </label>
                      </div>
                      <div class="flex flex-col text-xs text-red-600 my-4">
                        <label>รีไฟแนนซ์บ้าน ผ่านสินเชื่อบ้าน ทศกัณฐ์ กู้ผ่านง่ายช่วยลดภาระดอกเบี้ย</label>
                        <label>เลือกผ่อนได้ตามสบายตามความต้องกาาร แถมเป็นเจ้าของบ้านไวกว่าเดิม</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col md:flex-row  md:justify-between md:space-x-5 items-stretch mt-6">
                  <div class="md:w-1/3 mt-8 md:mt-0 flex justify-center  items-stretch">
                    <div @click="goToCreditHasIncreased"
                      class="w-full h-full border bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-3 rounded-xl flex flex-col">
                      <img src="/img/House/CreditHasIncreased.png" alt="สินเชื่อบ้านได้เพิ่ม"
                        class="w-full h-auto  rounded-xl" />
                      <div class="flex mt-3">
                        <label>สินเชื่อบ้านได้เพิ่ม</label>
                        <label class="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="black" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                          </svg>
                        </label>
                      </div>
                      <div class="flex flex-col text-xs text-red-600 my-4">
                        <label>รีไฟแนนซ์บ้าน ผ่านสินเชื่อบ้าน ทศกัณฐ์ กู้ผ่านง่ายช่วยลดภาระดอกเบี้ย</label>
                        <label>เลือกผ่อนได้ตามสบายตามความต้องกาาร แถมเป็นเจ้าของบ้านไวกว่าเดิม</label>
                      </div>
                    </div>
                  </div>
                  <div class="md:w-1/3 mt-8 md:mt-0 flex justify-center  items-stretch">
                    <div @click="goToForHouse"
                      class="w-full h-full border bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-3 rounded-xl flex flex-col">
                      <img src="/img/House/ForHouse.png" alt="สินเชื่อส่วนบุคคล" class="w-full h-auto  rounded-xl" />
                      <div class="flex mt-3">
                        <label>สินเชื่อเพื่อปลูกสร้างบ้าน</label>
                        <label class="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="black" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                          </svg>
                        </label>
                      </div>
                      <div class="flex flex-col text-xs text-red-600 my-4">
                        <label>รีไฟแนนซ์บ้าน ผ่านสินเชื่อบ้าน ทศกัณฐ์ กู้ผ่านง่ายช่วยลดภาระดอกเบี้ย</label>
                        <label>เลือกผ่อนได้ตามสบายตามความต้องกาาร แถมเป็นเจ้าของบ้านไวกว่าเดิม</label>
                      </div>
                    </div>
                  </div>
                  <div class="md:w-1/3 mt-8 md:mt-0 flex justify-center  items-stretch">
                    <div @click="goToHouseRefinance"
                      class="w-full h-full border bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-3 rounded-xl flex flex-col">
                      <img src="/img/House/HouseRefinance.svg" alt="สินเชื่อส่วนบุคคล"
                        class="w-full h-auto  rounded-xl" />
                      <div class="flex mt-3">
                        <label class="text-red-600">สินเชื่อบ้านรีไฟเเนนนซ์(ไม่มีข้อมูล)</label>
                        <label class="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="black" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                          </svg>
                        </label>
                      </div>
                      <div class="flex flex-col text-xs text-red-600 my-4">
                        <label>รีไฟแนนซ์บ้าน ผ่านสินเชื่อบ้าน ทศกัณฐ์ กู้ผ่านง่ายช่วยลดภาระดอกเบี้ย</label>
                        <label>เลือกผ่อนได้ตามสบายตามความต้องกาาร แถมเป็นเจ้าของบ้านไวกว่าเดิม</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div class="md:px-12 px-12 xl:px-6 flex flex-col md:mt-8 mt-20  text-center md:text-left">
                <label class="text-stone-500">บริการด้านสินเชื่อบ้าน</label>
                <label class="text-lg md:text-2xl md:font-semibold">บริการด้านสินเชื่อครบวงจร
                  ที่พร้อมตอบโจทย์ทุกความต้องการ</label>
              </div>
              <div class="py-8 px-12 sm:px-16 xl:px-6">
                <div class="flex flex-col md:flex-row  md:justify-between md:space-x-5 items-stretch">

                  <div class="md:w-1/3 flex justify-center items-stretch">
                    <div
                      class="w-full h-full border bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-3 rounded-xl flex flex-col">
                      <img src="/img/Product/p4.png" alt="สินเชื่อบ้าน" class="w-full h-auto" />
                      <div class="flex mt-3">
                        <label>ขอหนังสือรับรองดอกเบี้ยเงินกู้</label>
                        <label class="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="black" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                          </svg>
                        </label>
                      </div>
                      <div class="flex flex-col text-xs text-gray-400 my-4">
                        <label>ลูกค้าสินเชื่อบ้าน SCB</label>
                        <label>ขอหนังสือรับรองดอกเบี้ยเงินกู้ได้ด้วยตัวเองเเล้ววันนี้</label>
                      </div>
                    </div>
                  </div>
                  <div class="md:w-1/3 mt-8 md:mt-0 flex justify-center items-stretch">
                    <div
                      class="w-full h-full border bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-3 rounded-xl flex flex-col">
                      <img src="/img/Product/p4.png" alt="สินเชื่อรถ" class="w-full h-auto" />
                      <div class="flex mt-3">
                        <label>ให้ความยินยอมดอกเบี้ยเงินกู้ยืม</label>
                        <label class="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="black" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                          </svg>
                        </label>
                      </div>
                      <div class="flex flex-col text-xs text-gray-400 my-4">
                        <label>การลดหย่อนภาษีของคุณจะไม่ยุ่งยากอีกต่อไป</label>
                        <label>สะดวก ไม่ต้องเตรียมเอกสารรับรองดอกเบี้ยเงินกู้</label>
                        <label>เพียงยินยอมให้ธนาคารส่งข้อมูล</label>
                      </div>
                    </div>
                  </div>
                  <div class="md:w-1/3 mt-8 md:mt-0 flex justify-center  items-stretch">
                    <div
                      class="w-full h-full border bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-3 rounded-xl flex flex-col">
                      <img src="/img/Product/p4.png" alt="สินเชื่อส่วนบุคคล" class="w-full h-auto" />
                      <div class="flex mt-3">
                        <label>เเจ้งความประสงค์ขอใช้บริการ</label>
                        <label class="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="black" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                          </svg>
                        </label>
                      </div>
                      <div class="flex flex-col text-xs text-gray-400 my-4">
                        <label>เเบบฟอร์มเเจ้งความประสงค์เพื่อขอใช้บริการ</label>
                        <!--TODO: ไม่เข้าใจข้อความนี้ จะสื่อถึงอะไร-->
                        <label class="text-red-500">เกี่ยวกับสินเชื่อเพื่อที่อยู่อาศัยของทศกัณฐ์</label>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="w-full border-2 border-black mt-8 rounded-full text-sm py-1 shadow-lg">เพิ่มเติม</button>
              </div>


              <div class="flex flex-col justify-center items-center mt-12 md:px-6 pb-20">
                <label class="py-3 text-xl font-bold">ประเมินวงเงินเเละค่างวด</label>
                <div class="flex flex-col md:flex-row md:justify-between items-center bg-white w-full rounded-2xl">

                  <div class="md:w-1/2 md:pl-12 md:pr-6 px-4 w-full">
                    <div class="flex flex-col justify-center items-center py-12">
                      <label class="font-bold pb-8">ราคาที่ต้องการประเมิณ</label>

                      <div class="flex flex-col w-full pb-4">
                        <label class="text-sm">ราคาที่ต้องการซื้อ</label>
                        <input type="number" class="border w-full rounded-full py-2 px-4" placeholder="$" />
                      </div>

                      <div class="flex flex-col w-full pb-4">
                        <label class="text-sm">ระบุเงินดาวน์</label>
                        <div class="flex flex-col md:flex-row gap-4 items-center  md:px-0 px-8">
                          <div class="flex flex-col w-full">
                            <input type="number" class="border w-full rounded-full py-2 px-4" placeholder="$ บาท" />
                          </div>
                          <label>หรือ</label>
                          <div class="flex flex-col w-full pb-4">
                            <input type="number" class="border w-full rounded-full py-2 px-4" placeholder="%" />
                          </div>
                        </div>
                      </div>

                      <div class="flex flex-col w-full pb-4">
                        <label class="text-sm">วงเงินที่ขออนุมัติสินเชื่อ(เงินกู้)</label>
                        <input type="number" class="border w-full rounded-full py-2 px-4" placeholder="$" />
                      </div>

                      <div class="flex flex-col w-full pb-4">
                        <label class="text-sm">ระบุอัตราดอกเบี้ย</label>
                        <input type="number" class="border w-full rounded-full py-2 px-4" placeholder="%" />
                      </div>

                      <div class="text-sm space-x-5 py-6 flex flex-row items-center">
                        <button class="flex flex-row underline underline-offset-4 decoration-yellow-400 decoration-2">
                          <img src="/img/Product/reset.png" class="w-4 mr-2 " />
                          เริ่มใหม่</button>
                        <button class="bg-yellow-400 py-2 px-6 rounded-full font-bold text-white ">คำนวน</button>
                      </div>
                    </div>
                  </div>

                  <div class="md:w-1/2 md:pr-12 md:pl-6 md:pb-0 px-4 pb-4">
                    <div class="flex flex-col justify-center items-start shadow-lg border rounded-xl px-4 py-6">
                      <label class="font-bold self-center pb-4">ราคาที่ต้องการประเมิน</label>
                      <label class="text-xs font-semibold pb-6">อัตราดอกเบี้ยคงที่ต่อปี (Flat Interest Rate)</label>
                      <label class="text-xxs font-semibold">ระยะเวลาผ่อนต่อเดือน</label>
                      <div class="text-xxs w-full">
                        <div class="mt-3 flex justify-start items-center">
                          <label class="px-3">84</label>
                          <label class="bg-yellow-100 w-full mr-3 px-5 py-1 rounded-full">0 บาท/เดือน</label>
                        </div>
                        <div class="mt-3 flex justify-start items-center">
                          <label class="px-3">72</label>
                          <label class="bg-yellow-100 w-full mr-3 px-5 py-1 rounded-full">0 บาท/เดือน</label>
                        </div>
                        <div class="mt-3 flex justify-start items-center">
                          <label class="px-3">60</label>
                          <label class="bg-yellow-100 w-full mr-3 px-5 py-1 rounded-full">0 บาท/เดือน</label>
                        </div>
                        <div class="mt-3 flex justify-start items-center">
                          <label class="px-3">48</label>
                          <label class="bg-yellow-100 w-full mr-3 px-5 py-1 rounded-full">0 บาท/เดือน</label>
                        </div>
                        <div class="mt-3 flex justify-start items-center">
                          <label class="px-3">36</label>
                          <label class="bg-yellow-100 w-full mr-3 px-5 py-1 rounded-full">0 บาท/เดือน</label>
                        </div>
                        <div class="mt-3 flex justify-start items-center">
                          <label class="px-3">24</label>
                          <label class="bg-yellow-100 w-full mr-3 px-5 py-1 rounded-full">0 บาท/เดือน</label>
                        </div>
                        <div class="mt-3 flex justify-start items-center">
                          <label class="px-3">12</label>
                          <label class="bg-yellow-100 w-full mr-3 px-5 py-1 rounded-full">0 บาท/เดือน</label>
                        </div>

                        <div class="flex justify-end px-3 mt-2">
                          <label class="text-xxxs text-stone-400">เงินที่ผ่อนต่อเดือน (บาท/เดือน)</label>
                        </div>

                        <div class="text-xxxs leading-none mt-2">
                          *การคำนวณข้างต้นเป็นเพียงเครื่องมือที่ช่วยให้ท่านสามารถทราบค่างวดที่ต้องผ่อนชำระต่อเดือน
                          เงื่อนไข เงินดาวน์ เเละอัตราดอกเบี้ยสามารถเปลี่ยนแปลงได้ตามเงื่อนไขของบริษัท
                        </div>

                      </div>
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
import MainHouse from "../../components/MainHouse.vue";
import { ref, onMounted, } from 'vue'
import AskContact from "../../components/AskContact.vue";
import Footer from "../../components/FooterLoneTossagun.vue";
import { useRouter } from 'vue-router'
import LoadPage from "../../components/LoadPage.vue";

const isLoading = ref(true)
const router = useRouter()

function goToNewHouse() {
  window.open('/newhouse', '_blank')
}
function goToHouseIsMoney() {
  window.open('/houseismoney', '_blank')
}
function goToHouse2() {
  window.open('/house2', '_blank')
}
function goToCreditHasIncreased() {
  window.open('/credithasincreased', '_blank')
}
function goToForHouse() {
  window.open('/forhouse', '_blank')
}
function goToHouseRefinance() {
  window.open('', '_blank')
}


onMounted(async () => {


})
</script>
<style></style>