<template>
  <section class="py-16" :style="{ backgroundColor: '#F5F8E0' }">
    <div
      class="flex flex-col lg:flex-row items-center max-w-7xl mx-auto px-4 gap-10"
    >
      <!-- Images -->
      <div class="flex-1 grid grid-cols-2 gap-4">
        <img
          src="/src/assets/images/consultant_banner.jpg"
          alt="Consultation"
          class="rounded-2xl w-full h-40 object-cover"
        />
        <img
          src="/src/assets/images/lawfirm-01.jpg"
          alt="Meeting"
          class="rounded-2xl w-full h-40 object-cover"
        />
        <img
          src="/src/assets/images/lawfirm-02.jpg"
          alt="Agreement"
          class="rounded-2xl w-full h-40 object-cover"
        />
        <img
          src="/src/assets/images/lawfirm-03.jpg"
          alt="Teamwork"
          class="rounded-2xl w-full h-40 object-cover"
        />
      </div>
      <!-- Content -->
      <div class="flex-1">
        <h2 class="text-4xl font-bold mb-4 text-gray-900">
          {{ $t('legalTrends.title') }}
        </h2>
        <p class="mb-6 text-gray-700">
          {{ $t('legalTrends.description') }}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p class="text-3xl font-bold text-[#B49F2B]">{{ $t('legalTrends.stats.compliance.percentage') }}</p>
            <p class="font-semibold text-gray-800 mt-1">{{ $t('legalTrends.stats.compliance.title') }}</p>
            <p class="text-gray-500 text-sm">
              {{ $t('legalTrends.stats.compliance.description') }}
            </p>
          </div>
          <div>
            <p class="text-3xl font-bold text-[#B49F2B]">{{ $t('legalTrends.stats.resolution.percentage') }}</p>
            <p class="font-semibold text-gray-800 mt-1">{{ $t('legalTrends.stats.resolution.title') }}</p>
            <p class="text-gray-500 text-sm">
              {{ $t('legalTrends.stats.resolution.description') }}
            </p>
          </div>
          <div>
            <p class="text-3xl font-bold text-[#B49F2B]">{{ $t('legalTrends.stats.savings.percentage') }}</p>
            <p class="font-semibold text-gray-800 mt-1">{{ $t('legalTrends.stats.savings.title') }}</p>
            <p class="text-gray-500 text-sm">
              {{ $t('legalTrends.stats.savings.description') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No script logic needed for static content
</script>

<style scoped>
/* Optional: Responsive tweaks or custom styles */
</style>
