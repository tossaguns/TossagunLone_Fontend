
// import { createApp } from 'vue'
// import './assets/tailwind.css'
// import App from './App.vue'
// import router from './routes'
// import { createPinia } from 'pinia'

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)
// app.mount('#app')


// src/main.js


import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";
import './assets/tailwind.css';


import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

import ToastService from 'primevue/toastservice';


const app = createApp(App);


const pinia = createPinia();
app.use(pinia);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".my-app-dark",
    },
  },
});

// ✅ ใช้ Router
app.use(router);

// ✅ เริ่ม AOS (ไม่ต้องผูกกับ app)


app.use(ToastService);

app.mount("#app");
