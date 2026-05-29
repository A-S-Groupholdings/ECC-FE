<template>
  <main
    class="bg-gradient-to-br from-gray-50 to-gray-100 text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <div class="pr-0 md:pr-6 mt-5">
      <!-- Resource Selector (scrollable row) -->
      <div class="mb-4 overflow-x-auto pb-2">
        <div class="flex gap-2 min-w-max">
          <button
            v-for="resource in resources"
            :key="resource.id"
            @click="selectedResource = resource.id"
            :class="[
              'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg border text-xs font-medium transition-all min-w-[80px]',
              selectedResource === resource.id
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50',
            ]"
          >
            <!-- All icon -->
            <svg
              v-if="resource.id === 'all'"
              class="w-7 h-7"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
              />
            </svg>
            <!-- Person icon -->
            <svg
              v-else
              class="w-7 h-7"
              viewBox="0 0 24 24"
              fill="currentColor"
              opacity="0.6"
            >
              <path
                d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
              />
            </svg>
            <span>{{ resource.label }}</span>
          </button>
        </div>
      </div>

      <!-- Calendar Controls -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100"
      >
        <!-- Left: Nav + Today + Month Label -->
        <div class="flex items-center gap-2">
          <button
            @click="prevMonth"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-gray-600"
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
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button
            @click="nextMonth"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-gray-600"
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
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
          <button
            @click="goToToday"
            class="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 font-medium"
          >
            Today
          </button>
          <input
            type="date"
            :value="calendarDatePickerValue"
            @change="onCalendarDatePick($event)"
            class="px-2 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <h2 class="text-lg font-bold text-gray-800 ml-2">
            {{ currentMonthLabel }} {{ currentYear }} ▾
          </h2>
        </div>

        <!-- Right: View Switcher -->
        <div class="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            v-for="view in views"
            :key="view.key"
            @click="currentView = view.key"
            :class="[
              'px-3 py-1.5 text-sm rounded-md font-medium transition-colors',
              currentView === view.key
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            {{ view.label }}
          </button>
        </div>
      </div>

      <!-- MONTH VIEW -->
      <div
        v-if="currentView === 'month'"
        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <!-- Day headers -->
        <div class="grid grid-cols-7 border-b border-gray-100">
          <div
            v-for="day in weekDays"
            :key="day"
            class="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide"
          >
            {{ day }}
          </div>
        </div>

        <!-- Calendar grid -->
        <div class="grid grid-cols-7">
          <div
            v-for="(cell, idx) in calendarCells"
            :key="idx"
            @click="cell.day && selectDate(cell)"
            :class="[
              'min-h-[80px] sm:min-h-[100px] border-r border-b border-gray-50 p-1 sm:p-2 transition-colors',
              cell.day ? 'cursor-pointer hover:bg-blue-50' : 'bg-gray-50/50',
              cell.isToday ? 'bg-blue-50' : '',
              cell.isSelected
                ? 'bg-blue-100 ring-2 ring-blue-400 ring-inset'
                : '',
              idx % 7 === 6 ? 'border-r-0' : '',
            ]"
          >
            <div v-if="cell.day">
              <span
                :class="[
                  'inline-flex items-center justify-center w-7 h-7 text-sm font-medium rounded-full',
                  cell.isToday ? 'bg-blue-500 text-white' : 'text-gray-700',
                  cell.isSelected && !cell.isToday
                    ? 'bg-blue-200 text-blue-800'
                    : '',
                ]"
              >
                {{ cell.day }}
              </span>
              <!-- Appointment dots -->
              <div class="mt-1 space-y-0.5">
                <div
                  v-for="apt in getAppointmentsForDay(cell.day)"
                  :key="apt.id"
                  :class="[
                    'text-xs px-1 py-0.5 rounded truncate hidden sm:block',
                    apt.email === 'staff@ecc.com'
                      ? 'bg-purple-100 text-purple-800'
                      : apt.paymentStatus === 'PAID'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800',
                  ]"
                >
                  {{ apt.time }} {{ apt.name }}
                </div>
                <div class="sm:hidden">
                  <span
                    v-if="getAppointmentsForDay(cell.day).length"
                    class="w-2 h-2 rounded-full bg-green-500 inline-block"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Day Appointments Panel (Month view) -->
      <div
        v-if="currentView === 'month' && selectedCell"
        class="mt-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-5"
      >
        <h3 class="text-sm font-bold text-gray-800 mb-3">
          Appointments on {{ selectedCell.day }} {{ currentMonthLabel }}
          {{ currentYear }}
        </h3>
        <div
          v-if="getAppointmentsForDay(selectedCell.day).length === 0"
          class="text-sm text-gray-400"
        >
          No appointments on this day
        </div>
        <div
          v-else
          class="space-y-2"
        >
          <div
            v-for="apt in getAppointmentsForDay(selectedCell.day)"
            :key="apt.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 bg-gradient-to-br from-[#1a3a35] to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
              >
                {{ apt.name.charAt(0) }}
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-800">
                  {{ apt.name }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ apt.time }} · {{ apt.lane }}
                </p>
                <p class="text-[10px] text-gray-400">
                  {{ apt.phone || "No phone" }}
                </p>
              </div>
            </div>
            <span
              :class="[
                'text-xs px-2.5 py-1 rounded-full font-medium',
                apt.status === 'Confirmed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700',
              ]"
              >{{ apt.status }}</span
            >
          </div>
        </div>
      </div>

      <!-- DAY VIEW -->
      <div
        v-if="currentView === 'day'"
        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <!-- Day header -->
        <div
          class="px-4 py-3 border-b border-gray-100 flex items-center justify-between"
        >
          <h3 class="text-base font-bold text-gray-800">
            {{ selectedDayLabel }}
          </h3>
          <span class="text-xs text-gray-500">
            {{ dayResources.length }} resource{{
              dayResources.length === 1 ? "" : "s"
            }}
          </span>
        </div>

        <div
          v-if="dayResources.length === 0"
          class="p-8 text-center text-sm text-gray-400"
        >
          No resources to display.
        </div>

        <div v-else>
          <div class="flex w-full">
            <!-- Time labels column -->
            <div
              class="flex-shrink-0 w-16 border-r border-gray-100 bg-gray-50/60"
            >
              <div class="h-12 border-b border-gray-100"></div>
              <div
                v-for="hour in dayHourGrid"
                :key="'lbl-' + hour.hour24"
                class="h-[60px] border-b border-gray-100 px-2 pt-1 text-xs text-gray-500"
              >
                {{ hour.label }}
              </div>
            </div>

            <!-- Resource columns -->
            <div
              v-for="resource in dayResources"
              :key="resource.id"
              class="flex-1 min-w-0 border-r border-gray-100 last:border-r-0"
            >
              <!-- Resource header -->
              <div
                class="h-12 border-b border-gray-200 flex items-center justify-center bg-white px-1"
              >
                <span
                  class="text-xs font-semibold text-gray-800 truncate text-center leading-tight"
                  >{{ resource.label }}</span
                >
              </div>

              <!-- Schedule body -->
              <div class="relative bg-yellow-50/40">
                <!-- Hour grid (click targets) -->
                <div
                  v-for="hour in dayHourGrid"
                  :key="'cell-' + resource.id + '-' + hour.hour24"
                  @click="onDaySlotClick(resource, hour)"
                  :class="[
                    'h-[60px] border-b border-gray-100 transition-colors',
                    isWithinSchedule(resource, hour)
                      ? 'cursor-pointer hover:bg-blue-50/80'
                      : 'bg-gray-100/70 cursor-not-allowed',
                  ]"
                ></div>

                <!-- Booking blocks -->
                <div
                  v-for="apt in getBookingsForResourceColumn(resource)"
                  :key="apt.id"
                  @click.stop="openAppointmentDetails(apt)"
                  :style="{
                    top: blockTopPx(apt) + 'px',
                    height: blockHeightPx(apt) + 'px',
                  }"
                  :class="[
                    'absolute left-0.5 right-0.5 rounded-md border-l-4 p-1 text-[10px] overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow',
                    getBookingBlockColor(apt),
                  ]"
                >
                  <p class="font-bold text-gray-900">
                    {{ formatTime12(apt.startTime)
                    }}<span v-if="apt.endTime">
                      - {{ formatTime12(apt.endTime) }}</span
                    >
                  </p>
                  <p
                    v-if="apt.resourceName && apt.resourceName !== '-'"
                    class="text-gray-800 truncate"
                  >
                    {{ apt.resourceName }}
                  </p>
                  <p
                    v-if="apt.name && apt.name !== '-'"
                    class="text-gray-700 truncate"
                  >
                    {{ apt.name }}
                  </p>
                </div>

                <!-- Now line (only if today) -->
                <div
                  v-if="nowLineTopPx !== null"
                  :style="{ top: nowLineTopPx + 'px' }"
                  class="absolute left-0 right-0 z-10 pointer-events-none"
                >
                  <div class="relative h-0.5 bg-red-500">
                    <div
                      class="absolute -left-1 -top-1 w-3 h-3 rounded-full bg-red-500"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          v-if="calendarError"
          class="px-4 py-2 text-xs text-red-600"
        >
          {{ calendarError }}
        </p>
      </div>
    </div>
  </main>

  <!-- New Appointment Modal -->
  <div
    v-if="showNewAppointmentModal"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    @click="closeNewAppointmentModal"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Modal Header -->
      <div
        class="bg-gradient-to-r from-[#1a3a35] to-[#2a4a45] px-6 py-4 sticky top-0 z-10"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-bold text-white">New Appointment</h3>
          <button
            @click="closeNewAppointmentModal"
            class="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Body -->
      <div class="p-6 space-y-6">
        <!-- Step 1: User Search -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Step 1: Search & Select User <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              v-model="userSearchQuery"
              @input="searchUsers"
              type="text"
              placeholder="Search by name or email..."
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
            />
            <div
              v-if="userSearchResults.length > 0"
              class="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              <div
                v-for="user in userSearchResults"
                :key="user._id"
                @click="selectUser(user)"
                class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <p class="font-medium text-gray-900">{{ user.name }}</p>
                <p class="text-sm text-gray-500">{{ user.email }}</p>
              </div>
            </div>
          </div>
          <div
            v-if="selectedUser"
            class="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold text-gray-900">
                  {{ selectedUser.name }}
                </p>
                <p class="text-sm text-gray-600">{{ selectedUser.email }}</p>
                <p class="text-sm text-gray-600">
                  {{ selectedUser.phoneNumber }}
                </p>
              </div>
              <button
                @click="selectedUser = null"
                class="text-red-500 hover:text-red-700"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Step 2: Select Service -->
        <div v-if="selectedUser">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Step 2: Select Service <span class="text-red-500">*</span>
          </label>
          <select
            v-model="bookingForm.categoryId"
            @change="onServiceChange"
            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
          >
            <option value="">Select a service...</option>
            <option
              v-for="service in services"
              :key="service._id"
              :value="service._id"
            >
              {{ service.title }} ({{ service.duration }}) - ${{
                service.price
              }}
            </option>
          </select>

          <div
            v-if="bookingForm.categoryId"
            class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-blue-900">
                Duration Adjustment
              </h4>
              <span class="text-xs text-blue-600">Minimum: 30 min</span>
            </div>
            <div class="flex items-center gap-4">
              <button
                @click="decreaseDuration"
                :disabled="customDurationMinutes <= 30"
                class="w-10 h-10 bg-white border border-blue-300 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <div class="flex-1 text-center">
                <p class="text-2xl font-bold text-blue-900">
                  {{ formatDurationMinutes(customDurationMinutes) }}
                </p>
                <p class="text-xs text-blue-600 mt-1">
                  {{ customDurationMinutes }} minutes
                </p>
              </div>
              <button
                @click="increaseDuration"
                class="w-10 h-10 bg-white border border-blue-300 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-all"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            v-if="bookingForm.categoryId"
            class="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-green-900">Price</p>
                <p class="text-xs text-green-600 mt-1">
                  Based on
                  {{ formatDurationMinutes(customDurationMinutes) }} duration
                </p>
              </div>
              <div class="text-right flex items-center gap-2">
                <span class="text-2xl font-bold text-green-700">$</span>
                <input
                  v-model.number="customPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-28 px-3 py-2 text-2xl font-bold text-green-700 bg-white border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                />
              </div>
            </div>
            <p class="text-xs text-green-600 mt-2">
              Default: ${{ calculatePrice() }} — Edit above to override
            </p>
          </div>
        </div>

        <!-- Step 3: Select Resource -->
        <div v-if="selectedUser">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Step 3: Select Resource <span class="text-red-500">*</span>
          </label>
          <select
            v-model="bookingForm.resourceId"
            @change="onResourceChange"
            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
          >
            <option value="">Select a resource...</option>
            <option
              v-for="resource in allFilteredResources"
              :key="resource._id"
              :value="resource._id"
            >
              {{ resource.title }}
            </option>
          </select>
        </div>

        <!-- Step 4: Select Date -->
        <div v-if="bookingForm.resourceId">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Step 4: Select Date <span class="text-red-500">*</span>
          </label>
          <input
            v-model="bookingForm.date"
            @change="onDateChange"
            type="date"
            :min="new Date().toISOString().split('T')[0]"
            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
          />
        </div>

        <!-- Step 5: Select Time Slot -->
        <div v-if="bookingForm.date && availableSlots.length > 0">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Step 5: Select Time Slot <span class="text-red-500">*</span>
          </label>
          <div class="grid grid-cols-3 md:grid-cols-4 gap-2">
            <button
              v-for="slot in availableSlots"
              :key="slot.time"
              @click="bookingForm.startTime = slot.time"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                bookingForm.startTime === slot.time
                  ? 'bg-[#1a3a35] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
            >
              {{ slot.time }}
            </button>
          </div>
        </div>

        <div
          v-if="bookingForm.date && loadingSlots"
          class="text-center py-4"
        >
          <div
            class="inline-block w-6 h-6 border-2 border-[#1a3a35] border-t-transparent rounded-full animate-spin"
          ></div>
          <p class="text-sm text-gray-500 mt-2">Loading available slots...</p>
        </div>

        <div
          v-if="
            bookingForm.date && availableSlots.length === 0 && !loadingSlots
          "
          class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <p class="text-yellow-800 text-sm">
            No available slots for this date. Please select another date.
          </p>
        </div>

        <!-- Step 6: Notes (Optional) -->
        <div v-if="bookingForm.startTime">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Notes <span class="text-gray-400">(Optional)</span>
          </label>
          <textarea
            v-model="bookingForm.note"
            rows="3"
            placeholder="Add any notes for this appointment..."
            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35] resize-none"
          ></textarea>
        </div>
      </div>

      <!-- Modal Footer -->
      <div
        class="px-6 py-4 bg-gray-50 border-t border-gray-200 sticky bottom-0"
      >
        <div class="flex gap-3">
          <button
            @click="closeNewAppointmentModal"
            :disabled="isCreatingBooking"
            class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            @click="createAppointment"
            :disabled="!canCreateBooking || isCreatingBooking"
            class="flex-1 px-6 py-3 bg-[#1a3a35] text-white rounded-lg font-medium hover:bg-[#2a4a45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg
              v-if="isCreatingBooking"
              class="w-5 h-5 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {{ isCreatingBooking ? "Creating..." : "Create Appointment" }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Appointment Details / Edit Modal -->
  <div
    v-if="showDetailsModal"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    @click="closeDetailsModal"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Header -->
      <div
        class="bg-gradient-to-r from-[#1a3a35] to-[#2a4a45] px-6 py-4 sticky top-0 z-10"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-white">
            {{ isEditingBooking ? "Edit Appointment" : "Appointment Details" }}
          </h3>
          <button
            @click="closeDetailsModal"
            :disabled="isUpdatingBooking"
            class="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all disabled:opacity-50"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="p-6">
        <div
          v-if="isLoadingDetails"
          class="text-center py-10"
        >
          <div
            class="inline-block w-8 h-8 border-2 border-[#1a3a35] border-t-transparent rounded-full animate-spin"
          ></div>
          <p class="text-sm text-gray-500 mt-3">Loading booking details...</p>
        </div>

        <div
          v-else-if="detailsError"
          class="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
        >
          {{ detailsError }}
        </div>

        <div
          v-else-if="bookingDetails"
          class="space-y-5"
        >
          <!-- Booking ID & Status -->
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-500">Booking ID</p>
              <p class="text-base font-bold text-gray-900">
                {{ bookingDetails.bookingId || bookingDetails._id }}
              </p>
            </div>
            <div class="flex gap-2">
              <span
                :class="[
                  'text-xs px-3 py-1 rounded-full font-medium',
                  bookingDetails.status === 'CONFIRMED'
                    ? 'bg-green-100 text-green-700'
                    : bookingDetails.status === 'CANCELLED'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700',
                ]"
                >{{ bookingDetails.status }}</span
              >
              <span
                :class="[
                  'text-xs px-3 py-1 rounded-full font-medium',
                  bookingDetails.paymentStatus === 'PAID'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-orange-100 text-orange-700',
                ]"
                >{{ bookingDetails.paymentStatus }}</span
              >
            </div>
          </div>

          <!-- User Info -->
          <div class="p-4 bg-gray-50 rounded-lg">
            <p class="text-xs font-semibold text-gray-500 uppercase mb-2">
              User
            </p>
            <p class="text-sm font-semibold text-gray-900">
              {{
                bookingDetails.userId?.name || bookingDetails.userName || "-"
              }}
            </p>
            <p class="text-sm text-gray-600">
              {{ bookingDetails.userId?.email || "-" }}
            </p>
            <p class="text-sm text-gray-600">
              {{
                bookingDetails.userId?.phoneNumber ||
                bookingDetails.phoneNumber ||
                "-"
              }}
            </p>
          </div>

          <!-- Service Info -->
          <div class="p-4 bg-gray-50 rounded-lg">
            <p class="text-xs font-semibold text-gray-500 uppercase mb-2">
              Service
            </p>
            <p class="text-sm font-semibold text-gray-900">
              {{
                bookingDetails.categoryId?.categoryName ||
                bookingDetails.type ||
                "-"
              }}
            </p>
            <p
              v-if="bookingDetails.categoryId?.categoryID"
              class="text-xs text-gray-500"
            >
              Code: {{ bookingDetails.categoryId.categoryID }}
            </p>
          </div>

          <!-- Resource Info -->
          <div class="p-4 bg-gray-50 rounded-lg">
            <p class="text-xs font-semibold text-gray-500 uppercase mb-2">
              Resource
            </p>
            <p class="text-sm font-semibold text-gray-900">
              {{ bookingDetails.resourceId?.title || "-" }}
            </p>
            <p
              v-if="bookingDetails.resourceId?.resourceID"
              class="text-xs text-gray-500"
            >
              Code: {{ bookingDetails.resourceId.resourceID }}
            </p>
          </div>

          <!-- View mode -->
          <div
            v-if="!isEditingBooking"
            class="grid grid-cols-2 gap-4"
          >
            <div>
              <p class="text-xs text-gray-500">Date</p>
              <p class="text-sm font-semibold text-gray-900">
                {{ formatDateTimeDate(bookingDetails.date) }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Duration</p>
              <p class="text-sm font-semibold text-gray-900">
                {{ bookingDetails.duration }} min
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Start Time</p>
              <p class="text-sm font-semibold text-gray-900">
                {{ bookingDetails.startTime }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500">End Time</p>
              <p class="text-sm font-semibold text-gray-900">
                {{ bookingDetails.endTime }}
              </p>
            </div>
            <div class="col-span-2">
              <p class="text-xs text-gray-500">Note</p>
              <p class="text-sm text-gray-700">
                {{ bookingDetails.note || "-" }}
              </p>
            </div>
          </div>

          <!-- Edit mode -->
          <div
            v-else
            class="space-y-4"
          >
            <!-- Edit User -->
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1"
                >User</label
              >
              <div
                v-if="editSelectedUser"
                class="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p class="text-sm font-semibold text-gray-900">
                    {{ editSelectedUser.name }}
                  </p>
                  <p class="text-xs text-gray-600">
                    {{ editSelectedUser.email }}
                  </p>
                </div>
                <button
                  @click="
                    editSelectedUser = null;
                    editForm.userId = '';
                  "
                  class="text-red-500 hover:text-red-700 text-xs"
                >
                  Change
                </button>
              </div>
              <div
                v-else
                class="relative"
              >
                <input
                  v-model="editUserSearch"
                  @input="searchEditUsers"
                  type="text"
                  placeholder="Search user by name or email..."
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35] text-sm"
                />
                <div
                  v-if="editUserResults.length > 0"
                  class="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto"
                >
                  <div
                    v-for="user in editUserResults"
                    :key="user._id"
                    @click="selectEditUser(user)"
                    class="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <p class="text-sm font-medium text-gray-900">
                      {{ user.name }}
                    </p>
                    <p class="text-xs text-gray-500">{{ user.email }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Edit Service -->
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1"
                >Service</label
              >
              <select
                v-model="editForm.categoryId"
                class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35] text-sm"
              >
                <option value="">Select service...</option>
                <option
                  v-for="svc in editServices"
                  :key="svc._id"
                  :value="svc._id"
                >
                  {{ svc.title }} ({{ svc.duration }}) - ${{ svc.price }}
                </option>
              </select>
            </div>

            <!-- Edit Resource -->
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1"
                >Resource</label
              >
              <select
                v-model="editForm.resourceId"
                class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35] text-sm"
              >
                <option value="">Select resource...</option>
                <option
                  v-for="res in editResources"
                  :key="res._id"
                  :value="res._id"
                >
                  {{ res.title }}
                </option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1"
                  >Date</label
                >
                <input
                  v-model="editForm.date"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1"
                  >Duration (min)</label
                >
                <input
                  v-model="editForm.duration"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1"
                  >Start Time</label
                >
                <input
                  v-model="editForm.startTime"
                  type="time"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1"
                  >End Time</label
                >
                <input
                  v-model="editForm.endTime"
                  type="time"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1"
                  >Status</label
                >
                <select
                  v-model="editForm.status"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1"
                  >Payment Status</label
                >
                <select
                  v-model="editForm.paymentStatus"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PAID">PAID</option>
                  <option value="REFUNDED">REFUNDED</option>
                  <option value="FAILED">FAILED</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1"
                >Note</label
              >
              <textarea
                v-model="editForm.note"
                rows="3"
                class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3a35]"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        v-if="bookingDetails && !isLoadingDetails"
        class="px-6 py-4 bg-gray-50 border-t border-gray-200 sticky bottom-0"
      >
        <div
          v-if="!isEditingBooking"
          class="space-y-3"
        >
          <!-- Quick Actions -->
          <div class="flex gap-2 flex-wrap">
            <button
              v-if="bookingDetails.status !== 'CONFIRMED'"
              @click="quickUpdateBooking('status', 'CONFIRMED')"
              :disabled="isUpdatingBooking"
              class="px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Confirm
            </button>
            <button
              v-if="bookingDetails.paymentStatus !== 'PAID'"
              @click="quickUpdateBooking('paymentStatus', 'PAID')"
              :disabled="isUpdatingBooking"
              class="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              Mark Paid
            </button>
            <button
              v-if="bookingDetails.paymentStatus === 'PAID'"
              @click="quickUpdateBooking('paymentStatus', 'PENDING')"
              :disabled="isUpdatingBooking"
              class="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              Mark Unpaid
            </button>
            <button
              v-if="bookingDetails.status !== 'CANCELLED'"
              @click="quickUpdateBooking('status', 'CANCELLED')"
              :disabled="isUpdatingBooking"
              class="px-4 py-2 bg-red-500 text-white text-sm rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              Cancel Booking
            </button>
          </div>
          <div class="flex gap-3">
            <button
              @click="closeDetailsModal"
              class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button
              @click="startEditBooking"
              class="flex-1 px-6 py-3 bg-[#1a3a35] text-white rounded-lg font-medium hover:bg-[#2a4a45] transition-colors"
            >
              Edit
            </button>
          </div>
        </div>
        <div
          v-else
          class="flex gap-3"
        >
          <button
            @click="cancelEditBooking"
            :disabled="isUpdatingBooking"
            class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            @click="saveBookingUpdate"
            :disabled="isUpdatingBooking"
            class="flex-1 px-6 py-3 bg-[#1a3a35] text-white rounded-lg font-medium hover:bg-[#2a4a45] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg
              v-if="isUpdatingBooking"
              class="w-5 h-5 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {{ isUpdatingBooking ? "Saving..." : "Save Changes" }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Success Popup -->
  <div
    v-if="showSuccessPopup"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
    @click="closeSuccessPopup"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center"
      @click.stop
    >
      <div
        class="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4"
      >
        <svg
          class="w-9 h-9 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">Success</h3>
      <p class="text-sm text-gray-600 mb-5">{{ successMessage }}</p>
      <button
        @click="closeSuccessPopup"
        class="w-full px-6 py-3 bg-[#1a3a35] text-white rounded-lg font-medium hover:bg-[#2a4a45] transition-colors"
      >
        OK
      </button>
    </div>
  </div>

  <!-- Error Popup -->
  <div
    v-if="showErrorPopup"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
    @click="closeErrorPopup"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center"
      @click.stop
    >
      <div
        class="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4"
      >
        <svg
          class="w-9 h-9 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">Something went wrong</h3>
      <p class="text-sm text-gray-600 mb-5">{{ errorMessage }}</p>
      <button
        @click="closeErrorPopup"
        class="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
  import Nav from "../Dashboard/UI/SecondNav.vue";
  import {
    GetResources,
    GetCalendarData,
    GetUsersAll,
    GetServices,
    GetBookingSlots,
    CreateBooking,
    GetBookingById,
    UpdateBooking,
  } from "@/services/apiService.js";

  // ─── Resources ──────────────────────────────────────────────────────────────
  const selectedResource = ref("all");
  const resources = ref([{ id: "all", label: "All" }]);
  const isLoadingResources = ref(false);
  const isLoadingCalendar = ref(false);
  const calendarError = ref("");

  async function fetchResources() {
    isLoadingResources.value = true;
    try {
      const response = await GetResources();
      if (response.isSuccess) {
        const apiResources = (response.value || []).map((r) => ({
          id: r._id,
          label: r.title,
          resourceID: r.resourceID,
          isActive: r.isActive,
          schedule: r.schedule || null,
        }));
        resources.value = [{ id: "all", label: "All" }, ...apiResources];
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      isLoadingResources.value = false;
    }
  }

  // ─── View switcher ──────────────────────────────────────────────────────────
  const views = [
    { key: "month", label: "Month" },
    { key: "day", label: "Day" },
  ];
  const currentView = ref("day");

  // ─── Date state ─────────────────────────────────────────────────────────────
  const today = new Date();
  const currentYear = ref(today.getFullYear());
  const currentMonth = ref(today.getMonth()); // 0-based
  const selectedDayDate = ref(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = [
    "6:00 am",
    "7:00 am",
    "8:00 am",
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm",
    "6:00 pm",
    "7:00 pm",
    "8:00 pm",
    "9:00 pm",
    "10:00 pm",
  ];

  const currentMonthLabel = computed(() => monthNames[currentMonth.value]);

  function prevMonth() {
    if (currentView.value === "day") {
      const d = new Date(selectedDayDate.value);
      d.setDate(d.getDate() - 1);
      selectedDayDate.value = d;
      currentYear.value = d.getFullYear();
      currentMonth.value = d.getMonth();
      return;
    }
    if (currentMonth.value === 0) {
      currentMonth.value = 11;
      currentYear.value--;
    } else currentMonth.value--;
    selectedCell.value = null;
  }
  function nextMonth() {
    if (currentView.value === "day") {
      const d = new Date(selectedDayDate.value);
      d.setDate(d.getDate() + 1);
      selectedDayDate.value = d;
      currentYear.value = d.getFullYear();
      currentMonth.value = d.getMonth();
      return;
    }
    if (currentMonth.value === 11) {
      currentMonth.value = 0;
      currentYear.value++;
    } else currentMonth.value++;
    selectedCell.value = null;
  }
  function goToToday() {
    if (currentView.value === "day") {
      selectedDayDate.value = new Date();
    }
    currentYear.value = today.getFullYear();
    currentMonth.value = today.getMonth();
    selectedCell.value = null;
  }

  const calendarDatePickerValue = computed(() => {
    if (currentView.value === "day") {
      const d = selectedDayDate.value;
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }
    return `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, "0")}-01`;
  });

  function onCalendarDatePick(event) {
    const val = event.target.value;
    if (!val) return;
    const [y, m, d] = val.split("-").map(Number);
    currentYear.value = y;
    currentMonth.value = m - 1;
    if (currentView.value === "day") {
      selectedDayDate.value = new Date(y, m - 1, d);
    }
    selectedCell.value = null;
  }

  // ─── Calendar grid ──────────────────────────────────────────────────────────
  const selectedCell = ref(null);

  const calendarCells = computed(() => {
    const firstDay = new Date(currentYear.value, currentMonth.value, 1);
    const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
    // Monday-start: getDay() returns 0=Sun → convert to Mon-start index
    let startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push({ day: null });
    for (let d = 1; d <= lastDay.getDate(); d++) {
      cells.push({
        day: d,
        isToday:
          d === today.getDate() &&
          currentMonth.value === today.getMonth() &&
          currentYear.value === today.getFullYear(),
        isSelected: selectedCell.value?.day === d,
      });
    }
    // Pad to complete last row
    while (cells.length % 7 !== 0) cells.push({ day: null });
    return cells;
  });

  function selectDate(cell) {
    selectedCell.value = cell;
  }

  // ─── Week view helpers ───────────────────────────────────────────────────────
  const weekViewDays = computed(() => {
    const base = selectedCell.value
      ? new Date(currentYear.value, currentMonth.value, selectedCell.value.day)
      : today;
    // Find Monday of that week
    const day = base.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(base);
    monday.setDate(base.getDate() + diff);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return {
        label: weekDays[i],
        day: d.getDate(),
        fullDate: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
        isToday: d.toDateString() === today.toDateString(),
      };
    });
  });

  // ─── Day view helpers ────────────────────────────────────────────────────────
  const selectedDayLabel = computed(() => {
    return selectedDayDate.value.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // ─── Appointments data ───────────────────────────────────────────────────────
  const appointments = ref([]);

  function mapBookingToAppointment(booking) {
    const statusMap = {
      CONFIRMED: "Confirmed",
      PENDING: "Pending",
      CANCELLED: "Cancelled",
      COMPLETED: "Completed",
    };
    // API date may be ISO string like "2026-05-07T00:00:00.000Z" — extract YYYY-MM-DD
    const rawDate = booking.date || "";
    const dateOnly = rawDate.includes("T") ? rawDate.split("T")[0] : rawDate;

    return {
      id: booking.bookingId || booking._id || String(Math.random()),
      _id: booking._id || null,
      bookingId: booking.bookingId || "",
      date: dateOnly,
      time: booking.startTime,
      startTime: booking.startTime,
      endTime: booking.endTime || "",
      duration: booking.duration || 0,
      resourceId: booking.resourceId || null,
      resourceName: booking.resourceName || "-",
      lane: booking.resourceName || "-",
      name: booking.userName || "-",
      phone: booking.phoneNumber || "-",
      email: booking.email || "",
      service: booking.serviceName || "-",
      status: statusMap[booking.status] || booking.status || "Pending",
      paymentStatus: booking.paymentStatus || "",
    };
  }

  async function fetchCalendarData() {
    isLoadingCalendar.value = true;
    calendarError.value = "";

    try {
      let dateStr;
      if (currentView.value === "day") {
        const d = selectedDayDate.value;
        dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      } else if (currentView.value === "week") {
        // Week: use selected cell date, or fallback to today
        if (selectedCell.value) {
          dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, "0")}-${String(selectedCell.value.day).padStart(2, "0")}`;
        } else {
          dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        }
      } else {
        // Month/List: always use the 1st day of the currently viewed month
        dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, "0")}-01`;
      }

      const payload = {
        view: currentView.value,
        date: dateStr,
      };
      if (selectedResource.value !== "all") {
        payload.resourceId = selectedResource.value;
      }

      const response = await GetCalendarData(payload);
      if (response.isSuccess) {
        // API returns days array, each with a bookings array
        const days = response.value?.days || [];
        const allBookings = days.flatMap((d) => d.bookings || []);
        appointments.value = allBookings.map(mapBookingToAppointment);
      } else {
        calendarError.value =
          response.userMessage || "Failed to load calendar data.";
        appointments.value = [];
      }
    } catch (error) {
      console.error("Error fetching calendar data:", error);
      calendarError.value = "An error occurred while loading calendar data.";
      appointments.value = [];
    } finally {
      isLoadingCalendar.value = false;
    }
  }

  function getAppointmentsForDay(day) {
    const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return appointments.value.filter((a) => a.date === dateStr);
  }

  function gridHourTo24(hourStr) {
    const clean = hourStr.toLowerCase().replace(/\s/g, "");
    const isPm = clean.includes("pm");
    const isAm = clean.includes("am");
    let h = parseInt(clean.split(":")[0]);
    if (isPm && h !== 12) h += 12;
    if (isAm && h === 12) h = 0;
    return h;
  }

  function bookingHourTo24(timeStr) {
    return parseInt((timeStr || "").split(":")[0]);
  }

  function getAppointmentsForWeekCell(fullDate, hour) {
    const gridHour = gridHourTo24(hour);
    return appointments.value.filter(
      (a) => a.date === fullDate && bookingHourTo24(a.time) === gridHour,
    );
  }

  function getAppointmentsForDayHour(hour) {
    const cell = selectedCell.value;
    if (!cell) return [];
    const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, "0")}-${String(cell.day).padStart(2, "0")}`;
    const gridHour = gridHourTo24(hour);
    return appointments.value.filter(
      (a) => a.date === dateStr && bookingHourTo24(a.time) === gridHour,
    );
  }

  const monthAppointments = computed(() => {
    const prefix = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, "0")}`;
    return appointments.value.filter((a) => a.date.startsWith(prefix));
  });

  // ─── Day view helpers ───────────────────────────────────────────────────────
  const PIXELS_PER_MINUTE = 1; // 60px per hour

  function timeToMinutes(t) {
    if (!t) return 0;
    const parts = String(t).split(":");
    const h = parseInt(parts[0]) || 0;
    const m = parseInt(parts[1]) || 0;
    return h * 60 + m;
  }

  function formatHourLabel(h) {
    const period = h >= 12 ? "pm" : "am";
    const hh = h % 12 === 0 ? 12 : h % 12;
    return `${hh}:00 ${period}`;
  }

  function formatTime12(t) {
    if (!t) return "";
    const [h, m] = String(t)
      .split(":")
      .map((v) => parseInt(v) || 0);
    const period = h >= 12 ? "pm" : "am";
    const hh = h % 12 === 0 ? 12 : h % 12;
    return `${hh}:${String(m).padStart(2, "0")} ${period}`;
  }

  function formatDateLocal(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function isSameDate(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  const dayOfWeekKey = computed(() => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return days[selectedDayDate.value.getDay()];
  });

  function getResourceSchedule(resource) {
    if (!resource?.schedule) return null;
    const sch = resource.schedule[dayOfWeekKey.value];
    if (!sch || !sch.enabled) return null;
    return { start: sch.start, end: sch.end };
  }

  const dayResources = computed(() => {
    const real = resources.value.filter((r) => r.id !== "all");
    if (selectedResource.value === "all") return real;
    return real.filter((r) => r.id === selectedResource.value);
  });

  const dayGridRange = computed(() => {
    let minStart = 24 * 60;
    let maxEnd = 0;
    dayResources.value.forEach((r) => {
      const s = getResourceSchedule(r);
      if (s) {
        minStart = Math.min(minStart, timeToMinutes(s.start));
        maxEnd = Math.max(maxEnd, timeToMinutes(s.end));
      }
    });
    if (minStart >= maxEnd) {
      // Fallback range when no schedule found
      return { startHour: 9, endHour: 22 };
    }
    return {
      startHour: Math.floor(minStart / 60),
      endHour: Math.ceil(maxEnd / 60),
    };
  });

  const dayHourGrid = computed(() => {
    const { startHour, endHour } = dayGridRange.value;
    const arr = [];
    for (let h = startHour; h < endHour; h++) {
      arr.push({ hour24: h, label: formatHourLabel(h) });
    }
    return arr;
  });

  function isWithinSchedule(resource, hour) {
    const s = getResourceSchedule(resource);
    if (!s) return false;
    const startMin = timeToMinutes(s.start);
    const endMin = timeToMinutes(s.end);
    const hourStart = hour.hour24 * 60;
    const hourEnd = hourStart + 60;
    return hourEnd > startMin && hourStart < endMin;
  }

  function getBookingsForResourceColumn(resource) {
    const dStr = formatDateLocal(selectedDayDate.value);
    return appointments.value.filter((a) => {
      if (a.date !== dStr) return false;
      if (a.resourceId) return a.resourceId === resource.id;
      return a.lane === resource.label;
    });
  }

  function blockTopPx(apt) {
    const startMin = timeToMinutes(apt.startTime || apt.time);
    const gridStart = dayGridRange.value.startHour * 60;
    return Math.max(0, (startMin - gridStart) * PIXELS_PER_MINUTE);
  }

  function blockHeightPx(apt) {
    let durMin = apt.duration;
    if (!durMin && apt.endTime && apt.startTime) {
      durMin = timeToMinutes(apt.endTime) - timeToMinutes(apt.startTime);
    }
    if (!durMin || durMin <= 0) durMin = 60;
    return Math.max(durMin * PIXELS_PER_MINUTE, 28);
  }

  function getBookingBlockColor(apt) {
    // Priority 1: Staff user (purple)
    if (apt.email === "staff@ecc.com") {
      return "bg-purple-100/90 border-purple-500";
    }
    // Priority 2: Cancelled (red)
    if (apt.status === "Cancelled") {
      return "bg-red-100/80 border-red-500";
    }
    // Priority 3: Payment status
    if (apt.paymentStatus === "PAID") {
      return "bg-green-100/90 border-green-500";
    }
    // Default: UNPAID / PENDING (blue)
    return "bg-blue-100/90 border-blue-500";
  }

  // "Now" indicator (auto-updating each minute)
  const nowTick = ref(Date.now());
  let nowInterval = null;

  const nowLineTopPx = computed(() => {
    void nowTick.value;
    if (!isSameDate(selectedDayDate.value, new Date())) return null;
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const gridStart = dayGridRange.value.startHour * 60;
    const gridEnd = dayGridRange.value.endHour * 60;
    if (minutes < gridStart || minutes > gridEnd) return null;
    return (minutes - gridStart) * PIXELS_PER_MINUTE;
  });

  // ─── New booking modal state ────────────────────────────────────────────────
  const showNewAppointmentModal = ref(false);
  const userSearchQuery = ref("");
  const allUsers = ref([]);
  const userSearchResults = ref([]);
  const selectedUser = ref(null);
  const services = ref([]);
  const availableSlots = ref([]);
  const loadingSlots = ref(false);
  const isCreatingBooking = ref(false);
  const prefilledSlot = ref(null);

  // ─── Success / Error popups ─────────────────────────────────────────────────
  const showSuccessPopup = ref(false);
  const successMessage = ref("");
  const showErrorPopup = ref(false);
  const errorMessage = ref("");

  function closeSuccessPopup() {
    showSuccessPopup.value = false;
  }
  function closeErrorPopup() {
    showErrorPopup.value = false;
  }

  // ─── Appointment details / edit modal ───────────────────────────────────────
  const showDetailsModal = ref(false);
  const isLoadingDetails = ref(false);
  const isUpdatingBooking = ref(false);
  const detailsError = ref("");
  const bookingDetails = ref(null);
  const isEditingBooking = ref(false);
  const editForm = ref({
    date: "",
    startTime: "",
    endTime: "",
    duration: 0,
    status: "",
    paymentStatus: "",
    note: "",
    categoryId: "",
    resourceId: "",
    userId: "",
  });
  const editServices = ref([]);
  const editResources = ref([]);
  const editUserSearch = ref("");
  const editUserResults = ref([]);
  const editSelectedUser = ref(null);

  function formatDateTimeDate(d) {
    if (!d) return "-";
    const date = new Date(d);
    if (isNaN(date.getTime())) return d;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function isoDateOnly(d) {
    if (!d) return "";
    const s = String(d);
    if (s.includes("T")) return s.split("T")[0];
    return s;
  }

  async function openAppointmentDetails(apt) {
    const id = apt?._id || apt?.id;
    if (!id) return;
    showDetailsModal.value = true;
    isLoadingDetails.value = true;
    isEditingBooking.value = false;
    detailsError.value = "";
    bookingDetails.value = null;
    editSelectedUser.value = null;
    try {
      const [response, servicesRes, resourcesRes] = await Promise.all([
        GetBookingById(id),
        GetServices(),
        GetResources(),
      ]);
      if (servicesRes.isSuccess) editServices.value = servicesRes.value || [];
      if (resourcesRes.isSuccess)
        editResources.value = (resourcesRes.value || []).filter(
          (r) => r.isActive !== false,
        );
      if (response.isSuccess) {
        bookingDetails.value = response.value || null;
        // Initialize edit form
        const v = response.value || {};
        editForm.value = {
          date: isoDateOnly(v.date),
          startTime: v.startTime || "",
          endTime: v.endTime || "",
          duration: v.duration || 0,
          status: v.status || "",
          paymentStatus: v.paymentStatus || "",
          note: v.note || "",
          categoryId: v.categoryId?._id || v.categoryId || "",
          resourceId: v.resourceId?._id || v.resourceId || "",
          userId: v.userId?._id || v.userId || "",
        };
        if (v.userId && typeof v.userId === "object") {
          editSelectedUser.value = v.userId;
        }
      } else {
        detailsError.value =
          response.userMessage || "Failed to load booking details.";
      }
    } catch (error) {
      console.error("Error loading booking details:", error);
      detailsError.value = "An error occurred while loading booking details.";
    } finally {
      isLoadingDetails.value = false;
    }
  }

  function closeDetailsModal() {
    if (isUpdatingBooking.value) return;
    showDetailsModal.value = false;
    bookingDetails.value = null;
    isEditingBooking.value = false;
    detailsError.value = "";
  }

  function startEditBooking() {
    isEditingBooking.value = true;
  }

  async function searchEditUsers() {
    if (!editUserSearch.value.trim()) {
      editUserResults.value = [];
      return;
    }
    if (allUsers.value.length === 0) {
      try {
        const res = await GetUsersAll();
        if (res.isSuccess) allUsers.value = res.value || [];
      } catch (e) {
        console.error(e);
      }
    }
    const q = editUserSearch.value.toLowerCase();
    editUserResults.value = allUsers.value
      .filter(
        (u) =>
          (u.name || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q),
      )
      .slice(0, 10);
  }

  function selectEditUser(user) {
    editSelectedUser.value = user;
    editForm.value.userId = user._id;
    editUserSearch.value = "";
    editUserResults.value = [];
  }

  function cancelEditBooking() {
    isEditingBooking.value = false;
    const v = bookingDetails.value || {};
    editForm.value = {
      date: isoDateOnly(v.date),
      startTime: v.startTime || "",
      endTime: v.endTime || "",
      duration: v.duration || 0,
      status: v.status || "",
      paymentStatus: v.paymentStatus || "",
      note: v.note || "",
      categoryId: v.categoryId?._id || v.categoryId || "",
      resourceId: v.resourceId?._id || v.resourceId || "",
      userId: v.userId?._id || v.userId || "",
    };
    if (v.userId && typeof v.userId === "object") {
      editSelectedUser.value = v.userId;
    }
  }

  async function saveBookingUpdate() {
    const id = bookingDetails.value?._id;
    if (!id) return;
    isUpdatingBooking.value = true;
    try {
      const payload = {
        date: editForm.value.date,
        startTime: editForm.value.startTime,
        endTime: editForm.value.endTime,
        duration: Number(editForm.value.duration) || 0,
        status: editForm.value.status,
        paymentStatus: editForm.value.paymentStatus,
        note: editForm.value.note,
        categoryId: editForm.value.categoryId,
        resourceId: editForm.value.resourceId,
        userId: editForm.value.userId,
      };
      const response = await UpdateBooking(id, payload);
      if (response.isSuccess) {
        showDetailsModal.value = false;
        fetchCalendarData();
      } else {
        errorMessage.value =
          response.userMessage ||
          response.errorMessage ||
          "Failed to update booking.";
        showErrorPopup.value = true;
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      errorMessage.value =
        error.response?.data?.userMessage ||
        error.response?.data?.errorMessage ||
        "Failed to update booking.";
      showErrorPopup.value = true;
    } finally {
      isUpdatingBooking.value = false;
    }
  }

  async function quickUpdateBooking(field, value) {
    const id = bookingDetails.value?._id;
    if (!id) return;
    isUpdatingBooking.value = true;
    try {
      const payload = { [field]: value };
      const response = await UpdateBooking(id, payload);
      if (response.isSuccess) {
        bookingDetails.value[field] = value;
        fetchCalendarData();
      } else {
        errorMessage.value =
          response.userMessage || response.errorMessage || "Failed to update.";
        showErrorPopup.value = true;
      }
    } catch (error) {
      console.error("Error quick updating booking:", error);
      errorMessage.value = "Failed to update booking. Please try again.";
      showErrorPopup.value = true;
    } finally {
      isUpdatingBooking.value = false;
    }
  }

  const bookingForm = ref({
    userId: "",
    categoryId: "",
    resourceId: "",
    date: "",
    startTime: "",
    note: "",
    paymentMethod: "local",
  });
  const customDurationMinutes = ref(0);
  const customPrice = ref(0);

  const filteredResources = computed(() => {
    if (!bookingForm.value.categoryId) return [];
    const selectedService = services.value.find(
      (s) => s._id === bookingForm.value.categoryId,
    );
    return selectedService?.resourceIDs || [];
  });

  const allFilteredResources = computed(() => {
    if (bookingForm.value.categoryId) return filteredResources.value;
    // When no service selected, show all active resources
    return resources.value
      .filter((r) => r.id !== "all" && r.isActive !== false)
      .map((r) => ({ _id: r.id, title: r.label }));
  });

  const canCreateBooking = computed(() => {
    return (
      selectedUser.value &&
      bookingForm.value.resourceId &&
      bookingForm.value.date &&
      bookingForm.value.startTime
    );
  });

  function formatDurationMinutes(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  }

  function resetBookingForm() {
    userSearchQuery.value = "";
    userSearchResults.value = [];
    selectedUser.value = null;
    bookingForm.value = {
      userId: "",
      categoryId: "",
      resourceId: "",
      date: "",
      startTime: "",
      note: "",
      paymentMethod: "local",
    };
    availableSlots.value = [];
    customDurationMinutes.value = 0;
    customPrice.value = 0;
  }

  async function openNewAppointmentModal(prefill) {
    showNewAppointmentModal.value = true;
    resetBookingForm();
    prefilledSlot.value = prefill || null;
    if (prefill?.date) bookingForm.value.date = prefill.date;
    try {
      const [usersRes, servicesRes] = await Promise.all([
        GetUsersAll(),
        GetServices(),
      ]);
      if (usersRes.isSuccess) allUsers.value = usersRes.value || [];
      if (servicesRes.isSuccess) services.value = servicesRes.value || [];
    } catch (error) {
      console.error("Error loading modal data:", error);
    }
  }

  function closeNewAppointmentModal() {
    if (!isCreatingBooking.value) {
      showNewAppointmentModal.value = false;
      prefilledSlot.value = null;
      resetBookingForm();
    }
  }

  function searchUsers() {
    if (!userSearchQuery.value.trim()) {
      userSearchResults.value = [];
      return;
    }
    const q = userSearchQuery.value.toLowerCase();
    userSearchResults.value = allUsers.value
      .filter(
        (u) =>
          (u.name || "").toLowerCase().includes(q) ||
          (u.email || "").toLowerCase().includes(q),
      )
      .slice(0, 10);
  }

  function selectUser(user) {
    selectedUser.value = user;
    bookingForm.value.userId = user._id;
    userSearchQuery.value = "";
    userSearchResults.value = [];
  }

  async function onServiceChange() {
    bookingForm.value.resourceId = "";
    bookingForm.value.startTime = "";
    availableSlots.value = [];

    const selectedService = services.value.find(
      (s) => s._id === bookingForm.value.categoryId,
    );
    if (selectedService) {
      let durationMinutes = 0;
      const dur = String(selectedService.duration || "");
      if (dur.includes("m")) durationMinutes = parseInt(dur);
      else if (dur.includes("h")) durationMinutes = parseInt(dur) * 60;
      customDurationMinutes.value = Math.max(durationMinutes, 30);
      customPrice.value = calculatePrice();
    }

    // Apply prefilled resource and date if compatible
    if (prefilledSlot.value?.resourceId) {
      const valid = filteredResources.value.find(
        (r) => r._id === prefilledSlot.value.resourceId,
      );
      if (valid) {
        bookingForm.value.resourceId = prefilledSlot.value.resourceId;
        if (prefilledSlot.value.date) {
          bookingForm.value.date = prefilledSlot.value.date;
          await fetchAvailableSlots();
          if (prefilledSlot.value.startTime) {
            const match = availableSlots.value.find(
              (s) => s.time === prefilledSlot.value.startTime,
            );
            if (match)
              bookingForm.value.startTime = prefilledSlot.value.startTime;
          }
        }
      }
    }
  }

  function increaseDuration() {
    customDurationMinutes.value += 30;
    customPrice.value = calculatePrice();
  }
  function decreaseDuration() {
    if (customDurationMinutes.value > 30) customDurationMinutes.value -= 30;
    customPrice.value = calculatePrice();
  }

  function calculatePrice() {
    const selectedService = services.value.find(
      (s) => s._id === bookingForm.value.categoryId,
    );
    if (!selectedService) return 0;
    const basePrice = selectedService.price;
    let baseDuration = 0;
    const dur = String(selectedService.duration || "");
    if (dur.includes("m")) baseDuration = parseInt(dur);
    else if (dur.includes("h")) baseDuration = parseInt(dur) * 60;
    if (!baseDuration) return basePrice || 0;
    const perMin = basePrice / baseDuration;
    return Math.round(perMin * customDurationMinutes.value * 100) / 100;
  }

  function onResourceChange() {
    bookingForm.value.startTime = "";
    availableSlots.value = [];
    if (bookingForm.value.date) fetchAvailableSlots();
  }

  function onDateChange() {
    bookingForm.value.startTime = "";
    fetchAvailableSlots();
  }

  async function fetchAvailableSlots() {
    if (!bookingForm.value.resourceId || !bookingForm.value.date) return;
    loadingSlots.value = true;
    availableSlots.value = [];
    bookingForm.value.startTime = "";
    try {
      const response = await GetBookingSlots(
        bookingForm.value.date,
        bookingForm.value.resourceId,
      );
      if (response.isSuccess && response.value) {
        availableSlots.value = response.value.filter((s) => s.available);
      } else {
        availableSlots.value = [];
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      availableSlots.value = [];
    } finally {
      loadingSlots.value = false;
    }
  }

  async function createAppointment() {
    if (!canCreateBooking.value) return;
    isCreatingBooking.value = true;
    try {
      const selectedService = services.value.find(
        (s) => s._id === bookingForm.value.categoryId,
      );
      const startTime12h = bookingForm.value.startTime;
      const durationMinutes = customDurationMinutes.value || 60;
      const [time, period] = startTime12h.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (period === "pm" && hours !== 12) hours += 12;
      if (period === "am" && hours === 12) hours = 0;
      const startDate = new Date();
      startDate.setHours(hours, minutes, 0, 0);
      const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
      const startTime24h = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      const endTime24h = `${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`;

      const payload = {
        userId: selectedUser.value._id,
        serviceId: selectedService ? selectedService._id : undefined,
        categoryId: bookingForm.value.categoryId || undefined,
        resourceId: bookingForm.value.resourceId,
        date: bookingForm.value.date,
        startTime: startTime24h,
        endTime: endTime24h,
        duration: durationMinutes,
        price: customPrice.value || calculatePrice(),
        note: bookingForm.value.note || "",
        paymentMethod: "local",
      };
      const response = await CreateBooking(payload);
      if (response.isSuccess) {
        isCreatingBooking.value = false;
        closeNewAppointmentModal();
        fetchCalendarData();
      } else {
        errorMessage.value =
          response.userMessage ||
          response.errorMessage ||
          "Failed to create appointment.";
        showErrorPopup.value = true;
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      errorMessage.value =
        error.response?.data?.userMessage ||
        error.response?.data?.errorMessage ||
        "Failed to create appointment.";
      showErrorPopup.value = true;
    } finally {
      isCreatingBooking.value = false;
    }
  }

  function onDaySlotClick(resource, hour) {
    if (!isWithinSchedule(resource, hour)) return;
    const dStr = formatDateLocal(selectedDayDate.value);
    const sch = getResourceSchedule(resource);
    const hourStartMin = hour.hour24 * 60;
    let startMin = hourStartMin;
    if (sch) {
      const schStart = timeToMinutes(sch.start);
      if (schStart > hourStartMin && schStart < hourStartMin + 60) {
        startMin = schStart;
      }
    }
    const hh = String(Math.floor(startMin / 60)).padStart(2, "0");
    const mm = String(startMin % 60).padStart(2, "0");
    const startTime12 = formatTime12(`${hh}:${mm}`);
    openNewAppointmentModal({
      resourceId: resource.id,
      date: dStr,
      startTime: startTime12,
    });
  }

  // ─── Fetch data on mount and when dependencies change ────────────────────────
  onMounted(() => {
    fetchResources();
    fetchCalendarData();
    nowInterval = setInterval(() => {
      nowTick.value = Date.now();
    }, 60 * 1000);
  });

  onBeforeUnmount(() => {
    if (nowInterval) clearInterval(nowInterval);
  });

  watch(
    [currentView, currentYear, currentMonth, selectedResource, selectedDayDate],
    () => {
      fetchCalendarData();
    },
    { immediate: false },
  );
</script>
