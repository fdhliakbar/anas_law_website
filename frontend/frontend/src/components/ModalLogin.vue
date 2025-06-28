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
            class="bg-indigo-500 rounded-full w-16 h-16 flex items-center justify-center -mt-12 mb-4 border-4 border-white shadow"
          >
            <span class="text-4xl">🩺</span>
          </div>
          <h2 class="text-xl font-bold mb-1 text-center">
            Masukkan Ke Akun Anda
          </h2>
          <p class="text-gray-600 text-center mb-4 text-sm">
            Silakan masukkan nama pengguna dan kata sandi Anda untuk melanjutkan
            ke layanan
            <router-link
              to="/register"
              class="no-underline hover:underline text-black"
            >
              Anas Law
            </router-link>
          </p>
          <form @submit.prevent="handleSubmit" class="w-full">
            <div class="mb-4">
              <input
                v-model="email"
                type="email"
                required
                placeholder="Email"
                class="border rounded px-3 py-2 w-full focus:outline-none"
              />
            </div>
            <div class="mb-4">
              <input
                v-model="password"
                type="password"
                required
                placeholder="Password"
                class="border rounded px-3 py-2 w-full focus:outline-none"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-indigo-600 text-white font-semibold py-2 rounded mb-2 hover:bg-indigo-700 transition"
            >
              Lanjut
            </button>
          </form>
          <p class="text-xs text-gray-500 text-center mt-2">
            Belum punya akun?
            <router-link to="/register" class="text-indigo-600 hover:underline">
              Daftar Sekarang
            </router-link>
            <br />
            <a href="#" class="text-black underline"> Ketentuan Pengunaan.</a>
            dan
            <a href="#" class="text-black underline">Kebijakan Privasi</a>
            Anas Law
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();

async function handleSubmit() {
  try {
    const response = await fetch("/api/check-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });
    if (!response.ok) {
      const text = await response.text();
      console.error("HTTP Error:", response.status, text);
      alert("Terjadi kesalahan pada server: " + response.status);
      return;
    }
    const data = await response.json();
    console.log("API Response:", data);
    if (data.exists) {
      router.push("/chat");
    } else {
      alert("Akun tidak ditemukan, silakan registrasi.");
    }
  } catch (e) {
    console.error("Fetch error:", e);
    alert("Terjadi kesalahan, silakan coba lagi.");
  }
}
</script>
