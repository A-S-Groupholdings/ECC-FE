<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <div class="pr-0 md:pr-6 mt-5">
      <!-- Header with Search & Filters -->
      <div
        class="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6"
      >
        <h1 class="md:text-2xl sm:text-lg font-bold text-primary">
          Membership Payments
        </h1>

        <div class="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
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
            <option value="stripe">Stripe</option>
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
                  No.
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Membership
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Duration
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Method
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  class="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Actions
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
                  <span class="text-sm font-semibold text-gray-900">{{
                    (currentPage - 1) * limit + index + 1
                  }}</span>
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
                <!-- Customer -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ payment.userId?.name || "Unknown" }}
                  </div>
                  <div class="text-xs text-gray-400">
                    {{ payment.userId?.email || "" }}
                  </div>
                </td>
                <!-- Membership -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    payment.membershipId?.name || "N/A"
                  }}</span>
                </td>
                <!-- Duration -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    payment.membershipId?.durationDays
                      ? payment.membershipId.durationDays + " day(s)"
                      : "N/A"
                  }}</span>
                </td>
                <!-- Method -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                      payment.paymentMethod === 'stripe'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700',
                    ]"
                  >
                    {{
                      payment.paymentMethod === "stripe" ? "Stripe" : "Local"
                    }}
                  </span>
                </td>
                <!-- Status -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                      payment.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : payment.status === 'failed'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700',
                    ]"
                  >
                    {{ mapStatus(payment.status) }}
                  </span>
                </td>
                <!-- Amount -->
                <td class="px-4 py-4 whitespace-nowrap text-right">
                  <span class="text-sm font-semibold text-gray-900">
                    A${{ payment.amount?.toFixed(2) }}
                  </span>
                </td>
                <!-- Actions -->
                <td class="px-4 py-4 whitespace-nowrap text-center">
                  <button
                    @click="viewUserPayments(payment)"
                    class="inline-flex items-center gap-1 bg-[#1a3a35] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#2a4a45] transition-colors"
                  >
                    <svg
                      class="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    View
                  </button>
                </td>
              </tr>
              <!-- Empty state -->
              <tr v-if="!filteredPayments.length">
                <td
                  colspan="9"
                  class="px-4 py-12 text-center text-gray-400 text-sm"
                >
                  No payments found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="!loading && !error && pagination.totalPages > 0"
        class="flex justify-between items-center mt-6"
      >
        <p class="text-sm text-gray-500">
          Showing
          {{ pagination.total > 0 ? (currentPage - 1) * limit + 1 : 0 }} -
          {{ Math.min(currentPage * limit, pagination.total) }} of
          {{ pagination.total }} payments
        </p>
        <div class="flex gap-2">
          <button
            @click="prevPage"
            :disabled="!pagination.hasPrevPage"
            class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

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

    <!-- Individual Payment Modal (Slide-over Panel) -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 z-50 flex justify-end"
        >
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/40 backdrop-blur-sm"
            @click="closeModal"
          ></div>

          <!-- Panel -->
          <div
            class="relative w-full max-w-[50rem] bg-white shadow-2xl h-full overflow-y-auto animate-slide-in-right"
          >
            <!-- Panel Header -->
            <div
              class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10"
            >
              <div>
                <h2 class="text-lg font-bold text-[#1a3a35]">
                  {{ modalUser?.name || "User" }}'s Payments
                </h2>
                <p class="text-sm text-gray-500">
                  {{ modalUser?.email }} &middot;
                  {{ modalPayments.length }} payment(s)
                </p>
              </div>
              <button
                @click="closeModal"
                class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  class="w-5 h-5 text-gray-500"
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

            <!-- Panel Loading -->
            <div
              v-if="modalLoading"
              class="flex flex-col items-center justify-center py-20"
            >
              <div
                class="w-10 h-10 border-4 border-[#1a3a35] border-t-transparent rounded-full animate-spin mb-4"
              ></div>
              <p class="text-gray-500 text-sm">Loading user payments...</p>
            </div>

            <!-- Panel Error -->
            <div
              v-else-if="modalError"
              class="px-6 py-12 text-center"
            >
              <p class="text-red-600 text-sm">{{ modalError }}</p>
            </div>

            <!-- Panel Content -->
            <div
              v-else
              class="px-6 py-4 space-y-4"
            >
              <div
                v-for="(p, idx) in modalPayments"
                :key="p._id"
                class="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs text-gray-400">#{{ idx + 1 }}</span>
                  <span
                    :class="[
                      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                      p.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : p.status === 'failed'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700',
                    ]"
                  >
                    {{ mapStatus(p.status) }}
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p class="text-gray-400 text-xs">Membership</p>
                    <p class="font-medium text-gray-800">
                      {{ p.membershipId?.name || "N/A" }}
                    </p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-xs">Amount</p>
                    <p class="font-semibold text-[#1a3a35]">
                      A${{ p.amount?.toFixed(2) }}
                    </p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-xs">Method</p>
                    <p class="text-gray-700">
                      {{ p.paymentMethod === "stripe" ? "Stripe" : "Local" }}
                    </p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-xs">Payment ID</p>
                    <p class="text-gray-700">
                      {{ p.stripePaymentIntentId || "N/A" }}
                    </p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-xs">Duration</p>
                    <p class="text-gray-700">
                      {{
                        p.membershipId?.durationDays
                          ? p.membershipId.durationDays + " day(s)"
                          : "N/A"
                      }}
                    </p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-xs">Date</p>
                    <p class="text-gray-700">{{ formatDate(p.createdAt) }}</p>
                  </div>
                  <div>
                    <p class="text-gray-400 text-xs">Paid At</p>
                    <p class="text-gray-700">
                      {{ p.paidAt ? formatDate(p.paidAt) : "—" }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="p.notes"
                  class="mt-2 text-xs text-gray-400 truncate"
                >
                  {{ p.notes }}
                </div>
              </div>

              <!-- Empty in modal -->
              <div
                v-if="!modalPayments.length"
                class="py-12 text-center text-gray-400 text-sm"
              >
                No payments found for this user.
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import Nav from "../Dashboard/UI/SecondNav.vue";
  import {
    GetMembershipPayments,
    GetMembershipPaymentIndividual,
  } from "@/services/apiService.js";

  const searchQuery = ref("");
  const filterStatus = ref("");
  const filterType = ref("");
  const currentPage = ref(1);
  const limit = ref(10);

  const payments = ref([]);
  const pagination = ref({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const loading = ref(false);
  const error = ref("");

  // ----- Modal state -----
  const showModal = ref(false);
  const modalLoading = ref(false);
  const modalError = ref("");
  const modalUser = ref(null);
  const modalPayments = ref([]);

  // Format helpers
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString)
      .toLocaleTimeString("en-AU", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  };

  const mapStatus = (status) => {
    const statusMap = {
      success: "Completed",
      pending: "Pending",
      failed: "Failed",
    };
    return statusMap[status] || status;
  };

  // Fetch paginated membership payments
  const fetchPayments = async () => {
    loading.value = true;
    error.value = "";
    try {
      const response = await GetMembershipPayments({
        page: currentPage.value,
        limit: limit.value,
      });

      if (response.isSuccess && response.value) {
        payments.value = response.value.payments || [];
        pagination.value = {
          total: response.value.total || 0,
          page: response.value.page || 1,
          limit: response.value.limit || 10,
          totalPages: response.value.totalPages || 1,
          hasNextPage: response.value.hasNextPage || false,
          hasPrevPage: response.value.hasPrevPage || false,
        };
      } else {
        error.value = response.userMessage || "Failed to fetch payments.";
      }
    } catch (err) {
      console.error("Error fetching membership payments:", err);
      error.value = "Failed to load payments. Please try again.";
    } finally {
      loading.value = false;
    }
  };

  // Client-side filtering (search + status + type)
  const filteredPayments = computed(() => {
    let result = payments.value;

    if (filterStatus.value) {
      result = result.filter((p) => p.status === filterStatus.value);
    }
    if (filterType.value) {
      result = result.filter((p) => p.paymentMethod === filterType.value);
    }
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase();
      result = result.filter(
        (p) =>
          (p.userId?.name || "").toLowerCase().includes(q) ||
          (p.userId?.email || "").toLowerCase().includes(q) ||
          (p.membershipId?.name || "").toLowerCase().includes(q),
      );
    }

    return result;
  });

  // Visible page numbers
  const visiblePages = computed(() => {
    const totalPages = pagination.value.totalPages;
    const current = currentPage.value;
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (current >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  });

  // Pagination
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

  // View individual user payments
  const viewUserPayments = async (payment) => {
    const userId = payment.userId?._id;
    if (!userId) return;

    showModal.value = true;
    modalLoading.value = true;
    modalError.value = "";
    modalUser.value = payment.userId;
    modalPayments.value = [];

    try {
      const response = await GetMembershipPaymentIndividual(userId);

      if (response.isSuccess && response.value) {
        modalUser.value = response.value.user || payment.userId;
        modalPayments.value = response.value.payments || [];
      } else {
        modalError.value =
          response.userMessage || "Failed to load user payments.";
      }
    } catch (err) {
      console.error("Error fetching individual payments:", err);
      modalError.value = "Failed to load user payments.";
    } finally {
      modalLoading.value = false;
    }
  };

  const closeModal = () => {
    showModal.value = false;
    modalPayments.value = [];
    modalUser.value = null;
  };

  // Reset to page 1 when filters change
  watch([searchQuery, filterStatus, filterType], () => {
    currentPage.value = 1;
  });

  onMounted(() => {
    fetchPayments();
  });
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

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  .animate-slide-in-right {
    animation: slideInRight 0.25s ease-out;
  }
</style>
