<template>
  <div>
    <Bar />
    <div class="bg-neutral-800 ">
      <div class="max-w-7xl mx-auto ">
        <div class="bg-white ">
          <img src="/img/House/NewHouse.svg" />
          <div class="border border-stone-600 flex justify-center items-center space-x-12 py-2">
            <button class="text-sm text-stone-500 hover:text-yellow-400">รายละเอียด</button>
            <button class="text-sm text-stone-500 hover:text-yellow-400">ค่าสำรวจ/ประเมินราคา</button>
            <button class="text-sm text-stone-500 hover:text-yellow-400">คุณสมบัติ/เอกสาร</button>
          </div>

          <div class="py-7 px-24">
            <div class="flex space-x-4">
              <div class="w-6 h-6 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                <span class="text-yellow-400 text-sm font-bold">✔</span>
              </div>
              <label class="text-xl">รายละเอียดสินเชื่อบ้าน</label>
            </div>
            <div class="flex flex-col text-stone-500 leading-[3]">
              <label class="mt-6">
                หากคุณฝันอยากมีบ้าน ความฝันของคุณเป็นจริงได้ไม่ยาก ทศกัณฐ์พร้อมให้คำปรึกษา
                และมอบสิทธิประโยชน์สูงสุดให้คุณ เพื่อให้คุณและครอบครัวมีความสุขในบ้านที่อบอุ่น ด้วยวงเงินกู้สูงสุด 100%*
                ของมูลค่าหลักประกันตามราคาประเมิน หรือราคาซื้อขายในสัญญาซื้อขายของกรมที่ดิน แล้วแต่จำนวนใดจะต่ำกว่า
                สำหรับบ้านหลังแรกที่ราคาต่ำกว่า 10 ล้านบาท (สัญญาที่ 1) และอัตราดอกเบี้ยสุดพิเศษทั้งแบบคงที่
                และแบบลอยตัว
              </label>
              <div class="flex flex-col px-12 my-6 ">
                <label><span class="text-2xl mr-3">-</span>ดอกเบี้ยเริ่มต้นคงที่ 1 ปีแรก 2.55%*</label>
                <label>ส่วนลดอัตราดอกเบี้ย**</label>
                <label>กู้ได้สูงสุด 100%***</label>
              </div>
              <div>
                <label>*ดอกเบี้ยเริ่มต้นคงที่ 1 ปีแรก 2.55% เฉพาะลูกค้าที่ทำประกันชีวิต Credit Life</label>
                <label>**เมื่อซื้อประกัน Credit Life ตามเงื่อนไขที่กำหนด</label>
                <label>***วงเงินสินเชื่อสูงสุด 100% ของมูลค่าหลักประกันตามราคาประเมิน
                  หรือราคาซื้อขายในสัญญาซื้อขายของกรมที่ดิน แล้วแต่จำนวนใดจะต่ำกว่า สำหรับบ้านหลังแรกที่ราคาต่ำกว่า 10
                  ล้านบาท (สัญญาที่ 1) </label>
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
</script>
<style></style>