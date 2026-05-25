<script setup>
  import DashNav from "@/components/Dashboard/UI/DashNav.vue";
  import MobileNav from "@/components/Dashboard/UI/MobileNav.vue";
  import Available from "../../components/Dashboard/Available.vue";
</script>

<template>
  <main class="min-h-screen relative">
    <DashNav />
    <MobileNav />
    <Available />
  </main>
</template>
