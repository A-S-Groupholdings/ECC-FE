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
          <!-- Calendar Widget -->
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

      <!-- Modern Table -->
      <div
        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-primary text-white">
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider rounded-tl-2xl"
                >
                  ID
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Date & Time
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Lane
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  Service
                </th>
                <th
                  class="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider rounded-tr-2xl"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="appointment in filteredAppointments"
                :key="appointment.id"
                class="hover:bg-gray-50 transition-colors group"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm group-hover:bg-[#1a3a35] group-hover:text-white transition-colors"
                  >
                    {{ appointment.id }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ appointment.date }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ appointment.time }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                  >
                    {{ appointment.lane }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 bg-gradient-to-br from-[#1a3a35] to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    >
                      {{ appointment.name.charAt(0) }}
                    </div>
                    <span class="text-sm font-medium text-gray-900">{{
                      appointment.name
                    }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ appointment.phone }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ appointment.email }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    appointment.service
                  }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                      appointment.status === 'Confirmed'
                        ? 'bg-green-100 text-green-700'
                        : appointment.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700',
                    ]"
                  >
                    {{ appointment.status }}
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
          Showing {{ filteredAppointments.length }} of
          {{ appointments.length }} appointments
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

  const filteredAppointments = computed(() => {
    if (!searchQuery.value) return appointments.value;
    const query = searchQuery.value.toLowerCase();
    return appointments.value.filter(
      (apt) =>
        apt.name.toLowerCase().includes(query) ||
        apt.lane.toLowerCase().includes(query) ||
        apt.service.toLowerCase().includes(query) ||
        apt.id.includes(query),
    );
  });

  const appointments = ref([
    {
      id: "1826",
      date: "March 6, 2026",
      time: "3:00 PM",
      lane: "Lane 1",
      name: "Nilanga",
      phone: "+61 404 566 098",
      email: "info@elitecricketcentre.com.au",
      service: "Lane 1 Only Booking - Leather ball",
      status: "Confirmed",
    },
    {
      id: "1827",
      date: "March 13, 2026",
      time: "3:00 PM",
      lane: "Lane 1",
      name: "Nilanga",
      phone: "+61 404 566 098",
      email: "info@elitecricketcentre.com.au",
      service: "Lane 1 Only Booking - Leather ball",
      status: "Confirmed",
    },
    {
      id: "2285",
      date: "March 1, 2026",
      time: "10:00 AM",
      lane: "Lane 4",
      name: "Prageeth",
      phone: "+61 413 071 473",
      email: "info@elitecricketcentre.com.au",
      service: "Lane Only Booking ($40)",
      status: "Pending",
    },
    {
      id: "2286",
      date: "March 1, 2026",
      time: "10:00 AM",
      lane: "Lane 5",
      name: "Prageeth",
      phone: "+61 413 071 473",
      email: "info@elitecricketcentre.com.au",
      service: "Lane 5 Only - Ball Machine 2",
      status: "Confirmed",
    },
    {
      id: "2306",
      date: "March 4, 2026",
      time: "7:30 PM",
      lane: "Lane 6",
      name: "Sam",
      phone: "+61 448 814 726",
      email: "",
      service: "Lane + Bowling Machine",
      status: "Confirmed",
    },
    {
      id: "2307",
      date: "March 6, 2026",
      time: "2:30 PM",
      lane: "Lane 6",
      name: "Sankar",
      phone: "+61 400 632 087",
      email: "Sankar.Melethat@gmail.com",
      service: "Lane + Bowling Machine",
      status: "Pending",
    },
  ]);
</script>
