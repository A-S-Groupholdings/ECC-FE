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
      path: "/dashboard/resources",
      name: "resources",
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
