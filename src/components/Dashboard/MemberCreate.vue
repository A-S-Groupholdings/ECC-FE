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

          <!-- Billing Period (show if subscription) -->
          <div
            v-if="form.type === 'subscription'"
            class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
          >
            <label class="text-sm font-semibold text-gray-700 md:text-right">
              Billing Period :
            </label>
            <div class="md:col-span-3">
              <select
                v-model="form.billingPeriod"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] transition-all"
              >
                <option value="yearly">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
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
          class="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3"
        >
          <button
            @click="$router.back()"
            class="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="createMembership"
            class="px-6 py-3 bg-gradient-to-r from-[#1a3a35] to-green-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            Create Membership
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import Nav from "../Dashboard/UI/SecondNav.vue";

  const router = useRouter();

  const form = ref({
    name: "",
    description: "",
    type: "free",
    price: "",
    billingPeriod: "monthly",
    active: true,
  });

  function createMembership() {
    // Handle form submission
    console.log("Creating membership:", form.value);
    // Navigate back or show success
    router.back();
  }
</script>
