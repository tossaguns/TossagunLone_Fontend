<!--<template>
  <div class="pb-8">
    <div class="py-4 flex flex-col md:flex-row md:px-4 md:justify-between items-center relative md:rounded-lg"
      style="background-image: url('/icon1/rice.jpg'); background-size: cover; background-position: center;">

      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm md:rounded-xl"></div>
   
      <transition name="fade-slide" appear>
        <div v-if="showText" class="relative w-2/3 pb-3 md:pb-0 md:px-12 text-white z-10">
          <p class="indent-8">
            สวัสดิการพันธุ์หมื่นให้ สร้างสังคมแห่งความสุข
            สู่สังคมไร้เงินสดในรูปแบบของสหกรณ์ดิจิทัล
            ที่ใช้เทคโนโลยีแพลตฟอร์มอัจฉริยะที่มีประสิทธิภาพความแม่นยำ
            มาบริหารจัดการทุกๆ รายจ่ายทั้งหมดที่เกิดขึ้นจากการกินใช้
            ในชีวิตประจำวันของมนุษย์ นำมาแบ่งปันช่วยเหลือเกื้อกูล
            ให้แก่สมาชิกผู้บริโภคให้มีรายได้กลับคืน และหมุนเวียนภายในชุมชน
            ที่มั่นคง มั่งคั่ง และยั่งยืนตลอดไป
          </p>
        </div>
      </transition>
      <transition name="fade-slide-small" appear>
        <div v-if="showImg" class="relative md:w-1/3 w-10/12 rounded-xl shadow-lg z-10 
           mx-auto md:mx-0 mt-4 md:mt-0">
          <img class="h-48 rounded-xl w-full object-cover" src="/icon1/rice.jpg" />
        </div>
      </transition>
    </div>

    <transition name="fade-up" appear>
      <div v-if="showGoal" class="mt-3 py-6 md:px-6 px-4 rounded-lg">
        <p class="md:text-2xl text-xl text-center md:text-left font-semibold text-red-800 italic">เป้าหมาย</p>
        <div class="mt-2 md:px-4">
          <p class="indent-8">
            1. สร้างเครือข่ายผู้บริโภค
            แปลงรายจ่ายที่จำเป็นในชีวิตประจำวันของมนุษย์มาบริหารจัดการด้วยแพลตฟอร์มอัจฉริยะสวัสดิการพันธุ์หมื่นให้
          </p>
          <p class="indent-8">2. สร้างวัฒนธรรมการทำความดี
            ช่วยเหลือเกื้อกูลกันในสังคมด้วยกิจกรรมเปลี่ยนที่จ่ายย้ายที่ซื้อผ่านร้านค้ามินิมาร์ทชุมชน
            ซึ่งจะก่อให้เกิดรายได้หมุนเวียนส่งต่อความสุข และผลกำไรกลับไปยังผู้ที่ซื้อ</p>
          <p class="indent-8">
            3. สร้างหลักประกันความเชื่อมั่นให้แก่ชาวบ้าน เด็ก ผู้สูงอายุ ผู้ป่วยติดเตียงคนชรา คนพิการ ในชุมชน
            อันนำไปสู่การอารักขาความมั่นคงทางรายได้โดยไม่ต้องพึ่งพาลูกหลาน และรัฐบาลให้มีความมั่งคั่ง และยั่งยืน
            รวมทั้งยังเป็นมรดกตกทอดไปยังลูกหลานเมื่อท่าน ถึงแก่กรรม
          </p>
        </div>
      </div>
    </transition>

    <div ref="box"
      :class="['transition-all duration-1000', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10']"
      class="flex flex-col md:flex-row justify-between items-center mt-5 border">

      <div class="w-full md:w-4/6 bg-gray-200 md:rounded-l-lg overflow-hidden h-72">
        <img src="/icon1/rice.jpg" class="w-full h-full object-cover" />
      </div>

      <div
        class="w-full md:w-2/6 flex justify-center items-center relative overflow-hidden md:rounded-r-lg md:h-72 h-56"
        style="background-image: url('/icon1/rice.jpg'); background-size: cover; background-position: center;">

        <div class="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/70 to-transparent z-10"></div>
        <div class="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-lg"></div>

        <div class="flex flex-col justify-center items-center text-center px-4 py-6 relative z-20">
          <p class="text-xl font-bold mb-4 text-white drop-shadow-lg">
            PMH ทำอะไร ?<br />
            เป็นสมาชิก PMH ได้อะไร ?<br />
            ยุทธศาสตร์ 5 ด้าน
          </p>
          <button class="bg-black rounded-lg text-white px-4 py-2 hover:bg-gray-800 transition-colors">
            คลิ๊กเลย!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { ref, onMounted } from 'vue'

