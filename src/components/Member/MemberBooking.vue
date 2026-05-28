<template>
  <div class="booking">
    <!-- Header Section -->
    <div class="bg-[#f5f3ef] py-8 px-4">
      <div class="container mx-auto text-center">
        <h2
          class="text-[#1a3a35] font-bold text-2xl tracking-wider uppercase mb-4"
        >
          Book Your Lane With Ease
        </h2>
        <p class="text-[#1a3a35] italic max-w-4xl mx-auto text-sm">
          Whether you're an individual player or a local sports club, our lane
          booking system makes it simple to reserve your training lane online in
          just a few clicks. Choose your session type and preferred time to
          train at the Elite Cricket Centre, where performance meets precision.
        </p>
        <div class="border-b-2 border-[#1a3a35] mt-6 max-w-5xl mx-auto"></div>
      </div>
    </div>

    <!-- Notice Section -->
    <div class="bg-white py-10 px-4">
      <div class="container mx-auto text-center">
        <p class="text-red-600 font-semibold mb-2">
          All players must wear appropriate safety gear before entering the
          nets. Failure to comply is not permitted.
        </p>
        <p class="text-[#1a3a35] font-semibold">
          If your booking is less than 1 hour away from selected time, please
          call us to confirm.
        </p>
      </div>
    </div>

    <!-- Form Section -->
    <div class="bg-white px-4 pb-8">
      <div class="container mx-auto max-w-6xl">
        <!-- Progress Steps Desktop -->
        <div class="hidden sm:grid grid-cols-2 gap-2 mb-8">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="text-center"
          >
            <p
              class="text-sm font-semibold mb-2"
              :class="currentStep >= index ? 'text-[#1a3a35]' : 'text-gray-400'"
            >
              {{ index + 1 }}. {{ step }}
            </p>
            <div
              class="h-2 rounded-sm transition-colors duration-500"
              :class="currentStep >= index ? 'bg-[#1a3a35]' : 'bg-gray-300'"
            ></div>
          </div>
        </div>

        <!-- Progress Steps Mobile -->
        <div class="flex items-center justify-between mb-8 sm:hidden px-2">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex items-center"
            :class="index < steps.length - 1 ? 'flex-1' : ''"
          >
            <div
              class="h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500"
              :class="
                currentStep >= index
                  ? 'bg-[#1a3a35]'
                  : 'bg-white border-2 border-gray-300'
              "
            >
              <p
                class="text-sm font-semibold"
                :class="currentStep >= index ? 'text-white' : 'text-gray-400'"
              >
                {{ step.charAt(0) }}
              </p>
            </div>
            <div
              v-if="index < steps.length - 1"
              class="h-0.5 flex-1 mx-1 transition-colors duration-500"
              :class="currentStep > index ? 'bg-[#1a3a35]' : 'bg-gray-300'"
            ></div>
          </div>
        </div>

        <!-- STEP 1: Calendar & Time Selection -->
        <div
          v-if="currentStep === 0"
          class="animate-fadeIn"
        >
          <!-- Service Info -->
          <div
            v-if="selectedService"
            class="bg-[#1a3a35] rounded-xl p-4 mb-6 text-white flex items-center justify-between"
          >
            <div>
              <p class="text-xs text-white/70 uppercase tracking-wider">
                Service
              </p>
              <p class="font-bold text-lg">{{ selectedServiceTitle }}</p>
              <p class="text-sm text-white/80">
                {{ formattedDuration }} • A${{ totalPrice }}
              </p>
            </div>
            <div v-if="memberData?.membership">
              <p class="text-xs text-white/70 uppercase tracking-wider">
                Membership
              </p>
              <p class="font-semibold text-sm">
                {{ memberData.membership.name }}
              </p>
            </div>
          </div>

          <!-- Service Selection -->
          <div class="mb-6">
            <label class="block text-[#1a3a35] font-semibold mb-3"
              >Select Service</label
            >
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <button
                v-for="svc in visibleServices"
                :key="svc._id"
                @click="selectMemberService(svc)"
                type="button"
                class="p-4 rounded-xl border-2 text-left transition-all"
                :class="
                  booking.service === svc._id
                    ? 'border-[#1a3a35] bg-green-50 shadow-md'
                    : 'border-gray-200 hover:border-[#1a3a35]/50 hover:bg-gray-50'
                "
              >
                <p class="font-semibold text-[#1a3a35] text-sm">{{ svc.title }}</p>
                <p class="text-xs text-gray-500 mt-1">
                  {{ svc.duration }} • A${{ svc.price }}
                </p>
                <p class="text-xs text-gray-400 mt-0.5">
                  {{ svc.resourceIDs?.length || 0 }} lane(s) available
                </p>
              </button>
            </div>
          </div>

          <div v-if="selectedService" class="booking-grid grid grid-cols-1 lg:grid-cols-2">
            <!-- Lane Selection -->
            <div class="max-w-xs mb-6">
              <label class="block text-[#1a3a35] font-semibold mb-2"
                >Lane</label
              >
              <select
                v-model="booking.lane"
                class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
              >
                <option value="">Please select a Lane</option>
                <option
                  v-for="res in serviceResources"
                  :key="res._id"
                  :value="res._id"
                >
                  {{ res.title }}
                </option>
              </select>
            </div>

            <!-- Duration Selector -->
            <div class="max-w-xs mb-6">
              <label class="block text-[#1a3a35] font-semibold mb-2"
                >Duration</label
              >
              <!-- Fixed duration (when limitDuration is set) -->
              <div
                v-if="fixedDurationMultiplier !== null"
                class="border border-gray-300 rounded bg-gray-50 px-4 py-3 text-center"
              >
                <span class="text-gray-700 font-semibold">{{ formattedDuration }}</span>
                <span class="text-xs text-gray-500 ml-2">(Fixed)</span>
              </div>
              <!-- Adjustable duration -->
              <div
                v-else
                class="flex items-center border border-gray-300 rounded bg-white"
              >
                <button
                  type="button"
                  @click="decreaseDuration"
                  :disabled="
                    durationMultiplier <= minDurationMultiplier ||
                    !selectedService
                  "
                  class="px-4 py-3 text-[#1a3a35] font-bold hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  -
                </button>
                <span
                  class="flex-1 text-center text-gray-600 py-3 font-medium select-none"
                  >{{ formattedDuration }}</span
                >
                <button
                  type="button"
                  @click="increaseDuration"
                  :disabled="
                    durationMultiplier >= maxDurationMultiplier ||
                    !selectedService
                  "
                  class="px-4 py-3 text-[#1a3a35] font-bold hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  +
                </button>
              </div>
              <p
                v-if="selectedService"
                class="text-xs text-gray-500 mt-1 text-center"
              >
                A${{ totalPrice }} total
              </p>
            </div>
          </div>

          <!-- Select Date -->
          <!-- <div class="max-w-xs mb-6">
            <label class="block text-[#1a3a35] font-semibold mb-2"
              >Select a Date</label
            >
            <input
              v-model="booking.date"
              type="date"
              :min="todayStr"
              class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
            />
          </div> -->

          <p v-if="selectedService" class="text-gray-700 mb-6">
            Click on a time slot to proceed with booking.
          </p>

          <div v-if="selectedService" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Calendar -->
            <div class="bg-[#1a3a35] rounded-lg overflow-hidden">
              <!-- Calendar Header -->
              <div class="flex items-center justify-between p-4 text-white">
                <button
                  @click="prevMonth"
                  class="p-2 hover:bg-white/10 rounded transition-colors"
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
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
                <span class="text-lg font-semibold">{{
                  currentMonthYear
                }}</span>
                <button
                  @click="nextMonth"
                  class="p-2 hover:bg-white/10 rounded transition-colors"
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
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>

              <!-- Calendar Grid -->
              <div class="p-4">
                <!-- Weekday Headers -->
                <div class="grid grid-cols-7 gap-1 mb-2">
                  <div
                    v-for="day in [
                      'Mon',
                      'Tue',
                      'Wed',
                      'Thu',
                      'Fri',
                      'Sat',
                      'Sun',
                    ]"
                    :key="day"
                    class="text-center text-white/80 text-sm py-2 font-medium"
                  >
                    {{ day }}
                  </div>
                </div>
                <!-- Days -->
                <div class="grid grid-cols-7 gap-1">
                  <button
                    v-for="date in calendarDays"
                    :key="date.day"
                    @click="selectDate(date)"
                    class="aspect-square flex items-center justify-center text-sm rounded transition-all"
                    :class="getDateClass(date)"
                  >
                    {{ date.day }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Time Slots -->
            <div>
              <!-- Selected Date Header -->
              <div
                class="bg-[#1a3a35] text-white text-center py-3 rounded-t-lg"
              >
                <span class="font-semibold">{{ selectedDateFormatted }}</span>
              </div>

              <!-- Loading -->
              <div
                v-if="isLoadingSlots"
                class="border border-gray-200 rounded-b-lg p-6 text-center text-gray-500 text-sm"
              >
                <svg
                  class="w-5 h-5 animate-spin inline mr-2"
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
                Loading slots...
              </div>

              <!-- Time Slots List -->
              <div
                v-else
                class="border border-gray-200 rounded-b-lg max-h-[400px] overflow-y-auto"
              >
                <div
                  v-if="displayTimeSlots.length === 0"
                  class="p-6 text-center text-gray-500 text-sm"
                >
                  No available slots for this date.
                </div>
                <button
                  v-for="slot in displayTimeSlots"
                  :key="slot.time"
                  @click="slot.available ? selectTimeSlot(slot) : null"
                  :disabled="!slot.available"
                  class="w-full flex items-center justify-center gap-3 p-4 border-b border-gray-100 transition-colors"
                  :class="[
                    booking.selectedTime === slot.time
                      ? 'bg-green-100 border-[#1a3a35]'
                      : '',
                    slot.available
                      ? 'hover:bg-green-50 cursor-pointer'
                      : 'bg-gray-50 cursor-not-allowed opacity-60',
                  ]"
                >
                  <div
                    class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    :class="
                      booking.selectedTime === slot.time
                        ? 'border-[#1a3a35] bg-[#1a3a35]'
                        : slot.available
                          ? 'border-gray-300'
                          : 'border-gray-200 bg-gray-100'
                    "
                  >
                    <div
                      v-if="booking.selectedTime === slot.time"
                      class="w-2 h-2 bg-white rounded-full"
                    ></div>
                  </div>
                  <span
                    class="font-medium"
                    :class="slot.available ? 'text-gray-700' : 'text-gray-400'"
                  >
                    {{ slot.time }}
                    <span
                      v-if="!slot.available"
                      class="text-xs ml-1"
                      >(Unavailable)</span
                    >
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-end mt-8">
            <button
              @click="nextStep"
              :disabled="
                !booking.lane ||
                !booking.date ||
                !booking.selectedTime ||
                isCreatingBooking
              "
              class="bg-[#1a3a35] text-white px-8 py-3 rounded font-semibold hover:bg-[#2a4a45] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <span v-if="isCreatingBooking">Booking...</span>
              <span v-else>BOOK NOW</span>
            </button>
          </div>
        </div>

        <!-- Booking Error -->
        <Teleport to="body">
          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="bookingError"
              role="dialog"
              aria-modal="true"
              aria-live="assertive"
              class="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
              @click.self="bookingError = ''"
            >
              <Transition
                appear
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
              >
                <div
                  class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div
                    class="px-6 pt-6 pb-4 flex flex-col items-center text-center"
                  >
                    <div
                      class="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4"
                    >
                      <svg
                        class="w-7 h-7 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                        />
                      </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900">
                      Booking failed
                    </h3>
                    <p class="text-sm text-gray-600 mt-2 break-words">
                      {{ bookingError }}
                    </p>
                  </div>
                  <div class="px-6 pb-6 pt-2 flex justify-center">
                    <button
                      type="button"
                      @click="bookingError = ''"
                      class="px-6 py-2.5 bg-[#1a3a35] text-white rounded-lg text-sm font-semibold hover:bg-[#2a4a45] transition-colors min-w-[120px]"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </Transition>
        </Teleport>

        <!-- STEP 2: Done -->
        <div
          v-if="currentStep === 1"
          class="animate-fadeIn text-center py-12"
        >
          <div
            class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-[#1a3a35] mb-4">
            Booking Confirmed!
          </h3>
          <p class="text-gray-600 mb-2">Thank you for your booking.</p>
          <p class="text-gray-600 mb-8">
            A confirmation email has been sent to {{ booking.email }}.
          </p>

          <div
            class="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mb-8 text-left"
          >
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Booking Reference:</span>
              <span class="font-semibold"
                >#ECC-{{ Math.floor(Math.random() * 10000) }}</span
              >
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Date:</span>
              <span class="font-semibold">{{ selectedDateFormatted }}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Time:</span>
              <span class="font-semibold">{{ booking.selectedTime }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Lane:</span>
              <span class="font-semibold">{{ selectedResourceTitle }}</span>
            </div>
          </div>

          <button
            @click="resetBooking"
            class="bg-[#1a3a35] text-white px-8 py-3 rounded font-semibold hover:bg-[#2a4a45] transition-colors"
          >
            Book Another Session
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import { useRoute } from "vue-router";
  import {
    GetVisibleServices,
    GetMembershipBookingSlots,
    RegisterBookingUser,
    CreateBooking,
    GetUserBookingData,
  } from "@/services/apiService.js";

  const route = useRoute();
  const memberUserId = ref(route.query.userId || "");
  const memberData = ref(null);
  const isLoadingMemberData = ref(false);

  const steps = ["Time", "Done"];
  const currentStep = ref(0);

  const durationMultiplier = ref(1);
  const maxTotalHours = 12.5; // max 12 hours 30 minutes

  // Use Australia/Sydney date so the calendar always reflects the correct "today".
  const ausNowStr = new Date().toLocaleString("en-US", {
    timeZone: "Australia/Sydney",
  });
  const ausNow = new Date(ausNowStr);
  // Default selected date = today + 3 days (today + 2 buffer days)
  const ausDefault = new Date(ausNow);
  ausDefault.setDate(ausDefault.getDate() + 3);
  const currentDate = ref(new Date(ausNow));
  const selectedDate = ref(new Date(ausDefault));

  // Visible services from API
  const visibleServices = ref([]);
  const isLoadingServices = ref(false);

  const booking = ref({
    type: "",
    service: "",
    lane: "",
    date: formatDateInput(ausDefault),
    selectedTime: null,
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  function formatDateInput(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  const todayStr = formatDateInput(ausNow);

  async function fetchVisibleServices() {
    isLoadingServices.value = true;
    try {
      const response = await GetVisibleServices();
      if (response.isSuccess) {
        visibleServices.value = response.value || [];
      } else {
        // Surface API failure through the shared error popup.
        bookingError.value =
          response.errorMessage ||
          response.userMessage ||
          "Failed to load services.";
      }
    } catch (error) {
      console.error("Error fetching visible services:", error);
      bookingError.value = "Network error while loading services.";
    } finally {
      isLoadingServices.value = false;
    }
  }

  async function fetchMemberBookingData() {
    if (!memberUserId.value) return;
    isLoadingMemberData.value = true;
    try {
      const response = await GetUserBookingData(memberUserId.value);
      if (response.isSuccess && response.value) {
        memberData.value = response.value;
        const svcList = response.value.services || [];
        if (svcList.length > 0) {
          visibleServices.value = svcList.map((svc) => ({
            _id: svc._id,
            title: svc.title,
            categoryID: svc.category,
            duration: svc.duration,
            price: svc.price,
            resourceIDs: svc.resources || [],
            appointmentLimit: svc.appointmentLimit || null,
            limitDuration: svc.appointmentLimit?.limitDuration || svc.limitDuration || null,
          }));
          // Set category from first service
          booking.value.type = svcList[0].category?._id || "";
        }
      } else {
        bookingError.value =
          response.errorMessage ||
          response.userMessage ||
          "Failed to load member booking data.";
      }
    } catch (error) {
      console.error("Error fetching member booking data:", error);
      bookingError.value = "Network error while loading member data.";
    } finally {
      isLoadingMemberData.value = false;
    }
  }

  // Unique categories from visible services
  const categories = computed(() => {
    const map = new Map();
    visibleServices.value.forEach((s) => {
      const cat = s.categoryID;
      if (cat && !map.has(cat._id)) {
        const name = cat.categoryName?.toLowerCase() || "";
        if (name !== "member" && name !== "coach") {
          map.set(cat._id, cat);
        }
      }
    });
    return Array.from(map.values());
  });

  // Services filtered by selected category
  const filteredServices = computed(() => {
    let list = visibleServices.value;
    // Exclude member and coach category services
    list = list.filter((s) => {
      const catName = s.categoryID?.categoryName?.toLowerCase() || "";
      return catName !== "member" && catName !== "coach";
    });
    if (!booking.value.type) return list;
    return list.filter((s) => s.categoryID?._id === booking.value.type);
  });

  // Selected service object
  const selectedService = computed(() => {
    if (!booking.value.service) return null;
    return (
      visibleServices.value.find((s) => s._id === booking.value.service) || null
    );
  });

  // Resources (lanes) from selected service
  const serviceResources = computed(() => {
    return selectedService.value?.resourceIDs || [];
  });

  // Select a service from the member's available services
  function selectMemberService(svc) {
    booking.value.service = svc._id;
    booking.value.type = svc.categoryID?._id || booking.value.type;
    // Reset lane and time when switching service
    booking.value.lane = "";
    booking.value.selectedTime = null;
    timeSlots.value = [];
  }

  // Parse duration string like "30m" or "1h" into minutes
  const baseDurationMinutes = computed(() => {
    const dur = selectedService.value?.duration || "30m";
    if (dur.includes("h")) {
      const hours = parseFloat(dur);
      return Math.round(hours * 60);
    }
    const mins = parseInt(dur);
    return isNaN(mins) ? 30 : mins;
  });

  // Total duration in minutes
  const totalDurationMinutes = computed(() => {
    return durationMultiplier.value * baseDurationMinutes.value;
  });

  // Fixed duration from appointmentLimit.limitDuration
  const fixedDurationMultiplier = computed(() => {
    if (!baseDurationMinutes.value || baseDurationMinutes.value <= 0) return null;
    const svc = selectedService.value;
    const limit = svc?.appointmentLimit;
    // Check appointmentLimit.limitDuration or service-level limitDuration
    const limitDur = limit?.limitDuration || svc?.limitDuration;
    if (
      limitDur !== null &&
      limitDur !== undefined &&
      limitDur !== ""
    ) {
      const capHours = parseFloat(limitDur);
      if (capHours && !isNaN(capHours) && capHours > 0) {
        return Math.max(1, Math.round((capHours * 60) / baseDurationMinutes.value));
      }
    }
    return null; // no fixed duration
  });

  const minDurationMultiplier = computed(() => {
    if (!baseDurationMinutes.value || baseDurationMinutes.value <= 0) return 1;
    // If limitDuration is set, lock to that value
    if (fixedDurationMultiplier.value !== null) return fixedDurationMultiplier.value;
    return Math.ceil(60 / baseDurationMinutes.value); // minimum 1 hour
  });

  const maxDurationMultiplier = computed(() => {
    if (!baseDurationMinutes.value || baseDurationMinutes.value <= 0) return 1;
    // If limitDuration is set, lock to that value
    if (fixedDurationMultiplier.value !== null) return fixedDurationMultiplier.value;
    return Math.max(1, Math.floor((maxTotalHours * 60) / baseDurationMinutes.value));
  });

  // Reset duration to minimum (1 hour) whenever service changes
  watch(selectedService, () => {
    const min = minDurationMultiplier.value || 1;
    const max = maxDurationMultiplier.value || min;
    // Clamp into [min, max] so a tighter per-service cap is respected.
    durationMultiplier.value = Math.min(Math.max(min, min), max);
  });

  const selectedServiceTitle = computed(() => {
    return selectedService.value?.title || booking.value.service;
  });

  const selectedResourceTitle = computed(() => {
    const res = serviceResources.value.find(
      (r) => r._id === booking.value.lane,
    );
    return res?.title || booking.value.lane;
  });

  // Format total duration
  const formattedDuration = computed(() => {
    const total = totalDurationMinutes.value;
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
  });

  // Total price scales with duration multiplier
  const totalPrice = computed(() => {
    const basePrice = selectedService.value?.price || 0;
    return basePrice * durationMultiplier.value;
  });

  const isStep1Valid = computed(() => {
    return (
      booking.value.type &&
      booking.value.service &&
      booking.value.lane &&
      booking.value.date
    );
  });

  const isStep3Valid = computed(() => {
    return booking.value.fullName && booking.value.phone && booking.value.email;
  });

  const currentMonthYear = computed(() => {
    return currentDate.value.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  });

  const selectedDateFormatted = computed(() => {
    return selectedDate.value.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  });

  const calendarDays = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Previous month padding
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, currentMonth: false });
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, currentMonth: true });
    }

    // Next month padding
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, currentMonth: false });
    }

    return days;
  });

  const timeSlots = ref([]);
  const isLoadingSlots = ref(false);

  function getAustraliaDateString() {
    return new Date().toLocaleDateString("en-CA", {
      timeZone: "Australia/Sydney",
    });
  }

  function getAustraliaTimeMinutes() {
    const now = new Date();
    const ausStr = now.toLocaleString("en-US", {
      timeZone: "Australia/Sydney",
    });
    const ausDate = new Date(ausStr);
    return ausDate.getHours() * 60 + ausDate.getMinutes();
  }

  const displayTimeSlots = computed(() => {
    if (!timeSlots.value.length) return [];
    const ausToday = getAustraliaDateString();
    if (booking.value.date !== ausToday) return timeSlots.value;
    const currentMins = getAustraliaTimeMinutes();
    return timeSlots.value.filter(
      (slot) => parseTimeToMinutes(slot.time) >= currentMins,
    );
  });

  async function fetchBookingSlots() {
    if (
      !booking.value.date ||
      !booking.value.lane ||
      !booking.value.service ||
      !memberUserId.value
    )
      return;
    isLoadingSlots.value = true;
    bookingError.value = "";
    try {
      const response = await GetMembershipBookingSlots({
        userId: memberUserId.value,
        resourceId: booking.value.lane,
        serviceId: booking.value.service,
        date: booking.value.date,
      });
      if (response.isSuccess) {
        timeSlots.value = response.value?.timeSlots || [];
      } else {
        timeSlots.value = [];
        bookingError.value =
          response.errorMessage ||
          response.userMessage ||
          "Failed to fetch available slots.";
      }
    } catch (error) {
      console.error("Error fetching booking slots:", error);
      timeSlots.value = [];
      bookingError.value = "Network error. Please try again.";
    } finally {
      isLoadingSlots.value = false;
    }
  }

  // Fetch slots whenever date, lane, or service changes
  watch(
    () => [booking.value.date, booking.value.lane, booking.value.service],
    () => {
      if (booking.value.date && booking.value.lane && booking.value.service) {
        fetchBookingSlots();
      }
    },
    { immediate: true },
  );

  const registeredUserId = ref("");
  const registrationError = ref("");
  const isRegisteringUser = ref(false);
  const isCreatingBooking = ref(false);
  const bookingError = ref("");

  // Auto-dismiss the booking error popup after 6 seconds
  let bookingErrorTimer = null;
  watch(bookingError, (val) => {
    if (bookingErrorTimer) {
      clearTimeout(bookingErrorTimer);
      bookingErrorTimer = null;
    }
    if (val) {
      bookingErrorTimer = setTimeout(() => {
        bookingError.value = "";
      }, 6000);
    }
  });

  async function registerUser() {
    registrationError.value = "";
    isRegisteringUser.value = true;
    try {
      const response = await RegisterBookingUser({
        name: booking.value.fullName,
        email: booking.value.email,
        categoryId: booking.value.type,
        phoneNumber: booking.value.phone,
      });
      if (response.isSuccess && response.value?.userId) {
        registeredUserId.value = response.value.userId;
        currentStep.value++;
      } else {
        // Mirror into bookingError so the shared popup is the single source of truth.
        const msg =
          response.errorMessage ||
          response.userMessage ||
          "Registration failed.";
        registrationError.value = msg;
        bookingError.value = msg;
      }
    } catch (error) {
      const msg = "Network error. Please try again.";
      registrationError.value = msg;
      bookingError.value = msg;
    } finally {
      isRegisteringUser.value = false;
    }
  }

  function parseTimeToMinutes(timeStr) {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "pm" && hours !== 12) hours += 12;
    if (period === "am" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  function formatMinutesToTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60) % 24;
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  async function completeBooking() {
    bookingError.value = "";
    isCreatingBooking.value = true;
    try {
      const startMins = parseTimeToMinutes(
        booking.value.selectedTime.toLowerCase(),
      );
      const endMins = startMins + totalDurationMinutes.value;
      const response = await CreateBooking({
        userId: memberUserId.value || registeredUserId.value,
        categoryId: booking.value.type,
        resourceId: booking.value.lane,
        duration: totalDurationMinutes.value,
        date: booking.value.date,
        startTime: formatMinutesToTime(startMins),
        endTime: formatMinutesToTime(endMins),
        note: booking.value.notes || "",
      });
      if (response.isSuccess) {
        currentStep.value++;
      } else {
        bookingError.value =
          response.errorMessage || response.userMessage || "Booking failed.";
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      bookingError.value = "Network error. Please try again.";
    } finally {
      isCreatingBooking.value = false;
    }
  }

  function increaseDuration() {
    if (durationMultiplier.value < maxDurationMultiplier.value) {
      durationMultiplier.value += 1;
    }
  }

  function decreaseDuration() {
    if (durationMultiplier.value > minDurationMultiplier.value) {
      durationMultiplier.value -= 1;
    }
  }

  function nextStep() {
    if (currentStep.value === 0) {
      // Time step: create booking directly then go to done
      completeBooking();
    } else if (currentStep.value < steps.length - 1) {
      currentStep.value++;
    }
  }

  function prevStep() {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  }

  function prevMonth() {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      1,
    );
  }

  function nextMonth() {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      1,
    );
  }

  // Returns true when the calendar cell is before "today" in Australia/Sydney.
  // 3-day buffer: today is 19th → 19, 20, 21 disabled → 22nd is first selectable.
  const BOOKING_BUFFER_DAYS = 3;

  function isPastDate(date) {
    if (!date.currentMonth) return true;
    const candidate = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth(),
      date.day,
    );
    const todayAus = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Australia/Sydney" }),
    );
    todayAus.setHours(0, 0, 0, 0);
    // Add buffer: earliest allowed date = today + BOOKING_BUFFER_DAYS
    const earliest = new Date(todayAus);
    earliest.setDate(earliest.getDate() + BOOKING_BUFFER_DAYS);
    return candidate < earliest;
  }

  function selectDate(date) {
    if (!date.currentMonth) return;
    if (isPastDate(date)) return; // block past-date clicks
    selectedDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth(),
      date.day,
    );
    booking.value.date = formatDateInput(selectedDate.value);
  }

  function selectTimeSlot(slot) {
    booking.value.selectedTime = slot.time;
  }

  function getDateClass(date) {
    const isSelected =
      date.currentMonth &&
      selectedDate.value.getDate() === date.day &&
      selectedDate.value.getMonth() === currentDate.value.getMonth();

    if (isSelected) {
      return "bg-white text-[#1a3a35] font-bold";
    }
    if (date.currentMonth) {
      if (isPastDate(date)) {
        return "text-white/30 cursor-not-allowed line-through";
      }
      return "text-white hover:bg-white/20";
    }
    return "text-white/40";
  }

  function resetBooking() {
    currentStep.value = 0;
    // Recalculate Australian date with 3-day buffer
    const nowStr = new Date().toLocaleString("en-US", {
      timeZone: "Australia/Sydney",
    });
    const nowAus = new Date(nowStr);
    const defaultDate = new Date(nowAus);
    defaultDate.setDate(defaultDate.getDate() + BOOKING_BUFFER_DAYS);

    const prevType = booking.value.type;
    const prevService = booking.value.service;
    booking.value = {
      type: prevType,
      service: prevService,
      lane: "",
      date: formatDateInput(defaultDate),
      selectedTime: null,
      fullName: "",
      phone: "",
      email: "",
      notes: "",
    };
    selectedDate.value = new Date(defaultDate);
    currentDate.value = new Date(nowAus);
    durationMultiplier.value = 1;
    registeredUserId.value = "";
    registrationError.value = "";
    bookingError.value = "";
    timeSlots.value = [];
  }

  onMounted(() => {
    if (memberUserId.value) {
      fetchMemberBookingData();
    } else {
      fetchVisibleServices();
    }
  });
</script>

<style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.4s ease-out;
  }
</style>
