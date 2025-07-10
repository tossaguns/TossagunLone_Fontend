import { createRouter, createWebHistory } from "vue-router";

// TODO: Lone
import Main from "../views/Main.vue";
import ContactMassage from "../views/ContactMassage.vue";
import MapTossagun from "../views/MapTossagun.vue";
import NewHouse from "../views/house/NewHouse.vue";
import HouseIsMoney from "../views/house/HouseIsMoney.vue";
import House2 from "../views/house/House2.vue";
import CreditHasIncreased from "../views/house/CreditHasIncreased.vue";
import ForHouse from "../views/house/ForHouse.vue";
import NewCar from "../views/Car/NewCar.vue";
import CarIsMoney from "../views/Car/CarIsMoney.vue";
import Refinance from "../views/Car/Refinance.vue";
import UsedCar from "../views/Car/UsedCar.vue";
import SignIn from "../views/SignIn.vue";
import MainHouse from "../views/house/MainHouse.vue";

import Project from "../views/tt/project.vue";
import mainpage from "../views/tt/mainpage.vue";
import mainminerex from "../views/minerex/mainminerex.vue";
import mainminerex1 from "../views/minerex/mainminerex1.vue";
import mainminerex2 from "../views/minerex/mainminerex2.vue";

const routes = [
  { path: "/main", component: Main },
  { path: "/contactmasage", component: ContactMassage },
  { path: "/maptossagun", component: MapTossagun },
  { path: "/newhouse", component: NewHouse },
  { path: "/houseismoney", component: HouseIsMoney },
  { path: "/house2", component: House2 },
  { path: "/credithasincreased", component: CreditHasIncreased },
  { path: "/forhouse", component: ForHouse },
  { path: "/newcar", component: NewCar },
  { path: "/carismoney", component: CarIsMoney },
  { path: "/refinance", component: Refinance },
  { path: "/usedcar", component: UsedCar },
  { path: "/signin", component: SignIn },
  { path: "/mainhouse", component: MainHouse },

  { path: "/project", component: Project },
  { path: "/mainpage", component: mainpage },
  { path: "/mainminerex", component: mainminerex },
  { path: "/mainminerex1", component: mainminerex1 },
  { path: "/mainminerex2", component: mainminerex2 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
