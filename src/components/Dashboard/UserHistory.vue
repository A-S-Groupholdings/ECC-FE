<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <div class="gap-4 pr-0 md:pr-24 mt-5">
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
      >
        <div>
          <h1 class="md:text-2xl sm:text-lg font-bold text-primary">
            User History
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Select a user to view their bookings, payments and membership
            activity.
          </p>
        </div>
        <button
          v-if="selectedUser"
          @click="clearSelection"
          class="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
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
          Back to users
        </button>
      </div>

      <!-- ─── USER LIST ─────────────────────────────────────────────────── -->
      <template v-if="!selectedUser">
        <!-- Search -->
        <div class="mb-6">
          <div class="relative max-w-sm">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, email or phone"
              class="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a35] focus:border-transparent"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg
                class="w-4 h-4 text-gray-400 hover:text-gray-600"
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
            </button>
          </div>
        </div>

        <!-- Loading -->
        <div
          v-if="isLoadingUsers"
          class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center text-gray-500 text-sm"
        >
          <Spinner class="inline mr-2" />
          Loading users...
        </div>

        <!-- Table -->
        <div
          v-else
          class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50">
                  <th class="th">Name</th>
                  <th class="th">Email</th>
                  <th class="th">Phone</th>
                  <th class="th">Role</th>
                  <th class="th text-center">History</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="user in filteredUsers"
                  :key="user._id"
                  @click="selectUser(user)"
                  class="hover:bg-green-50/60 transition-colors cursor-pointer"
                >
                  <td class="px-4 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a3a35] to-green-600 text-white text-xs font-bold flex items-center justify-center shrink-0"
                      >
                        {{ initials(user.name) }}
                      </div>
                      <span class="text-sm font-medium text-gray-900">
                        {{ user.name }}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.email }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {{ user.phoneNumber || "-" }}
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap">
                    <span
                      class="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                      :class="
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      "
                    >
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-4 py-4 whitespace-nowrap text-center">
                    <span
                      class="inline-flex items-center gap-1 text-[#1a3a35] hover:text-green-600 font-medium text-sm"
                    >
                      View
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
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </span>
                  </td>
                </tr>
                <tr v-if="filteredUsers.length === 0">
                  <td
                    colspan="5"
                    class="px-4 py-10 text-center text-sm text-gray-400"
                  >
                    No users found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p class="text-sm text-gray-500 mt-6">
          Showing {{ filteredUsers.length }} of {{ users.length }} users
        </p>
      </template>

      <!-- ─── USER DETAIL ───────────────────────────────────────────────── -->
      <template v-else>
        <!-- Loading -->
        <div
          v-if="isLoadingActivity"
          class="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center text-gray-500 text-sm"
        >
          <Spinner class="inline mr-2" />
          Loading activity for {{ selectedUser.name }}...
        </div>

        <!-- Error -->
        <div
          v-else-if="activityError"
          class="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-sm"
        >
          {{ activityError }}
        </div>

        <template v-else-if="activity">
          <!-- Profile + Membership -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <!-- Profile card -->
            <div
              class="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <div class="flex items-start gap-4">
                <div
                  class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a3a35] to-green-600 text-white text-xl font-bold flex items-center justify-center shrink-0"
                >
                  {{ initials(activity.user?.name) }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <h2 class="text-xl font-bold text-gray-900 truncate">
                      {{ activity.user?.name }}
                    </h2>
                    <span
                      class="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                      :class="
                        activity.user?.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      "
                    >
                      {{ activity.user?.role }}
                    </span>
                    <span
                      class="text-xs font-semibold px-2.5 py-1 rounded-full"
                      :class="
                        activity.user?.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      "
                    >
                      {{ activity.user?.isActive ? "Active" : "Inactive" }}
                    </span>
                  </div>
                  <div
                    class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm"
                  >
                    <div class="flex items-center gap-2 text-gray-600">
                      <svg
                        class="w-4 h-4 text-gray-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span class="truncate">{{ activity.user?.email }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-600">
                      <svg
                        class="w-4 h-4 text-gray-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                      <span>{{ activity.user?.phoneNumber || "-" }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-600">
                      <svg
                        class="w-4 h-4 text-gray-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span>Joined {{ fmtDate(activity.user?.joinedAt) }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-600">
                      <svg
                        class="w-4 h-4 text-gray-400 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                      <span>
                        {{ activity.summary?.totalActivities ?? 0 }} total
                        activities
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Membership status card -->
            <div
              class="rounded-2xl shadow-lg border p-6 text-white"
              :class="
                membershipStatus?.isActive
                  ? 'bg-gradient-to-br from-[#1a3a35] to-green-600 border-transparent'
                  : 'bg-gradient-to-br from-gray-500 to-gray-700 border-transparent'
              "
            >
              <div class="flex items-center justify-between">
                <p
                  class="text-xs font-semibold uppercase tracking-wider opacity-80"
                >
                  Membership
                </p>
                <span
                  class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 capitalize"
                >
                  {{ membershipStatus?.status || "none" }}
                </span>
              </div>
              <template v-if="membershipStatus?.membership">
                <p class="mt-2 font-bold leading-snug">
                  {{ membershipStatus.membership.name }}
                </p>
                <p class="text-xs opacity-80 mt-0.5">
                  {{ membershipStatus.membership.membershipID }} ·
                  {{ membershipStatus.membership.type }} · A${{
                    membershipStatus.membership.price
                  }}
                  / {{ membershipStatus.membership.durationDays }}d
                </p>
                <div class="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div class="bg-white/10 rounded-lg p-2">
                    <p class="opacity-70">Start</p>
                    <p class="font-semibold">
                      {{ fmtDate(membershipStatus.startDate) }}
                    </p>
                  </div>
                  <div class="bg-white/10 rounded-lg p-2">
                    <p class="opacity-70">End</p>
                    <p class="font-semibold">
                      {{ fmtDate(membershipStatus.endDate) }}
                    </p>
                  </div>
                  <div class="bg-white/10 rounded-lg p-2">
                    <p class="opacity-70">Days left</p>
                    <p class="font-semibold">
                      {{ membershipStatus.daysRemaining ?? "-" }}
                    </p>
                  </div>
                  <div class="bg-white/10 rounded-lg p-2">
                    <p class="opacity-70">Auto renew</p>
                    <p class="font-semibold">
                      {{ membershipStatus.autoRenew ? "Yes" : "No" }}
                    </p>
                  </div>
                </div>
              </template>
              <p
                v-else
                class="mt-4 text-sm opacity-80"
              >
                No active membership.
              </p>
            </div>
          </div>

          <!-- Summary stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard
              label="Total paid"
              :value="money(summary.payments?.totalPaid)"
              :sub="`Membership ${money(summary.payments?.totalPaidMembership)} · Bookings ${money(summary.payments?.totalPaidBooking)}`"
              tone="green"
            />
            <StatCard
              label="Bookings"
              :value="summary.bookings?.total ?? 0"
              :sub="`${summary.bookings?.byStatus?.confirmed ?? 0} confirmed · ${summary.bookings?.byStatus?.cancelled ?? 0} cancelled`"
              tone="blue"
            />
            <StatCard
              label="Payments"
              :value="summary.payments?.total ?? 0"
              :sub="`${summary.payments?.byStatus?.success ?? 0} success · ${summary.payments?.byStatus?.pending ?? 0} pending`"
              tone="purple"
            />
            <StatCard
              label="Memberships"
              :value="summary.memberships?.total ?? 0"
              :sub="`${summary.memberships?.active ?? 0} active · ${summary.memberships?.cancelled ?? 0} cancelled`"
              tone="orange"
            />
          </div>

          <!-- Tabs -->
          <div
            class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div class="px-4 pt-3 border-b border-gray-200 overflow-x-auto">
              <div class="flex gap-1 min-w-max">
                <button
                  v-for="tab in tabs"
                  :key="tab.key"
                  @click="activeTab = tab.key"
                  class="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2"
                  :class="
                    activeTab === tab.key
                      ? 'border-[#1a3a35] text-[#1a3a35]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  "
                >
                  {{ tab.label }}
                  <span
                    class="text-[11px] px-1.5 py-0.5 rounded-full"
                    :class="
                      activeTab === tab.key
                        ? 'bg-[#1a3a35] text-white'
                        : 'bg-gray-100 text-gray-600'
                    "
                  >
                    {{ tab.count }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Timeline -->
            <div
              v-if="activeTab === 'timeline'"
              class="p-6"
            >
              <EmptyState
                v-if="!activity.activityTimeline?.length"
                text="No activity yet"
              />
              <ol
                v-else
                class="relative border-l-2 border-gray-100 ml-3 space-y-6"
              >
                <li
                  v-for="item in activity.activityTimeline"
                  :key="item.type + item.refId + item.at"
                  class="ml-6 relative"
                >
                  <span
                    class="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white shadow"
                    :class="timelineDot(item.type)"
                  ></span>
                  <div
                    class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2"
                  >
                    <div class="min-w-0">
                      <div class="flex flex-wrap items-center gap-2">
                        <span
                          class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                          :class="timelineBadge(item.type)"
                        >
                          {{ item.type.replace("_", " ") }}
                        </span>
                        <StatusPill :status="item.status" />
                      </div>
                      <p class="text-sm font-semibold text-gray-800 mt-1">
                        {{ item.title }}
                      </p>
                      <p class="text-xs text-gray-500 mt-0.5">
                        <template
                          v-if="item.details?.booking || item.details?.date"
                        >
                          {{
                            fmtDate(
                              item.details.booking?.date || item.details.date,
                            )
                          }}
                          ·
                          {{
                            item.details.booking?.startTime ||
                            item.details.startTime
                          }}
                          -
                          {{
                            item.details.booking?.endTime ||
                            item.details.endTime
                          }}
                          <template v-if="item.details.resource?.title">
                            · {{ item.details.resource.title }}
                          </template>
                        </template>
                        <template v-else-if="item.details?.startDate">
                          {{ fmtDate(item.details.startDate) }} →
                          {{ fmtDate(item.details.endDate) }}
                          · Auto renew
                          {{ item.details.autoRenew ? "on" : "off" }}
                        </template>
                        <template v-if="item.details?.paymentMethod">
                          <span class="capitalize">
                            · {{ item.details.paymentMethod }}
                          </span>
                        </template>
                      </p>
                    </div>
                    <div class="text-right shrink-0">
                      <p
                        v-if="item.amount !== null && item.amount !== undefined"
                        class="text-sm font-bold text-gray-900"
                      >
                        {{ money(item.amount) }}
                      </p>
                      <p class="text-xs text-gray-400">
                        {{ fmtDateTime(item.at) }}
                      </p>
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            <!-- Bookings -->
            <div
              v-else-if="activeTab === 'bookings'"
              class="overflow-x-auto"
            >
              <EmptyState
                v-if="!activity.bookingHistory?.length"
                text="No bookings"
              />
              <table
                v-else
                class="w-full"
              >
                <thead>
                  <tr class="border-b border-gray-200 bg-gray-50">
                    <th class="th">Booking</th>
                    <th class="th">Date & Time</th>
                    <th class="th">Center</th>
                    <th class="th">Resource</th>
                    <th class="th">Service</th>
                    <th class="th">Status</th>
                    <th class="th">Payment</th>
                    <th class="th text-right">Price</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr
                    v-for="b in activity.bookingHistory"
                    :key="b._id"
                    class="hover:bg-gray-50"
                  >
                    <td class="td font-semibold text-gray-900">
                      {{ b.bookingId }}
                    </td>
                    <td class="td">
                      <div>{{ fmtDate(b.date) }}</div>
                      <div class="text-xs text-gray-500">
                        {{ b.startTime }} - {{ b.endTime }} ({{ b.duration }}m)
                      </div>
                    </td>
                    <td class="td">{{ b.center?.name || "-" }}</td>
                    <td class="td">{{ b.resource?.title || "-" }}</td>
                    <td class="td">
                      <div>{{ b.service?.title || "-" }}</div>
                      <div
                        v-if="b.category"
                        class="text-xs text-gray-500"
                      >
                        {{ b.category.categoryName }}
                      </div>
                    </td>
                    <td class="td"><StatusPill :status="b.status" /></td>
                    <td class="td"><StatusPill :status="b.paymentStatus" /></td>
                    <td class="td text-right font-semibold">
                      {{ money(b.service?.price) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Payments (membership / booking) -->
            <div
              v-else-if="
                activeTab === 'membershipPayments' ||
                activeTab === 'bookingPayments'
              "
              class="overflow-x-auto"
            >
              <EmptyState
                v-if="!currentPayments.length"
                text="No payments"
              />
              <table
                v-else
                class="w-full"
              >
                <thead>
                  <tr class="border-b border-gray-200 bg-gray-50">
                    <th class="th">Date</th>
                    <th class="th">
                      {{
                        activeTab === "membershipPayments"
                          ? "Membership"
                          : "Booking"
                      }}
                    </th>
                    <th class="th">Method</th>
                    <th class="th">Status</th>
                    <th class="th">Reference</th>
                    <th class="th text-right">Amount</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr
                    v-for="p in currentPayments"
                    :key="p._id"
                    class="hover:bg-gray-50"
                  >
                    <td class="td">
                      <div>{{ fmtDate(p.paidAt || p.createdAt) }}</div>
                      <div class="text-xs text-gray-500">
                        {{ fmtTime(p.paidAt || p.createdAt) }}
                      </div>
                    </td>
                    <td class="td">
                      <template v-if="p.membership">
                        <div class="font-medium text-gray-900">
                          {{ p.membership.name }}
                        </div>
                        <div class="text-xs text-gray-500">
                          {{ p.membership.membershipID }} ·
                          {{ p.membership.type }}
                        </div>
                      </template>
                      <template v-else-if="p.booking">
                        <div class="font-medium text-gray-900">
                          {{ p.booking.bookingId }}
                        </div>
                        <div class="text-xs text-gray-500">
                          {{ fmtDate(p.booking.date) }} ·
                          {{ p.booking.startTime }} - {{ p.booking.endTime }}
                        </div>
                      </template>
                      <template v-else>
                        <div class="font-medium text-gray-700">
                          {{ bookingRefFromNotes(p.notes) || "-" }}
                        </div>
                        <div class="text-xs text-gray-400">
                          Booking no longer available
                        </div>
                      </template>
                    </td>
                    <td class="td capitalize">{{ p.paymentMethod || "-" }}</td>
                    <td class="td"><StatusPill :status="p.status" /></td>
                    <td class="td">
                      <span
                        class="text-xs text-gray-500 font-mono truncate block max-w-[180px]"
                        :title="p.stripePaymentIntentId || p.stripeSessionId"
                      >
                        {{
                          p.stripePaymentIntentId || p.stripeSessionId || "-"
                        }}
                      </span>
                    </td>
                    <td class="td text-right font-semibold text-gray-900">
                      {{ money(p.amount, p.currency) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Memberships -->
            <div
              v-else-if="activeTab === 'memberships'"
              class="p-6"
            >
              <EmptyState
                v-if="!activity.membershipHistory?.length"
                text="No membership history"
              />
              <div
                v-else
                class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                <div
                  v-for="m in activity.membershipHistory"
                  :key="m._id"
                  class="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0">
                      <p class="text-sm font-bold text-gray-900 leading-snug">
                        {{ m.membership?.name || "-" }}
                      </p>
                      <p class="text-xs text-gray-500 mt-0.5">
                        {{ m.membership?.membershipID }} ·
                        {{ m.membership?.type }}
                      </p>
                    </div>
                    <StatusPill :status="m.status" />
                  </div>
                  <div class="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p class="text-gray-400">Start</p>
                      <p class="font-semibold text-gray-800">
                        {{ fmtDate(m.startDate) }}
                      </p>
                    </div>
                    <div>
                      <p class="text-gray-400">End</p>
                      <p class="font-semibold text-gray-800">
                        {{ fmtDate(m.endDate) }}
                      </p>
                    </div>
                    <div>
                      <p class="text-gray-400">Price</p>
                      <p class="font-semibold text-gray-800">
                        {{ money(m.membership?.price) }}
                      </p>
                    </div>
                    <div>
                      <p class="text-gray-400">Auto renew</p>
                      <p class="font-semibold text-gray-800">
                        {{ m.autoRenew ? "Yes" : "No" }}
                      </p>
                    </div>
                  </div>
                  <p
                    v-if="m.stripeSubscriptionId"
                    class="mt-3 text-[11px] text-gray-400 font-mono truncate"
                    :title="m.stripeSubscriptionId"
                  >
                    {{ m.stripeSubscriptionId }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted, h } from "vue";
  import { GetUsersAll, GetUserActivity } from "@/services/apiService.js";
  import Nav from "../Dashboard/UI/SecondNav.vue";

  // ─── Users list ─────────────────────────────────────────────────────────────
  const users = ref([]);
  const isLoadingUsers = ref(false);
  const searchQuery = ref("");

  async function fetchUsers() {
    isLoadingUsers.value = true;
    try {
      const res = await GetUsersAll();
      if (res.isSuccess) users.value = res.value || [];
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      isLoadingUsers.value = false;
    }
  }

  onMounted(fetchUsers);

  const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value;
    const q = searchQuery.value.toLowerCase();
    return users.value.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phoneNumber?.includes(q),
    );
  });

  // ─── Activity ───────────────────────────────────────────────────────────────
  const selectedUser = ref(null);
  const activity = ref(null);
  const isLoadingActivity = ref(false);
  const activityError = ref("");
  const activeTab = ref("timeline");

  async function selectUser(user) {
    selectedUser.value = user;
    activity.value = null;
    activityError.value = "";
    activeTab.value = "timeline";
    isLoadingActivity.value = true;
    try {
      const res = await GetUserActivity(user.email);
      if (res.isSuccess) {
        activity.value = res.value || {};
      } else {
        activityError.value =
          res.errorMessage ||
          res.userMessage ||
          "Failed to load user activity.";
      }
    } catch (error) {
      activityError.value = "Network error. Please try again.";
    } finally {
      isLoadingActivity.value = false;
    }
  }

  function clearSelection() {
    selectedUser.value = null;
    activity.value = null;
    activityError.value = "";
  }

  const summary = computed(() => activity.value?.summary || {});
  const membershipStatus = computed(() => activity.value?.membershipStatus);

  const tabs = computed(() => [
    {
      key: "timeline",
      label: "Timeline",
      count: activity.value?.activityTimeline?.length || 0,
    },
    {
      key: "bookings",
      label: "Bookings",
      count: activity.value?.bookingHistory?.length || 0,
    },
    {
      key: "membershipPayments",
      label: "Membership Payments",
      count: activity.value?.membershipPaymentHistory?.length || 0,
    },
    {
      key: "bookingPayments",
      label: "Booking Payments",
      count: activity.value?.bookingPaymentHistory?.length || 0,
    },
    {
      key: "memberships",
      label: "Memberships",
      count: activity.value?.membershipHistory?.length || 0,
    },
  ]);

  const currentPayments = computed(() =>
    activeTab.value === "membershipPayments"
      ? activity.value?.membershipPaymentHistory || []
      : activity.value?.bookingPaymentHistory || [],
  );

  // ─── Formatting helpers ─────────────────────────────────────────────────────
  function initials(name) {
    if (!name) return "?";
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join("");
  }

  function fmtDate(d) {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function fmtTime(d) {
    if (!d) return "";
    return new Date(d).toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function fmtDateTime(d) {
    if (!d) return "-";
    return `${fmtDate(d)} ${fmtTime(d)}`;
  }

  function money(amount, currency = "aud") {
    if (amount === null || amount === undefined) return "-";
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: (currency || "aud").toUpperCase(),
    }).format(Number(amount));
  }

  function bookingRefFromNotes(notes) {
    const m = notes?.match(/booking\s+(B\d+)/i);
    return m ? m[1] : null;
  }

  function timelineDot(type) {
    return (
      {
        BOOKING: "bg-blue-500",
        BOOKING_PAYMENT: "bg-purple-500",
        MEMBERSHIP: "bg-green-600",
        MEMBERSHIP_PAYMENT: "bg-orange-500",
      }[type] || "bg-gray-400"
    );
  }

  function timelineBadge(type) {
    return (
      {
        BOOKING: "bg-blue-100 text-blue-700",
        BOOKING_PAYMENT: "bg-purple-100 text-purple-700",
        MEMBERSHIP: "bg-green-100 text-green-700",
        MEMBERSHIP_PAYMENT: "bg-orange-100 text-orange-700",
      }[type] || "bg-gray-100 text-gray-700"
    );
  }

  // ─── Small inline components ────────────────────────────────────────────────
  const Spinner = {
    render: () =>
      h(
        "svg",
        {
          class: "w-6 h-6 animate-spin",
          fill: "none",
          viewBox: "0 0 24 24",
        },
        [
          h("circle", {
            class: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            "stroke-width": "4",
          }),
          h("path", {
            class: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
          }),
        ],
      ),
  };

  const StatusPill = {
    props: { status: String },
    setup(props) {
      const map = {
        success: "bg-green-100 text-green-700",
        paid: "bg-green-100 text-green-700",
        confirmed: "bg-green-100 text-green-700",
        completed: "bg-green-100 text-green-700",
        active: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        unpaid: "bg-orange-100 text-orange-700",
        onhold: "bg-yellow-100 text-yellow-700",
        on_hold: "bg-yellow-100 text-yellow-700",
        cancelled: "bg-red-100 text-red-700",
        failed: "bg-red-100 text-red-700",
        expired: "bg-gray-200 text-gray-700",
      };
      return () =>
        h(
          "span",
          {
            class: [
              "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize whitespace-nowrap",
              map[(props.status || "").toLowerCase()] ||
                "bg-gray-100 text-gray-700",
            ],
          },
          (props.status || "-").toLowerCase().replace("_", " "),
        );
    },
  };

  const StatCard = {
    props: {
      label: String,
      value: [String, Number],
      sub: String,
      tone: String,
    },
    setup(props) {
      const tones = {
        green: "bg-green-50 text-green-700 border-green-100",
        blue: "bg-blue-50 text-blue-700 border-blue-100",
        purple: "bg-purple-50 text-purple-700 border-purple-100",
        orange: "bg-orange-50 text-orange-700 border-orange-100",
      };
      return () =>
        h(
          "div",
          {
            class: [
              "rounded-2xl border p-4 shadow-sm",
              tones[props.tone] || tones.green,
            ],
          },
          [
            h(
              "p",
              {
                class:
                  "text-xs font-semibold uppercase tracking-wider opacity-80",
              },
              props.label,
            ),
            h(
              "p",
              { class: "text-2xl font-bold mt-1 text-gray-900" },
              props.value,
            ),
            props.sub &&
              h(
                "p",
                { class: "text-[11px] text-gray-500 mt-1 leading-snug" },
                props.sub,
              ),
          ],
        );
    },
  };

  const EmptyState = {
    props: { text: String },
    render() {
      return h(
        "div",
        { class: "p-10 text-center text-sm text-gray-400" },
        this.text,
      );
    },
  };
</script>

<style scoped>
  .th {
    @apply px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider;
  }
  .td {
    @apply px-4 py-3 text-sm text-gray-700 whitespace-nowrap;
  }
</style>
