<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <!-- main section -->
    <div class="User-create-account gap-4 pr-0 md:pr-24 mt-5">
      <!-- Header with Calendar and New Appointment -->
      <div
        class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4"
      >
        <div>
          <h1 class="md:text-2xl sm:text-lg font-bold text-primary mb-2">
            Appointments
          </h1>
          <!-- Calendar & Filters -->
          <div class="flex items-center gap-3">
            <div
              class="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2"
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <input
                type="date"
                v-model="selectedDate"
                class="text-sm text-gray-700 bg-transparent border-none outline-none focus:ring-0"
              />
              <span class="text-sm text-gray-500">|</span>
              <span class="text-sm text-gray-600">{{ formattedDate }}</span>
            </div>
            <select
              v-model="selectedStatus"
              class="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] shadow-sm"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="toggleAutoSync"
            :class="[
              'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm border',
              autoSyncEnabled
                ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
            ]"
            :title="autoSyncEnabled ? 'Auto-sync ON (30s)' : 'Auto-sync OFF'"
          >
            <svg
              :class="['w-4 h-4', autoSyncEnabled ? 'animate-spin' : '']"
              style="animation-duration: 3s"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            <span v-if="autoSyncEnabled && formattedLastSync">{{
              formattedLastSync
            }}</span>
            <span v-else>Auto Sync</span>
          </button>
          <button
            @click="openNewAppointmentModal"
            class="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-[#2a4a45] transition-all shadow-lg hover:shadow-xl text-sm font-semibold"
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
              ></path>
            </svg>
            New Appointment
          </button>
        </div>
      </div>

      <!-- Quick Search Bar -->
      <div class="mb-4">
        <div
          class="relative max-w-md flex justify-between items-center space-x-6"
        >
          <div
            class="absolute inset-y-0 left-0 pl-10 flex items-center pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, lane, or service..."
            class="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent shadow-sm"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg
              class="w-5 h-5 text-gray-400 hover:text-gray-600"
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
        </div>
      </div>

      <!-- Loading -->
      <div
        v-if="isLoading"
        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center text-gray-500 text-sm"
      >
        <svg
          class="w-6 h-6 animate-spin inline mr-2"
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
        Loading appointments...
      </div>

      <!-- Modern Table -->
      <div
        v-else
        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-primary text-white">
                <th
                  class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider rounded-tl-2xl"
                >
                  Booking ID
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Date & Time
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Duration
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Resource
                </th>
                <th
                  class="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider"
                >
                  Payment
                </th>
                <th
                  class="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider rounded-tr-2xl"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="appointment in filteredAppointments"
                :key="appointment._id"
                class="hover:bg-gray-50 transition-colors group"
              >
                <!-- Booking ID -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center justify-center min-w-[2.5rem] px-2 h-10 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm group-hover:bg-[#1a3a35] group-hover:text-white transition-colors"
                  >
                    {{ appointment.bookingId }}
                  </span>
                </td>
                <!-- Date & Time -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ formatDate(appointment.date) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ appointment.startTime }} - {{ appointment.endTime }}
                  </div>
                </td>
                <!-- Duration -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
                  >
                    {{ formatDuration(appointment.duration) }}
                  </span>
                </td>
                <!-- Customer -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 bg-gradient-to-br from-[#1a3a35] to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    >
                      {{ appointment.userId?.name?.charAt(0) || "?" }}
                    </div>
                    <span class="text-sm font-medium text-gray-900">{{
                      appointment.userId?.name || "-"
                    }}</span>
                  </div>
                </td>
                <!-- Contact -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ appointment.userId?.phoneNumber || "-" }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ appointment.userId?.email || "-" }}
                  </div>
                </td>
                <!-- Type -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    appointment.type || "-"
                  }}</span>
                </td>
                <!-- Category -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    appointment.categoryId?.categoryName || "-"
                  }}</span>
                </td>
                <!-- Resource -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    v-if="appointment.resourceId"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                  >
                    {{ appointment.resourceId.title }}
                  </span>
                  <span
                    v-else
                    class="text-sm text-gray-400"
                    >-</span
                  >
                </td>
                <!-- Status -->
                <td class="px-4 py-4 whitespace-nowrap text-center relative">
                  <div class="relative inline-block">
                    <button
                      @click="
                        activeActionRow =
                          activeActionRow === appointment._id
                            ? null
                            : appointment._id
                      "
                      :class="[
                        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize cursor-pointer',
                        appointment.status === 'CONFIRMED' ||
                        appointment.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-700'
                          : appointment.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-700'
                            : appointment.status === 'CANCELLED'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700',
                      ]"
                    >
                      {{ appointment.status?.toLowerCase() }}
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
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div
                      v-if="activeActionRow === appointment._id"
                      class="absolute z-20 mt-1 right-0 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1"
                    >
                      <button
                        v-if="appointment.status !== 'CONFIRMED'"
                        @click="updateStatus(appointment, 'CONFIRMED')"
                        class="w-full text-left px-3 py-2 text-xs text-green-700 hover:bg-green-50"
                      >
                        Confirm
                      </button>
                      <button
                        v-if="appointment.status !== 'CANCELLED'"
                        @click="updateStatus(appointment, 'CANCELLED')"
                        class="w-full text-left px-3 py-2 text-xs text-red-700 hover:bg-red-50"
                      >
                        Cancel
                      </button>
                      <button
                        v-if="appointment.status !== 'PENDING'"
                        @click="updateStatus(appointment, 'PENDING')"
                        class="w-full text-left px-3 py-2 text-xs text-yellow-700 hover:bg-yellow-50"
                      >
                        Set Pending
                      </button>
                    </div>
                  </div>
                </td>
                <!-- Payment -->
                <td class="px-4 py-4 whitespace-nowrap text-center relative">
                  <div class="relative inline-block">
                    <button
                      @click="
                        activePaymentRow =
                          activePaymentRow === appointment._id
                            ? null
                            : appointment._id
                      "
                      :class="[
                        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize cursor-pointer',
                        appointment.paymentStatus === 'PAID'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700',
                      ]"
                    >
                      {{ appointment.paymentStatus?.toLowerCase() }}
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
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div
                      v-if="activePaymentRow === appointment._id"
                      class="absolute z-20 mt-1 left-1/2 -translate-x-1/2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1"
                    >
                      <button
                        v-if="appointment.paymentStatus !== 'PAID'"
                        @click="updatePaymentStatus(appointment, 'PAID')"
                        class="w-full text-left px-3 py-2 text-xs text-green-700 hover:bg-green-50"
                      >
                        Mark as Paid
                      </button>
                      <button
                        v-if="appointment.paymentStatus !== 'UNPAID'"
                        @click="updatePaymentStatus(appointment, 'UNPAID')"
                        class="w-full text-left px-3 py-2 text-xs text-orange-700 hover:bg-orange-50"
                      >
                        Mark as Unpaid
                      </button>
                    </div>
                  </div>
                </td>
                <!-- Delete -->
                <td class="px-4 py-4 whitespace-nowrap text-center">
                  <button
                    @click="confirmDeleteBooking(appointment)"
                    :disabled="deletingBookingId === appointment._id"
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      v-if="deletingBookingId === appointment._id"
                      class="w-3.5 h-3.5 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <svg
                      v-else
                      class="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-6">
        <p class="text-sm text-gray-500">
          Page {{ currentPage }} of {{ totalPages }} — {{ totalItems }} total
        </p>
        <div class="flex gap-2">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium border',
              currentPage === page
                ? 'bg-[#1a3a35] text-white border-[#1a3a35]'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- New Appointment Modal -->
    <div
      v-if="showNewAppointmentModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click="closeNewAppointmentModal"
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
              @click="closeNewAppointmentModal"
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
              <!-- User Dropdown -->
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
            <!-- Selected User -->
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

            <!-- Duration Adjustment -->
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
                    {{ formatDuration(customDurationMinutes) }}
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

            <!-- Price Display -->
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
                    {{ formatDuration(customDurationMinutes) }} duration
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

          <!-- Step 3: Select Resource -->
          <div v-if="bookingForm.categoryId">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Step 3: Select Resource <span class="text-red-500">*</span>
            </label>
            <select
              v-model="bookingForm.resourceId"
              @change="onResourceChange"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
            >
              <option value="">Select a resource...</option>
              <option
                v-for="resource in filteredResources"
                :key="resource._id"
                :value="resource._id"
              >
                {{ resource.title }}
              </option>
            </select>
          </div>

          <!-- Step 4: Select Date -->
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
          <div v-if="bookingForm.date && availableSlots.length > 0">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Step 5: Select Time Slot <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-3 md:grid-cols-4 gap-2">
              <button
                v-for="slot in availableSlots"
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

          <!-- Loading Slots -->
          <div
            v-if="bookingForm.date && loadingSlots"
            class="text-center py-4"
          >
            <div
              class="inline-block w-6 h-6 border-2 border-[#1a3a35] border-t-transparent rounded-full animate-spin"
            ></div>
            <p class="text-sm text-gray-500 mt-2">Loading available slots...</p>
          </div>

          <!-- No Slots Available -->
          <div
            v-if="
              bookingForm.date && availableSlots.length === 0 && !loadingSlots
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
              @click="closeNewAppointmentModal"
              :disabled="isCreatingBooking"
              class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              @click="createAppointment"
              :disabled="!canCreateBooking || isCreatingBooking"
              class="flex-1 px-6 py-3 bg-[#1a3a35] text-white rounded-lg font-medium hover:bg-[#2a4a45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg
                v-if="isCreatingBooking"
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
              {{ isCreatingBooking ? "Creating..." : "Create Appointment" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted, watch } from "vue";
  import {
    GetBookings,
    SearchBookings,
    ConfirmBooking,
    UpdatePaymentStatusAppoinment,
    CreateBooking,
    DeleteBooking,
    GetUsersAll,
    GetServices,
    GetResources,
    GetBookingSlots,
  } from "@/services/apiService.js";
  import Nav from "../Dashboard/UI/SecondNav.vue";

  const selectedDate = ref(new Date().toISOString().split("T")[0]);

  const formattedDate = computed(() => {
    const date = new Date(selectedDate.value);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  const searchQuery = ref("");
  const selectedStatus = ref("");
  const appointments = ref([]);
  const isLoading = ref(false);
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  const totalItems = ref(0);
  const autoSyncEnabled = ref(true);
  const lastSyncTime = ref(null);
  let searchDebounceTimer = null;
  let syncIntervalId = null;

  // New Appointment Modal State
  const showNewAppointmentModal = ref(false);
  const userSearchQuery = ref("");
  const allUsers = ref([]);
  const userSearchResults = ref([]);
  const selectedUser = ref(null);
  const services = ref([]);
  const allResources = ref([]);
  const availableSlots = ref([]);
  const loadingSlots = ref(false);
  const isCreatingBooking = ref(false);

  const bookingForm = ref({
    userId: "",
    categoryId: "",
    resourceId: "",
    date: "",
    startTime: "",
    paymentMethod: "local",
  });

  const customDurationMinutes = ref(0);

  const filteredResources = computed(() => {
    if (!bookingForm.value.categoryId) return [];
    const selectedService = services.value.find(
      (s) => s._id === bookingForm.value.categoryId,
    );
    return selectedService?.resourceIDs || [];
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

  function mapSearchBooking(booking) {
    const rawDate = booking.date || "";
    const dateOnly = rawDate.includes("T") ? rawDate.split("T")[0] : rawDate;
    return {
      _id: booking._id,
      bookingId: booking.bookingId,
      date: dateOnly,
      startTime: booking.startTime,
      endTime: booking.endTime,
      duration: booking.duration,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      userId: {
        name: booking.userName || booking.user?.name || "-",
        phoneNumber: booking.phoneNumber || booking.user?.phoneNumber || "-",
        email: booking.email || booking.user?.email || "-",
      },
      categoryId: {
        categoryName: booking.category || booking.serviceName || "-",
      },
      resourceId: booking.resourceName ? { title: booking.resourceName } : null,
    };
  }

  async function fetchAppointments() {
    isLoading.value = true;
    try {
      const params = {
        page: currentPage.value,
        limit: itemsPerPage.value,
      };
      if (selectedStatus.value) {
        params.status = selectedStatus.value;
      }
      if (selectedDate.value) {
        params.date = selectedDate.value;
      }
      const response = await GetBookings(params);
      if (response.isSuccess) {
        const data = response.value || {};
        appointments.value = data.items || [];
        totalItems.value = data.totalCount || appointments.value.length;
      }
      lastSyncTime.value = new Date();
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      isLoading.value = false;
    }
  }

  function startAutoSync() {
    if (syncIntervalId) clearInterval(syncIntervalId);
    syncIntervalId = setInterval(() => {
      if (searchQuery.value.trim()) {
        searchAppointments();
      } else {
        fetchAppointments();
      }
    }, 30000);
  }

  function stopAutoSync() {
    if (syncIntervalId) {
      clearInterval(syncIntervalId);
      syncIntervalId = null;
    }
  }

  function toggleAutoSync() {
    autoSyncEnabled.value = !autoSyncEnabled.value;
    if (autoSyncEnabled.value) {
      startAutoSync();
    } else {
      stopAutoSync();
    }
  }

  const formattedLastSync = computed(() => {
    if (!lastSyncTime.value) return "";
    const now = new Date();
    const diff = Math.floor((now - lastSyncTime.value) / 1000);
    if (diff < 5) return "just now";
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return lastSyncTime.value.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  async function searchAppointments() {
    if (!searchQuery.value.trim()) {
      currentPage.value = 1;
      fetchAppointments();
      return;
    }
    isLoading.value = true;
    try {
      const response = await SearchBookings({
        q: searchQuery.value.trim(),
      });
      if (response.isSuccess) {
        const data = response.value || {};
        const bookings = data.bookings || [];
        appointments.value = bookings.map(mapSearchBooking);
        totalItems.value = data.pagination?.total || appointments.value.length;
        currentPage.value = data.pagination?.page || 1;
      } else {
        appointments.value = [];
        totalItems.value = 0;
      }
    } catch (error) {
      console.error("Error searching appointments:", error);
      appointments.value = [];
      totalItems.value = 0;
    } finally {
      isLoading.value = false;
      lastSyncTime.value = new Date();
    }
  }

  onMounted(() => {
    fetchAppointments();
    if (autoSyncEnabled.value) startAutoSync();
  });

  onUnmounted(() => {
    stopAutoSync();
  });

  watch([selectedDate, selectedStatus], () => {
    currentPage.value = 1;
    fetchAppointments();
  });

  watch(searchQuery, () => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      searchAppointments();
    }, 400);
  });

  const totalPages = computed(
    () => Math.ceil(totalItems.value / itemsPerPage.value) || 1,
  );

  const activeActionRow = ref(null);
  const activePaymentRow = ref(null);
  const deletingBookingId = ref(null);

  async function updateStatus(appointment, newStatus) {
    const response = await ConfirmBooking(appointment._id, {
      status: newStatus,
    });
    if (response.isSuccess) {
      appointment.status = newStatus;
      activeActionRow.value = null;
    } else {
      alert(response.userMessage || "Failed to update status.");
    }
  }

  async function updatePaymentStatus(appointment, newPaymentStatus) {
    const response = await UpdatePaymentStatusAppoinment(appointment._id, {
      paymentStatus: newPaymentStatus,
    });
    if (response.isSuccess) {
      appointment.paymentStatus = newPaymentStatus;
      activePaymentRow.value = null;
    } else {
      alert(response.userMessage || "Failed to update payment status.");
    }
  }

  async function confirmDeleteBooking(appointment) {
    if (!confirm(`Are you sure you want to cancel booking #${appointment.bookingId}? This action cannot be undone.`)) return;
    deletingBookingId.value = appointment._id;
    try {
      const response = await DeleteBooking(appointment._id);
      if (response.isSuccess) {
        appointments.value = appointments.value.filter((a) => a._id !== appointment._id);
        totalItems.value = Math.max(0, totalItems.value - 1);
      } else {
        alert(response.userMessage || response.errorMessage || "Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to cancel booking. Please try again.");
    } finally {
      deletingBookingId.value = null;
    }
  }

  function goToPage(page) {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    if (searchQuery.value.trim()) {
      searchAppointments();
    } else {
      fetchAppointments();
    }
  }

  const filteredAppointments = computed(() => {
    if (!searchQuery.value) return appointments.value;
    return appointments.value;
  });

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}m`;
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // New Appointment Modal Functions
  async function openNewAppointmentModal() {
    showNewAppointmentModal.value = true;
    resetBookingForm();

    // Load users and services (services include resources)
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

  function closeNewAppointmentModal() {
    if (!isCreatingBooking.value) {
      showNewAppointmentModal.value = false;
      resetBookingForm();
    }
  }

  function resetBookingForm() {
    userSearchQuery.value = "";
    userSearchResults.value = [];
    selectedUser.value = null;
    bookingForm.value = {
      userId: "",
      categoryId: "",
      resourceId: "",
      date: "",
      startTime: "",
      paymentMethod: "local",
    };
    availableSlots.value = [];
    customDurationMinutes.value = 0;
  }

  function searchUsers() {
    if (!userSearchQuery.value.trim()) {
      userSearchResults.value = [];
      return;
    }

    const query = userSearchQuery.value.toLowerCase();
    userSearchResults.value = allUsers.value
      .filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query),
      )
      .slice(0, 10);
  }

  function selectUser(user) {
    selectedUser.value = user;
    bookingForm.value.userId = user._id;
    userSearchQuery.value = "";
    userSearchResults.value = [];
  }

  function onServiceChange() {
    bookingForm.value.resourceId = "";
    bookingForm.value.date = "";
    bookingForm.value.startTime = "";
    availableSlots.value = [];

    // Set initial duration from service
    const selectedService = services.value.find(
      (s) => s._id === bookingForm.value.categoryId,
    );
    if (selectedService) {
      let durationMinutes = 0;
      if (selectedService.duration.includes("m")) {
        durationMinutes = parseInt(selectedService.duration);
      } else if (selectedService.duration.includes("h")) {
        durationMinutes = parseInt(selectedService.duration) * 60;
      }
      // Ensure minimum 1 hour (60 minutes)
      customDurationMinutes.value = Math.max(durationMinutes, 60);
    }
  }

  function increaseDuration() {
    customDurationMinutes.value += 30; // Increase by 30 minutes
  }

  function decreaseDuration() {
    if (customDurationMinutes.value > 60) {
      customDurationMinutes.value -= 30; // Decrease by 30 minutes
    }
  }

  function calculatePrice() {
    const selectedService = services.value.find(
      (s) => s._id === bookingForm.value.categoryId,
    );
    if (!selectedService) return 0;

    // Get base price and duration
    const basePrice = selectedService.price;
    let baseDuration = 0;
    if (selectedService.duration.includes("m")) {
      baseDuration = parseInt(selectedService.duration);
    } else if (selectedService.duration.includes("h")) {
      baseDuration = parseInt(selectedService.duration) * 60;
    }

    // Calculate price per minute
    const pricePerMinute = basePrice / baseDuration;

    // Calculate new price based on custom duration
    const newPrice = pricePerMinute * customDurationMinutes.value;

    return Math.round(newPrice * 100) / 100; // Round to 2 decimal places
  }

  function onResourceChange() {
    bookingForm.value.date = "";
    bookingForm.value.startTime = "";
    availableSlots.value = [];
  }

  function onDateChange() {
    bookingForm.value.startTime = "";
    fetchAvailableSlots();
  }

  async function fetchAvailableSlots() {
    if (!bookingForm.value.resourceId || !bookingForm.value.date) return;

    loadingSlots.value = true;
    availableSlots.value = [];
    bookingForm.value.startTime = "";

    try {
      const response = await GetBookingSlots(
        bookingForm.value.date,
        bookingForm.value.resourceId,
      );

      if (response.isSuccess && response.value) {
        // Filter only available slots
        availableSlots.value = response.value.filter((slot) => slot.available);
        console.log("Available slots:", availableSlots.value);
      } else {
        availableSlots.value = [];
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      availableSlots.value = [];
    } finally {
      loadingSlots.value = false;
    }
  }

  async function createAppointment() {
    if (!canCreateBooking.value) return;

    isCreatingBooking.value = true;

    try {
      // Find the selected service
      const selectedService = services.value.find(
        (s) => s._id === bookingForm.value.categoryId,
      );

      if (!selectedService) {
        alert("Please select a valid service");
        return;
      }

      // Use custom duration
      const startTime12h = bookingForm.value.startTime;
      const durationMinutes = customDurationMinutes.value;

      // Convert start time from 12h to 24h format
      const [time, period] = startTime12h.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (period === "pm" && hours !== 12) hours += 12;
      if (period === "am" && hours === 12) hours = 0;

      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0);

      const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
      const endHours24 = endDate.getHours();
      const endMinutes = endDate.getMinutes();

      // Format times to 24-hour format (HH:MM)
      const startTime24h = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      const endTime24h = `${endHours24.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;

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

      console.log("Creating booking with payload:", payload);

      const response = await CreateBooking(payload);

      if (response.isSuccess) {
        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className =
          "fixed top-4 right-4 z-[100] bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in";
        successMessage.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="font-semibold">Appointment created successfully!</span>
        `;
        document.body.appendChild(successMessage);

        // Close modal after 5 seconds
        setTimeout(() => {
          // Remove success message
          successMessage.style.opacity = "0";
          successMessage.style.transition = "opacity 0.3s";
          setTimeout(() => {
            document.body.removeChild(successMessage);
          }, 300);

          // Close modal
          closeNewAppointmentModal();
          fetchAppointments();
        }, 5000);
      } else {
        alert(response.userMessage || "Failed to create appointment");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert(
        error.response?.data?.userMessage ||
          error.response?.data?.errorMessage ||
          "Failed to create appointment",
      );
    } finally {
      isCreatingBooking.value = false;
    }
  }
</script>
