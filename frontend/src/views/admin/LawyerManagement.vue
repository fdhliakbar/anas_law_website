<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div
      :class="[
        'bg-white shadow-lg transition-all duration-300',
        showMobileMenu ? 'w-64' : 'w-64 hidden lg:block',
      ]"
    >
      <div class="p-6">
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center"
          >
            <span class="text-white font-bold text-lg">AL</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">Anas Law</h1>
            <p class="text-sm text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav class="mt-6">
        <div class="px-4 space-y-2">
          <button
            @click="$router.push('/admin/dashboard')"
            class="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              ></path>
            </svg>
            Dashboard
          </button>

          <button
            @click="$router.push('/admin/article-management')"
            class="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3v9m0 0h-3m3 0h3"
              ></path>
            </svg>
            Artikel Hukum
          </button>

          <button
            @click="$router.push('/admin/booking-management')"
            class="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-1 12a2 2 0 002 2h6a2 2 0 002-2L16 7m-6 0V5a1 1 0 011-1h2a1 1 0 011 1v2"
              ></path>
            </svg>
            Manajemen Booking
          </button>

          <button
            class="w-full flex items-center px-4 py-3 text-left bg-indigo-50 text-indigo-600 rounded-lg"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            Manajemen Lawyers
          </button>

          <button
            @click="logout"
            class="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Logout
          </button>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between px-6 py-4">
          <div class="flex items-center">
            <button
              @click="toggleMobileMenu"
              class="lg:hidden mr-2 p-2 rounded-md hover:bg-gray-100"
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
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <h1 class="text-2xl font-bold text-gray-900">Manajemen Lawyers</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="openCreateModal"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              <svg
                class="w-5 h-5 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Tambah Lawyer
            </button>
            <span class="text-gray-600">Selamat datang, {{ adminName }}</span>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto p-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Lawyers</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ lawyerStats.total }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg
                  class="w-6 h-6 text-green-600"
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
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Active</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ lawyerStats.active }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-red-100 rounded-lg">
                <svg
                  class="w-6 h-6 text-red-600"
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
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Inactive</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ lawyerStats.inactive }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-yellow-100 rounded-lg">
                <svg
                  class="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  ></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Avg Rating</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ lawyerStats.avgRating }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Aksi Cepat</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Add New Lawyer Card -->
            <div
              @click="openCreateModal"
              class="cursor-pointer border-2 border-dashed border-indigo-300 rounded-lg p-6 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group"
            >
              <div class="text-center">
                <div
                  class="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-200"
                >
                  <svg
                    class="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </div>
                <h4 class="mt-3 text-sm font-medium text-gray-900">
                  Tambah Lawyer Baru
                </h4>
                <p class="mt-1 text-xs text-gray-500">
                  Klik untuk menambahkan lawyer baru ke sistem
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Search & Filter -->
        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Search</label
              >
              <input
                v-model="searchQuery"
                @input="debouncedSearch"
                type="text"
                placeholder="Cari nama atau spesialisasi..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Status</label
              >
              <select
                v-model="statusFilter"
                @change="loadLawyers"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Semua Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div class="flex items-end">
              <button
                @click="resetFilters"
                class="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        <!-- Lawyers Grid -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Daftar Lawyers</h3>
          </div>

          <!-- Loading state -->
          <div v-if="loading" class="p-8 text-center">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"
            ></div>
            <p class="mt-2 text-gray-600">Memuat data lawyers...</p>
          </div>

          <!-- Empty state -->
          <div v-else-if="lawyers.length === 0" class="p-8 text-center">
            <svg
              class="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <p class="text-gray-600">Tidak ada lawyer yang ditemukan</p>
          </div>

          <!-- Lawyers grid -->
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
          >
            <div
              v-for="lawyer in lawyers"
              :key="lawyer.lawyer_id"
              class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div class="text-center">
                <div class="relative w-24 h-24 mx-auto mb-4">
                  <img
                    :src="getPhotoUrl(lawyer.photo)"
                    @error="handleImageError"
                    :alt="lawyer.name"
                    class="w-full h-full rounded-full object-cover"
                  />
                  <div
                    v-if="!lawyer.available"
                    class="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
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
                  </div>
                </div>

                <h3 class="text-lg font-semibold text-gray-900 mb-1">
                  {{ lawyer.name }}
                </h3>
                <p class="text-sm text-gray-600 mb-2">{{ lawyer.specialty }}</p>

                <div
                  class="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4"
                >
                  <span>{{ lawyer.experience }} tahun</span>
                  <span>⭐ {{ lawyer.rating }}</span>
                </div>

                <div class="text-center mb-4">
                  <p class="text-lg font-bold text-gray-900">
                    Rp {{ formatCurrency(lawyer.fee) }}
                    <span
                      v-if="lawyer.old_fee"
                      class="text-sm text-gray-500 line-through ml-2"
                    >
                      Rp {{ formatCurrency(lawyer.old_fee) }}
                    </span>
                  </p>
                </div>

                <div class="flex space-x-2">
                  <button
                    @click="editLawyer(lawyer)"
                    class="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    @click="toggleLawyerStatus(lawyer)"
                    :class="
                      lawyer.available
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-green-600 hover:bg-green-700'
                    "
                    class="flex-1 px-3 py-2 text-white text-sm rounded-md transition-colors duration-200"
                  >
                    {{ lawyer.available ? "Nonaktifkan" : "Aktifkan" }}
                  </button>
                  <button
                    @click="deleteLawyer(lawyer)"
                    class="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors duration-200"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="pagination.total > pagination.limit"
            class="px-6 py-4 border-t border-gray-200"
          >
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-700">
                Menampilkan {{ pagination.offset + 1 }} sampai
                {{
                  Math.min(
                    pagination.offset + pagination.limit,
                    pagination.total
                  )
                }}
                dari {{ pagination.total }} lawyers
              </div>
              <div class="flex space-x-2">
                <button
                  @click="loadPreviousPage"
                  :disabled="pagination.offset === 0"
                  class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Sebelumnya
                </button>
                <button
                  @click="loadNextPage"
                  :disabled="!pagination.hasMore"
                  class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Create/Edit Lawyer Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium">
            {{ isEditing ? "Edit Lawyer" : "Tambah Lawyer Baru" }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
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
              ></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveLawyer" enctype="multipart/form-data">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nama Lengkap *</label
              >
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Spesialisasi *</label
              >
              <input
                v-model="form.specialty"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Pengalaman (tahun)</label
              >
              <input
                v-model="form.experience"
                type="number"
                min="0"
                max="50"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Rating (1-5)</label
              >
              <input
                v-model="form.rating"
                type="number"
                min="1"
                max="5"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Fee Konsultasi (Rp)</label
              >
              <input
                v-model="form.fee"
                type="number"
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Fee Lama (Rp)</label
              >
              <input
                v-model="form.old_fee"
                type="number"
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Foto Profil</label
              >
              <input
                @change="onFileChange"
                type="file"
                accept="image/*"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div v-if="imagePreview" class="mt-2">
                <img
                  :src="imagePreview"
                  alt="Preview"
                  class="w-24 h-24 rounded-full object-cover"
                />
              </div>
            </div>

            <div class="md:col-span-2">
              <label class="flex items-center">
                <input
                  v-model="form.available"
                  type="checkbox"
                  class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span class="ml-2 text-sm text-gray-700"
                  >Lawyer aktif dan tersedia untuk booking</span
                >
              </label>
            </div>
          </div>

          <div class="flex space-x-3 pt-6">
            <button
              type="submit"
              :disabled="submitting"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {{
                submitting
                  ? "Menyimpan..."
                  : isEditing
                  ? "Update Lawyer"
                  : "Tambah Lawyer"
              }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Reactive data
const adminName = ref("");
const showMobileMenu = ref(false);
const loading = ref(false);
const lawyers = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const submitting = ref(false);
const searchQuery = ref("");
const statusFilter = ref("");
const imagePreview = ref(null);
const imageFile = ref(null);

// Form data
const form = ref({
  lawyer_id: null,
  name: "",
  specialty: "",
  experience: 0,
  rating: 5,
  fee: 0,
  old_fee: null,
  available: true,
});

// Pagination
const pagination = ref({
  total: 0,
  limit: 12,
  offset: 0,
  hasMore: false,
});

// Lawyer stats
const lawyerStats = computed(() => {
  const stats = { total: 0, active: 0, inactive: 0, avgRating: 0 };
  let totalRating = 0;

  lawyers.value.forEach((lawyer) => {
    stats.total++;
    if (lawyer.available) stats.active++;
    else stats.inactive++;
    totalRating += lawyer.rating || 0;
  });

  stats.avgRating =
    stats.total > 0 ? (totalRating / stats.total).toFixed(1) : 0;
  return stats;
});

// Debounced search
let searchTimeout;
const debouncedSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    pagination.value.offset = 0;
    loadLawyers();
  }, 500);
};

