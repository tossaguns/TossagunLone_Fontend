<template>
  <div class="mx-4 border p-6 rounded-lg py-8 mt-10">
    <div>
      <div class="flex space-x-2">
        <img src="/images/icon/hotel.png" class="w-6 h-5" />
        <label class="font-bold">เกี่ยวกับที่พัก</label>
      </div>
      <div class="md:text-sm text-xs my-4">
        <label class="block indent-8">ประเภทของห้องพักในโรงแรมมีบมบาทสำคัญในการตัดสินใจจองห้องพักของแขก
          และแม้กระทั่งการตัดสินใจว่าจะจองหรือไม่
          การเสนอห้องพักที่กลุ่มเป้าหมายของคุณต้องการจึงเป็นสิ่งสำคัญแต่ก็ควรมีตัวเลือกหลายรูปแบบสำหรับรองรับแขกคนอื่น
          ๆ ด้วย ซึ่งจะช่วยเพิ่มอัตราการเข้าพักและรายได้ให้มากขึ้น</label>
      </div>
      <div>
        <div class="md:px-4 mt-2 flex flex-wrap gap-2 justify-start">
          <div v-for="(icon, index) in iconHotel" :key="index"
            class="flex items-center space-x-2 border py-1 px-3 rounded-full text-xs md:text-sm">
            <img :src="icon.icon" class="w-4 h-4" />
            <label>{{ icon.label }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <hr class="border-gray-200" />
    </div>

    <div class="mt-5">
      <div class="flex space-x-3">
        <img src="/images/icon/pin.png" class="w-5 h-5" />
        <label class="font-bold">ทำเลที่ตั้ง</label>
      </div>
      <div class="md:text-sm text-xs my-4">
        <label class="block indent-8">โรงแรมสมัยใหม่มักจะรองรับแขกหลากหลายประเภท
          ตั้งแต่คู่รักไปจนถึงครอบครัว
          ลายเพื่อตอบสนองความต้องการของแขกที่แตกต่างกัน</label>
      </div>
      <div>
        <div class="md:px-4 mt-2 flex flex-wrap gap-2 justify-start">
          <div v-for="(icon, index) in iconIocation" :key="index"
            class="flex items-center space-x-2 border py-1 px-3 rounded-full text-xs md:text-sm">
            <img :src="icon.icon" class="w-4 h-4" />
            <label>{{ icon.label }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <hr class="border-gray-200" />
    </div>

    <div class="mt-5">
      <div class="flex space-x-2">
        <img src="/images/icon/bed.png" class="w-6 h-5" />
        <label class="font-bold">สิ่งอำนวยความสะดวกภายในห้อง</label>
      </div>
      <div class="md:text-sm text-xs my-4">
        <label class="block indent-8">ห้องเดี่ยว ดับเบิ้ลรูม ห้องเตียงควีนไซซ์ ห้องสวีท?
          ตัวเลือกประเภทของห้องพักที่สามารถมอบประสบการณ์การเข้าพักให้ตรงตามความต้องการของแขกยังมีมากกว่านี้อีก</label>
      </div>
      <div>
        <div class="md:px-4 mt-2 flex flex-wrap gap-2 justify-start">
          <div v-for="(icon, index) in iconRoom" :key="index"
            class="flex items-center space-x-2 border py-1 px-3 rounded-full text-xs md:text-sm">
            <img :src="icon.icon" class="w-4 h-4" />
            <label>{{ icon.label }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <hr class="border-gray-200" />
    </div>

    <div class="mt-5">
      <div class="flex space-x-2">
        <img src="/images/icon/pet.png" class="w-6 h-5" />
        <label class="font-bold">การรองรับสัตวืเลี้ยง</label>
      </div>
      <div class="md:text-sm text-xs my-4">
        <label class="block indent-8">บล็อกนี้ เราจะพาคุณไปเจาะลึกประเภทของพักโรงแรมฉบับสมบูรณ์
          เพื่อให้โรงแรมของคุณสามารถกำหนดและวางกลยุทธ์การขายห้องพักออนไลน์ให้ประสบความสำเร็จได้มากยิ่งขึ้น</label>
      </div>
      <div>
        <div class="md:px-4 mt-2 flex flex-wrap gap-2 justify-start">
          <div v-for="(icon, index) in iconPet" :key="index"
            class="flex items-center space-x-2 border py-1 px-3 rounded-full text-xs md:text-sm">
            <img :src="icon.icon" class="w-4 h-4" />
            <label>{{ icon.label }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <hr class="border-gray-200" />
    </div>


    <div class="mt-5">
      <div class="flex space-x-2">
        <img src="/images/icon/food.png" class="w-6 h-5" />
        <label class="font-bold">มื้ออาหาร</label>
      </div>
      <div class="md:text-sm text-xs my-4">
        <label class="block indent-8">เป็นห้องขนาดใหญ่ที่เหมาะสำหรับแขก 4 คน และมักจะมีเตียงคู่ 2
          เตียง</label>
      </div>
      <div>
        <div class="md:px-4 mt-2 flex flex-wrap gap-2 justify-start">
          <div v-for="(icon, index) in iconFood" :key="index"
            class="flex items-center space-x-2 border py-1 px-3 rounded-full text-xs md:text-sm">
            <img :src="icon.icon" class="w-4 h-4" />
            <label>{{ icon.label }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  iconHotel: Array,
  iconIocation: Array,
  iconRoom: Array,
  iconPet: Array,
  iconFood: Array
})
</script>

<style scoped></style>