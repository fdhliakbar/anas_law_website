<template>
  <div class="max-w-7xl mx-auto px-4 py-12 space-y-12" id="services">
    <!-- Gambar utama -->
    <div class="flex justify-center">
      <img
        src="/src/assets/images/injury.jpg"
        alt="Injury Image"
        class="rounded-2xl w-[800px] shadow-md"
      />
    </div>

    <!-- Judul dan Deskripsi -->
    <div class="text-center">
      <h2 class="text-4xl font-bold">{{ $t('services.title') }}</h2>
      <p class="mt-2 text-gray-600 max-w-2xl mx-auto">
        {{ $t('services.description') }}
      </p>
    </div>
  </div>
</template>

<script setup></script>
