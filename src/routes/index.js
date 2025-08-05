import { createRouter, createWebHistory } from "vue-router";

// TODO: Lone
import Main from "../views/Main.vue";
import MapTossagun from "../views/MapTossagun.vue";
import SignIn from "../views/SignIn.vue";
import RegisterPartner from "../views/RegisterLogin/MainPartner.vue";
import LoginCompany from "../views/LoginCompany.vue";
import WaitForApprove from "../views/WaitForApprove.vue";
//Receipt
import Receipt from "../views/Receipt/Receipt.vue";
import ReceiptVat from "../views/Receipt/ReceiptVat.vue";
import Slip from "../views/Receipt/Slip.vue";
//Partner
import MainStay from "../views/Partner/Partner/Stay/MainStay.vue";
import DashboardPartner from "../views/Partner/Partner/DashboardPartner.vue";
import MainPromotion from "../views/Partner/Partner/Promotion/MainPromotion.vue";
import AddEmployee from "../views/Partner/Partner/ManageEmployee/AddEmployee.vue";
import EditEmployee from "../views/Partner/Partner/ManageEmployee/EditEmployee.vue";
import MainManageEmployee from "../views/Partner/Partner/ManageEmployee/MainManageEmployee.vue";
import Profile from "../views/Partner/Partner/Profile/Profile.vue";
import EditProfile from "../views/Partner/Partner/Profile/EditProfile.vue";
import ImportantData from "../views/Partner/Partner/AfterLogin/ImportantData.vue";
import ManageHotel from "../views/Partner/Partner/ManageHotel/ManageHotel.vue";
import EditManageHotel from "../views/Partner/Partner/ManageHotel/EditManageHotel.vue";
import MainReview from "../views/Partner/Partner/ManageReview/MainReview.vue";
import MainBookingSleepGun from "../views/Partner/Partner/BookingSleepGun/MainBookingSleepGun.vue";
import MainIncome from "../views/Partner/Partner/Income/MainIncome.vue";
import MainManagePOS from "../views/Partner/Partner/ManagePOS/MainManagePOS.vue";
import ManageTag from "../views/Partner/Partner/ManagePOS/ManageTag.vue";
//Admin
import DashboardAdmin from "../views/Admin/DashboardAdmin.vue";
import MainManageHotelAdmin from "../views/Admin/ManageHotel/MainManageHotelAdmin.vue";
import MainSelectType from "../views/Admin/SelectType/MainSelectType.vue";
import MainManagePromotion from "../views/Admin/Promotion/MainManagePromotion.vue";
import AddPromotion from "../views/Admin/Promotion/AddPromotion.vue";
import EditPromotion from "../views/Admin/Promotion/EditPromotion.vue";
import MainManageApprovePartner from "../views/Admin/ManageApprovePartner/MainManageApprovePartner.vue";
import DetailWaitForApprove from "../views/Admin/ManageApprovePartner/DetailWaitForApprove.vue";
import MainManageMember from "../views/Admin/ManageMember/MainManageMember.vue";
// Employee
import ProfileEmployee from "../views/Partner/Employee/ProfileEmployee.vue";
import ManageSleepGunWeb from "../views/Partner/Employee/ManageSleepGun/ManageSleepGunWeb.vue";
import CheckIn from "../views/Partner/Employee/CheckIn.vue";
import CheckOut from "../views/Partner/Employee/CheckOut.vue";
import MainIncomeEmployee from "../views/Partner/Employee/MainIncomeEmployee.vue";
import MainPOS from "../views/Partner/Employee/POS/MainPOS.vue";
//member
import MainMemberPage from "../views/Member/MainMemberPage.vue";
import DataMember from "../views/Member/Payment/DataMember.vue";
import DataProfileMember from "../views/Member/Profile/DataProfileMember.vue";
import HistoryByeMember from "../views/Member/Profile/HistoryByeMember.vue";
import PaymentMember from "../views/Member/Profile/PaymentMember.vue";
import ReviewMember from "../views/Member/Profile/ReviewMember.vue";
import CollectionMember from "../views/Member/Profile/CollectionMember.vue";
import DetailHotelMember from "../views/Member/DetailHotel/DetailHotelMember.vue";
import DetailHotelMemberDate from "../views/Member/DetailHotel/DetailHotelMemberDate.vue";
import SelectHotel from "../views/Member/SelectHotel/SelectHotel.vue";







const routes = [
  { path: "/", component: Main },
  { path: "/waitforapprove", component: WaitForApprove },
  { path: "/maptossagun", component: MapTossagun },
  { path: "/signin", component: SignIn },
  { path: "/mainpartner", component: RegisterPartner },
  { path: "/logincompany", component: LoginCompany },
  //Receipt
  { path: "/receipt", component: Receipt },
  { path: "/receiptvat", component: ReceiptVat },
  { path: "/slip", component: Slip },
  //Partner
  { path: "/mainstay", component: MainStay },
  { path: "/dashboardpartner", component: DashboardPartner },
  { path: "/mainpromotion", component: MainPromotion },
  { path: "/addemployee", component: AddEmployee },
  { path: "/editemployee/:id", component: EditEmployee },
  { path: "/mainmanageemployee", component: MainManageEmployee },
  { path: "/profile", component: Profile },
  { path: "/editprofile", component: EditProfile },
  { path: "/importantdata", component: ImportantData },
  { path: "/managehotel", component: ManageHotel },
  { path: "/editmanagehotel", component: EditManageHotel },
  { path: "/mainreview", component: MainReview },
  { path: "/mainbookingsleepgun", component: MainBookingSleepGun },
  { path: "/mainincome", component: MainIncome },
  { path: "/mainmanagepos", component: MainManagePOS },
  { path: "/managetag", component: ManageTag },
  //Admin
  { path: "/dashboardadmin", component: DashboardAdmin },
  { path: "/mainmanagehoteladmin", component: MainManageHotelAdmin },
  { path: "/mainselecttype", component: MainSelectType },
  { path: "/mainmanagepromotion", component: MainManagePromotion },
  { path: "/addpromotion", component: AddPromotion },
  { path: "/editpromotion/:id", component: EditPromotion },
  { path: "/mainmanageapprovepartner", component: MainManageApprovePartner },
  { path: "/detailwaitforapprove/:id", component: DetailWaitForApprove },
  { path: "/mainmanagemember", component: MainManageMember },
  //Employee
  { path: "/profileemployee", component: ProfileEmployee },
  { path: "/managesleepgunWeb", component: ManageSleepGunWeb },
  { path: "/checkin", component: CheckIn },
  { path: "/checkout", component: CheckOut },
  { path: "/mainincomeemployee", component: MainIncomeEmployee },
  { path: "/mainpos", component: MainPOS },
  //Member
  { path: "/mainmemberpage", component: MainMemberPage },
  { path: "/datamember", component: DataMember},

  { path: "/dataprofilemember", component: DataProfileMember},
  { path: "/historybyemember", component: HistoryByeMember},
  { path: "/paymentmember", component: PaymentMember},
  { path: "/reviewmember", component: ReviewMember},
  { path: "/collectionmember", component: CollectionMember},
  { path: "/detailhotelmember", component: DetailHotelMember},
  { path: "/detailhotelmemberdate", component: DetailHotelMemberDate},
  { path: "/selecthotel", component: SelectHotel},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
