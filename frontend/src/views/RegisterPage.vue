<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-100 to-slate-200 flex items-center justify-center p-4"
  >
    <div
      class="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl lg:flex"
    >
      <div class="w-full lg:w-1/2 p-6 sm:p-8 md:p-10">        <div class="flex items-center justify-between mb-8">
          <router-link to="/" class="text-gray-600 hover:text-gray-800 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
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
            Kembali ke Home
          </router-link>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mb-6">
          Create new account
        </h2>

        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Email address</label
            >
            <div class="relative rounded-md shadow-sm">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                  />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div class="mb-4">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label
            >
            <div class="relative rounded-md shadow-sm">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="form.password"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                placeholder="••••••••"
                required
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    v-if="!showPassword"
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.002.021-.002.042 0 .063C21.537 16.033 17.695 19 12 19c-4.478 0-8.268-2.943-9.542-7a24.392 24.392 0 010-.063z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p
              v-if="form.password && form.password.length < 8"
              class="mt-1 text-xs text-red-600"
            >
              Your password must be at least 8 characters long.
            </p>
          </div>

          <div class="mb-4">
            <label
              for="repeatPassword"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Repeat Password</label
            >
            <div class="relative rounded-md shadow-sm">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="repeatPassword"
                v-model="form.repeatPassword"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                placeholder="Repeat your password"
                required
              />
            </div>
            <p
              v-if="
                form.repeatPassword && form.repeatPassword !== form.password
              "
              class="mt-1 text-xs text-red-600"
            >
              Passwords do not match.
            </p>
          </div>

          <button
            type="submit"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out group"
          >
            Sign Up
            <svg
              class="w-5 h-5 ml-2 -mr-1 transform group-hover:translate-x-1 transition-transform duration-150"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </form>        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <router-link
              to="/login"
              class="font-medium text-bold text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </router-link>
          </p>
        </div>

        <div class="mt-8 text-center">
          <p class="text-xs text-gray-500">
            By continuing, you agree to
            <a
              href="#"
              class="text-indigo-600 hover:text-indigo-700 hover:underline"
              >Terms & Conditions</a
            >
            &
            <a
              href="#"
              class="text-indigo-600 hover:text-indigo-700 hover:underline"
              >Privacy Policy</a
            >.
          </p>
        </div>
      </div>

      <div
        class="hidden lg:flex lg:w-1/2 p-12 items-center justify-center relative"
      >
        <div class="text-center">
          <img
            src="../assets/images/profile.jpg"
            alt="Boosting Local Businesses"
            class="rounded-xl w-88 h-120 mx-auto mb-8 shadow-lg object-cover"
          />
        </div>
        <button
          @click="changeLanguage"
          class="absolute top-6 right-6 text-white hover:text-indigo-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        email: "",
        password: "",
        repeatPassword: "",
      },
      showPassword: false,
    };
  },  methods: {
    async handleRegister() {
      if (this.form.password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
      }
      if (this.form.password !== this.form.repeatPassword) {
        alert("Passwords do not match.");
        return;
      }
      
      // For demo purposes, we'll simulate a successful registration
      // In a real app, you would send this to your backend
      try {
        // Simulate API call
        const userData = {
          email: this.form.email,
          password: this.form.password,
        };
        
        // Simulate successful registration
        setTimeout(() => {
          alert("Registrasi berhasil! Silakan login dengan akun baru Anda.");
          this.$router.push("/login");
        }, 1000);
        
        // Uncomment this for real API integration
        /*
        const response = await fetch(
          "http://localhost:3000/api/users/post-register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          }
        );
        if (!response.ok) throw new Error("Registration failed");
        alert("Registrasi berhasil!");
        this.$router.push("/login");
        */
      } catch (err) {
        alert("Registrasi gagal: " + err.message);
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    goBack() {
      this.$router.go(-1);
    },
    goToLogin() {
      this.$router.push("/login");
    },
    changeLanguage() {
      alert("Tombol ganti bahasa diklik!");
    },
  },
};
</script>
