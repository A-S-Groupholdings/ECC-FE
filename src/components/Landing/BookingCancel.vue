<template>
  <div class="min-h-screen bg-[#faf9f7] py-12 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1
          class="text-2xl md:text-3xl font-bold text-[#1a3a35] mb-4 tracking-wide"
        >
          BOOKING CANCELLATION REQUEST
        </h1>
        <p class="text-gray-700 text-sm md:text-base mb-2">
          If you wish to cancel a previously made booking, please complete the
          form below.
        </p>
        <p class="text-gray-700 text-sm md:text-base mb-4">
          Our team will review your request and confirm the cancellation via
          email or phone.
        </p>
        <div class="border-b-2 border-[#1a3a35] max-w-2xl mx-auto"></div>
        <p class="text-gray-500 text-sm mt-4">
          Cancellations made less than 4 hours before the session may not be
          eligible for a refund.
        </p>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
      >
        <p class="text-green-800 text-sm">{{ successMessage }}</p>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
      >
        <p class="text-red-800 text-sm">{{ errorMessage }}</p>
      </div>

      <!-- Form Card -->
      <div class="bg-[#faf9f7] container mx-auto">
        <form
          @submit.prevent="submitForm"
          class="space-y-5"
        >
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-800 mb-2">
              Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter your name"
              required
              class="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-800 mb-2">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              required
              class="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
            />
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-gray-800 mb-2">
              Phone Number <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              required
              class="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
            />
          </div>

          <!-- Booking ID -->
          <div>
            <label class="block text-sm font-medium text-gray-800 mb-2">
              Booking ID <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.bookingId"
              type="text"
              placeholder="e.g., B1, B2, B3"
              required
              class="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
            />
          </div>

          <!-- Reason -->
          <div>
            <label class="block text-sm font-medium text-gray-800 mb-2">
              Cancellation Reason
            </label>
            <textarea
              v-model="form.reason"
              rows="4"
              placeholder="Please provide a reason for cancellation (optional)"
              class="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-[#1a3a35] text-white py-4 rounded font-semibold tracking-wide hover:bg-[#2a4a45] transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>Submit Cancellation Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { CancelBooking } from "@/services/apiService.js";

  const router = useRouter();

  const form = ref({
    name: "",
    email: "",
    phoneNumber: "",
    bookingId: "",
    reason: "",
  });

  const isSubmitting = ref(false);
  const successMessage = ref("");
  const errorMessage = ref("");

  const submitForm = async () => {
    isSubmitting.value = true;
    successMessage.value = "";
    errorMessage.value = "";

    try {
      const payload = {
        bookingId: form.value.bookingId.trim(),
        name: form.value.name.trim(),
        email: form.value.email.trim(),
        phoneNumber: form.value.phoneNumber.trim(),
        reason: form.value.reason.trim() || "Not provided",
      };

      const response = await CancelBooking(payload);

      if (response.isSuccess) {
        successMessage.value =
          response.value.message ||
          "Your cancellation request has been submitted successfully. A confirmation email has been sent.";

        // Reset form
        form.value = {
          name: "",
          email: "",
          phoneNumber: "",
          bookingId: "",
          reason: "",
        };

        // Redirect to home after 3 seconds
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        errorMessage.value =
          response.userMessage ||
          "Failed to submit cancellation request. Please try again.";
      }
    } catch (error) {
      console.error("[CANCELLATION] Error:", error);
      errorMessage.value =
        error.response?.data?.userMessage ||
        "Failed to submit cancellation request. Please check your details and try again.";
    } finally {
      isSubmitting.value = false;
    }
  };
</script>
