<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h1 class="text-2xl font-bold text-[#1a3a35]">Available Slots</h1>
          <p class="text-sm text-gray-500 mt-1">
            5:00 PM – 10:30 PM · All resources
          </p>
        </div>
        <!-- Date Picker + PDF -->
        <div class="flex items-center gap-2 flex-wrap">
          <button
            @click="prevDay"
            class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <input
            type="date"
            v-model="selectedDate"
            class="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-[#1a3a35] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
          <button
            @click="nextDay"
            class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            @click="goToToday"
            class="px-3 py-2 text-xs font-semibold bg-[#1a3a35] text-white rounded-lg hover:bg-[#2a4a45] transition-colors"
          >
            Today
          </button>
          <button
            @click="downloadPDF"
            class="px-3 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            PDF
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoadingSlots" class="flex items-center justify-center py-20">
        <div class="w-8 h-8 border-3 border-[#1a3a35] border-t-transparent rounded-full animate-spin"></div>
        <span class="ml-3 text-sm text-gray-500">Loading slots...</span>
      </div>

      <!-- No Resources -->
      <div v-else-if="resources.length === 0" class="text-center py-20">
        <p class="text-gray-500 text-sm">No resources found.</p>
      </div>

      <!-- Schedule Grid -->
      <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <!-- Summary bar -->
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
          <h2 class="text-base font-semibold text-[#1a3a35]">{{ formattedDate }}</h2>
          <div class="flex items-center gap-5 text-xs text-gray-600">
            <span class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 inline-block"></span>
              Available (click to book)
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded bg-red-50 border border-red-200 inline-block"></span>
              Booked
            </span>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th
                  class="sticky left-0 z-20 bg-[#1a3a35] text-white px-5 py-3 text-left font-semibold min-w-[110px] border-r border-[#2a4a45]"
                >
                  Time
                </th>
                <th
                  v-for="r in resources"
                  :key="r._id"
                  class="bg-[#1a3a35] text-white px-4 py-3 text-center font-semibold min-w-[130px] border-r border-[#2a4a45] last:border-r-0"
                >
                  {{ r.title || r.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(time, idx) in timeRows"
                :key="time"
                :class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'"
                class="border-b border-gray-100 last:border-b-0"
              >
                <!-- Time label -->
                <td
                  class="sticky left-0 z-10 bg-inherit px-5 py-2.5 font-semibold text-gray-700 border-r border-gray-100 text-xs whitespace-nowrap"
                >
                  {{ time }}
                </td>
                <!-- Resource cells -->
                <td
                  v-for="r in resources"
                  :key="r._id"
                  class="px-3 py-2 text-center border-r border-gray-50 last:border-r-0"
                >
                  <button
                    v-if="getSlotStatus(r._id, time) === 'available'"
                    @click="openBookingModal({ time }, r._id)"
                    class="w-full px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 hover:border-emerald-400 hover:shadow-sm transition-all"
                  >
                    Available
                  </button>
                  <span
                    v-else-if="getSlotStatus(r._id, time) === 'booked'"
                    class="block w-full px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-400 text-xs select-none"
                  >
                    Booked
                  </span>
                  <span v-else class="text-gray-300 text-xs select-none">—</span>
                </td>
              </tr>
              <!-- Empty when no time rows (all past today) -->
              <tr v-if="timeRows.length === 0">
                <td
                  :colspan="resources.length + 1"
                  class="text-center py-12 text-gray-500 text-sm"
                >
                  No upcoming slots for today's time range.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Booking Modal -->
    <div
      v-if="showBookingModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click="closeBookingModal"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-[#1a3a35] to-[#2a4a45] px-6 py-4 sticky top-0 z-10">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold text-white">New Appointment</h3>
            <button
              @click="closeBookingModal"
              class="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Prefilled Info -->
          <div class="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-[#1a3a35]">{{ selectedResourceName }}</p>
              <p class="text-xs text-gray-500">{{ formattedDate }} at {{ modalSlotTime }}</p>
            </div>
          </div>

          <!-- Step 1: User Search -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Step 1: Search & Select User <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="userSearchQuery"
                @input="searchUsers"
                type="text"
                placeholder="Search by name or email..."
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
              />
              <div
                v-if="userSearchResults.length > 0"
                class="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
              >
                <div
                  v-for="user in userSearchResults"
                  :key="user._id"
                  @click="selectUser(user)"
                  class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <p class="font-medium text-gray-900">{{ user.name }}</p>
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                </div>
              </div>
            </div>
            <div v-if="selectedUser" class="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-semibold text-gray-900">{{ selectedUser.name }}</p>
                  <p class="text-sm text-gray-600">{{ selectedUser.email }}</p>
                  <p class="text-sm text-gray-600">{{ selectedUser.phoneNumber }}</p>
                </div>
                <button @click="selectedUser = null" class="text-red-500 hover:text-red-700">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Step 2: Select Service -->
          <div v-if="selectedUser">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Step 2: Select Service <span class="text-red-500">*</span>
            </label>
            <select
              v-model="bookingForm.categoryId"
              @change="onServiceChange"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
            >
              <option value="">Select a service...</option>
              <option v-for="service in services" :key="service._id" :value="service._id">
                {{ service.title }} ({{ service.duration }}) - ${{ service.price }}
              </option>
            </select>

            <div v-if="bookingForm.categoryId" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-semibold text-blue-900">Duration Adjustment</h4>
                <span class="text-xs text-blue-600">Minimum: 1 hour</span>
              </div>
              <div class="flex items-center gap-4">
                <button
                  @click="decreaseDuration"
                  :disabled="customDurationMinutes <= 60"
                  class="w-10 h-10 bg-white border border-blue-300 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <div class="flex-1 text-center">
                  <p class="text-2xl font-bold text-blue-900">{{ formatDurationMinutes(customDurationMinutes) }}</p>
                  <p class="text-xs text-blue-600 mt-1">{{ customDurationMinutes }} minutes</p>
                </div>
                <button
                  @click="increaseDuration"
                  class="w-10 h-10 bg-white border border-blue-300 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-all"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            <div v-if="bookingForm.categoryId" class="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-semibold text-green-900">Calculated Price</p>
                  <p class="text-xs text-green-600 mt-1">Based on {{ formatDurationMinutes(customDurationMinutes) }} duration</p>
                </div>
                <div class="text-right">
                  <p class="text-3xl font-bold text-green-700">${{ calculatePrice() }}</p>
                  <p class="text-xs text-green-600">Total amount</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Select Resource (pre-filled) -->
          <div v-if="bookingForm.categoryId">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Step 3: Resource <span class="text-red-500">*</span>
            </label>
            <select
              v-model="bookingForm.resourceId"
              @change="onResourceChange"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
            >
              <option value="">Select a resource...</option>
              <option v-for="r in filteredResources" :key="r._id" :value="r._id">
                {{ r.title || r.name }}
              </option>
            </select>
          </div>

          <!-- Step 4: Select Date (pre-filled) -->
          <div v-if="bookingForm.resourceId">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Step 4: Select Date <span class="text-red-500">*</span>
            </label>
            <input
              v-model="bookingForm.date"
              @change="onDateChange"
              type="date"
              :min="new Date().toISOString().split('T')[0]"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
            />
          </div>

          <!-- Step 5: Select Time Slot -->
          <div v-if="bookingForm.date && modalAvailableSlots.length > 0">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Step 5: Select Time Slot <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-3 md:grid-cols-4 gap-2">
              <button
                v-for="slot in modalAvailableSlots"
                :key="slot.time"
                @click="bookingForm.startTime = slot.time"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  bookingForm.startTime === slot.time
                    ? 'bg-[#1a3a35] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                {{ slot.time }}
              </button>
            </div>
          </div>

          <div v-if="bookingForm.date && loadingModalSlots" class="text-center py-4">
            <div class="inline-block w-6 h-6 border-2 border-[#1a3a35] border-t-transparent rounded-full animate-spin"></div>
            <p class="text-sm text-gray-500 mt-2">Loading available slots...</p>
          </div>

          <div
            v-if="bookingForm.date && modalAvailableSlots.length === 0 && !loadingModalSlots"
            class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
          >
            <p class="text-yellow-800 text-sm">No available slots for this date. Please select another date.</p>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 sticky bottom-0">
          <div class="flex gap-3">
            <button
              @click="closeBookingModal"
              :disabled="isSubmitting"
              class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              @click="submitBooking"
              :disabled="!canCreateBooking || isSubmitting"
              class="flex-1 px-6 py-3 bg-[#1a3a35] text-white rounded-lg font-medium hover:bg-[#2a4a45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="isSubmitting" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {{ isSubmitting ? "Creating..." : "Create Appointment" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Popup -->
    <div v-if="showSuccess" class="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-[#1a3a35] mb-1">{{ successMessage }}</h3>
        <button
          @click="showSuccess = false"
          class="mt-4 px-6 py-2 bg-[#1a3a35] text-white rounded-xl text-sm font-medium hover:bg-[#2a4a45]"
        >
          OK
        </button>
      </div>
    </div>

    <!-- Error Popup -->
    <div v-if="showError" class="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-red-600 mb-1">{{ errorMessage }}</h3>
        <button
          @click="showError = false"
          class="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import jsPDF from "jspdf";
  import autoTable from "jspdf-autotable";
  import {
    GetResources,
    GetUnbookingSlots,
    GetUsersAll,
    GetServices,
    GetBookingSlots,
    CreateBooking,
  } from "@/services/apiService.js";
  import Nav from "@/components/Dashboard/UI/SecondNav.vue";

  // ─── Config ───
  const SLOT_START = 17 * 60;      // 5:00 PM in minutes
  const SLOT_END   = 22 * 60 + 30; // 10:30 PM in minutes
  const SLOT_STEP  = 30;           // 30-minute increments

  // ─── State ───
  const resources        = ref([]);
  const selectedDate     = ref(getAustralianDateISO());
  const allResourceSlots = ref({});   // { resourceId: { "5:00 pm": true/false } }
  const isLoadingSlots   = ref(false);

  // Modal context
  const selectedResourceId  = ref("");
  const showBookingModal     = ref(false);
  const modalSlotTime        = ref("");
  const isSubmitting         = ref(false);

  // User search
  const userSearchQuery   = ref("");
  const allUsers          = ref([]);
  const userSearchResults = ref([]);
  const selectedUser      = ref(null);

  // Services & modal slots
  const services              = ref([]);
  const customDurationMinutes = ref(60);
  const modalAvailableSlots   = ref([]);
  const loadingModalSlots     = ref(false);

  // Booking form
  const bookingForm = ref({
    userId: "",
    categoryId: "",
    resourceId: "",
    date: "",
    startTime: "",
  });

  // Popups
  const showSuccess    = ref(false);
  const successMessage = ref("");
  const showError      = ref(false);
  const errorMessage   = ref("");

  // ─── Computed ───
  const timeRows = computed(() => {
    const nowAU     = new Date(new Date().toLocaleString("en-US", { timeZone: "Australia/Melbourne" }));
    const todayISO  = formatDateISO(nowAU);
    const nowMins   = nowAU.getHours() * 60 + nowAU.getMinutes();
    const rows = [];
    for (let m = SLOT_START; m <= SLOT_END; m += SLOT_STEP) {
      if (selectedDate.value === todayISO && m <= nowMins) continue;
      rows.push(minutesToTime12(m));
    }
    return rows;
  });

  const selectedResourceName = computed(() => {
    const r = resources.value.find((r) => r._id === selectedResourceId.value);
    return r ? r.title || r.name : "";
  });

  const formattedDate = computed(() => {
    if (!selectedDate.value) return "";
    const d = new Date(selectedDate.value + "T00:00:00");
    return d.toLocaleDateString("en-AU", {
      weekday: "short", day: "numeric", month: "short", year: "numeric",
    });
  });

  const filteredResources = computed(() => {
    if (!bookingForm.value.categoryId) return [];
    const svc = services.value.find((s) => s._id === bookingForm.value.categoryId);
    if (!svc || !svc.resources) return resources.value;
    const ids = svc.resources.map((r) => (typeof r === "string" ? r : r._id));
    return resources.value.filter((r) => ids.includes(r._id));
  });

  const canCreateBooking = computed(() =>
    selectedUser.value &&
    bookingForm.value.categoryId &&
    bookingForm.value.resourceId &&
    bookingForm.value.date &&
    bookingForm.value.startTime,
  );

  // ─── Helpers ───
  function getAustralianDateISO() {
    return formatDateISO(new Date(new Date().toLocaleString("en-US", { timeZone: "Australia/Melbourne" })));
  }

  function formatDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function minutesToTime12(totalMinutes) {
    const hours  = Math.floor(totalMinutes / 60);
    const mins   = totalMinutes % 60;
    const period = hours >= 12 ? "pm" : "am";
    const h      = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${h}:${String(mins).padStart(2, "0")} ${period}`;
  }

  function normalizeTime(t) {
    return (t || "").toLowerCase().trim();
  }

  function getSlotStatus(resourceId, time) {
    const map = allResourceSlots.value[resourceId];
    if (!map) return "unknown";
    const key = normalizeTime(time);
    if (!(key in map)) return "unknown";
    return map[key] ? "available" : "booked";
  }

  function formatDurationMinutes(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h && m) return `${h}h ${m}m`;
    if (h) return `${h}h`;
    return `${m}m`;
  }

  function prevDay() {
    const d = new Date(selectedDate.value + "T00:00:00");
    d.setDate(d.getDate() - 1);
    selectedDate.value = formatDateISO(d);
  }

  function nextDay() {
    const d = new Date(selectedDate.value + "T00:00:00");
    d.setDate(d.getDate() + 1);
    selectedDate.value = formatDateISO(d);
  }

  function goToToday() {
    selectedDate.value = getAustralianDateISO();
  }

  // ─── API ───
  async function fetchResources() {
    try {
      const res = await GetResources();
      if (res.isSuccess) {
        resources.value = res.value || [];
        await fetchAllSlots();
      }
    } catch (e) {
      console.error("fetchResources:", e);
    }
  }

  async function fetchAllSlots() {
    if (!selectedDate.value || resources.value.length === 0) return;
    isLoadingSlots.value = true;
    allResourceSlots.value = {};
    try {
      const results = await Promise.all(
        resources.value.map((r) => GetUnbookingSlots(selectedDate.value, r._id)),
      );
      const map = {};
      resources.value.forEach((r, i) => {
        const slotMap = {};
        const res = results[i];
        if (res?.isSuccess && res.value) {
          res.value.forEach((s) => { slotMap[normalizeTime(s.time)] = s.available; });
        }
        map[r._id] = slotMap;
      });
      allResourceSlots.value = map;
    } catch (e) {
      console.error("fetchAllSlots:", e);
    } finally {
      isLoadingSlots.value = false;
    }
  }

  // ─── PDF Download ───
  function downloadPDF() {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(14);
    doc.setTextColor(26, 58, 53);
    doc.text(`Available Slots Schedule — ${formattedDate.value}`, 14, 14);

    const headers = ["Time", ...resources.value.map((r) => r.title || r.name)];
    const body = timeRows.value.map((time) => [
      time.toUpperCase(),
      ...resources.value.map((r) => {
        const s = getSlotStatus(r._id, time);
        return s === "available" ? "Available" : s === "booked" ? "Booked" : "—";
      }),
    ]);

    autoTable(doc, {
      head: [headers],
      body,
      startY: 20,
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: [26, 58, 53], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [245, 250, 248] },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 30 } },
      didParseCell(data) {
        if (data.section === "body" && data.column.index > 0) {
          if (data.cell.raw === "Available") {
            data.cell.styles.textColor = [5, 120, 75];
            data.cell.styles.fillColor = [236, 253, 245];
          } else if (data.cell.raw === "Booked") {
            data.cell.styles.textColor = [185, 28, 28];
            data.cell.styles.fillColor = [255, 245, 245];
          }
        }
      },
    });

    doc.save(`available-slots-${selectedDate.value}.pdf`);
  }

  // ─── Modal ───
  async function openBookingModal(slot, resourceId) {
    const resId = resourceId || "";
    selectedResourceId.value = resId;
    modalSlotTime.value = slot.time;
    selectedUser.value = null;
    userSearchQuery.value = "";
    userSearchResults.value = [];
    customDurationMinutes.value = 60;
    modalAvailableSlots.value = [];
    bookingForm.value = {
      userId: "",
      categoryId: "",
      resourceId: resId,
      date: selectedDate.value,
      startTime: slot.time,
    };
    showBookingModal.value = true;
    try {
      const [usersRes, servicesRes] = await Promise.all([GetUsersAll(), GetServices()]);
      if (usersRes.isSuccess) allUsers.value = usersRes.value || [];
      if (servicesRes.isSuccess) services.value = servicesRes.value || [];
    } catch (e) {
      console.error("openBookingModal:", e);
    }
  }

  function closeBookingModal() {
    if (!isSubmitting.value) showBookingModal.value = false;
  }

  function searchUsers() {
    if (!userSearchQuery.value.trim()) { userSearchResults.value = []; return; }
    const q = userSearchQuery.value.toLowerCase();
    userSearchResults.value = allUsers.value
      .filter((u) => (u.name || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q))
      .slice(0, 10);
  }

  function selectUser(user) {
    selectedUser.value = user;
    bookingForm.value.userId = user._id;
    userSearchQuery.value = "";
    userSearchResults.value = [];
  }

  async function onServiceChange() {
    bookingForm.value.resourceId = "";
    bookingForm.value.startTime = "";
    modalAvailableSlots.value = [];
    const svc = services.value.find((s) => s._id === bookingForm.value.categoryId);
    if (svc) {
      const dur = String(svc.duration || "");
      let mins = dur.includes("m") ? parseInt(dur) : dur.includes("h") ? parseInt(dur) * 60 : 0;
      customDurationMinutes.value = Math.max(mins, 60);
    }
    // Re-apply prefilled resource if compatible
    const valid = filteredResources.value.find((r) => r._id === selectedResourceId.value);
    if (valid) {
      bookingForm.value.resourceId = selectedResourceId.value;
      if (selectedDate.value) {
        bookingForm.value.date = selectedDate.value;
        await fetchModalSlots();
        const match = modalAvailableSlots.value.find((s) => s.time === modalSlotTime.value);
        if (match) bookingForm.value.startTime = modalSlotTime.value;
      }
    }
  }

  function increaseDuration() { customDurationMinutes.value += 30; }
  function decreaseDuration() { if (customDurationMinutes.value > 60) customDurationMinutes.value -= 30; }

  function calculatePrice() {
    const svc = services.value.find((s) => s._id === bookingForm.value.categoryId);
    if (!svc) return 0;
    const dur = String(svc.duration || "");
    let base = dur.includes("m") ? parseInt(dur) : dur.includes("h") ? parseInt(dur) * 60 : 0;
    if (!base) return svc.price || 0;
    return Math.round((svc.price / base) * customDurationMinutes.value * 100) / 100;
  }

  function onResourceChange() {
    bookingForm.value.startTime = "";
    modalAvailableSlots.value = [];
    if (bookingForm.value.date) fetchModalSlots();
  }

  function onDateChange() {
    bookingForm.value.startTime = "";
    fetchModalSlots();
  }

  async function fetchModalSlots() {
    if (!bookingForm.value.resourceId || !bookingForm.value.date) return;
    loadingModalSlots.value = true;
    modalAvailableSlots.value = [];
    bookingForm.value.startTime = "";
    try {
      const res = await GetBookingSlots(bookingForm.value.date, bookingForm.value.resourceId);
      modalAvailableSlots.value = res.isSuccess && res.value ? res.value.filter((s) => s.available) : [];
    } catch (e) {
      console.error("fetchModalSlots:", e);
      modalAvailableSlots.value = [];
    } finally {
      loadingModalSlots.value = false;
    }
  }

  async function submitBooking() {
    if (!canCreateBooking.value) return;
    isSubmitting.value = true;
    try {
      const svc = services.value.find((s) => s._id === bookingForm.value.categoryId);
      if (!svc) { errorMessage.value = "Please select a valid service."; showError.value = true; return; }

      const [timePart, period] = bookingForm.value.startTime.split(" ");
      let [hours, minutes] = timePart.split(":").map(Number);
      if (period === "pm" && hours !== 12) hours += 12;
      if (period === "am" && hours === 12) hours = 0;

      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0);
      const endDate = new Date(startDate.getTime() + customDurationMinutes.value * 60000);

      const startTime24h = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      const endTime24h   = `${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`;

      const payload = {
        userId: selectedUser.value._id,
        serviceId: svc._id,
        categoryId: bookingForm.value.categoryId,
        resourceId: bookingForm.value.resourceId,
        date: bookingForm.value.date,
        startTime: startTime24h,
        endTime: endTime24h,
        duration: customDurationMinutes.value,
        paymentMethod: "local",
      };

      const res = await CreateBooking(payload);
      if (res.isSuccess) {
        successMessage.value = res.userMessage || "Appointment created successfully!";
        showSuccess.value = true;
        showBookingModal.value = false;
        setTimeout(() => { showSuccess.value = false; window.location.reload(); }, 1800);
      } else {
        errorMessage.value = res.userMessage || res.errorMessage || "Failed to create appointment.";
        showError.value = true;
      }
    } catch (e) {
      errorMessage.value = e.response?.data?.userMessage || e.response?.data?.errorMessage || "Failed to create appointment.";
      showError.value = true;
    } finally {
      isSubmitting.value = false;
    }
  }

  // ─── Watchers ───
  watch(selectedDate, () => { fetchAllSlots(); });

  // ─── Init ───
  onMounted(() => { fetchResources(); });
</script>
