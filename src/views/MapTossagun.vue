<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen flex flex-col">
      <div class="max-w-[3000px] mx-auto ">
        <div class="bg-white py-12">
          <div class="flex flex-col justify-center items-center">
            <label class="text-sm font-bold text-yellow-500 mb-3">ติดต่อเรา</label>
            <label class="text-3xl font-bold mb-3">ที่ตั้งของเรา</label>
            <label
              class="text-stone-400 text-center mb-6">มาเยี่ยมทีมงานที่เป็นมิตรของเราได้ที่สำนักงานของเราทั้งหมด!</label>
          </div>

          <!--TODO: ค่อยเปลี่ยนมาใช้ Google Maps JavaScript API ทีหลัง อันนี้เเค่เอามาเเสดงไว้ก่อน-->
          <div class="py-4 lg:px-24 md:px-12 px-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.893137146476!2d100.52949901533504!3d13.745157501217733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ed31bd493ff%3A0x2c5d48d87869d0f7!2sSiam%20Paragon!5e0!3m2!1sth!2sth!4v1654567890123!5m2!1sth!2sth"
              width="100%" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              class="rounded-xl border"></iframe>

            <div
              class="flex flex-col  md:flex-row md:justify-between items-center mt-16 text-center space-y-16 md:space-y-0">
              <div class="flex flex-col items-center md:w-1/3 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#facc15"
                  stroke-width="2" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 11 6 11s6-6.5 6-11c0-3.314-2.686-6-6-6z" />
                  <circle cx="12" cy="8" r="2" />
                </svg>
                <div class="flex flex-col">
                  <label class="font-bold text-lg">Retail Store</label>
                  <label class="">Mon-Sat 9am to 6pm.</label>
                  <div class="flex flex-col mt-4 text-yellow-400 text-sm font-bold">
                    <label>150 Brunswick Street</label>
                    <label>Fitzroy VIC 3065 AU</label>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-center md:w-1/3 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#facc15"
                  stroke-width="2" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 11 6 11s6-6.5 6-11c0-3.314-2.686-6-6-6z" />
                  <circle cx="12" cy="8" r="2" />
                </svg>
                <div class="flex flex-col">
                  <label class="font-bold text-lg">Showroom</label>
                  <label class="">MOn-Fri 9am to 6pm.</label>
                  <div class="flex flex-col mt-4 text-yellow-400 text-sm font-bold">
                    <label>50 Flinders Street</label>
                    <label>Melbourne VIC 3000 AU</label>
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-center md:w-1/3 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#facc15"
                  stroke-width="2" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 11 6 11s6-6.5 6-11c0-3.314-2.686-6-6-6z" />
                  <circle cx="12" cy="8" r="2" />
                </svg>
                <div class="flex flex-col">
                  <label class="font-bold text-lg">Head Office</label>
                  <label class="">Mon-Sat 9am to 6pm.</label>
                  <div class="flex flex-col mt-4 text-yellow-400 text-sm font-bold">
                    <label>100 Smith Street</label>
                    <label>Collingwoood VIC 3066 AU</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Bar from "@components/BarHotelTossagun.vue"
import Footer from "@components/FooterLoneTossagun.vue"
import { ref, onMounted, } from 'vue'

const isLoading = ref(true)

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'auto' })
})
</script>

<style></style>