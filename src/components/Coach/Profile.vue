<template>
  <div class="min-h-screen bg-[#faf9f7] py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Loading -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center py-20"
      >
        <div
          class="w-10 h-10 border-4 border-[#1a3a35] border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-gray-500 text-sm">Loading profile...</p>
      </div>

      <template v-else>
        <!-- Header Card with Profile Summary -->
        <div class="bg-[#1a3a35] rounded-2xl shadow-lg overflow-hidden mb-6">
          <!-- Cover Image Area -->
          <div class="h-32 bg-gradient-to-r from-[#1a3a35] to-primary relative">
            <!-- Top Actions -->
            <div class="absolute top-4 right-4 flex items-center gap-2">
              <!-- Logout Button -->
              <button
                @click="handleLogout"
                class="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                Logout
              </button>
            </div>
            <!-- <button
            class="absolute border border-secondary top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Book a Lane
          </button> -->
          </div>

          <!-- Profile Info -->
          <div class="px-4 sm:px-8 pb-6 relative">
            <!-- Avatar - Centered on mobile, left on desktop -->
            <div
              class="flex flex-col sm:block items-center sm:absolute sm:-top-12 sm:left-8"
            >
              <div class="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                <div
                  class="w-full h-full rounded-full bg-[#1a3a35] flex items-center justify-center text-white text-3xl font-bold"
                >
                  {{ userInitials }}
                </div>
              </div>
              <div
                class="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center hidden sm:flex"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            <!-- User Info - Below avatar on mobile, beside on desktop -->
            <div class="mt-4 sm:mt-0 sm:ml-32 sm:pt-4 text-center sm:text-left">
              <div
                class="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-1"
              >
                <h1 class="text-2xl font-bold text-white">{{ user.name }}</h1>
                <span
                  class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                >
                  <span class="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Coach
                </span>
              </div>
              <p class="text-white/70 text-sm">{{ user.email }}</p>
            </div>

            <!-- Stats Row - Grid on mobile, flex on desktop -->
            <div class="grid grid-cols-2 gap-4 mt-6 sm:flex sm:gap-8 sm:ml-32">
              <div class="text-center sm:text-left">
                <p class="text-white/60 text-xs uppercase tracking-wider">
                  Joined
                </p>
                <p class="text-white font-semibold">{{ user.memberSince }}</p>
              </div>
              <div class="text-center sm:text-left">
                <p class="text-white/60 text-xs uppercase tracking-wider">
                  Category
                </p>
                <p class="text-white font-semibold">
                  {{ user.categoryName || "-" }}
                </p>
              </div>
              <div class="text-center sm:text-left">
                <p class="text-white/60 text-xs uppercase tracking-wider">
                  Last Session
                </p>
                <p class="text-white font-semibold">{{ user.lastBooking }}</p>
              </div>
              <div class="text-center sm:text-left">
                <p class="text-white/60 text-xs uppercase tracking-wider">
                  Total Sessions
                </p>
                <p class="text-white font-semibold">{{ user.totalBookings }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Quick Action Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <!-- Coach Schedule Button -->
          <router-link
            to="/dashboard/calender"
            class="block"
          >
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[#1a3a35]/30 transition-all group cursor-pointer"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-14 h-14 rounded-xl bg-[#1a3a35]/10 flex items-center justify-center group-hover:bg-[#1a3a35] transition-colors"
                >
                  <svg
                    class="w-7 h-7 text-[#1a3a35] group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3
                    class="font-semibold text-gray-900 group-hover:text-[#1a3a35] transition-colors"
                  >
                    My Schedule
                  </h3>
                  <p class="text-sm text-gray-500">
                    View your coaching sessions
                  </p>
                </div>
                <svg
                  class="w-5 h-5 text-gray-400 ml-auto group-hover:text-[#1a3a35] group-hover:translate-x-1 transition-all"
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
              </div>
            </div>
          </router-link>

          <!-- Booking Calendar Button -->
          <router-link
            to="/dashboard/calender"
            class="block"
          >
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[#1a3a35]/30 transition-all group cursor-pointer"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-colors"
                >
                  <svg
                    class="w-7 h-7 text-green-600 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3
                    class="font-semibold text-gray-900 group-hover:text-green-600 transition-colors"
                  >
                    Booking Calendar
                  </h3>
                  <p class="text-sm text-gray-500">View all your bookings</p>
                </div>
                <svg
                  class="w-5 h-5 text-gray-400 ml-auto group-hover:text-green-600 group-hover:translate-x-1 transition-all"
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
              </div>
            </div>
          </router-link>
        </div>

        <!-- Tabs Navigation -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div class="flex border-b border-gray-100">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="flex-1 py-4 text-sm font-medium transition-colors relative"
              :class="
                activeTab === tab.id
                  ? 'text-[#1a3a35]'
                  : 'text-gray-500 hover:text-gray-700'
              "
            >
              <span class="flex items-center justify-center gap-2">
                <i :class="['pi', tab.icon]"></i>
                {{ tab.label }}
              </span>
              <div
                v-if="activeTab === tab.id"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a3a35]"
              ></div>
            </button>
          </div>

          <!-- Tab Content -->
          <div class="p-8">
            <!-- Profile Tab -->
            <div
              v-if="activeTab === 'profile'"
              class="space-y-6"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- First Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >First Name</label
                  >
                  <input
                    v-model="user.firstName"
                    type="text"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                  />
                </div>
                <!-- Last Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Last Name</label
                  >
                  <input
                    v-model="user.lastName"
                    type="text"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Email Address</label
                >
                <div class="relative">
                  <span
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </span>
                  <input
                    v-model="user.email"
                    type="email"
                    class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                  />
                </div>
                <p class="mt-2 text-sm text-[#1a3a35] flex items-center gap-1">
                  <svg
                    class="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  VERIFIED {{ user.verifiedDate }}
                </p>
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Phone Number</label
                >
                <div class="flex">
                  <select
                    class="bg-white border border-r-0 border-gray-200 rounded-l-lg px-4 py-3 text-gray-700 focus:outline-none"
                  >
                    <option>🇱🇰 +94</option>
                    <option>🇦🇺 +61</option>
                  </select>
                  <input
                    v-model="user.phone"
                    type="tel"
                    class="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-r-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <!-- Error Message -->
              <p
                v-if="updateError"
                class="text-red-500 text-sm text-center"
              >
                {{ updateError }}
              </p>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row justify-between gap-3 pt-4">
                <button
                  @click="openDeleteModal"
                  class="px-6 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
                >
                  Delete Account
                </button>
                <div class="flex gap-3">
                  <button
                    @click="fetchProfile"
                    class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    @click="saveProfile"
                    :disabled="isSaving"
                    class="px-6 py-3 bg-[#1a3a35] text-white rounded-lg font-medium hover:bg-[#2a4a45] transition-colors disabled:opacity-50"
                  >
                    {{ isSaving ? "Saving..." : "Save Changes" }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Settings Tab -->
            <div
              v-if="activeTab === 'settings'"
              class="space-y-6"
            >
              <!-- Change Password -->
              <div class="border-b border-gray-100 pb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                  Change Password
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Current Password</label
                    >
                    <input
                      type="password"
                      class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >New Password</label
                    >
                    <input
                      type="password"
                      class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Confirm New Password</label
                    >
                    <input
                      type="password"
                      class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
                    />
                  </div>
                </div>
              </div>

              <!-- Notifications -->
              <div class="border-b border-gray-100 pb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                  Notifications
                </h3>
                <div class="space-y-3">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked
                      class="w-4 h-4 text-[#1a3a35] rounded focus:ring-[#1a3a35]"
                    />
                    <span class="text-gray-700"
                      >Email notifications for booking confirmations</span
                    >
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked
                      class="w-4 h-4 text-[#1a3a35] rounded focus:ring-[#1a3a35]"
                    />
                    <span class="text-gray-700"
                      >SMS reminders before appointments</span
                    >
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      class="w-4 h-4 text-[#1a3a35] rounded focus:ring-[#1a3a35]"
                    />
                    <span class="text-gray-700"
                      >Marketing emails and promotions</span
                    >
                  </label>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-end gap-3">
                <button
                  class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  @click="saveProfile"
                  :disabled="isSaving"
                  class="px-6 py-3 bg-[#1a3a35] text-white rounded-lg font-medium hover:bg-[#2a4a45] transition-colors disabled:opacity-50"
                >
                  {{ isSaving ? "Saving..." : "Save Settings" }}
                </button>
              </div>
            </div>

            <!-- History Tab -->
            <div
              v-if="activeTab === 'History'"
              class="space-y-6"
            >
              <!-- History Type Toggle -->
              <div class="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
                <button
                  @click="historyType = 'bookings'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-all',
                    historyType === 'bookings'
                      ? 'bg-[#1a3a35] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900',
                  ]"
                >
                  Booking History
                </button>
                <button
                  @click="historyType = 'payments'"
                  :class="[
                    'px-4 py-2 rounded-md text-sm font-medium transition-all',
                    historyType === 'payments'
                      ? 'bg-[#1a3a35] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900',
                  ]"
                >
                  Payment History
                </button>
              </div>

              <!-- Booking History -->
              <div
                v-if="historyType === 'bookings'"
                class="space-y-3"
              >
                <div
                  v-for="booking in bookingHistory"
                  :key="booking.id"
                  class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#1a3a35]/30 transition-colors"
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {{ booking.service }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ booking.lane }} • {{ booking.date }}
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-900">
                      {{ booking.time }}
                    </p>
                    <span
                      :class="[
                        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                        booking.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'Upcoming'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700',
                      ]"
                    >
                      {{ booking.status }}
                    </span>
                  </div>
                </div>

                <!-- Empty State -->
                <div
                  v-if="bookingHistory.length === 0"
                  class="text-center py-12"
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
                      ></path>
                    </svg>
                  </div>
                  <p class="text-gray-500">No booking history available</p>
                </div>
              </div>

              <!-- Payment History -->
              <div
                v-if="historyType === 'payments'"
                class="space-y-3"
              >
                <div
                  v-for="payment in paymentHistory"
                  :key="payment.id"
                  class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#1a3a35]/30 transition-colors"
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="w-10 h-10 rounded-full bg-[#1a3a35]/10 flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-[#1a3a35]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {{ payment.description }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ payment.date }} • {{ payment.method }}
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-900">
                      {{ payment.amount }}
                    </p>
                    <span
                      :class="[
                        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                        payment.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700',
                      ]"
                    >
                      {{ payment.status }}
                    </span>
                  </div>
                </div>

                <!-- Empty State -->
                <div
                  v-if="paymentHistory.length === 0"
                  class="text-center py-12"
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
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      ></path>
                    </svg>
                  </div>
                  <p class="text-gray-500">No payment history available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      >
        <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <div class="text-center mb-6">
            <div
              class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">
              Delete Your Account?
            </h3>
            <p class="text-gray-500 text-sm">
              This action cannot be undone. All your data will be permanently
              removed.
            </p>
          </div>

          <p
            v-if="deleteError"
            class="text-red-500 text-sm text-center mb-4"
          >
            {{ deleteError }}
          </p>

          <div class="flex gap-3">
            <button
              @click="closeDeleteModal"
              class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              :disabled="isDeleting"
              class="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {{ isDeleting ? "Deleting..." : "Delete" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth.js";
  import {
    GetUserById,
    UpdateUser,
    DeleteUser,
  } from "@/services/apiService.js";

  const router = useRouter();
  const authStore = useAuthStore();
  const activeTab = ref("profile");
  const isLoading = ref(false);
  const isSaving = ref(false);
  const isDeleting = ref(false);
  const showDeleteModal = ref(false);
  const updateError = ref("");
  const deleteError = ref("");

  const tabs = [
    { id: "profile", label: "Profile", icon: "pi-user" },
    { id: "settings", label: "Settings", icon: "pi-cog" },
    { id: "History", label: "History", icon: "pi-history" },
  ];

  const historyType = ref("bookings");

  const user = ref({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subscriptionStatus: "Active",
    memberSince: "",
    lastBooking: "-",
    totalBookings: "0",
    verifiedDate: "",
    _id: "",
    categoryName: "",
  });

  const userInitials = computed(() => {
    if (!user.value.name) return "?";
    const parts = user.value.name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  });

  async function fetchProfile() {
    const userId = authStore.user?.id;
    if (!userId) return;
    isLoading.value = true;
    try {
      const response = await GetUserById(userId);
      if (response.isSuccess && response.value) {
        const data = response.value;
        const nameParts = (data.name || "").trim().split(" ");
        user.value = {
          ...user.value,
          _id: data._id,
          name: data.name || "",
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          email: data.email || "",
          phone: data.phoneNumber || "",
          subscriptionStatus: data.isActive ? "Active" : "Inactive",
          memberSince: data.createdAt
            ? new Date(data.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "",
          categoryName: data.categoryID?.categoryName || "",
        };
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      isLoading.value = false;
    }
  }

  async function saveProfile() {
    updateError.value = "";
    isSaving.value = true;
    try {
      const payload = {
        name: `${user.value.firstName} ${user.value.lastName}`.trim(),
        email: user.value.email,
        phoneNumber: user.value.phone,
      };
      const response = await UpdateUser(user.value._id, payload);
      if (response.isSuccess) {
        // Refresh profile data
        await fetchProfile();
        activeTab.value = "profile";
      } else {
        updateError.value = response.userMessage || "Failed to update profile.";
      }
    } catch (error) {
      updateError.value = "An error occurred. Please try again.";
      console.error("Update error:", error);
    } finally {
      isSaving.value = false;
    }
  }

  function handleLogout() {
    authStore.setUser(null);
    authStore.setAccessToken(null);
    router.push("/member/login");
  }

  function openDeleteModal() {
    showDeleteModal.value = true;
    deleteError.value = "";
  }

  function closeDeleteModal() {
    showDeleteModal.value = false;
    deleteError.value = "";
  }

  async function confirmDelete() {
    deleteError.value = "";
    isDeleting.value = true;
    try {
      const response = await DeleteUser(user.value._id);
      if (response.isSuccess) {
        authStore.setUser(null);
        authStore.setAccessToken(null);
        router.push("/");
      } else {
        deleteError.value = response.userMessage || "Failed to delete account.";
      }
    } catch (error) {
      deleteError.value = "An error occurred. Please try again.";
      console.error("Delete error:", error);
    } finally {
      isDeleting.value = false;
    }
  }

  const paymentHistory = ref([]);
  const bookingHistory = ref([]);

  onMounted(() => {
    fetchProfile();
  });
</script>