// Methods
const checkAdminAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
    return;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.role !== "admin") {
      router.push("/");
      return;
    }
    adminName.value = payload.name || "Admin";
  } catch (error) {
    console.error("Token error:", error);
    router.push("/login");
  }
};

const loadLawyers = async () => {
  loading.value = true;

  try {
    const params = new URLSearchParams({
      limit: pagination.value.limit.toString(),
      offset: pagination.value.offset.toString(),
      includeInactive: "true",
    });

    if (searchQuery.value) {
      params.append("search", searchQuery.value);
    }

    const response = await fetch(
      `https://mptibe-production.up.railway.app/api/lawyers/post-lawyers?${params}`
    );
    const data = await response.json();

    if (data.success) {
      let filteredLawyers = data.lawyers;

      // Apply status filter
      if (statusFilter.value === "active") {
        filteredLawyers = filteredLawyers.filter((lawyer) => lawyer.available);
      } else if (statusFilter.value === "inactive") {
        filteredLawyers = filteredLawyers.filter((lawyer) => !lawyer.available);
      }

      lawyers.value = filteredLawyers;
      if (data.pagination) {
        pagination.value = {
          ...pagination.value,
          total: data.pagination.total,
          hasMore: data.pagination.hasMore,
        };
      } else {
        // fallback jika pagination tidak ada
        pagination.value = {
          ...pagination.value,
          total: filteredLawyers.length,
          hasMore: false,
        };
      }
    } else {
      console.error("Failed to load lawyers:", data.message);
    }
  } catch (error) {
    console.error("Error loading lawyers:", error);
  } finally {
    loading.value = false;
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  form.value = {
    lawyer_id: null,
    name: "",
    specialty: "",
    experience: 0,
    rating: 5,
    fee: 0,
    old_fee: null,
    available: true,
  };
  imagePreview.value = null;
  imageFile.value = null;
  showModal.value = true;
};

const editLawyer = (lawyer) => {
  isEditing.value = true;
  form.value = { ...lawyer };
  imagePreview.value = getPhotoUrl(lawyer.photo);
  imageFile.value = null;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  isEditing.value = false;
  imagePreview.value = null;
  imageFile.value = null;
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  imageFile.value = file;
  if (file) {
    imagePreview.value = URL.createObjectURL(file);
  }
};

const saveLawyer = async () => {
  submitting.value = true;
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    Object.keys(form.value).forEach((key) => {
      if (form.value[key] !== null && form.value[key] !== undefined) {
        formData.append(key, form.value[key]);
      }
    });
    if (imageFile.value) {
      formData.append("photo", imageFile.value);
    }

    let method = isEditing.value ? "PUT" : "POST";

    const response = await fetch(
      `https://mptibe-production.up.railway.app/api/lawyers/post-lawyers`,
      {
        method,
        body: formData,
        // Jangan set Content-Type, biarkan browser yang set (agar boundary FormData benar)
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      }
    );

    const data = await response.json();
    if (data.success) {
      closeModal();
      loadLawyers();
    } else {
      alert(data.message || "Gagal menyimpan data lawyer");
    }
  } catch (error) {
    console.error("Error saving lawyer:", error);
    alert("Terjadi kesalahan saat menyimpan data lawyer");
  } finally {
    submitting.value = false;
  }
};

