<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-lg flex flex-col">
      <div class="h-20 flex items-center justify-center border-b">
        <span class="text-2xl font-bold text-indigo-700">Veritas</span>
      </div>
      <nav class="flex-1 px-4 py-6">
        <ul class="space-y-2">
          <li>
            <a
              href="#"
              class="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold"
            >
              <span class="material-icons mr-3">dashboard</span>
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span class="material-icons mr-3">people</span>
              Users
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span class="material-icons mr-3">account_balance</span>
              Accounts
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span class="material-icons mr-3">bar_chart</span>
              Statistics
            </a>
          </li>
        </ul>
        <div class="mt-10">
          <h4 class="text-xs text-gray-400 uppercase mb-2">Teams</h4>
          <ul class="space-y-1">
            <li>
              <span class="flex items-center text-sm text-gray-700">
                <span class="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                Marketing
              </span>
            </li>
            <li>
              <span class="flex items-center text-sm text-gray-700">
                <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Development
              </span>
            </li>
          </ul>
        </div>
      </nav>
      <div class="px-4 py-4 border-t">
        <button
          class="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <span class="material-icons mr-3">logout</span>
          Log Out
        </button>
      </div>
    </aside>
    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header
        class="flex items-center justify-between bg-white px-8 py-6 shadow"
      >
        <h1 class="text-2xl font-bold text-gray-800">Analytics</h1>
        <div class="flex items-center space-x-4">
          <button
            class="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-semibold"
          >
            Full Statistics
          </button>
          <button
            class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold"
          >
            Results Summary
          </button>
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Profile"
            class="w-10 h-10 rounded-full border-2 border-indigo-500"
          />
        </div>
      </header>
      <!-- Analytics Cards -->
      <main class="flex-1 p-8 overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow p-6 flex flex-col">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold text-gray-700">Team Payments</span>
              <span class="material-icons text-gray-400">notifications</span>
            </div>
            <div class="flex items-center mt-2">
              <div class="flex -space-x-2">
                <img
                  class="w-8 h-8 rounded-full border-2 border-white"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                />
                <img
                  class="w-8 h-8 rounded-full border-2 border-white"
                  src="https://randomuser.me/api/portraits/women/33.jpg"
                />
                <img
                  class="w-8 h-8 rounded-full border-2 border-white"
                  src="https://randomuser.me/api/portraits/men/34.jpg"
                />
                <span
                  class="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full border-2 border-white text-xs font-bold"
                  >+25</span
                >
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow p-6 flex flex-col">
            <span class="font-semibold text-gray-700 mb-2">Savings</span>
            <div class="flex items-end justify-between mt-2">
              <span class="text-2xl font-bold text-indigo-700">$5,839</span>
              <span class="text-xs text-red-500">-11% last week</span>
            </div>
            <div class="mt-4">
              <div class="w-full h-12 bg-indigo-50 rounded"></div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow p-6 flex flex-col">
            <span class="font-semibold text-gray-700 mb-2"
              >Income statistics</span
            >
            <div class="flex items-end justify-between mt-2">
              <span class="text-xs text-green-500">+8%</span>
            </div>
            <div class="flex items-end space-x-1 mt-4 h-16">
              <div class="w-4 bg-indigo-100 rounded-t h-6"></div>
              <div class="w-4 bg-indigo-200 rounded-t h-10"></div>
              <div class="w-4 bg-indigo-300 rounded-t h-12"></div>
              <div class="w-4 bg-orange-400 rounded-t h-16"></div>
            </div>
            <div class="flex justify-between text-xs text-gray-400 mt-2">
              <span>15%</span>
              <span>21%</span>
              <span>32%</span>
            </div>
          </div>
          <div
            class="bg-teal-400 rounded-xl shadow p-6 flex flex-col text-white justify-between"
          >
            <div>
              <div class="text-lg font-bold">$95.9</div>
              <div class="text-xs">Per Month</div>
            </div>
            <div class="mt-4">
              <div class="text-sm">Choose Best Plan For You!</div>
            </div>
            <div class="flex mt-4 space-x-2">
              <button
                class="bg-white text-teal-500 px-3 py-1 rounded font-semibold"
              >
                Details
              </button>
              <button class="bg-teal-600 px-3 py-1 rounded font-semibold">
                Upgrade
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
        <!-- Recently Payments -->
        <div class="mb-8">
          <h2 class="text-lg font-bold mb-4">Recently Payments</h2>
          <div class="flex space-x-4">
            <div
              class="bg-white rounded-xl shadow p-4 flex-1 flex items-center justify-between"
            >
              <div class="flex items-center">
                <img
                  class="w-10 h-10 rounded-full mr-4"
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                />
                <div>
                  <div class="font-semibold">Emma Ryan Jr.</div>
                  <div class="text-xs text-gray-400">Mar 9, 2023</div>
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
              <div>
                <span class="font-bold text-gray-700">$3,937</span>
                <span
                  class="ml-2 bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs"
                  >Pending</span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- Transactions Table -->
        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold">Transactions</h2>
            <input
              type="text"
              placeholder="Search"
              class="border rounded px-3 py-1 text-sm"
            />
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead>
                <tr class="text-left text-gray-500">
                  <th class="py-2 px-4">Receiver</th>
                  <th class="py-2 px-4">Type</th>
                  <th class="py-2 px-4">Status</th>
                  <th class="py-2 px-4">Date</th>
                  <th class="py-2 px-4">Amount</th>
                  <th class="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2 px-4 flex items-center">
                    <img
                      class="w-8 h-8 rounded-full mr-2"
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                    />
                    Emma Ryan Jr.
                  </td>
                  <td class="py-2 px-4">Salary</td>
                  <td class="py-2 px-4">
                    <span
                      class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs"
                      >Pending</span
                    >
                  </td>
                  <td class="py-2 px-4">Feb 19th, 2023</td>
                  <td class="py-2 px-4 font-bold">$3,892</td>
                  <td class="py-2 px-4">
                    <button
                      class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded"
                    >
                      Details
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="py-2 px-4 flex items-center">
                    <img
                      class="w-8 h-8 rounded-full mr-2"
                      src="https://randomuser.me/api/portraits/men/46.jpg"
                    />
                    Adrian Daren
                  </td>
                  <td class="py-2 px-4">Bonus</td>
                  <td class="py-2 px-4">
                    <span
                      class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
                      >Done</span
                    >
                  </td>
                  <td class="py-2 px-4">Feb 18th, 2023</td>
                  <td class="py-2 px-4 font-bold">$1,073</td>
                  <td class="py-2 px-4">
                    <button
                      class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded"
                    >
                      Details
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="py-2 px-4 flex items-center">
                    <img
                      class="w-8 h-8 rounded-full mr-2"
                      src="https://randomuser.me/api/portraits/women/47.jpg"
                    />
                    Roxanne Hills
                  </td>
                  <td class="py-2 px-4">Salary</td>
                  <td class="py-2 px-4">
                    <span
                      class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
                      >Done</span
                    >
                  </td>
                  <td class="py-2 px-4">Apr 16th, 2023</td>
                  <td class="py-2 px-4 font-bold">$2,790</td>
                  <td class="py-2 px-4">
                    <button
                      class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
// Tidak ada logic khusus, data dummy
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>