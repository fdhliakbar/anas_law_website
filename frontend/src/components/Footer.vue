<template>
  <footer class="bg-[#2c323b] text-gray-200 pt-10 pb-16">
    <div class="max-w-screen-xl mx-auto px-4">
      <!-- Konten utama: Logo & Map -->
      <div class="flex flex-col md:flex-row justify-between items-start gap-8">
        <!-- Kiri: Logo & Copyright -->
        <div class="flex-1">
          <div class="mb-4 flex flex-col items-start md:items-start">
            <img src="../assets/images/logo.png" alt="Logo" class="h-10 mb-2" />
            <div class="text-sm text-gray-400">{{ $t("footer.copyright") }}</div>
          </div>
        </div>

        <!-- Kanan: Map -->
        <div class="flex-[2]">
          <a
            href="https://www.google.com/maps?q=-6.200000,106.816666"
            target="_blank"
            rel="noopener noreferrer"
            class="block rounded-lg overflow-hidden shadow-md border border-gray-700 hover:shadow-lg transition duration-300"
          >
            <iframe
              src="https://www.google.com/maps?q=-6.200000,106.816666&hl=id&z=16&output=embed"
              width="100%"
              height="350"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Lokasi Kantor"
              class="w-full"
            ></iframe>
          </a>
          <div class="text-xs text-gray-400 mt-2 text-center md:text-left">
            Lihat lokasi kantor di Google Maps
          </div>
        </div>
      </div>

      <!-- Garis pemisah -->
      <div class="mt-10 border-t border-gray-600 pt-6 text-center text-sm text-gray-400">
        &copy; {{ new Date().getFullYear() }} ANAS & Partners. All rights reserved.
      </div>
    </div>
  </footer>
</template>
