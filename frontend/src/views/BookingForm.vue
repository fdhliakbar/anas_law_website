<template>
  <Header />
  
  <div class="min-h-screen bg-gray-50 ">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
        <p class="text-gray-600">Loading lawyer data...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button 
          @click="loadLawyerData"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="selectedLawyer" class="max-w-4xl mx-auto px-4 py-8">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 mt-10 ">
        <div class="flex items-center gap-4">
          <img
            :src="getPhotoUrl(selectedLawyer.photo)"
            :alt="selectedLawyer.name"
            class="w-16 h-16 rounded-full object-cover"
            @error="handleImageError"
          />
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ selectedLawyer.name }}</h1>
            <p class="text-gray-600">{{ selectedLawyer.specialty }}</p>
            <p class="text-sm text-gray-500">{{ selectedLawyer.experience }} tahun pengalaman</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        <!-- Left Column - About Mentor -->
        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Tentang Lawyer</h2>
            <p class="text-gray-600 leading-relaxed">
              {{ selectedLawyer?.description || 'Pengacara berpengalaman dengan latar belakang yang kuat dalam bidang hukum pidana, perdata, dan korporat. Berpengalaman menangani berbagai kasus hukum kompleks dan memberikan konsultasi profesional kepada klien dari berbagai kalangan.' }}
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Topik Keahlian</h2>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Hukum Pidana</span>
              <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Hukum Perdata</span>
              <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Hukum Korporat</span>
              <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Hukum Keluarga</span>
            </div>
          </div>
        </div>

        <!-- Right Column - Booking Form -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Booking Lawyer</h2>
          
          <!-- Calendar -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Pilih tanggal *
            </label>
            <div class="border rounded-lg p-4">
              <div class="flex items-center justify-between mb-4">
                <button @click="previousMonth" class="p-2 hover:bg-gray-100 rounded">
                  <i class="fas fa-chevron-left text-gray-600"></i>
                </button>
                <h3 class="font-semibold text-gray-900">{{ currentMonthYear }}</h3>
                <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded">
                  <i class="fas fa-chevron-right text-gray-600"></i>
                </button>
              </div>
              
              <div class="grid grid-cols-7 gap-1 text-center text-sm">
                <div v-for="day in ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']" :key="day" class="p-2 text-gray-600 font-medium">
                  {{ day }}
                </div>
                <div v-for="date in calendarDates" :key="date.key" class="p-2">
                  <button
                    v-if="date.isCurrentMonth"
                    @click="selectDate(date)"
                    :class="[
                      'w-8 h-8 rounded-full text-sm transition-colors',
                      date.isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700',
                      date.isToday ? 'bg-blue-100 text-blue-600' : '',
                      !date.isAvailable ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'
                    ]"
                    :disabled="!date.isAvailable"
                  >
                    {{ date.date }}
                  </button>
                  <div v-else class="w-8 h-8"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Time Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Pilih jam *
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="time in availableTimes"
                :key="time"
                @click="selectedTime = time"
                :class="[
                  'px-3 py-2 text-sm rounded-lg border transition-colors',
                  selectedTime === time 
                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                    : 'border-gray-300 hover:border-gray-400 text-gray-700'
                ]"
              >
                {{ time }}
              </button>
            </div>
          </div>

          <!-- Form - SESUAIKAN DENGAN DATABASE -->
          <form @submit.prevent="submitBooking" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nama lengkap *
              </label>
              <input
                v-model="form.nama_pembooking"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan email Anda"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nomor Handphone *
              </label>
              <input
                v-model="form.nomor_handphone"
                type="tel"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="08123456789"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Pesan untuk lawyer
              </label>
              <textarea
                v-model="form.pesan"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Ceritakan masalah hukum yang ingin Anda konsultasikan..."
              ></textarea>
            </div>

            <div class="pt-4">
              <button
                type="submit"
                :disabled="!isFormValid || isSubmitting"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ isSubmitting ? 'Memproses...' : 'Booking Konsultasi' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div 
      v-if="showSuccessModal" 
      class="fixed inset-0 flex items-center justify-center z-50 p-4"
    >
      <div 
        class="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-2xl border"
      >
        <div class="text-green-500 text-6xl mb-4">✓</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Booking Berhasil!</h3>
        <p class="text-gray-600 mb-6">
          Sesi konsultasi Anda telah berhasil dijadwalkan. Kami akan mengirimkan detail lebih lanjut melalui email.
        </p>
        <button
          @click="closeSuccessModal"
          class="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

const router = useRouter();
const route = useRoute();

// Data
const selectedLawyer = ref<any>(null);
const selectedDate = ref<any>(null);
const selectedTime = ref<string>('');
const currentDate = ref(new Date());
const showSuccessModal = ref(false);
const isSubmitting = ref(false);
const loading = ref(false);
const error = ref('');

// Form data - SESUAIKAN DENGAN DATABASE
const form = ref({
  nama_pembooking: '',    // sesuai kolom nama_pembooking
  email: '',              // sesuai kolom email  
  nomor_handphone: '',    // sesuai kolom nomor_handphone
  pesan: ''               // sesuai kolom pesan
});

