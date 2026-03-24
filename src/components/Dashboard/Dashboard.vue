<template>
  <main
    class="text-black lg:ml-[20vw] md:ml-[10vw] sm:ml-0 p-4 mt-14 md:mt-0 main-content h-screen overflow-y-scroll"
  >
    <Nav />

    <!-- main section -->
    <div class="User-create-account gap-4 pr-0 md:pr-24 mt-5">
      <!-- createbtn -->
      <div class="create flex justify-between items-center mb-4">
        <h1 class="md:text-2xl sm:text-sm font-bold text-gray-800">
          Dashboard
        </h1>
      </div>

      <!-- Dashboard Stats Bar -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <!-- Approved Appointments -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="text-gray-500">
              <svg
                class="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9 12l2 2 4-4"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-800">59</p>
              <p class="text-sm text-blue-500">Approved appointments</p>
            </div>
          </div>
        </div>

        <!-- Pending Appointments -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="text-gray-500">
              <svg
                class="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-800">31</p>
              <p class="text-sm text-blue-500">Pending appointments</p>
            </div>
          </div>
        </div>

        <!-- Total Appointments -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="text-gray-500">
              <svg
                class="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-800">92</p>
              <p class="text-sm text-blue-500">Total appointments</p>
            </div>
          </div>
        </div>

        <!-- Revenue -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center gap-3">
            <div class="text-gray-500">
              <svg
                class="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-800">A$1,940.00</p>
              <p class="text-sm text-blue-500">Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard bar chart -->
      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
      >
        <!-- Chart Header -->
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6"
        >
          <div
            class="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2 border border-gray-200"
          >
            <svg
              class="w-5 h-5 text-gray-500"
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
            <span class="text-sm text-gray-700"
              >March 13, 2026 - March 20, 2026</span
            >
          </div>
          <p class="text-sm text-gray-500">
            See the number of appointments and total revenue for the selected
            period
          </p>
          <div class="relative">
            <select
              class="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Based on appointment date</option>
            </select>
            <svg
              class="w-4 h-4 text-gray-500 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Chart Container -->
        <div class="relative h-80 w-full">
          <!-- Y-axis Labels (Revenue) -->
          <div
            class="absolute left-0 top-0 bottom-12 w-12 flex flex-col justify-between text-xs text-gray-500 text-right pr-2"
          >
            <span>700</span>
            <span>600</span>
            <span>500</span>
            <span>400</span>
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>0</span>
          </div>

          <!-- Y-axis Labels (Appointments) - Right -->
          <div
            class="absolute right-0 top-0 bottom-12 w-8 flex flex-col justify-between text-xs text-gray-500 pl-2"
          >
            <span>15</span>
            <span>14</span>
            <span>13</span>
            <span>12</span>
            <span>11</span>
            <span>10</span>
            <span>9</span>
            <span>8</span>
            <span>7</span>
          </div>

          <!-- Chart Area -->
          <div class="absolute left-14 right-10 top-0 bottom-12">
            <!-- Grid Lines -->
            <div class="absolute inset-0 flex flex-col justify-between">
              <div class="border-t border-gray-200"></div>
              <div class="border-t border-gray-200"></div>
              <div class="border-t border-gray-200"></div>
              <div class="border-t border-gray-200"></div>
              <div class="border-t border-gray-200"></div>
              <div class="border-t border-gray-200"></div>
              <div class="border-t border-gray-200"></div>
              <div class="border-t border-gray-200"></div>
            </div>

            <!-- Area Chart SVG -->
            <svg
              class="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <!-- Appointments Area (Gray) -->
              <polygon
                points="0,80 85,280 170,120 255,200 340,240 425,20 510,80 595,160 680,120"
                fill="rgba(156, 163, 175, 0.3)"
                stroke="#9ca3af"
                stroke-width="2"
              />
              <!-- Revenue Area (Pink) -->
              <polygon
                points="0,40 85,260 170,260 255,260 340,240 425,20 510,100 595,280 680,280"
                fill="rgba(244, 114, 182, 0.5)"
                stroke="#f472b6"
                stroke-width="2"
              />
              <!-- Data Points - Revenue -->
              <circle
                cx="0"
                cy="40"
                r="4"
                fill="#f472b6"
                stroke="white"
                stroke-width="2"
              />
              <circle
                cx="85"
                cy="260"
                r="4"
                fill="#f472b6"
                stroke="white"
                stroke-width="2"
              />
              <circle
                cx="170"
                cy="260"
                r="4"
                fill="#f472b6"
                stroke="white"
                stroke-width="2"
              />
              <circle
                cx="255"
                cy="260"
                r="4"
                fill="#f472b6"
                stroke="white"
                stroke-width="2"
              />
              <circle
                cx="340"
                cy="240"
                r="4"
                fill="#f472b6"
                stroke="white"
                stroke-width="2"
              />
              <circle
                cx="425"
                cy="20"
                r="4"
                fill="#f472b6"
                stroke="white"
                stroke-width="2"
              />
              <circle
                cx="510"
                cy="100"
                r="4"
                fill="#f472b6"
                stroke="white"
                stroke-width="2"
              />
              <circle
                cx="595"
                cy="280"
                r="4"
                fill="#f472b6"
                stroke="white"
                stroke-width="2"
              />
              <circle
                cx="680"
                cy="280"
                r="4"
                fill="#f472b6"
                stroke="white"
                stroke-width="2"
              />
            </svg>
          </div>

          <!-- X-axis Labels -->
          <div
            class="absolute left-14 right-10 bottom-0 flex justify-between text-xs text-gray-500"
          >
            <span>Mar 13</span>
            <span>Mar 14</span>
            <span>Mar 15</span>
            <span>Mar 16</span>
            <span>Mar 17</span>
            <span>Mar 18</span>
            <span>Mar 19</span>
            <span>Mar 20</span>
          </div>

          <!-- Y-axis Titles -->
          <div
            class="absolute left-0 top-1/2 transform -rotate-90 -translate-y-1/2 -translate-x-4 text-xs text-gray-500"
          >
            Revenue (A$)
          </div>
          <div
            class="absolute right-0 top-1/2 transform rotate-90 translate-y-1/2 translate-x-6 text-xs text-gray-500"
          >
            Appointments
          </div>
        </div>

        <!-- Legend -->
        <div
          class="flex justify-center gap-6 mt-4 pt-4 border-t border-gray-100"
        >
          <div class="flex items-center gap-2">
            <div class="w-8 h-3 bg-pink-400 rounded"></div>
            <span class="text-sm text-gray-600">Revenue</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-3 bg-gray-400 rounded"></div>
            <span class="text-sm text-gray-600">Appointments</span>
          </div>
        </div>
      </div>

      <!-- Analytics Section -->
      <div class="mt-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Analytics</h2>
      </div>
    </div>
  </main>
</template>
<script setup>
  import Nav from "../Dashboard/UI/SecondNav.vue";
</script>
