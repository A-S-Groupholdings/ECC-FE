<template>
  <nav
    class="absolute top-0 left-0 right-0 h-screen md:w-[10vw] lg:w-[20vw] bg-primary overflow-hidden hidden md:flex md:flex-col"
  >
    <div class="logo flex justify-center items-center mt-8">
      <img
        src="@/assets/logo.webp"
        alt="white-logo"
        class="lg:w-[60px] lg:h-[60px] md:w-[60px] md:h-[60px]"
      />
    </div>
    <div class="sub-nav mt-8 overflow-y-auto h-[calc(100vh-12rem)]">
      <ul class="space-y-4">
        <router-link
          to="/ttlocker/home"
          class="block"
        >
          <li
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/ttlocker/home')
                ? 'bg-secondary text-black'
                : 'bg-primary hover:bg-gradient-to-r hover:bg-secondary text-white ',
            ]"
          >
            <i class="pi pi-home"></i>
            <span class="md:hidden lg:block">Dashboard</span>
          </li>
        </router-link>
      </ul>
    </div>

    <!-- Version Display at Bottom -->
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
      <div class="flex items-center justify-center gap-2 text-gray-400 text-sm">
        <i class="pi pi-info-circle"></i>
        <span class="md:hidden lg:block">Version {{ appVersion }}</span>
        <span class="lg:hidden">v{{ appVersion }}</span>
      </div>
    </div>
  </nav>
</template>
<script setup>
  import { ref } from "vue";
  import "primeicons/primeicons.css";
  import { useRoute } from "vue-router";
  import packageJson from "../../../../package.json";

  const route = useRoute();
  const appVersion = ref(packageJson.version);
  const analyticsExpanded = ref(false);
  const notificationExpanded = ref(false);
  const membershipExpanded = ref(false);

  const isActive = (path) => {
    return route.path === path || route.path.startsWith(path);
  };

  const storedUser = localStorage.getItem("user");
  const userRole = ref("");

  // Parse and set role
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      userRole.value = parsedUser.role;
      console.log(userRole.value);
    } catch (error) {
      console.error("Invalid user JSON in localStorage", error);
    }
  }
</script>
