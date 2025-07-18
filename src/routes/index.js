import { createRouter, createWebHistory } from "vue-router";

// TODO: Lone
import Main from "../views/Main.vue";
import MapTossagun from "../views/MapTossagun.vue";
import SignIn from "../views/SignIn.vue";
import RegisterPartner from "../views/RegisterLogin/MainPartner.vue";
import LoginCompany from "../views/LoginCompany.vue";
//Partner
import MainManageRoom from "../views/Partner/Partner/ManageRoom/MainManageRoom.vue";
import AddRoom from "../views/Partner/Partner/ManageRoom/AddRoom.vue";
import EditRoom from "../views/Partner/Partner/ManageRoom/EditRoom.vue";
import MainPromotion from "../views/Partner/Partner/Promotion/MainPromotion.vue";
import AddEmployee from "../views/Partner/Partner/ManageEmployee/AddEmployee.vue";
import EditEmployee from "../views/Partner/Partner/ManageEmployee/EditEmployee.vue";
import MainManageEmployee from "../views/Partner/Partner/ManageEmployee/MainManageEmployee.vue";
import MainProfile from "../views/Partner/Partner/Profile/MainProfile.vue";
import AddProfile from "../views/Partner/Partner/Profile/AddProfile.vue";
import EditProfile from "../views/Partner/Partner/Profile/EditProfile.vue";
import ImportantData from "../views/Partner/Partner/AfterLogin/ImportantData.vue";
import AddDetailHotel from "../views/Partner/Partner/Profile/AddDetailHotel.vue";
import EditDetailHotel from "../views/Partner/Partner/Profile/EditDetailHotel.vue";
//Admin
import MainManageHotelAdmin from "../views/Admin/ManageHotel/MainManageHotelAdmin.vue";
import MainSelectType from "../views/Admin/SelectType/MainSelectType.vue";
import MainManagePromotion from "../views/Admin/Promotion/MainManagePromotion.vue";
import AddPromotion from "../views/Admin/Promotion/AddPromotion.vue";
import EditPromotion from "../views/Admin/Promotion/EditPromotion.vue";
import MainManageApprovePartner from "../views/Admin/ManageApprovePartner/MainManageApprovePartner.vue";




const routes = [
  { path: "/main", component: Main },
  { path: "/maptossagun", component: MapTossagun },
  { path: "/signin", component: SignIn },
  { path: "/mainpartner", component: RegisterPartner },
  { path: "/logincompany", component: LoginCompany },
  //Partner
  { path: "/mainmanageroom", component: MainManageRoom },
  { path: "/addroom", component: AddRoom },
  { path: "/editroom", component: EditRoom },
  { path: "/mainpromotion", component: MainPromotion },
  { path: "/addemployee", component: AddEmployee },
  { path: "/editemployee/:id", component: EditEmployee },
  { path: "/mainmanageemployee", component: MainManageEmployee },
  { path: "/mainprofile", component: MainProfile },
  { path: "/addprofile", component: AddProfile },
  { path: "/editprofile", component: EditProfile },
  { path: "/importantdata", component: ImportantData },
  { path: "/adddetailhotel", component: AddDetailHotel },
  { path: "/editdetailhotel", component: EditDetailHotel },
  //Admin
  { path: "/mainmanagehoteladmin", component: MainManageHotelAdmin },
  { path: "/mainselecttype", component: MainSelectType },
  { path: "/mainmanagepromotion", component: MainManagePromotion },
  { path: "/addpromotion", component: AddPromotion },
  { path: "/editpromotion/:id", component: EditPromotion },
  { path: "/mainmanageapprovepartner", component: MainManageApprovePartner },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
