<template>
  <div>
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
</script>
<style></style>