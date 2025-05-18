<template>
  <div class="login-page">
    <h1>Login Page</h1>
    <!-- Tambahkan form login di sini -->
  </div>
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
