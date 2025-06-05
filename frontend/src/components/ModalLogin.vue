<template>
  <div class="fixed inset-0 z-50">
    <!-- Overlay gelap transparan -->
    <div class="absolute inset-0 transition-opacity"></div>
    <!-- Modal -->
    <div class="relative flex items-center justify-center min-h-screen">
      <div
        class="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative mx-auto"
      >
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
        <div class="flex flex-col items-center">
          <div
            class="bg-pink-500 rounded-full w-16 h-16 flex items-center justify-center -mt-12 mb-4 border-4 border-white shadow"
          >
            <span class="text-4xl">🩺</span>
          </div>
          <h2 class="text-xl font-bold mb-1 text-center">
            Masukkan Nomor Ponsel
          </h2>
          <p class="text-gray-600 text-center mb-4 text-sm">
            Masukkan nomor ponsel untuk masuk ke Anas Law atau membuat
            <router-link
              to="/register"
              class="no-underline hover:underline text-pink-600"
            >
              akun baru
            </router-link>
          </p>
          <form @submit.prevent="handleSubmit" class="w-full">
            <div class="flex items-center mb-4">
              <select class="border rounded-l px-2 py-2 bg-gray-100" disabled>
                <option>+62</option>
              </select>
              <input
                v-model="phone"
                type="tel"
                required
                placeholder="08xxxxxxxxxx"
                class="border-t border-b border-r rounded-r px-3 py-2 w-full focus:outline-none"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-pink-600 text-white font-semibold py-2 rounded mb-2 hover:bg-pink-700 transition"
            >
              Lanjut
            </button>
          </form>
          <p class="text-xs text-gray-500 text-center mt-2">
            Dengan masuk atau mendaftar, saya menyetujui
            <a href="#" class="text-pink-600 underline">Ketentuan Penggunaan</a>
            dan
            <a href="#" class="text-pink-600 underline">Kebijakan Privasi</a>
            Anas Law
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const phone = ref("");

function handleSubmit() {
  // Simulasi pengecekan akun
  const registered = false; // Ganti dengan pengecekan ke backend
  if (registered) {
    alert("Login berhasil!"); // Ganti dengan proses login
  } else {
    alert("Nomor belum terdaftar, silakan registrasi."); // Ganti dengan redirect ke halaman registrasi
    // Contoh redirect:
    // window.location.href = '/register';
  }
}
</script>
