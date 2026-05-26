<template>
  <footer class="bg-primary text-white">
    <!-- Main Footer -->
    <div class="container mx-auto px-4 py-12">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-center"
      >
        <!-- Logo & Contact Info -->
        <div class="text-center md:text-left">
          <!-- Logo -->
          <div class="mb-4 flex justify-center md:justify-start">
            <img
              src="../../assets/logo.webp"
              alt=""
              class="w-[174px] h-[174px]"
            />
          </div>
          <h3
            class="text-white font-bold text-lg tracking-wider mb-4 font-times text-[20px]"
          >
            ELITE CRICKET CENTRE
          </h3>
          <div class="text-gray-300 text-sm space-y-1 font-montserrat">
            <p class="text-[#fefefe]">9:30 am to 11:00 pm (Mon - Fri)</p>
            <p class="text-[#fefefe]">9:00 am to 10:00 pm (Sat - Sun)</p>
            <p class="mt-3 text-[#bbb]">8-9 Becon Court, Hallam VIC 3803</p>
            <p class="text-[#bbb]">0390 675 696</p>
            <p class="text-[#bbb]">info@elitecricketcentre.com.au</p>
          </div>
        </div>

        <!-- Information Links -->
        <div>
          <h4 class="text-[#fefefe] font-bold tracking-wider mb-6">
            INFORMATION
          </h4>
          <ul class="space-y-3 text-sm">
            <li>
              <a
                href="#"
                class="text-[#bbb] font-semibold hover:underline"
                >Lane Booking</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-[#bbb] hover:text-white"
                >Gym</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-[#bbb] hover:text-white"
                >Gallery</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-[#bbb] hover:text-white"
                >About Us</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-[#bbb] hover:text-white"
                >Contact Us</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-[#bbb] hover:text-white"
                >Member Login</a
              >
            </li>
          </ul>
        </div>

        <!-- Useful Links -->
        <div>
          <h4 class="text-white font-bold tracking-wider mb-6">USEFUL LINKS</h4>
          <ul class="space-y-3 text-sm">
            <li>
              <a
                href="#"
                class="text-[#bbb] hover:text-white"
                >Home</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-[#bbb] hover:text-white"
                >Our Coaches</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-[#bbb] hover:text-white"
                >Blog Posts</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-[#bbb] hover:text-white"
                >Video Analysis</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-[#bbb] hover:text-white"
                >Coach booking</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-300 hover:text-white"
                >Booking Cancellation</a
              >
            </li>
          </ul>
        </div>

        <!-- Newsletter Signup -->
        <div>
          <h4 class="text-white font-bold tracking-wider mb-6">
            NEWSLETTER SIGNUP
          </h4>
          <div class="flex">
            <input
              type="email"
              placeholder="Email Address"
              class="flex-1 bg-primary text-white px-4 py-3 text-sm placeholder-gray-400 focus:outline-none rounded-l-lg border-l border-t border-b"
            />
            <button
              class="bg-secondary text-[#0f1f2a] px-6 py-3 font-semibold text-sm tracking-wider hover:bg-[#d4b972] transition-colors rounded-r-lg border-r border-t border-b"
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright Bar -->
    <div class="border-t border-gray-700">
      <div class="container mx-auto px-4 py-6">
        <div class="flex justify-center items-center">
          <p class="text-gray-400 text-sm">
            <span class="inline-flex items-center">
              <svg
                class="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                  clip-rule="evenodd"
                />
                <path
                  d="M10 6a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2V7a1 1 0 011-1z"
                />
              </svg>
              2025
              <span class="font-semibold text-white mx-1"
                >Elite Cricket Centre</span
              >
              All rights reserved.
            </span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
</script>
