<template>
  <nav
    class="bg-primary h-28 border-b border-[#aeaeae] sm:hidden relative z-50"
  >
    <div
      class="container mx-auto flex items-center justify-between h-full px-4"
    >
      <!-- hamburger toggle -->
      <button
        @click="toggleMenu"
        class="hambergur p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none"
        aria-label="Toggle navigation menu"
      >
        <img
          v-if="!isMenuOpen"
          src="@/assets/hamburger.svg"
          alt="Menu"
          class="w-[24px] h-[37px]"
        />
        <svg
          v-else
          class="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <!-- logo & brand -->
      <a href="https://elitecricketcentre.com.au  ">
        <div class="flex items-center space-x-3">
          <div class="logo">
            <img
              src="@/assets/logo.webp"
              alt=""
              class="w-[50px] h-[50px]"
            />
          </div>
          <div class="web-name">
            <span
              class="text-white text-[13px] font-medium font-times tracking-wide"
            >
              ELITE CRICKET CENTRE
            </span>
          </div>
        </div>
      </a>

      <!-- account -->
      <router-link :to="profileRoute">
        <div
          class="account p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
        >
          <img
            src="@/assets/account.png"
            alt=""
            class="w-[30px] h-[30px]"
          />
        </div>
      </router-link>
    </div>

    <!-- Mobile Navigation Drawer -->
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        @click="closeMenu"
      ></div>
    </Transition>

    <!-- Drawer Panel (slides from left) -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div
        v-if="isMenuOpen"
        class="fixed top-0 left-0 h-full w-[280px] bg-gradient-to-b from-[#1a3a2a] to-[#0d1f15] z-50 shadow-2xl shadow-black/50 flex flex-col"
      >
        <!-- Drawer Header -->
        <div
          class="flex items-center justify-between p-5 border-b border-emerald-500/20"
        >
          <div class="flex items-center space-x-3">
            <img
              src="@/assets/logo.webp"
              alt=""
              class="w-[45px] h-[45px]"
            />
            <span
              class="text-white text-[14px] font-medium font-times tracking-wide"
            >
              ELITE CRICKET CENTRE
            </span>
          </div>
          <button
            @click="closeMenu"
            class="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg
              class="w-6 h-6 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 py-4">
          <a
            v-for="(item, index) in navItems"
            :key="index"
            :href="item.href"
            class="flex items-center gap-4 px-6 py-4 text-white/80 hover:text-white hover:bg-emerald-500/10 transition-all duration-200 border-l-4 border-transparent hover:border-emerald-400"
            @click="closeMenu"
          >
            <svg
              class="w-5 h-5 text-emerald-400/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="item.icon"
              ></path>
            </svg>
            <span class="text-[16px] font-medium">{{ item.label }}</span>
          </a>
        </nav>

        <!-- Drawer Footer -->
        <div class="p-5 border-t border-emerald-500/20">
          <router-link
            :to="profileRoute"
            class="flex items-center gap-3 px-4 py-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors duration-200"
            @click="closeMenu"
          >
            <img
              src="@/assets/account.png"
              alt=""
              class="w-[28px] h-[28px]"
            />
            <span class="text-white text-[14px] font-medium">My Account</span>
          </router-link>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";

  const isMenuOpen = ref(false);
  const userRole = ref("guest");
  const isLoggedIn = ref(false);
  const router = useRouter();

  onMounted(() => {
    try {
      const stored = localStorage.getItem("user");

      if (stored) {
        const user = JSON.parse(stored);

        if (user && user.category) {
          isLoggedIn.value = true;
          const catName = user.category.categoryName?.toLowerCase() || "";
          if (catName === "coach") {
            userRole.value = "coach";
          } else {
            userRole.value = "member";
          }
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      // Don't redirect, just stay as guest
    }
  });

  const profileRoute = computed(() => {
    if (!isLoggedIn.value) {
      return "/member/login"; // Redirect to login if not logged in
    }
    return userRole.value === "coach" ? "/coach/profile" : "/ecc/profile";
  });

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
  }

  function closeMenu() {
    isMenuOpen.value = false;
  }

  const navItems = [
    {
      label: "Lane Booking",
      href: "/",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    },
    {
      label: "Membership",
      href: "/membership/public",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Gym",
      href: "https://elitecricketcentre.com.au/gym/",
      icon: "M4 6h16M4 10h16M4 14h16M4 18h16",
    },
    {
      label: "Gallery",
      href: "https://elitecricketcentre.com.au/gallery/",
      icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      label: "About Us",
      href: "https://elitecricketcentre.com.au/about-us/",
      icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Contact Us",
      href: "https://elitecricketcentre.com.au/contact-us/",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
  ];
</script>

<style scoped>
  /* Prevent body scroll when menu is open */
  body.menu-open {
    overflow: hidden;
  }
</style>
