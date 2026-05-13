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

          <!-- Loading -->
          <div
            v-if="isLoadingServices"
            class="text-gray-500 text-sm mb-4"
          >
            <svg
              class="w-4 h-4 animate-spin inline mr-2"
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
            Loading services...
          </div>

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
                @change="
                  booking.service = '';
                  booking.lane = '';
                "
                class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
              >
                <option value="">I am a...</option>
                <option
                  v-for="cat in categories"
                  :key="cat._id"
                  :value="cat._id"
                >
                  {{ cat.categoryName }}
                </option>
              </select>
            </div>
            <!-- Service -->
            <div>
              <label class="block text-[#1a3a35] font-semibold mb-2"
                >Service</label
              >
              <select
                v-model="booking.service"
                @change="booking.lane = ''"
                class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
              >
                <option value="">Select service</option>
                <option
                  v-for="svc in filteredServices"
                  :key="svc._id"
                  :value="svc._id"
                >
                  {{ svc.title }} (A${{ svc.price }})
                </option>
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
                  v-for="res in serviceResources"
                  :key="res._id"
                  :value="res._id"
                >
                  {{ res.title }}
                </option>
              </select>
            </div>
            <!-- Duration -->
            <div>
              <label class="block text-[#1a3a35] font-semibold mb-2"
                >Duration</label
              >
              <div
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
          <div class="max-w-xs mb-8">
            <label class="block text-[#1a3a35] font-semibold mb-2"
              >Select a Date</label
            >
            <input
              v-model="booking.date"
              type="date"
              :min="todayStr"
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
            <span class="font-semibold">{{ selectedServiceTitle }}</span>
            by <span class="font-semibold">{{ selectedResourceTitle }}</span
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
            <span class="font-semibold">{{ selectedServiceTitle }}</span>
            by <span class="font-semibold">{{ selectedResourceTitle }}</span> at
            <span class="font-semibold">{{ booking.selectedTime }}</span> on
            <span class="font-semibold">{{ selectedDateFormatted }}</span
            >. The price for the service is
            <span class="font-semibold">A${{ totalPrice.toFixed(2) }}</span
            >.<br />
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
                  <option>🇦🇺 +61</option>
                  <option>🇱🇰 +94</option>
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

          <!-- Registration Error -->
          <div
            v-if="registrationError"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6"
          >
            {{ registrationError }}
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
              @click="registerUser"
              :disabled="!isStep3Valid || isRegisteringUser"
              class="bg-[#1a3a35] text-white px-8 py-3 rounded font-semibold hover:bg-[#2a4a45] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <span v-if="isRegisteringUser">Registering...</span>
              <span v-else>NEXT</span>
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
                <span class="text-gray-600">{{ selectedServiceTitle }}</span>
                <span class="font-medium">A${{ totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">{{ selectedResourceTitle }}</span>
                <span class="font-medium">{{ booking.selectedTime }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">Date</span>
                <span class="font-medium">{{ selectedDateFormatted }}</span>
              </div>
              <div class="border-t border-gray-300 my-3"></div>
              <div class="flex justify-between">
                <span class="font-semibold">Total</span>
                <span class="font-bold text-[#1a3a35]"
                  >A${{ totalPrice.toFixed(2) }}</span
                >
              </div>
            </div>

            <!-- Payment Methods -->
            <div class="space-y-3 mb-6">
              <label
                class="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all"
                :class="selectedPaymentMethod === 'card' ? 'border-[#1a3a35] bg-green-50' : 'border-gray-200 hover:border-gray-300'"
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  v-model="selectedPaymentMethod"
                  class="w-4 h-4 text-[#1a3a35]"
                />
                <span class="font-medium">Credit/Debit Card (Stripe)</span>
              </label>
              <label
                class="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all"
                :class="selectedPaymentMethod === 'paylater' ? 'border-[#1a3a35] bg-green-50' : 'border-gray-200 hover:border-gray-300'"
              >
                <input
                  type="radio"
                  name="payment"
                  value="paylater"
                  v-model="selectedPaymentMethod"
                  class="w-4 h-4 text-[#1a3a35]"
                />
                <span class="font-medium">Pay at Counter</span>
              </label>
            </div>

            <!-- Card Form - Only show if card is selected -->
            <div v-if="selectedPaymentMethod === 'card'" class="space-y-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Card Number</label
                >
                <input
                  type="text"
                  placeholder="Will be redirected to Stripe secure checkout"
                  disabled
                  class="w-full border border-gray-300 rounded px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
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
                    disabled
                    class="w-full border border-gray-300 rounded px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >CVC</label
                  >
                  <input
                    type="text"
                    placeholder="123"
                    disabled
                    class="w-full border border-gray-300 rounded px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-2">
                ℹ️ You will be redirected to Stripe's secure checkout page to complete your payment.
              </p>
            </div>

            <!-- Booking Error -->
            <div
              v-if="bookingError"
              class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6"
            >
              {{ bookingError }}
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between items-center">
              <button
                @click="prevStep"
                class="bg-gray-200 text-gray-700 px-8 py-3 rounded font-semibold hover:bg-gray-300 transition-colors"
              >
                BACK
              </button>
              <div class="flex gap-3">
                <button
                  v-if="selectedPaymentMethod === 'paylater'"
                  @click="completeBooking"
                  :disabled="isCreatingBooking"
                  class="bg-white border-2 border-[#1a3a35] text-[#1a3a35] px-6 py-3 rounded font-semibold hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Pay Later
                </button>
                <button
                  @click="completeBooking"
                  :disabled="isCreatingBooking"
                  class="bg-[#1a3a35] text-white px-8 py-3 rounded font-semibold hover:bg-[#2a4a45] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <span v-if="isCreatingBooking">Processing...</span>
                  <span v-else-if="selectedPaymentMethod === 'card'">Proceed to Stripe Checkout</span>
                  <span v-else>Confirm Booking</span>
                </button>
              </div>
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
  import {
    GetVisibleServices,
    GetBookingSlots,
    RegisterBookingUser,
    CreateBooking,
    CreateStripeSession,
  } from "@/services/apiService.js";
  import { loadStripe } from '@stripe/stripe-js';

  const steps = ["Service", "Time", "Details", "Payment", "Done"];
  const currentStep = ref(0);

  const durationMultiplier = ref(1);
  const maxTotalHours = 12.5; // max 12 hours 30 minutes

  const currentDate = ref(new Date());
  const selectedDate = ref(new Date());

  // Visible services from API
  const visibleServices = ref([]);
  const isLoadingServices = ref(false);

  const booking = ref({
    type: "",
    service: "",
    lane: "",
    date: formatDateInput(new Date()),
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

  const todayStr = formatDateInput(new Date());

  async function fetchVisibleServices() {
    isLoadingServices.value = true;
    try {
      const response = await GetVisibleServices();
      if (response.isSuccess) {
        visibleServices.value = response.value || [];
      }
    } catch (error) {
      console.error("Error fetching visible services:", error);
    } finally {
      isLoadingServices.value = false;
    }
  }

  onMounted(() => {
    fetchVisibleServices();
  });

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

  const minDurationMultiplier = computed(() => {
    if (!baseDurationMinutes.value || baseDurationMinutes.value <= 0) return 1;
    return Math.ceil(60 / baseDurationMinutes.value); // minimum 1 hour
  });

  const maxDurationMultiplier = computed(() => {
    if (!baseDurationMinutes.value || baseDurationMinutes.value <= 0) return 1;
    return Math.floor((maxTotalHours * 60) / baseDurationMinutes.value);
  });

  // Reset duration to minimum (1 hour) whenever service changes
  watch(selectedService, () => {
    durationMultiplier.value = minDurationMultiplier.value || 1;
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
    if (!booking.value.date || !booking.value.lane) return;
    isLoadingSlots.value = true;
    try {
      const response = await GetBookingSlots(
        booking.value.date,
        booking.value.lane,
      );
      if (response.isSuccess) {
        timeSlots.value = response.value || [];
      } else {
        timeSlots.value = [];
      }
    } catch (error) {
      console.error("Error fetching booking slots:", error);
      timeSlots.value = [];
    } finally {
      isLoadingSlots.value = false;
    }
  }

  // Fetch slots whenever user enters Step 2
  watch(currentStep, (step) => {
    if (step === 1) {
      fetchBookingSlots();
    }
  });

  const registeredUserId = ref("");
  const registrationError = ref("");
  const isRegisteringUser = ref(false);
  const isCreatingBooking = ref(false);
  const bookingError = ref("");
  const selectedPaymentMethod = ref("card"); // 'card' for Stripe, 'paylater' for local

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
        registrationError.value =
          response.errorMessage ||
          response.userMessage ||
          "Registration failed.";
      }
    } catch (error) {
      registrationError.value = "Network error. Please try again.";
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
      
      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/booking/success`;
      const cancelUrl = `${baseUrl}/booking/cancel`;
      
      const bookingData = {
        userId: registeredUserId.value,
        categoryId: booking.value.type,
        resourceId: booking.value.lane,
        serviceId: booking.value.service,
        duration: totalDurationMinutes.value,
        date: booking.value.date,
        startTime: formatMinutesToTime(startMins),
        endTime: formatMinutesToTime(endMins),
        note: booking.value.notes || "",
        paymentMethod: selectedPaymentMethod.value === 'card' ? 'stripe' : 'local',
        successUrl,
        cancelUrl,
      };
      
      const response = await CreateBooking(bookingData);
      
      if (response.isSuccess) {
        // If Stripe session was created, redirect to Stripe checkout
        if (response.value?.stripeSessionUrl) {
          window.location.href = response.value.stripeSessionUrl;
        } else {
          // Local payment - go to success page
          currentStep.value++;
        }
      } else {
        bookingError.value =
          response.errorMessage || response.userMessage || "Booking failed.";
      }
    } catch (error) {
      console.error('Booking error:', error);
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
      date: formatDateInput(new Date()),
      selectedTime: null,
      fullName: "",
      phone: "",
      email: "",
      notes: "",
    };
    durationMultiplier.value = 1;
    registeredUserId.value = "";
    registrationError.value = "";
    bookingError.value = "";
    timeSlots.value = [];
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
