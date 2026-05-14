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

              <!-- Buy Membership Link -->
              <router-link
                v-if="!hasMembership"
                to="/member/membership"
                class="bg-white text-[#1a3a35] hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shadow-lg animate-pulse"
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
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Buy a Membership
              </router-link>
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
                  class="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                >
                  <span class="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  {{ user.subscriptionStatus }}
                </span>
              </div>
              <p class="text-white/70 text-sm">{{ user.email }}</p>
            </div>

            <!-- Stats Row - Grid on mobile, flex on desktop -->
            <div class="grid grid-cols-2 gap-4 mt-6 sm:flex sm:gap-8 sm:ml-32">
              <div class="text-center sm:text-left">
                <p class="text-white/60 text-xs uppercase tracking-wider">
                  Member Since
                </p>
                <p class="text-white font-semibold">{{ user.memberSince }}</p>
              </div>
              <div class="text-center sm:text-left">
                <p class="text-white/60 text-xs uppercase tracking-wider">
                  Last Booking
                </p>
                <p class="text-white font-semibold">{{ user.lastBooking }}</p>
              </div>
              <div class="text-center sm:text-left">
                <p class="text-white/60 text-xs uppercase tracking-wider">
                  Total Bookings
                </p>
                <p class="text-white font-semibold">{{ user.totalBookings }}</p>
              </div>
              <div class="text-center sm:text-left">
                <p class="text-white/60 text-xs uppercase tracking-wider">
                  Membership
                </p>
                <p class="text-white font-semibold">
                  <span v-if="user.membership">{{ user.membership }}</span>
                  <router-link
                    v-else
                    to="/member/membership"
                    class="inline-flex items-center gap-1 bg-white text-[#1a3a35] px-3 py-1 rounded-md text-xs font-bold hover:bg-green-50 transition-colors"
                  >
                    <svg
                      class="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      ></path>
                    </svg>
                    Buy
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Quick Action Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <!-- Book a Lane Button -->
          <div
            @click="goToBooking"
            class="block"
          >
            <div
              class="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all group cursor-pointer"
              :class="
                hasMembership
                  ? 'border-secondary hover:border-[#1a3a35]/30'
                  : 'border-gray-200 opacity-60 cursor-not-allowed'
              "
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-14 h-14 rounded-xl flex items-center justify-center transition-colors"
                  :class="
                    hasMembership
                      ? 'bg-[#1a3a35]/10 group-hover:bg-[#1a3a35]'
                      : 'bg-gray-100'
                  "
                >
                  <svg
                    class="w-7 h-7 transition-colors"
                    :class="
                      hasMembership
                        ? 'text-[#1a3a35] group-hover:text-white'
                        : 'text-gray-400'
                    "
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
                    class="font-semibold transition-colors"
                    :class="
                      hasMembership
                        ? 'text-gray-900 group-hover:text-[#1a3a35]'
                        : 'text-gray-400'
                    "
                  >
                    Book a Lane
                  </h3>
                  <p class="text-sm text-gray-500">
                    {{
                      hasMembership
                        ? "Reserve your training session"
                        : "Membership required"
                    }}
                  </p>
                </div>
                <svg
                  class="w-5 h-5 ml-auto transition-all"
                  :class="
                    hasMembership
                      ? 'text-gray-400 group-hover:text-[#1a3a35] group-hover:translate-x-1'
                      : 'text-gray-300'
                  "
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
          </div>

          <!-- Booking Calendar Button -->
          <router-link
            to="#"
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
              class="space-y-8"
            >
              <!-- Quick Actions -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-6">
                  Quick Actions
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Booking Cancellation Button -->
                  <router-link
                    to="/booking/cancel"
                    class="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-300 transition-all duration-300 cursor-pointer"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center gap-3 mb-3">
                          <div
                            class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          >
                            <svg
                              class="w-6 h-6 text-white"
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
                          </div>
                          <div>
                            <h4
                              class="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors"
                            >
                              Cancel Booking
                            </h4>
                            <p class="text-sm text-gray-600">
                              Cancel an existing booking
                            </p>
                          </div>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">
                          Submit a cancellation request for your booking
                        </p>
                      </div>
                      <svg
                        class="w-5 h-5 text-orange-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all duration-300"
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
                    </div>
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 group-hover:from-orange-500/10 group-hover:via-orange-500/10 group-hover:to-orange-500/10 transition-all duration-500"
                    ></div>
                  </router-link>

                  <!-- Member Cancellation Button -->
                  <button
                    v-if="!isMembershipCancelled"
                    @click="handleMemberCancellation"
                    class="group relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 hover:shadow-lg hover:border-red-300 transition-all duration-300 cursor-pointer w-full text-left"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center gap-3 mb-3">
                          <div
                            class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          >
                            <svg
                              class="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4
                              class="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors"
                            >
                              Cancel Membership
                            </h4>
                            <p class="text-sm text-gray-600">
                              Cancel your membership
                            </p>
                          </div>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">
                          Request membership cancellation and account closure
                        </p>
                      </div>
                      <svg
                        class="w-5 h-5 text-red-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-300"
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
                    </div>
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 group-hover:from-red-500/10 group-hover:via-red-500/10 group-hover:to-red-500/10 transition-all duration-500"
                    ></div>
                  </button>
                </div>
              </div>

              <!-- Important Notice -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 class="text-sm font-semibold text-blue-900 mb-1">
                      Important Notice
                    </h4>
                    <p class="text-xs text-blue-800">
                      Cancellation requests will be reviewed by our team. You
                      will receive a confirmation email once your request is
                      processed. Cancellations made less than 4 hours before the
                      session may not be eligible for a refund.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Membership Cancellation Modal -->
            <div
              v-if="showCancellationModal"
              class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              @click="closeCancellationModal"
            >
              <div
                class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                @click.stop
              >
                <!-- Modal Header -->
                <div class="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"
                      >
                        <svg
                          class="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <h3 class="text-xl font-bold text-white">
                        Cancel Membership
                      </h3>
                    </div>
                    <button
                      @click="closeCancellationModal"
                      class="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
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

                <!-- Modal Body -->
                <div class="p-6">
                  <p class="text-gray-600 text-sm mb-6">
                    Please review your cancellation request below. Our team will
                    contact you to process the cancellation.
                  </p>

                  <!-- Email (Read-only) -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      v-model="cancellationForm.email"
                      type="email"
                      readonly
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  <!-- Note -->
                  <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Note <span class="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <textarea
                      v-model="cancellationForm.note"
                      rows="4"
                      placeholder="Please provide a reason for cancellation..."
                      class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    ></textarea>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex gap-3">
                    <button
                      @click="closeCancellationModal"
                      :disabled="isCancelling"
                      class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      @click="submitMembershipCancellation"
                      :disabled="isCancelling"
                      class="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <svg
                        v-if="isCancelling"
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
                      {{ isCancelling ? "Submitting..." : "Submit Request" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Success Modal -->
            <div
              v-if="showSuccessModal"
              class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <div
                class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              >
                <div class="p-8 text-center">
                  <div
                    class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <svg
                      class="w-10 h-10 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">
                    Request Submitted!
                  </h3>
                  <p class="text-gray-600 mb-6">
                    Your membership cancellation request has been submitted
                    successfully. Our team will review your request and contact
                    you soon.
                  </p>
                  <button
                    @click="showSuccessModal = false"
                    class="w-full px-6 py-3 bg-[#1a3a35] text-white rounded-lg font-medium hover:bg-[#2a4a45] transition-colors"
                  >
                    Close
                  </button>
                </div>
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
                        ID: {{ booking.bookingId }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ booking.lane }} • {{ booking.date }}
                      </p>
                      <p class="text-xs text-gray-400 mt-1">
                        • Duration: {{ booking.duration }}min
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
                          : booking.status === 'Confirmed'
                            ? 'bg-blue-100 text-blue-700'
                            : booking.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700'
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
                    <!-- Icon: Membership vs Booking -->
                    <div
                      :class="[
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        payment.type === 'membership'
                          ? 'bg-purple-100'
                          : 'bg-[#1a3a35]/10',
                      ]"
                    >
                      <!-- Membership Icon -->
                      <svg
                        v-if="payment.type === 'membership'"
                        class="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        ></path>
                      </svg>
                      <!-- Booking Icon -->
                      <svg
                        v-else
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
                        {{ payment.subInfo }} • {{ payment.date }}
                      </p>
                      <p class="text-xs text-gray-400 mt-1">
                        {{ payment.method }}
                        <span v-if="payment.duration"> • {{ payment.duration }}</span>
                        <span
                          :class="[
                            'ml-1 px-1.5 py-0.5 rounded text-[10px] font-medium',
                            payment.type === 'membership'
                              ? 'bg-purple-100 text-purple-600'
                              : 'bg-blue-100 text-blue-600',
                          ]"
                        >{{ payment.type }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-900">
                      {{ payment.amount }}
                      <span class="text-xs text-gray-400 font-normal">{{ payment.currency }}</span>
                    </p>
                    <span
                      :class="[
                        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                        payment.status === 'Success'
                          ? 'bg-green-100 text-green-700'
                          : payment.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700',
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
    CancelMembership,
    GetBookingHistory,
    GetPaymentHistory,
  } from "@/services/apiService.js";

  const router = useRouter();
  const authStore = useAuthStore();
  const activeTab = ref("profile");
  const isLoading = ref(false);
  const isSaving = ref(false);
  const isDeleting = ref(false);
  const isCancelling = ref(false);
  const showDeleteModal = ref(false);
  const showCancellationModal = ref(false);
  const showSuccessModal = ref(false);
  const updateError = ref("");
  const deleteError = ref("");

  const cancellationForm = ref({
    email: "",
    note: "",
  });

  const isMembershipCancelled = computed(() => {
    return localStorage.getItem("membershipCancelled") === "true";
  });

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
    membership: "",
    verifiedDate: "",
    membershipId: null,
    _id: "",
    categoryName: "",
  });

  const userInitials = computed(() => {
    if (!user.value.name) return "?";
    const parts = user.value.name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  });

  const hasMembership = computed(() => {
    return !!user.value.membershipId;
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
          membership: data.membershipId?.name || "",
          membershipId: data.membershipId || null,
          categoryName: data.categoryID?.categoryName || "",
          lastBooking: data.lastBooking || "-",
          totalBookings: data.totalBookings || "0",
          verifiedDate: data.verifiedAt
            ? new Date(data.verifiedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "",
        };

        // Fetch booking history and payment history after user data is loaded
        await fetchBookingHistory();
        await fetchPaymentHistory();
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

  function handleMemberCancellation() {
    // Auto-fill email from user profile
    cancellationForm.value = {
      email: user.value.email,
      note: "",
    };
    showCancellationModal.value = true;
  }

  function closeCancellationModal() {
    if (!isCancelling.value) {
      showCancellationModal.value = false;
      cancellationForm.value = {
        email: "",
        note: "",
      };
    }
  }

  async function submitMembershipCancellation() {
    isCancelling.value = true;

    try {
      const payload = {
        email: cancellationForm.value.email,
        note: cancellationForm.value.note.trim() || "Not provided",
      };

      const response = await CancelMembership(payload);

      if (response.isSuccess) {
        // Close cancellation modal
        showCancellationModal.value = false;

        // Show success modal
        showSuccessModal.value = true;

        // Store in localStorage to prevent future submissions
        localStorage.setItem("membershipCancelled", "true");

        // Reset form
        cancellationForm.value = {
          email: "",
          note: "",
        };
      } else {
        alert(
          response.userMessage ||
            "Failed to submit cancellation request. Please try again.",
        );
      }
    } catch (error) {
      console.error("[MEMBERSHIP CANCELLATION] Error:", error);
      alert(
        error.response?.data?.userMessage ||
          "Failed to submit cancellation request. Please try again.",
      );
    } finally {
      isCancelling.value = false;
    }
  }

  function handleLogout() {
    authStore.setUser(null);
    authStore.setAccessToken(null);
    router.push("/member/login");
  }

  function goToBooking() {
    if (!hasMembership.value) return;
    const userId = authStore.user?.id || user.value._id;
    router.push(`/member/booking?userId=${userId}`);
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

  async function fetchPaymentHistory() {
    if (!user.value?._id) return;

    try {
      const response = await GetPaymentHistory(user.value._id);

      if (response.isSuccess && response.value) {
        paymentHistory.value = response.value.payments.map((payment) => ({
          id: payment._id,
          // Description: show membership name OR booking resource + bookingId
          description:
            payment.type === 'membership'
              ? payment.membership?.name || 'Membership Payment'
              : `${payment.booking?.resource?.title || 'Booking'} — ${payment.booking?.bookingId || ''}`,
          // Sub-info: booking shows date+time, membership shows type
          subInfo:
            payment.type === 'membership'
              ? payment.membership?.type || ''
              : payment.booking?.time || '',
          date: new Date(payment.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          method: payment.paymentMethod === 'stripe' ? 'Stripe' : 'Local',
          amount: payment.amount > 0 ? `$${payment.amount}` : 'Free',
          currency: (payment.currency || 'AUD').toUpperCase(),
          status:
            payment.status === 'success'
              ? 'Success'
              : payment.status === 'pending'
                ? 'Pending'
                : 'Failed',
          type: payment.type,
          // Extra details
          bookingId: payment.booking?.bookingId || null,
          duration: payment.duration ? `${payment.duration}min` : null,
          notes: payment.notes || null,
        }));
      }
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  }
  const bookingHistory = ref([]);

  async function fetchBookingHistory() {
    if (!user.value?._id) return;

    try {
      const response = await GetBookingHistory(user.value._id);

      if (response.isSuccess && response.value) {
        // Map API response to component format
        bookingHistory.value = response.value.bookings.map((booking) => ({
          id: booking._id,
          bookingId: booking.bookingId,
          service: booking.category?.categoryName || "Booking",
          lane: booking.resource?.title || "-",
          date: new Date(booking.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          time: `${booking.startTime} - ${booking.endTime}`,
          duration: booking.duration,
          status:
            booking.status === "COMPLETED"
              ? "Completed"
              : booking.status === "PENDING"
                ? "Pending"
                : booking.status === "CONFIRMED"
                  ? "Confirmed"
                  : booking.status === "CANCELLED"
                    ? "Cancelled"
                    : booking.status,
          paymentStatus: booking.paymentStatus,
        }));
      }
    } catch (error) {
      console.error("Error fetching booking history:", error);
    }
  }

  onMounted(() => {
    fetchProfile();
  });
</script>
