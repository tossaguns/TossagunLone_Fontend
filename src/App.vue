<template>
  <div class="flex flex-col min-h-screen bg-neutral-800 noto-sans-thai">
    <router-view class="flex-grow" />
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'


onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  script.onload = () => {
    console.log('✅ Google SDK loaded')
  }
  document.head.appendChild(script)
})

</script>


<style scoped>
@import url('href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+Thai&display=swap');

.noto-sans-thai {
  font-family: "Noto Sans Thai", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
    "wdth" 100;
}
</style>