const showText = ref(false)
const showImg = ref(false)
const showGoal = ref(false)
const box = ref(null)
const isVisible = ref(false)

const revealInSequence = () => {
  showText.value = true

  setTimeout(() => {
    showImg.value = true
  }, 500)

  setTimeout(() => {
    showGoal.value = true


    setTimeout(() => {
      if (box.value) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              isVisible.value = true
              observer.unobserve(entry.target)
            }
          },
          { threshold: 0.1 }
        )
        observer.observe(box.value)
      }
    }, 200)
  }, 700)
}

onMounted(revealInSequence)
</script>




<style>
.fade-slide-enter-active {
  transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fade-slide-small-enter-active {
  transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-slide-small-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.8);
}

.fade-slide-small-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fade-up-enter-active {
  transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>-->
<template>
  <div>
    <div ref="myBox"
      class="sm:py-4 flex flex-col md:flex-row md:px-4 md:justify-between items-center relative md:rounded-lg "
      style="background-image: url('/icon1/rice.jpg'); background-size: cover; background-position: center;">

      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm md:rounded-xl"></div>

      <div :class="[
        'transition-all duration-700 ease-out will-change-transform will-change-opacity',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      ]"
        class="relative md:w-2/3 px-4 py-9 md:py-0 md:px-12 text-white z-10 flex justify-center flex-col items-center">
        <p class="indent-8 mt-4 md:mt-0">
          สวัสดิการพันธุ์หมื่นให้ สร้างสังคมแห่งความสุข
          สู่สังคมไร้เงินสดในรูปแบบของสหกรณ์ดิจิทัล
          ที่ใช้เทคโนโลยีแพลตฟอร์มอัจฉริยะที่มีประสิทธิภาพความแม่นยำ
          มาบริหารจัดการทุกๆ รายจ่ายทั้งหมดที่เกิดขึ้นจากการกินใช้
          ในชีวิตประจำวันของมนุษย์ นำมาแบ่งปันช่วยเหลือเกื้อกูล
          ให้แก่สมาชิกผู้บริโภคให้มีรายได้กลับคืน และหมุนเวียนภายในชุมชน
          ที่มั่นคง มั่งคั่ง และยั่งยืนตลอดไป
        </p>
        <a href="https://www.pmhphanmuenhai.com/about-6" target="_blank" rel="noopener noreferrer">
          <button class="bg-green-800 px-3 py-2 mt-4 rounded-lg hover:bg-green-900 transition text-white">
            อ่านเพิ่มได้ที่นี่
          </button>
        </a>
      </div>
      <div class="md:w-1/3 z-10 flex justify-center md:justify-end mt-2 md:mt-0">
        <img class="w-full h-auto sm:max-h-96 sm:rounded-xl shadow-lg object-contain" src="/graphics/pmh-02.jpg" />
      </div>
    </div>

    <div ref="goalRef" class="mt-3 py-24 md:px-6 px-4 rounded-lg" :class="[
      'transition-all duration-1000 ease-out will-change-transform will-change-opacity',
      isGoalVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
    ]">
      <p class="md:text-2xl text-xl text-center pb-5 md:pb-0 md:text-left font-semibold text-red-800 italic">เป้าหมาย</p>
      <div class="mt-2 md:px-4">
        <p class="indent-8">
          1. สร้างเครือข่ายผู้บริโภค
          แปลงรายจ่ายที่จำเป็นในชีวิตประจำวันของมนุษย์มาบริหารจัดการด้วยแพลตฟอร์มอัจฉริยะสวัสดิการพันธุ์หมื่นให้
        </p>
        <p class="indent-8">
          2. สร้างวัฒนธรรมการทำความดี
          ช่วยเหลือเกื้อกูลกันในสังคมด้วยกิจกรรมเปลี่ยนที่จ่ายย้ายที่ซื้อผ่านร้านค้ามินิมาร์ทชุมชน
          ซึ่งจะก่อให้เกิดรายได้หมุนเวียนส่งต่อความสุข และผลกำไรกลับไปยังผู้ที่ซื้อ
        </p>
        <p class="indent-8">
          3. สร้างหลักประกันความเชื่อมั่นให้แก่ชาวบ้าน เด็ก ผู้สูงอายุ ผู้ป่วยติดเตียงคนชรา คนพิการ ในชุมชน
          อันนำไปสู่การอารักขาความมั่นคงทางรายได้โดยไม่ต้องพึ่งพาลูกหลาน และรัฐบาลให้มีความมั่งคั่ง และยั่งยืน
          รวมทั้งยังเป็นมรดกตกทอดไปยังลูกหลานเมื่อท่าน ถึงแก่กรรม
        </p>
      </div>
    </div>

    <div class="flex flex-col md:flex-row mt-5">
      <!-- VIDEO -->
      <div class="w-full md:flex-[7] bg-gray-200 md:rounded-l-lg flex items-center justify-center "
        @click="toggleVideo">
        <video ref="videoRef" class="w-full md:rounded-l-lg aspect-video object-contain cursor-pointer" autoplay muted loop playsinline>
          <source src="/graphics/compare_vipnormal.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- TEXT -->
      <div class="w-full md:flex-[3] flex justify-center items-center relative overflow-hidden md:rounded-r-lg"
        style="background-image: url('/icon1/rice.jpg'); background-size: cover; background-position: center;">
        <div class="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/70 to-transparent z-10"></div>
        <div class="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-lg"></div>

        <div class="flex flex-col justify-center items-center text-center px-4 py-6 relative z-20">
          <p class="md:text-xl font-bold mb-4 text-white drop-shadow-lg">
            PMH ทำอะไร ?<br />
            เป็นสมาชิก PMH ได้อะไร ?<br />
            ยุทธศาสตร์ 5 ด้าน
          </p>
          <a href="https://www.pmhphanmuenhai.com/s-projects-basic" target="_blank" rel="noopener noreferrer">
            <button class="bg-black rounded-lg text-white px-4 py-2 hover:bg-gray-800 transition-colors">
              คลิ๊กเลย!
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const myBox = ref(null)
const isVisible = ref(false)
const goalRef = ref(null)
const isGoalVisible = ref(false)
const videoRef = ref(null)


let mainObserver = null
let goalObserver = null

const toggleVideo = () => {
  const video = videoRef.value
  if (video) {
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }
}

onMounted(() => {
 
  mainObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting
      // ไม่ต้อง unobserve ถ้าต้องการให้ animation ทำงานซ้ำได้
      if (entry.isIntersecting) {
        mainObserver.unobserve(entry.target)
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )
  
 
  goalObserver = new IntersectionObserver(
    ([entry]) => {
      isGoalVisible.value = entry.isIntersecting
      // ไม่ต้อง unobserve ถ้าต้องการให้ animation ทำงานซ้ำได้
      if (entry.isIntersecting) {
        goalObserver.unobserve(entry.target)
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  if (myBox.value) mainObserver.observe(myBox.value)
  if (goalRef.value) goalObserver.observe(goalRef.value)
})

onBeforeUnmount(() => {
  if (mainObserver) mainObserver.disconnect()
  if (goalObserver) goalObserver.disconnect()
})
</script>