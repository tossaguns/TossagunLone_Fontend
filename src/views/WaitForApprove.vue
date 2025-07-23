<template>
  <div class="w-full min-h-screen pt-6 bg-stone-100 px-4">
      <div class="max-w-5xl mx-auto">
          <div class="">
              <div class="bg-white   shadow-xl px-3 py-8 md:py-2  rounded-xl relative z-10">
                  <div class="flex justify-center items-center">
                      <div class="md:ml- ml-4 text-xl">
                          <p class="md:pl-3 font-bold text-stone-500">รอการอนุมัติ</p>
                          <p class="font-bold md:text-7xl text-4xl font-serif">Waiting <br /><span
                                  class="md:text-3xl text-xl text-stone-500">for</span>
                              <span class="text-amber-500 ml-2">approval </span><br /><span
                                  class="font-thin md:text-7xl text-2xl ">from officials</span>
                          </p>
                      </div>

                      <div class="flex flex-col items-center">
                          <img src="/imgTossagun/Tosrun.png" alt="icon" class="object-contain runner" />
                          <div class="md:text-md font-bold textanima hidden md:block">
                              SELLPGUN || Tossagun
                          </div>
                      </div>
                  </div>

                  <div class="mt-6">
                      <div class="text-md text-center">
                          <p>ขณะนี้เจ้าหน้าที่กำลังทำการตรวจสอบหากการอนุมัติสำเร็จ
                              ทางเราจะเเจ้งให้ท่านทราบผ่านทาง <span
                                  class="text-amber-600  pr-1 font-bold">Email</span>ภายใน
                              <span class="text-amber-600  pr-1 font-bold">1-3 วัน</span>
                          </p>
                      </div>

                      <div class="font-bold mt-2 text-amber-500">
                          <p class="text-center">
                              ขอบคุณทุกท่านที่สนใจเป็นพาทเนอร์กับเรา
                          </p>
                      </div>

                      <div class="md:mt-20 mt-12 flex justify-center md:pb-6">
                          <button @click="navigateToTassagunHotel"
                              class="bg-red-800 py-2 px-4 text-white rounded-md hover:bg-red-600">กลับหน้าหลัก</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>

</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function navigateToTassagunHotel() {
  router.push("/")
}
</script>
<style>
.runner {
  width: 100%;
  animation: bounce 3s infinite ease-in-out;
}


.textanima {
  position: relative;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 4px;
  overflow: hidden;
  background: linear-gradient(90deg, #eec356, #fff, #fcc80a);
  background-repeat: no-repeat;
  background-size: 80%;
  animation: animate 5s linear infinite;
  animation: animate 10s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
}


@keyframes bounce {

  0%,
  100% {
      transform: translateY(0);
  }

  50% {
      transform: translateY(-10px);
  }
}

@keyframes animate {
  0% {
      background-position: -500%;
  }

  80% {
      background-position: 500%;
  }

  100% {
      background-position: -500%;
  }
}
</style>