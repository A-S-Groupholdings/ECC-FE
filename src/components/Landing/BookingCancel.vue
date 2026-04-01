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
              placeholder="Name"
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
              placeholder="Email"
              class="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
            />
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-gray-800 mb-2">
              Phone <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.phone"
              type="tel"
              placeholder=""
              class="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
            />
          </div>

          <!-- Booking Date -->
          <div>
            <label class="block text-sm font-medium text-gray-800 mb-2">
              Booking Date <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.bookingDate"
              type="text"
              placeholder="dd/mm/yyyy"
              class="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
            />
          </div>

          <!-- Booking Time -->
          <div>
            <label class="block text-sm font-medium text-gray-800 mb-2">
              Booking Time <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.bookingTime"
              type="text"
              placeholder=""
              class="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all"
            />
          </div>

          <!-- Booking Informations -->
          <div>
            <label class="block text-sm font-medium text-gray-800 mb-2">
              Booking Informations <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.bookingInfo"
              rows="5"
              placeholder="Selected Lane & Services"
              class="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          <!-- Booking Reference (File Upload) -->
          <div>
            <label class="block text-sm font-medium text-gray-800 mb-2">
              Booking Reference (Screenshot of your booking confirmation email)
            </label>
            <div class="flex items-center gap-3">
              <label class="cursor-pointer">
                <input
                  type="file"
                  @change="handleFileUpload"
                  accept="image/*"
                  class="hidden"
                />
                <span
                  class="inline-block px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Choose files
                </span>
              </label>
              <span class="text-sm text-gray-500">
                {{ form.fileName || "No file chosen" }}
              </span>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              class="w-full bg-[#1a3a35] text-white py-4 rounded font-semibold tracking-wide hover:bg-[#2a4a45] transition-colors uppercase"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const form = ref({
    name: "",
    email: "",
    phone: "",
    bookingDate: "",
    bookingTime: "",
    bookingInfo: "",
    file: null,
    fileName: "",
  });

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      form.value.file = file;
      form.value.fileName = file.name;
    }
  }

  function submitForm() {
    console.log("Cancellation request submitted:", form.value);
    // Handle form submission
    alert(
      "Your cancellation request has been submitted. Our team will review it and contact you soon.",
    );
  }
</script>
