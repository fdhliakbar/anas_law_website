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
      >        <!-- Logo -->
        <router-link to="/" class="flex items-center flex-none">
          <img
            src="../assets/images/logo.png"
            alt="Logo"
            class="h-10"
            width="200%"
          />
        </router-link>
        <!-- Navigation Links -->
        <ul
          class="hidden lg:flex flex-1 justify-center space-x-10 text-base text-gray-700 font-medium"
        >
          <li>
            <router-link 
              to="/" 
              class="hover:text-[#B49F2B] transition-colors duration-300"
              :class="{ 'text-[#B49F2B] font-semibold': $route.name === 'Home' }"
            >
              Home
            </router-link>
          </li>
          <li>
            <router-link 
              to="/about" 
              class="hover:text-[#B49F2B] transition-colors duration-300"
              :class="{ 'text-[#B49F2B] font-semibold': $route.name === 'About' }"
            >
              About
            </router-link>
          </li>
          <li>
            <a
              href="#"
              class="hover:text-[#B49F2B] transition-colors duration-300"
              @click.prevent="handleServicesClick"
            >
              Services
            </a>
          </li>
          <li>
            <router-link 
              to="/pricing" 
              class="hover:text-[#B49F2B] transition-colors duration-300"
              :class="{ 'text-[#B49F2B] font-semibold': $route.name === 'Pricing' }"
            >
              Pricing
            </router-link>
          </li>
          <li>
            <a
              href="#"
              class="hover:text-[#B49F2B] transition-colors duration-300"
              @click.prevent="handleTeamClick"
            >
              Our Team
            </a>
          </li>
          <li>
            <a
              href="#"
              class="hover:text-[#B49F2B] transition-colors duration-300"
              @click.prevent="handleContactClick"
            >
              Contact
            </a>
          </li>
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
      </div>      <!-- Mobile Menu -->
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden bg-white text-gray-900 p-4 space-y-4 shadow-lg"
      >
        <router-link 
          to="/" 
          class="block hover:text-[#B49F2B] transition-colors duration-300"
          :class="{ 'text-[#B49F2B] font-semibold': $route.name === 'Home' }"
          @click="closeMobileMenu"
        >
          Home
        </router-link>
        <router-link 
          to="/about" 
          class="block hover:text-[#B49F2B] transition-colors duration-300"
          :class="{ 'text-[#B49F2B] font-semibold': $route.name === 'About' }"
          @click="closeMobileMenu"
        >
          About
        </router-link>
        <a 
          href="#" 
          class="block hover:text-[#B49F2B] transition-colors duration-300"
          @click.prevent="handleServicesClick"
        >
          Services
        </a>
        <router-link 
          to="/pricing" 
          class="block hover:text-[#B49F2B] transition-colors duration-300"
          :class="{ 'text-[#B49F2B] font-semibold': $route.name === 'Pricing' }"
          @click="closeMobileMenu"
        >
          Pricing
        </router-link>
        <a 
          href="#" 
          class="block hover:text-[#B49F2B] transition-colors duration-300"
          @click.prevent="handleTeamClick"
        >
          Our Team
        </a>
        <a 
          href="#" 
          class="block hover:text-[#B49F2B] transition-colors duration-300"
          @click.prevent="handleContactClick"
        >
          Contact
        </a>
        <div class="pt-4 border-t border-gray-200">
          <router-link 
            to="/login" 
            class="block bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            @click="closeMobileMenu"
          >
            Login
          </router-link>
        </div>
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
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    scrollTo(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    handleServicesClick() {
      if (this.$route.name === 'Home') {
        this.scrollTo('services');
      } else {
        this.$router.push('/').then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.scrollTo('services');
            }, 100);
          });
        });
      }
      this.closeMobileMenu();
    },
    handleTeamClick() {
      if (this.$route.name === 'Home') {
        this.scrollTo('team');
      } else {
        this.$router.push('/').then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.scrollTo('team');
            }, 100);
          });
        });
      }
      this.closeMobileMenu();
    },
    handleContactClick() {
      if (this.$route.name === 'Home') {
        this.scrollTo('footer');
      } else {
        this.$router.push('/').then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.scrollTo('footer');
            }, 100);
          });
        });
      }
      this.closeMobileMenu();
    }
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
