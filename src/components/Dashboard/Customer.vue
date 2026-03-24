<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <!-- main section -->
    <div class="gap-4 pr-0 md:pr-24 mt-5">
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
      >
        <h1 class="md:text-2xl sm:text-lg font-bold text-primary">Customers</h1>
        <div class="flex gap-2">
          <!-- <button
            class="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Export to CSV...
          </button> -->
          <!-- <button
            class="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l4-4m0 0l4 4m-4-4v12"
              ></path>
            </svg>
            Import...
          </button> -->
          <button
            class="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
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
            New customer...
          </button>
        </div>
      </div>

      <!-- Quick Search Bar -->
      <div class="mb-6">
        <div class="relative max-w-sm">
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
            placeholder="Quick search customers"
            class="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent"
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

      <!-- Customers Table -->
      <div
        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 bg-gray-50">
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-10"
                ></th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Full name
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
                  class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    User
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
                  class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Phone
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
                  class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Email
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
                  class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Notes
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
                  class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Last appointment
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
                  class="px-4 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  <div class="flex items-center justify-end gap-1">
                    Total appointments
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
                  class="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider"
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
                v-for="customer in filteredCustomers"
                :key="customer.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- Expand Button -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                    class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold hover:bg-blue-600 transition-colors"
                  >
                    +
                  </button>
                </td>
                <!-- Full Name -->
                <td
                  class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ customer.fullName }}
                </td>
                <!-- User -->
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ customer.user }}
                </td>
                <!-- Phone -->
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ customer.phone }}
                </td>
                <!-- Email -->
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ customer.email }}
                </td>
                <!-- Notes -->
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ customer.notes }}
                </td>
                <!-- Last Appointment -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <div
                    v-if="customer.lastAppointment"
                    class="text-sm text-gray-700"
                  >
                    {{ customer.lastAppointment }}
                  </div>
                  <span
                    v-else
                    class="text-sm text-gray-400"
                    >—</span
                  >
                </td>
                <!-- Total Appointments -->
                <td
                  class="px-4 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900"
                >
                  {{ customer.totalAppointments }}
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        ></path>
                      </svg>
                      Edit...
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
          Showing {{ filteredCustomers.length }} of
          {{ customers.length }} customers
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

  const searchQuery = ref("");

  const customers = ref([
    {
      id: 1,
      fullName: "sid",
      user: "Sid",
      phone: "+94 71 740 7115",
      email: "sem@tastebuds.com.au",
      notes: "",
      lastAppointment: "March 21, 2026 1:30 pm",
      totalAppointments: 1,
    },
    {
      id: 2,
      fullName: "Chanaka11",
      user: "",
      phone: "+94 70 468 0379",
      email: "dev@11tastebuds.com.au",
      notes: "",
      lastAppointment: "",
      totalAppointments: 0,
    },
    {
      id: 3,
      fullName: "coach1",
      user: "coach1",
      phone: "+94 406 499 499",
      email: "coach1@gmail.com",
      notes: "",
      lastAppointment: "",
      totalAppointments: 0,
    },
    {
      id: 4,
      fullName: "Chanaka",
      user: "Chanaka Lahiru",
      phone: "+94 70 468 0379",
      email: "dev@tastebuds.com.au",
      notes: "",
      lastAppointment: "November 11, 2025 9:00 pm",
      totalAppointments: 1,
    },
    {
      id: 5,
      fullName: "Aaron",
      user: "Aaron",
      phone: "+61 4999999999",
      email: "A@b.com",
      notes: "",
      lastAppointment: "November 10, 2025 5:00 pm",
      totalAppointments: 1,
    },
    {
      id: 6,
      fullName: "xchann",
      user: "xchann",
      phone: "+61 404 494 948",
      email: "CHANNA@GMAIL.COM",
      notes: "",
      lastAppointment: "",
      totalAppointments: 0,
    },
    {
      id: 7,
      fullName: "Rumeth Alwis",
      user: "Rumeth Alwis",
      phone: "+61 430 558 978",
      email: "rumethalwis2002@gmail.com",
      notes: "",
      lastAppointment: "November 10, 2025 5:00 pm",
      totalAppointments: 1,
    },
    {
      id: 8,
      fullName: "Vardeep",
      user: "",
      phone: "+61 468 342 720",
      email: "sandarujv@gmail.com",
      notes: "",
      lastAppointment: "November 10, 2025",
      totalAppointments: 1,
    },
  ]);

  const filteredCustomers = computed(() => {
    if (!searchQuery.value) return customers.value;
    const query = searchQuery.value.toLowerCase();
    return customers.value.filter(
      (c) =>
        c.fullName.toLowerCase().includes(query) ||
        c.user.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.phone.includes(query),
    );
  });
</script>
