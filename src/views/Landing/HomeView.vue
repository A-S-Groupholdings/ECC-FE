<script setup>
  import { ref } from "vue";
  import TopNav from "../../components/UI/TopNav.vue";
  import Nav from "../../components/UI/Nav.vue";
  import MobNav from "../../components/UI/MobNav.vue";
  import Hero from "../../components/Landing/Hero.vue";
  import MemberPortal from "../../components/Landing/MemberPortal.vue";
  import CoachPortal from "../../components/Landing/CoachPortal.vue";
  import Booking from "../../components/Landing/Booking.vue";
  import BookingCancel from "../../components/Landing/BookingCancelPortal.vue";
  import Footer from "../../components/Landing/Footer.vue";
</script>

<template>
  <main class="relative overflow-x-hidden overflow-y-scroll h-screen">
    <div class="sticky top-0 z-50">
      <TopNav />
      <Nav />
      <MobNav />
    </div>
    <Hero />
    <router-link to="/member/login">
      <MemberPortal />
    </router-link>
    <Booking />

    <router-link to="/booking/cancel">
      <BookingCancel />
    </router-link>
    <router-link to="/coach/login">
      <CoachPortal />
    </router-link>

    <Footer />
  </main>
</template>
