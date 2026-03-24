<script setup>
  import DashNav from "@/components/Dashboard/UI/DashNav.vue";
  import MobileNav from "@/components/Dashboard/UI/MobileNav.vue";
  import Customer from "../../components/Dashboard/Customer.vue";
</script>

<template>
  <main class="min-h-screen relative">
    <DashNav />
    <MobileNav />
    <Customer />
  </main>
</template>
