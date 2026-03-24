<script setup>
  import { ref } from "vue";
  import TopNav from "../../components/UI/TopNav.vue";
  import Nav from "../../components/UI/Nav.vue";
  import MobNav from "../../components/UI/MobNav.vue";
  import Hero from "../../components/Landing/Hero.vue";
  import MemberPortal from "../../components/Landing/MemberPortal.vue";
  import Booking from "../../components/Landing/Booking.vue";
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
    <MemberPortal />
    <Booking />
    <Footer />
  </main>
</template>
