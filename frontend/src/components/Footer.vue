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
        <div class="text-sm">{{ $t("footer.copyright") }}</div>
        <!-- Map kantor -->
        <div class="mt-4 w-full flex flex-col items-center">
          <a
            href="https://www.google.com/maps?q=-6.200000,106.816666"
            target="_blank"
            rel="noopener noreferrer"
            class="block rounded overflow-hidden shadow-lg hover:shadow-xl transition border border-gray-700"
            style="width: 1250px; max-width: 100%"
          >
            <iframe
              src="https://www.google.com/maps?q=-6.200000,106.816666&hl=id&z=16&output=embed"
              width="1250"
              height="450"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Lokasi Kantor"
            ></iframe>
          </a>
          <div class="text-xs text-gray-400 mt-1">
            Lihat lokasi kantor di Google Maps
          </div>
        </div>
      </div>

      <!-- Link kanan -->
    </div>
  </footer>
</template>

<style scoped>
/* No extra styles needed, all handled by Tailwind */
</style>
