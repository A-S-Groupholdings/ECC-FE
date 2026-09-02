<script setup>
  import DashNav from "@/components/Dashboard/UI/DashNav.vue";
  import MobileNav from "@/components/Dashboard/UI/MobileNav.vue";
  import UserHistory from "../../components/Dashboard/UserHistory.vue";
</script>

<template>
  <main class="min-h-screen relative">
    <DashNav />
    <MobileNav />
    <UserHistory />
  </main>
</template>
