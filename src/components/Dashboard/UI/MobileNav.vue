<template>
  <nav
    class="fixed top-0 left-0 right-0 h-16 bg-primary flex justify-between items-center px-4 md:hidden z-10"
  >
    <div class="logo">
      <img
        src="@/assets/logo.webp"
        alt="white-logo"
        class="w-[40px] h-[40px]"
      />
    </div>
    <div class="hamburger-menu">
      <button
        @click="toggleMenu"
        class="text-white focus:outline-none"
      >
        <i class="pi pi-bars text-2xl"></i>
      </button>
    </div>

    <!-- Mobile menu overlay -->
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-black z-50 pt-20"
    >
      <div class="absolute top-4 right-4">
        <button
          @click="toggleMenu"
          class="text-white focus:outline-none"
        >
          <i class="pi pi-times text-2xl"></i>
        </button>
      </div>
      <div class="sub-nav">
        <ul class="px-4">
          <router-link
            to="/adminhome"
            @click="toggleMenu"
          >
            <li
              :class="[
                'w-full h-10 rounded-md flex items-center gap-2 pl-2 mb-2',
                isActive('/adminhome')
                  ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                  : 'bg-black hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
              ]"
            >
              <i class="pi pi-home text-white"></i>
              <span class="text-white">Dashboard</span>
            </li>
          </router-link>
          <!-- <router-link
            to="/users"
            @click="toggleMenu"
          >
            <li
              :class="[
                'w-full h-10 rounded-md flex items-center gap-2 pl-2 mb-2',
                isActive('/users')
                  ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                  : 'bg-black hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
              ]"
            >
              <span class="pi pi-user text-white"></span>
              <span class="text-white">Users</span>
            </li>
          </router-link> -->
          <router-link
            to="/supplier"
            class="block"
          >
            <li
              :class="[
                'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
                isActive('/supplier')
                  ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                  : 'bg-black hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
              ]"
            >
              <i class="pi pi-truck text-white"></i>
              <span class="text-white md:hidden lg:block">Supplier</span>
            </li>
          </router-link>
          <router-link
            to="/category/create"
            class="block"
          >
            <li
              :class="[
                'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
                isActive('/category/create')
                  ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                  : 'bg-black hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
              ]"
            >
              <i class="pi pi-objects-column text-white"></i>
              <span class="text-white md:hidden lg:block">Category</span>
            </li>
          </router-link>
          <router-link
            to="/inventory"
            class="block"
          >
            <li
              :class="[
                'w-full h-10 rounded-md flex items-center gap-2 pl-2 mb-2',
                isActive('/inventory')
                  ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                  : 'bg-black hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
              ]"
            >
              <i class="pi pi-sitemap text-white"></i>
              <span class="text-white">Stock</span>
            </li>
          </router-link>
          <router-link
            to="/order"
            class="block"
          >
            <li
              :class="[
                'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
                isActive('/order')
                  ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                  : 'bg-black hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
              ]"
            >
              <i class="pi pi-shopping-cart text-white"></i>
              <span class="text-white md:hidden lg:block">Order</span>
            </li>
          </router-link>
          <router-link
            to="/productinsights"
            class="block"
          >
            <li
              :class="[
                'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer',
                isActive('/productinsights')
                  ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                  : 'bg-black hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
              ]"
            >
              <i class="pi pi-slack text-white"></i>
              <span class="text-white md:hidden lg:block"
                >Product Insights</span
              >
            </li>
          </router-link>
          <!-- Notification Alert Expandable Menu -->
          <div>
            <li
              @click="notificationExpanded = !notificationExpanded"
              :class="[
                'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer mt-2',
                isActive('/notification/alert')
                  ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                  : 'bg-black hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
              ]"
            >
              <i class="pi pi-bell text-white"></i>
              <span class="text-white md:hidden lg:block"
                >Notification Alert</span
              >
              <i
                :class="[
                  'pi text-white ml-auto mr-4 transition-transform duration-200',
                  notificationExpanded ? 'pi-chevron-up' : 'pi-chevron-down',
                ]"
              ></i>
            </li>
            <!-- Sub Menu -->
            <div
              v-show="notificationExpanded"
              class="bg-black/50"
            >
              <router-link
                to="/notification/alert"
                class="block"
              >
                <li
                  :class="[
                    'w-full h-10 rounded-l-md lg:ml-[70px] md:ml-[40px] flex items-center gap-2 pl-4 cursor-pointer mt-2',
                    isActive('/notification/alert')
                      ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                      : 'hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
                  ]"
                >
                  <i class="pi pi-list text-white text-sm"></i>
                  <span class="text-white md:hidden lg:block text-sm"
                    >View Alert</span
                  >
                </li>
              </router-link>
              <router-link
                to="/notification/create"
                class="block"
              >
                <li
                  :class="[
                    'w-full h-10 rounded-l-md lg:ml-[70px] md:ml-[40px] flex items-center gap-2 pl-4 cursor-pointer mt-2',
                    isActive('/notification/create')
                      ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                      : 'hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
                  ]"
                >
                  <i class="pi pi-plus text-white text-sm"></i>
                  <span class="text-white md:hidden lg:block text-sm"
                    >Create Alert</span
                  >
                </li>
              </router-link>
            </div>
          </div>
          <!-- Analytics Expandable Menu -->
          <div>
            <li
              @click="analyticsExpanded = !analyticsExpanded"
              :class="[
                'w-full h-10 rounded-l-md lg:ml-[50px] md:ml-[20px] flex items-center gap-2 pl-2 cursor-pointer mt-2',
                isActive('/report')
                  ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                  : 'bg-black hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
              ]"
            >
              <i class="pi pi-chart-bar text-white"></i>
              <span class="text-white md:hidden lg:block">Analytics</span>
              <i
                :class="[
                  'pi text-white ml-auto mr-4 transition-transform duration-200',
                  analyticsExpanded ? 'pi-chevron-up' : 'pi-chevron-down',
                ]"
              ></i>
            </li>
            <!-- Sub Menu -->
            <div
              v-show="analyticsExpanded"
              class="bg-black/50"
            >
              <router-link
                to="/report/view"
                class="block"
              >
                <li
                  :class="[
                    'w-full h-10 rounded-l-md lg:ml-[70px] md:ml-[40px] flex items-center gap-2 pl-4 cursor-pointer mt-2',
                    isActive('/report/view')
                      ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                      : 'hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
                  ]"
                >
                  <i class="pi pi-list text-white text-sm"></i>
                  <span class="text-white md:hidden lg:block text-sm"
                    >Summary</span
                  >
                </li>
              </router-link>
              <router-link
                to="/report/profit"
                class="block"
              >
                <li
                  :class="[
                    'w-full h-10 rounded-l-md lg:ml-[70px] md:ml-[40px] flex items-center gap-2 pl-4 cursor-pointer mt-2',
                    isActive('/report/profit')
                      ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                      : 'hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
                  ]"
                >
                  <i class="pi pi-dollar text-white text-sm"></i>
                  <span class="text-white md:hidden lg:block text-sm"
                    >Profit</span
                  >
                </li>
              </router-link>
              <router-link
                to="/report/sales"
                class="block"
              >
                <li
                  :class="[
                    'w-full h-10 rounded-l-md lg:ml-[70px] md:ml-[40px] flex items-center gap-2 pl-4 cursor-pointer mt-2',
                    isActive('/report/sales')
                      ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                      : 'hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
                  ]"
                >
                  <i class="pi pi-file text-white text-sm"></i>
                  <span class="text-white md:hidden lg:block text-sm"
                    >Hamper Report</span
                  >
                </li>
              </router-link>
              <router-link
                to="/report/extras"
                class="block"
              >
                <li
                  :class="[
                    'w-full h-10 rounded-l-md lg:ml-[70px] md:ml-[40px] flex items-center gap-2 pl-4 cursor-pointer mt-2',
                    isActive('/report/extras')
                      ? 'bg-gradient-to-r from-[#f53854] to-[#810a43]'
                      : 'hover:bg-gradient-to-r hover:from-[#f53854] hover:to-[#810a43]',
                  ]"
                >
                  <i class="pi pi-file text-white text-sm"></i>
                  <span class="text-white md:hidden lg:block text-sm"
                    >Indivual Report</span
                  >
                </li>
              </router-link>
            </div>
          </div>
        </ul>
      </div>
      <!-- Version Display at Bottom -->
      <div
        class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700"
      >
        <div
          class="flex items-center justify-center gap-2 text-gray-400 text-sm"
        >
          <i class="pi pi-info-circle"></i>
          <span class="md:hidden lg:block">Version {{ appVersion }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { ref } from "vue";
  import "primeicons/primeicons.css";
  import { useRoute } from "vue-router";
  import packageJson from "../../../../package.json";

  const isMenuOpen = ref(false);
  const route = useRoute();
  const appVersion = ref(packageJson.version);
  const analyticsExpanded = ref(false);
  const notificationExpanded = ref(false);

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
  }

  const isActive = (path) => {
    return route.path === path || route.path.startsWith(path);
  };
</script>
