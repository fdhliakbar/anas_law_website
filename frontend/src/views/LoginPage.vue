<template>
  <section id="login">
    <div class="min-h-screen flex items-center justify-center bg-[#F0F0F0]">
      <div
        class="bg-white rounded-2xl shadow-md px-10 py-12 w-full max-w-md text-center"
      >
        <h1 class="text-2xl font-semibold mb-6">Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              class="w-full px-4 py-3 rounded-lg bg-[#F0F0F0] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="w-full px-4 py-3 rounded-lg bg-[#F0F0F0] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div class="text-left text-sm mb-6">
            Belum punya akun?
            <router-link to="/register" class="font-semibold"
              >Daftar dulu</router-link
            >
          </div>
          <button
            type="submit"
            class="bg-[#131416] text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      const validEmail = "admin@email.com";
      const validPassword = "123456";

      if (this.email === validEmail && this.password === validPassword) {
        alert("Login berhasil!");
        this.$router.push("/"); // Pastikan route "/home" sudah tersedia
      } else {
        alert("Email atau password salah.");
      }
    },
  },
};
</script>

<style scoped>
/* Tambahan styling jika diperlukan */
</style>