const toggleLawyerStatus = async (lawyer) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/api/lawyers/post-lawyers`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...lawyer,
          available: !lawyer.available,
        }),
      }
    );

    const data = await response.json();
    if (data.success) {
      alert(
        `Lawyer berhasil ${lawyer.available ? "dinonaktifkan" : "diaktifkan"}!`
      );
      loadLawyers();
    } else {
      alert("Gagal mengubah status lawyer: " + data.message);
    }
  } catch (error) {
    console.error("Error toggling lawyer status:", error);
    alert("Terjadi kesalahan saat mengubah status lawyer");
  }
};

const deleteLawyer = async (lawyer) => {
  if (!confirm(`Apakah Anda yakin ingin menghapus lawyer ${lawyer.name}?`)) {
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/api/lawyers/post-lawyers?lawyer_id=${lawyer.lawyer_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (data.success) {
      alert("Lawyer berhasil dihapus!");
      loadLawyers();
    } else {
      alert("Gagal menghapus lawyer: " + data.message);
    }
  } catch (error) {
    console.error("Error deleting lawyer:", error);
    alert("Terjadi kesalahan saat menghapus lawyer");
  }
};

const resetFilters = () => {
  searchQuery.value = "";
  statusFilter.value = "";
  pagination.value.offset = 0;
  loadLawyers();
};

const loadPreviousPage = () => {
  if (pagination.value.offset > 0) {
    pagination.value.offset -= pagination.value.limit;
    loadLawyers();
  }
};

const loadNextPage = () => {
  if (pagination.value.hasMore) {
    pagination.value.offset += pagination.value.limit;
    loadLawyers();
  }
};

const getPhotoUrl = (photo) => {
  if (!photo) return "/images/feris.jpg";
  if (photo.startsWith("http")) return photo;
  if (photo.startsWith("/src/assets/images/")) {
    return photo.replace("/src/assets/images/", "/images/");
  }
  return photo;
};

const handleImageError = (event) => {
  event.target.src = "/src/assets/images/feris.jpg";
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID").format(amount || 0);
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const logout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("storage"));
  router.push("/login");
};

// Lifecycle
onMounted(() => {
  checkAdminAuth();
  loadLawyers();
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
