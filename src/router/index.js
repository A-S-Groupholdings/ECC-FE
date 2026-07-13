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
import MemberProfileView from "../views/Member/NewMemberProfile.vue";
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
import AvailableSlotsView from "../views/Dashboard/AvailableSlotsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Elite Cricket Centre - Booking"}

    },
     {
      path: "/dashboard",
      name: "login",
      component: LoginView,
      meta: {
        title: "Elite Cricket Centre - Login"}

    },
    {
      path: "/dashboard/home",
      name: "dashhome",
      component: DashboardView,
      meta: {
        title: "Elite Cricket Centre - Dashboard", requiresRole: "admin"}
      
    },
    {
      path: "/dashboard/livesession",
      name: "livesession",
      component: LiveSessionView,
      meta: {
        title: "Elite Cricket Centre - Live Session"}
    },
    {
      path: "/dashboard/appoinment",
      name: "appoinment",
      component: appoinment,
      meta: {
        title: "Elite Cricket Centre - Appointments", requiresRole: "admin"}
    },
    {
      path: "/dashboard/available",
      name: "availableslots",
      component: AvailableSlotsView,
      meta: {
        title: "Elite Cricket Centre - Available Slots", requiresRole: "admin"}
    },
     {
      path: "/dashboard/service",
      name: "service",
      component: ServiceView,
      meta: {
        title: "Elite Cricket Centre - Services", requiresRole: "admin"}
    },
    {
      path: "/dashboard/customer",
      name: "customer",
      component: CustomerView,
      meta: {
        title: "Elite Cricket Centre - Customers", requiresRole: "admin"}
    },
    {
      path: "/dashboard/calender",
      name: "calender",
      component: CalenderView,
      meta: {
        title: "Elite Cricket Centre - Calendar", requiresRole: "admin"}
    },
    {
      path: "/dashboard/payment",
      name: "payment",
      component: PaymentView,
      meta: {
        title: "Elite Cricket Centre - Payments", requiresRole: "admin"}
    },
    {
      path: "/dashboard/resource",
      name: "resource",
      component: ResourceView,
      meta: {
        title: "Elite Cricket Centre - Resources", requiresRole: "admin"}
    },
    {
      path: "/dashboard/category",
      name: "category",
      component: CategoryView,
      meta: {
        title: "Elite Cricket Centre - Categories", requiresRole: "admin"}
    },
    {
      path: "/dashboard/membership",
      name: "membership",
      component: MembershipView,
      meta: {
        title: "Elite Cricket Centre - Memberships", requiresRole: "admin"}
    },
    {
      path: "/dashboard/membership/create",
      name: "membershipcreate",
      component: MembershipCreateView,
      meta: {
        title: "Elite Cricket Centre - Create Membership", requiresRole: "admin"}
    },  
    {
      path: "/dashboard/subscription",
      name: "subscription",
      component: SubscriptionView,
      meta: {
        title: "Elite Cricket Centre - Subscriptions", requiresRole: "admin"}
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
        title: "Elite Cricket Centre - Cancel Booking"}
    },
    {
      path: "/booking/success",
      name: "bookingsuccess",
      component: BookingSuccess,
      meta: {
        title: "Elite Cricket Centre - Success"}
    },
    {
      path: "/member/payment",
      name: "memberpayment",
      component: MemberPayment,
      meta: {
        title: "Elite Cricket Centre - Payment", requiresMember: true}
    },
    {
      path: "/ecc/member/profile",
      name: "memberprofile",
      component: MemberProfileView,
      meta: {
        title: "Elite Cricket Centre - Profile", requiresMember: true}
    },
    {
      path: "/admin/otp",
      name: "adminotp",
      component: AdminOtp,
      meta: {
        title: "Elite Cricket Centre - Admin OTP"}
    },
    {
      path: "/member/otp",
      name: "memberotp",
      component: MemberOtp,
      meta: {
        title: "Elite Cricket Centre - Member OTP"}
    },
    {
      path: "/coach/otp",
      name: "coachotp",
      component: CoachOtp,
      meta: {
        title: "Elite Cricket Centre - Coach OTP"}
    },
     {
      path: "/member/register",
      name: "memberregister",
      component: MemberRegisterView,
      meta: {
        title: "Elite Cricket Centre - Register"}
    },
     {
      path: "/member/membership",
      name: "memberships",
      component: MembershipsView,
      meta: {
        title: "Elite Cricket Centre - Memberships"}
    },
    {
      path: "/member/booking",
      name: "memberbooking",
      component: MemberBookingView,
      meta: {
        title: "Elite Cricket Centre - Bookings", requiresMember: true}
    },
    {
      path: "/member/login",
      name: "memberlogin",
      component: MemberLoginView,
      meta: {
        title: "Elite Cricket Centre - Login"}
    },
    {
      path: "/coach/login",
      name: "coachlogin",
      component: CoachLoginView,
      meta: {
        title: "Elite Cricket Centre - Login"}
    },
    {
      path: "/coach/profile",
      name: "coachprofile",
      component: CoachProfileView,
      meta: {
        title: "Elite Cricket Centre - Profile", requiresCategory: "Coach"}
    },
    {
      path: "/member/payment",
      name: "memberpayment",
      component: MemberPaymentView,
      meta: {
        title: "Elite Cricket Centre - Payment", requiresMember: true}
    },
    {
      path: "/coach/booking",
      name: "coachbooking",
      component: CoachBookingView,
      meta: {
        title: "Elite Cricket Centre - Bookings", requiresCategory: "Coach"}
    },
    {
      path: "/live-on-ecc",
      name: "livesession",
      component: PublicLiveSessionView,
      meta: {
        title: "Elite Cricket Centre - Live Session"}
    },
    // {
    //   path: "/ecc/membership/new",
    //   name: "publicmembership",
    //   component: PublicMembershipView,
    //   meta: {
    //     title: "ECC"}
    // },
    {
      path: "/membership/public",
      name: "membershippublic",
      component: PublicMembershipView,
      meta: {
        title: "Elite Cricket Centre - Membership"}
    },
    {
      path: "/membership/success",
      name: "membershipsuccess",
      component: MembershipSuccessView,
      meta: {
        title: "Elite Cricket Centre - Membership Success"}
    },
    {
      path: "/membership/cancel",
      name: "membershipcancel",
      component: MembershipCancelView,
      meta: {
        title: "Elite Cricket Centre - Membership Cancelled"}
    },
    {
      path: "/dashboard/membership/payment",
      name: "membershipcancel",
      component: MembershipPaymentView,
      meta: {
        title: "Elite Cricket Centre - Membership Payment"}
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


router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title || "ECC";

  // Get user from localStorage
  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored) user = JSON.parse(stored);
  } catch (e) {
    user = null;
  }

  const userRole = user?.role || null;
  const userCategory = user?.category?.categoryName || null;

  // Admin-only routes
  if (to.meta.requiresRole === "admin") {
    if (userRole !== "admin") {
      return next("/dashboard");
    }
  }

  // If admin is already logged in and visits /dashboard (login page), redirect to home
  if (to.path === "/dashboard" && userRole === "admin") {
    return next("/dashboard/home");
  }

  // Coach-only routes
  if (to.meta.requiresCategory === "Coach") {
    if (userRole !== "user" || userCategory !== "Coach") {
      return next("/coach/login");
    }
  }

  // If coach is already logged in and visits /coach/login, redirect to profile
  if (to.path === "/coach/login" && userRole === "user" && userCategory === "Coach") {
    return next("/coach/profile");
  }

  // Member-only routes (user role + NOT Coach category)
  if (to.meta.requiresMember) {
    if (userRole !== "user" || userCategory === "Coach") {
      return next("/member/login");
    }
  }

  // If member is already logged in and visits /member/login, redirect to profile
  if (to.path === "/member/login" && userRole === "user" && userCategory !== "Coach") {
    return next("/ecc/profile");
  }

  next();
});



export default router;
