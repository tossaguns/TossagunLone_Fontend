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
import Profile from "../views/Partner/Partner/Profile/Profile.vue";
import EditProfile from "../views/Partner/Partner/Profile/EditProfile.vue";
import ImportantData from "../views/Partner/Partner/AfterLogin/ImportantData.vue";
import DetailHotel from "../views/Partner/Partner/Profile/DetailHotel.vue";
import EditDetailHotel from "../views/Partner/Partner/Profile/EditDetailHotel.vue";
//Admin
import MainManageHotelAdmin from "../views/Admin/ManageHotel/MainManageHotelAdmin.vue";
import MainSelectType from "../views/Admin/SelectType/MainSelectType.vue";
import MainManagePromotion from "../views/Admin/Promotion/MainManagePromotion.vue";
import AddPromotion from "../views/Admin/Promotion/AddPromotion.vue";
import EditPromotion from "../views/Admin/Promotion/EditPromotion.vue";
import MainManageApprovePartner from "../views/Admin/ManageApprovePartner/MainManageApprovePartner.vue";
// Employee
import ProfileEmployee from "../views/Partner/Employee/ProfileEmployee.vue";
//member
import MainMemberPage from "../views/Member/MainMemberPage.vue";
import DataMember from "../views/Member/Payment/DataMember.vue";




const routes = [
  { path: "/", component: Main },
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
  { path: "/profile", component: Profile },
  { path: "/editprofile", component: EditProfile },
  { path: "/importantdata", component: ImportantData },
  { path: "/detailhotel", component: DetailHotel },
  { path: "/editdetailhotel", component: EditDetailHotel },
  //Admin
  { path: "/mainmanagehoteladmin", component: MainManageHotelAdmin },
  { path: "/mainselecttype", component: MainSelectType },
  { path: "/mainmanagepromotion", component: MainManagePromotion },
  { path: "/addpromotion", component: AddPromotion },
  { path: "/editpromotion/:id", component: EditPromotion },
  { path: "/mainmanageapprovepartner", component: MainManageApprovePartner },
  //Employee
  { path: "/profileemployee", component: ProfileEmployee },
  //Member
  { path: "/mainmemberpage", component: MainMemberPage },
  { path: "/datamember", component: DataMember},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
