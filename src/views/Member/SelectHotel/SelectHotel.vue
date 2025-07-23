<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto text-stone-600">

        <div>
          <div>

          </div>
        </div>
        
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Bar from "@components/BarMember.vue";
import Footer from "@components/FooterLoneTossagun.vue";
import { ref, onMounted } from 'vue';

import { useRouter } from 'vue-router';
const router = useRouter();


</script>
