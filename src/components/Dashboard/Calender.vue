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
                  class="text-xs px-1 py-0.5 rounded bg-green-100 text-green-800 truncate hidden sm:block"
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
    </div>
  </main>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from "vue";
  import Nav from "../Dashboard/UI/SecondNav.vue";
  import { GetResources, GetCalendarData } from "@/services/apiService.js";

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
  const views = [{ key: "month", label: "Month" }];
  const currentView = ref("month");

  // ─── Date state ─────────────────────────────────────────────────────────────
  const today = new Date();
  const currentYear = ref(today.getFullYear());
  const currentMonth = ref(today.getMonth()); // 0-based

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
    if (currentMonth.value === 0) {
      currentMonth.value = 11;
      currentYear.value--;
    } else currentMonth.value--;
    selectedCell.value = null;
  }
  function nextMonth() {
    if (currentMonth.value === 11) {
      currentMonth.value = 0;
      currentYear.value++;
    } else currentMonth.value++;
    selectedCell.value = null;
  }
  function goToToday() {
    currentYear.value = today.getFullYear();
    currentMonth.value = today.getMonth();
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
    const d = selectedCell.value
      ? new Date(currentYear.value, currentMonth.value, selectedCell.value.day)
      : today;
    return d.toLocaleDateString("en-US", {
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
      date: dateOnly,
      time: booking.startTime,
      lane: booking.resourceName || "-",
      name: booking.userName || "-",
      phone: booking.phoneNumber || "-",
      email: booking.email || "",
      service: booking.serviceName || "-",
      status: statusMap[booking.status] || booking.status || "Pending",
    };
  }

  async function fetchCalendarData() {
    isLoadingCalendar.value = true;
    calendarError.value = "";

    try {
      let dateStr;
      if (currentView.value === "week" || currentView.value === "day") {
        // Week/Day: use selected cell date, or fallback to today
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

  // ─── Fetch data on mount and when dependencies change ────────────────────────
  onMounted(() => {
    fetchResources();
    fetchCalendarData();
  });

  watch(
    [currentView, currentYear, currentMonth, selectedResource],
    () => {
      fetchCalendarData();
    },
    { immediate: false },
  );
</script>
