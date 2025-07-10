<template>
  <div>
    <div v-if="isLoading"
      class="bg-neutral-800 min-h-screen flex justify-center items-center max-w-2xl mx-auto lg:px-0 px-8">
      <LoadPage class="w-full " />
    </div>

    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="bg-neutral-800  min-h-screen">
      <div class="max-w-7xl mx-auto ">
        <MainLoneTossagun />
        <Product />
        <PricingPlans />
        <AskContact />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import Bar from "../components/BarLoneTossagun.vue";
import MainLoneTossagun from "../components/MainLoneTossagun.vue";
import Product from "../components/Product.vue";
import PricingPlans from "../components/PricingPlans.vue";
import AskContact from "../components/AskContact.vue";
import Footer from "../components/FooterLoneTossagun.vue";
import { ref, onMounted, nextTick } from 'vue'
import LoadPage from "../components/LoadPage.vue";

const isLoading = ref(true)


onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'auto' })

  await nextTick()
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>
<style></style>