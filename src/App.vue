<template>
  <div class="noto-sans-thai">
    <router-view />
    <CarouselBanner />
  </div>
</template>

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
