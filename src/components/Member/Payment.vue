<template>
  <div class="min-h-screen bg-[#faf9f7] py-8 px-4">
    <div class="max-w-lg mx-auto">
      <!-- Back Button -->
      <router-link
        to="/member/membership"
        class="inline-flex items-center gap-2 text-gray-500 hover:text-[#1a3a35] transition-colors mb-6"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to Memberships
      </router-link>

      <!-- Loading -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center py-20"
      >
        <div
          class="w-10 h-10 border-4 border-[#1a3a35] border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-gray-500 text-sm">Loading membership details...</p>
      </div>

      <!-- Error -->
      <div
        v-else-if="errorMessage"
        class="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
      >
        <p class="text-red-700 font-medium mb-4">{{ errorMessage }}</p>
        <router-link
          to="/member/membership"
          class="inline-block bg-[#1a3a35] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#2a4a45] transition-colors"
        >
          Back to Memberships
        </router-link>
      </div>

      <!-- Payment Content -->
      <template v-else-if="membership">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-2xl sm:text-3xl font-bold text-[#1a3a35] mb-2">
            Complete Your Purchase
          </h1>
          <p class="text-gray-500 text-sm">
            Choose your preferred payment method
          </p>
        </div>

        <!-- Membership Summary Card -->
        <div
          class="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6"
        >
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">
            Selected Plan
          </p>
          <h2 class="text-xl font-bold text-[#1a3a35] mb-1">
            {{ membership.name }}
          </h2>
          <p class="text-gray-500 text-sm mb-4">{{ membership.description }}</p>
          <div class="flex items-baseline gap-1 border-t border-gray-100 pt-4">
            <span class="text-3xl font-bold text-[#1a3a35]">
              A${{ membership.price }}
            </span>
            <span class="text-gray-400 text-sm">
              / {{ membership.durationDays }} days
            </span>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="space-y-4 mb-6">
          <p class="text-sm font-medium text-gray-700">Select Payment Method</p>

          <!-- Stripe Option -->
          <button
            @click="selectedMethod = 'stripe'"
            class="w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left"
            :class="
              selectedMethod === 'stripe'
                ? 'border-[#1a3a35] bg-[#1a3a35]/5'
                : 'border-gray-200 hover:border-gray-300'
            "
          >
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center"
              :class="
                selectedMethod === 'stripe'
                  ? 'bg-[#1a3a35] text-white'
                  : 'bg-gray-100 text-gray-500'
              "
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                ></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-900">Pay with Card</p>
              <p class="text-sm text-gray-500">Secure payment via Stripe</p>
            </div>
            <div
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
              :class="
                selectedMethod === 'stripe'
                  ? 'border-[#1a3a35] bg-[#1a3a35]'
                  : 'border-gray-300'
              "
            >
              <div
                v-if="selectedMethod === 'stripe'"
                class="w-2 h-2 bg-white rounded-full"
              ></div>
            </div>
          </button>

          <!-- Local Option -->
          <button
            @click="selectedMethod = 'local'"
            class="w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left"
            :class="
              selectedMethod === 'local'
                ? 'border-[#1a3a35] bg-[#1a3a35]/5'
                : 'border-gray-200 hover:border-gray-300'
            "
          >
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center"
              :class="
                selectedMethod === 'local'
                  ? 'bg-[#1a3a35] text-white'
                  : 'bg-gray-100 text-gray-500'
              "
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
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-900">Pay at Counter</p>
              <p class="text-sm text-gray-500">Cash or in-person payment</p>
            </div>
            <div
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
              :class="
                selectedMethod === 'local'
                  ? 'border-[#1a3a35] bg-[#1a3a35]'
                  : 'border-gray-300'
              "
            >
              <div
                v-if="selectedMethod === 'local'"
                class="w-2 h-2 bg-white rounded-full"
              ></div>
            </div>
          </button>
        </div>

        <!-- Error Message -->
        <p
          v-if="purchaseError"
          class="text-red-500 text-sm text-center mb-4"
        >
          {{ purchaseError }}
        </p>

        <!-- Action Button -->
        <button
          @click="handlePurchase"
          :disabled="!selectedMethod || isPurchasing"
          class="w-full bg-[#1a3a35] text-white py-4 rounded-xl font-semibold hover:bg-[#2a4a45] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <span v-if="isPurchasing">Processing...</span>
          <span v-else-if="selectedMethod === 'stripe'">
            Proceed to Stripe Checkout
          </span>
          <span v-else-if="selectedMethod === 'local'"> Confirm Purchase </span>
          <span v-else>Select a Payment Method</span>
        </button>
      </template>

      <!-- Success State -->
      <div
        v-if="purchaseSuccess"
        class="text-center py-12"
      >
        <div
          class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-[#1a3a35] mb-2">
          Purchase Confirmed!
        </h2>
        <p class="text-gray-500 mb-8">
          Your membership has been activated successfully.
        </p>
        <router-link
          to="/ecc/profile"
          class="inline-block bg-[#1a3a35] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2a4a45] transition-colors"
        >
          Go to Profile
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { GetMembershipById, BuyMembership } from "@/services/apiService.js";

  const route = useRoute();
  const router = useRouter();

  const membershipId = ref(route.query.membership || "");
  const userId = ref(route.query.userId || "");

  const membership = ref(null);
  const isLoading = ref(true);
  const errorMessage = ref("");

  const selectedMethod = ref("");
  const isPurchasing = ref(false);
  const purchaseError = ref("");
  const purchaseSuccess = ref(false);

  async function fetchMembership() {
    if (!membershipId.value) {
      errorMessage.value = "No membership selected.";
      isLoading.value = false;
      return;
    }
    try {
      const response = await GetMembershipById(membershipId.value);
      if (response.isSuccess && response.value) {
        membership.value = response.value;
      } else {
        errorMessage.value = "Failed to load membership details.";
      }
    } catch (error) {
      errorMessage.value =
        "An error occurred while loading membership details.";
      console.error("Error fetching membership:", error);
    } finally {
      isLoading.value = false;
    }
  }

  async function handlePurchase() {
    if (!selectedMethod.value) return;
    purchaseError.value = "";

    // Stripe payment flow
    if (selectedMethod.value === "stripe") {
      if (!userId.value) {
        purchaseError.value = "User ID is missing. Please log in again.";
        return;
      }

      isPurchasing.value = true;
      try {
        // Build success and cancel URLs
        const baseUrl = window.location.origin;
        const successUrl = `${baseUrl}/membership/success`;
        const cancelUrl = `${baseUrl}/membership/cancel`;

        console.log("[MEMBERSHIP PAYMENT] Creating Stripe checkout session...");
        console.log("[MEMBERSHIP PAYMENT] Membership ID:", membershipId.value);
        console.log("[MEMBERSHIP PAYMENT] User ID:", userId.value);

        const payload = {
          userId: userId.value,
          membershipId: membershipId.value,
          paymentMethod: "stripe",
          successUrl,
          cancelUrl,
        };

        const response = await BuyMembership(payload);

        if (response.isSuccess && response.value?.url) {
          console.log("[MEMBERSHIP PAYMENT] ✅ Checkout session created");
          console.log(
            "[MEMBERSHIP PAYMENT] Session ID:",
            response.value.sessionId,
          );
          console.log(
            "[MEMBERSHIP PAYMENT] Payment type:",
            response.value.type,
          );
          console.log("[MEMBERSHIP PAYMENT] Redirecting to Stripe...");

          // Redirect to Stripe Checkout
          window.location.href = response.value.url;
        } else {
          purchaseError.value =
            response.userMessage ||
            response.errorMessage ||
            "Failed to create checkout session.";
          console.error(
            "[MEMBERSHIP PAYMENT] ❌ Failed to create session:",
            response,
          );
        }
      } catch (error) {
        purchaseError.value = "Network error. Please try again.";
        console.error("[MEMBERSHIP PAYMENT] ❌ Stripe checkout error:", error);
      } finally {
        isPurchasing.value = false;
      }
      return;
    }

    // Local payment flow
    if (selectedMethod.value === "local") {
      if (!userId.value) {
        purchaseError.value = "User ID is missing. Please log in again.";
        return;
      }
      isPurchasing.value = true;
      try {
        const payload = {
          userId: userId.value,
          membershipId: membershipId.value,
          paymentMethod: "local",
          notes: "Purchased via member portal",
        };
        const response = await BuyMembership(payload);
        if (response.isSuccess) {
          purchaseSuccess.value = true;
        } else {
          purchaseError.value =
            response.userMessage || response.errorMessage || "Purchase failed.";
        }
      } catch (error) {
        purchaseError.value = "An error occurred. Please try again.";
        console.error("Purchase error:", error);
      } finally {
        isPurchasing.value = false;
      }
    }
  }

  onMounted(() => {
    fetchMembership();
  });
</script>
