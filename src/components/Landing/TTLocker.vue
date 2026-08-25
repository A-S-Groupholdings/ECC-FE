<template>
  <section
    class="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary via-[#0d1b3a] to-primary px-4 py-16"
  >
    <div
      class="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center"
    >
      <div
        class="relative w-32 h-40 mx-auto mb-8 rounded-2xl border-4 border-secondary bg-emerald-50 overflow-hidden shadow-2xl"
      >
        <div
          class="absolute inset-0 flex items-center justify-center bg-emerald-100"
        >
          <svg
            class="w-16 h-16 text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-b from-primary to-[#0d1b3a] shadow-lg flex items-center justify-center transition-transform duration-700 ease-out"
          :class="unlocked ? 'translate-x-full' : 'translate-x-0'"
        >
          <div
            class="w-3 h-3 rounded-full bg-secondary absolute right-4 top-1/2 -translate-y-1/2 shadow-md"
          ></div>
          <div
            class="absolute bottom-6 w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-white/60"
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
        </div>
      </div>

      <h1 class="text-2xl font-bold text-primary font-times mb-1">TT Locker</h1>
      <!-- <p class="text-sm text-gray-500 mb-8">
        Lock ID: <span class="font-semibold text-gray-700">{{ LOCK_ID }}</span>
      </p> -->

      <button
        @click="handleUnlock"
        :disabled="isLoading"
        class="w-full bg-secondary text-[#0f1f2a] font-bold tracking-wide py-3.5 rounded-xl hover:bg-[#d4b972] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg
          v-if="isLoading"
          class="w-5 h-5 animate-spin"
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
        <span>{{ isLoading ? "Unlocking..." : "Unlock Door" }}</span>
      </button>

      <!-- Success Message -->
      <transition name="fade">
        <div
          v-if="resultMessage && !errorMessage"
          class="mt-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-left"
        >
          <p class="text-emerald-700 font-semibold text-sm">
            {{ resultMessage }}
          </p>
        </div>
      </transition>

      <!-- Error Message -->
      <transition name="fade">
        <div
          v-if="errorMessage"
          class="mt-5 bg-red-50 border border-red-200 rounded-xl p-4 text-left"
        >
          <p class="text-red-600 font-semibold text-sm">{{ errorMessage }}</p>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
  import { ref } from "vue";
  import { useRoute } from "vue-router";
  import { TTLockerUnlock } from "@/services/apiService.js";

  const route = useRoute();

  const userId = route.params.doorUserId || "";
  const bookingId = route.params.bookingId || "";
  const centerCode = route.params.doorCenterCode || "";
  const lockIdFromParams = route.params.lockId || "";

  const LOCK_ID = lockIdFromParams || "34031476";

  const isLoading = ref(false);
  const unlocked = ref(false);
  const resultMessage = ref("");
  const errorMessage = ref("");
  const lastResponse = ref(null);

  async function handleUnlock() {
    isLoading.value = true;
    resultMessage.value = "";
    errorMessage.value = "";

    try {
      const res = await TTLockerUnlock({ userId, bookingId, centerCode });

      if (res?.isSuccess) {
        unlocked.value = true;
        resultMessage.value = res.userMessage || "Lock unlocked";
        lastResponse.value = res.value || null;
      } else {
        errorMessage.value =
          res?.userMessage || res?.errorMessage || "Failed to unlock door.";
      }
    } catch (error) {
      console.error("Error unlocking TT locker:", error);
      errorMessage.value =
        error.response?.data?.userMessage ||
        "Something went wrong. Please try again.";
    } finally {
      isLoading.value = false;
    }
  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
