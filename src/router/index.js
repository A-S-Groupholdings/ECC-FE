import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import HomeView from "../views/Landing/HomeView.vue";
import LoginView from "../views/Dashboard/LoginView.vue";
import DashboardView from "../views/Dashboard/DashboardView.vue";
import LiveSessionView from "../views/Dashboard/LiveSessionView.vue";
import appoinment from "../views/Dashboard/AppointmentView.vue";
import ServiceView from "../views/Dashboard/ServiceView.vue";
import CustomerView from "../views/Dashboard/CustomerView.vue";
import CalenderView from "../views/Dashboard/CalenderView.vue";
import PaymentView from "../views/Dashboard/PaymentView.vue";
import ResourceView from "../views/Dashboard/ResourceView.vue";
import CategoryView from "../views/Dashboard/CategoryView.vue";
import MembershipView from "../views/Dashboard/MembershipView.vue";
import MembershipCreateView from "../views/Dashboard/MembershipCreateView.vue";
import SubscriptionView from "../views/Dashboard/SubscriptionView.vue";
import MembershipRegister from "../views/Landing/MembershipRegister.vue";
import MemberPayment from "../views/Dashboard/MemberPaymentView.vue";
import BookingCancel from "../views/Landing/BookingCancelView.vue";
import MemberProfileView from "../views/Member/MemberProfileView.vue";
import AdminOtp from "../views/Dashboard/AdminOtp.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "ECC"}

    },
     {
      path: "/dashboard",
      name: "login",
      component: LoginView,
      meta: {
        title: "ECC"}

    },
    {
      path: "/dashboard/home",
      name: "dashhome",
      component: DashboardView,
      meta: {
        title: "ECC"}

    },
    {
      path: "/dashboard/livesession",
      name: "livesession",
      component: LiveSessionView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/dashboard/appoinment",
      name: "appoinment",
      component: appoinment,
      meta: {
        title: "ECC"}
    },
     {
      path: "/dashboard/service",
      name: "service",
      component: ServiceView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/dashboard/customer",
      name: "customer",
      component: CustomerView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/dashboard/calender",
      name: "calender",
      component: CalenderView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/dashboard/payment",
      name: "payment",
      component: PaymentView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/dashboard/resource",
      name: "resource",
      component: ResourceView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/dashboard/category",
      name: "category",
      component: CategoryView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/dashboard/membership",
      name: "membership",
      component: MembershipView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/dashboard/membership/create",
      name: "membershipcreate",
      component: MembershipCreateView,
      meta: {
        title: "ECC"}
    },  
    {
      path: "/dashboard/subscription",
      name: "subscription",
      component: SubscriptionView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/membership/register",
      name: "membershipregister",
      component: MembershipRegister,
      meta: {
        title: "ECC"}
    },
    {
      path: "/booking/cancel",
      name: "bookingcancel",
      component: BookingCancel,
      meta: {
        title: "ECC"}
    },
    {
      path: "/member/payment",
      name: "memberpayment",
      component: MemberPayment,
      meta: {
        title: "ECC"}
    },
    {
      path: "/ecc/profile",
      name: "memberprofile",
      component: MemberProfileView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/admin/otp",
      name: "adminotp",
      component: AdminOtp,
      meta: {
        title: "ECC"}
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/',
      // component: NotFoundView,
      // meta: {
      //   title: '404 - Not Found'
      // }
    }


  ],
    scrollBehavior() {
    return { top: 0 };
  },
});




export default router;
