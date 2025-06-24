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
        class="max-w-screen-xl mx-auto flex items-center justify-between p-3 relative"
      >        <!-- Logo -->
        <router-link to="/" class="flex items-center flex-none">
          <img
            src="../assets/images/logo.png"
            alt="Logo"
            class="h-10"
            width="200%"
          />
        </router-link>
        <!-- Navigation Links (centered) -->
        <ul
          class="hidden lg:flex flex-1 justify-center space-x-10 text-base text-gray-700 font-medium"
          style="z-index: 1"
        >
          <li>
            <router-link to="/" class="hover:text-[#B49F2B]">Home</router-link>
          </li>
          <li>
            <a
              href="#"
              class="hover:text-[#B49F2B]"
              @click.prevent="scrollTo('about')"
              >About</a
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:text-[#B49F2B]"
              @click.prevent="scrollTo('services')"
              >Services</a
            >
          </li>
          <li>
            <router-link
              to="/pricing"
              class="hover:text-[#B49F2B]"
              >Pricing</router-link
            >
          </li>
          <li>
            <router-link
              to="/booking"
              class="hover:text-[#B49F2B]"
              >Book Consultation</router-link
            >
          </li>
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
              >Contact</a
            >
          </li>
        </ul>
        <!-- Login & Chat Button (absolutely right) -->
        <div
          class="hidden lg:flex flex-none absolute right-0 top-1/2 -translate-y-1/2 space-x-2"
        >
          <router-link
            to="/login"
            class="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Login
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
        <button class="lg:hidden text-gray-800" @click="toggleMobileMenu">
          <!-- ...existing code... -->
        </button>
      </div>      <!-- Mobile Menu -->
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden bg-white text-gray-900 p-4 space-y-4"
      >
        <router-link to="/" class="block hover:underline" @click="closeMobileMenu">Home</router-link>
        <a href="#" class="block hover:underline" @click.prevent="scrollTo('about')">About</a>
        <a href="#" class="block hover:underline" @click.prevent="scrollTo('services')">Services</a>
        <router-link
          to="/pricing"
          class="block hover:underline"
          @click="closeMobileMenu"
        >
          Pricing
        </router-link>
        <router-link
          to="/booking"
          class="block hover:underline"
          @click="closeMobileMenu"
        >
          Book Consultation
        </router-link>
        <a href="#" class="block hover:underline" @click.prevent="scrollTo('reviews')">Reviews</a>
        <a href="#" class="block hover:underline" @click.prevent="scrollTo('footer')">Contact</a>
        <router-link
          to="/login"
          class="block border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition mt-2"
          @click="closeMobileMenu"
        >
          Login
        </router-link>
        <router-link
          to="/chat"
          class="block border border-blue-400 px-6 py-2 rounded-lg hover:bg-blue-100 transition text-blue-700 mt-2"
          @click="closeMobileMenu"
        >
          Chat
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      scrolled: false,
      isMobileMenuOpen: false,
    };
  },  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 10;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    scrollTo(id) {
      this.isMobileMenuOpen = false; // Close mobile menu when scrolling
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
    // Set initial state based on scroll position
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
