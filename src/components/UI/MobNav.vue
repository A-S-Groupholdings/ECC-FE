<template>
  <nav class="bg-primary h-28 border-b border-[#aeaeae] sm:hidden">
    <div class="container mx-auto flex items-center justify-between h-full">
      <!-- hambergur -->
      <div class="hambergur">
        <img
          src="@/assets/hamburger.svg"
          alt=""
          class="w-[24px] h-[37px]"
        />
      </div>
      <div class="flex items-center space-x-3">
        <!-- logo -->
        <div class="logo">
          <img
            src="@/assets/logo.webp"
            alt=""
            class="w-[60px] h-[60px]"
          />
        </div>
        <div class="web-name">
          <a
            href=""
            class="text-white text-[14px] font-medium font-times"
            >ELITE CRICKET CENTRE</a
          >
        </div>
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
