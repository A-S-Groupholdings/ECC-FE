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
          to="/dashboard/home"
          class="block"
        >
          <li
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/dashboard/home')
                ? 'bg-secondary text-black'
                : 'bg-primary hover:bg-gradient-to-r hover:bg-secondary text-white ',
            ]"
          >
            <i class="pi pi-home"></i>
            <span class="md:hidden lg:block">Dashboard</span>
          </li>
        </router-link>
        <router-link
          to="/dashboard/livesession"
          class="block"
        >
          <li
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/dashboard/livesession')
                ? 'bg-secondary text-black'
                : 'bg-primary hover:bg-gradient-to-r hover:bg-secondary text-white ',
            ]"
          >
            <i class="pi pi-chart-line"></i>
            <span class="md:hidden lg:block">Live Session</span>
          </li>
        </router-link>
        <router-link
          to="/dashboard/appoinment"
          class="block"
        >
          <li
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/dashboard/appoinment')
                ? 'bg-secondary text-black'
                : 'bg-primary hover:bg-gradient-to-r hover:bg-secondary text-white ',
            ]"
          >
            <i class="pi pi-calendar-plus"></i>
            <span class="md:hidden lg:block">Appointments</span>
          </li>
        </router-link>
        <router-link
          to="/dashboard/resources"
          class="block"
        >
          <li
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/dashboard/resources')
                ? 'bg-secondary text-black'
                : 'bg-primary hover:bg-gradient-to-r hover:bg-secondary text-white ',
            ]"
          >
            <i class="pi pi-bullseye"></i>
            <span class="md:hidden lg:block">Resources</span>
          </li>
        </router-link>
        <router-link
          to="/dashboard/customer"
          class="block"
        >
          <li
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/dashboard/customer')
                ? 'bg-secondary text-black'
                : 'bg-primary hover:bg-gradient-to-r hover:bg-secondary text-white ',
            ]"
          >
            <i class="pi pi-users"></i>
            <span class="md:hidden lg:block">Customer</span>
          </li>
        </router-link>
        <router-link
          to="/dashboard/calender"
          class="block"
        >
          <li
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/dashboard/calender')
                ? 'bg-secondary text-black'
                : 'bg-primary hover:bg-gradient-to-r hover:bg-secondary text-white ',
            ]"
          >
            <i class="pi pi-calendar"></i>
            <span class="md:hidden lg:block">Calender</span>
          </li>
        </router-link>
        <router-link
          to="/dashboard/payment"
          class="block"
        >
          <li
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/dashboard/payment')
                ? 'bg-secondary text-black'
                : 'bg-primary hover:bg-gradient-to-r hover:bg-secondary text-white ',
            ]"
          >
            <i class="pi pi-dollar"></i>
            <span class="md:hidden lg:block">Payment</span>
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
