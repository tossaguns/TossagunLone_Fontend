import { createRouter, createWebHistory } from "vue-router";

// TODO: Lone
import Main from "../views/Main.vue";
import MapTossagun from "../views/MapTossagun.vue";
import SignIn from "../views/SignIn.vue";
//Partner
import MainManageRoom from "../views/Partner/Partner/ManageRoom/MainManageRoom.vue";
import AddRoom from "../views/Partner/Partner/ManageRoom/AddRoom.vue";
import EditRoom from "../views/Partner/Partner/ManageRoom/EditRoom.vue";
import MainPromotion from "../views/Partner/Partner/Promotion/MainPromotion.vue";
//Admin
import MainManageRoomAdmin from "../views/Admin/ManageRoom/MainManageRoomAdmin.vue";
import MainSelectType from "../views/Admin/SelectType/MainSelectType.vue";
import MainManagePromotion from "../views/Admin/Promotion/MainManagePromotion.vue";
import AddPromotion from "../views/Admin/Promotion/AddPromotion.vue";
import EditPromotion from "../views/Admin/Promotion/EditPromotion.vue";



const routes = [
  { path: "/main", component: Main },
  { path: "/maptossagun", component: MapTossagun },
  { path: "/signin", component: SignIn },
  //Partner
  { path: "/mainmanageroom", component: MainManageRoom },
  { path: "/addroom", component: AddRoom },
  { path: "/editroom", component: EditRoom },
  { path: "/mainpromotion", component: MainPromotion },
  //Admin
  { path: "/mainmanageroomadmin", component: MainManageRoomAdmin },
  { path: "/mainselecttype", component: MainSelectType },
  { path: "/mainmanagepromotion", component: MainManagePromotion },
  { path: "/addpromotion", component: AddPromotion },
  { path: "/editpromotion/:id", component: EditPromotion },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
