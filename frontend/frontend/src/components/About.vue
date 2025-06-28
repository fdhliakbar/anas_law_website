<template>
  <div class="px-4 sm:px-8 md:px-20 py-8 space-y-8" id="about">
    <!-- Section Atas -->
    <div
      class="bg-[#ECF0FF] rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start gap-8"
      data-aos="fade-right"
    >
      <!-- Kiri -->
      <div class="flex-1">
        <h2 class="font-semibold text-xl mb-4">{{ $t('about.title') }}</h2>
        <p class="text-2xl leading-relaxed font-medium text-gray-800">
          {{ $t('about.description') }}
        </p>
      </div>

      <!-- Kanan -->
      <div class="space-y-6 w-full md:w-auto">
        <div>
          <p class="text-xl font-semibold">$350,000k</p>
          <p class="text-sm text-gray-600">{{ $t('about.recoveredAmount') }}</p>
        </div>
        <div>
          <p class="text-xl font-semibold">230+ five stars</p>
          <p class="text-sm text-gray-600">{{ $t('about.googleReviews') }}</p>
        </div>
        <div>
          <p class="text-xl font-semibold">100+ years</p>
          <p class="text-sm text-gray-600">{{ $t('about.experience') }}</p>
        </div>
      </div>
    </div>

    <!-- Section Bawah -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        class="bg-[#F5F8E0] p-6 rounded-xl flex items-start gap-4"
        data-aos="fade-up"
      >
        <div class="text-2xl font-bold">💲</div>
        <div>
          <p class="font-semibold text-lg">{{ $t('about.noFeeGuarantee') }}</p>
          <p class="text-sm text-gray-700">
            {{ $t('about.noFeeDescription') }}
          </p>
        </div>
      </div>

      <div
        class="bg-[#F5F8E0] p-6 rounded-xl flex items-start gap-4"
        data-aos="fade-up"
      >
        <div class="text-2xl font-bold">✨</div>
        <div>
          <p class="font-semibold text-lg">{{ $t('about.topRatedService') }}</p>
          <p class="text-sm text-gray-700">
            {{ $t('about.topRatedDescription') }}
          </p>
        </div>
      </div>

      <div
        class="bg-[#F5F8E0] p-6 rounded-xl flex items-start gap-4"
        data-aos="fade-up"
      >
        <div class="text-2xl font-bold">✅</div>
        <div>
          <p class="font-semibold text-lg">{{ $t('about.battleTestedLawyers') }}</p>
          <p class="text-sm text-gray-700">
            {{ $t('about.battleTestedDescription') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped></style>
