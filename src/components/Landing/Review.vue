<template>
  <section class="py-16 px-4 bg-[#faf9f7]">
    <div class="max-w-xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl sm:text-4xl font-bold text-[#1a3a35] mb-3">
          Share Your Experience
        </h1>
        <p class="text-gray-500 text-sm sm:text-base">
          We'd love to hear from you. Your feedback helps us improve.
        </p>
      </div>

      <!-- Success -->
      <div
        v-if="isSubmitted"
        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center"
      >
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"
        >
          <svg
            class="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-[#1a3a35] mb-2">
          Thank you for your feedback!
        </h2>
        <p class="text-gray-500 text-sm mb-6">
          {{
            successMessage ||
            "We appreciate you taking the time to share your experience."
          }}
        </p>
        <div class="flex gap-3 justify-center">
          <button
            @click="resetForm"
            class="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
          >
            Leave Another Review
          </button>
          <router-link
            to="/"
            class="px-6 py-2.5 bg-[#1a3a35] text-white rounded-lg text-sm font-semibold hover:bg-[#2a4a45] transition-colors"
          >
            Back to Home
          </router-link>
        </div>
      </div>

      <!-- Form -->
      <form
        v-else
        @submit.prevent="submitReview"
        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-6"
      >
        <!-- Rating -->
        <!-- <div class="text-center">
          <p class="text-sm font-semibold text-gray-700 mb-3">
            How would you rate your experience?
          </p>
        </div> -->

        <!-- Name -->
        <div>
          <label
            for="review-name"
            class="block text-sm font-semibold text-gray-700 mb-2"
          >
            Name <span class="text-red-500">*</span>
          </label>
          <input
            id="review-name"
            v-model.trim="form.name"
            type="text"
            placeholder="Your name"
            class="w-full px-4 py-3 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
            :class="errors.name ? 'border-red-300' : 'border-gray-200'"
          />
          <p
            v-if="errors.name"
            class="text-xs text-red-500 mt-1.5"
          >
            {{ errors.name }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <label
            for="review-email"
            class="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email <span class="text-red-500">*</span>
          </label>
          <input
            id="review-email"
            v-model.trim="form.email"
            type="email"
            placeholder="you@example.com"
            class="w-full px-4 py-3 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
            :class="errors.email ? 'border-red-300' : 'border-gray-200'"
          />
          <p
            v-if="errors.email"
            class="text-xs text-red-500 mt-1.5"
          >
            {{ errors.email }}
          </p>
        </div>

        <!-- Comment -->
        <div>
          <label
            for="review-comment"
            class="block text-sm font-semibold text-gray-700 mb-2"
          >
            Your Review <span class="text-red-500">*</span>
          </label>
          <textarea
            id="review-comment"
            v-model.trim="form.comment"
            rows="5"
            placeholder="Tell us about your experience at Elite Cricket Centre..."
            class="w-full px-4 py-3 bg-white border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all resize-none"
            :class="errors.comment ? 'border-red-300' : 'border-gray-200'"
          ></textarea>
          <div class="flex items-center justify-between mt-1.5">
            <p
              v-if="errors.comment"
              class="text-xs text-red-500"
            >
              {{ errors.comment }}
            </p>
            <p
              v-else
              class="text-xs text-gray-400"
            >
              Min. 10 characters
            </p>
            <p class="text-xs text-gray-400">{{ form.comment.length }}/500</p>
          </div>
        </div>

        <!-- Error banner -->
        <div
          v-if="submitError"
          class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
        >
          {{ submitError }}
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full py-3.5 bg-[#1a3a35] text-white rounded-xl font-semibold text-sm hover:bg-[#2a4a45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg
            v-if="isSubmitting"
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
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          {{ isSubmitting ? "Submitting..." : "Submit Review" }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { SubmitReview } from "@/services/apiService.js";

  const form = ref({
    name: "",
    email: "",
    comment: "",
    rating: 0,
  });

  const hoverRating = ref(0);
  const errors = ref({});
  const isSubmitting = ref(false);
  const isSubmitted = ref(false);
  const submitError = ref("");
  const successMessage = ref("");

  const ratingLabel = computed(() => {
    const r = hoverRating.value || form.value.rating;
    return (
      ["", "Poor", "Fair", "Good", "Very good", "Excellent"][r] ||
      "Tap a star to rate"
    );
  });

  function validate() {
    const e = {};
    if (!form.value.name) e.name = "Name is required.";
    if (!form.value.email) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.value.comment) {
      e.comment = "Please write a review.";
    } else if (form.value.comment.length < 10) {
      e.comment = "Review must be at least 10 characters.";
    }
    errors.value = e;
    return Object.keys(e).length === 0;
  }

  async function submitReview() {
    submitError.value = "";
    if (!validate()) return;
    isSubmitting.value = true;
    try {
      const response = await SubmitReview({
        name: form.value.name,
        email: form.value.email,
        comment: form.value.comment,
        ...(form.value.rating ? { rating: form.value.rating } : {}),
      });
      if (response.isSuccess) {
        successMessage.value =
          response.userMessage || "Thank you for your feedback!";
        isSubmitted.value = true;
      } else {
        submitError.value =
          response.userMessage ||
          response.errorMessage ||
          "Failed to submit your review. Please try again.";
      }
    } catch (error) {
      submitError.value = "Network error. Please try again.";
    } finally {
      isSubmitting.value = false;
    }
  }

  function resetForm() {
    form.value = { name: "", email: "", comment: "", rating: 0 };
    errors.value = {};
    submitError.value = "";
    successMessage.value = "";
    isSubmitted.value = false;
  }
</script>
