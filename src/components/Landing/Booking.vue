<template>
  <div class="booking">
    <!-- Header Section -->
    <div class="bg-[#f5f3ef] py-8 px-4">
      <div class="container mx-auto text-center">
        <h2
          class="text-[#1a3a35] font-bold text-2xl tracking-wider uppercase mb-4"
        >
          Book Your Lane With Ease
        </h2>
        <p class="text-[#1a3a35] italic max-w-4xl mx-auto text-sm">
          Whether you're an individual player or a local sports club, our lane
          booking system makes it simple to reserve your training lane online in
          just a few clicks. Choose your session type and preferred time to
          train at the Elite Cricket Centre, where performance meets precision.
        </p>
        <div class="border-b-2 border-[#1a3a35] mt-6 max-w-5xl mx-auto"></div>
      </div>
    </div>

    <!-- Notice Section -->
    <div class="bg-white py-10 px-4">
      <div class="container mx-auto text-center">
        <p class="text-red-600 font-semibold mb-2">
          All players must wear appropriate safety gear before entering the
          nets. Failure to comply is not permitted.
        </p>
        <p class="text-[#1a3a35] font-semibold">
          If your booking is less than 1 hour away from selected time, please
          call us to confirm.
        </p>
      </div>
    </div>

    <!-- Form Section -->
    <div class="bg-white px-4 pb-8">
      <div class="container mx-auto">
        <!-- Divider -->
        <div class="border-t border-gray-300 mb-8"></div>

        <!-- Progress Steps Desktop -->
        <div class="hidden sm:grid grid-cols-5 gap-2 mb-8">
          <div class="text-center">
            <p class="text-sm font-semibold text-[#1a3a35] mb-2">1. Service</p>
            <div class="h-2 bg-[#1a3a35] rounded-sm"></div>
          </div>
          <div class="text-center">
            <p class="text-sm font-semibold text-[#1a3a35] mb-2">2. Time</p>
            <div class="h-2 bg-gray-400 rounded-sm"></div>
          </div>
          <div class="text-center">
            <p class="text-sm font-semibold text-[#1a3a35] mb-2">3. Details</p>
            <div class="h-2 bg-gray-400 rounded-sm"></div>
          </div>
          <div class="text-center">
            <p class="text-sm font-semibold text-[#1a3a35] mb-2">4. Payment</p>
            <div class="h-2 bg-gray-400 rounded-sm"></div>
          </div>
          <div class="text-center">
            <p class="text-sm font-semibold text-[#1a3a35] mb-2">5. Done</p>
            <div class="h-2 bg-gray-400 rounded-sm"></div>
          </div>
        </div>

        <!-- Progress Steps Mobile -->
        <div class="flex items-center justify-between mb-8 sm:hidden px-2">
          <!-- Step 1 -->
          <div class="flex items-center flex-1">
            <div
              class="h-10 w-10 bg-[#1a3a35] rounded-full flex items-center justify-center shrink-0"
            >
              <p class="text-sm font-semibold text-white">S</p>
            </div>
            <div class="h-0.5 bg-gray-300 flex-1 mx-1"></div>
          </div>
          <!-- Step 2 -->
          <div class="flex items-center flex-1">
            <div
              class="h-10 w-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shrink-0"
            >
              <p class="text-sm font-semibold text-gray-400">T</p>
            </div>
            <div class="h-0.5 bg-gray-300 flex-1 mx-1"></div>
          </div>
          <!-- Step 3 -->
          <div class="flex items-center flex-1">
            <div
              class="h-10 w-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shrink-0"
            >
              <p class="text-sm font-semibold text-gray-400">D</p>
            </div>
            <div class="h-0.5 bg-gray-300 flex-1 mx-1"></div>
          </div>
          <!-- Step 4 -->
          <div class="flex items-center flex-1">
            <div
              class="h-10 w-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shrink-0"
            >
              <p class="text-sm font-semibold text-gray-400">P</p>
            </div>
            <div class="h-0.5 bg-gray-300 flex-1 mx-1"></div>
          </div>
          <!-- Step 5 -->
          <div class="flex items-center">
            <div
              class="h-10 w-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shrink-0"
            >
              <p class="text-sm font-semibold text-gray-400">D</p>
            </div>
          </div>
        </div>

        <!-- Form Instruction -->
        <p class="text-[#1a3a35] font-semibold mb-4">
          Please select the <span class="text-red-600">Type</span> First:
        </p>

        <!-- Form Fields -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <!-- Type -->
          <div>
            <label class="block text-[#1a3a35] font-semibold mb-2">Type</label>
            <select
              class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white"
            >
              <option>I am a...</option>
            </select>
          </div>
          <!-- Service -->
          <div>
            <label class="block text-[#1a3a35] font-semibold mb-2"
              >Service</label
            >
            <select
              class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white"
            >
              <option>Select service</option>
            </select>
          </div>
          <!-- Lane -->
          <div>
            <label class="block text-[#1a3a35] font-semibold mb-2">Lane</label>
            <select
              class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white"
            >
              <option>Please select a Lane</option>
            </select>
          </div>
          <!-- Duration -->
          <div>
            <label class="block text-[#1a3a35] font-semibold mb-2"
              >Duration (Hours)</label
            >
            <div
              class="flex items-center border border-gray-300 rounded bg-white"
            >
              <button
                type="button"
                @click="decreaseDuration"
                :disabled="duration <= minDuration"
                class="px-4 py-3 text-[#1a3a35] font-bold hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                -
              </button>
              <span
                class="flex-1 text-center text-gray-600 py-3 font-medium select-none"
              >
                {{ formattedDuration }}
              </span>
              <button
                type="button"
                @click="increaseDuration"
                :disabled="duration >= maxDuration"
                class="px-4 py-3 text-[#1a3a35] font-bold hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <!-- Select Date -->
        <div class="max-w-xs mb-8">
          <label class="block text-[#1a3a35] font-semibold mb-2"
            >Select a Date</label
          >
          <input
            type="date"
            class="w-full border border-gray-300 rounded px-4 py-3 text-gray-600 bg-white"
          />
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-300 mb-6"></div>

        <!-- Next Button -->
        <div class="flex justify-end">
          <button
            class="bg-[#1a3a35] text-white px-12 py-4 rounded font-semibold tracking-wide hover:bg-[#2a4a45] transition-colors"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

  const duration = ref(1);
  const minDuration = 1;
  const maxDuration = 9;

  const formattedDuration = computed(() => {
    const hours = Math.floor(duration.value);
    const minutes = (duration.value % 1) * 60;
    if (minutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${minutes}m`;
  });

  const increaseDuration = () => {
    if (duration.value < maxDuration) {
      duration.value += 0.5;
    }
  };

  const decreaseDuration = () => {
    if (duration.value > minDuration) {
      duration.value -= 0.5;
    }
  };
</script>
