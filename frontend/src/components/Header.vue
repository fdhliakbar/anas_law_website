<template>
  <header class="sticky top-0 z-50">
    <!-- Navbar -->
    <nav
      :class="[
        'fixed w-full z-50 transition-all duration-300 ease-in-out bg-gray-400',
        scrolled,
      ]"
    >
      <div
        class="max-w-screen-xl mx-auto flex items-center justify-between p-3"
      >
        <!-- Logo -->
        <router-link to="/" class="flex items-center flex-shrink-0">
          <img
            src="../assets/images/logo.png"
            alt="Logo"
            class="h-10"
            width="200%"
          />
        </router-link>

        <!-- Navigation Links (centered) -->
        <ul
          class="hidden lg:flex items-center space-x-8 text-base text-gray-700 font-medium mx-8"
        >
          <li>
            <router-link to="/" class="hover:text-[#B49F2B]">{{
              $t("header.home")
            }}</router-link>
          </li>
          <li>
            <router-link to="/pricing" class="hover:text-[#B49F2B]">{{
              $t("header.pricing")
            }}</router-link>
          </li>
          <li>
            <router-link to="/booking" class="hover:text-[#B49F2B]">{{
              $t("header.bookConsultation")
            }}</router-link>
          </li>
          <li>
            <a
              href="#"
              class="hover:text-[#B49F2B]"
              @click.prevent="scrollTo('reviews')"
              >{{ $t("header.reviews") }}</a
            >
          </li>
        </ul>

        <!-- Right Side: Language Switcher, Auth -->
        <div class="hidden lg:flex items-center space-x-3 flex-shrink-0">
          <LanguageSwitcher />

          <!-- Dynamic Auth Button -->
          <router-link
            v-if="!isLoggedIn"
            to="/login"
            class="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm"
          >
            {{ $t("header.login") }}
          </router-link>

          <!-- Admin Dashboard Button -->
          <router-link
            v-else-if="isAdmin"
            to="/admin/dashboard"
            class="border border-indigo-500 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition text-sm"
          >
            Dashboard Admin
          </router-link>

          <!-- User Menu for regular users -->
          <div v-else class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm"
            >
              <span>{{ userInfo?.name || "User" }}</span>
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- User Dropdown Menu -->
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
            >
              <a
                href="#"
                @click="logout"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button class="lg:hidden text-gray-800 p-2" @click="toggleMobileMenu">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden bg-white text-gray-900 p-4 space-y-4"
      >
        <router-link
          to="/"
          class="block hover:underline"
          @click="closeMobileMenu"
          >{{ $t("header.home") }}</router-link
        >
        <a
          href="#"
          class="block hover:underline"
          @click.prevent="scrollTo('about')"
          >{{ $t("header.about") }}</a
        >
        <a
          href="#"
          class="block hover:underline"
          @click.prevent="scrollTo('services')"
          >{{ $t("header.services") }}</a
        >
        <router-link
          to="/pricing"
          class="block hover:underline"
          @click="closeMobileMenu"
        >
          {{ $t("header.pricing") }}
        </router-link>
        <router-link
          to="/booking"
          class="block hover:underline"
          @click="closeMobileMenu"
        >
          {{ $t("header.bookConsultation") }}
        </router-link>
        <a
          href="#"
          class="block hover:underline"
          @click.prevent="scrollTo('reviews')"
          >{{ $t("header.reviews") }}</a
        >
        <a
          href="#"
          class="block hover:underline"
          @click.prevent="scrollTo('footer')"
          >{{ $t("header.contact") }}</a
        >
        <div class="pt-2">
          <LanguageSwitcher />
        </div>

        <!-- Dynamic Mobile Auth -->
        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="block border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition mt-2"
          @click="closeMobileMenu"
        >
          {{ $t("header.login") }}
        </router-link>

        <!-- Admin Dashboard Mobile -->
        <router-link
          v-else-if="isAdmin"
          to="/admin/dashboard"
          class="block border border-indigo-500 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition mt-2"
          @click="closeMobileMenu"
        >
          Dashboard Admin
        </router-link>

        <!-- User Menu Mobile -->
        <div v-else class="mt-2">
          <div class="text-sm text-gray-600 px-2 py-1">
            Halo, {{ userInfo?.name || "User" }}
          </div>
          <button
            @click="logout"
            class="block w-full text-left border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition mt-1"
          >
            Logout
          </button>
        </div>
        <router-link
          to="/chat"
          class="block border border-blue-400 px-6 py-2 rounded-lg hover:bg-blue-100 transition text-blue-700 mt-2"
          @click="closeMobileMenu"
        >
          {{ $t("header.chat") }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import LanguageSwitcher from "./LanguageSwitcher.vue";

export default {
  name: "Header",
  components: {
    LanguageSwitcher,
  },
  data() {
    return {
      scrolled: false,
      isMobileMenuOpen: false,
      isUserMenuOpen: false,
      isLoggedIn: false,
      isAdmin: false,
      userInfo: null,
    };
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 10;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    toggleUserMenu() {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    },
    scrollTo(id) {
      this.isMobileMenuOpen = false;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    checkAuthStatus() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Decode JWT token to get user info
          const payload = JSON.parse(atob(token.split(".")[1]));

          // Check if token is expired
          const currentTime = Date.now() / 1000;
          if (payload.exp && payload.exp < currentTime) {
            this.logout();
            return;
          }

          this.isLoggedIn = true;
          this.userInfo = {
            name: payload.name,
            email: payload.email,
            role: payload.role,
          };
          this.isAdmin = payload.role === "admin";
        } catch (error) {
          console.error("Error parsing token:", error);
          this.logout();
        }
      } else {
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.userInfo = null;
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.userInfo = null;
      this.isUserMenuOpen = false;
      this.$router.push("/");
    },
    handleClickOutside(event) {
      // Close user dropdown when clicking outside
      if (!event.target.closest(".relative")) {
        this.isUserMenuOpen = false;
      }
    },
  },
  watch: {
    $route() {
      // Check auth status when route changes (like after login)
      this.checkAuthStatus();
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
    this.checkAuthStatus();

    // Listen for auth changes
    window.addEventListener("storage", this.checkAuthStatus);

    // Close dropdown when clicking outside
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("storage", this.checkAuthStatus);
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
/* Add any additional styles if needed */
