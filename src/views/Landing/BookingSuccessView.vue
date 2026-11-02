<template>
  <div class="min-h-screen bg-[#f5f3ef] flex items-center justify-center px-4">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
      <!-- Loading State -->
      <div
        v-if="isConfirming"
        class="py-12"
      >
        <svg
          class="w-16 h-16 animate-spin text-[#1a3a35] mx-auto mb-4"
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
        <h2 class="text-xl font-semibold text-[#1a3a35] mb-2">
          Confirming Payment...
        </h2>
        <p class="text-gray-600">Please wait while we verify your payment.</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="confirmError"
        class="py-8"
      >
        <div
          class="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-10 h-10 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-[#1a3a35] mb-4">
          Payment Verification Issue
        </h2>
        <p class="text-gray-600 mb-4">{{ confirmError }}</p>
        <p class="text-sm text-gray-500 mb-8">
          Your booking was created but payment needs manual verification.
        </p>

        <button
          @click="goHome"
          class="bg-[#1a3a35] text-white px-8 py-3 rounded font-semibold hover:bg-[#2a4a45] transition-colors w-full mb-3"
        >
          Back to Home
        </button>
        <button
          @click="window.location.reload()"
          class="bg-white border-2 border-[#1a3a35] text-[#1a3a35] px-8 py-3 rounded font-semibold hover:bg-gray-50 transition-colors w-full"
        >
          Try Again
        </button>
      </div>

      <!-- Success State -->
      <div v-else>
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

        <h2 class="text-2xl font-bold text-[#1a3a35] mb-4">
          Payment Successful!
        </h2>
        <p class="text-gray-600 mb-2">Your booking has been confirmed.</p>
        <p class="text-gray-600 mb-8">
          A confirmation email has been sent to your email address.
        </p>

        <div class="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Centre:</span>
            <span class="font-semibold">{{ centerName }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Booking Reference:</span>
            <span class="font-semibold">#ECC-{{ bookingRef }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Status:</span>
            <span class="font-semibold text-green-600">Paid & Confirmed</span>
          </div>
        </div>

        <!-- Experience feedback -->
        <div class="mb-8">
          <p class="text-sm font-semibold text-gray-700 mb-3">
            How was your experience?
          </p>
          <div class="flex gap-3">
            <!-- Thumbs up → Google review -->
            <button
              @click="leaveGoogleReview"
              class="flex-1 flex flex-col items-center gap-2 py-4 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors group"
            >
              <svg
                class="w-8 h-8 text-gray-400 group-hover:text-green-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              <span
                class="text-xs font-semibold text-gray-500 group-hover:text-green-700"
                >Loved it</span
              >
            </button>
            <!-- Thumbs down → internal review page -->
            <button
              @click="leaveFeedback"
              class="flex-1 flex flex-col items-center gap-2 py-4 rounded-lg border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-colors group"
            >
              <svg
                class="w-8 h-8 text-gray-400 group-hover:text-orange-500 transition-colors rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              <span
                class="text-xs font-semibold text-gray-500 group-hover:text-orange-600"
                >Could be better</span
              >
            </button>
          </div>
        </div>

        <button
          @click="goHome"
          class="bg-[#1a3a35] text-white px-8 py-3 rounded font-semibold hover:bg-[#2a4a45] transition-colors w-full"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";

  const router = useRouter();
  const bookingRef = ref(Math.floor(Math.random() * 10000));
  const isConfirming = ref(true);
  const confirmError = ref("");
  const centerName = ref("");

  onMounted(async () => {
    // Get session ID and booking ID from URL params
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const bookingId = params.get("booking_id");
    const ref = params.get("ref");

    console.log("[SUCCESS PAGE] Session ID:", sessionId);
    console.log("[SUCCESS PAGE] Booking ID:", bookingId);

    if (ref) {
      bookingRef.value = ref;
    }

    const center = params.get("centerName");
    if (center) {
      centerName.value = decodeURIComponent(center);
    }

    // If we have a session ID, confirm the payment
    if (sessionId) {
      try {
        const apiUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
        console.log("[SUCCESS PAGE] Calling confirm-payment endpoint...");

        const response = await axios.post(
          `${apiUrl}/stripe/confirm-payment-booking`,
          {
            sessionId: sessionId,
            bookingId: bookingId,
          },
        );

        console.log("[SUCCESS PAGE] Response:", response.data);

        if (response.data.isSuccess) {
          console.log("[SUCCESS PAGE] Payment confirmed successfully");
          isConfirming.value = false;
        } else {
          confirmError.value =
            response.data.userMessage || "Failed to confirm payment";
          isConfirming.value = false;
        }
      } catch (error) {
        console.error("[SUCCESS PAGE] Error confirming payment:", error);
        confirmError.value =
          "Error confirming payment. Please contact support.";
        isConfirming.value = false;
      }
    } else {
      // No session ID - user might have bookmarked the page or came directly
      console.log(
        "[SUCCESS PAGE] No session ID found, showing success without confirmation",
      );
      isConfirming.value = false;
    }
  });

  function goHome() {
    router.push("/");
  }

  const GOOGLE_REVIEW_URLS = {
    "cranbourne north": "https://g.page/r/CVOo3tMPYIyUEAE/review",
    hallam: "https://g.page/r/CfQa4hf5Zr_eEAE/review",
  };

  function getGoogleReviewUrl() {
    const key = (centerName.value || "").trim().toLowerCase();
    return GOOGLE_REVIEW_URLS[key] || GOOGLE_REVIEW_URLS["cranbourne north"];
  }

  function leaveGoogleReview() {
    window.open(getGoogleReviewUrl(), "_blank", "noopener");
  }

  function leaveFeedback() {
    router.push("/review");
  }
</script>
