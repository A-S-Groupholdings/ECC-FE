<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <div class="pr-0 md:pr-6 mt-5">
      <!-- Header with Create Category Button -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
      >
        <h1 class="md:text-2xl sm:text-lg font-bold text-primary">
          Categories
        </h1>
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
          Create Category
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
            placeholder="Quick search categories..."
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

      <!-- Categories Table -->
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
                    Category ID
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
                    Category Name
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
                    Created Date
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
                    Updated Date
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
                      >Loading categories...</span
                    >
                  </div>
                </td>
              </tr>
              <tr
                v-for="category in filteredCategories"
                :key="category._id"
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
                    category.categoryID
                  }}</span>
                </td> -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#1a3a35] to-green-600 text-white"
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
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        ></path>
                      </svg>
                    </div>
                    <span
                      class="text-sm font-semibold text-gray-900 capitalize"
                      >{{ category.categoryName }}</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ formatDate(category.createDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ formatDate(category.updateDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center justify-center">
                    <button
                      @click="toggleCategory(category)"
                      class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                      :class="
                        category.isActive
                          ? 'bg-green-500 focus:ring-green-500'
                          : 'bg-gray-300 focus:ring-gray-300'
                      "
                    >
                      <span
                        class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                        :class="
                          category.isActive ? 'translate-x-6' : 'translate-x-1'
                        "
                      ></span>
                    </button>
                    <span
                      class="ml-2 text-xs font-semibold w-12"
                      :class="
                        category.isActive ? 'text-green-600' : 'text-gray-500'
                      "
                    >
                      {{ category.isActive ? "ON" : "OFF" }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      @click="openEditModal(category._id)"
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
                      @click="deleteCategory(category._id)"
                      :disabled="isDeleting === category._id"
                      class="flex items-center gap-1 bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-lg text-sm hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      <svg
                        v-if="isDeleting !== category._id"
                        class="w-4 h-4"
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
                      Delete
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
          Showing {{ filteredCategories.length }} of
          {{ categories.length }} categories
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

    <!-- Create Category Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showCreateModal = false"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 class="text-lg font-bold text-gray-900">Create Category</h2>
          <button
            @click="showCreateModal = false"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="px-6 py-5 space-y-5">
          <!-- Category Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Category Name</label>
            <input
              v-model="newCategory.categoryName"
              type="text"
              placeholder="e.g. Coach"
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent"
            />
          </div>

          <!-- Active Toggle -->
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-gray-700">Active Status</label>
            <button
              @click="newCategory.isActive = !newCategory.isActive"
              class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
              :class="newCategory.isActive ? 'bg-[#1a3a35]' : 'bg-gray-300'"
            >
              <span
                class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                :class="newCategory.isActive ? 'translate-x-6' : 'translate-x-1'"
              ></span>
            </button>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            @click="showCreateModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="createCategory"
            :disabled="isCreating || !newCategory.categoryName.trim()"
            class="px-5 py-2 bg-[#1a3a35] text-white rounded-lg text-sm font-medium hover:bg-[#2a4a45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg v-if="isCreating" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isCreating ? 'Creating...' : 'Create Category' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Category Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showEditModal = false"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 class="text-lg font-bold text-gray-900">Edit Category</h2>
          <button
            @click="showEditModal = false"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="px-6 py-5 space-y-5">
          <!-- Loading State -->
          <div v-if="isLoadingEdit" class="py-8 text-center">
            <svg class="w-6 h-6 text-[#1a3a35] animate-spin mx-auto mb-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-sm text-gray-500">Loading category...</span>
          </div>

          <template v-else>
            <!-- Category Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Category Name</label>
              <input
                v-model="editingCategory.categoryName"
                type="text"
                placeholder="e.g. Coach"
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent"
              />
            </div>

            <!-- Active Toggle -->
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-gray-700">Active Status</label>
              <button
                @click="editingCategory.isActive = !editingCategory.isActive"
                class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
                :class="editingCategory.isActive ? 'bg-[#1a3a35]' : 'bg-gray-300'"
              >
                <span
                  class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                  :class="editingCategory.isActive ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>
          </template>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            @click="showEditModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="updateCategory"
            :disabled="isUpdating || !editingCategory.categoryName?.trim()"
            class="px-5 py-2 bg-[#1a3a35] text-white rounded-lg text-sm font-medium hover:bg-[#2a4a45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg v-if="isUpdating" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isUpdating ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import Nav from "../Dashboard/UI/SecondNav.vue";
  import apiService from "@/services/apiService.js";

  const searchQuery = ref("");
  const categories = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref("");

  // Fetch categories from API
  async function fetchCategories() {
    isLoading.value = true;
    errorMessage.value = "";

    try {
      const response = await apiService.get("/categories");

      if (response.data.isSuccess) {
        categories.value = response.data.value || [];
      } else {
        errorMessage.value =
          response.data.userMessage || "Failed to load categories.";
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      errorMessage.value =
        "An error occurred while loading categories. Please try again.";
    } finally {
      isLoading.value = false;
    }
  }

  const filteredCategories = computed(() => {
    if (!searchQuery.value) return categories.value;
    const query = searchQuery.value.toLowerCase();
    return categories.value.filter(
      (c) =>
        c.categoryName?.toLowerCase().includes(query) ||
        c.categoryID?.toLowerCase().includes(query),
    );
  });

  function toggleCategory(category) {
    category.isActive = !category.isActive;
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

  // Create Category Modal State
  const showCreateModal = ref(false);
  const isCreating = ref(false);
  const newCategory = ref({
    categoryName: "",
    isActive: true,
  });

  async function createCategory() {
    if (!newCategory.value.categoryName.trim()) return;

    isCreating.value = true;
    try {
      const response = await apiService.post("/categories", newCategory.value);

      if (response.data.isSuccess) {
        showCreateModal.value = false;
        await fetchCategories();

        // Reset form
        newCategory.value = {
          categoryName: "",
          isActive: true,
        };
      } else {
        alert(response.data.userMessage || "Failed to create category.");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert("An error occurred while creating the category.");
    } finally {
      isCreating.value = false;
    }
  }

  // Edit Category
  const showEditModal = ref(false);
  const isLoadingEdit = ref(false);
  const isUpdating = ref(false);
  const editingCategoryId = ref("");
  const editingCategory = ref({
    categoryName: "",
    isActive: true,
  });

  async function openEditModal(id) {
    editingCategoryId.value = id;
    showEditModal.value = true;
    isLoadingEdit.value = true;

    try {
      const response = await apiService.get(`/categories/${id}`);

      if (response.data.isSuccess) {
        const data = response.data.value;
        editingCategory.value = {
          categoryName: data.categoryName || "",
          isActive: data.isActive ?? true,
        };
      } else {
        alert(response.data.userMessage || "Failed to load category.");
        showEditModal.value = false;
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      alert("An error occurred while loading the category.");
      showEditModal.value = false;
    } finally {
      isLoadingEdit.value = false;
    }
  }

  async function updateCategory() {
    if (!editingCategory.value.categoryName.trim()) return;

    isUpdating.value = true;
    try {
      const response = await apiService.put(
        `/categories/${editingCategoryId.value}`,
        editingCategory.value,
      );

      if (response.data.isSuccess) {
        showEditModal.value = false;
        await fetchCategories();
      } else {
        alert(response.data.userMessage || "Failed to update category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("An error occurred while updating the category.");
    } finally {
      isUpdating.value = false;
    }
  }

  // Delete Category
  const isDeleting = ref("");

  async function deleteCategory(id) {
    if (!confirm("Are you sure you want to delete this category?")) return;

    isDeleting.value = id;
    try {
      const response = await apiService.delete(`/categories/${id}`);

      if (response.data.isSuccess) {
        await fetchCategories();
      } else {
        alert(response.data.userMessage || "Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("An error occurred while deleting the category.");
    } finally {
      isDeleting.value = "";
    }
  }

  onMounted(() => {
    fetchCategories();
  });
</script>
