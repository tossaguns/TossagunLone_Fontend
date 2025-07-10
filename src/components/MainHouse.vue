<template>
  <div class="noto-sans-thai">
    <div>
      <div class="flex justify-between items-center pt-4">
        <div class="relative w-full">
          <!-- รูปพื้นหลัง -->
          <img src="/img/House/MainHouse.png" alt="background" class="w-full h-auto object-contain rounded-t-3xl" />

          <div class="absolute inset-0 lg:mt-24 sm:mt-10 mt-3">
            <div class="flex flex-col lg:flex-row lg:justify-between items-start">
              <div
                class="w-full lg:w-1/2 flex flex-col text-white justify-center items-start text-left sm:space-y-2 lg:pl-24 md:pl-16 pl-6 sm:mb-4 lg:mb-0">
                <label class="lg:text-3xl md:text-xl">ยกระดับ<span
                    class="text-yellow-400 lg:text-5xl md:text-3xl font-bold">การเงิน</span>คุณ</label>
                <label class="lg:text-3xl md:text-xl">ด้วยบริการ<span
                    class="text-yellow-400 lg:text-5xl md:text-3xl font-bold">ไฟเเนนซ์</span>ที่</label>
                <label class="lg:text-3xl md:text-xl"><span
                    class="text-yellow-400 lg:text-5xl md:text-3xl font-bold">เชื่อถือ</span>ได้</label>
              </div>

              <div
                class="w-full lg:w-1/2 flex flex-col text-gray-300 justify-center items-start text-left lg:pl-24 md:pl-20 sm:pl-12 pl-6">
                <div class="hidden sm:block">
                  <div class=" flex flex-col">
                    <label class="md:text-base text-xs">เพิ่มพลังการเงินให้คุณ ด้วยสินเชื่อที่ง่าย รวดเร็ว</label>
                    <label class="md:text-base text-xs">เชื่อถือได้ สมัครวันนี้เพื่ออนาคตที่มั่นคง</label>
                    <label class="md:text-base text-xs">พร้อมสิทธิประโยชน์ตอบโจทย์ทุกความต้องการ!</label>
                  </div>
                </div>

                <div class="md:mt-4 sm:mt-2 flex flex-col text-gray-400">
                  <!--img icon-->
                  <label class="md:text-base sm:text-xs text-xxs">600+</label>
                  <label class="md:text-base sm:text-xs text-xxs">สาขาพร้อมให้บริการคุณ</label>
                </div>

                <div class="md:mt-8 sm:mt-2 mt-4">
                  <button class="border border-white py-1 px-1 rounded-full flex gap-x-2 items-center">
                    <label class="pl-2 md:text-base sm:text-sm text-xs">สมัครสินเชื่อ</label>
                    <div class="bg-yellow-400 sm:py-2 sm:px-2 py-1 px-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="white" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
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
