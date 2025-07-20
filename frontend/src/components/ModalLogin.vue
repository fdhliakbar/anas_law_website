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
    // Validasi input
    if (!email.value || !password.value) {
      alert("Email dan password harus diisi");
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        email: email.value.trim(), 
        password: password.value 
      }),
    });

    const data = await response.json();
    console.log("API Response:", data);

    if (response.ok && data.success) {
      // Simpan token ke localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      alert(`Login berhasil! Selamat datang ${data.user.name}`);
      
      // Redirect berdasarkan role
      if (data.user.role === 'admin') {
        console.log("Redirecting to admin dashboard...");
        router.push("/admin/dashboard");
      } else {
        console.log("Redirecting to home...");
        router.push("/");
      }
      
      // Clear form
      email.value = "";
      password.value = "";
      
    } else {
      // Error handling yang lebih baik
      const errorMessage = data.message || "Login gagal, silakan coba lagi.";
      alert(errorMessage);
      console.error("Login failed:", data);
    }
  } catch (e) {
    console.error("Fetch error:", e);
    alert("Terjadi kesalahan koneksi, silakan coba lagi.");
  }
}
</script>
