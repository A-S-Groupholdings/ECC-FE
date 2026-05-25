<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <!-- Header -->
    <div class="max-w-7xl mx-auto">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h1 class="text-2xl font-bold text-[#1a3a35]">Available Slots</h1>
          <p class="text-sm text-gray-500 mt-1">
            View and manage available booking slots by resource
          </p>
        </div>
        <!-- Date Picker -->
        <div class="flex items-center gap-3">
          <button
            @click="prevDay"
            class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <svg
              class="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
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
            <svg
              class="w-4 h-4 text-gray-600"
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
          </button>
          <button
            @click="goToToday"
            class="px-3 py-2 text-xs font-semibold bg-[#1a3a35] text-white rounded-lg hover:bg-[#2a4a45] transition-colors"
          >
            Today
          </button>
        </div>
      </div>

      <!-- Resource Tabs -->
      <div
        class="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 p-1.5 overflow-x-auto"
      >
        <div class="flex gap-1 min-w-max">
          <button
            v-for="r in resources"
            :key="r._id"
            @click="selectResource(r._id)"
            class="px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
            :class="
              selectedResourceId === r._id
                ? 'bg-[#1a3a35] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-[#1a3a35]'
            "
          >
            {{ r.title || r.name }}
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div
        v-if="isLoadingSlots"
        class="flex items-center justify-center py-20"
      >
        <div
          class="w-8 h-8 border-3 border-[#1a3a35] border-t-transparent rounded-full animate-spin"
        ></div>
        <span class="ml-3 text-sm text-gray-500">Loading slots...</span>
      </div>

      <!-- No Resource Selected -->
      <div
        v-else-if="!selectedResourceId"
        class="text-center py-20"
      >
        <div
          class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p class="text-gray-500 text-sm">
          Select a resource above to view available slots.
        </p>
      </div>

      <!-- Slots Table -->
      <div
        v-else-if="availableSlots.length > 0"
        class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div
          class="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
        >
          <h2 class="text-base font-semibold text-[#1a3a35]">
            {{ selectedResourceName }} — {{ formattedDate }}
          </h2>
          <span
            class="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"
          >
            {{ availableSlots.length }} slots available
          </span>
        </div>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 p-5"
        >
          <button
            v-for="slot in availableSlots"
            :key="slot.time"
            @click="openBookingModal(slot)"
            class="group relative flex flex-col items-center justify-center px-3 py-4 rounded-xl border-2 border-emerald-100 bg-emerald-50/40 hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md transition-all cursor-pointer"
          >
            <span
              class="text-sm font-semibold text-[#1a3a35] group-hover:text-emerald-700"
            >
              {{ slot.time }}
            </span>
            <span
              class="text-[10px] text-emerald-600 mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
            >
              + Book
            </span>
          </button>
        </div>
      </div>

      <!-- No Slots -->
      <div
        v-else
        class="text-center py-20"
      >
        <div
          class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>
        <p class="text-gray-500 text-sm">
          No available slots for this resource on {{ formattedDate }}.
        </p>
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
        <div
          class="bg-gradient-to-r from-[#1a3a35] to-[#2a4a45] px-6 py-4 sticky top-0 z-10"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold text-white">New Appointment</h3>
            <button
              @click="closeBookingModal"
              class="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Prefilled Info -->
          <div class="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-5 h-5 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-[#1a3a35]">
                {{ selectedResourceName }}
              </p>
              <p class="text-xs text-gray-500">
                {{ formattedDate }} at {{ modalSlotTime }}
              </p>
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
            <div
              v-if="selectedUser"
              class="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-semibold text-gray-900">
                    {{ selectedUser.name }}
                  </p>
                  <p class="text-sm text-gray-600">{{ selectedUser.email }}</p>
                  <p class="text-sm text-gray-600">
                    {{ selectedUser.phoneNumber }}
                  </p>
                </div>
                <button
                  @click="selectedUser = null"
                  class="text-red-500 hover:text-red-700"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
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
              <option
                v-for="service in services"
                :key="service._id"
                :value="service._id"
              >
                {{ service.title }} ({{ service.duration }}) - ${{
                  service.price
                }}
              </option>
            </select>

            <div
              v-if="bookingForm.categoryId"
              class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-semibold text-blue-900">
                  Duration Adjustment
                </h4>
                <span class="text-xs text-blue-600">Minimum: 1 hour</span>
              </div>
              <div class="flex items-center gap-4">
                <button
                  @click="decreaseDuration"
                  :disabled="customDurationMinutes <= 60"
                  class="w-10 h-10 bg-white border border-blue-300 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <div class="flex-1 text-center">
                  <p class="text-2xl font-bold text-blue-900">
                    {{ formatDurationMinutes(customDurationMinutes) }}
                  </p>
                  <p class="text-xs text-blue-600 mt-1">
                    {{ customDurationMinutes }} minutes
                  </p>
                </div>
                <button
                  @click="increaseDuration"
                  class="w-10 h-10 bg-white border border-blue-300 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-all"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              v-if="bookingForm.categoryId"
              class="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-semibold text-green-900">
                    Calculated Price
                  </p>
                  <p class="text-xs text-green-600 mt-1">
                    Based on
                    {{ formatDurationMinutes(customDurationMinutes) }} duration
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-3xl font-bold text-green-700">
                    ${{ calculatePrice() }}
                  </p>
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
              <option
                v-for="r in filteredResources"
                :key="r._id"
                :value="r._id"
              >
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

          <div
            v-if="bookingForm.date && loadingModalSlots"
            class="text-center py-4"
          >
            <div
              class="inline-block w-6 h-6 border-2 border-[#1a3a35] border-t-transparent rounded-full animate-spin"
            ></div>
            <p class="text-sm text-gray-500 mt-2">Loading available slots...</p>
          </div>

          <div
            v-if="
              bookingForm.date &&
              modalAvailableSlots.length === 0 &&
              !loadingModalSlots
            "
            class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
          >
            <p class="text-yellow-800 text-sm">
              No available slots for this date. Please select another date.
            </p>
          </div>
        </div>

        <!-- Modal Footer -->
        <div
          class="px-6 py-4 bg-gray-50 border-t border-gray-200 sticky bottom-0"
        >
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
              <svg
                v-if="isSubmitting"
                class="w-5 h-5 animate-spin"
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
              {{ isSubmitting ? "Creating..." : "Create Appointment" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Popup -->
    <div
      v-if="showSuccess"
      class="fixed inset-0 z-[60] flex items-center justify-center px-4"
    >
      <div class="absolute inset-0 bg-black/40"></div>
      <div
        class="relative bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full"
      >
        <div
          class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center"
        >
          <svg
            class="w-8 h-8 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-[#1a3a35] mb-1">
          {{ successMessage }}
        </h3>
        <button
          @click="showSuccess = false"
          class="mt-4 px-6 py-2 bg-[#1a3a35] text-white rounded-xl text-sm font-medium hover:bg-[#2a4a45]"
        >
          OK
        </button>
      </div>
    </div>

    <!-- Error Popup -->
    <div
      v-if="showError"
      class="fixed inset-0 z-[60] flex items-center justify-center px-4"
    >
      <div class="absolute inset-0 bg-black/40"></div>
      <div
        class="relative bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full"
      >
        <div
          class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center"
        >
          <svg
            class="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M6 18L18 6M6 6l12 12"
            />
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
  import {
    GetResources,
    GetUnbookingSlots,
    GetUsersAll,
    GetServices,
    GetBookingSlots,
    CreateBooking,
  } from "@/services/apiService.js";
  import Nav from "@/components/Dashboard/UI/SecondNav.vue";

  // ─── State ───
  const resources = ref([]);
  const selectedResourceId = ref("");
  const selectedDate = ref(getAustralianDateISO());
  const slots = ref([]);
  const isLoadingSlots = ref(false);

  // Modal
  const showBookingModal = ref(false);
  const modalSlotTime = ref("");
  const isSubmitting = ref(false);

  // User search
  const userSearchQuery = ref("");
  const allUsers = ref([]);
  const userSearchResults = ref([]);
  const selectedUser = ref(null);

  // Services & Resources for modal
  const services = ref([]);
  const customDurationMinutes = ref(60);
  const modalAvailableSlots = ref([]);
  const loadingModalSlots = ref(false);

  // Form
  const bookingForm = ref({
    userId: "",
    categoryId: "",
    resourceId: "",
    date: "",
    startTime: "",
  });

  // Popups
  const showSuccess = ref(false);
  const successMessage = ref("");
  const showError = ref(false);
  const errorMessage = ref("");

  // ─── Computed ───
  const availableSlots = computed(() => {
    const all = slots.value.filter((s) => s.available === true);
    // If viewing today (Australian time), only show future slots
    const nowAU = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Australia/Melbourne" }),
    );
    const todayISO = formatDateISO(nowAU);
    if (selectedDate.value === todayISO) {
      const nowMinutes = nowAU.getHours() * 60 + nowAU.getMinutes();
      return all.filter((s) => {
        const slotMin = timeToMinutes12(s.time);
        return slotMin > nowMinutes;
      });
    }
    return all;
  });

  const selectedResourceName = computed(() => {
    const r = resources.value.find((r) => r._id === selectedResourceId.value);
    return r ? r.title || r.name : "";
  });

  const formattedDate = computed(() => {
    if (!selectedDate.value) return "";
    const d = new Date(selectedDate.value + "T00:00:00");
    return d.toLocaleDateString("en-AU", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  });

  const filteredResources = computed(() => {
    if (!bookingForm.value.categoryId) return [];
    const selectedService = services.value.find(
      (s) => s._id === bookingForm.value.categoryId,
    );
    if (!selectedService || !selectedService.resources) return resources.value;
    const serviceResourceIds = selectedService.resources.map((r) =>
      typeof r === "string" ? r : r._id,
    );
    return resources.value.filter((r) => serviceResourceIds.includes(r._id));
  });

  const canCreateBooking = computed(() => {
    return (
      selectedUser.value &&
      bookingForm.value.categoryId &&
      bookingForm.value.resourceId &&
      bookingForm.value.date &&
      bookingForm.value.startTime
    );
  });

  // ─── Helpers ───
  function getAustralianDateISO() {
    const nowAU = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Australia/Melbourne" }),
    );
    return formatDateISO(nowAU);
  }

  function timeToMinutes12(time12) {
    const [time, modifier] = time12.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier?.toLowerCase() === "pm" && hours !== 12) hours += 12;
    if (modifier?.toLowerCase() === "am" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  function formatDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
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

  function convertTo24(time12) {
    const [time, modifier] = time12.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier?.toLowerCase() === "pm" && hours !== 12) hours += 12;
    if (modifier?.toLowerCase() === "am" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  // ─── API Calls ───
  async function fetchResources() {
    try {
      const response = await GetResources();
      if (response.isSuccess) {
        resources.value = response.value || [];
        if (resources.value.length > 0 && !selectedResourceId.value) {
          selectedResourceId.value = resources.value[0]._id;
        }
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  }

  async function fetchSlots() {
    if (!selectedResourceId.value || !selectedDate.value) {
      slots.value = [];
      return;
    }
    isLoadingSlots.value = true;
    try {
      const response = await GetUnbookingSlots(
        selectedDate.value,
        selectedResourceId.value,
      );
      if (response.isSuccess) {
        slots.value = response.value || [];
      } else {
        slots.value = [];
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      slots.value = [];
    } finally {
      isLoadingSlots.value = false;
    }
  }

  function selectResource(id) {
    selectedResourceId.value = id;
  }

  // ─── Modal Logic (same as Calendar) ───
  async function openBookingModal(slot) {
    modalSlotTime.value = slot.time;
    selectedUser.value = null;
    userSearchQuery.value = "";
    userSearchResults.value = [];
    customDurationMinutes.value = 60;
    modalAvailableSlots.value = [];
    bookingForm.value = {
      userId: "",
      categoryId: "",
      resourceId: selectedResourceId.value,
      date: selectedDate.value,
      startTime: slot.time,
    };
    showBookingModal.value = true;
    try {
      const [usersRes, servicesRes] = await Promise.all([
        GetUsersAll(),
        GetServices(),
      ]);
      if (usersRes.isSuccess) allUsers.value = usersRes.value || [];
      if (servicesRes.isSuccess) services.value = servicesRes.value || [];
    } catch (error) {
      console.error("Error loading modal data:", error);
    }
  }

  function closeBookingModal() {
    if (!isSubmitting.value) {
      showBookingModal.value = false;
    }
  }

  function searchUsers() {
    if (!userSearchQuery.value.trim()) {
      userSearchResults.value = [];
      return;
    }
    const q = userSearchQuery.value.toLowerCase();
    userSearchResults.value = allUsers.value
      .filter(
        (u) =>
          (u.name || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q),
      )
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

    const selectedService = services.value.find(
      (s) => s._id === bookingForm.value.categoryId,
    );
    if (selectedService) {
      let durationMinutes = 0;
      const dur = String(selectedService.duration || "");
      if (dur.includes("m")) durationMinutes = parseInt(dur);
      else if (dur.includes("h")) durationMinutes = parseInt(dur) * 60;
      customDurationMinutes.value = Math.max(durationMinutes, 60);
    }

    // Re-apply prefilled resource if compatible
    if (selectedResourceId.value) {
      const valid = filteredResources.value.find(
        (r) => r._id === selectedResourceId.value,
      );
      if (valid) {
        bookingForm.value.resourceId = selectedResourceId.value;
        if (selectedDate.value) {
          bookingForm.value.date = selectedDate.value;
          await fetchModalSlots();
          // Try to re-select the original slot time
          if (modalSlotTime.value) {
            const match = modalAvailableSlots.value.find(
              (s) => s.time === modalSlotTime.value,
            );
            if (match) bookingForm.value.startTime = modalSlotTime.value;
          }
        }
      }
    }
  }

  function increaseDuration() {
    customDurationMinutes.value += 30;
  }

  function decreaseDuration() {
    if (customDurationMinutes.value > 60) customDurationMinutes.value -= 30;
  }

  function calculatePrice() {
    const selectedService = services.value.find(
      (s) => s._id === bookingForm.value.categoryId,
    );
    if (!selectedService) return 0;
    const basePrice = selectedService.price;
    let baseDuration = 0;
    const dur = String(selectedService.duration || "");
    if (dur.includes("m")) baseDuration = parseInt(dur);
    else if (dur.includes("h")) baseDuration = parseInt(dur) * 60;
    if (!baseDuration) return basePrice || 0;
    const perMin = basePrice / baseDuration;
    return Math.round(perMin * customDurationMinutes.value * 100) / 100;
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
      const response = await GetBookingSlots(
        bookingForm.value.date,
        bookingForm.value.resourceId,
      );
      if (response.isSuccess && response.value) {
        modalAvailableSlots.value = response.value.filter((s) => s.available);
      } else {
        modalAvailableSlots.value = [];
      }
    } catch (error) {
      console.error("Error fetching modal slots:", error);
      modalAvailableSlots.value = [];
    } finally {
      loadingModalSlots.value = false;
    }
  }

  async function submitBooking() {
    if (!canCreateBooking.value) return;
    isSubmitting.value = true;
    try {
      const selectedService = services.value.find(
        (s) => s._id === bookingForm.value.categoryId,
      );
      if (!selectedService) {
        errorMessage.value = "Please select a valid service.";
        showError.value = true;
        return;
      }

      const startTime12h = bookingForm.value.startTime;
      const durationMinutes = customDurationMinutes.value;

      // Convert 12h to 24h
      const [time, period] = startTime12h.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (period === "pm" && hours !== 12) hours += 12;
      if (period === "am" && hours === 12) hours = 0;

      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0);
      const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

      const startTime24h = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      const endTime24h = `${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`;

      const payload = {
        userId: selectedUser.value._id,
        serviceId: selectedService._id,
        categoryId: bookingForm.value.categoryId,
        resourceId: bookingForm.value.resourceId,
        date: bookingForm.value.date,
        startTime: startTime24h,
        endTime: endTime24h,
        duration: durationMinutes,
        paymentMethod: "local",
      };

      const response = await CreateBooking(payload);
      if (response.isSuccess) {
        successMessage.value =
          response.userMessage || "Appointment created successfully!";
        showSuccess.value = true;
        showBookingModal.value = false;
        setTimeout(() => {
          showSuccess.value = false;
          window.location.reload();
        }, 1800);
      } else {
        errorMessage.value =
          response.userMessage ||
          response.errorMessage ||
          "Failed to create appointment.";
        showError.value = true;
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      errorMessage.value =
        error.response?.data?.userMessage ||
        error.response?.data?.errorMessage ||
        "Failed to create appointment.";
      showError.value = true;
    } finally {
      isSubmitting.value = false;
    }
  }

  // ─── Watchers ───
  watch([selectedResourceId, selectedDate], () => {
    fetchSlots();
  });

  // ─── Init ───
  onMounted(() => {
    fetchResources();
  });
</script>
