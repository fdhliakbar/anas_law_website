<!-- filepath: c:\laragon\www\anas_law_website\frontend\src\components\Footer.vue -->
<script setup></script>

<template>
  <footer class="bg-[#2c323b] text-gray-200 py-10">
    <div
      class="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between px-4"
    >
      <!-- Logo kiri -->
      <div class="flex flex-col items-center mb-4 md:mb-0">
        <img src="../assets/images/logo.png" alt="Logo" class="h-8 mb-2" />
        <div class="text-sm">© 2025 Anaas Law</div>
      </div>
      <!-- Copyright tengah -->
      <!-- Link kanan -->
      <div class="flex items-center space-x-6">
        <a href="#" class="hover:text-white transition">Syarat dan Ketentuan</a>
        <a href="#" class="hover:text-white transition"
          >Kebijakan Pengembalian</a
        >
        <div class="flex space-x-2 ml-4">
          <a href="#" aria-label="Facebook" class="hover:text-white">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 2.1A15.9 15.9 0 0 1 21.9 7M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2c1.657 0 3.216.402 4.573 1.114M17 2.1V7h4.9"
              ></path>
            </svg>
          </a>
          <a href="#" aria-label="Instagram" class="hover:text-white">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <rect width="18" height="18" x="3" y="3" rx="4" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" />
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn" class="hover:text-white">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 10v4M7 7v.01M12 10v4m0-4a2 2 0 0 1 4 0v4" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* No extra styles needed, all handled by Tailwind */
</style>
