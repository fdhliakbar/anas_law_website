<template>
  <section class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-10"
      >
        <h2 class="text-4xl font-bold text-gray-900 mb-6 md:mb-0">
          Broker or Advisor? <br class="hidden md:block" />
          Legal Guidance For Your Needs
        </h2>
        <button
          class="px-8 py-3 rounded-full font-semibold text-lg"
          style="background: #f5f8e0; color: #222"
        >
          Learn More
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Legal Broker -->
        <div class="bg-gray-100 rounded-2xl p-8 shadow">
          <div class="flex items-center mb-3">
            <span class="text-3xl mr-2 text-red-500">✖</span>
            <span class="text-2xl font-bold text-gray-800">Legal Broker</span>
          </div>
          <p class="text-gray-700 mb-5">
            Legal brokers often act as intermediaries, focusing on connecting
            clients with legal services, but may not provide in-depth analysis
            or tailored solutions.
          </p>
          <ul class="space-y-3">
            <li class="flex items-start">
              <span class="text-lg mr-2 text-gray-700">•</span>
              <span>Limited legal analysis and strategic advice.</span>
            </li>
            <li class="flex items-start">
              <span class="text-lg mr-2 text-gray-700">•</span>
              <span>Focuses on transactions, not long-term solutions.</span>
            </li>
            <li class="flex items-start">
              <span class="text-lg mr-2 text-gray-700">•</span>
              <span>May lack deep understanding of your business context.</span>
            </li>
          </ul>
        </div>
        <!-- Legal Advisor -->
        <div class="rounded-2xl p-8 shadow" style="background: #f5f8e0">
          <div class="flex items-center mb-3">
            <span class="text-3xl mr-2 text-green-600">✔</span>
            <span class="text-2xl font-bold text-gray-800">Legal Advisor</span>
          </div>
          <p class="text-gray-800 mb-5">
            Legal advisors provide comprehensive legal consulting, strategic
            planning, and ongoing support to ensure your business or personal
            matters are protected and compliant.
          </p>
          <ul class="space-y-3">
            <li class="flex items-start">
              <span class="text-lg mr-2 text-gray-700">•</span>
              <span
                >Delivers tailored legal strategies and risk management.</span
              >
            </li>
            <li class="flex items-start">
              <span class="text-lg mr-2 text-gray-700">•</span>
              <span>Focuses on long-term client success and compliance.</span>
            </li>
            <li class="flex items-start">
              <span class="text-lg mr-2 text-gray-700">•</span>
              <span>Deep understanding of your industry and legal needs.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Static content, no logic needed
</script>

<style scoped>
/* Optional: Responsive tweaks */
</style>
