<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-4">
    <div
      class="bg-white border border-gray-200 rounded-2xl overflow-hidden w-full max-w-4xl lg:flex shadow-lg"
    >
      <!-- Left Side - Form -->
      <div class="w-full lg:w-1/2 p-8 md:p-12">
        <div class="flex items-center mb-8">
          <button
            @click="goBack"
            class="text-gray-600 hover:text-black transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        </div>

        <h2 class="font-bold text-4xl text-black mb-2">
          {{ $t("auth.login.title") }}
        </h2>
        <p class="text-gray-600 mb-8">{{ $t("auth.login.subtitle") }}</p>

        <form @submit.prevent="handleLogin">
          <div class="mb-6">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ $t("auth.login.email") }}
            </label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-black transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ $t("auth.login.password") }}
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="form.password"
                class="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-black transition pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <i
                  :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                ></i>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between mb-8">
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="form.rememberMe"
                class="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black"
              />
              <span class="ml-2 text-sm text-gray-700">{{
                $t("auth.login.rememberMe")
              }}</span>
            </label>
            <a href="#" class="text-sm text-black hover:underline font-medium">
              {{ $t("auth.login.forgotPassword") }}
            </a>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full border border-black bg-black text-white py-3 px-6 rounded-lg text-lg font-semibold transition hover:bg-gray-800 disabled:opacity-50"
          >
            <span v-if="!isLoading">{{ $t("auth.login.signIn") }}</span>
            <span v-else>{{ $t("auth.login.signingIn") }}</span>
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-gray-600">
            {{ $t("auth.login.noAccount") }}
            <router-link
              to="/register"
              class="text-black font-medium hover:underline"
            >
              {{ $t("auth.login.signUp") }}
            </router-link>
          </p>
        </div>
      </div>

      <!-- Right Side - Image/Info -->
      <div class="hidden lg:block w-1/2 bg-gray-900 relative">
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        <div
          class="relative z-10 h-full flex flex-col justify-center p-12 text-white"
        >
          <h3 class="font-bold text-3xl mb-4">
            Access Professional Legal Services
          </h3>
          <p class="text-lg text-gray-300 mb-8">
            Join thousands of clients who trust our experienced legal team for
            their legal needs.
          </p>
          <ul class="space-y-3">
            <li class="flex items-center">
              <i class="fas fa-check text-white mr-3"></i>
              <span>Free initial consultation</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-check text-white mr-3"></i>
              <span>Expert legal representation</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-check text-white mr-3"></i>
              <span>24/7 legal support</span>
            </li>
          </ul>
        </div>
        <img
          src="../assets/images/justice.jpg"
          alt="Legal Services"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      showPassword: false,
      isLoading: false,
      form: {
        email: "",
        password: "",
        rememberMe: false,
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async handleLogin() {
      this.isLoading = true;
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/post-users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "login",
              email: this.form.email,
              password: this.form.password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        // Simpan token jika perlu
        localStorage.setItem("token", data.token);

        // Trigger auth status update in other components
        window.dispatchEvent(new Event("storage"));

        // Ambil role dan isAdmin dari data.user
        const user = data.user || {};
        if (user.role === "admin" || user.isAdmin === true) {
          this.$router.push("/admin/dashboard");
        } else {
          this.$router.push("/");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert(error.message || "Login failed. Please try again.");
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Custom styles if needed */
.transition {
  transition: all 0.3s ease;
}
</style>
