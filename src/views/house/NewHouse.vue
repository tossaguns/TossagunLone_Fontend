<template>
  <div>
    <Bar />
    <div class="bg-neutral-800 ">
      <div class="max-w-7xl mx-auto ">
        <div class="bg-white ">
          <img src="/img/House/NewHouse.svg" />
          <div class="sticky top-0 z-50 bg-white">
            <BarHouse />
          </div>

          <div class="py-7 md:px-24 px-6">
            <div class="flex md:space-x-4 space-x-2 items-center">
              <div
                class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                <span class="text-yellow-400 md:text-sm text-xxs  font-bold">✔</span>
              </div>
              <label class="text-xl">รายละเอียดสินเชื่อบ้าน</label>
            </div>
            <div class="md:leading-[3] leading-[2] text-stone-500">
              <div class="flex flex-col  ">
                <label class="mt-6">
                  หากคุณฝันอยากมีบ้าน ความฝันของคุณเป็นจริงได้ไม่ยาก ทศกัณฐ์พร้อมให้คำปรึกษา
                  และมอบสิทธิประโยชน์สูงสุดให้คุณ เพื่อให้คุณและครอบครัวมีความสุขในบ้านที่อบอุ่น ด้วยวงเงินกู้สูงสุด
                  100%*
                  ของมูลค่าหลักประกันตามราคาประเมิน หรือราคาซื้อขายในสัญญาซื้อขายของกรมที่ดิน แล้วแต่จำนวนใดจะต่ำกว่า
                  สำหรับบ้านหลังแรกที่ราคาต่ำกว่า 10 ล้านบาท (สัญญาที่ 1) และอัตราดอกเบี้ยสุดพิเศษทั้งแบบคงที่
                  และแบบลอยตัว
                </label>
                <div class="flex flex-col md:px-12 my-6 ">
                  <label><span class="text-2xl mr-3">-</span>ดอกเบี้ยเริ่มต้นคงที่ 1 ปีแรก 2.55%*</label>
                  <label><span class="text-2xl mr-3">-</span>ส่วนลดอัตราดอกเบี้ย**</label>
                  <label><span class="text-2xl mr-3">-</span>กู้ได้สูงสุด 100%***</label>
                </div>
                <div class="flex flex-col">
                  <label>*ดอกเบี้ยเริ่มต้นคงที่ 1 ปีแรก 2.55% เฉพาะลูกค้าที่ทำประกันชีวิต Credit Life</label>
                  <label>**เมื่อซื้อประกัน Credit Life ตามเงื่อนไขที่กำหนด</label>
                  <label>***วงเงินสินเชื่อสูงสุด 100% ของมูลค่าหลักประกันตามราคาประเมิน
                    หรือราคาซื้อขายในสัญญาซื้อขายของกรมที่ดิน แล้วแต่จำนวนใดจะต่ำกว่า สำหรับบ้านหลังแรกที่ราคาต่ำกว่า 10
                    ล้านบาท (สัญญาที่ 1) </label>
                </div>
              </div>

              <div class="flex flex-col md:flex-row justify-between items-start mt-16 space-x-2">
                <div class="md:w-1/2 px-2">
                  <div class="mb-5">
                    <div class="flex flex-row items-center space-x-2">
                      <div
                        class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                        <span class="text-yellow-400 md:text-sm text-xxs  font-bold">✔</span>
                      </div>
                      <label class="text-black font-semibold">เลือกได้ตามใจคุณ</label>
                    </div>
                    <label>สินเชื่อบ้านใหม่ ให้อิสระในการเลือกดอกเบี้ย และรูปแบบการผ่อนที่ตอบสนอง Lifestyle ของคุณ
                      ทั้งดอกเบี้ยคงที่ ดอกเบี้ยลอยตัว เพื่อให้คุณวางแผนการเงินได้ตามที่คุณต้องการ</label>
                  </div>

                  <div class="mb-5">
                    <div class="flex flex-row items-center space-x-2">
                      <div
                        class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                        <span class="text-yellow-400 md:text-sm text-xxs  font-bold">✔</span>
                      </div>
                      <label class="text-black font-semibold">ผ่อนสบาย</label>
                    </div>
                    <label>ผ่อนสบายแบบ ลดต้น ลดดอก กับระยะเวลากู้นานสูงสุด 30 ปี
                      และระยะเวลาผ่อนชำระรวมอายุผู้กู้แล้วไม่เกิน 65 ปี</label>
                  </div>

                  <div class="mb-5">
                    <div class="flex flex-row items-center space-x-2">
                      <div
                        class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                        <span class="text-yellow-400 md:text-sm text-xxs  font-bold">✔</span>
                      </div>
                      <label class="text-black font-semibold">อนุมัติรวดเร็ว</label>
                    </div>
                    <label>ทราบผลอนุมัติ วงเงินอนุมัติ และอัตราผ่อน รวดเร็วทันใจ</label>
                  </div>
                </div>

                <div class="w-1/2 px-2">
                  <div class="mb-5">
                    <div class="flex flex-row items-center space-x-2">
                      <div
                        class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                        <span class="text-yellow-400 md:text-sm text-xxs  font-bold">✔</span>
                      </div>
                      <label class="text-black font-semibold">บริการอย่างมืออาชีพ</label>
                    </div>
                    <label>เราพร้อมเป็นคู่คิดในการ วางแผนการขอสินเชื่อ และมอบสิทธิประโยชน์ที่ดีที่สุดให้แก่คุณ
                      เพราะการกู้บ้าน เป็นเรื่องระยะยาว คุณจึงต้องมีที่ปรึกษามืออาชีพดูแล</label>
                  </div>

                  <div class="mb-5">
                    <div class="flex flex-row items-center space-x-2">
                      <div
                        class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                        <span class="text-yellow-400 md:text-sm text-xxs  font-bold">✔</span>
                      </div>
                      <label class="text-black font-semibold">อัตราดอกเบี้ย</label>
                    </div>
                    <label>เป็นไปตามประกาศของธนาคาร</label>
                  </div>

                  <div class="mb-5">
                    <div class="flex flex-row items-center space-x-2">
                      <div
                        class="md:w-6 md:h-6 w-4 h-4 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                        <span class="text-yellow-400 md:text-sm text-xxs  font-bold">✔</span>
                      </div>
                      <label class="text-black font-semibold">กู้เท่าที่จำเป็นและชำระคืนไหว</label>
                    </div>
                    <label>อัตราดอกเบี้ยที่แท้จริงอยู่ระหว่าง 4.950% - 7.175% ต่อปี </label>
                  </div>
                </div>
              </div>

              <div class="bg-stone-100 py-8 px-6">
                <div class="flex flex-col md:flex-row justify-between items-start">
                  <div>
                    <div>
                      <label>ค่าสำรวจและประเมินราคาหลักประกัน</label>
                      <div class="flex flex-col">
                        <label>กรณีเป็นโครงการที่ธนาคารให้การสนับสนุน 500 บาท (ไม่รวม VAT)</label>
                        <label>กรณีบ้านเดี่ยว 5,000 บาท ต่อหลัง (ไม่รวม VAT)</label>
                        <label>กรณีทาวน์เฮ้าส์, บ้านแฝด และห้องชุด 3,450 บาท ต่อยูนิต (ไม่รวม VAT)</label>
                        <label>สำหรับการปลูกสร้างบ้าน กรณีที่ดินไม่เกิน 1 ไร่ ประมาณ 4,550 บาท (ไม่รวม VAT) และค่าตรวจงวดงานก่อสร้าง 1,100 บาทต่อครั้ง (ไม่รวม VAT)</label>
                        <label>ค่าใช้จ่ายอาจเปลี่ยนแปลงได้ตามประกาศของธนาคาร</label>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import Bar from "../../components/BarLoneTossagun.vue";
import Footer from "../../components/FooterLoneTossagun.vue";
import BarHouse from "../house/BarHouse.vue";
</script>
<style></style>