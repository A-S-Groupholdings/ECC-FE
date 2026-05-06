<script setup>
  import { ref } from "vue";
  import TopNav from "../../components/UI/TopNav.vue";
  import Nav from "../../components/UI/Nav.vue";
  import MobNav from "../../components/UI/MobNav.vue";
  import Profile from "../../components/Coach/Profile.vue";
  import Footer from "../../components/Landing/Footer.vue";
</script>

<template>
  <main class="relative overflow-x-hidden overflow-y-scroll h-screen">
    <div class="sticky top-0 z-50">
      <TopNav />
      <Nav />
      <MobNav />
    </div>
    <Profile />
    <Footer />
  </main>
</template>
