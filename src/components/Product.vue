<template>
  <div>
    <div class="w-full bg-no-repeat bg-cover bg-center xl:py-20 pt-12"
      style="background-image: url('/img/Product/Yellowbackground.svg');">

      <div class="inset-0 xl:px-24 ">
        <div class="md:px-12 px-12 xl:px-6 flex flex-col  text-center md:text-left">
          <label class="text-stone-500">ผลิตภัณฑ์สินเชื่อของเรา</label>
          <label class="text-lg md:text-2xl md:font-semibold">ตอบโจทย์ทุกความต้องการ
            ด้วยตัวเลือกสินเชื่อที่เหมาะกับคุณ</label>
        </div>
        <div class="py-8 px-12 sm:px-16 xl:px-6">
          <div class="flex flex-col md:flex-row  md:justify-between md:space-x-5 items-stretch">
            <div class="md:w-1/3 flex justify-center items-stretch">
              <div @click="goToHouse"
                class="w-full h-full border bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-3 rounded-xl flex flex-col">
                <img src="/img/Product/p1.svg" alt="สินเชื่อบ้าน" class="w-full h-auto" />
                <div class="flex mt-3">
                  <label>สินเชื่อบ้าน</label>
                  <label class="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="black" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                    </svg>
                  </label>
                </div>
                <div class="flex flex-col text-xs text-gray-400 my-4">
                  <label>ปลดล็อกความฝันการมีบ้าน</label>
                  <label>ด้วยสินเชื่อบ้านดอกเบี้ยต่ำ</label>
                  <label>ผ่อนยาวสูงสุด 30 ปี พร้อมวง่งินสูงถึง 90%</label>
                </div>
              </div>
            </div>
            <div class="md:w-1/3 mt-8 md:mt-0 flex justify-center items-stretch">
              <div
                class="w-full h-full border bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-3 rounded-xl flex flex-col">
                <img src="/img/Product/p2.svg" alt="สินเชื่อรถ" class="w-full h-auto" />
                <div class="flex mt-3">
                  <label>สินเชื่อรถ</label>
                  <label class="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="black" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                    </svg>
                  </label>
                </div>
                <div class="flex flex-col text-xs text-gray-400 my-4">
                  <label>เป็นเจ้าของรถได้ง่าย ทั้งรถใหม่เเละมือสอง</label>
                  <label>อนุมัติไว วงเงินสูง</label>
                  <label>พร้อมบริการรีไฟเเนนซ์ลดดอกเบี้ย</label>
                </div>
              </div>
            </div>
            <div class="md:w-1/3 mt-8 md:mt-0 flex justify-center  items-stretch">
              <div
                class="w-full h-full border bg-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] p-3 rounded-xl flex flex-col">
                <img src="/img/Product/p3.svg" alt="สินเชื่อส่วนบุคคล" class="w-full h-auto" />
                <div class="flex mt-3">
                  <label>สินเชื่อส่วนบุคล</label>
                  <label class="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="black" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                    </svg>
                  </label>
                </div>
                <div class="flex flex-col text-xs text-gray-400 my-4">
                  <label>เงินก้อนทันใจ ไม่ต้องใช้หลักทรัพย์ สมัครง่าย</label>
                  <label>อนุมัติไว พร้อมเงื่อนไขการผ่อนชำระที่ยืดหยุ่น</label>
                </div>
              </div>
            </div>
          </div>
          <button class="w-full border-2 border-black mt-8 rounded-full text-sm py-1 shadow-lg">เพิ่มเติม</button>
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
                <img src="/img/Product/p4.svg" alt="สินเชื่อบ้าน" class="w-full h-auto" />
                <div class="flex mt-3">
                  <label>ขอหนังสือรับรองดอกเบี้ยเงินกู้</label>
                  <label class="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="black" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
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
                <img src="/img/Product/p4.svg" alt="สินเชื่อรถ" class="w-full h-auto" />
                <div class="flex mt-3">
                  <label>ให้ความยินยอมดอกเบี้ยเงินกู้ยืม</label>
                  <label class="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="black" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
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
                <img src="/img/Product/p4.svg" alt="สินเชื่อส่วนบุคคล" class="w-full h-auto" />
                <div class="flex mt-3">
                  <label>เเจ้งความประสงค์ขอใช้บริการ</label>
                  <label class="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="black" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
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

        <!-- แสดงเฉพาะ xl ขึ้นไป -->
        <div class="mt-4 px-6 hidden xl:block">
          <img src="/img/Product/downloadApp_D.png" alt="QRcode_downloadApp"
            class="rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]" />
        </div>

        <!-- แสดงเฉพาะ md ถึง lg -->
        <div class="mt-4 hidden md:block xl:hidden">
          <img src="/img/Product/downloadApp_T.png" alt="QRcode_downloadApp" class="w-full" />
        </div>

        <!-- แสดงเฉพาะขนาดต่ำกว่า md -->
        <div class="mt-4 block md:hidden">
          <img src="/img/Product/downloadApp_M.svg" alt="QRcode_downloadApp" class=" bg-[#151515]  w-full" />
        </div>

      </div>
    </div>
  </div>

</template>


<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToHouse() {
  router.push('/mainhouse')
}
</script>
<style></style>