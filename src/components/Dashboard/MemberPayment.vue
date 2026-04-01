<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <div class="pr-0 md:pr-6 mt-5">
      <!-- Header with Search -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 class="md:text-2xl sm:text-lg font-bold text-primary">Member Payments</h1>

        <!-- Search Bar -->
        <div class="relative w-full lg:w-96">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search member payments..."
            class="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent shadow-sm"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg class="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Member Payments Table -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  <div class="flex items-center gap-1">
                    Subscription ID
                    <svg class="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path d="M5 10l5 5 5-5H5z" opacity="0.4"></path>
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  <div class="flex items-center gap-1">
                    Member
                    <svg class="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path d="M5 10l5 5 5-5H5z" opacity="0.4"></path>
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  <div class="flex items-center gap-1">
                    Membership
                    <svg class="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path d="M5 10l5 5 5-5H5z" opacity="0.4"></path>
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                  <div class="flex items-center justify-end gap-1">
                    Amount
                    <svg class="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path d="M5 10l5 5 5-5H5z" opacity="0.4"></path>
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  <div class="flex items-center gap-1">
                    Last Payment
                    <svg class="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path d="M5 10l5 5 5-5H5z" opacity="0.4"></path>
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  <div class="flex items-center gap-1">
                    Type
                    <svg class="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path d="M5 10l5 5 5-5H5z" opacity="0.4"></path>
                    </svg>
                  </div>
                </th>
                <th class="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                  <div class="flex items-center justify-center gap-1">
                    Status
                    <svg class="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 10l5-5 5 5H5z"></path>
                      <path d="M5 10l5 5 5-5H5z" opacity="0.4"></path>
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="payment in filteredPayments"
                :key="payment.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- Subscription ID -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-semibold text-gray-900">#{{ payment.id }}</span>
                </td>
                <!-- Member -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{ payment.member }}</span>
                </td>
                <!-- Membership -->
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-700">{{ payment.membership }}</span>
                </td>
                <!-- Amount -->
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <span class="text-sm font-semibold text-gray-900">{{ payment.amount }}</span>
                </td>
                <!-- Last Payment -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-600">{{ payment.lastPayment }}</span>
                </td>
                <!-- Type -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-700">{{ payment.type }}</span>
                </td>
                <!-- Status -->
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                      payment.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : payment.status === 'Cancelled'
                          ? 'bg-red-100 text-red-700'
                          : payment.status === 'Expired'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-yellow-100 text-yellow-700'
                    ]"
                  >
                    {{ payment.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-6">
        <p class="text-sm text-gray-500">
          Showing {{ filteredPayments.length }} of {{ payments.length }} payments
        </p>
        <div class="flex gap-2">
          <button class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import Nav from "../Dashboard/UI/SecondNav.vue"

const searchQuery = ref('')

const payments = ref([
  {
    id: 28,
    member: 'Sanchitkrish@gmail.com',
    membership: 'ECC Membership Weekly Subscription (Cricket Only)',
    amount: '$85.00',
    lastPayment: 'March 24, 2026',
    type: 'Stripe',
    status: 'Active'
  },
  {
    id: 27,
    member: 'DeepXsingh13',
    membership: 'ECC Membership Weekly Subscription (Cricket Only)',
    amount: '$85.00',
    lastPayment: 'March 24, 2026',
    type: 'PayPal',
    status: 'Active'
  },
  {
    id: 26,
    member: 'Chana',
    membership: 'Default Membership',
    amount: 'Free',
    lastPayment: 'March 23, 2026',
    type: 'Free',
    status: 'Active'
  },
  {
    id: 22,
    member: 'jdsukh.matr@gmail.com',
    membership: 'ECC Membership Monthly Subscription (Cricket Only)',
    amount: '$340.00',
    lastPayment: 'March 10, 2026',
    type: 'Stripe',
    status: 'Active'
  },
  {
    id: 18,
    member: 'geetikasharma',
    membership: 'ECC Membership Weekly Subscription (Cricket + Gym)',
    amount: '$100.00',
    lastPayment: 'March 21, 2026',
    type: 'Stripe',
    status: 'Cancelled'
  },
  {
    id: 3,
    member: 'Yohan',
    membership: 'Default Membership',
    amount: 'Free',
    lastPayment: 'December 23, 2025',
    type: 'Free',
    status: 'Expired'
  }
])

const filteredPayments = computed(() => {
  if (!searchQuery.value) return payments.value
  const query = searchQuery.value.toLowerCase()
  return payments.value.filter(p =>
    p.member.toLowerCase().includes(query) ||
    p.membership.toLowerCase().includes(query) ||
    p.id.toString().includes(query)
  )
})
</script>
