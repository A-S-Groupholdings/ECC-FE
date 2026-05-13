<template>
  <div class="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div
          class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-10 h-10 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>

        <h2 class="text-2xl font-bold text-[#1a3a35] mb-2">
          Payment Cancelled
        </h2>
        <p class="text-gray-600 mb-2">
          Your membership purchase was cancelled.
        </p>
        <p class="text-sm text-gray-500 mb-8">
          No charges were made to your account. You can try again anytime.
        </p>

        <div class="space-y-3">
          <button
            @click="tryAgain"
            class="w-full bg-[#1a3a35] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2a4a45] transition-colors"
          >
            Try Again
          </button>

          <button
            @click="goHome"
            class="w-full bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function tryAgain() {
  router.push('/member/membership');
}

function goHome() {
  router.push('/');
}
</script>
