<script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import DashNav from "@/components/TTLocker/UI/DashNav.vue";
  import MobileNav from "@/components/TTLocker/UI/MobileNav.vue";
  import Passage from "../../components/TTLocker/Passage.vue";

  const route = useRoute();
  const centerCode = computed(() => route.params.centerCode || "");
</script>

<template>
  <main class="min-h-screen relative">
    <DashNav />
    <MobileNav />
    <Passage :centerCode="centerCode" />
  </main>
</template>
