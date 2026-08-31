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

    <!-- Voice Alerts Toggle -->
    <button
      @click="toggleVoiceAlerts"
      class="absolute top-4 right-20 z-50 bg-emerald-500/20 hover:bg-emerald-500/30 backdrop-blur-md border border-emerald-400/30 rounded-xl p-3 transition-all duration-300 hover:scale-105 group"
      :title="voiceEnabled ? 'Mute Voice Alerts' : 'Enable Voice Alerts'"
    >
      <svg
        v-if="voiceEnabled"
        class="w-6 h-6 text-emerald-300 group-hover:text-emerald-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15.536 8.464a5 5 0 010 7.072M12 18.293l-4.146-4.147H4a1 1 0 01-1-1v-2.292a1 1 0 011-1h3.854L12 5.707v12.586zM18.5 6a9 9 0 010 12"
        ></path>
      </svg>
      <svg
        v-else
        class="w-6 h-6 text-red-300 group-hover:text-red-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 18.293l-4.146-4.147H4a1 1 0 01-1-1v-2.292a1 1 0 011-1h3.854L12 5.707v12.586zM17 9l4 4m0-4l-4 4"
        ></path>
      </svg>
    </button>

    <!-- Keep-awake mini animation -->
    <div
      class="absolute bottom-4 right-4 z-50 w-12 h-12 rounded-xl overflow-hidden border border-emerald-400/30 bg-emerald-500/10 pointer-events-none"
      title="Keep display active"
    >
      <canvas
        ref="keepAwakeCanvas"
        width="48"
        height="48"
        class="w-full h-full"
      ></canvas>
    </div>

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
              Live Session Dashboard Cranbourne North
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
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5"
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
        <!-- <p
          class="text-xs text-emerald-400/40 font-bold uppercase tracking-wider"
        >
          {{ isLoading ? "Updating..." : `Last updated: ${lastUpdated}` }}
        </p> -->
      </div>
      <!-- <p class="text-xs text-emerald-400/30 font-bold uppercase tracking-wider">
        Auto-refresh every 30s
      </p> -->
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import { GetSessionDashboard } from "@/services/apiService.js";
  import { useKeepAwake } from "@/composables/useKeepAwake.js";
  import bgMusicAudio from "@/assets/crickerbg.mp3";
  import lane1Audio from "@/assets/Attention. Lane 1 + Auto Feeder has 10 minutes remaining..mp3";
  import lane3Audio from "@/assets/Lane 3 + Bowling Machine.mp3";
  import lane4Audio from "@/assets/Lane 4 + Bowling Machine.mp3";
  import lane5Audio from "@/assets/Lane 5 + Bowling Machine.mp3";

  const CENTER_ID = "CRN";

  useKeepAwake({ pingIntervalMs: 60 * 1000 });

  const mainRef = ref(null);
  const keepAwakeCanvas = ref(null);
  let keepAwakeRafId = null;
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

  // ─── Voice Alerts ────────────────────────────────────────────────────────────
  const voiceEnabled = ref(true);
  const alertedSessionKeys = new Set();
  // Distinct alert checkpoint(s): each one gets its own "ending soon"
  // announcement as the session crosses it.
  const ALERT_CHECKPOINTS_MINUTES = [10];
  let alertCheckInterval = null;

  // Speech / Audio announcements are queued and played one at a time with a gap
  // between them, so that when several lanes alert at once (e.g. 3 lanes
  // ending together) they don't talk over each other / run back-to-back.
  const ANNOUNCEMENT_GAP_MS = 5000;
  const announcementQueue = [];
  let isAnnouncing = false;
  let activeAudio = null;

  // Background Music
  let bgMusic = null;
  const NORMAL_BG_VOLUME = 0.25;
  const DUCKED_BG_VOLUME = 0.05;

  function initBackgroundMusic() {
    try {
      if (!bgMusic) {
        bgMusic = new Audio(bgMusicAudio);
        bgMusic.loop = true;
        bgMusic.volume = NORMAL_BG_VOLUME;
      }
      const playPromise = bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was blocked by browser policy; start upon first interaction
          const unlockAudio = () => {
            if (bgMusic && voiceEnabled.value) {
              bgMusic.play().catch(() => {});
            }
            window.removeEventListener("click", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
            window.removeEventListener("touchstart", unlockAudio);
          };
          window.addEventListener("click", unlockAudio, { once: true });
          window.addEventListener("keydown", unlockAudio, { once: true });
          window.addEventListener("touchstart", unlockAudio, { once: true });
        });
      }
    } catch (err) {
      console.error("Failed to start background music:", err);
    }
  }

  function pauseBackgroundMusic() {
    if (bgMusic) {
      bgMusic.pause();
    }
  }

  function duckBackgroundMusic() {
    if (bgMusic) {
      bgMusic.volume = DUCKED_BG_VOLUME;
    }
  }

  function restoreBackgroundMusic() {
    if (bgMusic) {
      bgMusic.volume = NORMAL_BG_VOLUME;
    }
  }

  function getLaneAudioSrc(laneName) {
    if (!laneName) return null;
    const lower = laneName.toLowerCase();
    if (lower.includes("lane 1") || lower.includes("auto feeder")) {
      return lane1Audio;
    }
    if (lower.includes("lane 3")) {
      return lane3Audio;
    }
    if (lower.includes("lane 4")) {
      return lane4Audio;
    }
    if (lower.includes("lane 5")) {
      return lane5Audio;
    }
    return null;
  }

  function playAudio(src, onEnd) {
    try {
      activeAudio = new Audio(src);
      activeAudio.volume = 1;
      activeAudio.onended = () => {
        activeAudio = null;
        onEnd?.();
      };
      activeAudio.onerror = (error) => {
        console.error("Audio playback error:", error);
        activeAudio = null;
        onEnd?.();
      };
      const playPromise = activeAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error("Audio play prevented:", err);
          activeAudio = null;
          onEnd?.();
        });
      }
    } catch (error) {
      console.error("Error initializing audio playback:", error);
      activeAudio = null;
      onEnd?.();
    }
  }

  function speak(text, onEnd) {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      onEnd?.();
      return;
    }
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-AU";
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onend = () => onEnd?.();
      utterance.onerror = () => onEnd?.();
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error speaking voice alert:", error);
      onEnd?.();
    }
  }

  function processAnnouncementQueue() {
    if (isAnnouncing) return;
    const item = announcementQueue.shift();
    if (!item) return;
    isAnnouncing = true;
    duckBackgroundMusic();

    const onDone = () => {
      restoreBackgroundMusic();
      setTimeout(() => {
        isAnnouncing = false;
        processAnnouncementQueue();
      }, ANNOUNCEMENT_GAP_MS);
    };

    if (typeof item === "object" && item?.audioSrc) {
      playAudio(item.audioSrc, onDone);
    } else {
      const text = typeof item === "string" ? item : item?.text;
      speak(text, onDone);
    }
  }

  function enqueueAnnouncement(item) {
    if (!voiceEnabled.value) return;
    announcementQueue.push(item);
    processAnnouncementQueue();
  }

  function toggleVoiceAlerts() {
    voiceEnabled.value = !voiceEnabled.value;
    if (voiceEnabled.value) {
      // Unlock the speech synthesis engine (some browsers require a
      // user-gesture-triggered utterance before it will speak later).
      enqueueAnnouncement("Voice alerts enabled.");
      if (bgMusic) {
        bgMusic.play().catch(() => {});
      }
    } else {
      announcementQueue.length = 0;
      isAnnouncing = false;
      if (activeAudio) {
        activeAudio.pause();
        activeAudio = null;
      }
      pauseBackgroundMusic();
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  }

  // Parses time strings like "14:30" (24h) or "2:30 PM" (12h) into minutes-of-day.
  function parseTimeStringToMinutes(str) {
    if (!str) return null;
    const s = String(str).trim();
    const ampmMatch = s.match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
    if (ampmMatch) {
      let h = parseInt(ampmMatch[1], 10);
      const m = parseInt(ampmMatch[2], 10);
      const period = ampmMatch[3].toLowerCase();
      if (period === "pm" && h !== 12) h += 12;
      if (period === "am" && h === 12) h = 0;
      return h * 60 + m;
    }
    const hhmmMatch = s.match(/^(\d{1,2}):(\d{2})$/);
    if (hhmmMatch) {
      return parseInt(hhmmMatch[1], 10) * 60 + parseInt(hhmmMatch[2], 10);
    }
    return null;
  }

  function getSydneyNowParts() {
    const tz = dashboardData.value?.timezone || "Australia/Sydney";
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-AU", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const dateStr = now.toLocaleDateString("en-AU", { timeZone: tz });
    return { minutes: parseTimeStringToMinutes(timeStr), dateStr };
  }

  // Checks every resource's current/next session and speaks a voice alert
  // as it crosses each entry in ALERT_CHECKPOINTS_MINUTES (e.g. 15, 10, then
  // 5 minutes out), so multiple heads-up announcements fire per session.
  // Each checkpoint is only alerted once (tracked via alertedSessionKeys).
  function checkSessionAlerts() {
    if (!voiceEnabled.value) return;
    const { minutes: nowMinutes, dateStr } = getSydneyNowParts();
    if (nowMinutes == null) return;

    resources.value.forEach((resource) => {
      const laneName = resource.title;

      // Current session ending soon
      const current = resource.currentSession;
      if (current?.endTime) {
        const endMinutes = parseTimeStringToMinutes(current.endTime);
        if (endMinutes != null) {
          const remaining = endMinutes - nowMinutes;
          ALERT_CHECKPOINTS_MINUTES.forEach((checkpoint) => {
            const key = `end_${checkpoint}_${resource._id}_${dateStr}_${current.startTime}_${current.endTime}`;
            if (
              remaining > 0 &&
              remaining <= checkpoint &&
              !alertedSessionKeys.has(key)
            ) {
              alertedSessionKeys.add(key);
              const audioSrc = getLaneAudioSrc(laneName);
              if (audioSrc) {
                enqueueAnnouncement({ audioSrc });
              } else {
                const message = `Attention. ${laneName} has ${remaining} minutes remaining.`;
                enqueueAnnouncement(message);
              }
            }
          });

          // Session has just ended
          const endedKey = `ended_${resource._id}_${dateStr}_${current.startTime}_${current.endTime}`;
          if (
            remaining <= 0 &&
            remaining > -5 &&
            !alertedSessionKeys.has(endedKey)
          ) {
            alertedSessionKeys.add(endedKey);
            enqueueAnnouncement(
              `Your session at ${laneName} has ended. Thank you for playing.`,
            );
          }
        }
      }
    });
  }

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

  // Small looping canvas animation in the header to keep the TV display
  // active. Some TV/kiosk models power off when the screen appears static.
  function startKeepAwakeAnimation() {
    const canvas = keepAwakeCanvas.value;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let angle = 0;

    function draw() {
      angle = (angle + 0.04) % (Math.PI * 2);
      ctx.clearRect(0, 0, 48, 48);
      ctx.save();
      ctx.translate(24, 24);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#10b981";
      ctx.fill();
      ctx.strokeStyle = "#6ee7b7";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.lineTo(14, 0);
      ctx.stroke();
      ctx.restore();
      keepAwakeRafId = requestAnimationFrame(draw);
    }
    draw();
  }

  async function fetchDashboard() {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response = await GetSessionDashboard(CENTER_ID);
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
        checkSessionAlerts();
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
    // Check alert thresholds more frequently than the data poll so alerts
    // fire close to the exact minute, using the last fetched resources.
    alertCheckInterval = setInterval(checkSessionAlerts, 15000);
    startKeepAwakeAnimation();
    initBackgroundMusic();
    document.addEventListener("fullscreenchange", onFullscreenChange);
  });

  onUnmounted(() => {
    if (clockInterval) clearInterval(clockInterval);
    if (pollInterval) clearInterval(pollInterval);
    if (alertCheckInterval) clearInterval(alertCheckInterval);
    if (keepAwakeRafId) cancelAnimationFrame(keepAwakeRafId);
    announcementQueue.length = 0;
    isAnnouncing = false;
    if (activeAudio) {
      activeAudio.pause();
      activeAudio = null;
    }
    pauseBackgroundMusic();
    bgMusic = null;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    document.removeEventListener("fullscreenchange", onFullscreenChange);
  });
</script>

<style scoped>
  .tabular-nums {
    font-variant-numeric: tabular-nums;
  }
</style>
