<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-indigo-600 text-white">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <span class="text-xl font-bold">Admin Dashboard</span>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a
                  @click="currentTab = 'dashboard'"
                  :class="[
                    currentTab === 'dashboard'
                      ? 'bg-indigo-700'
                      : 'hover:bg-indigo-500',
                    'px-3 py-2 rounded-md text-sm font-medium cursor-pointer',
                  ]"
                >
                  Dashboard
                </a>
                <a
                  @click="goToArticles"
                  :class="[
                    currentTab === 'articles'
                      ? 'bg-indigo-700'
                      : 'hover:bg-indigo-500',
                    'px-3 py-2 rounded-md text-sm font-medium cursor-pointer',
                  ]"
                >
                  Articles
                </a>
                <a
                  @click="currentTab = 'users'"
                  :class="[
                    currentTab === 'users'
                      ? 'bg-indigo-700'
                      : 'hover:bg-indigo-500',
                    'px-3 py-2 rounded-md text-sm font-medium cursor-pointer',
                  ]"
                >
                  Users
                </a>
                <a
                  @click="currentTab = 'settings'"
                  :class="[
                    currentTab === 'settings'
                      ? 'bg-indigo-700'
                      : 'hover:bg-indigo-500',
                    'px-3 py-2 rounded-md text-sm font-medium cursor-pointer',
                  ]"
                >
                  Settings
                </a>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6 space-x-2">
              <button
                @click="goToUserDashboard"
                class="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition-colors"
                title="Kembali ke Dashboard Pengguna"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard User
              </button>
              <button
                @click="logout"
                class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="toggleMobileMenu"
              class="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="!showMobileMenu"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
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

      <!-- Mobile menu -->
      <div v-show="showMobileMenu" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-700">
          <a
            @click="
              currentTab = 'dashboard';
              showMobileMenu = false;
            "
            :class="[
              currentTab === 'dashboard'
                ? 'bg-indigo-800'
                : 'hover:bg-indigo-600',
              'block px-3 py-2 rounded-md text-base font-medium cursor-pointer',
            ]"
          >
            Dashboard
          </a>
          <a
            @click="
              goToArticles();
              showMobileMenu = false;
            "
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 cursor-pointer"
          >
            Articles
          </a>
          <a
            @click="
              currentTab = 'users';
              showMobileMenu = false;
            "
            :class="[
              currentTab === 'users' ? 'bg-indigo-800' : 'hover:bg-indigo-600',
              'block px-3 py-2 rounded-md text-base font-medium cursor-pointer',
            ]"
          >
            Users
          </a>
          <a
            @click="
              currentTab = 'settings';
              showMobileMenu = false;
            "
            :class="[
              currentTab === 'settings'
                ? 'bg-indigo-800'
                : 'hover:bg-indigo-600',
              'block px-3 py-2 rounded-md text-base font-medium cursor-pointer',
            ]"
          >
            Settings
          </a>
          <div class="border-t border-indigo-600 pt-3">
            <button
              @click="
                goToUserDashboard();
                showMobileMenu = false;
              "
              class="w-full text-left inline-flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard User
            </button>
            <button
              @click="
                logout();
                showMobileMenu = false;
              "
              class="w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Dashboard Overview -->
        <div v-if="currentTab === 'dashboard'" class="p-4">
          <h1 class="text-2xl font-semibold text-gray-900 mb-6">
            Dashboard Overview
          </h1>
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Stats Cards -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg
                      class="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Total Articles
                      </dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">
                          {{ stats.totalArticles }}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg
                      class="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Registered Users
                      </dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">
                          {{ stats.totalUsers }}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg
                      class="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Total Views
                      </dt>
                      <dd>
                        <div class="text-lg font-medium text-gray-900">
                          {{ stats.totalViews }}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activities -->
          <div class="mt-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">
              Recent Activities
            </h2>
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul class="divide-y divide-gray-200">
                <li
                  v-for="(activity, index) in recentActivities"
                  :key="index"
                  class="px-4 py-4 sm:px-6"
                >
                  <div class="flex items-center">
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-indigo-600 truncate">
                        {{ activity.title }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ activity.description }}
                      </p>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                      <p class="text-sm text-gray-500">{{ activity.time }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Articles Management -->
        <div v-else-if="currentTab === 'articles'">
          <article-management />
        </div>

        <!-- Users Management -->
        <div v-else-if="currentTab === 'users'" class="p-4">
          <h1 class="text-2xl font-semibold text-gray-900 mb-6">
            Users Management
          </h1>
          <!-- User management functionality would go here -->
          <p class="text-gray-500 text-center py-10">
            User management functionality coming soon...
          </p>
        </div>

        <!-- Settings -->
        <div v-else-if="currentTab === 'settings'" class="p-4">
          <h1 class="text-2xl font-semibold text-gray-900 mb-6">
            Admin Settings
          </h1>
          <!-- Settings functionality would go here -->
          <p class="text-gray-500 text-center py-10">
            Settings functionality coming soon...
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ArticleManagement from "./ArticleManagement.vue";

export default {
  name: "AdminDashboard",
  components: {
    ArticleManagement,
  },
  data() {
    return {
      currentTab: "dashboard",
      showMobileMenu: false,
      stats: {
        totalArticles: 0,
        totalUsers: 0,
        totalViews: 0,
      },
      recentActivities: [
        {
          title: "New article published",
          description:
            "Corporate Law Update: Recent Changes in Business Regulations",
          time: "2 hours ago",
        },
        {
          title: "User registration",
          description: "New user registered: john.doe@example.com",
          time: "5 hours ago",
        },
        {
          title: "Article updated",
          description: "Family Law: Child Custody Guidelines updated",
          time: "1 day ago",
        },
      ],
    };
  },
  created() {
    this.fetchDashboardStats();
  },
  methods: {
    async fetchDashboardStats() {
      try {
        // This would be replaced with an actual API call
        // const response = await fetch('http://localhost:3000/api/admin/stats');
        // const data = await response.json();
        // this.stats = data;

        // For now, using dummy data
        this.stats = {
          totalArticles: 12,
          totalUsers: 45,
          totalViews: 1250,
        };
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    },
    logout() {
      // Clear auth token
      localStorage.removeItem("token");
      // Redirect to login page
      this.$router.push("/login");
    },

    goToUserDashboard() {
      // Navigate to user dashboard (homepage)
      this.$router.push("/");
    },

    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },

    goToArticles() {
      this.$router.push({ name: "PublicArticlesList" });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
