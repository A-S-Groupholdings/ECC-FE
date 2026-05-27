<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <div class="pr-0 md:pr-6 mt-5">
      <!-- Header with Calendar, Search, Filters -->
      <div
        class="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6"
      >
        <h1 class="md:text-2xl sm:text-lg font-bold text-primary">Payments</h1>

        <div class="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          <!-- Calendar -->
          <div
            class="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2"
          >
            <svg
              class="w-4 h-4 text-[#1a3a35]"
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
          </div>

          <!-- Search -->
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-400"
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
              placeholder="Search payments..."
              class="w-full sm:w-64 pl-9 pr-9 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent shadow-sm"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg
                class="w-4 h-4 text-gray-400 hover:text-gray-600"
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

          <!-- Status Filter -->
          <select
            v-model="filterStatus"
            class="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] shadow-sm"
          >
            <option value="">All Status</option>
            <option value="success">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <!-- Type Filter -->
          <select
            v-model="filterType"
            class="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] shadow-sm"
          >
            <option value="">All Types</option>
            <option value="stripe">Stripe Cloud</option>
            <option value="local">Local</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-lg"
      >
        <div
          class="w-12 h-12 border-4 border-[#1a3a35] border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-gray-500 text-sm">Loading payments...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-2xl p-6 text-center"
      >
        <p class="text-red-700 font-medium mb-4">{{ error }}</p>
        <button
          @click="fetchPayments"
          class="bg-[#1a3a35] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#2a4a45] transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Payments Table -->
      <div
        v-else
        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    No.
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path
                        d="M5 10l5 5 5-5H5z"
                        opacity="0.4"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Date
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path
                        d="M5 10l5 5 5-5H5z"
                        opacity="0.4"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Type
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path
                        d="M5 10l5 5 5-5H5z"
                        opacity="0.4"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Customer
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path
                        d="M5 10l5 5 5-5H5z"
                        opacity="0.4"
                      ></path>
                    </svg>
                  </div>
                </th>
                <!-- <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Provider
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path
                        d="M5 10l5 5 5-5H5z"
                        opacity="0.4"
                      ></path>
                    </svg>
                  </div>
                </th> -->

                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Resources
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path
                        d="M5 10l5 5 5-5H5z"
                        opacity="0.4"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Payment Status
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path
                        d="M5 10l5 5 5-5H5z"
                        opacity="0.4"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Appointment date
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path
                        d="M5 10l5 5 5-5H5z"
                        opacity="0.4"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th
                  class="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center justify-end gap-1">
                    Amount
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path
                        d="M5 10l5 5 5-5H5z"
                        opacity="0.4"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th
                  class="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center justify-end gap-1">
                    Subtotal
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path
                        d="M5 10l5 5 5-5H5z"
                        opacity="0.4"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th
                  class="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    class="rounded border-gray-300"
                  />
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="(payment, index) in filteredPayments"
                :key="payment._id"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- No. -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <button
                      class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-blue-600 transition-colors"
                    >
                      +
                    </button>
                    <span class="text-sm font-semibold text-gray-900">{{
                      (currentPage - 1) * limit + index + 1
                    }}</span>
                  </div>
                </td>
                <!-- Date -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700">
                    {{ formatDate(payment.createdAt) }}
                  </div>
                  <div class="text-xs text-gray-400">
                    {{ formatTime(payment.createdAt) }}
                  </div>
                </td>
                <!-- Type -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    mapType(
                      payment.paymentMethod,
                      payment.membershipId,
                      payment.bookingId,
                    )
                  }}</span>
                </td>
                <!-- Customer -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium text-gray-900">{{
                    payment.userId?.name || "Unknown"
                  }}</span>
                  <div class="text-xs text-gray-400">
                    {{ payment.userId?.email || "Unknown" }}
                  </div>
                </td>
                <!-- Provider (Resource/Service) -->
                <!-- <td class="px-4 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    payment.membershipId?.name ||
                    payment.notes?.match(/service=([^,]+)/)?.[1] ||
                    "N/A"
                  }}</span>
                </td> -->
                <!-- Service Details -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    payment.membershipId ? "Membership" : "Booking"
                  }}</span>
                </td>
                <!-- Payment Status -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                      payment.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : payment.status === 'failed'
                          ? 'bg-red-100 text-red-700'
                          : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700',
                    ]"
                  >
                    {{ mapStatus(payment.status) }}
                  </span>
                </td>
                <!-- Appointment Date -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700">
                    {{
                      payment.bookingId
                        ? formatDate(payment.bookingId.date)
                        : "N/A"
                    }}
                  </div>
                  <div class="text-xs text-gray-400">
                    {{ payment.bookingId ? payment.bookingId.startTime : "" }}
                  </div>
                </td>
                <!-- Amount -->
                <td class="px-4 py-4 whitespace-nowrap text-right">
                  <span class="text-sm font-semibold text-gray-900">{{
                    formatCurrency(payment.amount)
                  }}</span>
                </td>
                <!-- Subtotal -->
                <td class="px-4 py-4 whitespace-nowrap text-right">
                  <span class="text-sm font-semibold text-gray-900">{{
                    formatCurrency(payment.amount)
                  }}</span>
                </td>
                <!-- Actions -->
                <td class="px-4 py-4 whitespace-nowrap text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      class="flex items-center gap-1 bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      Details...
                    </button>
                    <input
                      type="checkbox"
                      class="rounded border-gray-300"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-6">
        <p class="text-sm text-gray-500">
          Showing
          {{ pagination.totalItems > 0 ? (currentPage - 1) * limit + 1 : 0 }} -
          {{ Math.min(currentPage * limit, pagination.totalItems) }} of
          {{ pagination.totalItems }} payments
        </p>
        <div class="flex gap-2">
          <button
            @click="prevPage"
            :disabled="!pagination.hasPrevPage"
            class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <!-- Page numbers -->
          <template
            v-for="page in visiblePages"
            :key="page"
          >
            <span
              v-if="page === '...'"
              class="px-2 py-2 text-gray-400"
            >
              ...
            </span>
            <button
              v-else
              @click="goToPage(page)"
              :class="[
                'px-4 py-2 border rounded-lg text-sm transition-colors',
                currentPage === page
                  ? 'bg-[#1a3a35] text-white border-[#1a3a35]'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="nextPage"
            :disabled="!pagination.hasNextPage"
            class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import Nav from "../Dashboard/UI/SecondNav.vue";
  import { GetPayments } from "@/services/apiService.js";

  const selectedDate = ref("");
  const searchQuery = ref("");
  const filterStatus = ref("");
  const filterType = ref("");
  const currentPage = ref(1);
  const limit = ref(10);

  const payments = ref([]);
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const loading = ref(false);
  const error = ref("");

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `A$${amount.toFixed(2)}`;
  };

  // Map API status to display status
  const mapStatus = (status) => {
    const statusMap = {
      success: "Completed",
      pending: "Pending",
      failed: "Failed",
    };
    return statusMap[status] || status;
  };

  // Map API payment method to display type
  const mapType = (paymentMethod, membershipId, bookingId) => {
    if (membershipId) return "Membership";
    if (bookingId) {
      return paymentMethod === "stripe" ? "Stripe" : "Local";
    }
    return paymentMethod === "stripe" ? "Stripe" : "Local";
  };

  // Fetch payments from API
  const fetchPayments = async () => {
    loading.value = true;
    error.value = "";

    try {
      const params = {
        page: currentPage.value,
        limit: limit.value,
        ...(searchQuery.value && { search: searchQuery.value }),
        ...(filterStatus.value && { status: filterStatus.value.toLowerCase() }),
        ...(filterType.value && {
          paymentMethod: filterType.value.toLowerCase(),
        }),
        ...(selectedDate.value && {
          startDate: selectedDate.value,
          endDate: selectedDate.value,
        }),
      };

      const response = await GetPayments(params);

      if (response.isSuccess) {
        payments.value = response.value.payments;
        pagination.value = response.value.pagination;
      } else {
        error.value = response.userMessage || "Failed to fetch payments";
      }
    } catch (err) {
      console.error("Error fetching payments:", err);
      error.value =
        err.response?.data?.userMessage ||
        "Failed to load payments. Please try again.";
    } finally {
      loading.value = false;
    }
  };

  // Computed filtered payments (already filtered by API)
  const filteredPayments = computed(() => payments.value);

  // Computed visible page numbers
  const visiblePages = computed(() => {
    const totalPages = pagination.value.totalPages;
    const current = currentPage.value;
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (current <= 4) {
        // Near start
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (current >= totalPages - 3) {
        // Near end
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        // In middle
        pages.push(1);
        pages.push("...");
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  });

  // Watch for filter changes and reset to page 1
  watch([searchQuery, filterStatus, filterType, selectedDate], () => {
    currentPage.value = 1;
    fetchPayments();
  });

  // Pagination methods
  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      currentPage.value = page;
      fetchPayments();
    }
  };

  const nextPage = () => {
    if (pagination.value.hasNextPage) {
      currentPage.value++;
      fetchPayments();
    }
  };

  const prevPage = () => {
    if (pagination.value.hasPrevPage) {
      currentPage.value--;
      fetchPayments();
    }
  };

  // Fetch on mount
  onMounted(() => {
    fetchPayments();
  });
</script>
