<template>
  <main
    class="bg-gradient-to-br from-gray-300 to-green-900 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <!-- main section -->
    <div class="User-create-account gap-4 pr-0 md:pr-24 mt-5">
      <!-- createbtn -->
      <div class="create flex justify-between items-center mb-4">
        <h1 class="md:text-2xl sm:text-sm font-bold text-gray-800">
          Live Session
        </h1>
      </div>

      <!-- Live Lane Dashboard Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Lane 1 Card - Available -->
        <div
          class="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 relative overflow-hidden hover:shadow-2xl transition-shadow"
        >
          <!-- Live Indicator Strip -->
          <div
            class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 animate-pulse"
          ></div>

          <!-- Lane Header -->
          <div class="flex items-center justify-between mb-4 mt-2">
            <div class="flex items-center gap-3">
              <div class="relative">
                <div
                  class="w-4 h-4 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
                ></div>
                <div
                  class="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-60"
                ></div>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Lane 1</h2>
            </div>
            <span
              class="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full"
              >LIVE</span
            >
          </div>

          <!-- Status Badge -->
          <div
            class="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-green-200"
          >
            <svg
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Available
          </div>

          <!-- Current Session -->
          <div class="mb-4">
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"
            >
              <span class="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              Current Session
            </p>
            <div
              class="bg-gray-50 rounded-xl p-6 shadow-inner border border-gray-100"
            >
              <p class="text-center text-gray-300 text-3xl font-light">—</p>
              <p class="text-center text-gray-400 text-sm mt-1">
                No active session
              </p>
            </div>
          </div>

          <!-- Next Session -->
          <div>
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"
            >
              <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Next Session
            </p>
            <div
              class="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl p-4 shadow-lg text-white"
            >
              <p class="font-semibold text-center mb-1 text-green-100">
                8:00 PM - 9:00 PM
              </p>
              <p class="font-bold text-center text-lg">Amarjit Singh</p>
              <p class="text-green-200 text-sm text-center">
                Lane + Bowling Machine
              </p>
            </div>
          </div>
        </div>

        <!-- Lane 2 Card - In Use -->
        <div
          class="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 relative overflow-hidden hover:shadow-2xl transition-shadow"
        >
          <!-- Live Indicator Strip -->
          <div
            class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-400 via-rose-500 to-red-400 animate-pulse"
          ></div>

          <!-- Lane Header -->
          <div class="flex items-center justify-between mb-4 mt-2">
            <div class="flex items-center gap-3">
              <div class="relative">
                <div
                  class="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                ></div>
                <div
                  class="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-60"
                ></div>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Lane 2</h2>
            </div>
            <span
              class="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full"
              >LIVE</span
            >
          </div>

          <!-- Status Badge -->
          <div
            class="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-red-200"
          >
            <svg
              class="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            In Use
          </div>

          <!-- Current Session -->
          <div class="mb-4">
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"
            >
              <span
                class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"
              ></span>
              Current Session
            </p>
            <div
              class="bg-gradient-to-r from-red-500 to-rose-600 rounded-xl p-4 shadow-lg text-white"
            >
              <p class="font-semibold text-center mb-1">6:00 PM - 7:30 PM</p>
              <p class="font-bold text-center text-xl">Sidarth</p>
              <p class="text-red-100 text-sm text-center">
                Lane + Bowling Machine
              </p>
            </div>
          </div>

          <!-- Next Session -->
          <div>
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"
            >
              <span class="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              Next Session
            </p>
            <div
              class="bg-gray-50 rounded-xl p-4 shadow-inner border border-gray-100"
            >
              <p class="text-center text-gray-400 text-sm">
                No upcoming session
              </p>
            </div>
          </div>
        </div>

        <!-- Lane 5 Card - In Use -->
        <div
          class="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 relative overflow-hidden hover:shadow-2xl transition-shadow"
        >
          <!-- Live Indicator Strip -->
          <div
            class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-400 via-rose-500 to-red-400 animate-pulse"
          ></div>

          <!-- Lane Header -->
          <div class="flex items-center justify-between mb-4 mt-2">
            <div class="flex items-center gap-3">
              <div class="relative">
                <div
                  class="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                ></div>
                <div
                  class="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-60"
                ></div>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Lane 5</h2>
            </div>
            <span
              class="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full"
              >LIVE</span
            >
          </div>

          <!-- Status Badge -->
          <div
            class="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-red-200"
          >
            <svg
              class="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            In Use
          </div>

          <!-- Current Session -->
          <div class="mb-4">
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"
            >
              <span
                class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"
              ></span>
              Current Session
            </p>
            <div
              class="bg-gradient-to-r from-red-500 to-rose-600 rounded-xl p-4 shadow-lg text-white"
            >
              <p class="font-semibold text-center mb-1">7:00 PM - 8:00 PM</p>
              <p class="font-bold text-center text-xl">Pavan</p>
              <p class="text-red-100 text-sm text-center">
                Lane + Bowling Machine
              </p>
            </div>
          </div>

          <!-- Next Session -->
          <div>
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"
            >
              <span class="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              Next Session
            </p>
            <div
              class="bg-gray-50 rounded-xl p-4 shadow-inner border border-gray-100"
            >
              <p class="text-center text-gray-400 text-sm">
                No upcoming session
              </p>
            </div>
          </div>
        </div>

        <!-- Lane 5 Card - In Use -->
        <div
          class="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 relative overflow-hidden hover:shadow-2xl transition-shadow"
        >
          <!-- Live Indicator Strip -->
          <div
            class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-400 via-rose-500 to-red-400 animate-pulse"
          ></div>

          <!-- Lane Header -->
          <div class="flex items-center justify-between mb-4 mt-2">
            <div class="flex items-center gap-3">
              <div class="relative">
                <div
                  class="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                ></div>
                <div
                  class="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-60"
                ></div>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Lane 5</h2>
            </div>
            <span
              class="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full"
              >LIVE</span
            >
          </div>

          <!-- Status Badge -->
          <div
            class="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-red-200"
          >
            <svg
              class="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            In Use
          </div>

          <!-- Current Session -->
          <div class="mb-4">
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"
            >
              <span
                class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"
              ></span>
              Current Session
            </p>
            <div
              class="bg-gradient-to-r from-red-500 to-rose-600 rounded-xl p-4 shadow-lg text-white"
            >
              <p class="font-semibold text-center mb-1">7:00 PM - 8:00 PM</p>
              <p class="font-bold text-center text-xl">Pavan</p>
              <p class="text-red-100 text-sm text-center">
                Lane + Bowling Machine
              </p>
            </div>
          </div>

          <!-- Next Session -->
          <div>
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"
            >
              <span class="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              Next Session
            </p>
            <div
              class="bg-gray-50 rounded-xl p-4 shadow-inner border border-gray-100"
            >
              <p class="text-center text-gray-400 text-sm">
                No upcoming session
              </p>
            </div>
          </div>
        </div>

        <!-- Lane 5 Card - In Use -->
        <div
          class="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 relative overflow-hidden hover:shadow-2xl transition-shadow"
        >
          <!-- Live Indicator Strip -->
          <div
            class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-400 via-rose-500 to-red-400 animate-pulse"
          ></div>

          <!-- Lane Header -->
          <div class="flex items-center justify-between mb-4 mt-2">
            <div class="flex items-center gap-3">
              <div class="relative">
                <div
                  class="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                ></div>
                <div
                  class="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-60"
                ></div>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Lane 5</h2>
            </div>
            <span
              class="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full"
              >LIVE</span
            >
          </div>

          <!-- Status Badge -->
          <div
            class="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-red-200"
          >
            <svg
              class="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            In Use
          </div>

          <!-- Current Session -->
          <div class="mb-4">
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"
            >
              <span
                class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"
              ></span>
              Current Session
            </p>
            <div
              class="bg-gradient-to-r from-red-500 to-rose-600 rounded-xl p-4 shadow-lg text-white"
            >
              <p class="font-semibold text-center mb-1">7:00 PM - 8:00 PM</p>
              <p class="font-bold text-center text-xl">Pavan</p>
              <p class="text-red-100 text-sm text-center">
                Lane + Bowling Machine
              </p>
            </div>
          </div>

          <!-- Next Session -->
          <div>
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"
            >
              <span class="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              Next Session
            </p>
            <div
              class="bg-gray-50 rounded-xl p-4 shadow-inner border border-gray-100"
            >
              <p class="text-center text-gray-400 text-sm">
                No upcoming session
              </p>
            </div>
          </div>
        </div>

        <!-- Lane 5 Card - In Use -->
        <div
          class="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 relative overflow-hidden hover:shadow-2xl transition-shadow"
        >
          <!-- Live Indicator Strip -->
          <div
            class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-400 via-rose-500 to-red-400 animate-pulse"
          ></div>

          <!-- Lane Header -->
          <div class="flex items-center justify-between mb-4 mt-2">
            <div class="flex items-center gap-3">
              <div class="relative">
                <div
                  class="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                ></div>
                <div
                  class="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-60"
                ></div>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Lane 5</h2>
            </div>
            <span
              class="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full"
              >LIVE</span
            >
          </div>

          <!-- Status Badge -->
          <div
            class="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-red-200"
          >
            <svg
              class="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            In Use
          </div>

          <!-- Current Session -->
          <div class="mb-4">
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"
            >
              <span
                class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"
              ></span>
              Current Session
            </p>
            <div
              class="bg-gradient-to-r from-red-500 to-rose-600 rounded-xl p-4 shadow-lg text-white"
            >
              <p class="font-semibold text-center mb-1">7:00 PM - 8:00 PM</p>
              <p class="font-bold text-center text-xl">Pavan</p>
              <p class="text-red-100 text-sm text-center">
                Lane + Bowling Machine
              </p>
            </div>
          </div>

          <!-- Next Session -->
          <div>
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"
            >
              <span class="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              Next Session
            </p>
            <div
              class="bg-gray-50 rounded-xl p-4 shadow-inner border border-gray-100"
            >
              <p class="text-center text-gray-400 text-sm">
                No upcoming session
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import Nav from "../Dashboard/UI/SecondNav.vue";
</script>
