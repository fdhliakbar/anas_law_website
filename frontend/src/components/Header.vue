<template>
  <header class="sticky top-0 z-50">
    <!-- Navbar -->
    <nav
<<<<<<< HEAD
      :class=" [
        'fixed w-full z-50 transition-all duration-300 ease-in-out bg-[#2C323B]',
        scrolled
          
=======
      :class="[
        'fixed w-full z-50 transition-all duration-300 ease-in-out bg-slate-300 py-2',
>>>>>>> 0cd1d6d16123eb354a5b776bd68e96c7b6759af9
      ]"
    >
      <div
        class="max-w-screen-xl mx-auto flex items-center justify-between p-3"
      >
        <!-- Logo -->
<<<<<<< HEAD
        <router-link to="/" class="flex items-center flex-shrink-0">
=======
        <router-link to="/" class="flex items-center fle">
>>>>>>> 0cd1d6d16123eb354a5b776bd68e96c7b6759af9
          <img
            src="../assets/images/logo.png"
            alt="Logo"
            class="h-10"
            width="100%"
          />
        </router-link>
<<<<<<< HEAD

=======
>>>>>>> 0cd1d6d16123eb354a5b776bd68e96c7b6759af9
        <!-- Navigation Links (centered) -->
        <ul
          class="hidden lg:flex items-center space-x-8 text-base text-gray-700 font-medium mx-8"
        >
          <li>
            <router-link to="/" class="hover:text-[#B49F2B]"
              >{{ $t('header.home') }}</router-link
            >
          </li>
          <li>
            <router-link
              to="/pricing"
              class="hover:text-[#B49F2B]"
              >{{ $t('header.pricing') }}</router-link
            >
          </li>
          <li>
            <router-link
              to="/booking"
              class="hover:text-[#B49F2B]"
              >{{ $t('header.bookConsultation') }}</router-link
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:text-[#B49F2B]"
              @click.prevent="scrollTo('reviews')"
              >{{ $t('header.reviews') }}</a
=======
              class="hover:text-[#B49F2B]"
              @click.prevent="scrollTo('services')"
              >Services</a
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:text-[#B49F2B]"
              @click.prevent="scrollTo('footer')"
              >Contact</a
>>>>>>> 0cd1d6d16123eb354a5b776bd68e96c7b6759af9
            >
          </li>
          <li>
             <router-link to="/pricing" class="hover:text-[#B49F2B]">Pricing</router-link>
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
            {{ $t('header.login') }}
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button class="lg:hidden text-[#f5f5f5] p-2" @click="toggleMobileMenu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden bg-white text-gray-900 p-4 space-y-4"
      >
<<<<<<< HEAD
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
