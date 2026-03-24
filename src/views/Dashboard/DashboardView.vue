<script setup>
  import DashNav from "@/components/Dashboard/UI/DashNav.vue";
  import MobileNav from "@/components/Dashboard/UI/MobileNav.vue";
  import Dashboard from "../../components/Dashboard/Dashboard.vue";
</script>

<template>
  <main class="min-h-screen relative">
    <DashNav />
    <MobileNav />
    <Dashboard />
  </main>
</template>
