<!--<template>
  <div>
   
    <div
      ref="introSection"
      :class="[
        'flex flex-col md:flex-row md:justify-between items-center py-4 px-4',
        introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        'transition-opacity transition-transform duration-700 ease-out'
      ]"
    >
      <div class="md:w-1/3 w-60">
        <img src="/icon1/rice.jpg" class="w-full h-48 object-cover rounded-xl" />
      </div>

      <div class="md:w-2/3 md:px-12 pb-2">
        <p class="italic indent-8 pt-4">
          ในยุคปัจจุบันเกิดการเปลี่ยนแปลงทางโลกขึ้นอย่างเหลือเชื่อ
          ทุกสิ่งอย่างนั้นล้วนแล้วแต่มีเหตุและปัจจัยจนนำไปสู่ปัญหาต่างๆ ทั้งสงคราม เศรษฐกิจ
          ความเป็นอยู่เดือดร้อนไปทุกหย่อมหญ้า ประชาชนเกิดความวิตกกังวลและไม่มีความมั่นคงในชีวิต หน้าที่การงาน สุขภาพ
          จึงทำให้ผมมีความคิดที่อยากจะช่วยเหลือเพื่อนมนุษย์ ด้วยการคิดค้นแพลตฟอร์มอัจฉริยะขึ้นมา
        </p>
        <div class="text-center mt-4 font-semibold">
          <p>ผศ.พันธุ์เดช นนท์แสงโรจน์</p>
          <p>ประธานบริษัท พันธุ์หมื่นให้ จำกัด</p>
        </div>
      </div>
    </div>

    <div
      ref="cardsSection"
      :class="[
        'flex flex-col md:flex-row justify-between items-center mt-5 md:space-x-3 px-4 space-y-2 md:space-y-0',
        cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        'transition-opacity transition-transform duration-700 ease-out delay-150'
      ]"
    >
      <div class="md:w-1/3 w-full bg-gray-200 rounded-lg">
        <div>
          <img
            src="/icon1/rice.jpg"
            alt="รูป Service"
            class="bg-gray-100 w-full h-44 object-cover rounded-t-lg"
          />
        </div>
        <div class="py-4 bg-gray-500 text-white rounded-b-lg text-center">
          <p>พบกันเร็วๆนี้</p>
        </div>
      </div>

      <div class="md:w-1/3 w-full bg-gray-200 rounded-lg">
        <div>
          <img
            src="/icon1/rice.jpg"
            alt="รูป Service"
            class="bg-gray-100 w-full h-44 object-cover rounded-t-lg"
          />
        </div>
        <div class="py-4 bg-gray-500 text-white rounded-b-lg text-center">
          <p>พบกันเร็วๆนี้</p>
        </div>
      </div>

      <div class="md:w-1/3 w-full bg-gray-200 rounded-lg">
        <div>
          <img
            src="/icon1/rice.jpg"
            alt="รูป Service"
            class="bg-gray-100 w-full h-44 object-cover rounded-t-lg"
          />
        </div>
        <div class="py-4 bg-gray-500 text-white rounded-b-lg text-center">
          <p>พบกันเร็วๆนี้</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const introSection = ref(null)
const cardsSection = ref(null)

const introVisible = ref(false)
const cardsVisible = ref(false)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === introSection.value) {
            introVisible.value = true
            observer.unobserve(introSection.value)
          }
          if (entry.target === cardsSection.value) {
            cardsVisible.value = true
            observer.unobserve(cardsSection.value)
          }
        }
      })
    },
    { threshold: 0.3 }
  )
  if (introSection.value) observer.observe(introSection.value)
  if (cardsSection.value) observer.observe(cardsSection.value)
})

onBeforeUnmount(() => {
  if (observer) {
    if (introSection.value) observer.unobserve(introSection.value)
    if (cardsSection.value) observer.unobserve(cardsSection.value)
  }
})
</script>-->


<template>
  <div>
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 bg-center bg-cover bg-fixed z-0"
        style="background-image: url('/graphics/tablet.jpg');">
      </div>
      <div class="absolute inset-0 bg-black/50 z-10"></div>

      <div class="relative z-20 flex flex-col md:flex-row md:justify-between items-center py-8 px-6 text-white">
        <div class="md:w-1/3 w-80">
          <img src="/graphics/สวัสดิการ-03.jpg" class="w-full object-cover rounded-xl shadow-lg" />
        </div>

        <div class="md:w-2/3 md:px-12 pb-2">
          <p class="italic indent-8 pt-12">
            " ในยุคปัจจุบันเกิดการเปลี่ยนแปลงทางโลกขึ้นอย่างเหลือเชื่อ
            ทุกสิ่งอย่างนั้นล้วนแล้วแต่มีเหตุและปัจจัยจนนำไปสู่ปัญหาต่างๆ ทั้งสงคราม เศรษฐกิจ
            ความเป็นอยู่เดือดร้อนไปทุกหย่อมหญ้า ประชาชนเกิดความวิตกกังวลและไม่มีความมั่นคงในชีวิต หน้าที่การงาน สุขภาพ
            จึงทำให้ผมมีความคิดที่อยากจะช่วยเหลือเพื่อนมนุษย์ ด้วยการคิดค้นแพลตฟอร์มอัจฉริยะขึ้นมา "
          </p>
          <div class="text-center mt-6 text-xs">
            <p>ผศ.พันธุ์เดช นนท์แสงโรจน์</p>
            <p>ประธานบริษัท พันธุ์หมื่นให้ จำกัด</p>
          </div>
        </div>
      </div>
    </div>


    <div class="flex flex-col md:flex-row justify-between items-center mt-5 md:space-x-3 px-4 space-y-2 md:space-y-0 pt-8">
      <div class="md:w-1/3 w-full bg-gray-200 rounded-lg">
        <div>
          <img src="/icon1/rice.jpg" alt="รูป Service" class="bg-gray-100 w-full h-44 object-cover rounded-t-lg" />
        </div>
        <div class="py-4 bg-gray-500 text-white rounded-b-lg text-center">
          <p>พบกันเร็วๆนี้</p>
        </div>
      </div>

      <div class="md:w-1/3 w-full bg-gray-200 rounded-lg">
        <div>
          <img src="/icon1/rice.jpg" alt="รูป Service" class="bg-gray-100 w-full h-44 object-cover rounded-t-lg" />
        </div>
        <div class="py-4 bg-gray-500 text-white rounded-b-lg text-center">
          <p>พบกันเร็วๆนี้</p>
        </div>
      </div>

      <div class="md:w-1/3 w-full bg-gray-200 rounded-lg">
        <div>
          <img src="/icon1/rice.jpg" alt="รูป Service" class="bg-gray-100 w-full h-44 object-cover rounded-t-lg" />
        </div>
        <div class="py-4 bg-gray-500 text-white rounded-b-lg text-center">
          <p>พบกันเร็วๆนี้</p>
        </div>
      </div>
    </div>
  </div>
</template>
