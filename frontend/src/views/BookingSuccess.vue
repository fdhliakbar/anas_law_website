<!-- filepath: /home/arddian/Desktop/anas_law_website/frontend/src/views/BookingSuccess.vue -->
<template>
  <Header />
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
      <!-- Success Icon -->
      <div class="mb-6">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
          <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>

      <!-- Success Message -->
      <h1 class="text-2xl font-bold text-gray-900 mb-4">
        Booking Berhasil!
      </h1>
      
      <p class="text-gray-600 mb-6">
        Terima kasih telah melakukan booking konsultasi. Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi jadwal.
      </p>

      <!-- Booking Details -->
      <div v-if="bookingDetails" class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
        <h3 class="font-semibold text-gray-900 mb-2">Detail Booking:</h3>
        <div class="space-y-1 text-sm text-gray-600">
          <p><span class="font-medium">Nama:</span> {{ bookingDetails.nama_pembooking }}</p>
          <p><span class="font-medium">Email:</span> {{ bookingDetails.email }}</p>
          <p><span class="font-medium">Tanggal:</span> {{ formatDate(bookingDetails.tanggal_booking) }}</p>
          <p><span class="font-medium">Waktu:</span> {{ bookingDetails.waktu_booking }}</p>
          <p><span class="font-medium">Status:</span> 
            <span class="text-yellow-600 font-medium">Menunggu Konfirmasi</span>
          </p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <button
          @click="goToHome"
          class="w-full bg-black text-white py-3 px-4 rounded-md font-medium hover:bg-gray-800 transition"
        >
          Kembali ke Beranda
        </button>
        
        <button
          @click="viewBookings"
          class="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-50 transition"
        >
          Lihat Booking Saya
        </button>
      </div>

      <!-- Contact Info -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <p class="text-sm text-gray-500">
          Ada pertanyaan? Hubungi kami di 
          <a href="tel:+6281234567890" class="text-black font-medium">+62 812-3456-7890</a>
        </p>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'BookingSuccess',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      bookingDetails: null
    };
  },
  mounted() {
    // Ambil booking details dari localStorage atau route params
    const details = localStorage.getItem('latestBooking');
    if (details) {
      this.bookingDetails = JSON.parse(details);
      // Hapus dari localStorage setelah ditampilkan
      localStorage.removeItem('latestBooking');
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    },

    goToHome() {
      this.$router.push('/');
    },

    viewBookings() {
      // Redirect ke halaman booking history user (buat nanti)
      this.$router.push('/my-bookings');
    }
  }
};
</script>