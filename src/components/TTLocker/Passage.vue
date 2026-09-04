<template>
  <main
    class="bg-gradient-to-br from-gray-300 to-green-900 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <!-- main section -->
    <div class="gap-4 pr-0 md:pr-24 mt-5 max-w-5xl mx-auto">
      <div class="flex items-center gap-3 mb-4">
        <router-link
          to="/ttlocker/home"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-800 hover:text-[#1a3a35]"
        >
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to control
        </router-link>
        <span class="text-gray-400">/</span>
        <span class="text-sm font-bold text-[#1a3a35]">
          {{ centerCode || "Select a centre" }}
        </span>
      </div>

      <h1 class="md:text-2xl sm:text-xl font-bold text-gray-900 mb-6">
        {{ centerCode ? `${centerCode} Passage` : "Passage" }}
      </h1>

      <!-- Missing centre selection -->
      <div
        v-if="!centerCode"
        class="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 text-center"
      >
        <div
          class="w-16 h-16 rounded-full bg-gray-50 mx-auto mb-4 flex items-center justify-center"
        >
          <svg
            class="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </div>
        <p class="text-gray-600 font-medium">Please select a centre</p>
        <div class="flex flex-wrap justify-center gap-3 mt-4">
          <router-link
            v-for="c in centres"
            :key="c"
            :to="`/ttlocker/passage/${c}`"
            class="inline-flex items-center justify-center w-32 py-3 rounded-xl bg-[#1a3a35] text-white font-semibold hover:bg-[#2a4a45] transition-colors"
          >
            {{ c }}
          </router-link>
        </div>
      </div>

      <!-- Main content -->
      <template v-else>
        <!-- centre tabs -->
        <div class="flex gap-2 mb-6">
          <router-link
            v-for="c in centres"
            :key="c"
            :to="`/ttlocker/passage/${c}`"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-semibold transition-colors',
              c === centerCode
                ? 'bg-[#1a3a35] text-white shadow'
                : 'bg-white/90 text-gray-700 hover:bg-white',
            ]"
          >
            {{ c }}
          </router-link>
        </div>

        <!-- current status card -->
        <div
          class="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-6"
        >
          <div
            class="h-1.5 w-full"
            :class="
              passage.passageMode === 1
                ? 'bg-gradient-to-r from-emerald-400 to-green-600'
                : 'bg-gradient-to-r from-gray-300 to-gray-500'
            "
          ></div>
          <div class="p-6 md:p-8">
            <div
              class="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                  :class="
                    passage.passageMode === 1
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-gray-100 text-gray-500'
                  "
                >
                  <svg
                    v-if="isLoadingPassage"
                    class="w-8 h-8 animate-spin"
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
                    v-else-if="passage.passageMode === 1"
                    class="w-8 h-8"
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
                  <svg
                    v-else
                    class="w-8 h-8"
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
                <div>
                  <p
                    class="text-xs font-bold uppercase tracking-wider text-gray-400"
                  >
                    Passage mode
                  </p>
                  <h2 class="text-2xl font-black text-gray-900">
                    {{
                      passage.passageMode === 1
                        ? "ON"
                        : passage.passageMode === 2
                          ? "OFF"
                          : "Not set"
                    }}
                  </h2>
                  <p
                    v-if="passage.lockId"
                    class="text-xs text-gray-400 mt-0.5 font-mono"
                  >
                    Lock #{{ passage.lockId }}
                  </p>
                </div>
              </div>

              <div class="text-sm text-gray-600">
                <p v-if="passage.applied?.startTimeText">
                  <span class="font-semibold text-gray-900">{{
                    passage.applied.startTimeText
                  }}</span>
                  -
                  <span class="font-semibold text-gray-900">{{
                    passage.applied.endTimeText
                  }}</span>
                </p>
                <p
                  v-if="passage.applied?.weekDaysText?.length"
                  class="mt-1 capitalize"
                >
                  {{ passage.applied.weekDaysText.join(", ") }}
                </p>
                <p
                  v-if="passage.checkedAt"
                  class="text-xs text-gray-400 mt-1"
                >
                  Updated {{ fmtDateTime(passage.checkedAt) }}
                </p>
              </div>
            </div>

            <!-- message banner -->
            <transition name="fade">
              <div
                v-if="message"
                class="mt-6 px-4 py-3 rounded-xl text-sm flex items-start gap-2"
                :class="
                  messageType === 'error'
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
                    v-if="messageType === 'error'"
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
                <span>{{ message }}</span>
              </div>
            </transition>

            <!-- quick actions -->
            <div class="flex gap-3 mt-6">
              <button
                @click="setPassageMode(1)"
                :disabled="isSaving"
                class="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-white shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                :class="
                  passage.passageMode === 1
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-gradient-to-r from-[#1a3a35] to-green-600 hover:opacity-90'
                "
              >
                <svg
                  v-if="isSaving && intendedMode === 1"
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
                <span>Turn ON</span>
              </button>
              <button
                @click="deletePassageMode"
                :disabled="isSaving"
                class="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-2xl font-bold border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <svg
                  v-if="isSaving && intendedMode === 0"
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
                <span>Turn OFF</span>
              </button>
              <button
                @click="fetchPassageMode"
                :disabled="isLoadingPassage"
                title="Refresh status"
                class="w-14 inline-flex items-center justify-center rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <svg
                  class="w-5 h-5"
                  :class="{ 'animate-spin': isLoadingPassage }"
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
          </div>
        </div>

        <!-- schedule configuration -->
        <div
          class="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-1">Passage schedule</h3>
          <p class="text-sm text-gray-500 mb-6">
            Set the time window and days when the entrance should stay unlocked.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- start time -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Start time
              </label>
              <input
                v-model="startTime"
                type="time"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent"
              />
            </div>
            <!-- end time -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                End time
              </label>
              <input
                v-model="endTime"
                type="time"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent"
              />
            </div>
          </div>

          <!-- weekdays -->
          <div class="mb-8">
            <label class="block text-sm font-semibold text-gray-700 mb-3">
              Active days
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="(day, idx) in dayLabels"
                :key="day"
                type="button"
                @click="toggleDay(idx + 1)"
                :class="[
                  'px-4 py-2 rounded-xl text-sm font-semibold transition-colors',
                  selectedDays.includes(idx + 1)
                    ? 'bg-[#1a3a35] text-white shadow'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
                ]"
              >
                {{ day }}
              </button>
            </div>
          </div>

          <!-- options -->
          <div class="flex flex-wrap gap-3 mb-6">
            <label
              class="inline-flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl text-sm text-gray-700 cursor-pointer"
            >
              <input
                v-model="config.type"
                type="radio"
                :value="2"
                class="w-4 h-4 text-[#1a3a35] focus:ring-[#1a3a35]"
              />
              Gateway control
            </label>
            <label
              class="inline-flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl text-sm text-gray-700 cursor-pointer"
            >
              <input
                v-model="config.autoUnlock"
                type="checkbox"
                true-value="1"
                false-value="0"
                class="w-4 h-4 text-[#1a3a35] focus:ring-[#1a3a35] rounded"
              />
              Auto unlock at start time
            </label>
          </div>

          <button
            @click="applySchedule"
            :disabled="isSaving"
            class="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#1a3a35] to-green-600 hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg
              v-if="isSaving && intendedMode === null"
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
            <span>Apply schedule & turn ON</span>
          </button>
        </div>
      </template>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, watch, onMounted, onUnmounted } from "vue";
  import { useRouter } from "vue-router";
  import {
    GetTTPassageModeControl,
    SetTTPassageModeControl,
    DeleteTTPassageModeControl,
  } from "@/services/apiService.js";
  import Nav from "../TTLocker/UI/SecondNav.vue";

  const props = defineProps({
    centerCode: {
      type: String,
      default: "",
    },
  });

  const router = useRouter();
  const centres = ["CRANBOURNE", "HALLAM"];
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const passage = ref({});
  const isLoadingPassage = ref(false);
  const isSaving = ref(false);
  const intendedMode = ref(null);
  const message = ref("");
  const messageType = ref("success");
  let messageTimer = null;
  let pollTimer = null;

  const config = ref({
    type: 2,
    autoUnlock: 1,
    isAllDay: 2,
  });

  const startTime = ref("09:00");
  const endTime = ref("18:00");
  const selectedDays = ref([1, 2, 3, 4, 5]);

  function minutesFromTime(timeStr) {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + (m || 0);
  }

  function timeFromMinutes(mins) {
    const h = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  function toggleDay(day) {
    if (selectedDays.value.includes(day)) {
      selectedDays.value = selectedDays.value.filter((d) => d !== day);
    } else {
      selectedDays.value = [...selectedDays.value, day].sort((a, b) => a - b);
    }
  }

  function setMessage(text, type = "success") {
    message.value = text;
    messageType.value = type;
    clearTimeout(messageTimer);
    messageTimer = setTimeout(() => (message.value = ""), 5000);
  }

  function applyResponse(res) {
    if (res.isSuccess && res.value) {
      passage.value = res.value;
      if (res.value.applied) {
        config.value.type = res.value.applied.type ?? 2;
        config.value.autoUnlock = res.value.applied.autoUnlock ?? 1;
        config.value.isAllDay = res.value.applied.isAllDay ?? 2;
        if (res.value.applied.startTimeText) {
          startTime.value = res.value.applied.startTimeText;
        } else if (res.value.applied.startDate != null) {
          startTime.value = timeFromMinutes(res.value.applied.startDate);
        }
        if (res.value.applied.endTimeText) {
          endTime.value = res.value.applied.endTimeText;
        } else if (res.value.applied.endDate != null) {
          endTime.value = timeFromMinutes(res.value.applied.endDate);
        }
        selectedDays.value = res.value.applied.weekDays || [1, 2, 3, 4, 5];
      }
    } else {
      setMessage(
        res.errorMessage || res.userMessage || "Failed to fetch passage mode.",
        "error",
      );
    }
  }

  async function fetchPassageMode() {
    if (!props.centerCode) return;
    isLoadingPassage.value = true;
    try {
      const res = await GetTTPassageModeControl(props.centerCode);
      applyResponse(res);
    } catch (error) {
      setMessage("Network error while fetching passage mode.", "error");
    } finally {
      isLoadingPassage.value = false;
    }
  }

  async function setPassageMode(mode) {
    if (!props.centerCode) return;
    isSaving.value = true;
    intendedMode.value = mode;
    try {
      const payload = {
        centerCode: props.centerCode,
        passageMode: mode,
        type: config.value.type,
        autoUnlock: config.value.autoUnlock,
        isAllDay: config.value.isAllDay,
        startDate: minutesFromTime(startTime.value),
        endDate: minutesFromTime(endTime.value),
        weekDays: selectedDays.value,
      };
      const res = await SetTTPassageModeControl(payload);
      if (res.isSuccess) {
        setMessage(
          res.userMessage || `Passage mode turned ${mode === 1 ? "ON" : "OFF"}`,
        );
        applyResponse(res);
      } else {
        setMessage(
          res.errorMessage ||
            res.userMessage ||
            "Failed to update passage mode.",
          "error",
        );
      }
    } catch (error) {
      setMessage("Network error. Please try again.", "error");
    } finally {
      isSaving.value = false;
      intendedMode.value = null;
    }
  }

  async function applySchedule() {
    await setPassageMode(1);
  }

  async function deletePassageMode() {
    if (!props.centerCode) return;
    isSaving.value = true;
    intendedMode.value = 0;
    try {
      const res = await DeleteTTPassageModeControl(props.centerCode);
      if (res.isSuccess) {
        setMessage(res.userMessage || "Passage mode turned OFF");
        await fetchPassageMode();
      } else {
        setMessage(
          res.errorMessage ||
            res.userMessage ||
            "Failed to turn off passage mode.",
          "error",
        );
      }
    } catch (error) {
      setMessage("Network error. Please try again.", "error");
    } finally {
      isSaving.value = false;
      intendedMode.value = null;
    }
  }

  // Redirect a blank/invalid code back to control
  watch(
    () => props.centerCode,
    (code) => {
      if (code && !centres.includes(code)) {
        router.replace("/ttlocker/home");
      } else if (code) {
        fetchPassageMode();
      }
    },
    { immediate: true },
  );

  onMounted(() => {
    if (props.centerCode) {
      pollTimer = setInterval(fetchPassageMode, 30000);
    }
  });
  onUnmounted(() => {
    clearInterval(pollTimer);
    clearTimeout(messageTimer);
  });

  function fmtTime(d) {
    if (!d) return "--";
    return new Date(d).toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  function fmtDate(d) {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
  function fmtDateTime(d) {
    if (!d) return "--";
    return `${fmtDate(d)} ${fmtTime(d)}`;
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
