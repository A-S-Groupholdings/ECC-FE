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
          to="/live-on-ecc"
          class="block"
        >
          <li
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/live-on-ecc')
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
          to="/dashboard/available"
          class="block"
        >
          <li
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/dashboard/available')
                ? 'bg-secondary text-black'
                : 'bg-primary hover:bg-gradient-to-r hover:bg-secondary text-white ',
            ]"
          >
            <i class="pi pi-calendar-plus"></i>
            <span class="md:hidden lg:block">Available Slots</span>
          </li>
        </router-link>
        <router-link
          to="/dashboard/resource"
          class="block"
        >
          <li
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/dashboard/resource')
                ? 'bg-secondary text-black'
                : 'bg-primary hover:bg-gradient-to-r hover:bg-secondary text-white ',
            ]"
          >
            <i class="pi pi-palette"></i>
            <span class="md:hidden lg:block">Resource</span>
          </li>
        </router-link>
        <router-link
          to="/dashboard/category"
          class="block"
        >
          <li
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/dashboard/category')
                ? 'bg-secondary text-black'
                : 'bg-primary hover:bg-gradient-to-r hover:bg-secondary text-white ',
            ]"
          >
            <i class="pi pi-sitemap"></i>
            <span class="md:hidden lg:block">Category</span>
          </li>
        </router-link>
        <router-link
          to="/dashboard/service"
          class="block"
        >
          <li
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/dashboard/service')
                ? 'bg-secondary text-black'
                : 'bg-primary hover:bg-gradient-to-r hover:bg-secondary text-white ',
            ]"
          >
            <i class="pi pi-briefcase"></i>
            <span class="md:hidden lg:block">Services</span>
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
        <!-- Membership with Sub-menu -->
        <div class="block">
          <li
            @click="membershipExpanded = !membershipExpanded"
            :class="[
              'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
              isActive('/dashboard/membership') ||
              isActive('/dashboard/subscription') ||
              isActive('/dashboard/memberview')
                ? 'bg-secondary text-black'
                : 'bg-primary hover:bg-gradient-to-r hover:bg-secondary text-white ',
            ]"
          >
            <i class="pi pi-user-plus"></i>
            <span class="md:hidden lg:block">Membership</span>
            <i
              class="pi ml-auto mr-2 text-xs transition-transform duration-200"
              :class="[
                membershipExpanded ? 'pi-chevron-up' : 'pi-chevron-down',
                'md:hidden lg:block',
              ]"
            ></i>
          </li>
          <!-- Sub-menu -->
          <div
            v-show="
              membershipExpanded ||
              isActive('/dashboard/membership') ||
              isActive('/dashboard/subscription') ||
              isActive('/member/payment')
            "
            class="space-y-1 mt-1"
          >
            <router-link
              to="/dashboard/membership"
              class="block"
            >
              <li
                :class="[
                  'w-full h-8 rounded-l-md lg:ml-[70px] md:ml-[30px] flex items-center gap-2 pl-2 cursor-pointer text-sm',
                  isActive('/dashboard/membership')
                    ? 'bg-secondary/70 text-black'
                    : 'bg-primary/80 hover:bg-secondary/50 text-white/90',
                ]"
              >
                <i class="pi pi-cog text-xs"></i>
                <span class="md:hidden lg:block">Settings</span>
              </li>
            </router-link>
            <router-link
              to="/dashboard/subscription"
              class="block"
            >
              <li
                :class="[
                  'w-full h-8 rounded-l-md lg:ml-[70px] md:ml-[30px] flex items-center gap-2 pl-2 cursor-pointer text-sm',
                  isActive('/dashboard/subscription')
                    ? 'bg-secondary/70 text-black'
                    : 'bg-primary/80 hover:bg-secondary/50 text-white/90',
                ]"
              >
                <i class="pi pi-sync text-xs"></i>
                <span class="md:hidden lg:block">Subscription</span>
              </li>
            </router-link>
            <router-link
              to="/dashboard/membership/payment"
              class="block"
            >
              <li
                :class="[
                  'w-full h-8 rounded-l-md lg:ml-[70px] md:ml-[30px] flex items-center gap-2 pl-2 cursor-pointer text-sm',
                  isActive('/dashboard/membership/payment')
                    ? 'bg-secondary/70 text-black'
                    : 'bg-primary/80 hover:bg-secondary/50 text-white/90',
                ]"
              >
                <i class="pi pi-dollar text-xs"></i>
                <span class="md:hidden lg:block">Payments</span>
              </li>
            </router-link>
          </div>
        </div>
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
