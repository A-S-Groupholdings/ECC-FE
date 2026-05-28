<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <div class="pr-0 md:pr-6 mt-5 max-w-4xl mx-auto">
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <h1 class="md:text-2xl sm:text-lg font-bold text-primary">
          Create Membership
        </h1>
        <button
          @click="$router.back()"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back
        </button>
      </div>

      <!-- Form Card -->
      <div
        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div class="p-8 space-y-8">
          <!-- Name Field -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label class="text-sm font-semibold text-gray-700 md:text-right">
              Name <span class="text-red-500">*</span> :
            </label>
            <div class="md:col-span-3">
              <input
                v-model="form.name"
                type="text"
                placeholder="Enter membership name..."
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Description Field -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <label
              class="text-sm font-semibold text-gray-700 md:text-right pt-3"
            >
              Description :
            </label>
            <div class="md:col-span-3">
              <!-- Toolbar -->
              <div
                class="flex flex-wrap items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-t-xl"
              >
                <button class="p-1.5 hover:bg-gray-200 rounded text-gray-600">
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
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    ></path>
                  </svg>
                </button>
                <button class="p-1.5 hover:bg-gray-200 rounded text-gray-600">
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
                      d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
                    ></path>
                  </svg>
                </button>
                <div class="w-px h-5 bg-gray-300 mx-1"></div>
                <select
                  class="bg-white border border-gray-200 rounded px-2 py-1 text-xs text-gray-600"
                >
                  <option>Paragraph</option>
                  <option>Heading 1</option>
                  <option>Heading 2</option>
                </select>
                <select
                  class="bg-white border border-gray-200 rounded px-2 py-1 text-xs text-gray-600"
                >
                  <option>Verdana</option>
                  <option>Arial</option>
                  <option>Times New Roman</option>
                </select>
                <select
                  class="bg-white border border-gray-200 rounded px-2 py-1 text-xs text-gray-600"
                >
                  <option>11pt</option>
                  <option>12pt</option>
                  <option>14pt</option>
                </select>
                <div class="w-px h-5 bg-gray-300 mx-1"></div>
                <button
                  class="p-1.5 hover:bg-gray-200 rounded text-gray-600 font-bold"
                >
                  B
                </button>
                <button
                  class="p-1.5 hover:bg-gray-200 rounded text-gray-600 italic"
                >
                  I
                </button>
                <button
                  class="p-1.5 hover:bg-gray-200 rounded text-gray-600 underline"
                >
                  U
                </button>
                <div class="w-px h-5 bg-gray-300 mx-1"></div>
                <button class="p-1.5 hover:bg-gray-200 rounded text-gray-600">
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
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
                <button class="p-1.5 hover:bg-gray-200 rounded text-gray-600">
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
                      d="M4 6h16M4 12h16M4 18h7"
                    ></path>
                  </svg>
                </button>
                <button class="p-1.5 hover:bg-gray-200 rounded text-gray-600">
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
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    ></path>
                  </svg>
                </button>
                <button class="p-1.5 hover:bg-gray-200 rounded text-gray-600">
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
                      d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
                    ></path>
                  </svg>
                </button>
              </div>
              <!-- Text Area -->
              <textarea
                v-model="form.description"
                rows="6"
                placeholder="Enter description..."
                class="w-full px-4 py-3 bg-white border border-t-0 border-gray-200 rounded-b-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Type Field -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label class="text-sm font-semibold text-gray-700 md:text-right">
              Type :
            </label>
            <div class="md:col-span-3">
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <label
                  class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all"
                  :class="
                    form.type === 'free'
                      ? 'border-[#1a3a35] bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  "
                >
                  <input
                    v-model="form.type"
                    type="radio"
                    value="free"
                    class="w-4 h-4 text-[#1a3a35] focus:ring-[#1a3a35]"
                  />
                  <span class="text-sm font-medium text-gray-700">Free</span>
                </label>
                <label
                  class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all"
                  :class="
                    form.type === 'onetime'
                      ? 'border-[#1a3a35] bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  "
                >
                  <input
                    v-model="form.type"
                    type="radio"
                    value="onetime"
                    class="w-4 h-4 text-[#1a3a35] focus:ring-[#1a3a35]"
                  />
                  <span class="text-sm font-medium text-gray-700"
                    >One-Time Payment</span
                  >
                </label>
                <label
                  class="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all"
                  :class="
                    form.type === 'subscription'
                      ? 'border-[#1a3a35] bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  "
                >
                  <input
                    v-model="form.type"
                    type="radio"
                    value="subscription"
                    class="w-4 h-4 text-[#1a3a35] focus:ring-[#1a3a35]"
                  />
                  <span class="text-sm font-medium text-gray-700"
                    >Subscription Based</span
                  >
                </label>
              </div>
            </div>
          </div>

          <!-- Price Field (show if not free) -->
          <div
            v-if="form.type !== 'free'"
            class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
          >
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
                  v-model="form.price"
                  type="number"
                  placeholder="0.00"
                  class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
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
                v-if="selectedServices.length > 0"
                class="flex flex-wrap gap-2 mb-2"
              >
                <span
                  v-for="service in selectedServices"
                  :key="service._id"
                  class="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800"
                >
                  {{ service.title }}
                  <button
                    @click="removeService(service._id)"
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
                v-if="showServiceDropdown && availableServices.length > 0"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
              >
                <div
                  v-for="service in availableServices"
                  :key="service._id"
                  @click="addService(service)"
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
                v-if="showServiceDropdown && availableServices.length === 0"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg"
              >
                <div class="px-4 py-3 text-sm text-gray-500">
                  No more services available
                </div>
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
                v-model="form.durationDays"
                type="number"
                placeholder="Enter duration in days"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Status Toggle -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <label class="text-sm font-semibold text-gray-700 md:text-right">
              Status :
            </label>
            <div class="md:col-span-3">
              <div class="flex items-center">
                <button
                  @click="form.active = !form.active"
                  type="button"
                  class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                  :class="
                    form.active
                      ? 'bg-green-500 focus:ring-green-500'
                      : 'bg-gray-300 focus:ring-gray-300'
                  "
                >
                  <span
                    class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                    :class="form.active ? 'translate-x-6' : 'translate-x-1'"
                  ></span>
                </button>
                <span
                  class="ml-3 text-sm font-semibold"
                  :class="form.active ? 'text-green-600' : 'text-gray-500'"
                >
                  {{ form.active ? "ON" : "OFF" }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="px-8 py-6 bg-gray-50 border-t border-gray-100 flex flex-col gap-4"
        >
          <div
            v-if="submitError"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
          >
            {{ submitError }}
          </div>
          <div class="flex justify-end gap-3">
            <button
              @click="$router.back()"
              class="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="createMembership"
              :disabled="isSubmitting"
              class="px-6 py-3 bg-gradient-to-r from-[#1a3a35] to-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting">Creating...</span>
              <span v-else>Create Membership</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { CreateMembership, GetServices } from "@/services/apiService.js";
  import Nav from "../Dashboard/UI/SecondNav.vue";

  const router = useRouter();

  const form = ref({
    name: "",
    description: "",
    type: "free",
    price: "",
    serviceIds: [],
    durationDays: 30,
    active: true,
  });

  const isSubmitting = ref(false);
  const submitError = ref("");

  // Service dropdown (multiple)
  const services = ref([]);
  const serviceSearchQuery = ref("");
  const showServiceDropdown = ref(false);
  const selectedServices = ref([]);

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

  onMounted(() => {
    fetchServices();
  });

  const availableServices = computed(() => {
    const selectedIds = selectedServices.value.map((s) => s._id);
    let list = services.value.filter((s) => !selectedIds.includes(s._id));
    if (serviceSearchQuery.value) {
      const query = serviceSearchQuery.value.toLowerCase();
      list = list.filter((s) => s.title?.toLowerCase().includes(query));
    }
    return list;
  });

  function addService(service) {
    selectedServices.value.push({ _id: service._id, title: service.title });
    form.value.serviceIds = selectedServices.value.map((s) => s._id);
    serviceSearchQuery.value = "";
    showServiceDropdown.value = false;
  }

  function removeService(id) {
    selectedServices.value = selectedServices.value.filter((s) => s._id !== id);
    form.value.serviceIds = selectedServices.value.map((s) => s._id);
  }

  async function createMembership() {
    submitError.value = "";
    isSubmitting.value = true;

    const typeMap = {
      free: "FREE",
      onetime: "ONE_TIME",
      subscription: "SUBSCRIPTION",
    };

    const payload = {
      name: form.value.name,
      description: form.value.description,
      type: typeMap[form.value.type] || "FREE",
      price: form.value.type === "free" ? 0 : Number(form.value.price) || 0,
      durationDays: Number(form.value.durationDays) || 30,
      isActive: form.value.active,
      serviceIds: form.value.serviceIds.length > 0 ? form.value.serviceIds : [],
    };

    try {
      const response = await CreateMembership(payload);
      if (response.isSuccess) {
        router.push("/dashboard/membership");
      } else {
        submitError.value =
          response.errorMessage ||
          response.userMessage ||
          "Failed to create membership.";
        isSubmitting.value = false;
      }
    } catch (error) {
      submitError.value = "Network error. Please try again.";
      isSubmitting.value = false;
    }
  }
</script>
