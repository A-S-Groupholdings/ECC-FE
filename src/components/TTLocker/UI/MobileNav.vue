<template>
  <nav
    class="fixed top-0 left-0 right-0 h-16 bg-primary flex justify-between items-center px-4 md:hidden z-10"
  >
    <div class="logo">
      <img
        src="@/assets/logo.webp"
        alt="white-logo"
        class="w-[40px] h-[40px]"
      />
    </div>
    <div class="hamburger-menu">
      <button
        @click="toggleMenu"
        class="text-white focus:outline-none"
      >
        <i class="pi pi-bars text-2xl"></i>
      </button>
    </div>

    <!-- Mobile menu overlay -->
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-primary z-50 pt-20"
    >
      <div class="absolute top-4 right-4">
        <button
          @click="toggleMenu"
          class="text-white focus:outline-none"
        >
          <i class="pi pi-times text-2xl"></i>
        </button>
      </div>
      <div class="sub-nav overflow-y-auto h-[calc(100vh-8rem)]">
        <ul class="px-4 space-y-2">
          <router-link
            to="/ttlocker/home"
            @click="toggleMenu"
            class="block"
          >
            <li
              :class="[
                'w-full h-12 rounded-md flex items-center gap-3 pl-4',
                isActive('/ttlocker/home')
                  ? 'bg-secondary text-black'
                  : 'bg-primary hover:bg-secondary/20 text-white',
              ]"
            >
              <i class="pi pi-home"></i>
              <span>Dashboard</span>
            </li>
          </router-link>
        </ul>
      </div>

      <!-- Version Display at Bottom -->
      <div
        class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700"
      >
        <div
          class="flex items-center justify-center gap-2 text-gray-400 text-sm"
        >
          <i class="pi pi-info-circle"></i>
          <span>Version {{ appVersion }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { ref } from "vue";
  import "primeicons/primeicons.css";
  import { useRoute } from "vue-router";
  import packageJson from "../../../../package.json";

  const isMenuOpen = ref(false);
  const membershipExpanded = ref(false);
  const route = useRoute();
  const appVersion = ref(packageJson.version);

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
  }

  const isActive = (path) => {
    return route.path === path || route.path.startsWith(path);
  };
</script>
