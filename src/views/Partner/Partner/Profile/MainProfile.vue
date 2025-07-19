<template>
  <TemplatePartner>
    <template #header>
      <label>โปรไฟล์บริษัท</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div class="flex justify-center md:justify-start py-4 md:py-0">
          <label class="text-3xl font-semibold">โปรไฟล์บริษัท</label>
        </div>


        <div class="mt-12 mb-6 flex flex-col justify-center px-2">
          <div class="flex  flex-col  w-[450px] gap-x-3">
            <buton @click="goToDetailHotel"
              class="relative px-3 py-2 text-center overflow-hidden transition duration-300 hover:scale-105">
              <img src="/imgHotel/InRoom.jpg" class="w-full h-36 object-cover rounded-lg shadow-md" />
              <div
                class="absolute inset-0 flex items-center justify-center text-stone-500 font-semibold hover:text-stone-800 px-5">
                ข้อมูลเเละรายละเอียดเกี่ยวกับที่พัก
              </div>
            </buton>


            <buton @click="goToDataCompany"
              class="relative px-3 py-2 text-center overflow-hidden transition duration-300 hover:scale-105 h-36 rounded-lg">
              <img src="/imgHotel/employee.jpg" class="w-full h-32  object-cover rounded-lg shadow-md" />
              <div
                class="absolute inset-0 flex items-center justify-start pl-12 md:pl-20 md:text-xl text-stone-500 hover:text-stone-800 font-semibold">
                ข้อมูลโปรไฟล์
              </div>
            </buton>
          </div>
        </div>
      </div>
    </template>
  </TemplatePartner>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import TemplatePartner from "@/components/TemplatePartner.vue";

const { t } = useI18n()
const router = useRouter()

const employees = ref([])
const loading = ref(true)



function goToDetailHotel() {
  router.push('/detailhotel')
}

function goToDataCompany() {
  router.push('/profile')
}


</script>
