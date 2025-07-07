import { createRouter, createWebHistory } from "vue-router";

//TODO:Lone
import Main from "../views/Main.vue";
import ContactMassage from "../views/ContactMassage.vue";
import MapTossagun from "../views/MapTossagun.vue";
import NewHouse from "../views/House/NewHouse.vue";

import mainpage from "../views/tt/mainpage.vue";

const routes = [
  //TODO:Lone
  { path: "/main", component: Main },
  { path: "/contactmasage", component: ContactMassage },
  { path: "/maptossagun", component: MapTossagun },
   { path: "/newhouse", component: NewHouse },
  { path: "/mainpage", component: mainpage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
