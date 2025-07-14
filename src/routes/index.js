import { createRouter, createWebHistory } from "vue-router";

// TODO: Lone
import Main from "../views/Main.vue";
import MapTossagun from "../views/MapTossagun.vue";
import SignIn from "../views/SignIn.vue";
import MainManageRoom from "../views/Partner/Partner/ManageRoom/MainManageRoom.vue";
import AddRoom from "../views/Partner/Partner/ManageRoom/AddRoom.vue";

const routes = [
  { path: "/main", component: Main },
  { path: "/maptossagun", component: MapTossagun },
  { path: "/signin", component: SignIn },
  { path: "/mainmanageroom", component: MainManageRoom },
  { path: "/addroom", component: AddRoom },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
