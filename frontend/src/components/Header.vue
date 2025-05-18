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
        <!-- Navigation Links -->
        <ul
          class="hidden lg:flex flex-1 justify-center space-x-10 text-base text-gray-700 font-medium"
        >
          <li><a href="#" class="hover:text-[#B49F2B]">Home</a></li>
          <li><a href="#" class="hover:text-[#B49F2B]">About</a></li>
          <li><a href="#" class="hover:text-[#B49F2B]">Services</a></li>
          <li><a href="#" class="hover:text-[#B49F2B]">Our Team</a></li>
          <li><a href="#" class="hover:text-[#B49F2B]">Reviews</a></li>
          <li><a href="#" class="hover:text-[#B49F2B]">Contact</a></li>
        </ul>
        <!-- Login Button -->
        <div class="hidden lg:flex flex-none">
          <router-link
            to="/login"
            class="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </router-link>
        </div>
        <!-- Mobile Menu Button -->
        <button class="lg:hidden text-gray-800" @click="toggleMobileMenu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
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