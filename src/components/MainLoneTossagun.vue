<template>
  <div class="noto-sans-thai">
    <div>
      <div class="flex justify-between items-center pt-4">
        <div class="rounded-t-3xl bg-[#323131] w-full md:pt-24 pt-12">
          <div class="flex flex-col md:flex-row gap-8 px-2">
            <div
              class="w-full md:w-1/2 flex flex-col text-white justify-center items-center md:items-start text-center md:text-left space-y-2 lg:pl-24 md:pl-12">
              <label class="text-3xl lg:text-4xl xl:text-5xl">ยกระดับ<span
                  class="text-yellow-400  text-5xl lg:text-6xl xl:text-7xl font-bold">การเงิน</span>คุณ</label>
              <label class="text-3xl lg:text-4xl xl:text-5xl">ด้วยบริการ<span
                  class="text-yellow-400  text-5xl lg:text-6xl xl:text-7xl font-bold">ไฟเเนนซ์</span>ที่</label>
              <label class="text-3xl lg:text-4xl xl:text-5xl"><span
                  class="text-yellow-400 text-5xl lg:text-6xl xl:text-7xl font-bold">เชื่อถือ</span>ได้</label>
            </div>

            <div
              class="w-full md:w-1/2 flex flex-col text-gray-300 justify-center items-center md:items-start text-center md:text-left lg:pl-24 md:pr-12">
              <div class="text-lg flex flex-col">
                <label>เพิ่มพลังการเงินให้คุณ ด้วยสินเชื่อที่ง่าย รวดเร็ว</label>
                <label>เชื่อถือได้ สมัครวันนี้เพื่ออนาคตที่มั่นคง</label>
                <label>พร้อมสิทธิประโยชน์ตอบโจทย์ทุกความต้องการ!</label>
              </div>

              <div class="mt-4 flex flex-col text-gray-400">
                <!--img icon-->
                <label>600+</label>
                <label>สาขาพร้อมให้บริการคุณ</label>
              </div>

              <div class="mt-8 mb-8 md:mb-0">
                <button class="border border-white py-1 px-1 rounded-full flex gap-x-2 items-center">
                  <label class="pl-2">สมัครสินเชื่อ</label>
                  <div class="bg-yellow-400 py-2 px-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="white" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div>
            <img src="/img/Baner_Toss_Main.png" />
          </div>

          <hr />


          <div class="overflow-hidden w-full bg-transparent py-1">
            <div class="scroll-loop text-white lg:text-sm text-xs flex gap-x-12">
              <label><span class="mr-2">*</span>DIGITAL GROP</label>
              <label><span class="mr-2">*</span>DIGITAL WORLD GROP</label>
              <label><span class="mr-2">*</span>DIGITAL DEVELOPER SERVICE CENTER</label>
              <label><span class="mr-2">*</span>DIGITAL SUCCESSMORE SERVICE</label>
              <label><span class="mr-2">*</span>DIGITAL ACCOUNTING AND FINANCE CENTER</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>


<style>
@keyframes scroll-x-loop {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.scroll-loop {
  white-space: nowrap;
  display: inline-block;
  animation: scroll-x-loop 40s linear infinite;
}
</style>