// Available times
const availableTimes = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
];

// Helper functions - TAMBAHKAN INI
const getPhotoUrl = (photo: string) => {
  if (!photo) return '/src/assets/images/default-lawyer.jpg';
  
  if (photo.startsWith('/src/assets/')) {
    return photo;
  }
  
  if (photo.startsWith('/uploads/')) {
    return `https://mptibe-production.up.railway.app${photo}`;
  }
  
  return '/src/assets/images/default-lawyer.jpg';
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = '/src/assets/images/default-lawyer.jpg';
};

// Computed properties
const currentMonthYear = computed(() => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return `${months[currentDate.value.getMonth()]} ${currentDate.value.getFullYear()}`;
});

const calendarDates = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();
  
  const dates = [];
  
  // Add empty cells for days before the first day of the month
  const startDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
  for (let i = 1; i < startDay; i++) {
    dates.push({
      date: '',
      isCurrentMonth: false,
      isSelected: false,
      isToday: false,
      isAvailable: false,
      key: `empty-${i}`
    });
  }
  
  // Add days of the month
  for (let date = 1; date <= lastDay.getDate(); date++) {
    const currentDateObj = new Date(year, month, date);
    const isToday = currentDateObj.toDateString() === today.toDateString();
    const isSelected = selectedDate.value && 
      currentDateObj.toDateString() === selectedDate.value.fullDate.toDateString();
    const isAvailable = currentDateObj >= today;
    
    dates.push({
      date,
      fullDate: currentDateObj,
      isCurrentMonth: true,
      isSelected,
      isToday,
      isAvailable,
      key: `date-${date}`
    });
  }
  
  return dates;
});

const isFormValid = computed(() => {
  return form.value.nama_pembooking && 
         form.value.email && 
         form.value.nomor_handphone &&
         selectedDate.value && 
         selectedTime.value;
});

// Methods
const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

const selectDate = (date: any) => {
  if (date.isAvailable) {
    selectedDate.value = date;
  }
};

const loadLawyerData = async () => {
  const lawyerId = route.params.lawyerId;
  
  if (!lawyerId) {
    error.value = 'Lawyer ID tidak ditemukan';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    console.log('Loading lawyer with ID:', lawyerId); // DEBUG
    
    const response = await fetch(`https://mptibe-production.up.railway.app/api/lawyers/get-lawyer?lawyer_id=${lawyerId}`);
    const data = await response.json();
    
    console.log('API Response:', data); // DEBUG
    
    if (response.ok) {
      selectedLawyer.value = data.lawyer;
      console.log('Loaded lawyer:', data.lawyer); // DEBUG
    } else {
      error.value = data.message || 'Gagal memuat data lawyer';
    }
  } catch (err) {
    console.error('Error loading lawyer:', err);
    error.value = 'Terjadi kesalahan saat memuat data lawyer';
  } finally {
    loading.value = false;
  }
};

const prefillUserData = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      form.value.nama_pembooking = payload.name || '';
      form.value.email = payload.email || '';
    } catch (error) {
      console.error('Error parsing token:', error);
    }
  }
};

const submitBooking = async () => {
  if (!isFormValid.value || !selectedLawyer.value) return;
  
  isSubmitting.value = true;
  
  try {
    const token = localStorage.getItem('token');
    const bookingData = {
      lawyer_id: selectedLawyer.value.lawyer_id,
      nama_pembooking: form.value.nama_pembooking,    // SESUAI DB
      email: form.value.email,                        // SESUAI DB
      nomor_handphone: form.value.nomor_handphone,    // SESUAI DB
      tanggal_booking: selectedDate.value.fullDate.toISOString().split('T')[0], // SESUAI DB
      waktu_booking: selectedTime.value,              // SESUAI DB
      pesan: form.value.pesan || null                 // SESUAI DB
    };

    const response = await fetch('https://mptibe-production.up.railway.app/api/booking/create-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookingData)
    });

    const result = await response.json();

    if (response.ok) {
      // Simpan detail booking untuk halaman success
      localStorage.setItem('latestBooking', JSON.stringify({
        ...bookingData,
        lawyer_name: selectedLawyer.value.name,
        booking_id: result.booking.booking_id
      }));
      
      showSuccessModal.value = true;
    } else {
      alert(result.message || 'Gagal membuat booking');
    }
    
  } catch (error) {
    console.error('Error submitting booking:', error);
    alert('Gagal mengirim booking. Silakan coba lagi.');
  } finally {
    isSubmitting.value = false;
  }
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  router.push('/booking-success');
};

onMounted(async () => {
  console.log('BookingForm mounted'); // DEBUG
  console.log('Route params:', route.params); // DEBUG
  
  // Check auth first
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('No token, redirecting to login'); // DEBUG
    router.push(`/login?redirect=${route.fullPath}`);
    return;
  }

  // Load lawyer data and prefill user data
  await loadLawyerData();
  prefillUserData();
});
</script>

<style scoped>
.transition-colors {
  transition: all 0.2s ease;
}
</style>
