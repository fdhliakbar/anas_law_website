<template>
  <Header />
  <div class="max-w-3xl mx-auto py-12 px-4">
    <h1 class="text-4xl font-bold mb-10 text-center text-gray-800 pt-16">Booking Saya</h1>

    <div v-if="loading" class="text-center py-8 text-gray-500">Memuat data booking...</div>

    <div v-else-if="bookings.length === 0" class="text-center py-8 text-gray-500">
      Anda belum memiliki booking.
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="booking in bookings"
        :key="booking.booking_id"
        class="p-6 border rounded-2xl bg-white shadow-md"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-1">{{ booking.lawyer_name }}</h2>
        <p class="text-sm text-gray-500 mb-2">Spesialisasi: {{ booking.specialty }}</p>
        
        <p class="text-gray-700 mb-1">
          <span class="font-medium">Tanggal:</span> {{ formatDate(booking.tanggal_booking) }}
          <span class="ml-2 font-medium">Jam:</span> {{ booking.waktu_booking }}
        </p>

        <p class="text-gray-600 mb-2">
          <span class="font-medium">Pesan:</span> {{ booking.pesan }}
        </p>

        <p class="text-sm font-semibold"
           :class="{
              'text-yellow-600': booking.status === 'pending',
              'text-green-600': booking.status === 'approved',
              'text-red-600': booking.status === 'rejected',
            }">
          Status: {{ booking.status }}
        </p>

        <div
          v-if="booking.reschedule_date || booking.reschedule_time || booking.reschedule_reason"
          class="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-700 rounded"
        >
          <p v-if="booking.reschedule_date"><strong>Jadwal Ulang:</strong> {{ formatDate(booking.reschedule_date) }}</p>
          <p v-if="booking.reschedule_time"><strong>Jam Ulang:</strong> {{ booking.reschedule_time }}</p>
          <p v-if="booking.reschedule_reason"><strong>Alasan:</strong> {{ booking.reschedule_reason }}</p>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>


<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const bookings = ref([]);
const loading = ref(true);

// Format tanggal ISO ke dd/mm/yyyy
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

onMounted(async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("https://mptibe-production.up.railway.app/api/booking/get-my-bookings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    bookings.value = data.bookings || [];
  } catch (e) {
    console.error("Gagal memuat data booking:", e);
    bookings.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
