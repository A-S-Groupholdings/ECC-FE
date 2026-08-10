<template>
  <main
    class="bg-gradient-to-br from-gray-300 to-green-900 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <!-- main section -->
    <div class="User-create-account gap-4 pr-0 md:pr-24 mt-5 max-w-5xl mx-auto">
      <h1 class="md:text-2xl sm:text-xl font-bold text-gray-900 mb-6">
        Live Session
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Cranbourne Card -->
        <router-link
          to="/live-on-ecc-cranbourne"
          class="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
        >
          <div
            class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-green-600"
          ></div>
          <div class="p-8">
            <div class="flex items-start justify-between mb-6">
              <div
                class="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center"
              >
                <svg
                  class="w-7 h-7 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span
                class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                ></span>
                Live
              </span>
            </div>
            <h2 class="text-2xl font-black text-gray-900 mb-2">Cranbourne</h2>
            <p class="text-sm text-gray-500 mb-6 leading-relaxed">
              View real-time lane availability, current sessions and upcoming
              bookings for the Cranbourne centre.
            </p>
            <div
              class="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors"
            >
              Open dashboard
              <svg
                class="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </router-link>

        <!-- Hallam Card -->
        <router-link
          to="/live-on-ecc-hallam"
          class="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
        >
          <div
            class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-emerald-600"
          ></div>
          <div class="p-8">
            <div class="flex items-start justify-between mb-6">
              <div
                class="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center"
              >
                <svg
                  class="w-7 h-7 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span
                class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-3 py-1 rounded-full"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"
                ></span>
                Live
              </span>
            </div>
            <h2 class="text-2xl font-black text-gray-900 mb-2">Hallam</h2>
            <p class="text-sm text-gray-500 mb-6 leading-relaxed">
              View real-time lane availability, current sessions and upcoming
              bookings for the Hallam centre.
            </p>
            <div
              class="inline-flex items-center gap-2 text-sm font-bold text-teal-700 group-hover:text-teal-800 transition-colors"
            >
              Open dashboard
              <svg
                class="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
  import Nav from "../Dashboard/UI/SecondNav.vue";
</script>
