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
        <div class="hidden sm:grid grid-cols-5 gap-2 mb-8">
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

        <!-- STEP 1: Service Selection -->
        <div
          v-if="currentStep === 0"
          class="animate-fadeIn"
        >
          <p class="text-[#1a3a35] font-semibold mb-4">
            Please select the <span class="text-red-600">Type</span> First:
          </p>

          <!-- Form Fields -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <!-- Type -->
            <div>
              <label class="block text-[#1a3a35] font-semibold mb-2"
                >Type</label
              >
              <select
                v-model="booking.type"
                class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
              >
                <option value="">I am a...</option>
                <option value="individual">Individual</option>
                <option value="club">Cricket Club</option>
                <option value="coach">Coach</option>
                <option value="member">Member</option>
              </select>
            </div>
            <!-- Service -->
            <div>
              <label class="block text-[#1a3a35] font-semibold mb-2"
                >Service</label
              >
              <select
                v-model="booking.service"
                class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
              >
                <option value="">Select service</option>
                <option value="lane">Lane Only Booking ($40)</option>
                <option value="lane-machine">
                  Lane + Bowling Machine ($60)
                </option>
                <option value="coaching">Coaching Session ($80)</option>
              </select>
            </div>
            <!-- Lane -->
            <div>
              <label class="block text-[#1a3a35] font-semibold mb-2"
                >Lane</label
              >
              <select
                v-model="booking.lane"
                class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
              >
                <option value="">Please select a Lane</option>
                <option
                  v-for="n in 8"
                  :key="n"
                  :value="n"
                >
                  Lane {{ n }}
                </option>
              </select>
            </div>
            <!-- Duration -->
            <div>
              <label class="block text-[#1a3a35] font-semibold mb-2"
                >Duration (Hours)</label
              >
              <div
                class="flex items-center border border-gray-300 rounded bg-white"
              >
                <button
                  type="button"
                  @click="decreaseDuration"
                  :disabled="duration <= minDuration"
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
                  :disabled="duration >= maxDuration"
                  class="px-4 py-3 text-[#1a3a35] font-bold hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <!-- Select Date -->
          <div class="max-w-xs mb-8">
            <label class="block text-[#1a3a35] font-semibold mb-2"
              >Select a Date</label
            >
            <input
              v-model="booking.date"
              type="date"
              class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
            />
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-300 mb-6"></div>

          <!-- Next Button -->
          <div class="flex justify-end">
            <button
              @click="nextStep"
              :disabled="!isStep1Valid"
              class="bg-[#1a3a35] text-white px-12 py-4 rounded font-semibold tracking-wide hover:bg-[#2a4a45] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              NEXT
            </button>
          </div>
        </div>

        <!-- STEP 2: Calendar & Time Selection -->
        <div
          v-if="currentStep === 1"
          class="animate-fadeIn"
        >
          <p class="text-gray-700 mb-6">
            Below you can find a list of available time slots for
            <span class="font-semibold">{{
              booking.service === "lane"
                ? "Lane Only Booking ($40)"
                : booking.service
            }}</span>
            by <span class="font-semibold">Lane {{ booking.lane }}</span
            >.<br />
            Click on a time slot to proceed with booking.
          </p>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

              <!-- Time Slots List -->
              <div
                class="border border-gray-200 rounded-b-lg max-h-[400px] overflow-y-auto"
              >
                <button
                  v-for="slot in timeSlots"
                  :key="slot.time"
                  @click="selectTimeSlot(slot)"
                  class="w-full flex items-center justify-center gap-3 p-4 border-b border-gray-100 hover:bg-green-50 transition-colors"
                  :class="
                    booking.selectedTime === slot.time
                      ? 'bg-green-100 border-[#1a3a35]'
                      : ''
                  "
                >
                  <div
                    class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    :class="
                      booking.selectedTime === slot.time
                        ? 'border-[#1a3a35] bg-[#1a3a35]'
                        : 'border-gray-300'
                    "
                  >
                    <div
                      v-if="booking.selectedTime === slot.time"
                      class="w-2 h-2 bg-white rounded-full"
                    ></div>
                  </div>
                  <span class="text-gray-700 font-medium">{{ slot.time }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button
              @click="prevStep"
              class="bg-gray-200 text-gray-700 px-8 py-3 rounded font-semibold hover:bg-gray-300 transition-colors"
            >
              BACK
            </button>
            <button
              @click="nextStep"
              :disabled="!booking.selectedTime"
              class="bg-[#1a3a35] text-white px-8 py-3 rounded font-semibold hover:bg-[#2a4a45] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              NEXT
            </button>
          </div>
        </div>

        <!-- STEP 3: Details Form -->
        <div
          v-if="currentStep === 2"
          class="animate-fadeIn"
        >
          <p class="text-gray-700 mb-6">
            You selected a booking for
            <span class="font-semibold">{{
              booking.service === "lane"
                ? "Lane Only Booking ($40)"
                : booking.service
            }}</span>
            by <span class="font-semibold">Lane {{ booking.lane }}</span> at
            <span class="font-semibold">{{ booking.selectedTime }}</span> on
            <span class="font-semibold">{{ selectedDateFormatted }}</span
            >. The price for the service is
            <span class="font-semibold">A$40.00</span>.<br />
            Please provide your details in the form below to proceed with
            booking.
          </p>

          <!-- Details Form -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <!-- Full Name -->
            <div>
              <label class="block text-[#1a3a35] font-semibold mb-2"
                >Full name</label
              >
              <input
                v-model="booking.fullName"
                type="text"
                placeholder="Enter full name"
                class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
              />
            </div>
            <!-- Phone -->
            <div>
              <label class="block text-[#1a3a35] font-semibold mb-2"
                >Phone</label
              >
              <div class="flex">
                <select
                  class="border border-r-0 border-gray-300 rounded-l px-3 py-3 bg-gray-50 text-gray-600"
                >
                  <option>🇱🇰 +94</option>
                  <option>🇦🇺 +61</option>
                  <option>🇬🇧 +44</option>
                </select>
                <input
                  v-model="booking.phone"
                  type="tel"
                  placeholder="071 234 5678"
                  class="flex-1 border border-gray-300 rounded-r px-4 py-3 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
                />
              </div>
            </div>
            <!-- Email -->
            <div>
              <label class="block text-[#1a3a35] font-semibold mb-2"
                >Email</label
              >
              <input
                v-model="booking.email"
                type="email"
                placeholder="Enter email"
                class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
              />
            </div>
          </div>

          <!-- Notes -->
          <div class="mb-6">
            <label class="block text-[#1a3a35] font-semibold mb-2">Notes</label>
            <textarea
              v-model="booking.notes"
              rows="4"
              placeholder="Any special requests or notes..."
              class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a35] resize-none"
            ></textarea>
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-300 mb-6"></div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between">
            <button
              @click="prevStep"
              class="bg-gray-200 text-gray-700 px-8 py-3 rounded font-semibold hover:bg-gray-300 transition-colors"
            >
              BACK
            </button>
            <button
              @click="nextStep"
              :disabled="!isStep3Valid"
              class="bg-[#1a3a35] text-white px-8 py-3 rounded font-semibold hover:bg-[#2a4a45] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              NEXT
            </button>
          </div>
        </div>

        <!-- STEP 4: Payment -->
        <div
          v-if="currentStep === 3"
          class="animate-fadeIn"
        >
          <div class="max-w-2xl mx-auto">
            <h3 class="text-xl font-bold text-[#1a3a35] mb-6">Payment</h3>

            <!-- Order Summary -->
            <div class="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 class="font-semibold text-gray-700 mb-4">Order Summary</h4>
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">{{
                  booking.service === "lane"
                    ? "Lane Only Booking"
                    : booking.service
                }}</span>
                <span class="font-medium">A$40.00</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">Lane {{ booking.lane }}</span>
                <span class="font-medium">{{ booking.selectedTime }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">Date</span>
                <span class="font-medium">{{ selectedDateFormatted }}</span>
              </div>
              <div class="border-t border-gray-300 my-3"></div>
              <div class="flex justify-between">
                <span class="font-semibold">Total</span>
                <span class="font-bold text-[#1a3a35]">A$40.00</span>
              </div>
            </div>

            <!-- Payment Methods -->
            <div class="space-y-3 mb-6">
              <label
                class="flex items-center gap-3 p-4 border-2 border-[#1a3a35] rounded-lg cursor-pointer bg-green-50"
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked
                  class="w-4 h-4 text-[#1a3a35]"
                />
                <span class="font-medium">Credit/Debit Card</span>
              </label>
              <label
                class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300"
              >
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  class="w-4 h-4 text-[#1a3a35]"
                />
                <span class="font-medium">PayPal</span>
              </label>
            </div>

            <!-- Card Form -->
            <div class="space-y-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Card Number</label
                >
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Expiry Date</label
                  >
                  <input
                    type="text"
                    placeholder="MM/YY"
                    class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >CVC</label
                  >
                  <input
                    type="text"
                    placeholder="123"
                    class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
                  />
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between">
              <button
                @click="prevStep"
                class="bg-gray-200 text-gray-700 px-8 py-3 rounded font-semibold hover:bg-gray-300 transition-colors"
              >
                BACK
              </button>
              <button
                @click="nextStep"
                class="bg-[#1a3a35] text-white px-8 py-3 rounded font-semibold hover:bg-[#2a4a45] transition-colors"
              >
                PAY A$40.00
              </button>
            </div>
          </div>
        </div>

        <!-- STEP 5: Done -->
        <div
          v-if="currentStep === 4"
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
              <span class="font-semibold">Lane {{ booking.lane }}</span>
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
  import { ref, computed } from "vue";

  const steps = ["Service", "Time", "Details", "Payment", "Done"];
  const currentStep = ref(0);

  const duration = ref(1);
  const minDuration = 1;
  const maxDuration = 9;

  const currentDate = ref(new Date());
  const selectedDate = ref(new Date());

  const booking = ref({
    type: "",
    service: "",
    lane: "",
    date: "",
    selectedTime: null,
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const formattedDuration = computed(() => {
    const hours = Math.floor(duration.value);
    const minutes = (duration.value % 1) * 60;
    if (minutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${minutes}m`;
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

  const timeSlots = [
    { time: "9:30 am", available: true },
    { time: "10:00 am", available: true },
    { time: "10:30 am", available: true },
    { time: "11:00 am", available: true },
    { time: "11:30 am", available: true },
    { time: "12:00 pm", available: true },
    { time: "12:30 pm", available: true },
    { time: "1:00 pm", available: true },
    { time: "1:30 pm", available: true },
    { time: "2:00 pm", available: true },
    { time: "2:30 pm", available: true },
    { time: "3:00 pm", available: true },
    { time: "3:30 pm", available: true },
    { time: "4:00 pm", available: true },
    { time: "4:30 pm", available: true },
    { time: "5:00 pm", available: true },
  ];

  function increaseDuration() {
    if (duration.value < maxDuration) {
      duration.value += 0.5;
    }
  }

  function decreaseDuration() {
    if (duration.value > minDuration) {
      duration.value -= 0.5;
    }
  }

  function nextStep() {
    if (currentStep.value < steps.length - 1) {
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

  function selectDate(date) {
    if (date.currentMonth) {
      selectedDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth(),
        date.day,
      );
    }
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
      return "text-white hover:bg-white/20";
    }
    return "text-white/40";
  }

  function resetBooking() {
    currentStep.value = 0;
    booking.value = {
      type: "",
      service: "",
      lane: "",
      date: "",
      selectedTime: null,
      fullName: "",
      phone: "",
      email: "",
      notes: "",
    };
    duration.value = 1;
  }
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
