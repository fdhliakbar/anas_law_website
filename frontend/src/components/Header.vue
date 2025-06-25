<template>
  <header class="sticky top-0 z-50">
    <!-- Navbar -->
    <nav
      :class="[
        'fixed w-full z-50 transition-all duration-300 ease-in-out bg-blue-400 py-2',
      ]"
    >
      <div
        class="max-w-screen-xl mx-auto flex items-center justify-between p-3 relative"
      >
        <!-- Logo -->
        <router-link to="/" class="flex items-center fle">
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
          <li><a href="#" class="hover:text-[#B49F2B]">Home</a></li>
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
            <a
              href="#"
              class="hover:text-[#B49F2B]"
              @click.prevent="scrollTo('footer')"
              >Contact</a
            >
          </li>
          <li>
             <router-link to="/pricing" class="hover:text-[#B49F2B]">Pricing</router-link>
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
          
        </div>
        <!-- Mobile Menu Button -->
        <button class="lg:hidden text-gray-800" @click="toggleMobileMenu">
          <!-- ...existing code... -->
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
        <a href="#" class="block hover:underline">Pricing</a>
        <a href="#" class="block hover:underline">Contact</a>
        <router-link
          to="/login"
          class="block border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition mt-2"
        >
          Login
        </router-link>
        <router-link
          to="/chat"
          class="block border border-blue-400 px-6 py-2 rounded-lg hover:bg-blue-100 transition text-blue-700 mt-2"
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
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 10;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    scrollTo(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
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
