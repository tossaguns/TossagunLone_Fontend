import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";
import "./assets/tailwind.css";

//primevue
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";

//แปลภาษา
import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import th from "./locales/th.json";

// Auth store
import { useAuthStore } from './stores/auth';

const app = createApp(App);
const pinia = createPinia();

const i18n = createI18n({
  legacy: false, // ใช้ Composition API
  globalInjection: true, // เพื่อให้ใช้ t() ได้โดยไม่ต้อง import ซ้ำ
  locale: localStorage.getItem("lang") || "th",
  messages: {
    en,
    th,
  },
});

app.use(pinia);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".my-app-dark",
    },
  },
});

app.use(i18n);
app.use(router);
app.use(ToastService);

// Initialize auth store
const authStore = useAuthStore();
authStore.initializeAuth();

app.mount("#app");
