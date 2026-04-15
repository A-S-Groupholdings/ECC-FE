<template>
  <div class="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div
          class="w-20 h-20 bg-[#1a3a35] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <svg
            class="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            ></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Admin Verification</h1>
        <p class="text-gray-500 mt-2">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <!-- OTP Card -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <!-- Email Display -->
        <div class="text-center mb-6">
          <p class="text-sm text-gray-500">We sent a code to</p>
          <p class="font-medium text-gray-900">{{ email }}</p>
        </div>

        <!-- OTP Input Fields -->
        <div class="flex justify-center gap-3 mb-6">
          <input
            v-for="(digit, index) in otpDigits"
            :key="index"
            v-model="otpDigits[index]"
            type="text"
            maxlength="1"
            class="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-[#1a3a35] focus:ring-2 focus:ring-[#1a3a35]/20 outline-none transition-all"
            @input="handleInput(index, $event)"
            @keydown="handleKeydown(index, $event)"
            @paste="handlePaste($event)"
            ref="otpInputs"
          />
        </div>

        <!-- Error Message -->
        <p
          v-if="errorMessage"
          class="text-red-500 text-sm text-center mb-4"
        >
          {{ errorMessage }}
        </p>

        <!-- Verify Button -->
        <button
          @click="verifyOtp"
          :disabled="!isOtpComplete || isLoading"
          class="w-full bg-[#1a3a35] text-white py-4 rounded-xl font-semibold hover:bg-[#2a4a45] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {{ isLoading ? "Verifying..." : "Verify Code" }}
        </button>

        <!-- Resend Section -->
        <div class="text-center mt-6">
          <p
            v-if="countdown > 0"
            class="text-sm text-gray-500"
          >
            Resend code in
            <span class="font-medium text-[#1a3a35]">{{ countdown }}s</span>
          </p>
          <button
            v-else
            @click="resendOtp"
            :disabled="isResending"
            class="text-[#1a3a35] font-medium hover:underline disabled:opacity-50"
          >
            {{ isResending ? "Sending..." : "Resend Code" }}
          </button>
        </div>

        <!-- Back to Login -->
        <div class="text-center mt-6 pt-6 border-t border-gray-100">
          <router-link
            to="/login"
            class="text-gray-500 hover:text-[#1a3a35] transition-colors flex items-center justify-center gap-2"
          >
            <svg
              class="w-4 h-4"
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
            Back to Login
          </router-link>
        </div>
      </div>

      <!-- Security Note -->
      <p class="text-center text-xs text-gray-400 mt-6">
        Secure verification powered by Elite Cricket Centre
      </p>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { AdminLogin, AdminLoginOtp } from "@/services/apiService.js";

  const router = useRouter();
  const route = useRoute();
  const otpDigits = ref(["", "", "", "", "", ""]);
  const otpInputs = ref([]);
  const errorMessage = ref("");
  const countdown = ref(60);
  const isLoading = ref(false);
  const isResending = ref(false);

  // Get email from localStorage or query param
  const email = ref(
    localStorage.getItem("otpEmail") || route.query.email || "",
  );

  const isOtpComplete = computed(() => {
    return otpDigits.value.every((digit) => digit !== "");
  });

  function handleInput(index, event) {
    const value = event.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      otpDigits.value[index] = "";
      return;
    }

    otpDigits.value[index] = value;

    // Move to next input
    if (value && index < 5) {
      otpInputs.value[index + 1].focus();
    }

    // Clear error when typing
    errorMessage.value = "";
  }

  function handleKeydown(index, event) {
    // Move to previous input on backspace
    if (event.key === "Backspace" && !otpDigits.value[index] && index > 0) {
      otpInputs.value[index - 1].focus();
    }
  }

  function handlePaste(event) {
    event.preventDefault();
    const pastedData = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    pastedData.split("").forEach((digit, index) => {
      if (index < 6) {
        otpDigits.value[index] = digit;
      }
    });

    // Focus the next empty input or the last one
    const nextEmptyIndex = otpDigits.value.findIndex((d) => d === "");
    if (nextEmptyIndex !== -1) {
      otpInputs.value[nextEmptyIndex].focus();
    } else if (pastedData.length < 6) {
      otpInputs.value[pastedData.length].focus();
    } else {
      otpInputs.value[5].focus();
    }
  }

  async function verifyOtp() {
    const otp = otpDigits.value.join("");
    isLoading.value = true;
    errorMessage.value = "";

    try {
      const response = await AdminLogin(email.value, otp);

      if (response.isSuccess) {
        // Store tokens securely
        if (response.user) {
          // Store non-sensitive user info (NOT tokens)
          const userInfo = {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
          };
          localStorage.setItem("user", JSON.stringify(userInfo));

          // Store tokens in memory (lost on refresh but secure)
          // For persistent sessions, use httpOnly cookies from backend
          if (response.user.accessToken) {
            sessionStorage.setItem("accessToken", response.user.accessToken);
          }
          if (response.user.refreshToken) {
            sessionStorage.setItem("refreshToken", response.user.refreshToken);
          }

          // Redirect based on role
          if (response.user.role === "admin") {
            router.push("/dashboard/home");
          } else {
            router.push("/dashboard");
          }
        } else {
          // Default redirect if no user data
          router.push("/dashboard/home");
        }
      } else {
        errorMessage.value =
          response.userMessage || "Invalid code. Please try again.";
        otpDigits.value = ["", "", "", "", "", ""];
        otpInputs.value[0].focus();
      }
    } catch (error) {
      errorMessage.value = "An error occurred. Please try again.";
      console.error("OTP verification error:", error);
    } finally {
      isLoading.value = false;
    }
  }

  async function resendOtp() {
    isResending.value = true;
    errorMessage.value = "";

    try {
      const response = await AdminLoginOtp(email.value);

      if (response.isSuccess) {
        countdown.value = 60;
        startCountdown();
      } else {
        errorMessage.value = response.userMessage || "Failed to resend code.";
      }
    } catch (error) {
      errorMessage.value = "Failed to resend code. Please try again.";
      console.error("Resend OTP error:", error);
    } finally {
      isResending.value = false;
    }
  }

  function startCountdown() {
    const timer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--;
      } else {
        clearInterval(timer);
      }
    }, 1000);
  }

  onMounted(() => {
    startCountdown();
    otpInputs.value[0].focus();

    // Redirect to login if no email
    if (!email.value) {
      router.push("/login");
    }
  });
</script>
