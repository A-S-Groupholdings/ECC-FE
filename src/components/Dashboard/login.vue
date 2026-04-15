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
          Sign in to your account
        </h1>
        <span class="text-[#6C6C6C] text-sm">Admin Portal</span>
      </div>

      <form
        @submit.prevent="handleLogin"
        class="w-full max-w-sm space-y-8"
      >
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

          <!-- Email Icon -->
          <img
            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            src="../../assets/email.png"
            alt="Email icon"
          />
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex justify-between items-center px-5">
          <!-- Remember Me -->
          <div class="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              v-model="rememberMe"
              class="w-4 h-4 text-secondary focus:ring-secondary"
            />
            <label
              for="rememberMe"
              class="text-sm text-[#1F2B3E] font-semibold"
              >Remember Me</label
            >
          </div>

          <!-- Forgot Password -->
          <a
            href="/forgot"
            class="text-sm text-[#1F2B3E] font-normal hover:underline"
            >Forgot Password</a
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
          {{ isLoading ? "Sending OTP..." : "Sign In" }}
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { AdminLoginOtp } from "@/services/apiService.js";

  const router = useRouter();
  const email = ref("");
  const rememberMe = ref(false);
  const errorMessage = ref("");
  const isLoading = ref(false);

  async function handleLogin() {
    errorMessage.value = "";
    isLoading.value = true;

    try {
      const response = await AdminLoginOtp(email.value);

      if (response.isSuccess) {
        // Store email for OTP page
        localStorage.setItem("otpEmail", email.value);

        // Redirect to OTP page with email as query param
        router.push(`/admin/otp?email=${encodeURIComponent(email.value)}`);
      } else {
        errorMessage.value =
          response.userMessage || "Login failed. Please try again.";
      }
    } catch (error) {
      errorMessage.value = "An error occurred. Please try again.";
      console.error("Login error:", error);
    } finally {
      isLoading.value = false;
    }
  }
</script>
