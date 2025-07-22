<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside
      class="w-64 bg-white shadow-lg flex flex-col transition-transform duration-300 ease-in-out"
      :class="{
        'fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0': true,
        '-translate-x-full md:translate-x-0': !showMobileMenu,
        'translate-x-0': showMobileMenu,
      }"
    >
      <div class="h-20 flex items-center justify-between px-4 border-b">
        <span class="text-2xl font-bold text-indigo-700">Anas Law</span>
        <!-- Mobile menu button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              @click="goToUsers"
              href="#"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span class="material-icons mr-3"></span>
              Klien
            </a>
          </li>
          <li>
            <a
              @click="goToBookingManagement"
              href="#"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span class="material-icons mr-3"></span>
              Kelola Booking
            </a>
          </li>
          <li>
            <a
              @click="goToArticles"
              href="#"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span class="material-icons mr-3"></span>
              Artikel Hukum
            </a>
          </li>
          <li>
            <a
              @click="goToLawyerManagement"
              href="#"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span class="material-icons mr-3"></span>
              Manajemen Lawyers
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span class="material-icons mr-3"></span>
              Kasus Hukum
            </a>
          </li>
        </ul>
      </nav>
      <div class="px-4 py-4 border-t">
        <button
          @click="logout"
          class="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <span class="material-icons mr-3">logout</span>
          Keluar
        </button>
      </div>
    </aside>
    <!-- Main Content -->
    <div class="flex-1 flex flex-col md:ml-0">
      <!-- Header -->
      <header
        class="flex items-center justify-between bg-white px-8 py-6 shadow"
      >
        <div class="flex items-center">
          <!-- Mobile menu button for header -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden mr-4 inline-flex items-center justify-center p-2 rounded-md text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 class="text-2xl font-bold text-gray-800">
            Dashboard Admin - Anas Law
          </h1>
        </div>
        <div class="flex items-center space-x-4">

          <button
            @click="goToHomepage"
            class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
          >
            Lihat Website
          </button>
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile"
            class="w-10 h-10 rounded-full border-2 border-indigo-500"
          />
        </div>
      </header>
      <!-- Analytics Cards -->
      <main class="flex-1 p-8 overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <!-- Total Klien -->
          <div class="bg-white rounded-xl shadow p-6 flex flex-col">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold text-gray-700">Total Klien</span>
              <span class="material-icons text-blue-400">people</span>
            </div>
            <div class="text-2xl font-bold text-blue-600">
              {{ stats.totalUsers }}
            </div>
            <div class="text-sm text-green-500 mt-1">+12% bulan ini</div>
          </div>

          <!-- Konsultasi Terjadwal -->
          <div class="bg-white rounded-xl shadow p-6 flex flex-col">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold text-gray-700">Booking Pending</span>
              <span class="material-icons text-orange-400">pending</span>
            </div>
            <div class="text-2xl font-bold text-orange-600">
              {{ stats.pendingBookings }}
            </div>
            <div class="text-sm text-orange-500 mt-1">Menunggu persetujuan</div>
          </div>

          <!-- Artikel Published -->
          <div class="bg-white rounded-xl shadow p-6 flex flex-col">
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold text-gray-700"
                >Artikel Dipublikasi</span
              >
              <span class="material-icons text-purple-400">article</span>
            </div>
            <div class="text-2xl font-bold text-purple-600">
              {{ stats.totalArticles }}
            </div>
            <div class="text-sm text-blue-500 mt-1">
              {{ stats.totalViews }} total views
            </div>
          </div>

          <!-- Pengacara Aktif -->
          <div
            class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow p-6 flex flex-col text-white"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold">Pengacara Aktif</span>
              <span class="material-icons">gavel</span>
            </div>
            <div class="text-2xl font-bold">{{ stats.totalLawyers }}</div>
            <div class="text-sm opacity-90 mt-1">Siap melayani klien</div>
            <div class="flex mt-4 space-x-2">
              <button
                @click="goToBookingManagement"
                class="bg-white text-indigo-600 px-3 py-1 rounded font-semibold text-sm"
              >
                Kelola Booking
              </button>
            </div>
          </div>
        </div>
        <!-- Artikel Terbaru -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold">Artikel Terbaru</h2>
            <div class="flex space-x-2">
              <button
                @click="createNewArticle"
                class="bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700"
              >
                Tambah Artikel
              </button>
              <button
                @click="goToArticleManagement"
                class="bg-gray-100 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-200"
              >
                Lihat Semua
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="article in recentArticles.slice(0, 3)"
              :key="article.artikel_id"
              class="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow"
            >
              <div class="mb-3">
                <img
                  :src="
                    article.gambar || '/src/assets/images/default-article.jpg'
                  "
                  :alt="article.judul"
                  class="w-full h-32 object-cover rounded-lg"
                  @error="handleImageError"
                />
              </div>
              <div>
                <h3 class="font-semibold text-sm mb-2 line-clamp-2">
                  {{ article.judul }}
                </h3>
                <p class="text-xs text-gray-500 mb-2 line-clamp-2">
                  {{ article.deskripsi }}
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-400">{{
                    formatDate(article.created_at)
                  }}</span>
                  <button
                    class="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs hover:bg-indigo-200"
                    @click="goToArticleDetail(article.artikel_id)"
                  >
                    Lihat
                  </button>
                </div>
              </div>
            </div>
            <!-- Fallback jika tidak ada artikel -->
            <div v-if="recentArticles.length === 0" class="col-span-full">
              <div class="bg-white rounded-xl shadow p-8 text-center">
                <span class="material-icons text-gray-300 text-4xl mb-2"
                  >article</span
                >
                <p class="text-gray-500">Belum ada artikel yang dipublikasi</p>
                <button
                  @click="createNewArticle"
                  class="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
                >
                  Buat Artikel Pertama
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Booking Terbaru -->
        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold">Booking Terbaru</h2>
            <div class="flex space-x-2">
              <input
                type="text"
                placeholder="Cari booking..."
                class="border rounded px-3 py-1 text-sm"
              />
              <button
                @click="goToBookingManagement"
                class="bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700"
              >
                Kelola Semua
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead>
                <tr class="text-left text-gray-500">
                  <th class="py-2 px-4">Klien</th>
                  <th class="py-2 px-4">Jenis Konsultasi</th>
                  <th class="py-2 px-4">Status</th>
                  <th class="py-2 px-4">Tanggal Booking</th>
                  <th class="py-2 px-4">Pengacara</th>
                  <th class="py-2 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="booking in recentBookings.slice(0, 3)"
                  :key="booking.booking_id"
                >
                  <td class="py-2 px-4 flex items-center">
                    <img
                      class="w-8 h-8 rounded-full mr-2"
                      :src="`https://randomuser.me/api/portraits/${
                        booking.booking_id % 2 === 0 ? 'men' : 'women'
                      }/${40 + booking.booking_id}.jpg`"
                    />
                    <div>
                      <div class="font-semibold">
                        {{ booking.nama_pembooking }}
                      </div>
                      <div class="text-xs text-gray-500">
                        {{ booking.email }}
                      </div>
                    </div>
                  </td>
                  <td class="py-2 px-4">{{ booking.specialty }}</td>
                  <td class="py-2 px-4">
                    <span
                      :class="{
                        'bg-yellow-100 text-yellow-700':
                          booking.status === 'pending',
                        'bg-green-100 text-green-700':
                          booking.status === 'approved',
                        'bg-red-100 text-red-700':
                          booking.status === 'rejected',
                      }"
                      class="px-2 py-1 rounded text-xs"
                    >
                      {{
                        booking.status === "pending"
                          ? "Pending"
                          : booking.status === "approved"
                          ? "Approved"
                          : "Rejected"
                      }}
                    </span>
                  </td>
                  <td class="py-2 px-4">
                    <div>{{ formatDate(booking.tanggal_booking) }}</div>
                    <div class="text-xs text-gray-500">
                      {{ booking.waktu_booking }} WIB
                    </div>
                  </td>
                  <td class="py-2 px-4">{{ booking.lawyer_name }}</td>
                  <td class="py-2 px-4">
                    <div
                      v-if="booking.status === 'pending'"
                      class="flex space-x-1"
                    >
                      <button
                        class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs hover:bg-green-200"
                        @click="approveBooking(booking.booking_id)"
                      >
                        Setujui
                      </button>
                      <button
                        class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs hover:bg-red-200"
                        @click="rejectBooking(booking.booking_id)"
                      >
                        Tolak
                      </button>
                    </div>
                    <button
                      v-else
                      class="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs hover:bg-blue-200"
                      @click="openBookingDetail(booking)"
                    >
                      Lihat Detail
                    </button>
                    <!-- Modal Detail Booking -->
                    <div
                      v-if="showBookingModal"
                      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                    >
                      <div
                        class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
                      >
                        <button
                          @click="closeBookingModal"
                          class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
                        >
                          &times;
                        </button>
                        <h3 class="text-lg font-bold mb-4">Detail Booking</h3>
                        <div v-if="selectedBooking">
                          <div class="mb-2">
                            <span class="font-semibold">Klien:</span>
                            {{ selectedBooking.nama_pembooking }}
                          </div>
                          <div class="mb-2">
                            <span class="font-semibold">Email:</span>
                            {{ selectedBooking.email }}
                          </div>
                          <div class="mb-2">
                            <span class="font-semibold">No. HP:</span>
                            {{ selectedBooking.nomor_handphone }}
                          </div>
                          <div class="mb-2">
                            <span class="font-semibold">Tanggal Booking:</span>
                            {{ formatDate(selectedBooking.tanggal_booking) }}
                            {{ selectedBooking.waktu_booking }} WIB
                          </div>
                          <div class="mb-2">
                            <span class="font-semibold">Status:</span>
                            {{ selectedBooking.status }}
                          </div>
                          <div class="mb-2">
                            <span class="font-semibold">Pengacara:</span>
                            {{ selectedBooking.lawyer_name }}
                          </div>
                          <div class="mb-2">
                            <span class="font-semibold">Spesialisasi:</span>
                            {{ selectedBooking.specialty }}
                          </div>
                          <div class="mb-2">
                            <span class="font-semibold">Dibuat pada:</span>
                            {{ formatDate(selectedBooking.created_at) }}
                          </div>
                        </div>
                        <div v-else>
                          <p>Data booking tidak ditemukan.</p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <!-- Fallback jika tidak ada data -->
                <tr v-if="recentBookings.length === 0">
                  <td colspan="6" class="py-8 px-4 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <span class="material-icons text-gray-300 text-4xl mb-2"
                        >event_busy</span
                      >
                      <p>Belum ada booking yang masuk</p>
                    </div>
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Reactive data
const adminName = ref("");
const showMobileMenu = ref(false);
const stats = ref({
  totalUsers: 0,
  totalArticles: 0,
  pendingBookings: 0,
  totalLawyers: 0,
  totalViews: 0,
});
const recentArticles = ref([]);
const recentBookings = ref([]);

// Modal booking detail
const showBookingModal = ref(false);
const selectedBooking = ref(null);
// Modal handlers
const openBookingDetail = (booking) => {
  selectedBooking.value = booking;
  showBookingModal.value = true;
};

const closeBookingModal = () => {
  showBookingModal.value = false;
  selectedBooking.value = null;
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
    console.error("Token parsing error:", error);
    router.push("/login");
  }
};

const loadAdminData = () => {
  console.log("Loading admin dashboard data...");
};

// Ambil users dari API dan hitung hanya yang role 'users'
const fetchTotalUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/users/get-users");
    const data = await response.json();
    if (response.ok && data.users) {
      // Hanya user dengan role 'users'
      return data.users.filter((u) => u.role === "users").length;
    }
    return 0;
  } catch (error) {
    console.error("Error fetching users:", error);
    return 0;
  }
};

const loadStats = async () => {
  try {
    // Load articles from API
    await loadRecentArticles();
    // Load bookings from API
    await loadRecentBookings();
    // Load total klien dari API users
    const totalUsers = await fetchTotalUsers();
    // Mock data untuk statistik lainnya
    stats.value = {
      totalUsers,
      totalArticles: recentArticles.value.length || 28,
      pendingBookings: recentBookings.value.length,
      totalLawyers: 8,
      totalViews: 3250,
    };
  } catch (error) {
    console.error("Error loading stats:", error);
  }
};

const loadRecentArticles = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/article/get-articles?limit=5&offset=0"
    );
    const data = await response.json();

    if (response.ok && data.success) {
      recentArticles.value = data.articles || data.data || [];
      console.log("Recent articles loaded:", recentArticles.value);
    } else {
      console.error("Failed to load articles:", data.message);
      recentArticles.value = [];
    }
  } catch (error) {
    console.error("Error loading recent articles:", error);
    recentArticles.value = [];
  }
};

const loadRecentBookings = async () => {
  try {
    // Try to get token first
    const token = localStorage.getItem("token");
    if (token) {
      // Try to call the API
      const response = await fetch(
        "http://localhost:3000/api/booking/get-bookings?limit=20&offset=0",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.bookings) {
          // Filter hanya status pending
          recentBookings.value = data.bookings.filter(
            (b) => b.status === "pending"
          );
          console.log(
            "Recent pending bookings loaded from API:",
            recentBookings.value
          );
          return;
        }
      }
    }
    // Fallback to mock data jika API gagal atau tidak ada token
    console.log("Using mock booking data (API not available or no auth)");
    recentBookings.value = [
      {
        booking_id: 1,
        nama_pembooking: "Siti Rahma",
        email: "siti.rahma@email.com",
        nomor_handphone: "081234567890",
        tanggal_booking: "2025-07-15",
        waktu_booking: "14:00",
        status: "pending",
        lawyer_name: "Anas Nazarudin",
        specialty: "Hukum Keluarga",
        created_at: "2025-07-11T10:00:00Z",
      },
    ];
    console.log("Recent bookings loaded (fallback):", recentBookings.value);
  } catch (error) {
    console.error("Error loading recent bookings:", error);
    // Use empty array as final fallback
    recentBookings.value = [];
  }
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const logout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("storage"));
  router.push("/login");
};

const goToArticles = () => {
  router.push("/articles");
};

const goToArticleManagement = () => {
  router.push("/admin/article-management");
};

const createNewArticle = () => {
  router.push("/admin/article-management");
};


const goToBookingManagement = () => {
  router.push("/admin/booking-management");
};

const approveBooking = (bookingId) => {
  alert(
    `Booking ID ${bookingId} disetujui! Klien akan mendapat notifikasi via email.`
  );
  // TODO: Implement API call to approve booking
};

const rejectBooking = (bookingId) => {
  alert(
    `Booking ID ${bookingId} ditolak! Klien akan mendapat notifikasi untuk memilih waktu lain.`
  );
  // TODO: Implement API call to reject booking
};

const goToUsers = () => {
  alert("Halaman manajemen klien segera hadir!");
};

const goToLawyerManagement = () => {
  router.push("/admin/lawyer-management");
};

const goToArticleDetail = (articleId) => {
  router.push(`/admin/article-detail/${articleId}`);
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const handleImageError = (event) => {
  event.target.src = "/src/assets/images/default-article.jpg";
};

const goToHomepage = () => {
  router.push("/");
};

const goToBookingSchedule = () => {
  router.push("/booking");
};

// Lifecycle
onMounted(async () => {
  checkAdminAuth();
  loadAdminData();
  await loadStats();

  // Close mobile menu on desktop
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      showMobileMenu.value = false;
    }
  };

  window.addEventListener("resize", handleResize);
  handleResize(); // Check initial size
});
</script>

<style scoped>
/* Additional custom styles if needed */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.transition-shadow {
  transition: box-shadow 0.3s ease;
}
</style>
