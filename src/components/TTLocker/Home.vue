<template>
  <main
    class="bg-gradient-to-br from-gray-300 to-green-900 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <!-- main section -->
    <div class="gap-4 pr-0 md:pr-24 mt-5 max-w-5xl mx-auto">
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 class="md:text-2xl sm:text-xl font-bold text-gray-900">
            TT Locker Control
          </h1>
          <p class="text-sm text-gray-700 mt-1">
            Monitor and unlock the entrance locks at each centre.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="refreshAll"
            :disabled="isAnyLoading"
            class="inline-flex items-center gap-2 bg-white/90 border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white transition-colors disabled:opacity-50"
          >
            <svg
              class="w-4 h-4"
              :class="{ 'animate-spin': isAnyLoading }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="lock in locks"
          :key="lock.code"
          class="relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100"
        >
          <!-- top accent -->
          <div
            class="absolute top-0 left-0 w-full h-1.5 transition-colors duration-500"
            :class="accentClass(lock)"
          ></div>

          <div class="p-8">
            <!-- header -->
            <div class="flex items-start justify-between mb-6">
              <div>
                <p
                  class="text-xs font-bold uppercase tracking-wider text-gray-400"
                >
                  {{ lock.code }}
                </p>
                <h2 class="text-2xl font-black text-gray-900">
                  {{ lock.name }}
                </h2>
                <p
                  v-if="lock.status?.lockId"
                  class="text-xs text-gray-400 mt-0.5 font-mono"
                >
                  Lock #{{ lock.status.lockId }}
                </p>
              </div>

              <!-- status badge -->
              <span
                class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                :class="badgeClass(lock)"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="[
                    dotClass(lock),
                    lock.isLoadingStatus ? 'animate-pulse' : '',
                  ]"
                ></span>
                {{ statusLabel(lock) }}
              </span>
            </div>

            <!-- lock icon -->
            <div class="flex items-center justify-center my-6">
              <div
                class="w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-inner"
                :class="iconWrapClass(lock)"
              >
                <svg
                  v-if="lock.isLoadingStatus && !lock.status"
                  class="w-10 h-10 animate-spin text-gray-400"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <!-- unlocked -->
                <svg
                  v-else-if="lock.status?.isUnlocked"
                  class="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
                <!-- locked / unknown -->
                <svg
                  v-else
                  class="w-12 h-12"
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

            <!-- battery + last checked -->
            <div class="grid grid-cols-2 gap-3 mb-6">
              <div class="bg-gray-50 rounded-2xl p-4">
                <p
                  class="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2"
                >
                  Battery
                </p>
                <div class="flex items-center gap-3">
                  <!-- battery icon -->
                  <div class="relative w-10 h-5 shrink-0">
                    <div
                      class="absolute inset-0 rounded-[4px] border-2"
                      :class="batteryBorderClass(lock)"
                    >
                      <div
                        class="h-full rounded-[2px] transition-all duration-500"
                        :class="batteryFillClass(lock)"
                        :style="{ width: `${batteryPct(lock)}%` }"
                      ></div>
                    </div>
                    <div
                      class="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1 h-2.5 rounded-r-sm"
                      :class="batteryCapClass(lock)"
                    ></div>
                  </div>
                  <span
                    class="text-lg font-bold"
                    :class="batteryTextClass(lock)"
                  >
                    {{
                      lock.status?.electricQuantity != null
                        ? `${lock.status.electricQuantity}%`
                        : "--"
                    }}
                  </span>
                </div>
              </div>
              <div class="bg-gray-50 rounded-2xl p-4">
                <p
                  class="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2"
                >
                  Last checked
                </p>
                <p class="text-sm font-semibold text-gray-800 leading-snug">
                  {{ fmtTime(lock.status?.checkedAt) }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ fmtDate(lock.status?.checkedAt) }}
                </p>
              </div>
            </div>

            <!-- messages -->
            <transition name="fade">
              <div
                v-if="lock.message"
                class="mb-4 px-4 py-3 rounded-xl text-sm flex items-start gap-2"
                :class="
                  lock.messageType === 'error'
                    ? 'bg-red-50 text-red-700 border border-red-100'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                "
              >
                <svg
                  class="w-4 h-4 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="lock.messageType === 'error'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{{ lock.message }}</span>
              </div>
            </transition>

            <!-- actions -->
            <div class="flex gap-3">
              <button
                @click="unlock(lock)"
                :disabled="lock.isUnlocking || lock.isLoadingStatus"
                class="flex-1 inline-flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                :class="
                  lock.status?.isUnlocked
                    ? 'bg-gray-400 hover:bg-gray-500'
                    : 'bg-gradient-to-r from-[#1a3a35] to-green-600 hover:opacity-90'
                "
              >
                <svg
                  v-if="lock.isUnlocking"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
                {{
                  lock.isUnlocking
                    ? "Unlocking..."
                    : lock.status?.isUnlocked
                      ? "Unlock again"
                      : "Unlock"
                }}
              </button>
              <button
                @click="fetchStatus(lock)"
                :disabled="lock.isLoadingStatus"
                title="Refresh status"
                class="w-14 inline-flex items-center justify-center rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <svg
                  class="w-5 h-5"
                  :class="{ 'animate-spin': lock.isLoadingStatus }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
            <router-link
              :to="`/ttlocker/passage/${lock.code}`"
              class="w-full inline-flex items-center justify-center gap-2 mt-3 py-3 rounded-2xl font-semibold border border-gray-200 bg-white text-[#1a3a35] hover:bg-gray-50 hover:border-[#1a3a35]/30 transition-colors"
            >
              Passage Mode
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import {
    TTLockerPortalUnlock,
    TTLockerStatus,
  } from "@/services/apiService.js";
  import Nav from "../TTLocker/UI/SecondNav.vue";

  const STATUS_POLL_MS = 30000;

  const locks = ref([
    {
      code: "CRANBOURNE",
      name: "Cranbourne",
      status: null,
      isLoadingStatus: false,
      isUnlocking: false,
      message: "",
      messageType: "success",
      statusError: false,
    },
    {
      code: "HALLAM",
      name: "Hallam",
      status: null,
      isLoadingStatus: false,
      isUnlocking: false,
      message: "",
      messageType: "success",
      statusError: false,
    },
  ]);

  const isAnyLoading = computed(() =>
    locks.value.some((l) => l.isLoadingStatus || l.isUnlocking),
  );

  let messageTimers = {};
  function setMessage(lock, text, type = "success") {
    lock.message = text;
    lock.messageType = type;
    clearTimeout(messageTimers[lock.code]);
    messageTimers[lock.code] = setTimeout(() => (lock.message = ""), 5000);
  }

  async function fetchStatus(lock) {
    lock.isLoadingStatus = true;
    try {
      const res = await TTLockerStatus(lock.code);
      if (res.isSuccess && res.value) {
        lock.status = res.value;
        lock.statusError = false;
      } else {
        lock.statusError = true;
        setMessage(
          lock,
          res.errorMessage || res.userMessage || "Failed to fetch lock status.",
          "error",
        );
      }
    } catch (error) {
      lock.statusError = true;
      setMessage(lock, "Network error while fetching status.", "error");
    } finally {
      lock.isLoadingStatus = false;
    }
  }

  async function unlock(lock) {
    lock.isUnlocking = true;
    lock.message = "";
    try {
      const res = await TTLockerPortalUnlock(lock.code);
      if (res.isSuccess) {
        setMessage(lock, res.userMessage || `Lock unlocked for ${lock.code}`);
        await fetchStatus(lock);
      } else {
        setMessage(
          lock,
          res.errorMessage || res.userMessage || "Failed to unlock.",
          "error",
        );
      }
    } catch (error) {
      setMessage(lock, "Network error. Please try again.", "error");
    } finally {
      lock.isUnlocking = false;
    }
  }

  function refreshAll() {
    return Promise.all(locks.value.map(fetchStatus));
  }

  let pollTimer = null;
  onMounted(() => {
    refreshAll();
    pollTimer = setInterval(refreshAll, STATUS_POLL_MS);
  });
  onUnmounted(() => {
    clearInterval(pollTimer);
    Object.values(messageTimers).forEach(clearTimeout);
  });

  // ─── UI helpers ─────────────────────────────────────────────────────────────
  function statusLabel(lock) {
    if (lock.isLoadingStatus && !lock.status) return "Checking";
    if (lock.statusError && !lock.status) return "Unknown";
    return (
      lock.status?.stateText || (lock.status?.isLocked ? "LOCKED" : "UNKNOWN")
    );
  }

  function accentClass(lock) {
    if (!lock.status) return "bg-gray-300";
    return lock.status.isUnlocked
      ? "bg-gradient-to-r from-emerald-400 to-green-600"
      : "bg-gradient-to-r from-red-400 to-rose-600";
  }

  function badgeClass(lock) {
    if (!lock.status) return "bg-gray-100 text-gray-600";
    return lock.status.isUnlocked
      ? "bg-emerald-100 text-emerald-700"
      : "bg-red-100 text-red-700";
  }

  function dotClass(lock) {
    if (!lock.status) return "bg-gray-400";
    return lock.status.isUnlocked ? "bg-emerald-500" : "bg-red-500";
  }

  function iconWrapClass(lock) {
    if (!lock.status) return "bg-gray-100 text-gray-400";
    return lock.status.isUnlocked
      ? "bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60"
      : "bg-red-50 text-red-600 ring-8 ring-red-50/60";
  }

  function batteryPct(lock) {
    const q = lock.status?.electricQuantity;
    return q == null ? 0 : Math.max(0, Math.min(100, q));
  }
  function batteryLevel(lock) {
    const q = lock.status?.electricQuantity;
    if (q == null) return "none";
    if (q <= 20) return "low";
    if (q <= 50) return "mid";
    return "high";
  }
  function batteryFillClass(lock) {
    return {
      none: "bg-gray-300",
      low: "bg-red-500",
      mid: "bg-amber-400",
      high: "bg-emerald-500",
    }[batteryLevel(lock)];
  }
  function batteryBorderClass(lock) {
    return {
      none: "border-gray-300",
      low: "border-red-400",
      mid: "border-amber-400",
      high: "border-emerald-500",
    }[batteryLevel(lock)];
  }
  function batteryCapClass(lock) {
    return {
      none: "bg-gray-300",
      low: "bg-red-400",
      mid: "bg-amber-400",
      high: "bg-emerald-500",
    }[batteryLevel(lock)];
  }
  function batteryTextClass(lock) {
    return {
      none: "text-gray-400",
      low: "text-red-600",
      mid: "text-amber-600",
      high: "text-emerald-700",
    }[batteryLevel(lock)];
  }

  function fmtTime(d) {
    if (!d) return "--";
    return new Date(d).toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  function fmtDate(d) {
    if (!d) return "Not checked yet";
    return new Date(d).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
