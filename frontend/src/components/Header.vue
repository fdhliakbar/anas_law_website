<template>
  <header class="sticky top-0 z-50">
    <!-- Navbar -->
    <nav
      :class=" [
        'fixed w-full z-50 transition-all duration-300 ease-in-out bg-[#2C323B]',
        scrolled
          
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
            width="100%"
          />
        </router-link>

        <!-- Navigation Links (centered) -->
        <ul
          class="hidden lg:flex items-center space-x-8 text-base text-[#f5f5f5] font-medium mx-8"
        >
          <li>
            <router-link to="/" class="hover:text-indigo-500"
              >{{ $t('header.home') }}</router-link
            >
          </li>
          <li>
            <router-link
              to="/pricing"
              class="hover:text-indigo-500"
              >{{ $t('header.pricing') }}</router-link
            >
          </li>
          <li>
            <router-link
              to="/booking"
              class="hover:text-indigo-500"
              >{{ $t('header.bookConsultation') }}</router-link
            >
          </li>
          <li>
            <a href="https://wa.me/6281394879411">
              <span class="bg-gray-100 px-4 py-2 rounded-lg text-[#121212] hover:text-indigo-500">Consultation</span>
            </a>
          </li>
        </ul>

        <!-- Right Side: Language Switcher, Login & Chat -->
        <div class="hidden lg:flex items-center space-x-3 flex-shrink-0">
          <LanguageSwitcher />
          <router-link
            to="/login"
            class="bg-gray-100 font-semibold px-4 py-2 rounded-lg text-sm text-[#121212]"
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
        <router-link
          to="/"
          class="block hover:underline"
          @click="closeMobileMenu"
          >{{ $t('header.home') }}</router-link
        >
        <a
          href="#"
          class="block hover:underline"
          @click.prevent="scrollTo('about')"
          >{{ $t('header.about') }}</a
        >
        <a
          href="#"
          class="block hover:underline"
          @click.prevent="scrollTo('services')"
          >{{ $t('header.services') }}</a
        >
        <router-link
          to="/pricing"
          class="block hover:underline"
          @click="closeMobileMenu"
        >
          {{ $t('header.pricing') }}
        </router-link>
        <router-link
          to="/booking"
          class="block hover:underline"
          @click="closeMobileMenu"
        >
          {{ $t('header.bookConsultation') }}
        </router-link>
        <a
          href="#"
          class="block hover:underline"
          @click.prevent="scrollTo('reviews')"
          >{{ $t('header.reviews') }}</a
        >
        <a
          href="#"
          class="block hover:underline"
          @click.prevent="scrollTo('footer')"
          >{{ $t('header.contact') }}</a
        >
        <div class="pt-2">
          <LanguageSwitcher />
        </div>
        <router-link
          to="/login"
          class="block border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition mt-2"
          @click="closeMobileMenu"
        >
          {{ $t('header.login') }}
        </router-link>
        
      </div>
    </nav>
  </header>
</template>

<script>
import LanguageSwitcher from './LanguageSwitcher.vue'

export default {
  name: "Header",
  components: {
    LanguageSwitcher
  },
  data() {
    return {
      scrolled: false,
      isMobileMenuOpen: false,
    };
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 10;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
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
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
/* Add any additional styles if needed */
