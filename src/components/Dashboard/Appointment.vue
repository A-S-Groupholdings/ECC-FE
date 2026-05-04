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

        <button
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
                  class="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider rounded-tr-2xl"
                >
                  Payment
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
                <td class="px-4 py-4 whitespace-nowrap text-center">
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize',
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
                  </span>
                </td>
                <!-- Payment -->
                <td class="px-4 py-4 whitespace-nowrap text-center">
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize',
                      appointment.paymentStatus === 'PAID'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700',
                    ]"
                  >
                    {{ appointment.paymentStatus?.toLowerCase() }}
                  </span>
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
  </main>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import { GetBookings } from "@/services/apiService.js";
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
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    fetchAppointments();
  });

  watch([selectedDate, selectedStatus], () => {
    currentPage.value = 1;
    fetchAppointments();
  });

  const totalPages = computed(
    () => Math.ceil(totalItems.value / itemsPerPage.value) || 1,
  );

  function goToPage(page) {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    fetchAppointments();
  }

  const filteredAppointments = computed(() => {
    if (!searchQuery.value) return appointments.value;
    const query = searchQuery.value.toLowerCase();
    return appointments.value.filter((apt) => {
      const user = apt.userId || {};
      return (
        user.name?.toLowerCase().includes(query) ||
        apt.bookingId?.toLowerCase().includes(query) ||
        apt.status?.toLowerCase().includes(query) ||
        apt.paymentStatus?.toLowerCase().includes(query)
      );
    });
  });

  function formatDuration(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
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
</script>
