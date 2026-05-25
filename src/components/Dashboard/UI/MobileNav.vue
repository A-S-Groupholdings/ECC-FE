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
            to="/dashboard/home"
            @click="toggleMenu"
            class="block"
          >
            <li
              :class="[
                'w-full h-12 rounded-md flex items-center gap-3 pl-4',
                isActive('/dashboard/home')
                  ? 'bg-secondary text-black'
                  : 'bg-primary hover:bg-secondary/20 text-white',
              ]"
            >
              <i class="pi pi-home"></i>
              <span>Dashboard</span>
            </li>
          </router-link>
          <router-link
            to="/live-on-ecc"
            @click="toggleMenu"
            class="block"
          >
            <li
              :class="[
                'w-full h-12 rounded-md flex items-center gap-3 pl-4',
                isActive('/live-on-ecc')
                  ? 'bg-secondary text-black'
                  : 'bg-primary hover:bg-secondary/20 text-white',
              ]"
            >
              <i class="pi pi-chart-line"></i>
              <span>Live Session</span>
            </li>
          </router-link>
          <router-link
            to="/dashboard/appoinment"
            @click="toggleMenu"
            class="block"
          >
            <li
              :class="[
                'w-full h-12 rounded-md flex items-center gap-3 pl-4',
                isActive('/dashboard/appoinment')
                  ? 'bg-secondary text-black'
                  : 'bg-primary hover:bg-secondary/20 text-white',
              ]"
            >
              <i class="pi pi-calendar-plus"></i>
              <span>Appointments</span>
            </li>
          </router-link>
          <router-link
            to="/dashboard/available"
            @click="toggleMenu"
            class="block"
          >
            <li
              :class="[
                'w-full h-12 rounded-md flex items-center gap-3 pl-4',
                isActive('/dashboard/available')
                  ? 'bg-secondary text-black'
                  : 'bg-primary hover:bg-secondary/20 text-white',
              ]"
            >
              <i class="pi pi-calendar-plus"></i>
              <span>Available Slots</span>
            </li>
          </router-link>
          <router-link
            to="/dashboard/resource"
            @click="toggleMenu"
            class="block"
          >
            <li
              :class="[
                'w-full h-12 rounded-md flex items-center gap-3 pl-4',
                isActive('/dashboard/resource')
                  ? 'bg-secondary text-black'
                  : 'bg-primary hover:bg-secondary/20 text-white',
              ]"
            >
              <i class="pi pi-palette"></i>
              <span>Resource</span>
            </li>
          </router-link>
          <router-link
            to="/dashboard/category"
            @click="toggleMenu"
            class="block"
          >
            <li
              :class="[
                'w-full h-12 rounded-md flex items-center gap-3 pl-4',
                isActive('/dashboard/category')
                  ? 'bg-secondary text-black'
                  : 'bg-primary hover:bg-secondary/20 text-white',
              ]"
            >
              <i class="pi pi-sitemap"></i>
              <span>Category</span>
            </li>
          </router-link>
          <router-link
            to="/dashboard/service"
            @click="toggleMenu"
            class="block"
          >
            <li
              :class="[
                'w-full h-12 rounded-md flex items-center gap-3 pl-4',
                isActive('/dashboard/service')
                  ? 'bg-secondary text-black'
                  : 'bg-primary hover:bg-secondary/20 text-white',
              ]"
            >
              <i class="pi pi-briefcase"></i>
              <span>Services</span>
            </li>
          </router-link>
          <router-link
            to="/dashboard/customer"
            @click="toggleMenu"
            class="block"
          >
            <li
              :class="[
                'w-full h-12 rounded-md flex items-center gap-3 pl-4',
                isActive('/dashboard/customer')
                  ? 'bg-secondary text-black'
                  : 'bg-primary hover:bg-secondary/20 text-white',
              ]"
            >
              <i class="pi pi-users"></i>
              <span>Customer</span>
            </li>
          </router-link>
          <router-link
            to="/dashboard/calender"
            @click="toggleMenu"
            class="block"
          >
            <li
              :class="[
                'w-full h-12 rounded-md flex items-center gap-3 pl-4',
                isActive('/dashboard/calender')
                  ? 'bg-secondary text-black'
                  : 'bg-primary hover:bg-secondary/20 text-white',
              ]"
            >
              <i class="pi pi-calendar"></i>
              <span>Calender</span>
            </li>
          </router-link>
          <router-link
            to="/dashboard/payment"
            @click="toggleMenu"
            class="block"
          >
            <li
              :class="[
                'w-full h-12 rounded-md flex items-center gap-3 pl-4',
                isActive('/dashboard/payment')
                  ? 'bg-secondary text-black'
                  : 'bg-primary hover:bg-secondary/20 text-white',
              ]"
            >
              <i class="pi pi-dollar"></i>
              <span>Payment</span>
            </li>
          </router-link>

          <!-- Membership with Sub-menu -->
          <div class="block">
            <li
              @click="membershipExpanded = !membershipExpanded"
              :class="[
                'w-full h-12 rounded-md flex items-center gap-3 pl-4 cursor-pointer',
                isActive('/dashboard/membership') ||
                isActive('/dashboard/subscription') ||
                isActive('/member/payment')
                  ? 'bg-secondary text-black'
                  : 'bg-primary hover:bg-secondary/20 text-white',
              ]"
            >
              <i class="pi pi-user-plus"></i>
              <span>Membership</span>
              <i
                class="pi ml-auto mr-4 transition-transform duration-200"
                :class="
                  membershipExpanded ? 'pi-chevron-up' : 'pi-chevron-down'
                "
              ></i>
            </li>
            <!-- Sub-menu -->
            <div
              v-show="membershipExpanded"
              class="space-y-1 mt-1 pl-4"
            >
              <router-link
                to="/dashboard/membership"
                @click="toggleMenu"
                class="block"
              >
                <li
                  :class="[
                    'w-full h-10 rounded-md flex items-center gap-3 pl-4 text-sm',
                    isActive('/dashboard/membership')
                      ? 'bg-secondary/70 text-black'
                      : 'bg-primary/50 hover:bg-secondary/30 text-white/90',
                  ]"
                >
                  <i class="pi pi-cog text-xs"></i>
                  <span>Settings</span>
                </li>
              </router-link>
              <router-link
                to="/dashboard/subscription"
                @click="toggleMenu"
                class="block"
              >
                <li
                  :class="[
                    'w-full h-10 rounded-md flex items-center gap-3 pl-4 text-sm',
                    isActive('/dashboard/subscription')
                      ? 'bg-secondary/70 text-black'
                      : 'bg-primary/50 hover:bg-secondary/30 text-white/90',
                  ]"
                >
                  <i class="pi pi-sync text-xs"></i>
                  <span>Subscription</span>
                </li>
              </router-link>
              <router-link
                to="/member/payment"
                @click="toggleMenu"
                class="block"
              >
                <li
                  :class="[
                    'w-full h-10 rounded-md flex items-center gap-3 pl-4 text-sm',
                    isActive('/member/payment')
                      ? 'bg-secondary/70 text-black'
                      : 'bg-primary/50 hover:bg-secondary/30 text-white/90',
                  ]"
                >
                  <i class="pi pi-dollar text-xs"></i>
                  <span>Payments</span>
                </li>
              </router-link>
            </div>
          </div>
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
