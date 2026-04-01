<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <!-- main section -->
    <div class="User-create-account gap-4 pr-0 md:pr-24 mt-5">
      <!-- Header with Filters and Add Service Button -->
      <div
        class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4"
      >
        <h1 class="md:text-2xl sm:text-lg font-bold text-primary">Services</h1>
        <div class="flex gap-2">
          <button
            class="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Services order...
          </button>
          <button
            class="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Tags...
          </button>
          <button
            class="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Categories...
          </button>
          <button
            @click="showModal = true"
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
            Add Services...
          </button>
        </div>
      </div>

      <!-- Quick Search and Category Filter -->
      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <div class="relative flex-1 max-w-md">
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
            placeholder="Quick search Services"
            class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent shadow-sm"
          />
        </div>
        <select
          v-model="selectedCategory"
          class="bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] shadow-sm"
        >
          <option value="">Categories</option>
          <option value="Individuals Less than 6 Players">
            Individuals Less than 6 Players
          </option>
          <option value="Cricket Club">Cricket Club</option>
          <option value="Coach">Coach</option>
          <option value="Individuals 6+ Players">Individuals 6+ Players</option>
        </select>
      </div>

      <!-- Services Table -->
      <div
        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    class="rounded border-gray-300"
                  />
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Title
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Category
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Duration
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Price
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Tags
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Online meetings
                    <svg
                      class="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
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
                v-for="service in filteredServices"
                :key="service.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-4 h-4 rounded-full"
                      :style="{ backgroundColor: service.color }"
                    ></div>
                    <span class="text-sm font-medium text-gray-900">{{
                      service.title
                    }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ service.category }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ service.duration }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ service.price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    v-if="service.tags"
                    class="text-sm text-gray-600"
                    >{{ service.tags }}</span
                  >
                  <span
                    v-else
                    class="text-sm text-gray-400"
                    >-</span
                  >
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ service.onlineMeetings }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
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
                      class="rounded border-gray-300 ml-2"
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
          Showing {{ filteredServices.length }} of
          {{ Services.length }} Services
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

    <!-- Create Service Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showModal = false"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <!-- Modal Header -->
        <div
          class="bg-gradient-to-r from-[#1a3a35] to-green-600 px-6 py-4 flex justify-between items-center"
        >
          <h2 class="text-white text-lg font-bold">Create New Service</h2>
          <button
            @click="showModal = false"
            class="text-white hover:text-gray-200 transition-colors"
          >
            <svg
              class="w-6 h-6"
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
        <div class="p-6 space-y-5">
          <!-- Service Title -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2"
              >Service Title</label
            >
            <input
              v-model="newService.title"
              type="text"
              placeholder="Enter service name..."
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
            />
          </div>

          <!-- Category & Resource Row -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Category</label
              >
              <select
                v-model="newService.category"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] transition-all"
              >
                <option value="">Select Category</option>
                <option value="Individuals Less than 6 Players">
                  Individuals Less than 6 Players
                </option>
                <option value="Individuals 6+ Players">
                  Individuals 6+ Players
                </option>
                <option value="Cricket Club">Cricket Club</option>
                <option value="Coach">Coach</option>
                <option value="Member">Member</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Resources</label
              >
              <div class="relative">
                <button
                  @click="showResourceDropdown = !showResourceDropdown"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-left text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] transition-all flex justify-between items-center"
                >
                  <span v-if="selectedResources.length === 0"
                    >Select Resources</span
                  >
                  <span v-else>{{ selectedResources.length }} selected</span>
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
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                <!-- Dropdown -->
                <div
                  v-if="showResourceDropdown"
                  class="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto"
                >
                  <div class="p-2 space-y-1">
                    <label
                      class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        v-model="selectAllResources"
                        @change="toggleAllResources"
                        class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span class="text-sm font-medium text-gray-700"
                        >Select All</span
                      >
                    </label>
                    <div class="border-t border-gray-100 my-1"></div>
                    <label
                      v-for="resource in availableResources"
                      :key="resource"
                      class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        :value="resource"
                        v-model="selectedResources"
                        class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span class="text-sm text-gray-700">{{ resource }}</span>
                    </label>
                  </div>
                </div>
              </div>
              <!-- Selected tags -->
              <div
                v-if="selectedResources.length > 0"
                class="flex flex-wrap gap-2 mt-2"
              >
                <span
                  v-for="resource in selectedResources"
                  :key="resource"
                  class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium"
                >
                  {{ resource }}
                  <button
                    @click="removeResource(resource)"
                    class="hover:text-green-900"
                  >
                    <svg
                      class="w-3 h-3"
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
            </div>
          </div>

          <!-- Duration Stepper -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2"
              >Duration</label
            >
            <div class="flex items-center gap-3">
              <button
                @click="decreaseDuration"
                class="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                :disabled="durationIndex <= 0"
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
                    d="M20 12H4"
                  ></path>
                </svg>
              </button>
              <div
                class="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-center"
              >
                <span class="text-lg font-semibold text-gray-800">{{
                  durationOptions[durationIndex]
                }}</span>
              </div>
              <button
                @click="increaseDuration"
                class="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                :disabled="durationIndex >= durationOptions.length - 1"
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
              </button>
            </div>
          </div>

          <!-- Price -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2"
              >Price (A$)</label
            >
            <div class="relative">
              <span
                class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold"
                >A$</span
              >
              <input
                v-model="newService.price"
                type="number"
                placeholder="0.00"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            @click="showModal = false"
            class="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="createService"
            class="px-5 py-2.5 bg-gradient-to-r from-[#1a3a35] to-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            Create Service
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
  const selectedCategory = ref("");
  const showModal = ref(false);

  // Duration stepper options
  const durationOptions = [
    "30 min",
    "1 h",
    "1 h 30 min",
    "2 h",
    "2 h 30 min",
    "3 h",
  ];
  const durationIndex = ref(1); // Default to "1 h"

  // New service form
  const newService = ref({
    title: "",
    category: "",
    price: "",
  });

  // Resource multi-select
  const showResourceDropdown = ref(false);
  const selectedResources = ref([]);
  const selectAllResources = ref(false);
  const availableResources = [
    "Lane 1",
    "Lane 2",
    "Lane 3",
    "Lane 4",
    "Lane 5",
    "Lane 6",
    "Lane 7",
    "Lane 8",
    "Bowling Machine 1",
    "Bowling Machine 2",
  ];

  function toggleAllResources() {
    if (selectAllResources.value) {
      selectedResources.value = [...availableResources];
    } else {
      selectedResources.value = [];
    }
  }

  function removeResource(resource) {
    selectedResources.value = selectedResources.value.filter(
      (r) => r !== resource,
    );
    selectAllResources.value =
      selectedResources.value.length === availableResources.length;
  }

  function increaseDuration() {
    if (durationIndex.value < durationOptions.length - 1) {
      durationIndex.value++;
    }
  }

  function decreaseDuration() {
    if (durationIndex.value > 0) {
      durationIndex.value--;
    }
  }

  function createService() {
    // Add new service to the list
    const service = {
      id: Services.value.length + 1,
      title: newService.value.title || "New Service",
      category: newService.value.category || "Individuals Less than 6 Players",
      duration: durationOptions[durationIndex.value],
      price: `A$${newService.value.price || "0.00"}`,
      tags: "",
      onlineMeetings: "",
      color: "#22c55e",
    };
    Services.value.push(service);

    // Reset form and close modal
    newService.value = { title: "", category: "", resource: "", price: "" };
    durationIndex.value = 1;
    showModal.value = false;
  }

  const Services = ref([
    {
      id: 1,
      title: "Lane Only Booking ($40)",
      category: "Individuals Less than 6 Players",
      duration: "1 h",
      price: "A$40.00",
      tags: "",
      onlineMeetings: "",
      color: "#22c55e",
    },
    {
      id: 2,
      title: "Lane Only Booking ($50)",
      category: "Cricket Club",
      duration: "1 h",
      price: "A$50.00",
      tags: "",
      onlineMeetings: "",
      color: "#eab308",
    },
    {
      id: 3,
      title: "Lane Only Booking",
      category: "Coach",
      duration: "1 h",
      price: "A$30.00",
      tags: "",
      onlineMeetings: "",
      color: "#ec4899",
    },
    {
      id: 4,
      title: "Lane Only Booking ($50)",
      category: "Individuals 6+ Players",
      duration: "1 h",
      price: "A$50.00",
      tags: "",
      onlineMeetings: "",
      color: "#8b5cf6",
    },
    {
      id: 5,
      title: "Lane + Bowling Machine",
      category: "Individuals Less than 6 Players",
      duration: "1 h",
      price: "A$40.00",
      tags: "",
      onlineMeetings: "",
      color: "#22c55e",
    },
    {
      id: 6,
      title: "Lane + Bowling Machine & Auto Feeder",
      category: "Individuals Less than 6 Players",
      duration: "1 h",
      price: "A$40.00",
      tags: "",
      onlineMeetings: "",
      color: "#22c55e",
    },
  ]);

  const filteredServices = computed(() => {
    let result = Services.value;

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query),
      );
    }

    if (selectedCategory.value) {
      result = result.filter((s) => s.category === selectedCategory.value);
    }

    return result;
  });
</script>
