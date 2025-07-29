<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div :class="['bg-white shadow-lg transition-all duration-300', showMobileMenu ? 'w-64' : 'w-64 hidden lg:block']">
      <div class="p-6">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
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
          <button @click="$router.push('/admin/dashboard')" 
                  class="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            </svg>
            Dashboard
          </button>

          <button @click="$router.push('/admin/article-management')" 
                  class="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3v9m0 0h-3m3 0h3"></path>
            </svg>
            Artikel Hukum
          </button>

          <button class="w-full flex items-center px-4 py-3 text-left bg-indigo-50 text-indigo-600 rounded-lg">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-1 12a2 2 0 002 2h6a2 2 0 002-2L16 7m-6 0V5a1 1 0 011-1h2a1 1 0 011 1v2"></path>
            </svg>
            Manajemen Booking
          </button>

          <button @click="$router.push('/admin/lawyer-management')" 
                  class="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Manajemen Lawyers
          </button>

          <button @click="goToUsers" 
                  class="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
            Manajemen Klien
          </button>

          <button @click="logout" 
                  class="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
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
            <button @click="toggleMobileMenu" class="lg:hidden mr-2 p-2 rounded-md hover:bg-gray-100">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <h1 class="text-2xl font-bold text-gray-900">Manajemen Booking</h1>
          </div>
          <div class="flex items-center space-x-4">
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
              <div class="p-2 bg-yellow-100 rounded-lg">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Pending</p>
                <p class="text-2xl font-bold text-gray-900">{{ bookingStats.pending }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Approved</p>
                <p class="text-2xl font-bold text-gray-900">{{ bookingStats.approved }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-red-100 rounded-lg">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Rejected</p>
                <p class="text-2xl font-bold text-gray-900">{{ bookingStats.rejected }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total</p>
                <p class="text-2xl font-bold text-gray-900">{{ bookingStats.total }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select v-model="filters.status" @change="loadBookings" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Dari</label>
              <input v-model="filters.dateFrom" @change="loadBookings" type="date"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Hingga</label>
              <input v-model="filters.dateTo" @change="loadBookings" type="date"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            </div>
            
            <div class="flex items-end">
              <button @click="resetFilters" 
                      class="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200">
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        <!-- Bookings Table -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Daftar Booking</h3>
          </div>
          
          <!-- Loading state -->
          <div v-if="loading" class="p-8 text-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p class="mt-2 text-gray-600">Memuat data booking...</p>
          </div>

          <!-- Empty state -->
          <div v-else-if="bookings.length === 0" class="p-8 text-center">
            <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <p class="text-gray-600">Tidak ada booking yang ditemukan</p>
          </div>

          <!-- Bookings table -->
          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Klien</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lawyer</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal & Waktu</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="booking in bookings" :key="booking.booking_id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{{ booking.booking_id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ booking.nama_pembooking }}</div>
                      <div class="text-sm text-gray-500">{{ booking.email }}</div>
                      <div class="text-sm text-gray-500">{{ booking.nomor_handphone }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ booking.lawyer_name }}</div>
                    <div class="text-sm text-gray-500">{{ booking.specialty }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ formatDate(booking.tanggal_booking) }}</div>
                    <div class="text-sm text-gray-500">{{ booking.waktu_booking }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(booking.status)" 
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ getStatusText(booking.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button v-if="booking.status === 'pending'" 
                            @click="approveBooking(booking.booking_id)"
                            class="text-green-600 hover:text-green-900">
                      Setujui
                    </button>
                    <button v-if="booking.status === 'pending'" 
                            @click="rejectBooking(booking.booking_id)"
                            class="text-red-600 hover:text-red-900">
                      Tolak
                    </button>
                    <button @click="viewBookingDetail(booking)" 
                            class="text-indigo-600 hover:text-indigo-900">
                      Detail
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div v-if="pagination.total > pagination.limit" class="px-6 py-4 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-700">
                Menampilkan {{ pagination.offset + 1 }} sampai {{ Math.min(pagination.offset + pagination.limit, pagination.total) }} 
                dari {{ pagination.total }} booking
              </div>
              <div class="flex space-x-2">
                <button @click="loadPreviousPage" :disabled="pagination.offset === 0"
                        class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                  Sebelumnya
                </button>
                <button @click="loadNextPage" :disabled="!pagination.hasMore"
                        class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Booking Detail Modal -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium">Detail Booking #{{ selectedBooking.booking_id }}</h3>
          <button @click="closeDetailModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nama Klien</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedBooking.nama_pembooking }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedBooking.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">No. Handphone</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedBooking.nomor_handphone }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Lawyer</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedBooking.lawyer_name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Tanggal Booking</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedBooking.tanggal_booking) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Waktu Booking</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedBooking.waktu_booking }}</p>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Pesan</label>
            <p class="mt-1 text-sm text-gray-900">{{ selectedBooking.pesan || 'Tidak ada pesan' }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <span :class="getStatusClass(selectedBooking.status)" 
                  class="mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
              {{ getStatusText(selectedBooking.status) }}
            </span>
          </div>

          <div class="flex space-x-3 pt-4">
            <button v-if="selectedBooking.status === 'pending'" 
                    @click="approveBooking(selectedBooking.booking_id)"
                    class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Setujui Booking
            </button>
            <button v-if="selectedBooking.status === 'pending'" 
                    @click="rejectBooking(selectedBooking.booking_id)"
                    class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Tolak Booking
            </button>
            <button @click="closeDetailModal" 
                    class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Reactive data
const adminName = ref('');
const showMobileMenu = ref(false);
const loading = ref(false);
const bookings = ref([]);
const showDetailModal = ref(false);
const selectedBooking = ref({});

// Filters
const filters = ref({
  status: '',
  dateFrom: '',
  dateTo: ''
});

// Pagination
const pagination = ref({
  total: 0,
  limit: 10,
  offset: 0,
  hasMore: false
});

// Booking stats
const bookingStats = computed(() => {
  const stats = { total: 0, pending: 0, approved: 0, rejected: 0 };
  bookings.value.forEach(booking => {
    stats.total++;
    stats[booking.status] = (stats[booking.status] || 0) + 1;
  });
  return stats;
});

// Methods
const checkAdminAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
    return;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role !== 'admin') {
      router.push('/');
      return;
    }
    adminName.value = payload.name || 'Admin';
  } catch (error) {
    console.error('Token error:', error);
    router.push('/login');
  }
};

