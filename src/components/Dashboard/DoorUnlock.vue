<template>
  <main
    class="bg-gradient-to-br from-gray-300 to-green-900 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <!-- main section -->
    <div class="User-create-account gap-4 pr-0 md:pr-24 mt-5 max-w-5xl mx-auto">
      <h1 class="md:text-2xl sm:text-xl font-bold text-gray-900 mb-2">
        Door Unlock
      </h1>

      <div
        v-if="resultMessage || errorMessage"
        class="mb-6 rounded-xl p-4 text-left text-sm"
        :class="
          errorMessage
            ? 'bg-red-50 border border-red-200 text-red-700'
            : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
        "
      >
        {{ errorMessage || resultMessage }}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Cranbourne Card -->
        <button
          type="button"
          @click="unlock('CRANBOURNE')"
          :disabled="loadingCode === 'CRANBOURNE'"
          class="group text-left w-full relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <span
                class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full"
              >
                <svg
                  class="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Access
              </span>
            </div>
            <h2 class="text-2xl font-black text-gray-900 mb-2">Cranbourne</h2>
            <p class="text-sm text-gray-500 mb-6 leading-relaxed">
              Tap to send the unlock command for the Cranbourne centre door.
            </p>
            <div
              class="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors"
            >
              Unlock door
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
        </button>

        <!-- Hallam Card -->
        <button
          type="button"
          @click="unlock('HALLAM')"
          :disabled="loadingCode === 'HALLAM'"
          class="group text-left w-full relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <span
                class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-3 py-1 rounded-full"
              >
                <svg
                  class="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Access
              </span>
            </div>
            <h2 class="text-2xl font-black text-gray-900 mb-2">Hallam</h2>
            <p class="text-sm text-gray-500 mb-6 leading-relaxed">
              Tap to send the unlock command for the Hallam centre door.
            </p>
            <div
              class="inline-flex items-center gap-2 text-sm font-bold text-teal-700 group-hover:text-teal-800 transition-colors"
            >
              Unlock door
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
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref } from "vue";
  import { DashboardDoorUnlock } from "@/services/apiService.js";
  import Nav from "../Dashboard/UI/SecondNav.vue";

  const loadingCode = ref("");
  const resultMessage = ref("");
  const errorMessage = ref("");

  async function unlock(centerCode) {
    loadingCode.value = centerCode;
    resultMessage.value = "";
    errorMessage.value = "";
    try {
      const res = await DashboardDoorUnlock(centerCode);
      if (res?.isSuccess) {
        resultMessage.value = res.userMessage || `${centerCode} door unlocked.`;
      } else {
        errorMessage.value =
          res?.userMessage || res?.errorMessage || "Failed to unlock door.";
      }
    } catch (error) {
      console.error("Dashboard door unlock error:", error);
      errorMessage.value =
        error.response?.data?.userMessage || "Something went wrong.";
    } finally {
      loadingCode.value = "";
    }
  }
</script>
