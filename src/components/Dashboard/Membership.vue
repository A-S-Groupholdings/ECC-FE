<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <div class="pr-0 md:pr-6 mt-5">
      <!-- Header with Create Membership Button -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
      >
        <h1 class="md:text-2xl sm:text-lg font-bold text-primary">
          Memberships
        </h1>
        <router-link
          to="/dashboard/membership/create"
          target="none"
        >
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
            Create Membership
          </button>
        </router-link>
      </div>

      <!-- Quick Search -->
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
            placeholder="Quick search memberships..."
            class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent shadow-sm"
          />
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
        Loading memberships...
      </div>

      <!-- Memberships Table -->
      <div
        v-else
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
                  Service
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
              <tr
                v-for="membership in filteredMemberships"
                :key="membership._id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4">
                  <span class="text-sm font-semibold text-gray-900">{{
                    membership.name
                  }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    membership.serviceId?.title || "-"
                  }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    membership.type
                  }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700"
                    >A${{ membership.price }}</span
                  >
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700"
                    >{{ membership.durationDays }} days</span
                  >
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center justify-center">
                    <button
                      @click="toggleMembership(membership)"
                      class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                      :class="
                        membership.isActive
                          ? 'bg-green-500 focus:ring-green-500'
                          : 'bg-gray-300 focus:ring-gray-300'
                      "
                    >
                      <span
                        class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                        :class="
                          membership.isActive
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        "
                      ></span>
                    </button>
                    <span
                      class="ml-2 text-xs font-semibold w-12"
                      :class="
                        membership.isActive ? 'text-green-600' : 'text-gray-500'
                      "
                    >
                      {{ membership.isActive ? "ON" : "OFF" }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    @click="openEditModal(membership)"
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
          Showing {{ filteredMemberships.length }} of
          {{ memberships.length }} memberships
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

    <!-- Edit Modal -->
    <div
      v-if="isEditModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeEditModal"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Modal Header -->
        <div
          class="px-6 py-4 border-b border-gray-100 flex justify-between items-center"
        >
          <h2 class="text-lg font-bold text-gray-800">Edit Membership</h2>
          <button
            @click="closeEditModal"
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

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Name -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label class="text-sm font-semibold text-gray-700 md:text-right">
              Name <span class="text-red-500">*</span> :
            </label>
            <div class="md:col-span-3">
              <input
                v-model="editForm.name"
                type="text"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Description -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <label
              class="text-sm font-semibold text-gray-700 md:text-right pt-3"
            >
              Description :
            </label>
            <div class="md:col-span-3">
              <textarea
                v-model="editForm.description"
                rows="4"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Type -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label class="text-sm font-semibold text-gray-700 md:text-right">
              Type :
            </label>
            <div class="md:col-span-3">
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <label
                  class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all"
                  :class="
                    editForm.type === 'FREE'
                      ? 'border-[#1a3a35] bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  "
                >
                  <input
                    v-model="editForm.type"
                    type="radio"
                    value="FREE"
                    class="w-4 h-4 text-[#1a3a35] focus:ring-[#1a3a35]"
                  />
                  <span class="text-sm font-medium text-gray-700">Free</span>
                </label>
                <label
                  class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all"
                  :class="
                    editForm.type === 'ONE_TIME'
                      ? 'border-[#1a3a35] bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  "
                >
                  <input
                    v-model="editForm.type"
                    type="radio"
                    value="ONE_TIME"
                    class="w-4 h-4 text-[#1a3a35] focus:ring-[#1a3a35]"
                  />
                  <span class="text-sm font-medium text-gray-700"
                    >One-Time</span
                  >
                </label>
                <label
                  class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all"
                  :class="
                    editForm.type === 'SUBSCRIPTION'
                      ? 'border-[#1a3a35] bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  "
                >
                  <input
                    v-model="editForm.type"
                    type="radio"
                    value="SUBSCRIPTION"
                    class="w-4 h-4 text-[#1a3a35] focus:ring-[#1a3a35]"
                  />
                  <span class="text-sm font-medium text-gray-700"
                    >Subscription</span
                  >
                </label>
              </div>
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
                  v-if="editForm.serviceId"
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
                    {{ service.categoryID?.categoryName || "No Category" }} —
                    A${{ service.price }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Price -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label class="text-sm font-semibold text-gray-700 md:text-right">
              Price <span class="text-red-500">*</span> :
            </label>
            <div class="md:col-span-3">
              <div class="relative">
                <span
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold"
                  >A$</span
                >
                <input
                  v-model="editForm.price"
                  type="number"
                  class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          <!-- Duration Days -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label class="text-sm font-semibold text-gray-700 md:text-right">
              Duration (Days) <span class="text-red-500">*</span> :
            </label>
            <div class="md:col-span-3">
              <input
                v-model="editForm.durationDays"
                type="number"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Status -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label class="text-sm font-semibold text-gray-700 md:text-right">
              Status :
            </label>
            <div class="md:col-span-3">
              <div class="flex items-center">
                <button
                  @click="editForm.isActive = !editForm.isActive"
                  type="button"
                  class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                  :class="
                    editForm.isActive
                      ? 'bg-green-500 focus:ring-green-500'
                      : 'bg-gray-300 focus:ring-gray-300'
                  "
                >
                  <span
                    class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                    :class="
                      editForm.isActive ? 'translate-x-6' : 'translate-x-1'
                    "
                  ></span>
                </button>
                <span
                  class="ml-3 text-sm font-semibold"
                  :class="
                    editForm.isActive ? 'text-green-600' : 'text-gray-500'
                  "
                >
                  {{ editForm.isActive ? "ON" : "OFF" }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div
          class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col gap-3"
        >
          <div
            v-if="updateError"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm"
          >
            {{ updateError }}
          </div>
          <div class="flex justify-end gap-3">
            <button
              @click="closeEditModal"
              class="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="updateMembership"
              :disabled="isUpdating"
              class="px-6 py-3 bg-gradient-to-r from-[#1a3a35] to-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <span v-if="isUpdating">Updating...</span>
              <span v-else>Update Membership</span>
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
    GetMemberships,
    GetMembershipById,
    UpdateMembership,
    GetServices,
  } from "@/services/apiService.js";
  import Nav from "../Dashboard/UI/SecondNav.vue";

  const searchQuery = ref("");
  const memberships = ref([]);
  const isLoading = ref(false);

  const isEditModalOpen = ref(false);
  const selectedMembership = ref(null);
  const editForm = ref({
    name: "",
    description: "",
    type: "FREE",
    price: 0,
    serviceId: "",
    durationDays: 30,
    isActive: true,
  });
  const isUpdating = ref(false);
  const updateError = ref("");

  // Service dropdown state
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
    return services.value.filter((s) =>
      s.title?.toLowerCase().includes(query),
    );
  });

  function selectService(service) {
    editForm.value.serviceId = service._id;
    serviceSearchQuery.value = service.title;
    showServiceDropdown.value = false;
  }

  function clearService() {
    editForm.value.serviceId = "";
    serviceSearchQuery.value = "";
  }

  async function fetchMemberships() {
    isLoading.value = true;
    try {
      const response = await GetMemberships();
      if (response.isSuccess) {
        memberships.value = response.value || [];
      }
    } catch (error) {
      console.error("Error fetching memberships:", error);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    fetchMemberships();
  });

  const filteredMemberships = computed(() => {
    if (!searchQuery.value) return memberships.value;
    const query = searchQuery.value.toLowerCase();
    return memberships.value.filter((m) =>
      m.name.toLowerCase().includes(query),
    );
  });

  function toggleMembership(membership) {
    membership.isActive = !membership.isActive;
  }

  async function openEditModal(membership) {
    updateError.value = "";
    if (services.value.length === 0) await fetchServices();
    try {
      const response = await GetMembershipById(membership._id);
      if (response.isSuccess && response.value) {
        const data = response.value;
        selectedMembership.value = data;
        const svc =
          typeof data.serviceId === "object" && data.serviceId
            ? data.serviceId
            : null;
        editForm.value = {
          name: data.name || "",
          description: data.description || "",
          type: data.type || "FREE",
          price: data.price || 0,
          serviceId: svc?._id || data.serviceId || "",
          durationDays: data.durationDays || 30,
          isActive: data.isActive ?? true,
        };
        serviceSearchQuery.value = svc?.title || "";
        isEditModalOpen.value = true;
      }
    } catch (error) {
      console.error("Error fetching membership details:", error);
    }
  }

  function closeEditModal() {
    isEditModalOpen.value = false;
    selectedMembership.value = null;
    updateError.value = "";
  }

  async function updateMembership() {
    if (!selectedMembership.value) return;
    updateError.value = "";
    isUpdating.value = true;
    try {
      const response = await UpdateMembership(selectedMembership.value._id, {
        name: editForm.value.name,
        description: editForm.value.description,
        type: editForm.value.type,
        price: Number(editForm.value.price) || 0,
        serviceId: editForm.value.serviceId || null,
        durationDays: Number(editForm.value.durationDays) || 30,
        isActive: editForm.value.isActive,
      });
      if (response.isSuccess) {
        closeEditModal();
        await fetchMemberships();
      } else {
        updateError.value =
          response.errorMessage || response.userMessage || "Update failed.";
      }
    } catch (error) {
      updateError.value = "Network error. Please try again.";
    } finally {
      isUpdating.value = false;
    }
  }
</script>
