<template>
  <div class="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Loading State -->
      <div
        v-if="isConfirming"
        class="bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <div
          class="w-16 h-16 border-4 border-[#1a3a35] border-t-transparent rounded-full animate-spin mx-auto mb-6"
        ></div>
        <h2 class="text-2xl font-bold text-[#1a3a35] mb-2">
          Confirming Your Membership
        </h2>
        <p class="text-gray-500 text-sm">
          Please wait while we activate your membership...
        </p>
      </div>

      <!-- Success State -->
      <div
        v-else
        class="bg-white rounded-2xl shadow-lg p-8 text-center"
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
          Membership Activated!
        </h2>
        <p class="text-gray-600 mb-2">
          Your membership has been successfully activated.
        </p>
        <p
          v-if="membershipType"
          class="text-sm text-[#1a3a35] font-medium mb-6 bg-green-50 px-4 py-2 rounded-lg inline-block"
        >
          {{ membershipType === 'subscription' ? '🔄 Subscription (Auto-Renewal Enabled)' : '✅ One-Time Payment' }}
        </p>

        <div class="space-y-3">
          <button
            @click="goToProfile"
            class="w-full bg-[#1a3a35] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2a4a45] transition-colors"
          >
            Go to Profile
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const isConfirming = ref(true);
const membershipType = ref('');

onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');
  const membershipId = params.get('membership_id');

  console.log('[MEMBERSHIP SUCCESS] Session ID:', sessionId);
  console.log('[MEMBERSHIP SUCCESS] Membership ID:', membershipId);

  if (sessionId) {
    try {
      // Call the confirm payment endpoint
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
      const response = await axios.post(`${apiUrl}/stripe/confirm-payment`, {
        sessionId: sessionId
      });

      if (response.data.isSuccess) {
        console.log('[MEMBERSHIP SUCCESS] ✅ Membership confirmed');
        
        // Determine membership type from metadata or session
        membershipType.value = response.data.value?.type || 'one_time';
      }
    } catch (error) {
      console.error('[MEMBERSHIP SUCCESS] ❌ Error confirming membership:', error);
    } finally {
      isConfirming.value = false;
    }
  } else {
    console.warn('[MEMBERSHIP SUCCESS] ⚠️ No session ID found');
    isConfirming.value = false;
  }
});

function goToProfile() {
  router.push('/ecc/profile');
}

function goHome() {
  router.push('/');
}
</script>
