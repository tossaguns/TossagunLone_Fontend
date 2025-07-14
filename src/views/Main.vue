<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />

    </div>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto ">
        <AskContact />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import Bar from "@components/BarHotelTossagun.vue";

import AskContact from "@components/AskContact.vue";
import Footer from "@components/FooterLoneTossagun.vue";
import { ref, onMounted, } from 'vue'


onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'auto' })
})
</script>
<style></style>