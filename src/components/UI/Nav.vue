<template>
  <nav class="bg-primary h-28 border-b border-[#aeaeae] sm:grid hidden">
    <div class="container mx-auto flex items-center justify-between h-full">
      <div class="flex items-center space-x-3">
        <!-- logo -->
        <div class="logo">
          <img
            src="@/assets/logo.webp"
            alt=""
            class="w-[94px] h-[94px]"
          />
        </div>
        <div class="web-name">
          <a
            href=""
            class="text-white text-[28px] font-medium font-times"
            >ELITE CRICKET CENTRE</a
          >
        </div>
      </div>
      <!-- main-menu -->
      <div class="main-menu space-x-4 font-montserrat text-[19px] font-light">
        <a
          href="/"
          class="text-white"
          >Land Booking</a
        >
        <a
          href="/ecc/membership"
          class="text-white"
          >Membership</a
        >
        <a
          href=""
          class="text-white"
          >Gym</a
        >
        <a
          href=""
          class="text-white"
          >Gallery</a
        >
        <a
          href=""
          class="text-white"
          >About Us</a
        >
        <a
          href=""
          class="text-white"
          >Contact Us</a
        >
      </div>

      <!-- account -->
      <router-link to="/dashboard/home">
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
