<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <div class="pr-0 md:pr-6 mt-5">
      <!-- Header with Create Resource Button -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
      >
        <h1 class="md:text-2xl sm:text-lg font-bold text-primary">Resources</h1>
        <button
          @click="showCreateModal = true"
          class="flex items-center gap-2 bg-[#1a3a35] text-white px-4 py-2 rounded-lg hover:bg-[#2a4a45] transition-colors text-sm font-medium"
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
          Create Resource
        </button>
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
            placeholder="Quick search resources..."
            class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent shadow-sm"
          />
        </div>
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

      <!-- Resources Table -->
      <div
        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-10"
                >
                  <input
                    type="checkbox"
                    class="rounded border-gray-300"
                  />
                </th>
                <!-- <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Resource ID
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
                </th> -->
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Title
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
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Created At
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
                  class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  <div class="flex items-center gap-1">
                    Updated At
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
              <tr v-if="isLoading">
                <td
                  colspan="7"
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
                      >Loading resources...</span
                    >
                  </div>
                </td>
              </tr>
              <tr
                v-for="resource in filteredResources"
                :key="resource._id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    class="rounded border-gray-300"
                  />
                </td>
                <!-- <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-mono text-gray-600">{{
                    resource.resourceID
                  }}</span>
                </td> -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-semibold text-gray-900">{{
                    resource.title
                  }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ formatDate(resource.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ formatDate(resource.updatedAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center justify-center">
                    <button
                      @click="toggleResource(resource)"
                      class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                      :class="
                        resource.isActive
                          ? 'bg-green-500 focus:ring-green-500'
                          : 'bg-gray-300 focus:ring-gray-300'
                      "
                    >
                      <span
                        class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                        :class="
                          resource.isActive ? 'translate-x-6' : 'translate-x-1'
                        "
                      ></span>
                    </button>
                    <span
                      class="ml-2 text-xs font-semibold w-12"
                      :class="
                        resource.isActive ? 'text-green-600' : 'text-gray-500'
                      "
                    >
                      {{ resource.isActive ? "ON" : "OFF" }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      @click="openEditModal(resource._id)"
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
                      @click="deleteResource(resource._id)"
                      :disabled="isDeleting === resource._id"
                      class="text-gray-400 hover:text-red-500 transition-colors p-1 disabled:opacity-50"
                    >
                      <svg
                        v-if="isDeleting !== resource._id"
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
          Showing {{ filteredResources.length }} of
          {{ resources.length }} resources
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

    <!-- Create Resource Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showCreateModal = false"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-gray-100"
        >
          <h2 class="text-lg font-bold text-gray-900">Create Resource</h2>
          <button
            @click="showCreateModal = false"
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
        <div class="px-6 py-5 space-y-5">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5"
              >Resource Title</label
            >
            <input
              v-model="newResource.title"
              type="text"
              placeholder="e.g. Lane 1"
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent"
            />
          </div>

          <!-- Active Toggle -->
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-gray-700"
              >Active Status</label
            >
            <button
              @click="newResource.isActive = !newResource.isActive"
              class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
              :class="newResource.isActive ? 'bg-[#1a3a35]' : 'bg-gray-300'"
            >
              <span
                class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                :class="
                  newResource.isActive ? 'translate-x-6' : 'translate-x-1'
                "
              ></span>
            </button>
          </div>

          <!-- Schedule Section -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3"
              >Weekly Schedule</label
            >
            <div class="space-y-2.5">
              <div
                v-for="(day, dayName) in newResource.schedule"
                :key="dayName"
                class="flex items-center gap-3 p-3 rounded-xl border transition-all"
                :class="
                  day.enabled
                    ? 'bg-[#1a3a35]/5 border-[#1a3a35]/20'
                    : 'bg-gray-50 border-gray-100'
                "
              >
                <!-- Day Toggle -->
                <button
                  @click="day.enabled = !day.enabled"
                  class="relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-300 flex-shrink-0 focus:outline-none"
                  :class="day.enabled ? 'bg-[#1a3a35]' : 'bg-gray-300'"
                >
                  <span
                    class="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-out"
                    :class="day.enabled ? 'translate-x-5' : 'translate-x-1'"
                  ></span>
                </button>

                <!-- Day Name -->
                <span
                  class="text-sm font-medium capitalize w-24"
                  :class="day.enabled ? 'text-gray-900' : 'text-gray-400'"
                >
                  {{ dayName }}
                </span>

                <!-- Time Inputs -->
                <div
                  v-if="day.enabled"
                  class="flex items-center gap-2 flex-1"
                >
                  <input
                    v-model="day.start"
                    type="time"
                    class="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a35]/30"
                  />
                  <span class="text-gray-400 text-sm">-</span>
                  <input
                    v-model="day.end"
                    type="time"
                    class="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a35]/30"
                  />
                </div>
                <span
                  v-else
                  class="text-sm text-gray-400"
                  >Closed</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div
          class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100"
        >
          <button
            @click="showCreateModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="createResource"
            :disabled="isCreating || !newResource.title.trim()"
            class="px-5 py-2 bg-[#1a3a35] text-white rounded-lg text-sm font-medium hover:bg-[#2a4a45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
            {{ isCreating ? "Creating..." : "Create Resource" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Resource Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showEditModal = false"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-gray-100"
        >
          <h2 class="text-lg font-bold text-gray-900">Edit Resource</h2>
          <button
            @click="showEditModal = false"
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
        <div class="px-6 py-5 space-y-5">
          <!-- Loading State -->
          <div
            v-if="isLoadingEdit"
            class="py-8 text-center"
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
            <span class="text-sm text-gray-500">Loading resource...</span>
          </div>

          <template v-else>
            <!-- Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5"
                >Resource Title</label
              >
              <input
                v-model="editingResource.title"
                type="text"
                placeholder="e.g. Lane 1"
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent"
              />
            </div>

            <!-- Active Toggle -->
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-gray-700"
                >Active Status</label
              >
              <button
                @click="editingResource.isActive = !editingResource.isActive"
                class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
                :class="
                  editingResource.isActive ? 'bg-[#1a3a35]' : 'bg-gray-300'
                "
              >
                <span
                  class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                  :class="
                    editingResource.isActive ? 'translate-x-6' : 'translate-x-1'
                  "
                ></span>
              </button>
            </div>

            <!-- Schedule Section -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3"
                >Weekly Schedule</label
              >
              <div class="space-y-2.5">
                <div
                  v-for="(day, dayName) in editingResource.schedule"
                  :key="dayName"
                  class="flex items-center gap-3 p-3 rounded-xl border transition-all"
                  :class="
                    day.enabled
                      ? 'bg-[#1a3a35]/5 border-[#1a3a35]/20'
                      : 'bg-gray-50 border-gray-100'
                  "
                >
                  <!-- Day Toggle -->
                  <button
                    @click="day.enabled = !day.enabled"
                    class="relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-300 flex-shrink-0 focus:outline-none"
                    :class="day.enabled ? 'bg-[#1a3a35]' : 'bg-gray-300'"
                  >
                    <span
                      class="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-out"
                      :class="day.enabled ? 'translate-x-5' : 'translate-x-1'"
                    ></span>
                  </button>

                  <!-- Day Name -->
                  <span
                    class="text-sm font-medium capitalize w-24"
                    :class="day.enabled ? 'text-gray-900' : 'text-gray-400'"
                  >
                    {{ dayName }}
                  </span>

                  <!-- Time Inputs -->
                  <div
                    v-if="day.enabled"
                    class="flex items-center gap-2 flex-1"
                  >
                    <input
                      v-model="day.start"
                      type="time"
                      class="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a35]/30"
                    />
                    <span class="text-gray-400 text-sm">-</span>
                    <input
                      v-model="day.end"
                      type="time"
                      class="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a35]/30"
                    />
                  </div>
                  <span
                    v-else
                    class="text-sm text-gray-400"
                    >Closed</span
                  >
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Modal Footer -->
        <div
          class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100"
        >
          <button
            @click="showEditModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="updateResource"
            :disabled="isUpdating || !editingResource.title?.trim()"
            class="px-5 py-2 bg-[#1a3a35] text-white rounded-lg text-sm font-medium hover:bg-[#2a4a45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg
              v-if="isUpdating"
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
            {{ isUpdating ? "Saving..." : "Save Changes" }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import Nav from "../Dashboard/UI/SecondNav.vue";
  import apiService, { GetResources } from "@/services/apiService.js";

  const searchQuery = ref("");
  const resources = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref("");

  // Fetch resources from API
  async function fetchResources() {
    isLoading.value = true;
    errorMessage.value = "";

    try {
      const response = await GetResources();

      if (response.isSuccess) {
        resources.value = response.value || [];
      } else {
        errorMessage.value =
          response.userMessage || "Failed to load resources.";
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
      errorMessage.value =
        "An error occurred while loading resources. Please try again.";
    } finally {
      isLoading.value = false;
    }
  }

  const filteredResources = computed(() => {
    if (!searchQuery.value) return resources.value;
    const query = searchQuery.value.toLowerCase();
    return resources.value.filter(
      (r) =>
        r.title?.toLowerCase().includes(query) ||
        r.resourceID?.toLowerCase().includes(query),
    );
  });

  function toggleResource(resource) {
    resource.isActive = !resource.isActive;
  }

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

  // Create Resource Modal State
  const showCreateModal = ref(false);
  const isCreating = ref(false);
  const newResource = ref({
    title: "",
    isActive: true,
    schedule: {
      monday: { enabled: true, start: "09:00", end: "17:00" },
      tuesday: { enabled: true, start: "09:00", end: "17:00" },
      wednesday: { enabled: false },
      thursday: { enabled: true, start: "10:00", end: "18:00" },
      friday: { enabled: true, start: "09:00", end: "15:00" },
      saturday: { enabled: false },
      sunday: { enabled: false },
    },
  });

  async function createResource() {
    if (!newResource.value.title.trim()) return;

    isCreating.value = true;
    try {
      const response = await apiService.post("/resources", newResource.value);

      if (response.data.isSuccess) {
        // Close modal and refresh list
        showCreateModal.value = false;
        await fetchResources();

        // Reset form
        newResource.value = {
          title: "",
          isActive: true,
          schedule: {
            monday: { enabled: true, start: "09:00", end: "17:00" },
            tuesday: { enabled: true, start: "09:00", end: "17:00" },
            wednesday: { enabled: false },
            thursday: { enabled: true, start: "10:00", end: "18:00" },
            friday: { enabled: true, start: "09:00", end: "15:00" },
            saturday: { enabled: false },
            sunday: { enabled: false },
          },
        };
      } else {
        alert(response.data.userMessage || "Failed to create resource.");
      }
    } catch (error) {
      console.error("Error creating resource:", error);
      alert("An error occurred while creating the resource.");
    } finally {
      isCreating.value = false;
    }
  }

  // Edit Resource Modal State
  const showEditModal = ref(false);
  const isLoadingEdit = ref(false);
  const isUpdating = ref(false);
  const editingResourceId = ref("");
  const editingResource = ref({
    title: "",
    isActive: true,
    schedule: {
      monday: { enabled: true, start: "09:00", end: "17:00" },
      tuesday: { enabled: true, start: "09:00", end: "17:00" },
      wednesday: { enabled: false },
      thursday: { enabled: true, start: "10:00", end: "18:00" },
      friday: { enabled: true, start: "09:00", end: "15:00" },
      saturday: { enabled: false },
      sunday: { enabled: false },
    },
  });

  async function openEditModal(id) {
    editingResourceId.value = id;
    showEditModal.value = true;
    isLoadingEdit.value = true;

    try {
      const response = await apiService.get(`/resources/${id}`);

      if (response.data.isSuccess) {
        const data = response.data.value;
        editingResource.value = {
          title: data.title || "",
          isActive: data.isActive ?? true,
          schedule: normalizeSchedule(data.schedule),
        };
      } else {
        alert(response.data.userMessage || "Failed to load resource.");
        showEditModal.value = false;
      }
    } catch (error) {
      console.error("Error fetching resource:", error);
      alert("An error occurred while loading the resource.");
      showEditModal.value = false;
    } finally {
      isLoadingEdit.value = false;
    }
  }

  function normalizeSchedule(schedule) {
    if (!schedule) {
      return {
        monday: { enabled: false },
        tuesday: { enabled: false },
        wednesday: { enabled: false },
        thursday: { enabled: false },
        friday: { enabled: false },
        saturday: { enabled: false },
        sunday: { enabled: false },
      };
    }

    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    const normalized = {};

    for (const day of days) {
      const dayData = schedule[day];
      if (dayData && dayData.enabled) {
        normalized[day] = {
          enabled: true,
          start: dayData.start || "09:00",
          end: dayData.end || "17:00",
        };
      } else {
        normalized[day] = { enabled: false };
      }
    }

    return normalized;
  }

  async function updateResource() {
    if (!editingResource.value.title.trim()) return;

    isUpdating.value = true;
    try {
      const response = await apiService.put(
        `/resources/${editingResourceId.value}`,
        editingResource.value,
      );

      if (response.data.isSuccess) {
        showEditModal.value = false;
        await fetchResources();
      } else {
        alert(response.data.userMessage || "Failed to update resource.");
      }
    } catch (error) {
      console.error("Error updating resource:", error);
      alert("An error occurred while updating the resource.");
    } finally {
      isUpdating.value = false;
    }
  }

  // Delete Resource
  const isDeleting = ref("");

  async function deleteResource(id) {
    if (!confirm("Are you sure you want to delete this resource?")) return;

    isDeleting.value = id;
    try {
      const response = await apiService.delete(`/resources/${id}`);

      if (response.data.isSuccess) {
        await fetchResources();
      } else {
        alert(response.data.userMessage || "Failed to delete resource.");
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
      alert("An error occurred while deleting the resource.");
    } finally {
      isDeleting.value = "";
    }
  }

  onMounted(() => {
    fetchResources();
  });
</script>
