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
          src="/src/assets/images/consultant_banner.jpg"
          alt="Meeting"
          class="rounded-2xl w-full h-40 object-cover"
        />
        <img
          src="/src/assets/images/consultant_banner.jpg"
          alt="Agreement"
          class="rounded-2xl w-full h-40 object-cover"
        />
        <img
          src="/src/assets/images/consultant_banner.jpg"
          alt="Teamwork"
          class="rounded-2xl w-full h-40 object-cover"
        />
      </div>
      <!-- Content -->
      <div class="flex-1">
        <h2 class="text-4xl font-bold mb-4 text-gray-900">
          Legal Consulting Market Trends: What You Should Know
        </h2>
        <p class="mb-6 text-gray-700">
          Our commitment is to provide expert legal consulting tailored to your
          business and personal needs. We deliver strategic advice, risk
          management, and compliance solutions for clients seeking trusted legal
          guidance. Discover how our services set a new standard in legal
          consulting and client representation.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p class="text-3xl font-bold text-[#B49F2B]">75%</p>
            <p class="font-semibold text-gray-800 mt-1">of businesses</p>
            <p class="text-gray-500 text-sm">
              seek legal consulting for regulatory compliance
            </p>
          </div>
          <div>
            <p class="text-3xl font-bold text-[#B49F2B]">60%</p>
            <p class="font-semibold text-gray-800 mt-1">of legal issues</p>
            <p class="text-gray-500 text-sm">
              are resolved faster with professional consultants
            </p>
          </div>
          <div>
            <p class="text-3xl font-bold text-[#B49F2B]">$2M+</p>
            <p class="font-semibold text-gray-800 mt-1">saved annually</p>
            <p class="text-gray-500 text-sm">
              by organizations using legal consulting services
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
