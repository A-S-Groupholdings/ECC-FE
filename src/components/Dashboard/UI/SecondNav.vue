<template>
  <nav class="sm:mt-0 md:mt-0">
    <section class="grid grid-cols-4">
      <!-- navigation -->
      <div class="col-span-2 flex gap-2 h-10 items-center">
        <span>Home</span>
        <i class="pi pi-angle-right"></i>
        <span>Dashboard</span>
      </div>

      <div
        class="col-span-1 sm:flex hidden gap-2 h-10 justify-end items-center px-2 border-r border-black gap-2 relative"
      >
        <!-- notification -->
        <div
          class="notify rounded-full bg-black h-10 w-10 p-3 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors relative"
        >
          <i class="pi pi-bell text-white"></i>
          <!-- Notification Badge -->
        </div>
      </div>
      <div
        class="md:col-span-1 col-span-2 sm:flex hidden gap-2 h-10 items-center relative"
      >
        <!-- avatar -->
        <div
          class="avater rounded-full h-10 w-10 border border-black ml-2 md:flex cursor-pointer"
        >
          <!-- avatar-img -->
          <img
            src="@/assets/avatar.png"
            alt=""
          />
        </div>
        <!-- user-name -->
        <span class="text-black cursor-pointer">Ayesh</span>
        <!-- down-arrow -->
        <i
          class="pi pi-angle-down text-black cursor-pointer"
          @click="toggleDropdown"
        ></i>

        <!-- Logout Dropdown -->
        <div
          v-if="showDropdown"
          class="absolute top-12 right-0 bg-white border border-gray-300 rounded shadow-lg z-50 w-40"
        >
          <button
            @click="handleLogout"
            class="w-full text-left px-4 py-2 hover:bg-gray-100 text-black flex items-center gap-2"
          >
            <i class="pi pi-sign-out"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      <!-- Mobile-view -->
      <div
        class="col-span-2 sm:hidden flex gap-2 h-10 justify-end items-center px-2 gap-2 relative"
      >
        <!-- notification -->
        <div
          class="notify rounded-full bg-black h-10 w-10 p-3 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors relative"
        >
          <i class="pi pi-bell text-white"></i>
          <!-- Notification Badge -->
        </div>

        <!-- error-message -->
        <!-- <div
          class="notify rounded-full bg-black h-10 w-10 p-3 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
        >
          <i class="pi pi-exclamation-circle text-white"></i>
        </div> -->

        <!-- avatar -->
        <div
          class="avater rounded-full h-10 w-10 border border-black ml-2 md:flex cursor-pointer"
        >
          <!-- avatar-img -->
          <img
            src="@/assets/avatar.png"
            alt=""
          />
        </div>
        <!-- user-name -->
        <span class="text-black cursor-pointer">Ayesh</span>
        <!-- down-arrow -->
        <i class="pi pi-angle-down text-black cursor-pointer"></i>

        <!-- Logout Dropdown -->
        <div
          v-if="showDropdown"
          class="absolute top-12 right-0 bg-white border border-gray-300 rounded shadow-lg z-50 w-40"
        >
          <button
            @click="handleLogout"
            class="w-full text-left px-4 py-2 hover:bg-gray-100 text-black flex items-center gap-2"
          >
            <i class="pi pi-sign-out"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </section>
  </nav>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };
</script>
