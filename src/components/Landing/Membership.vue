<template>
  <div class="min-h-screen bg-[#faf9f7] py-8 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl sm:text-4xl font-bold text-[#1a3a35] mb-3">
          Choose Your Membership
        </h1>
        <p class="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
          Select the plan that fits you best. You can only purchase one
          membership at a time.
        </p>
      </div>

      <!-- Not Logged In -->
      <div
        v-if="!currentUser"
        class="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-8 mb-8 text-center shadow-2xl shadow-black/20 relative overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none"
        ></div>
        <div class="relative z-10">
          <div
            class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-600/10 border border-emerald-500/20 flex items-center justify-center"
          >
            <svg
              class="w-8 h-8 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 class="text-white font-bold text-lg mb-2">Already a member?</h3>
          <p class="text-white/60 text-sm mb-6 max-w-md mx-auto">
            Log in to your account to view and purchase exclusive membership
            plans.
          </p>
          <router-link
            to="/member/login"
            class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:from-emerald-400 hover:to-green-500 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
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
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Log In to Continue
          </router-link>
        </div>
      </div>

      <!-- register small card line -->
      <div
        v-if="!currentUser"
        class="mb-8 -mt-4 flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div
            class="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0"
          >
            <svg
              class="w-5 h-5 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <div class="min-w-0">
            <p class="text-sm font-semibold text-[#1a3a35] truncate">
              New here?
            </p>
            <p class="text-xs text-gray-500 truncate">
              Create your account to unlock memberships.
            </p>
          </div>
        </div>
        <router-link
          to="/member/register"
          class="inline-flex items-center gap-1.5 bg-[#1a3a35] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#2a4a45] transition-colors whitespace-nowrap"
        >
          Register
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </router-link>
      </div>

      <!-- Loading -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center py-20"
      >
        <div
          class="w-10 h-10 border-4 border-[#1a3a35] border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-gray-500 text-sm">Loading memberships...</p>
      </div>

      <!-- Empty -->
      <div
        v-else-if="memberships.length === 0"
        class="text-center py-20"
      >
        <div
          class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            ></path>
          </svg>
        </div>
        <p class="text-gray-500 text-sm">
          No memberships available at the moment.
        </p>
      </div>

      <!-- Membership Grid -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="m in memberships"
          :key="m._id"
          @click="selectMembership(m._id)"
          class="relative bg-white rounded-2xl border-2 p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:shadow-xl flex flex-col"
          :class="
            selectedId === m._id
              ? 'border-[#1a3a35] shadow-lg ring-2 ring-[#1a3a35]/10'
              : 'border-transparent shadow-md hover:border-[#1a3a35]/30'
          "
        >
          <!-- Selected Badge -->
          <div
            v-if="selectedId === m._id"
            class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a3a35] text-white text-xs font-semibold px-4 py-1 rounded-full"
          >
            Selected
          </div>

          <!-- Content -->
          <div class="flex-1">
            <!-- Name -->
            <h3 class="text-lg sm:text-xl font-bold text-[#1a3a35] mb-3 mt-2">
              {{ m.name }}
            </h3>

            <!-- Description -->
            <p class="text-gray-500 text-sm leading-relaxed mb-6">
              {{ m.description }}
            </p>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-3xl sm:text-4xl font-bold text-[#1a3a35]">
              A${{ m.price }}
            </span>
            <span class="text-gray-400 text-sm">
              / {{ m.durationDays }} days
            </span>
          </div>

          <!-- Select Button -->
          <button
            @click.stop="selectMembership(m._id)"
            class="w-full py-3 rounded-xl font-semibold text-sm transition-colors mt-auto"
            :class="
              selectedId === m._id
                ? 'bg-[#1a3a35] text-white'
                : 'bg-gray-100 text-[#1a3a35] hover:bg-[#1a3a35] hover:text-white'
            "
          >
            {{ selectedId === m._id ? "Selected" : "Select" }}
          </button>
        </div>
      </div>
      <!-- term&condtion -->
      <section class="mt-16 mb-12">
        <div class="text-center mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-[#1a3a35]">
            ECC Membership Terms &amp; Conditions
          </h2>
          <div
            class="mt-3 h-[2px] w-full max-w-3xl mx-auto bg-gradient-to-r from-transparent via-[#1a3a35]/40 to-transparent"
          ></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left: Fees -->
          <div
            class="bg-white border border-gray-100 rounded-2xl shadow-md p-6 sm:p-8"
          >
            <h3 class="text-lg font-bold text-[#1a3a35] text-center mb-6">
              ECC Membership Fees
            </h3>

            <div class="space-y-4">
              <div
                v-for="fee in membershipFees"
                :key="fee.title"
                class="border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-emerald-300 hover:shadow-sm transition-all"
              >
                <h4 class="text-sm sm:text-base font-bold text-[#1a3a35]">
                  {{ fee.title }}
                </h4>
                <p class="mt-1.5 text-sm">
                  <span class="text-emerald-700 font-bold">{{
                    fee.price
                  }}</span>
                  <span class="text-gray-500">
                    / {{ fee.unit }}
                    <span class="ml-2 text-xs text-gray-400">
                      {{ fee.renewal }}
                    </span>
                  </span>
                </p>
                <ul
                  class="mt-3 list-disc list-inside text-sm text-gray-600 space-y-1"
                >
                  <li>{{ fee.detail }}</li>
                </ul>
              </div>
            </div>

            <p class="text-center italic text-xs text-gray-500 mt-6 px-2">
              *This membership is exclusively for individuals and does not apply
              to coaches.*
            </p>

            <h3 class="mt-7 text-base font-bold text-[#1a3a35] text-center">
              Included Facilities
            </h3>
            <ul
              class="mt-3 list-disc list-inside text-sm text-gray-600 space-y-1.5"
            >
              <li>
                <span class="font-semibold text-[#1a3a35]">Cricket Lanes</span>
                – For batting, bowling and general practice. (2h Per day)
              </li>
              <li>
                <span class="font-semibold text-[#1a3a35]"
                  >Bowling Machines</span
                >
                – High-quality machines available for members. (1h Per day)
              </li>
              <li>
                <span class="font-semibold text-[#1a3a35]">Gym Access</span>
                – Strength &amp; conditioning area. (1h Per day)
              </li>
            </ul>
          </div>

          <!-- Right: Policies -->
          <div
            class="bg-white border border-gray-100 rounded-2xl shadow-md p-6 sm:p-8 space-y-6"
          >
            <div>
              <h3 class="text-base font-bold text-[#1a3a35] text-center mb-2">
                Operating Hours
              </h3>
              <p class="text-sm text-gray-600">
                Facilities are available for members from
                <span class="font-semibold text-[#1a3a35]"
                  >9:30 AM to 11:00 PM</span
                >, subject to lane availability and session scheduling.
              </p>
            </div>

            <div>
              <h3 class="text-base font-bold text-[#1a3a35] text-center mb-3">
                Daily Usage Limits
              </h3>
              <div class="text-sm text-gray-600 space-y-2">
                <p>
                  <span class="font-semibold text-[#1a3a35]"
                    >Cricket Facilities —</span
                  >
                  Members may use the cricket lanes for a
                  <span class="font-semibold text-[#1a3a35]"
                    >maximum of 2 hours per day</span
                  >.
                </p>
                <p>
                  <span class="font-semibold text-[#1a3a35]"
                    >Bowling Machines —</span
                  >
                  Use of bowling machines is limited to
                  <span class="font-semibold text-[#1a3a35]"
                    >1 hour per day</span
                  >
                  per membership.
                </p>
                <p>
                  <span class="font-semibold text-[#1a3a35]">Gym Access —</span>
                  The gym can be used for
                  <span class="font-semibold text-[#1a3a35]"
                    >1 hour per day</span
                  >
                  per membership.
                </p>
              </div>
            </div>

            <div>
              <h3 class="text-base font-bold text-[#1a3a35] text-center mb-2">
                Guest Policy
              </h3>
              <p class="text-sm text-gray-600 text-center">
                We welcome members to train with a Partner. <br />
                Each member can bring one guest to enjoy and share the full
                member benefits during their visit. <br />
                For any additional players,
                <span class="font-semibold text-[#1a3a35]">$25</span> per person
                will be charged per Session.
              </p>
            </div>

            <div>
              <h3 class="text-base font-bold text-[#1a3a35] text-center mb-2">
                Session Attendance Requirement
              </h3>
              <p class="text-sm text-gray-600">
                The
                <span class="font-semibold text-[#1a3a35]"
                  >registered membership owner must be physically present</span
                >
                for all booked or attended sessions. Memberships cannot be
                shared, loaned, or transferred.
              </p>
            </div>

            <div>
              <h3 class="text-base font-bold text-[#1a3a35] text-center mb-2">
                Offer Validity
              </h3>
              <p class="text-sm text-gray-600">
                This membership program and its benefits are available during
                the period of
                <span class="font-semibold text-[#1a3a35]"
                  >October to April</span
                >
                (inclusive).
              </p>
            </div>

            <div>
              <h3 class="text-base font-bold text-[#1a3a35] text-center mb-2">
                Important Notes
              </h3>
              <ul
                class="list-disc list-inside text-sm text-gray-600 space-y-1.5"
              >
                <li>
                  All bookings must be made through the official Member booking
                  system. (Not Lane Booking System)
                </li>
                <li>
                  Lane and equipment use is subject to availability and centre
                  guidelines.
                </li>
                <li>
                  The centre reserves the right to update or adjust these terms
                  with prior notice.
                </li>
                <li>
                  This membership is exclusively for individuals and does not
                  apply to coaches.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- reachout -->
      <section class="mt-16 mb-12">
        <div class="text-center mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-[#1a3a35]">
            Reach Out to the Elite Cricket Centre
          </h2>
          <p class="mt-3 text-sm italic text-gray-600 max-w-2xl mx-auto">
            We're here to help you reach your goals — whether you need member
            details, booking support, or directions to our center. <br />
            Contact us in the way that suits you best.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <a
            href="tel:+610390675696"
            class="group bg-gradient-to-b from-white to-gray-50 border border-gray-100 rounded-2xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div
              class="w-14 h-14 mx-auto rounded-full bg-[#1a3a35] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
            >
              <svg
                class="w-6 h-6 text-amber-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"
                />
              </svg>
            </div>
            <p class="text-base font-semibold text-[#1a3a35]">Call Us</p>
          </a>

          <a
            href="mailto:info@elitecricketcentre.com"
            class="group bg-gradient-to-b from-white to-gray-50 border border-gray-100 rounded-2xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div
              class="w-14 h-14 mx-auto rounded-full bg-[#1a3a35] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
            >
              <svg
                class="w-6 h-6 text-amber-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                />
              </svg>
            </div>
            <p class="text-base font-semibold text-[#1a3a35]">Email us</p>
          </a>

          <a
            href="https://elitecricketcentre.com.au/contact-us/"
            target="_blank"
            rel="noopener"
            class="group bg-gradient-to-b from-white to-gray-50 border border-gray-100 rounded-2xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div
              class="w-14 h-14 mx-auto rounded-full bg-[#1a3a35] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
            >
              <svg
                class="w-6 h-6 text-amber-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2a8 8 0 00-8 8c0 5.4 7.05 11.5 7.35 11.76a1 1 0 001.3 0C12.95 21.5 20 15.4 20 10a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"
                />
              </svg>
            </div>
            <p class="text-base font-semibold text-[#1a3a35]">Locate Us</p>
          </a>
        </div>
      </section>

      <!-- Bottom Action -->
      <div
        v-if="selectedId && !isLoading"
        class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 sm:p-6 z-50"
      >
        <div
          class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div class="text-center sm:text-left">
            <p class="text-sm text-gray-500">Selected plan</p>
            <p class="text-lg font-bold text-[#1a3a35]">
              {{ selectedMembership?.name }} — A${{ selectedMembership?.price }}
            </p>
          </div>
          <button
            @click="proceedToPayment"
            class="w-full sm:w-auto bg-[#1a3a35] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2a4a45] transition-colors text-sm"
          >
            Continue to Payment
          </button>
        </div>
      </div>

      <!-- Spacer for fixed bottom bar -->
      <div
        v-if="selectedId"
        class="h-24"
      ></div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { GetMembershipsPublic } from "@/services/apiService.js";

  const router = useRouter();
  const memberships = ref([]);
  const isLoading = ref(true);
  const selectedId = ref(null);

  const membershipFees = [
    {
      title: "Cricket Only Weekly Membership",
      price: "$85",
      unit: "week",
      renewal: "This will automatically renew every week",
      detail:
        "Full access to designated cricket facilities throughout the membership period.",
    },
    {
      title: "Cricket + Gym Weekly Membership",
      price: "$100",
      unit: "week",
      renewal: "This will automatically renew every week",
      detail:
        "Full access to cricket facilities with Elite power hub Gym access.",
    },
    {
      title: "Cricket-Only Monthly Membership",
      price: "$340",
      unit: "month",
      renewal: "This will automatically renew every month",
      detail:
        "Full access to designated cricket facilities throughout the membership period.",
    },
    {
      title: "Cricket + Gym Monthly Membership",
      price: "$390",
      unit: "month",
      renewal: "This will automatically renew every month",
      detail:
        "Full access to cricket facilities with Elite power hub Gym access.",
    },
  ];

  const selectedMembership = computed(() => {
    return memberships.value.find((m) => m._id === selectedId.value) || null;
  });

  const currentUser = computed(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  async function fetchMemberships() {
    isLoading.value = true;
    try {
      const response = await GetMembershipsPublic();
      if (response.isSuccess) {
        memberships.value = response.value || [];
      }
    } catch (error) {
      console.error("Error fetching memberships:", error);
    } finally {
      isLoading.value = false;
    }
  }

  function selectMembership(id) {
    selectedId.value = id;
  }

  function proceedToPayment() {
    if (!selectedId.value) return;
    const user = currentUser.value;
    if (!user || !user.id) {
      alert("Please log in to purchase a membership.");
      router.push("/member/login");
      return;
    }
    router.push(
      `/member/payment?membership=${selectedId.value}&userId=${user.id}`,
    );
  }

  onMounted(() => {
    fetchMemberships();
  });
</script>
