<template>
  <div class="min-h-screen bg-[#faf9f7] py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          ECC Member Registration
        </h1>
        <p class="text-gray-600 text-sm md:text-base">
          Fill the form below to create an account.
        </p>
      </div>

      <!-- Form Card -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12"
      >
        <form
          @submit.prevent="submitForm"
          class="space-y-8"
        >
          <!-- Username, Email & Phone Row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Username -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Username <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.username"
                type="text"
                placeholder="Enter username"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
              />
            </div>

            <!-- User Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                User Email <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                placeholder="Enter email address"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
              />
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span class="text-red-500">*</span>
              </label>
              <div class="flex">
                <select
                  class="bg-white border border-r-0 border-gray-200 rounded-l-lg px-3 py-3 text-gray-700 text-sm focus:outline-none"
                >
                  <option>🇱🇰 +94</option>
                  <option>🇦🇺 +61</option>
                  <option>🇬🇧 +44</option>
                  <option>🇺🇸 +1</option>
                </select>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="071 234 5678"
                  class="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-r-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          <!-- Password Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- User Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                User Password <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter password"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    v-if="showPassword"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm password"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    v-if="showConfirmPassword"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Membership Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-4">
              Membership Field <span class="text-red-500">*</span>
            </label>
            <div class="space-y-3">
              <label
                v-for="membership in memberships"
                :key="membership.id"
                class="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer transition-all hover:border-[#1a3a35] hover:bg-gray-50"
                :class="
                  form.selectedMembership === membership.id
                    ? 'border-[#1a3a35] bg-green-50'
                    : ''
                "
              >
                <div class="flex items-center gap-3">
                  <input
                    v-model="form.selectedMembership"
                    type="radio"
                    :value="membership.id"
                    class="w-4 h-4 text-[#1a3a35] focus:ring-[#1a3a35]"
                  />
                  <span class="text-sm text-gray-700">{{
                    membership.name
                  }}</span>
                </div>
                <span class="text-sm font-semibold text-gray-900">{{
                  membership.price
                }}</span>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              class="bg-[#1a3a35] text-white px-8 py-4 rounded-lg font-semibold tracking-wide hover:bg-[#2a4a45] transition-colors shadow-lg"
            >
              SUBMIT MEMBERSHIP
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const showPassword = ref(false);
  const showConfirmPassword = ref(false);

  const form = ref({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    selectedMembership: null,
  });

  const memberships = ref([
    {
      id: 1,
      name: "ECC Membership Weekly Subscription (Cricket Only)",
      price: "$85.00 every Week",
    },
    {
      id: 2,
      name: "ECC Membership Weekly Subscription (Cricket + Gym)",
      price: "$100.00 every Week",
    },
    {
      id: 3,
      name: "ECC Membership Monthly Subscription (Cricket Only)",
      price: "$340.00 every Month",
    },
    {
      id: 4,
      name: "ECC Membership Monthly Subscription (Cricket + Gym)",
      price: "$390.00 every Month",
    },
  ]);

  function submitForm() {
    console.log("Form submitted:", form.value);
    // Handle form submission
  }
</script>
