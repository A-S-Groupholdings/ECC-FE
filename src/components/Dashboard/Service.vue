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

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
      >
        <svg
          class="w-5 h-5 text-red-500 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <p class="text-sm text-red-700">{{ errorMessage }}</p>
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
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    class="rounded border-gray-300"
                  />
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Tag
                </th>
                <th
                  class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Resources
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Visible
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Created At
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Updated At
                </th>
                <th
                  class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="isLoading">
                <td
                  colspan="11"
                  class="px-6 py-12 text-center"
                >
                  <div class="flex items-center justify-center gap-2">
                    <svg
                      class="w-5 h-5 text-[#1a3a35] animate-spin"
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
                    <span class="text-gray-500 text-sm"
                      >Loading services...</span
                    >
                  </div>
                </td>
              </tr>
              <tr
                v-for="service in paginatedServices"
                :key="service._id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    class="rounded border-gray-300"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-semibold text-gray-900">{{
                    service.title
                  }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ service.categoryID?.categoryName || "-" }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="
                      service.tag === 'All'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    "
                  >
                    {{ service.tag || "-" }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1a3a35]/10 text-[#1a3a35] text-xs font-bold"
                  >
                    {{ service.resourceIDs?.length || 0 }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  A${{ service.price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center justify-center">
                    <button
                      @click="service.isVisible = !service.isVisible"
                      class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                      :class="
                        service.isVisible
                          ? 'bg-green-500 focus:ring-green-500'
                          : 'bg-gray-300 focus:ring-gray-300'
                      "
                    >
                      <span
                        class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                        :class="
                          service.isVisible ? 'translate-x-6' : 'translate-x-1'
                        "
                      ></span>
                    </button>
                    <span
                      class="ml-2 text-xs font-semibold w-12"
                      :class="
                        service.isVisible ? 'text-green-600' : 'text-gray-500'
                      "
                    >
                      {{ service.isVisible ? "ON" : "OFF" }}
                    </span>
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate"
                >
                  {{ service.description || "-" }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ formatDate(service.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ formatDate(service.updatedAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      @click="openEditModal(service._id)"
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
                      Edit
                    </button>
                    <button
                      @click="deleteService(service._id)"
                      :disabled="isDeleting === service._id"
                      class="text-gray-400 hover:text-red-500 transition-colors p-1 disabled:opacity-50"
                    >
                      <svg
                        v-if="isDeleting !== service._id"
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                      <svg
                        v-else
                        class="w-5 h-5 animate-spin"
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
                    </button>
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
          Showing {{ paginatedServices.length }} of
          {{ filteredServices.length }} services (Page {{ currentPage }} of
          {{ totalPages }})
        </p>
        <div class="flex items-center gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage <= 1"
            class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div class="flex gap-1">
            <button
              v-for="page in pageNumbers"
              :key="page"
              @click="currentPage = page"
              class="w-9 h-9 rounded-lg text-sm font-medium transition-colors"
              :class="
                currentPage === page
                  ? 'bg-[#1a3a35] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              "
            >
              {{ page }}
            </button>
          </div>
          <button
            @click="currentPage++"
            :disabled="currentPage >= totalPages"
            class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Create Service Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
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
        <div
          class="p-4 space-y-5 grid grid-cols-2 md:grid-cols-4 gap-4 items-center overflow-y-auto max-h-[60vh]"
        >
          <!-- Tabs -->
          <div class="col-span-2 md:col-span-4 flex gap-2">
            <button
              @click="createActiveTab = 'general'"
              :class="
                createActiveTab === 'general'
                  ? 'bg-[#1a3a35] text-white'
                  : 'bg-gray-100 text-gray-600'
              "
              class="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              General
            </button>
            <button
              @click="createActiveTab = 'condition'"
              :class="
                createActiveTab === 'condition'
                  ? 'bg-[#1a3a35] text-white'
                  : 'bg-gray-100 text-gray-600'
              "
              class="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Condition
            </button>
          </div>

          <template v-if="createActiveTab === 'general'">
            <!-- Service Title -->
            <div class="md:col-span-2">
              <label class="text-sm font-semibold text-gray-700 mb-2"
                >Service Title</label
              >
              <input
                v-model="newService.title"
                type="text"
                placeholder="Enter service name..."
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
              />
            </div>

            <!-- Category -->
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700"
                >Category
              </label>
              <div
                v-if="isLoadingCategories"
                class="text-sm text-gray-500"
              >
                <svg
                  class="w-4 h-4 animate-spin inline mr-2"
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
                Loading categories...
              </div>
              <select
                v-else
                v-model="newService.categoryID"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] transition-all"
              >
                <option value="">Select Category</option>
                <option
                  v-for="cat in categories"
                  :key="cat._id"
                  :value="cat._id"
                >
                  {{ cat.categoryName }}
                </option>
              </select>
            </div>

            <!-- Resources Multi-select -->
            <div class="md:col-span-4">
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Resources</label
              >
              <div
                v-if="isLoadingResources"
                class="text-sm text-gray-500 py-2"
              >
                <svg
                  class="w-4 h-4 animate-spin inline mr-2"
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
                Loading resources...
              </div>
              <div
                v-else
                class="relative"
              >
                <button
                  @click="showResourceDropdown = !showResourceDropdown"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-left text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] transition-all flex justify-between items-center"
                >
                  <span v-if="selectedResourceIds.length === 0"
                    >Select Resources</span
                  >
                  <span v-else>{{ selectedResourceIds.length }} selected</span>
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
                      v-for="resource in apiResources"
                      :key="resource._id"
                      class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        :value="resource._id"
                        v-model="selectedResourceIds"
                        class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span class="text-sm text-gray-700">{{
                        resource.title
                      }}</span>
                    </label>
                  </div>
                </div>
              </div>
              <!-- Selected resources badges -->
              <div
                v-if="selectedResourceIds.length > 0"
                class="flex flex-wrap gap-2 mt-2"
              >
                <span
                  v-for="resId in selectedResourceIds"
                  :key="resId"
                  class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium"
                >
                  {{ getResourceTitle(resId) }}
                  <button
                    @click="removeResource(resId)"
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

            <!-- Duration (fixed 30m) -->
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Duration</label
              >
              <div
                class="px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-center"
              >
                <span class="text-lg font-semibold text-gray-800">30m</span>
              </div>
            </div>

            <!-- Price -->
            <div class="md:col-span-2">
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

            <!-- Tag -->
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Tag</label
              >
              <select
                v-model="newService.tag"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] transition-all"
              >
                <option value="All">All</option>
                <option value="Individual">Individual</option>
                <option value="Group">Group</option>
                <option value="Club">Club</option>
                <option value="Club">Membership</option>
              </select>
            </div>

            <!-- Visible Toggle -->
            <div class="flex items-center justify-between md:col-span-2">
              <label class="text-sm font-semibold text-gray-700">Visible</label>
              <button
                @click="newService.isVisible = !newService.isVisible"
                class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
                :class="newService.isVisible ? 'bg-[#1a3a35]' : 'bg-gray-300'"
              >
                <span
                  class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                  :class="
                    newService.isVisible ? 'translate-x-6' : 'translate-x-1'
                  "
                ></span>
              </button>
            </div>

            <!-- Description -->
            <div class="md:col-span-4">
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Description</label
              >
              <textarea
                v-model="newService.description"
                rows="3"
                placeholder="Enter service description..."
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>
          </template>

          <template v-if="createActiveTab === 'condition'">
            <!-- Appointment Limit Enabled -->
            <div class="flex items-center justify-between md:col-span-2">
              <label class="text-sm font-semibold text-gray-700"
                >Appointment Limit</label
              >
              <button
                @click="
                  newService.appointmentLimit.enabled =
                    !newService.appointmentLimit.enabled
                "
                class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
                :class="
                  newService.appointmentLimit.enabled
                    ? 'bg-[#1a3a35]'
                    : 'bg-gray-300'
                "
              >
                <span
                  class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                  :class="
                    newService.appointmentLimit.enabled
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  "
                ></span>
              </button>
            </div>

            <!-- Appointment Limit Number -->
            <div
              class="md:col-span-2"
              v-if="newService.appointmentLimit.enabled"
            >
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Limit</label
              >
              <input
                v-model="newService.appointmentLimit.limit"
                type="number"
                placeholder="2"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
              />
            </div>

            <!-- Appointment Period -->
            <div
              class="md:col-span-2"
              v-if="newService.appointmentLimit.enabled"
            >
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Period</label
              >
              <select
                v-model="newService.appointmentLimit.period"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] transition-all"
              >
                <option value="perDay">perDay</option>
                <option value="perWeek">perWeek</option>
                <option value="perMonth">perMonth</option>
              </select>
            </div>

            <!-- limitDuration -->
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Limit Duration</label
              >
              <input
                v-model="newService.appointmentLimit.limitDuration"
                type="text"
                placeholder="1h"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
              />
            </div>

            <!-- Min Time Before Booking -->
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Min Time Before Booking</label
              >
              <input
                v-model="newService.appointmentLimit.minTimeBeforeBooking"
                type="text"
                placeholder="1h"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
              />
            </div>

            <!-- Min Time Before Canceling -->
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >Min Time Before Canceling</label
              >
              <input
                v-model="newService.appointmentLimit.minTimeBeforeCanceling"
                type="text"
                placeholder="2h"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
              />
            </div>
          </template>
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
            :disabled="
              isCreating || !newService.title.trim() || !newService.categoryID
            "
            class="px-5 py-2.5 bg-gradient-to-r from-[#1a3a35] to-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg
              v-if="isCreating"
              class="w-4 h-4 animate-spin"
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
            {{ isCreating ? "Creating..." : "Create Service" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Service Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showEditModal = false"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
      >
        <!-- Modal Header -->
        <div
          class="bg-gradient-to-r from-[#1a3a35] to-green-600 px-6 py-4 flex justify-between items-center"
        >
          <h2 class="text-white text-lg font-bold">Edit Service</h2>
          <button
            @click="showEditModal = false"
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
        <div
          class="p-4 space-y-5 grid grid-cols-2 md:grid-cols-4 gap-4 items-center overflow-y-auto max-h-[60vh]"
        >
          <div
            v-if="isLoadingEdit"
            class="col-span-2 md:col-span-4 py-8 text-center"
          >
            <svg
              class="w-6 h-6 text-[#1a3a35] animate-spin mx-auto mb-2"
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
            <span class="text-sm text-gray-500">Loading service...</span>
          </div>

          <template v-else>
            <!-- Tabs -->
            <div class="col-span-2 md:col-span-4 flex gap-2">
              <button
                @click="editActiveTab = 'general'"
                :class="
                  editActiveTab === 'general'
                    ? 'bg-[#1a3a35] text-white'
                    : 'bg-gray-100 text-gray-600'
                "
                class="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                General
              </button>
              <button
                @click="editActiveTab = 'condition'"
                :class="
                  editActiveTab === 'condition'
                    ? 'bg-[#1a3a35] text-white'
                    : 'bg-gray-100 text-gray-600'
                "
                class="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Condition
              </button>
            </div>

            <template v-if="editActiveTab === 'general'">
              <!-- Service Title -->
              <div class="md:col-span-2">
                <label class="text-sm font-semibold text-gray-700 mb-2"
                  >Service Title</label
                >
                <input
                  v-model="editingService.title"
                  type="text"
                  placeholder="Enter service name..."
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>

              <!-- Category -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700"
                  >Category
                </label>
                <div
                  v-if="isLoadingCategories"
                  class="text-sm text-gray-500"
                >
                  <svg
                    class="w-4 h-4 animate-spin inline mr-2"
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
                  Loading categories...
                </div>
                <select
                  v-else
                  v-model="editingService.categoryID"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] transition-all"
                >
                  <option value="">Select Category</option>
                  <option
                    v-for="cat in categories"
                    :key="cat._id"
                    :value="cat._id"
                  >
                    {{ cat.categoryName }}
                  </option>
                </select>
              </div>

              <!-- Resources Multi-select -->
              <div class="md:col-span-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Resources</label
                >
                <div
                  v-if="isLoadingResources"
                  class="text-sm text-gray-500 py-2"
                >
                  <svg
                    class="w-4 h-4 animate-spin inline mr-2"
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
                  Loading resources...
                </div>
                <div
                  v-else
                  class="relative"
                >
                  <button
                    @click="
                      editShowResourceDropdown = !editShowResourceDropdown
                    "
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-left text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] transition-all flex justify-between items-center"
                  >
                    <span v-if="editSelectedResourceIds.length === 0"
                      >Select Resources</span
                    >
                    <span v-else
                      >{{ editSelectedResourceIds.length }} selected</span
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
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  <!-- Dropdown -->
                  <div
                    v-if="editShowResourceDropdown"
                    class="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto"
                  >
                    <div class="p-2 space-y-1">
                      <label
                        class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          v-model="editSelectAllResources"
                          @change="toggleEditAllResources"
                          class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span class="text-sm font-medium text-gray-700"
                          >Select All</span
                        >
                      </label>
                      <div class="border-t border-gray-100 my-1"></div>
                      <label
                        v-for="resource in apiResources"
                        :key="resource._id"
                        class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          :value="resource._id"
                          v-model="editSelectedResourceIds"
                          class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span class="text-sm text-gray-700">{{
                          resource.title
                        }}</span>
                      </label>
                    </div>
                  </div>
                </div>
                <!-- Selected resources badges -->
                <div
                  v-if="editSelectedResourceIds.length > 0"
                  class="flex flex-wrap gap-2 mt-2"
                >
                  <span
                    v-for="resId in editSelectedResourceIds"
                    :key="resId"
                    class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium"
                  >
                    {{ getResourceTitle(resId) }}
                    <button
                      @click="removeEditResource(resId)"
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

              <!-- Duration (fixed 30m) -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Duration</label
                >
                <div
                  class="px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-center"
                >
                  <span class="text-lg font-semibold text-gray-800">30m</span>
                </div>
              </div>

              <!-- Price -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Price (A$)</label
                >
                <div class="relative">
                  <span
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold"
                    >A$</span
                  >
                  <input
                    v-model="editingService.price"
                    type="number"
                    placeholder="0.00"
                    class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <!-- Tag -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Tag</label
                >
                <select
                  v-model="editingService.tag"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] transition-all"
                >
                  <option value="All">All</option>
                  <option value="Individual">Individual</option>
                  <option value="Group">Group</option>
                  <option value="Club">Club</option>
                </select>
              </div>

              <!-- Visible Toggle -->
              <div class="flex items-center justify-between md:col-span-2">
                <label class="text-sm font-semibold text-gray-700"
                  >Visible</label
                >
                <button
                  @click="editingService.isVisible = !editingService.isVisible"
                  class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
                  :class="
                    editingService.isVisible ? 'bg-[#1a3a35]' : 'bg-gray-300'
                  "
                >
                  <span
                    class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                    :class="
                      editingService.isVisible
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    "
                  ></span>
                </button>
              </div>

              <!-- Description -->
              <div class="md:col-span-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Description</label
                >
                <textarea
                  v-model="editingService.description"
                  rows="3"
                  placeholder="Enter service description..."
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>
            </template>

            <template v-if="editActiveTab === 'condition'">
              <!-- Appointment Limit Enabled -->
              <div class="flex items-center justify-between md:col-span-2">
                <label class="text-sm font-semibold text-gray-700"
                  >Appointment Limit</label
                >
                <button
                  @click="
                    editingService.appointmentLimit.enabled =
                      !editingService.appointmentLimit.enabled
                  "
                  class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
                  :class="
                    editingService.appointmentLimit.enabled
                      ? 'bg-[#1a3a35]'
                      : 'bg-gray-300'
                  "
                >
                  <span
                    class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                    :class="
                      editingService.appointmentLimit.enabled
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    "
                  ></span>
                </button>
              </div>

              <!-- Appointment Limit Number -->
              <div
                class="md:col-span-2"
                v-if="editingService.appointmentLimit.enabled"
              >
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Limit</label
                >
                <input
                  v-model="editingService.appointmentLimit.limit"
                  type="number"
                  placeholder="2"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>

              <!-- Appointment Period -->
              <div
                class="md:col-span-2"
                v-if="editingService.appointmentLimit.enabled"
              >
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Period</label
                >
                <select
                  v-model="editingService.appointmentLimit.period"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] transition-all"
                >
                  <option value="perDay">perDay</option>
                  <option value="perWeek">perWeek</option>
                  <option value="perMonth">perMonth</option>
                </select>
              </div>
              <!-- limitDuration -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Limit Duration</label
                >
                <input
                  v-model="editingService.appointmentLimit.limitDuration"
                  type="text"
                  placeholder="1h"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>

              <!-- Min Time Before Booking -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Min Time Before Booking</label
                >
                <input
                  v-model="editingService.minTimeBeforeBooking"
                  type="text"
                  placeholder="1h"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>

              <!-- Min Time Before Canceling -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Min Time Before Canceling</label
                >
                <input
                  v-model="editingService.minTimeBeforeCanceling"
                  type="text"
                  placeholder="2h"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>
            </template>
          </template>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            @click="showEditModal = false"
            class="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="updateService"
            :disabled="
              !editingService.title?.trim() || !editingService.categoryID
            "
            class="px-5 py-2.5 bg-[#1a3a35] text-white rounded-xl text-sm font-medium hover:bg-[#2a4a45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import Nav from "../Dashboard/UI/SecondNav.vue";
  import apiService, {
    GetServices,
    GetServiceById,
    CreateService,
    UpdateService,
    DeleteService,
    GetCategories,
    GetResources,
  } from "@/services/apiService.js";

  const searchQuery = ref("");
  const selectedCategory = ref("");
  const showModal = ref(false);
  const createActiveTab = ref("general");
  const isLoading = ref(false);
  const errorMessage = ref("");

  // Services data from API
  const services = ref([]);

  // Pagination
  const currentPage = ref(1);
  const itemsPerPage = ref(10);

  // Fetch services from API
  async function fetchServices() {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response = await GetServices();
      if (response.isSuccess) {
        services.value = response.value || [];
      } else {
        errorMessage.value = response.userMessage || "Failed to load services.";
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      errorMessage.value = "An error occurred while loading services.";
    } finally {
      isLoading.value = false;
    }
  }

  const filteredServices = computed(() => {
    let result = services.value;

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (s) =>
          s.title?.toLowerCase().includes(query) ||
          s.categoryID?.categoryName?.toLowerCase().includes(query) ||
          s.tag?.toLowerCase().includes(query) ||
          s.description?.toLowerCase().includes(query),
      );
    }

    if (selectedCategory.value) {
      result = result.filter(
        (s) => s.categoryID?.categoryName === selectedCategory.value,
      );
    }

    return result;
  });

  const totalPages = computed(
    () => Math.ceil(filteredServices.value.length / itemsPerPage.value) || 1,
  );

  const paginatedServices = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredServices.value.slice(start, end);
  });

  const pageNumbers = computed(() => {
    const pages = [];
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
    return pages;
  });

  // Reset to page 1 when filters change
  function resetPage() {
    currentPage.value = 1;
  }

  watch(searchQuery, resetPage);
  watch(selectedCategory, resetPage);

  function formatDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Delete Service
  const isDeleting = ref("");

  async function deleteService(id) {
    if (!confirm("Are you sure you want to delete this service?")) return;

    isDeleting.value = id;
    try {
      const response = await DeleteService(id);
      if (response.isSuccess) {
        await fetchServices();
      } else {
        alert(response.userMessage || "Failed to delete service.");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("An error occurred while deleting the service.");
    } finally {
      isDeleting.value = "";
    }
  }

  // Edit Service (placeholder - opens modal with data)
  const showEditModal = ref(false);
  const isLoadingEdit = ref(false);
  const editingServiceId = ref("");
  const editingService = ref({});
  const editActiveTab = ref("general");

  // Edit Service resource multi-select state
  const editSelectedResourceIds = ref([]);
  const editShowResourceDropdown = ref(false);
  const editSelectAllResources = ref(false);

  function toggleEditAllResources() {
    if (editSelectAllResources.value) {
      editSelectedResourceIds.value = apiResources.value.map((r) => r._id);
    } else {
      editSelectedResourceIds.value = [];
    }
  }

  function removeEditResource(id) {
    editSelectedResourceIds.value = editSelectedResourceIds.value.filter(
      (r) => r !== id,
    );
    editSelectAllResources.value =
      editSelectedResourceIds.value.length === apiResources.value.length;
  }

  async function openEditModal(id) {
    editingServiceId.value = id;
    showEditModal.value = true;
    isLoadingEdit.value = true;
    try {
      if (categories.value.length === 0) await fetchCategories();
      if (apiResources.value.length === 0) await fetchApiResources();

      const response = await GetServiceById(id);
      if (response.isSuccess) {
        const data = response.value;
        editingService.value = {
          ...data,
          categoryID: data.categoryID?._id || data.categoryID,
          appointmentLimit: data.appointmentLimit || {
            enabled: false,
            limit: null,
            period: null,
          },
          minTimeBeforeBooking: data.minTimeBeforeBooking || null,
          minTimeBeforeCanceling: data.minTimeBeforeCanceling || null,
          limitDuration: data.limitDuration || "",
        };
        editSelectedResourceIds.value = (data.resourceIDs || []).map((r) =>
          typeof r === "object" ? r._id : r,
        );
        editSelectAllResources.value =
          editSelectedResourceIds.value.length === apiResources.value.length &&
          apiResources.value.length > 0;
      } else {
        alert(response.userMessage || "Failed to load service.");
        showEditModal.value = false;
      }
    } catch (error) {
      console.error("Error fetching service:", error);
      alert("An error occurred while loading the service.");
      showEditModal.value = false;
    } finally {
      isLoadingEdit.value = false;
    }
  }

  async function updateService() {
    if (!editingService.value.title?.trim() || !editingService.value.categoryID)
      return;
    try {
      const payload = {
        title: editingService.value.title.trim(),
        categoryID: editingService.value.categoryID,
        tag: editingService.value.tag || "All",
        resourceIDs: editSelectedResourceIds.value,
        price: parseFloat(editingService.value.price) || 0,
        isVisible: editingService.value.isVisible,
        description: editingService.value.description.trim(),
        duration: "30m",
        appointmentLimit: editingService.value.appointmentLimit,
        minTimeBeforeBooking: editingService.value.minTimeBeforeBooking,
        minTimeBeforeCanceling: editingService.value.minTimeBeforeCanceling,
        limitDuration:
          typeof editingService.value.limitDuration === "string"
            ? editingService.value.limitDuration.trim()
            : editingService.value.limitDuration,
      };
      const response = await UpdateService(editingServiceId.value, payload);
      if (response.isSuccess) {
        showEditModal.value = false;
        await fetchServices();
      } else {
        alert(response.userMessage || "Failed to update service.");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      alert("An error occurred while updating the service.");
    }
  }

  // Categories from API
  const categories = ref([]);
  const isLoadingCategories = ref(false);

  async function fetchCategories() {
    isLoadingCategories.value = true;
    try {
      const response = await GetCategories();
      if (response.isSuccess) {
        categories.value = response.value || [];
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      isLoadingCategories.value = false;
    }
  }

  // Resources from API
  const apiResources = ref([]);
  const isLoadingResources = ref(false);

  async function fetchApiResources() {
    isLoadingResources.value = true;
    try {
      const response = await GetResources();
      if (response.isSuccess) {
        apiResources.value = response.value || [];
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      isLoadingResources.value = false;
    }
  }

  function getResourceTitle(id) {
    const res = apiResources.value.find((r) => r._id === id);
    return res ? res.title : id;
  }

  // New service form
  const newService = ref({
    title: "",
    categoryID: "",
    tag: "All",
    price: "",
    isVisible: true,
    description: "",
    appointmentLimit: {
      enabled: false,
      limit: null,
      period: null,
      minTimeBeforeBooking: null,
      minTimeBeforeCanceling: null,
      limitDuration: "",
    },
  });

  // Resource multi-select
  const showResourceDropdown = ref(false);
  const selectedResourceIds = ref([]);
  const selectAllResources = ref(false);

  function toggleAllResources() {
    if (selectAllResources.value) {
      selectedResourceIds.value = apiResources.value.map((r) => r._id);
    } else {
      selectedResourceIds.value = [];
    }
  }

  function removeResource(id) {
    selectedResourceIds.value = selectedResourceIds.value.filter(
      (r) => r !== id,
    );
    selectAllResources.value =
      selectedResourceIds.value.length === apiResources.value.length;
  }

  const isCreating = ref(false);

  async function createService() {
    if (!newService.value.title.trim() || !newService.value.categoryID) return;

    isCreating.value = true;
    try {
      const appointmentLimit = {
        ...(newService.value.appointmentLimit || {}),
      };
      if (typeof appointmentLimit.limitDuration === "string") {
        appointmentLimit.limitDuration = appointmentLimit.limitDuration.trim();
      }

      const payload = {
        title: newService.value.title.trim(),
        categoryID: newService.value.categoryID,
        tag: newService.value.tag || "All",
        resourceIDs: selectedResourceIds.value,
        price: parseFloat(newService.value.price) || 0,
        isVisible: newService.value.isVisible,
        description: newService.value.description.trim(),
        duration: "30m",
        appointmentLimit,
      };

      const response = await CreateService(payload);

      if (response.isSuccess) {
        showModal.value = false;
        await fetchServices();

        // Reset form
        newService.value = {
          title: "",
          categoryID: "",
          tag: "All",
          price: "",
          isVisible: true,
          description: "",
          appointmentLimit: {
            enabled: false,
            limit: null,
            period: null,
            limitDuration: "",
            minTimeBeforeBooking: null,
            minTimeBeforeCanceling: null,
          },
        };
        selectedResourceIds.value = [];
        selectAllResources.value = false;
      } else {
        alert(response.userMessage || "Failed to create service.");
      }
    } catch (error) {
      console.error("Error creating service:", error);
      alert("An error occurred while creating the service.");
    } finally {
      isCreating.value = false;
    }
  }

  onMounted(() => {
    fetchServices();
    fetchCategories();
    fetchApiResources();
  });
</script>
