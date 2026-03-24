<script setup>
  import DashNav from "@/components/Dashboard/UI/DashNav.vue";
  import MobileNav from "@/components/Dashboard/UI/MobileNav.vue";
  import Payment from "../../components/Dashboard/Payment.vue";
</script>

<template>
  <main class="min-h-screen relative">
    <DashNav />
    <MobileNav />
    <Payment />
  </main>
</template>
