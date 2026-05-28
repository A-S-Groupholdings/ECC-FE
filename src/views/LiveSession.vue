<template>
  <main
    ref="mainRef"
    class="min-h-screen bg-gradient-to-br from-[#0a1f15] via-[#0d2e1e] to-[#0a1f15] text-white overflow-hidden relative"
  >
    <!-- Animated Background Lightning Effect -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 animate-pulse"
      ></div>
      <div
        class="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 animate-pulse"
        style="animation-delay: 0.5s"
      ></div>
      <div
        class="absolute top-0 left-3/4 w-1 h-full bg-gradient-to-b from-emerald-400/0 via-emerald-400/15 to-emerald-400/0 animate-pulse"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 animate-pulse"
        style="animation-delay: 0.3s"
      ></div>
      <div
        class="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/15 to-emerald-400/0 animate-pulse"
        style="animation-delay: 0.8s"
      ></div>
    </div>

    <!-- Fullscreen Toggle -->
    <button
      @click="toggleFullscreen"
      class="absolute top-4 right-4 z-50 bg-emerald-500/20 hover:bg-emerald-500/30 backdrop-blur-md border border-emerald-400/30 rounded-xl p-3 transition-all duration-300 hover:scale-105 group"
      title="Toggle Fullscreen"
    >
      <svg
        v-if="!isFullscreen"
        class="w-6 h-6 text-emerald-300 group-hover:text-emerald-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
        ></path>
      </svg>
      <svg
        v-else
        class="w-6 h-6 text-emerald-300 group-hover:text-emerald-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>

    <!-- Header -->
    <header class="px-6 py-5 border-b border-emerald-500/10 relative z-10">
      <div class="flex items-center justify-between">
        <!-- Logo & Title -->
        <div class="flex items-center gap-4">
          <div
            class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 border border-emerald-400/30"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              ></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-black tracking-tight text-white uppercase">
              Elite Cricket Centre
            </h1>
            <p
              class="text-sm text-emerald-400/70 font-bold uppercase tracking-widest"
            >
              Live Session Dashboard
            </p>
          </div>
        </div>

        <!-- Australian Time -->
        <div class="flex items-center gap-6">
          <div class="text-right">
            <div
              class="text-5xl font-black tabular-nums tracking-tight text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]"
            >
              {{ displayTime }}
            </div>
            <div
              class="text-sm text-white/60 font-bold mt-1 uppercase tracking-wider"
            >
              {{ displayDate }} ·
              {{ dashboardData?.timezone || "Australia/Sydney" }}
            </div>
          </div>
          <div
            class="w-16 h-16 rounded-2xl bg-white border border-emerald-200/50 flex items-center justify-center shadow-lg shadow-slate-200/30"
          >
            <svg
              class="w-8 h-8 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </header>

    <!-- Stats Bar -->

    <!-- Main Content -->
    <div class="p-6 relative z-10">
      <!-- Loading -->
      <div
        v-if="isLoading && !resources.length"
        class="flex items-center justify-center py-20"
      >
        <div class="text-center">
          <svg
            class="w-12 h-12 animate-spin text-emerald-400 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
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
          <p
            class="text-emerald-400/50 text-sm font-bold uppercase tracking-wider"
          >
            Loading session data...
          </p>
        </div>
      </div>

      <!-- Error -->
      <div
        v-else-if="errorMessage"
        class="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center"
      >
        <svg
          class="w-10 h-10 text-red-400 mx-auto mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          ></path>
        </svg>
        <p class="text-red-300 font-bold">{{ errorMessage }}</p>
        <button
          @click="fetchDashboard"
          class="mt-3 text-sm text-red-400 hover:text-red-300 underline font-bold"
        >
          Retry
        </button>
      </div>

      <!-- Resource Grid -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        <div
          v-for="resource in resources"
          :key="resource._id"
          class="rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10"
          :class="getResourceCardClass(resource)"
        >
          <!-- Card Header -->
          <div
            class="px-5 py-4 border-b"
            :class="
              resource.currentSession
                ? 'border-red-500/20'
                : resource.nextSession
                  ? 'border-emerald-500/15'
                  : 'border-slate-200/50'
            "
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="w-3 h-3 rounded-full animate-pulse shadow-lg"
                  :class="getStatusDotClass(resource)"
                ></div>
                <h3
                  class="text-lg font-black uppercase tracking-wide"
                  :class="
                    resource.currentSession || resource.nextSession
                      ? 'text-white'
                      : 'text-slate-800'
                  "
                >
                  {{ resource.title }}
                </h3>
              </div>
              <span
                class="text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border"
                :class="getStatusBadgeClass(resource)"
              >
                {{ getResourceStatus(resource) }}
              </span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="px-5 py-4 space-y-4">
            <!-- Current Session -->
            <div>
              <p
                class="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2"
                :class="
                  resource.currentSession || resource.nextSession
                    ? 'text-white/40'
                    : 'text-slate-400/70'
                "
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="
                    resource.currentSession
                      ? 'bg-red-500 animate-pulse shadow-lg shadow-red-400/50'
                      : resource.nextSession
                        ? 'bg-white/30'
                        : 'bg-slate-300'
                  "
                ></span>
                Current Session
              </p>

              <div
                v-if="resource.currentSession"
                class="rounded-xl p-4 border"
                :class="getCurrentSessionClass(resource)"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-bold text-white/90">
                    {{ resource.currentSession.startTime }} -
                    {{ resource.currentSession.endTime }}
                  </span>
                  <!-- <span
                    class="text-xs font-black px-2 py-0.5 rounded-full border"
                    :class="
                      getPaymentBadgeClass(
                        resource.currentSession.paymentStatus,
                      )
                    "
                  >
                    {{ resource.currentSession.paymentStatus }}
                  </span> -->
                </div>
                <p class="text-lg font-black text-white mb-0.5">
                  {{ resource.currentSession.userName }}
                </p>
                <p class="text-sm text-white/60">
                  {{ resource.currentSession.serviceName }}
                </p>
                <p class="text-xs text-white/40 mt-1">
                  {{ resource.currentSession.userEmail }}
                </p>
              </div>

              <div
                v-else
                class="rounded-xl p-6 text-center"
                :class="
                  resource.currentSession || resource.nextSession
                    ? 'bg-white/5 border border-white/10'
                    : 'bg-slate-100 border border-slate-200'
                "
              >
                <p
                  class="text-2xl font-light"
                  :class="
                    resource.currentSession || resource.nextSession
                      ? 'text-white/20'
                      : 'text-slate-300'
                  "
                >
                  —
                </p>
                <p
                  class="text-xs mt-1 font-bold uppercase tracking-wider"
                  :class="
                    resource.currentSession || resource.nextSession
                      ? 'text-white/30'
                      : 'text-slate-400'
                  "
                >
                  No active session
                </p>
              </div>
            </div>

            <!-- Next Session -->
            <div>
              <p
                class="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2"
                :class="
                  resource.currentSession || resource.nextSession
                    ? 'text-white/40'
                    : 'text-slate-400/70'
                "
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="
                    resource.nextSession
                      ? 'bg-amber-400 shadow-lg shadow-amber-400/50'
                      : resource.currentSession
                        ? 'bg-white/30'
                        : 'bg-slate-300'
                  "
                ></span>
                Next Session
              </p>

              <div
                v-if="resource.nextSession"
                class="rounded-xl p-4 border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/10"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-bold text-amber-200/90">
                    {{ resource.nextSession.startTime }} -
                    {{ resource.nextSession.endTime }}
                  </span>
                  <!-- <span
                    class="text-xs font-black px-2 py-0.5 rounded-full border"
                    :class="
                      getPaymentBadgeClass(resource.nextSession.paymentStatus)
                    "
                  >
                    {{ resource.nextSession.paymentStatus }}
                  </span> -->
                </div>
                <p class="text-lg font-black text-white mb-0.5">
                  {{ resource.nextSession.userName }}
                </p>
                <p class="text-sm text-white/60">
                  {{ resource.nextSession.serviceName }}
                </p>
                <!-- <div class="flex items-center gap-3 mt-2">
                  <span
                    class="text-xs px-2 py-0.5 rounded-full font-black uppercase tracking-wider"
                    :class="getBookingStatusClass(resource.nextSession.status)"
                  >
                    {{ resource.nextSession.status }}
                  </span>
                </div> -->
              </div>

              <div
                v-else
                class="rounded-xl p-4 text-center"
                :class="
                  resource.currentSession || resource.nextSession
                    ? 'bg-white/5 border border-white/10'
                    : 'bg-slate-100 border border-slate-200'
                "
              >
                <p
                  class="text-sm font-bold uppercase tracking-wider"
                  :class="
                    resource.currentSession || resource.nextSession
                      ? 'text-white/30'
                      : 'text-slate-400'
                  "
                >
                  No upcoming session
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="px-6 py-3 border-t border-emerald-500/10 flex items-center justify-between relative z-10"
    >
      <div class="flex items-center gap-2">
        <div
          class="w-2 h-2 rounded-full"
          :class="
            isLoading
              ? 'bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50'
              : 'bg-emerald-500'
          "
        ></div>
        <p
          class="text-xs text-emerald-400/40 font-bold uppercase tracking-wider"
        >
          {{ isLoading ? "Updating..." : `Last updated: ${lastUpdated}` }}
        </p>
      </div>
      <p class="text-xs text-emerald-400/30 font-bold uppercase tracking-wider">
        Auto-refresh every 30s
      </p>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import { GetSessionDashboard } from "@/services/apiService.js";

  const mainRef = ref(null);
  const isFullscreen = ref(false);
  const isLoading = ref(false);
  const errorMessage = ref("");
  const dashboardData = ref(null);
  const resources = ref([]);
  const lastUpdated = ref("");

  // Clock
  const displayTime = ref("");
  const displayDate = ref("");
  let clockInterval = null;
  let pollInterval = null;

  const activeSessionCount = computed(() => {
    return resources.value.filter((r) => r.currentSession).length;
  });

  const overallStatusColor = computed(() => {
    const status = dashboardData.value?.overall?.status?.toLowerCase() || "";
    if (status.includes("active"))
      return "bg-emerald-500 shadow-emerald-500/50";
    if (status.includes("no active")) return "bg-amber-500 shadow-amber-500/50";
    return "bg-blue-500 shadow-blue-500/50";
  });

  function updateClock() {
    const now = new Date();
    // Use Australia/Sydney timezone
    displayTime.value = now.toLocaleTimeString("en-AU", {
      timeZone: "Australia/Sydney",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    displayDate.value = now.toLocaleDateString("en-AU", {
      timeZone: "Australia/Sydney",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      mainRef.value?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  function onFullscreenChange() {
    isFullscreen.value = !!document.fullscreenElement;
  }

  async function fetchDashboard() {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response = await GetSessionDashboard();
      if (response.isSuccess) {
        dashboardData.value = response.value;
        resources.value = response.value?.resources || [];
        lastUpdated.value = new Date().toLocaleTimeString("en-AU", {
          timeZone: "Australia/Sydney",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
      } else {
        errorMessage.value =
          response.errorMessage ||
          response.userMessage ||
          "Failed to load session data.";
      }
    } catch (error) {
      console.error("Error fetching session dashboard:", error);
      errorMessage.value = "Network error. Please try again.";
    } finally {
      isLoading.value = false;
    }
  }

  function getResourceStatus(resource) {
    if (resource.currentSession) return "In Use";
    if (resource.nextSession) return "Available";
    return "Available";
  }

  function getResourceCardClass(resource) {
    if (resource.currentSession) {
      return "bg-gradient-to-br from-red-900/60 to-rose-900/40 border-red-500/40 shadow-lg shadow-red-500/20";
    }
    if (resource.nextSession) {
      return "bg-gradient-to-br from-emerald-900/40 to-green-900/20 border-emerald-500/25 shadow-lg shadow-emerald-500/10";
    }
    return "bg-white border-slate-200 shadow-lg shadow-slate-200/50";
  }

  function getStatusDotClass(resource) {
    if (resource.currentSession) return "bg-red-500 shadow-red-400/50";
    if (resource.nextSession) return "bg-emerald-500 shadow-emerald-400/50";
    return "bg-emerald-500 shadow-emerald-400/50";
  }

  function getStatusBadgeClass(resource) {
    if (resource.currentSession) {
      return "bg-red-500/20 text-red-300 border-red-500/30";
    }
    if (resource.nextSession) {
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    }
    return "bg-emerald-100 text-emerald-600 border-emerald-200";
  }

  function getCurrentSessionClass(resource) {
    if (resource.currentSession?.status === "CONFIRMED") {
      return "bg-gradient-to-br from-red-500/20 to-rose-500/10 border-red-500/20";
    }
    return "bg-gradient-to-br from-red-500/20 to-rose-500/10 border-red-500/20";
  }

  function getPaymentBadgeClass(status) {
    const s = (status || "").toUpperCase();
    if (s === "PAID")
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    if (s === "UNPAID") return "bg-red-500/20 text-red-300 border-red-500/30";
    return "bg-white/10 text-white/50 border-white/10";
  }

  function getBookingStatusClass(status) {
    const s = (status || "").toUpperCase();
    if (s === "CONFIRMED") return "bg-emerald-500/20 text-emerald-300";
    if (s === "PENDING") return "bg-amber-500/20 text-amber-300";
    if (s === "CANCELLED") return "bg-red-500/20 text-red-300";
    return "bg-white/10 text-white/50";
  }

  onMounted(() => {
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
    fetchDashboard();
    pollInterval = setInterval(fetchDashboard, 30000);
    document.addEventListener("fullscreenchange", onFullscreenChange);
  });

  onUnmounted(() => {
    if (clockInterval) clearInterval(clockInterval);
    if (pollInterval) clearInterval(pollInterval);
    document.removeEventListener("fullscreenchange", onFullscreenChange);
  });
</script>

<style scoped>
  .tabular-nums {
    font-variant-numeric: tabular-nums;
  }
</style>
