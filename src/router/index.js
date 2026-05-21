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
import BookingSuccess from "../views/Landing/BookingSuccessView.vue";
import MemberProfileView from "../views/Member/MemberProfileView.vue";
import AdminOtp from "../views/Dashboard/AdminOtp.vue";
import MemberOtp from "../views/Member/MemberOTP.vue";
import MemberRegisterView from "../views/Member/MemberRegisterView.vue";
import MembershipsView from "../views/Member/Memberships.vue";
import MemberBookingView from "../views/Member/MemberBookingView.vue";
import MemberLoginView from "../views/Member/MemberLogin.vue";
import CoachLoginView from "../views/Coach/CoachLoginView.vue";
import CoachProfileView from "../views/Coach/CoachProfileView.vue";
import CoachOtp from "../views/Coach/CoachOTP.vue";
import MemberPaymentView from "../views/Member/PaymentView.vue";
import CoachBookingView from "../views/Coach/CoachBookingView.vue";
import PublicLiveSessionView from "../views/LiveSession.vue";
import PublicMembershipView from "../views/Landing/MembershipView.vue";
import MembershipSuccessView from "../views/Landing/MembershipSuccessView.vue";
import MembershipCancelView from "../views/Landing/MembershipCancelView.vue";
import MembershipPaymentView from "../views/Dashboard/MembershipPaymentView.vue";

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
    // {
    //   path: "/membership/register",
    //   name: "membershipregister",
    //   component: MembershipRegister,
    //   meta: {
    //     title: "ECC"}
    // },
    {
      path: "/booking/cancel",
      name: "bookingcancel",
      component: BookingCancel,
      meta: {
        title: "ECC"}
    },
    {
      path: "/booking/success",
      name: "bookingsuccess",
      component: BookingSuccess,
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
      path: "/member/otp",
      name: "memberotp",
      component: MemberOtp,
      meta: {
        title: "ECC"}
    },
    {
      path: "/coach/otp",
      name: "coachotp",
      component: CoachOtp,
      meta: {
        title: "ECC"}
    },
     {
      path: "/member/register",
      name: "memberregister",
      component: MemberRegisterView,
      meta: {
        title: "ECC"}
    },
     {
      path: "/member/membership",
      name: "memberships",
      component: MembershipsView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/member/booking",
      name: "memberbooking",
      component: MemberBookingView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/member/login",
      name: "memberlogin",
      component: MemberLoginView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/coach/login",
      name: "coachlogin",
      component: CoachLoginView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/coach/profile",
      name: "coachprofile",
      component: CoachProfileView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/member/payment",
      name: "memberpayment",
      component: MemberPaymentView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/coach/booking",
      name: "coachbooking",
      component: CoachBookingView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/live-on-ecc",
      name: "livesession",
      component: PublicLiveSessionView,
      meta: {
        title: "ECC"}
    },
    {
      path: "/ecc/membership",
      name: "publicmembership",
      component: MembershipRegister,
      meta: {
        title: "ECC"}
    },
    {
      path: "/membership/success",
      name: "membershipsuccess",
      component: MembershipSuccessView,
      meta: {
        title: "Membership Payment Success"}
    },
    {
      path: "/membership/cancel",
      name: "membershipcancel",
      component: MembershipCancelView,
      meta: {
        title: "Membership Payment Cancelled"}
    },
    {
      path: "/dashboard/membership/payment",
      name: "membershipcancel",
      component: MembershipPaymentView,
      meta: {
        title: "Membership Payment View"}
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
