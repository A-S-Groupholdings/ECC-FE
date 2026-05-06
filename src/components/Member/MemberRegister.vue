<template>
  <section
    class="container mx-auto px-4 py-8 h-screeen lg:grid md:grid lg:grid-cols-2 gap-6 overflow-y-hidden"
  >
    <!-- left side -->
    <div
      class="relative rounded-lg col-span-1 bg-ecc-img h-[94vh] bg-cover bg-left lg:flex flex-col justify-between gap-6 hidden"
    >
      <div class="absolute inset-0 bg-[#295C8D]/20 rounded-lg z-0"></div>
    </div>

    <!-- right Side -->
    <div class="grid justify-items-center py-5">
      <router-link
        to="/"
        class="cursor-pointer"
      >
        <img
          src="@/assets/logo.webp"
          class="w-[174px] h-[174px]"
        />
      </router-link>
      <div class="heding text-center mb-6 mt-20 sm:mt-0">
        <h1 class="text-black font-semibold text-2xl sm:text-4xl">
          Sign Up to your account
        </h1>
        <span class="text-[#6C6C6C] text-sm">Member Portal</span>
      </div>

      <form
        @submit.prevent="handleRegister"
        class="w-full max-w-sm space-y-8"
      >
        <!-- Name -->
        <div class="relative">
          <input
            v-model="name"
            type="text"
            id="name"
            required
            placeholder=" "
            class="peer w-full border border-gray-300 rounded px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          <label
            for="name"
            class="absolute left-4 text-sm text-gray-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-secondary pointer-events-none"
            >Full Name</label
          >
        </div>

        <!-- Email -->
        <div class="relative">
          <input
            v-model="email"
            type="email"
            id="email"
            required
            placeholder=" "
            class="peer w-full border border-gray-300 rounded px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          <label
            for="email"
            class="absolute left-4 text-sm text-gray-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-secondary pointer-events-none"
            >Email</label
          >
        </div>

        <!-- Phone -->
        <div class="relative">
          <input
            v-model="phoneNumber"
            type="tel"
            id="phone"
            required
            placeholder=" "
            class="peer w-full border border-gray-300 rounded px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          <label
            for="phone"
            class="absolute left-4 text-sm text-gray-400 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-secondary pointer-events-none"
            >Phone</label
          >
        </div>

        <!-- Error Message -->
        <p
          v-if="errorMessage"
          class="text-red-500 text-sm text-center"
        >
          {{ errorMessage }}
        </p>

        <!-- Sign In -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full text-[20px] bg-primary text-white py-2 rounded font-semibold text-lg hover:bg-[#2c3a52] mt-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? "Sending OTP..." : "Sign Up" }}
        </button>
      </form>
      <div class="text-center mt-10">
        <p class="text-gray-500 text-sm">
          Already have an account?
          <router-link
            to="/member/login"
            class="text-secondary"
          >
            Log in
          </router-link>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { SendOtp } from "@/services/apiService.js";

  const router = useRouter();
  const name = ref("");
  const email = ref("");
  const phoneNumber = ref("");
  const errorMessage = ref("");
  const isLoading = ref(false);

  async function handleRegister() {
    errorMessage.value = "";
    isLoading.value = true;

    try {
      const payload = {
        name: name.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        role: "user",
        categoryID: "69cde98e5e186e2469e9b4b8",
      };
      const response = await SendOtp(payload);

      if (response.isSuccess) {
        const otpEmail = response.value?.email || email.value;
        localStorage.setItem("otpEmail", otpEmail);
        router.push(`/member/otp?email=${encodeURIComponent(otpEmail)}`);
      } else {
        errorMessage.value =
          response.userMessage || "Failed to send OTP. Please try again.";
      }
    } catch (error) {
      errorMessage.value = "An error occurred. Please try again.";
      console.error("Send OTP error:", error);
    } finally {
      isLoading.value = false;
    }
  }
</script>
