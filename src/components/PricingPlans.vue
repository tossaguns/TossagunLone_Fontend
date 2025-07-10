<template>
  <div class="bg-white w-full border pb-20">
    <div class="w-full bg-no-repeat bg-cover bg-center xl:pt-20 pt-16"
      style="background-image: url('/img/Product/PlansYellow.png');">

      <div class="flex justify-center flex-col items-center">
        <label class="text-yellow-600 bg-yellow-200 md:px-4 md:py-2 px-2 py-1 rounded-full">Pricing plans</label>
        <label class="md:text-4xl text-3xl mt-4 font-bold">Plans for all sizes</label>
        <label class="mt-2 text-yellow-600 px-4 text-center">Simple, transparent pricing that grows white you. Try any
          plan free for 30 day.</label>
        <label class="mt-8 text-yellow-700 font-semibold">Annual pricing <span class="text-yellow-600 font-normal">(save
            20%)</span></label>
      </div>

      <div class="flex flex-col items-start mt-16 xl:px-28 lg:px-16 px-6 space-y-8">
        <div v-for="(chunk, rowIndex) in chunkedPlans" :key="rowIndex"
          class="w-full flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 items-stretch"
          :class="chunk.length < 3 ? 'md:justify-center' : 'md:justify-between'">
          <div v-for="(plan, index) in chunk" :key="index" class="md:w-1/3 w-full px-6 md:px-0">
            <div class="bg-white border rounded-xl shadow-lg flex flex-col justify-between w-full pt-6 h-full mt-2">
              <div class="px-6 flex flex-col flex-grow">
                <div class=" flex justify-center">
                  <div class="bg-yellow-100 px-1 py-1 rounded-full">
                    <div class="bg-yellow-200 px-1 py-1 rounded-full">
                      <img class="w-5 h-5 object-contain" :src="plan.icon" alt="icon" />
                    </div>
                  </div>
                </div>
                <label class="text-yellow-500 text-center font-bold mt-2 md:text-sm text-base">
                  {{ plan.name }}
                </label>
                <label class="mt-2 text-3xl font-bold text-center">
                  {{ plan.price }}
                </label>
                <label class="text-sm text-stone-500 text-center">{{ plan.note }}</label>

                <div class="my-8">
                  <div v-for="(line, i) in plan.description.split('\n')" :key="i"
                    class="self-start flex lg:px-6 md:px-3 px-6 space-x-3 py-1">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 text-yellow-500 shrink-0 bg-yellow-100 rounded-full" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>

                    <label class="text-stone-500 md:text-sm lg:text-base text-md break-words flex-1">
                      {{ line }}
                    </label>
                  </div>
                </div>
              </div>

              <div class="bg-stone-50 w-full px-6 py-6 rounded-b-xl">
                <button class="bg-yellow-300 w-full py-2 rounded-md font-bold text-white">
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white mt-24">
      <div class="bg-yellow-100 lg:px-20 px-4 md:px-12 md:py-16 py-8 lg:mx-24 md:mx-8 mx-3 rounded-xl flex flex-col">
        <div class="flex flex-col md:flex-row md:justify-between">
          <div class="flex flex-col">
            <label class="text-yellow-600 text-2xl font-semibold mb-2">Start your 30-day free trial</label>
            <label class="text-yellow-500">join over 4,000+ startups already growing with Untitled.</label>
          </div>

          <div class="space-x-2 font-semibold flex justify-center mt-6 md:mt-0 text-sm">
            <button class="bg-white py-2 px-4 rounded-lg border hover:bg-gray-100 transition">Learn more</button>
            <button class="bg-yellow-300 text-white py-2 px-4 rounded-lg border hover:bg-yellow-400 transition">Get
              started</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue'
const plans = [
  {
    name: 'Basic Plan',
    price: '$10/mth',
    note: 'billed annually',
    description: 'ฟีเจอร์พื้นฐานเหมาะกับผู้เริ่มต้น\niu98tueoawi4oe\noihue0di6ty0',
    icon: '/img/Bar/Tossagun.png',
  },
  {
    name: 'Standard Plan',
    price: '$20/mth',
    note: 'billed monthly',
    description: 'เหมาะกับธุรกิจขนาดเล็ก\nghuytiil\nhiuyi',
    icon: '/img/Bar/Tossagun.png',
  },
  {
    name: 'Pro Plan',
    price: '$30/mth',
    note: 'รวมทุกฟีเจอร์',
    description: 'สำหรับธุรกิจที่ต้องการเครื่องมือครบครัน\oiudr0oiy',
    icon: '/img/Bar/Tossagun.png',
  },
  {
    name: 'Enterprise Plan',
    price: '$50/mth',
    note: 'สำหรับองค์กรใหญ่',
    description: 'รองรับทีมและระบบขนาดใหญ่\noispiy[\nijghsout\n[s[optg[r\ngispti]]]]\ngsou',
    icon: '/img/Bar/Tossagun.png',
  },
  {
    name: 'Custom Plan',
    price: 'Contact us',
    note: 'เฉพาะตามความต้องการ',
    description: 'ปรับตามความต้องการของลูกค้าองค์กร',
    icon: '/img/Bar/Tossagun.png',
  },
  {
    name: 'Custom Plan',
    price: 'Contact us',
    note: 'เฉพาะตามความต้องการ',
    description: 'ปรับตามความต้องการของลูกค้าองค์กร',
    icon: '/img/Bar/Tossagun.png',
  },
]

const chunkedPlans = computed(() => {
  const chunkSize = 3
  const result = []
  for (let i = 0; i < plans.length; i += chunkSize) {
    result.push(plans.slice(i, i + chunkSize))
  }
  return result
})
</script>

<style></style>