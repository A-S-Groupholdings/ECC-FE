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
            @click="openCreateModal"
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
        Loading customers...
      </div>

      <!-- Customers Table -->
      <div
        v-else
        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 bg-gray-50">
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  class="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Service
                </th>
                <th
                  class="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Appointments
                </th>
                <th
                  class="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="customer in filteredCustomers"
                :key="customer._id"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- Name -->
                <td
                  class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ customer.name }}
                </td>
                <!-- Email -->
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ customer.email }}
                </td>
                <!-- Phone -->
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ customer.phoneNumber || "-" }}
                </td>
                <!-- Role -->
                <td class="px-4 py-4 whitespace-nowrap">
                  <span
                    class="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                    :class="
                      customer.role === 'admin'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    "
                  >
                    {{ customer.role }}
                  </span>
                </td>
                <!-- Category -->
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ customer.categoryID?.categoryName || "-" }}
                </td>
                <!-- Service -->
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ customer.serviceId?.title || "-" }}
                </td>
                <!-- Appointments -->
                <td class="px-4 py-4 whitespace-nowrap text-center relative">
                  <div class="relative inline-block">
                    <button
                      @click="
                        activeCustomerBookings =
                          activeCustomerBookings === customer._id
                            ? null
                            : customer._id
                      "
                      :class="[
                        'inline-flex items-center justify-center min-w-[2rem] h-7 px-2 rounded-full text-xs font-semibold transition-colors',
                        getCustomerBookings(customer._id).length > 0
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500',
                      ]"
                    >
                      {{ getCustomerBookings(customer._id).length }}
                    </button>
                    <div
                      v-if="activeCustomerBookings === customer._id"
                      class="absolute z-20 mt-2 right-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 max-h-72 overflow-y-auto"
                    >
                      <div
                        v-if="getCustomerBookings(customer._id).length === 0"
                        class="px-4 py-3 text-xs text-gray-400 text-center"
                      >
                        No appointments
                      </div>
                      <div
                        v-for="apt in getCustomerBookings(customer._id)"
                        :key="apt._id"
                        class="px-4 py-2 border-b border-gray-50 last:border-b-0 text-left"
                      >
                        <div class="text-xs font-semibold text-gray-800">
                          {{ apt.bookingId }} ·
                          {{ apt.resourceId?.title || apt.resourceName || "-" }}
                        </div>
                        <div class="text-[10px] text-gray-500 mt-0.5">
                          {{ apt.date ? apt.date.split("T")[0] : "-" }} ·
                          {{ apt.startTime }} - {{ apt.endTime }}
                        </div>
                        <div class="flex items-center gap-1 mt-1">
                          <span
                            :class="[
                              'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium capitalize',
                              apt.status === 'CONFIRMED' ||
                              apt.status === 'COMPLETED'
                                ? 'bg-green-100 text-green-700'
                                : apt.status === 'PENDING'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : apt.status === 'CANCELLED'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-700',
                            ]"
                          >
                            {{ apt.status?.toLowerCase() }}
                          </span>
                          <span
                            :class="[
                              'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium capitalize',
                              apt.paymentStatus === 'PAID'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-orange-100 text-orange-700',
                            ]"
                          >
                            {{ apt.paymentStatus?.toLowerCase() }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <!-- Actions -->
                <td class="px-4 py-4 whitespace-nowrap text-center">
                  <button
                    class="text-[#1a3a35] hover:text-green-600 font-medium text-sm transition-colors"
                  >
                    Edit
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

    <!-- Create Customer Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeCreateModal"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Modal Header -->
        <div
          class="px-6 py-4 border-b border-gray-100 flex justify-between items-center"
        >
          <h2 class="text-lg font-bold text-gray-800">Create Customer</h2>
          <button
            @click="closeCreateModal"
            class="text-gray-400 hover:text-gray-600 transition-colors"
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
              ></path>
            </svg>
          </button>
        </div>

        <!-- Tabs -->
        <div class="px-6 pt-4">
          <div class="flex border-b border-gray-200">
            <button
              @click="createTab = 'member'"
              class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
              :class="
                createTab === 'member'
                  ? 'border-[#1a3a35] text-[#1a3a35]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              "
            >
              Member
            </button>
            <button
              @click="createTab = 'coach'"
              class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
              :class="
                createTab === 'coach'
                  ? 'border-[#1a3a35] text-[#1a3a35]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              "
            >
              Coach
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-5">
          <!-- Member Tab -->
          <div
            v-if="createTab === 'member'"
            class="space-y-5"
          >
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label class="text-sm font-semibold text-gray-700 md:text-right">
                Name <span class="text-red-500">*</span> :
              </label>
              <div class="md:col-span-3">
                <input
                  v-model="memberForm.name"
                  type="text"
                  placeholder="Enter name..."
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label class="text-sm font-semibold text-gray-700 md:text-right">
                Email <span class="text-red-500">*</span> :
              </label>
              <div class="md:col-span-3">
                <input
                  v-model="memberForm.email"
                  type="email"
                  placeholder="Enter email..."
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label class="text-sm font-semibold text-gray-700 md:text-right">
                Phone <span class="text-red-500">*</span> :
              </label>
              <div class="md:col-span-3">
                <input
                  v-model="memberForm.phoneNumber"
                  type="text"
                  placeholder="Enter phone number..."
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          <!-- Coach Tab -->
          <div
            v-else
            class="space-y-5"
          >
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label class="text-sm font-semibold text-gray-700 md:text-right">
                Name <span class="text-red-500">*</span> :
              </label>
              <div class="md:col-span-3">
                <input
                  v-model="coachForm.name"
                  type="text"
                  placeholder="Enter name..."
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label class="text-sm font-semibold text-gray-700 md:text-right">
                Email <span class="text-red-500">*</span> :
              </label>
              <div class="md:col-span-3">
                <input
                  v-model="coachForm.email"
                  type="email"
                  placeholder="Enter email..."
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label class="text-sm font-semibold text-gray-700 md:text-right">
                Phone <span class="text-red-500">*</span> :
              </label>
              <div class="md:col-span-3">
                <input
                  v-model="coachForm.phoneNumber"
                  type="text"
                  placeholder="Enter phone number..."
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>
            </div>
            <!-- Service Dropdown -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <label class="text-sm font-semibold text-gray-700 md:text-right">
                Service :
              </label>
              <div class="md:col-span-3 relative">
                <div class="relative">
                  <input
                    v-model="serviceSearchQuery"
                    @focus="showServiceDropdown = true"
                    @input="showServiceDropdown = true"
                    @blur="setTimeout(() => (showServiceDropdown = false), 150)"
                    type="text"
                    placeholder="Search and select a service..."
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                  />
                  <button
                    v-if="coachForm.serviceId"
                    @click="clearService"
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <!-- Dropdown -->
                <div
                  v-if="showServiceDropdown"
                  class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                >
                  <div
                    v-if="filteredServices.length === 0"
                    class="px-4 py-3 text-sm text-gray-500"
                  >
                    No services found
                  </div>
                  <div
                    v-for="service in filteredServices"
                    :key="service._id"
                    @click="selectService(service)"
                    class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div class="text-sm font-medium text-gray-800">
                      {{ service.title }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ service.categoryID?.categoryName || "No Category" }}
                      — A${{ service.price }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div
          class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col gap-3"
        >
          <div
            v-if="createError"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm"
          >
            {{ createError }}
          </div>
          <div class="flex justify-end gap-3">
            <button
              @click="closeCreateModal"
              class="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="createUser"
              :disabled="isCreating"
              class="px-6 py-3 bg-gradient-to-r from-[#1a3a35] to-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <span v-if="isCreating">Creating...</span>
              <span v-else>Create Customer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import {
    GetUsersAll,
    GetServices,
    CreateUser,
    GetBookings,
  } from "@/services/apiService.js";
  import Nav from "../Dashboard/UI/SecondNav.vue";

  const searchQuery = ref("");
  const customers = ref([]);
  const bookings = ref([]);
  const isLoading = ref(false);
  const activeCustomerBookings = ref(null);

  async function fetchCustomers() {
    isLoading.value = true;
    try {
      const [usersRes, bookingsRes] = await Promise.all([
        GetUsersAll(),
        GetBookings({ limit: 1000 }),
      ]);
      if (usersRes.isSuccess) {
        customers.value = usersRes.value || [];
      }
      if (bookingsRes.isSuccess) {
        const data = bookingsRes.value || {};
        bookings.value = data.items || [];
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    fetchCustomers();
  });

  function getCustomerBookings(customerId) {
    return bookings.value.filter((b) => {
      const uid = b.userId?._id || b.user?._id;
      return uid === customerId;
    });
  }

  const filteredCustomers = computed(() => {
    if (!searchQuery.value) return customers.value;
    const query = searchQuery.value.toLowerCase();
    return customers.value.filter(
      (c) =>
        c.name?.toLowerCase().includes(query) ||
        c.email?.toLowerCase().includes(query) ||
        c.phoneNumber?.includes(query) ||
        c.role?.toLowerCase().includes(query),
    );
  });

  // Create modal
  const showCreateModal = ref(false);
  const createTab = ref("member");
  const isCreating = ref(false);
  const createError = ref("");

  const memberForm = ref({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const coachForm = ref({
    name: "",
    email: "",
    phoneNumber: "",
    serviceId: "",
  });

  // Service dropdown for coach tab
  const services = ref([]);
  const serviceSearchQuery = ref("");
  const showServiceDropdown = ref(false);

  async function fetchServices() {
    try {
      const response = await GetServices();
      if (response.isSuccess) {
        services.value = response.value || [];
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  const filteredServices = computed(() => {
    if (!serviceSearchQuery.value) return services.value;
    const query = serviceSearchQuery.value.toLowerCase();
    return services.value.filter((s) => s.title?.toLowerCase().includes(query));
  });

  function selectService(service) {
    coachForm.value.serviceId = service._id;
    serviceSearchQuery.value = service.title;
    showServiceDropdown.value = false;
  }

  function clearService() {
    coachForm.value.serviceId = "";
    serviceSearchQuery.value = "";
  }

  function openCreateModal() {
    createError.value = "";
    createTab.value = "member";
    memberForm.value = { name: "", email: "", phoneNumber: "" };
    coachForm.value = { name: "", email: "", phoneNumber: "", serviceId: "" };
    serviceSearchQuery.value = "";
    if (services.value.length === 0) fetchServices();
    showCreateModal.value = true;
  }

  function closeCreateModal() {
    showCreateModal.value = false;
    createError.value = "";
  }

  async function createUser() {
    createError.value = "";
    isCreating.value = true;

    const isMember = createTab.value === "member";
    const form = isMember ? memberForm.value : coachForm.value;

    const payload = {
      name: form.name,
      email: form.email,
      role: "user",
      phoneNumber: form.phoneNumber,
      categoryID: isMember
        ? "6a0c8864c5ba691ff6967c4e"
        : "6a0c886bc5ba691ff6967c54",
      membershipId: null,
      serviceId: isMember ? null : form.serviceId || null,
    };

    try {
      const response = await CreateUser(payload);
      if (response.isSuccess) {
        closeCreateModal();
        await fetchCustomers();
      } else {
        createError.value =
          response.errorMessage ||
          response.userMessage ||
          "Failed to create user.";
      }
    } catch (error) {
      createError.value = "Network error. Please try again.";
    } finally {
      isCreating.value = false;
    }
  }
</script>
