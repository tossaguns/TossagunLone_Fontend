<template>
  <div class="min-h-screen minimal-scrollbar">
    <router-view />
  </div>
</template>

<script setup>

import { onMounted } from 'vue'

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

<style>
@import url("https://fonts.googleapis.com/css2?family=Itim&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Thai+Looped:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap");

.mitr-regular {
  font-family: "Mitr", sans-serif;
}

.league-spartan {
  font-family: "League Spartan", sans-serif;
}

.noto-thai {
  font-family: "Noto Sans Thai Looped", sans-serif;
}

.prompt-regular {
  font-family: "Prompt", sans-serif;
}

.itim-regular {
  font-family: "Itim", cursive;
}

.dropdown-container,
.status-select {
  z-index: 9999 !important;
  pointer-events: auto !important;
  position: relative;
}
</style>
