<template>
  <div>
    <Bar />
    <div class="bg-neutral-800 ">
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
import MainLoneTossagun from "./componentLone/MainLoneTossagun.vue";
import Product from "./componentLone/Product.vue";
import PricingPlans from "./componentLone/PricingPlans.vue";
import AskContact from "./componentLone/AskContact.vue";
import Footer from "../components/FooterLoneTossagun.vue";
</script>
<style></style>