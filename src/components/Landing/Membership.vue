<template>
  <div class="min-h-screen bg-[#faf9f7] py-8 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl sm:text-4xl font-bold text-[#1a3a35] mb-3">
          Choose Your Membership
        </h1>
        <p class="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
          Select the plan that fits you best. You can only purchase one
          membership at a time.
        </p>
      </div>

      <!-- Not Logged In -->
      <div
        v-if="!currentUser"
        class="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-8 mb-8 text-center shadow-2xl shadow-black/20 relative overflow-hidden"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
        <div class="relative z-10">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-600/10 border border-emerald-500/20 flex items-center justify-center">
            <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h3 class="text-white font-bold text-lg mb-2">
            Members Only
          </h3>
          <p class="text-white/60 text-sm mb-6 max-w-md mx-auto">
            Log in to your account to view and purchase exclusive membership plans.
          </p>
          <router-link
            to="/member/login"
            class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:from-emerald-400 hover:to-green-500 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
            Log In to Continue
          </router-link>
        </div>
      </div>

      <!-- Loading -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center py-20"
      >
        <div
          class="w-10 h-10 border-4 border-[#1a3a35] border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-gray-500 text-sm">Loading memberships...</p>
      </div>

      <!-- Empty -->
      <div
        v-else-if="memberships.length === 0"
        class="text-center py-20"
      >
        <div
          class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            ></path>
          </svg>
        </div>
        <p class="text-gray-500 text-sm">
          No memberships available at the moment.
        </p>
      </div>

      <!-- Membership Grid -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="m in memberships"
          :key="m._id"
          @click="selectMembership(m._id)"
          class="relative bg-white rounded-2xl border-2 p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:shadow-xl flex flex-col"
          :class="
            selectedId === m._id
              ? 'border-[#1a3a35] shadow-lg ring-2 ring-[#1a3a35]/10'
              : 'border-transparent shadow-md hover:border-[#1a3a35]/30'
          "
        >
          <!-- Selected Badge -->
          <div
            v-if="selectedId === m._id"
            class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a3a35] text-white text-xs font-semibold px-4 py-1 rounded-full"
          >
            Selected
          </div>

          <!-- Content -->
          <div class="flex-1">
            <!-- Name -->
            <h3 class="text-lg sm:text-xl font-bold text-[#1a3a35] mb-3 mt-2">
              {{ m.name }}
            </h3>

            <!-- Description -->
            <p class="text-gray-500 text-sm leading-relaxed mb-6">
              {{ m.description }}
            </p>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-3xl sm:text-4xl font-bold text-[#1a3a35]">
              A${{ m.price }}
            </span>
            <span class="text-gray-400 text-sm">
              / {{ m.durationDays }} days
            </span>
          </div>

          <!-- Select Button -->
          <button
            @click.stop="selectMembership(m._id)"
            class="w-full py-3 rounded-xl font-semibold text-sm transition-colors mt-auto"
            :class="
              selectedId === m._id
                ? 'bg-[#1a3a35] text-white'
                : 'bg-gray-100 text-[#1a3a35] hover:bg-[#1a3a35] hover:text-white'
            "
          >
            {{ selectedId === m._id ? "Selected" : "Select" }}
          </button>
        </div>
      </div>

      <!-- Bottom Action -->
      <div
        v-if="selectedId && !isLoading"
        class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 sm:p-6 z-50"
      >
        <div
          class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div class="text-center sm:text-left">
            <p class="text-sm text-gray-500">Selected plan</p>
            <p class="text-lg font-bold text-[#1a3a35]">
              {{ selectedMembership?.name }} — A${{ selectedMembership?.price }}
            </p>
          </div>
          <button
            @click="proceedToPayment"
            class="w-full sm:w-auto bg-[#1a3a35] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2a4a45] transition-colors text-sm"
          >
            Continue to Payment
          </button>
        </div>
      </div>

      <!-- Spacer for fixed bottom bar -->
      <div
        v-if="selectedId"
        class="h-24"
      ></div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { GetMembershipsPublic } from "@/services/apiService.js";

  const router = useRouter();
  const memberships = ref([]);
  const isLoading = ref(true);
  const selectedId = ref(null);

  const selectedMembership = computed(() => {
    return memberships.value.find((m) => m._id === selectedId.value) || null;
  });

  const currentUser = computed(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  async function fetchMemberships() {
    isLoading.value = true;
    try {
      const response = await GetMembershipsPublic();
      if (response.isSuccess) {
        memberships.value = response.value || [];
      }
    } catch (error) {
      console.error("Error fetching memberships:", error);
    } finally {
      isLoading.value = false;
    }
  }

  function selectMembership(id) {
    selectedId.value = id;
  }

  function proceedToPayment() {
    if (!selectedId.value) return;
    const user = currentUser.value;
    if (!user || !user.id) {
      alert("Please log in to purchase a membership.");
      router.push("/member/login");
      return;
    }
    router.push(
      `/member/payment?membership=${selectedId.value}&userId=${user.id}`,
    );
  }

  onMounted(() => {
    fetchMemberships();
  });
</script>
