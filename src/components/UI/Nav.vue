<template>
  <nav class="bg-primary h-28 border-b border-[#aeaeae] sm:grid hidden">
    <div class="container mx-auto flex items-center justify-between h-full">
      <div class="flex items-center space-x-3">
        <!-- logo -->
        <a href="https://elitecricketcentre.com.au/">
          <div class="logo">
            <img
              src="@/assets/logo.webp"
              alt=""
              class="w-[94px] h-[94px]"
            />
          </div>
        </a>

        <div class="web-name">
          <a
            href="https://elitecricketcentre.com.au/"
            class="text-white text-[28px] font-medium font-times"
            >ELITE CRICKET CENTRE</a
          >
        </div>
      </div>
      <!-- main-menu -->
      <div
        class="main-menu flex items-center space-x-6 font-montserrat text-[19px] font-light"
      >
        <a
          href="/"
          class="text-white hover:text-secondary transition-colors duration-200"
          >Lane Booking</a
        >

        <!-- Membership with hover dropdown -->
        <div
          class="membership-wrapper relative py-2"
          @mouseenter="showMenu = true"
          @mouseleave="showMenu = false"
        >
          <a
            href="/membership/public"
            class="text-white hover:text-secondary transition-colors duration-200"
          >
            Membership
          </a>

          <!-- Dropdown Submenu -->
          <transition name="dropdown">
            <div
              v-if="showMenu"
              class="absolute top-full left-0 pt-2 w-64 z-50"
            >
              <div
                class="bg-white shadow-lg border border-gray-100 py-2 text-left"
              >
                <a
                  href="https://elitecricketcentre.com.au/ecc-member-login/"
                  class="block px-6 py-3 text-[16px] text-gray-500 font-montserrat font-normal hover:text-secondary hover:bg-gray-50 transition-colors duration-150"
                >
                  Member Login
                </a>
                <a
                  href="https://booking.elitecricketcentre.com.au/membership/public"
                  class="block px-6 py-3 text-[16px] text-gray-500 font-montserrat font-normal hover:text-secondary hover:bg-gray-50 transition-colors duration-150"
                >
                  Membership Registration
                </a>
              </div>
            </div>
          </transition>
        </div>

        <a
          href="https://elitecricketcentre.com.au/gym/"
          class="text-white hover:text-secondary transition-colors duration-200"
          >Gym</a
        >
        <a
          href="https://elitecricketcentre.com.au/gallery/"
          class="text-white hover:text-secondary transition-colors duration-200"
          >Gallery</a
        >
        <a
          href="https://elitecricketcentre.com.au/about-us/"
          class="text-white hover:text-secondary transition-colors duration-200"
          >About Us</a
        >
        <a
          href="https://elitecricketcentre.com.au/contact-us/"
          class="text-white hover:text-secondary transition-colors duration-200"
          >Contact Us</a
        >
      </div>

      <!-- account -->
      <router-link :to="profileRoute">
        <div class="account">
          <img
            src="@/assets/account.png"
            alt=""
            class="w-[35px] h-[35px]"
          />
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
  import { ref, computed } from "vue";

  const showMenu = ref(false);

  const isLoggedIn = computed(() => {
    try {
      return !!localStorage.getItem("user");
    } catch {
      return false;
    }
  });

  const userCategory = computed(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return null;
      const user = JSON.parse(stored);
      return user?.category?.categoryName || null;
    } catch {
      return null;
    }
  });

  const profileRoute = computed(() => {
    if (!isLoggedIn.value) {
      return "/member/login";
    }
    return userCategory.value === "Coach"
      ? "/coach/profile"
      : "/member/profile";
  });
</script>

<style scoped>
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(8px);
  }
</style>
