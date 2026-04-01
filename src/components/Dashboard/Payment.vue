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
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>

          <!-- Type Filter -->
          <select
            v-model="filterType"
            class="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] shadow-sm"
          >
            <option value="">All Types</option>
            <option value="Stripe Cloud">Stripe Cloud</option>
            <option value="PayPal">PayPal</option>
            <option value="Local">Local</option>
            <option value="Free">Free</option>
          </select>
        </div>
      </div>

      <!-- Payments Table -->
      <div
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
                <th
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
                </th>

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
                v-for="payment in filteredPayments"
                :key="payment.id"
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
                      payment.id
                    }}</span>
                  </div>
                </td>
                <!-- Date -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700">{{ payment.date }}</div>
                  <div class="text-xs text-gray-400">{{ payment.time }}</div>
                </td>
                <!-- Type -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{ payment.type }}</span>
                </td>
                <!-- Customer -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium text-gray-900">{{
                    payment.customer
                  }}</span>
                </td>
                <!-- Provider (Resource) -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    payment.provider
                  }}</span>
                </td>
                <!-- Service -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    payment.service
                  }}</span>
                </td>
                <!-- Payment Status -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                      payment.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : payment.status === 'Failed'
                          ? 'bg-red-100 text-red-700'
                          : payment.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700',
                    ]"
                  >
                    {{ payment.status }}
                  </span>
                </td>
                <!-- Appointment Date -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700">
                    {{ payment.appointmentDate }}
                  </div>
                  <div class="text-xs text-gray-400">
                    {{ payment.appointmentTime }}
                  </div>
                </td>
                <!-- Amount -->
                <td class="px-4 py-4 whitespace-nowrap text-right">
                  <span class="text-sm font-semibold text-gray-900">{{
                    payment.amount
                  }}</span>
                </td>
                <!-- Subtotal -->
                <td class="px-4 py-4 whitespace-nowrap text-right">
                  <span class="text-sm font-semibold text-gray-900">{{
                    payment.subtotal
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
          Showing {{ filteredPayments.length }} of
          {{ payments.length }} payments
        </p>
        <div class="flex gap-2">
          <button
            class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            Previous
          </button>
          <button
            class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed } from "vue";
  import Nav from "../Dashboard/UI/SecondNav.vue";

  const selectedDate = ref("");
  const searchQuery = ref("");
  const filterStatus = ref("");
  const filterType = ref("");

  const payments = ref([
    {
      id: "1056",
      date: "February 22, 2026",
      time: "5:17 am",
      type: "Stripe Cloud",
      customer: "Chanaka Lahiru",
      provider: "Lane 6",
      service: "Lane + Bowling Machine",
      appointmentDate: "February 22, 2026",
      appointmentTime: "9:00 am",
      amount: "A$40.00",
      subtotal: "A$40.00",
      status: "Completed",
    },
    {
      id: "1057",
      date: "February 22, 2026",
      time: "8:55 am",
      type: "Free",
      customer: "geetikasharma",
      provider: "Lane 5",
      service: "Lane + Bowling Machine",
      appointmentDate: "February 22, 2026",
      appointmentTime: "6:00 pm",
      amount: "A$0.00",
      subtotal: "A$0.00",
      status: "Completed",
    },
    {
      id: "1058",
      date: "February 22, 2026",
      time: "10:10 am",
      type: "Stripe Cloud",
      customer: "Beau Bugter",
      provider: "Lane 5",
      service: "Lane + Bowling Machine",
      appointmentDate: "February 22, 2026",
      appointmentTime: "12:30 pm",
      amount: "A$40.00",
      subtotal: "A$40.00",
      status: "Completed",
    },
    {
      id: "1059",
      date: "February 22, 2026",
      time: "3:40 pm",
      type: "Stripe Cloud",
      customer: "Suwin perera",
      provider: "Lane 7",
      service: "Lane + Bowling Machine & Auto Feeder ($40)",
      appointmentDate: "February 22, 2026",
      appointmentTime: "9:00 pm",
      amount: "A$40.00",
      subtotal: "A$40.00",
      status: "Completed",
    },
    {
      id: "1060",
      date: "February 23, 2026",
      time: "10:26 am",
      type: "Free",
      customer: "Amarjit Singh",
      provider: "Lane 6",
      service: "Lane + Bowling Machine",
      appointmentDate: "February 23, 2026",
      appointmentTime: "6:30 pm",
      amount: "A$0.00",
      subtotal: "A$0.00",
      status: "Completed",
    },
    {
      id: "1061",
      date: "February 23, 2026",
      time: "2:15 pm",
      type: "PayPal",
      customer: "John Smith",
      provider: "Lane 1",
      service: "Lane Only Booking",
      appointmentDate: "February 24, 2026",
      appointmentTime: "10:00 am",
      amount: "A$50.00",
      subtotal: "A$50.00",
      status: "Pending",
    },
    {
      id: "1062",
      date: "February 23, 2026",
      time: "4:30 pm",
      type: "Local",
      customer: "Sarah Johnson",
      provider: "Lane 3",
      service: "Lane + Bowling Machine",
      appointmentDate: "February 25, 2026",
      appointmentTime: "3:00 pm",
      amount: "A$40.00",
      subtotal: "A$40.00",
      status: "Completed",
    },
  ]);

  const filteredPayments = computed(() => {
    let result = payments.value;

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (p) =>
          p.customer.toLowerCase().includes(query) ||
          p.id.includes(query) ||
          p.service.toLowerCase().includes(query) ||
          p.provider.toLowerCase().includes(query),
      );
    }

    if (filterStatus.value) {
      result = result.filter((p) => p.status === filterStatus.value);
    }

    if (filterType.value) {
      result = result.filter((p) => p.type === filterType.value);
    }

    return result;
  });
</script>
