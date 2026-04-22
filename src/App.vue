<script setup>
  import { RouterLink, RouterView } from "vue-router";
  import { onMounted } from "vue";
  import { useAuthStore } from "@/stores/auth.js";

  const authStore = useAuthStore();

  onMounted(async () => {
    // Try to restore session if accessToken is missing but refreshToken exists
    await authStore.restoreSession();
  });
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
