<script setup>
  import { ref } from "vue";
  import TopNav from "../../components/UI/TopNav.vue";
  import Nav from "../../components/UI/Nav.vue";
  import MobNav from "../../components/UI/MobNav.vue";
  import MemberBooking from "../../components/Member/MemberBooking.vue";
  import Footer from "../../components/Landing/Footer.vue";
</script>

<template>
  <main class="relative overflow-x-hidden overflow-y-scroll h-screen">
    <div class="sticky top-0 z-50">
      <TopNav />
      <Nav />
      <MobNav />
    </div>
    <MemberBooking />
    <Footer />
  </main>
</template>
