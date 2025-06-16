<template>
  <section id="login">
    <div class="min-h-screen flex items-center justify-center bg-[#F0F0F0]">
      <div
        class="bg-white rounded-2xl shadow-md px-10 py-12 w-full max-w-md text-center"
      >        <h1 class="text-2xl font-semibold mb-6">Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              class="w-full px-4 py-3 rounded-lg bg-[#F0F0F0] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="w-full px-4 py-3 rounded-lg bg-[#F0F0F0] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              required
            />
          </div>
          <div class="text-left text-sm mb-6">
            Belum punya akun?
            <router-link to="/register" class="font-semibold text-blue-600 hover:text-blue-800"
              >Daftar dulu</router-link
            >
          </div>
          <button
            type="submit"
            class="w-full bg-[#131416] text-white px-6 py-3 rounded-lg hover:opacity-90 transition mb-4"
          >
            Login
          </button>
        </form>
        <div class="text-center">
          <router-link to="/" class="text-sm text-gray-600 hover:text-gray-800">
            ← Kembali ke Home
          </router-link>
        </div>
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
  },  methods: {
    handleLogin() {
      const validEmail = "admin@email.com";
      const validPassword = "123456";

      if (this.email === validEmail && this.password === validPassword) {
        // Save login state
        localStorage.setItem('user', JSON.stringify({
          email: this.email,
          name: 'Admin User',
          loginTime: new Date().toISOString()
        }));
        
        alert("Login berhasil!");
        
        // Check if there's a redirect parameter
        const redirect = this.$route.query.redirect || '/';
        const packageParam = this.$route.query.package;
        
        if (packageParam) {
          this.$router.push(`${redirect}?package=${packageParam}`);
        } else {
          this.$router.push(redirect);
        }
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
