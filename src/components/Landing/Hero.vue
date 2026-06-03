<template>
  <div
    class="hero bg-hero-img-mob lg:bg-hero-img md:bg-cover bg-cover sm:h-[42vh] h-[30vh] bg-no-repeat"
  >
    <div class="container mx-auto grid sm:grid-cols-2 h-full">
      <div
        class="col-span-1 flex justify sm:justify-center justify-start items-center h-full"
      >
        <h1
          class="hero-title font-serif font-bold uppercase leading-[0.95] tracking-wide text-[#1b2a5e] text-[44px] sm:text-[5em] hidden lg:block"
        >
          <span class="block">Lane</span>
          <span class="block">Booking</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .hero-title {
    -webkit-text-stroke: 6px #ffffff;
    paint-order: stroke fill;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  }
</style>
