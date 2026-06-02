<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <div class="pr-0 md:pr-6 mt-5">
      <!-- Header with Search -->
      <div
        class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6"
      >
        <h1 class="md:text-2xl sm:text-lg font-bold text-primary">
          Subscriptions
        </h1>

        <!-- Search Bar -->
        <div class="relative w-full lg:w-96">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
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
            placeholder="Search subscriptions..."
            class="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent shadow-sm"
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
      </div>

      <!-- Summary Cards -->
      <div
        v-if="summary"
        class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <button
          type="button"
          @click="selectStatus('active')"
          :class="[
            'text-left bg-white rounded-xl shadow-sm border p-4 transition-all hover:shadow-md',
            statusFilter === 'active'
              ? 'border-green-500 ring-2 ring-green-200'
              : 'border-gray-100',
          ]"
        >
          <p class="text-xs text-gray-500 uppercase tracking-wider">Active</p>
          <p class="text-2xl font-bold text-green-600 mt-1">
            {{ summary.active }}
          </p>
        </button>
        <button
          type="button"
          @click="selectStatus('expired')"
          :class="[
            'text-left bg-white rounded-xl shadow-sm border p-4 transition-all hover:shadow-md',
            statusFilter === 'expired'
              ? 'border-yellow-500 ring-2 ring-yellow-200'
              : 'border-gray-100',
          ]"
        >
          <p class="text-xs text-gray-500 uppercase tracking-wider">Expired</p>
          <p class="text-2xl font-bold text-yellow-600 mt-1">
            {{ summary.expired }}
          </p>
        </button>
        <button
          type="button"
          @click="selectStatus('cancelled')"
          :class="[
            'text-left bg-white rounded-xl shadow-sm border p-4 transition-all hover:shadow-md',
            statusFilter === 'cancelled'
              ? 'border-red-500 ring-2 ring-red-200'
              : 'border-gray-100',
          ]"
        >
          <p class="text-xs text-gray-500 uppercase tracking-wider">
            Cancelled
          </p>
          <p class="text-2xl font-bold text-red-600 mt-1">
            {{ summary.cancelled }}
          </p>
        </button>
        <button
          type="button"
          @click="selectStatus('noTracking')"
          :class="[
            'text-left bg-white rounded-xl shadow-sm border p-4 transition-all hover:shadow-md',
            statusFilter === 'noTracking'
              ? 'border-gray-500 ring-2 ring-gray-200'
              : 'border-gray-100',
          ]"
        >
          <p class="text-xs text-gray-500 uppercase tracking-wider">
            No Tracking
          </p>
          <p class="text-2xl font-bold text-gray-600 mt-1">
            {{ summary.noTracking }}
          </p>
        </button>
      </div>

      <!-- Subscriptions Table -->
      <div
        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Membership
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Duration
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Start Date
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  End Date
                </th>
                <th
                  class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="loading">
                <td
                  colspan="11"
                  class="px-6 py-12 text-center text-sm text-gray-500"
                >
                  Loading subscriptions...
                </td>
              </tr>
              <tr v-else-if="errorMessage">
                <td
                  colspan="11"
                  class="px-6 py-12 text-center text-sm text-red-500"
                >
                  {{ errorMessage }}
                </td>
              </tr>
              <tr v-else-if="filteredSubscriptions.length === 0">
                <td
                  colspan="11"
                  class="px-6 py-12 text-center text-sm text-gray-500"
                >
                  No subscriptions found.
                </td>
              </tr>
              <tr
                v-for="subscription in filteredSubscriptions"
                :key="subscription.userId"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-semibold text-gray-900">
                    {{ subscription.name || "—" }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">
                    {{ subscription.email || "—" }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">
                    {{ subscription.phoneNumber || "—" }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-700">
                    {{ subscription.membership?.name || "—" }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-600">
                    {{ subscription.membership?.type || "—" }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-600">
                    {{
                      subscription.membership?.price != null
                        ? `$${subscription.membership.price}`
                        : "—"
                    }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-600">
                    {{
                      subscription.membership?.durationDays != null
                        ? `${subscription.membership.durationDays} days`
                        : "—"
                    }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-600">
                    {{ formatDate(subscription.tracking?.startDate) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-600">
                    {{ formatDate(subscription.tracking?.endDate) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize',
                      statusClass(subscription.tracking?.status),
                    ]"
                  >
                    {{ subscription.tracking?.status || "—" }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    type="button"
                    class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    :disabled="
                      deactivatingId === subscription.userId ||
                      (subscription.tracking?.status || '').toLowerCase() !==
                        'active'
                    "
                    @click="onDeactivate(subscription)"
                  >
                    {{
                      deactivatingId === subscription.userId
                        ? "Deactivating..."
                        : "Deactivate"
                    }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-6"
      >
        <p class="text-sm text-gray-500">
          Showing
          <span class="font-medium">{{ rangeStart }}</span>
          –
          <span class="font-medium">{{ rangeEnd }}</span>
          of
          <span class="font-medium">{{ total }}</span>
          subscriptions
        </p>

        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-500">Per page:</label>
          <select
            v-model.number="limit"
            class="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
            @change="onLimitChange"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>

          <button
            class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            :disabled="!hasPrevPage || loading"
            @click="goToPage(page - 1)"
          >
            Previous
          </button>
          <span class="text-sm text-gray-600 px-2">
            Page {{ page }} of {{ totalPages || 1 }}
          </span>
          <button
            class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            :disabled="!hasNextPage || loading"
            @click="goToPage(page + 1)"
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
  import {
    GetMembershipByUsers,
    SearchMembershipUsers,
    DeactivateMembershipUser,
  } from "@/services/apiService.js";

  const searchQuery = ref("");
  const subscriptions = ref([]);
  const summary = ref(null);
  const statusFilter = ref("active");

  const page = ref(1);
  const limit = ref(10);
  const total = ref(0);
  const totalPages = ref(0);
  const hasNextPage = ref(false);
  const hasPrevPage = ref(false);

  const loading = ref(false);
  const errorMessage = ref("");
  const isSearching = ref(false);
  const deactivatingId = ref(null);

  // Track latest request to ignore stale responses (race condition guard)
  let requestId = 0;
  let searchDebounceTimer = null;

  const applyResponse = (res) => {
    if (res?.isSuccess && res.value) {
      const value = res.value;
      // Support both paginated shape and plain array shape
      const users = Array.isArray(value)
        ? value
        : Array.isArray(value.users)
          ? value.users
          : [];
      subscriptions.value = users;
      summary.value = value.summary || null;
      total.value = value.total ?? users.length;
      totalPages.value = value.totalPages ?? 0;
      hasNextPage.value = !!value.hasNextPage;
      hasPrevPage.value = !!value.hasPrevPage;
    } else {
      subscriptions.value = [];
      summary.value = null;
      total.value = 0;
      totalPages.value = 0;
      hasNextPage.value = false;
      hasPrevPage.value = false;
      errorMessage.value =
        res?.userMessage ||
        res?.errorMessage ||
        "Failed to load subscriptions.";
    }
  };

  const fetchSubscriptions = async () => {
    const currentRequestId = ++requestId;
    loading.value = true;
    errorMessage.value = "";
    try {
      const res = await GetMembershipByUsers({
        page: page.value,
        limit: limit.value,
        status: statusFilter.value,
      });
      if (currentRequestId !== requestId) return;
      applyResponse(res);
    } catch (err) {
      if (currentRequestId !== requestId) return;
      console.error("Failed to fetch subscriptions:", err);
      errorMessage.value = "Something went wrong while loading subscriptions.";
    } finally {
      if (currentRequestId === requestId) loading.value = false;
    }
  };

  const searchSubscriptions = async (term) => {
    const currentRequestId = ++requestId;
    loading.value = true;
    errorMessage.value = "";
    try {
      const res = await SearchMembershipUsers(term);
      if (currentRequestId !== requestId) return;
      applyResponse(res);
    } catch (err) {
      if (currentRequestId !== requestId) return;
      console.error("Failed to search subscriptions:", err);
      errorMessage.value =
        "Something went wrong while searching subscriptions.";
    } finally {
      if (currentRequestId === requestId) loading.value = false;
    }
  };

  const goToPage = (newPage) => {
    if (newPage < 1 || (totalPages.value && newPage > totalPages.value)) return;
    page.value = newPage;
  };

  const onLimitChange = () => {
    page.value = 1;
  };

  const selectStatus = (status) => {
    if (statusFilter.value === status) return;
    statusFilter.value = status;
    page.value = 1;
    // Clear active search so the status filter applies to the paginated list
    if (isSearching.value || searchQuery.value) {
      searchQuery.value = "";
      isSearching.value = false;
    }
    fetchSubscriptions();
  };

  const onDeactivate = async (subscription) => {
    if (!subscription?.userId) return;
    const confirmed = window.confirm(
      `Deactivate membership for ${subscription.name || subscription.email || "this user"}?`,
    );
    if (!confirmed) return;

    deactivatingId.value = subscription.userId;
    try {
      const res = await DeactivateMembershipUser(subscription.userId);
      if (res?.isSuccess) {
        // Optimistic local update so the row reflects the change immediately
        if (subscription.tracking) {
          subscription.tracking.status = "cancelled";
        }
        if (summary.value) {
          summary.value.active = Math.max(0, (summary.value.active || 0) - 1);
          summary.value.cancelled = (summary.value.cancelled || 0) + 1;
        }
        // Refresh from server to stay in sync
        if (isSearching.value) {
          await searchSubscriptions(searchQuery.value.trim());
        } else {
          await fetchSubscriptions();
        }
      } else {
        const message =
          res?.userMessage ||
          res?.errorMessage ||
          "Failed to deactivate membership.";
        window.alert(message);
      }
    } catch (err) {
      console.error("Failed to deactivate membership:", err);
      window.alert("Something went wrong while deactivating the membership.");
    } finally {
      deactivatingId.value = null;
    }
  };

  // Refetch paginated list only when not in search mode
  watch([page, limit], () => {
    if (!isSearching.value) fetchSubscriptions();
  });

  // Debounced search: triggers search API when query has value,
  // falls back to paginated list when cleared.
  watch(searchQuery, (val) => {
    if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
    const term = (val || "").trim();

    searchDebounceTimer = setTimeout(() => {
      if (term.length === 0) {
        isSearching.value = false;
        page.value = 1;
        fetchSubscriptions();
      } else {
        isSearching.value = true;
        searchSubscriptions(term);
      }
    }, 400);
  });

  onMounted(fetchSubscriptions);

  // No client-side filtering — server returns the matching set
  const filteredSubscriptions = computed(() => subscriptions.value);

  const rangeStart = computed(() => {
    if (total.value === 0) return 0;
    return (page.value - 1) * limit.value + 1;
  });

  const rangeEnd = computed(() => {
    return Math.min(page.value * limit.value, total.value);
  });

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const statusClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";
      case "expired":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
</script>
