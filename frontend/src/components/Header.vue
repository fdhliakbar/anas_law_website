<template>
  <header class="sticky top-0 z-50">
    <!-- Navbar -->
    <nav
      :class="[
        'fixed w-full z-50 transition-all duration-300 ease-in-out',
        scrolled
          ? 'bg-white/30 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4',
      ]"
    >
      <div
        class="max-w-screen-xl mx-auto flex items-center justify-between p-3"
      >
        <!-- Logo -->
        <a href="#" class="flex items-center flex-none">
          <img
            src="../assets/images/logo.png"
            alt="Logo"
            class="h-10"
            width="200%"
          />
        </a>
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
            <a
              href="#"
              class="hover:text-[#B49F2B]"
              @click.prevent="scrollTo('about')"
              >{{ $t('header.about') }}</a
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:text-[#B49F2B]"
              @click.prevent="scrollTo('services')"
              >{{ $t('header.services') }}</a
            >
          </li>
          <li>
            <router-link
              to="/pricing"
              class="hover:text-[#B49F2B]"
              >{{ $t('header.pricing') }}</router-link
            >
          </li>
          <!-- <li>
            <a
              href="#"
              class="hover:text-[#B49F2B]"
              @click.prevent="scrollTo('team')"
              >Our Team</a
            >
          </li> -->
          <li>
            <a
              href="#"
              class="hover:text-[#B49F2B]"
              @click.prevent="scrollTo('reviews')"
              >Reviews</a
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:text-[#B49F2B]"
              @click.prevent="scrollTo('footer')"
              >{{ $t('header.contact') }}</a
            >
          </li>
          <li>
             <router-link to="/pricing" class="hover:text-[#B49F2B]">Pricing</router-link>
          </li>
        </ul>

        <!-- Right Side: Language Switcher, Login & Chat -->
        <div class="hidden lg:flex items-center space-x-3 flex-shrink-0">
          <LanguageSwitcher />
          <router-link
            to="/login"
            class="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm"
          >
            {{ $t('header.login') }}
          </router-link>
          <router-link
            to="/chat"
            class="flex items-center gap-2 px-4 py-1 rounded-full hover:bg-blue-100 transition text-blue-700 shadow"
            title="Chat with Customer Service"
            style="border: none"
          >
            <img
              src="../assets/images/helpdesk.gif"
              alt="Chat Icon"
              class="w-9 h-9 rounded-full"
            />
            <span class="hidden sm:inline">Chat</span>
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button class="lg:hidden text-gray-800 p-2" @click="toggleMobileMenu">
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
        <a href="#" class="block hover:underline">Home</a>
        <a href="#" class="block hover:underline">About</a>
        <a href="#" class="block hover:underline">Services</a>
        <a href="#" class="block hover:underline">Our Team</a>
        <a href="#" class="block hover:underline">Reviews</a>
        <a href="#" class="block hover:underline">Contact</a>
        <router-link
          to="/login"
          class="block border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition mt-2"
          @click="closeMobileMenu"
        >
          {{ $t('header.login') }}
        </router-link>
        <router-link
          to="/chat"
          class="block border border-blue-400 px-6 py-2 rounded-lg hover:bg-blue-100 transition text-blue-700 mt-2"
          @click="closeMobileMenu"
        >
          {{ $t('header.chat') }}
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
