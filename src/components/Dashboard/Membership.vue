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

      <!-- Memberships Table -->
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
                  <div class="flex items-center gap-1">
                    Name
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
                    Price
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
                    Plan
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
                  <div class="flex items-center justify-center gap-1">
                    Members
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
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="membership in filteredMemberships"
                :key="membership.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4">
                  <span class="text-sm font-semibold text-gray-900">{{
                    membership.name
                  }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    membership.price
                  }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{
                    membership.plan
                  }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center justify-center">
                    <button
                      @click="toggleMembership(membership)"
                      class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                      :class="
                        membership.active
                          ? 'bg-green-500 focus:ring-green-500'
                          : 'bg-gray-300 focus:ring-gray-300'
                      "
                    >
                      <span
                        class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-out"
                        :class="
                          membership.active ? 'translate-x-6' : 'translate-x-1'
                        "
                      ></span>
                    </button>
                    <span
                      class="ml-2 text-xs font-semibold w-12"
                      :class="
                        membership.active ? 'text-green-600' : 'text-gray-500'
                      "
                    >
                      {{ membership.active ? "ON" : "OFF" }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span class="text-sm font-semibold text-gray-900">{{
                    membership.members
                  }}</span>
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
  </main>
</template>

<script setup>
  import { ref, computed } from "vue";
  import Nav from "../Dashboard/UI/SecondNav.vue";

  const searchQuery = ref("");

  const memberships = ref([
    {
      id: 1,
      name: "Default Membership",
      price: "Free",
      plan: "Free",
      active: false,
      members: 3,
    },
    {
      id: 2,
      name: "ECC Membership Weekly Subscription (Cricket Only)",
      price: "$85.00 every Week",
      plan: "Subscription",
      active: true,
      members: 3,
    },
    {
      id: 3,
      name: "ECC Membership Weekly Subscription (Cricket + Gym)",
      price: "$100.00 every Week",
      plan: "Subscription",
      active: true,
      members: 0,
    },
    {
      id: 4,
      name: "ECC Membership Monthly Subscription (Cricket Only)",
      price: "$340.00 every Month",
      plan: "Subscription",
      active: true,
      members: 1,
    },
    {
      id: 5,
      name: "ECC Membership Monthly Subscription (Cricket + Gym)",
      price: "$390.00 every Month",
      plan: "Subscription",
      active: true,
      members: 0,
    },
  ]);

  const filteredMemberships = computed(() => {
    if (!searchQuery.value) return memberships.value;
    const query = searchQuery.value.toLowerCase();
    return memberships.value.filter((m) =>
      m.name.toLowerCase().includes(query),
    );
  });

  function toggleMembership(membership) {
    membership.active = !membership.active;
  }
</script>