const loadBookings = async () => {
  loading.value = true;
  
  try {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams({
      limit: pagination.value.limit.toString(),
      offset: pagination.value.offset.toString()
    });

    if (filters.value.status) {
      params.append('status', filters.value.status);
    }

    const response = await fetch(`https://mptibe-production.up.railway.app/api/booking/get-bookings?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.success) {
      bookings.value = data.bookings;
      pagination.value = {
        ...pagination.value,
        total: data.pagination.total,
        hasMore: data.pagination.hasMore
      };
    } else {
      console.error('Failed to load bookings:', data.message);
    }
  } catch (error) {
    console.error('Error loading bookings:', error);
  } finally {
    loading.value = false;
  }
};

const approveBooking = async (bookingId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://mptibe-production.up.railway.app/api/booking/update-booking`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        booking_id: bookingId,
        status: 'approved'
      })
    });

    const data = await response.json();

    if (data.success) {
      alert('Booking berhasil disetujui!');
      loadBookings(); // Reload data
      closeDetailModal();
    } else {
      alert('Gagal menyetujui booking: ' + data.message);
    }
  } catch (error) {
    console.error('Error approving booking:', error);
    alert('Terjadi kesalahan saat menyetujui booking');
  }
};

const rejectBooking = async (bookingId) => {
  const reason = prompt('Alasan penolakan (opsional):');
  
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://mptibe-production.up.railway.app/api/booking/update-booking`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        booking_id: bookingId,
        status: 'rejected',
        reschedule_reason: reason
      })
    });

    const data = await response.json();

    if (data.success) {
      alert('Booking berhasil ditolak!');
      loadBookings(); // Reload data
      closeDetailModal();
    } else {
      alert('Gagal menolak booking: ' + data.message);
    }
  } catch (error) {
    console.error('Error rejecting booking:', error);
    alert('Terjadi kesalahan saat menolak booking');
  }
};

const viewBookingDetail = (booking) => {
  selectedBooking.value = booking;
  showDetailModal.value = true;
};

const closeDetailModal = () => {
  showDetailModal.value = false;
  selectedBooking.value = {};
};

const resetFilters = () => {
  filters.value = {
    status: '',
    dateFrom: '',
    dateTo: ''
  };
  pagination.value.offset = 0;
  loadBookings();
};

const loadPreviousPage = () => {
  if (pagination.value.offset > 0) {
    pagination.value.offset -= pagination.value.limit;
    loadBookings();
  }
};

const loadNextPage = () => {
  if (pagination.value.hasMore) {
    pagination.value.offset += pagination.value.limit;
    loadBookings();
  }
};

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-gray-100 text-gray-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

const getStatusText = (status) => {
  const texts = {
    pending: 'Pending',
    approved: 'Disetujui',
    rejected: 'Ditolak',
    completed: 'Selesai',
    cancelled: 'Dibatalkan'
  };
  return texts[status] || status;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const logout = () => {
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('storage'));
  router.push('/login');
};

const goToUsers = () => {
  alert('Halaman manajemen klien segera hadir!');
};

// Lifecycle
onMounted(() => {
  checkAdminAuth();
  loadBookings();
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
