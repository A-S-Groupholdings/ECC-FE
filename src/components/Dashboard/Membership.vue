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
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-1">
                    <template v-if="Array.isArray(membership.serviceId) && membership.serviceId.length > 0">
                      <span
                        v-for="svc in membership.serviceId"
                        :key="svc._id"
                        class="inline-block px-2 py-0.5 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700"
                      >
                        {{ svc.title }}
                      </span>
                    </template>
                    <span
                      v-else-if="membership.serviceId?.title"
                      class="text-sm text-gray-700"
                    >
                      {{ membership.serviceId.title }}
                    </span>
                    <span v-else class="text-sm text-gray-400">-</span>
                  </div>
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

          <!-- Service Dropdown (Multiple) -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <label class="text-sm font-semibold text-gray-700 md:text-right pt-3">
              Services :
            </label>
            <div class="md:col-span-3 relative">
              <!-- Selected Services Tags -->
              <div
                v-if="editSelectedServices.length > 0"
                class="flex flex-wrap gap-2 mb-2"
              >
                <span
                  v-for="service in editSelectedServices"
                  :key="service._id"
                  class="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800"
                >
                  {{ service.title }}
                  <button
                    @click="removeEditService(service._id)"
                    type="button"
                    class="text-green-600 hover:text-red-500 ml-1"
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
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </span>
              </div>
              <!-- Search Input -->
              <div class="relative">
                <input
                  v-model="serviceSearchQuery"
                  @focus="showServiceDropdown = true"
                  @input="showServiceDropdown = true"
                  @blur="setTimeout(() => (showServiceDropdown = false), 150)"
                  type="text"
                  placeholder="Search and add services..."
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>
              <!-- Dropdown -->
              <div
                v-if="showServiceDropdown && editAvailableServices.length > 0"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
              >
                <div
                  v-for="service in editAvailableServices"
                  :key="service._id"
                  @click="addEditService(service)"
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
              <div
                v-if="showServiceDropdown && editAvailableServices.length === 0"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg"
              >
                <div class="px-4 py-3 text-sm text-gray-500">
                  No more services available
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
    serviceIds: [],
    durationDays: 30,
    isActive: true,
  });
  const isUpdating = ref(false);
  const updateError = ref("");

  // Service dropdown state (multiple)
  const services = ref([]);
  const serviceSearchQuery = ref("");
  const showServiceDropdown = ref(false);
  const editSelectedServices = ref([]);

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

  const editAvailableServices = computed(() => {
    const selectedIds = editSelectedServices.value.map((s) => s._id);
    let list = services.value.filter((s) => !selectedIds.includes(s._id));
    if (serviceSearchQuery.value) {
      const query = serviceSearchQuery.value.toLowerCase();
      list = list.filter((s) => s.title?.toLowerCase().includes(query));
    }
    return list;
  });

  function addEditService(service) {
    editSelectedServices.value.push({ _id: service._id, title: service.title });
    editForm.value.serviceIds = editSelectedServices.value.map((s) => s._id);
    serviceSearchQuery.value = "";
    showServiceDropdown.value = false;
  }

  function removeEditService(id) {
    editSelectedServices.value = editSelectedServices.value.filter((s) => s._id !== id);
    editForm.value.serviceIds = editSelectedServices.value.map((s) => s._id);
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

        // Handle serviceId as array or single object
        let svcArray = [];
        if (Array.isArray(data.serviceId)) {
          svcArray = data.serviceId.map((s) => ({ _id: s._id, title: s.title }));
        } else if (typeof data.serviceId === "object" && data.serviceId) {
          svcArray = [{ _id: data.serviceId._id, title: data.serviceId.title }];
        }

        editSelectedServices.value = svcArray;
        editForm.value = {
          name: data.name || "",
          description: data.description || "",
          type: data.type || "FREE",
          price: data.price || 0,
          serviceIds: svcArray.map((s) => s._id),
          durationDays: data.durationDays || 30,
          isActive: data.isActive ?? true,
        };
        serviceSearchQuery.value = "";
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
        serviceIds: editForm.value.serviceIds.length > 0 ? editForm.value.serviceIds : [],
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
