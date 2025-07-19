<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto text-stone-600">
        <div class="mb-32">
          <div class="py-12 md:px-8 px-3">
            <div class="flex flex-col justify-center items-center">
              <label class="text-xl">เข้าร่วมเป็นพาร์ทเนอร์กับเรา SLEEPGUN</label>
              <div class="mt-6 space-x-6">
                <button
                  :class="['underline underline-offset-4', activeTab === 'register' ? 'text-amber-500' : 'text-stone-400 hover:text-amber-500']"
                  @click="activeTab = 'register'">สมัครสมาชิก</button>
                <button
                  :class="['underline underline-offset-4', activeTab === 'signin' ? 'text-amber-500' : 'text-stone-400 hover:text-amber-500']"
                  @click="activeTab = 'signin'">ลงชื่อเข้าใช้งาน</button>
              </div>
            </div>
          </div>

          <div class="flex justify-center items-end md:px-8 px-3 mt-12">
            <div v-if="activeTab === 'register'"
              class="border rounded-lg shadow-lg  w-full flex flex-col justify-center py-8">
              <label class="text-xl font-bold text-center">สมัครสมาชิกพาร์ทเนอร์</label>
              <RegisterPartner />
            </div>
            <div v-else class="border rounded-lg shadow-lg flex flex-col justify-center py-8">
              <label class="text-xl font-bold text-center">ลงชื่อเข้าใช้งานพาร์ทเนอร์</label>
              <LoginPartner />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Bar from "@components/BarHotelTossagun.vue";
import RegisterPartner from "@/views/RegisterLogin/All/RegisterPartner.vue";
import LoginPartner from "@/views/RegisterLogin/All/LoginPartner.vue";
import { ref, onMounted, } from 'vue'

const activeTab = ref('register')

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'auto' })
})
</script>
<style></style>