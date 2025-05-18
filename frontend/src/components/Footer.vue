<!-- filepath: c:\laragon\www\anas_law_website\frontend\src\components\Footer.vue -->
<script setup></script>

<template>
  <footer
    class="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
    id="footer"
  >
    <div class="mx-auto w-full max-w-screen-xl p-6 lg:py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left Section -->
        <div class="flex flex-col items-center md:items-start">
          <div class="flex items-center space-x-4">
            <img
              src="../assets/images/tech-support.gif"
              alt="Logo 1"
              class="h-12"
            />
            <img
              src="../assets/images/tech-support.gif"
              alt="Logo 2"
              class="h-12"
            />
            <img
              src="../assets/images/tech-support.gif"
              alt="Logo 3"
              class="h-12"
            />
          </div>
          <p class="mt-4 text-center md:text-left text-gray-300">
            Dengan semboyan “Nulla Tenaci In Via Est Via” yang mempunyai arti
            “Bagi orang yang mau terus berjuang, tidak ada jalan yang tidak bisa
            dilewati”.
          </p>
        </div>

        <!-- Middle Section -->
        <div class="flex flex-col items-center md:items-start">
          <h2 class="text-lg font-semibold mb-4">Hubungi Kami</h2>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-center space-x-2">
              <span>📞</span>
              <span>+6281394879411</span>
            </li>
            <li class="flex items-center space-x-2">
              <span>📞</span>
              <span>+6282316762695</span>
            </li>
            <li class="flex items-center space-x-2">
              <span>📧</span>
              <span>lawofficeanas@gmail.com</span>
            </li>
            <li class="flex items-start space-x-2">
              <span>📍</span>
              <span>
                Jl. Basuki Rahmat, Sukajati, Kec. Haurgeulis, Kabupaten
                Indramayu, Jawa Barat 45264
              </span>
            </li>
          </ul>
        </div>

        <!-- Right Section -->
        <div class="flex flex-col items-center md:items-start">
          <h2 class="text-lg font-semibold mb-4">Sosial Media</h2>
          <div class="flex space-x-4">
            <a
              href="#"
              class="text-gray-300 hover:text-white"
              aria-label="Facebook"
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="text-gray-300 hover:text-white"
              aria-label="Instagram"
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.756 0 8.332.013 7.052.072 5.773.131 4.548.39 3.5 1.438c-1.048 1.048-1.307 2.273-1.366 3.552C2.013 6.332 2 6.756 2 12s.013 5.668.072 6.948c.059 1.279.318 2.504 1.366 3.552 1.048 1.048 2.273 1.307 3.552 1.366C8.332 23.987 8.756 24 12 24s3.668-.013 4.948-.072c1.279-.059 2.504-.318 3.552-1.366 1.048-1.048 1.307-2.273 1.366-3.552.059-1.279.072-1.703.072-6.948s-.013-5.668-.072-6.948c-.059-1.279-.318-2.504-1.366-3.552C19.452.39 18.227.131 16.948.072 15.668.013 15.244 0 12 0z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-700" />
      <div class="text-center text-sm text-white">
        ©2023 Powered by Anaslawoffice
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
