<template>
  <div class="py-16 px-4 bg-gradient-to-b from-white to-indigo-50">
    <div class="flex justify-center mb-4">
      <span class="bg-[#F5F8E0] text-yellow-800 px-4 py-1 rounded-full text-sm font-medium shadow animate-bounce">
        {{ $t('taxConsultation.tagline') }}
      </span>
    </div>
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-2">
      {{ $t('taxConsultation.title') }}
    </h2>
    <div class="flex justify-center items-center gap-4 my-6">
      <span class="text-gray-600 font-medium" :class="{ 'text-indigo-700': !yearly }">
        {{ $t('taxConsultation.monthly') }}
      </span>
      <button
        class="relative w-16 h-8 bg-gray-200 rounded-full transition-colors duration-300 focus:outline-none"
        :class="yearly ? 'bg-indigo-600' : 'bg-gray-200'"
        @click="yearly = !yearly"
      >
        <span
          class="absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300"
          :class="yearly ? 'translate-x-8' : ''"
        />
      </button>
      <span class="text-gray-600 font-medium" :class="{ 'text-indigo-700': yearly }">
        {{ $t('taxConsultation.yearly') }} <span class="text-xs">{{ $t('taxConsultation.yearlyDiscount') }}</span>
      </span>
    </div>
    <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-8">
      <div
        v-for="(plan, idx) in plans"
        :key="plan.name"
        class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-100 hover:scale-105 transition-transform duration-300"
        :class="idx === 1 ? 'border-indigo-600 shadow-2xl' : ''"
      >
        <h3 class="text-xl font-semibold mb-2">{{ $t(`taxConsultation.plans.${plan.key}.name`) }}</h3>
        <p class="text-gray-500 mb-4 text-center">{{ $t(`taxConsultation.plans.${plan.key}.description`) }}</p>
        <div class="flex items-end mb-4">
          <span class="text-3xl font-bold text-gray-900">
            ${{ yearly ? Math.round(plan.yearly) : plan.monthly }}
          </span>
          <span class="text-gray-500 ml-1 mb-1">/mo</span>
        </div>
        <span class="text-xs text-gray-400 mb-4">{{ yearly ? $t('taxConsultation.billedYearly') : $t('taxConsultation.billedMonthly') }}</span>
        <button class="bg-indigo-900 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 transition-colors duration-300 mb-6">
          {{ $t('taxConsultation.getConsultation') }}
        </button>
        <div class="w-full">
          <p class="font-semibold mb-2 text-gray-700">
            {{ $t(`taxConsultation.plans.${plan.key}.featuresTitle`) }}
          </p>
          <ul class="space-y-2">
            <li v-for="f in plan.features" :key="f" class="flex items-center text-gray-700">
              <svg class="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {{ $t(`taxConsultation.features.${f}`) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const yearly = ref(true)
const plans = [
  {
    key: "basic",
    name: "Basic",
    description: "Create interactive forms that connect to your workflow.",
    monthly: 29,
    yearly: 29 * 12 * 0.8,
    features: [
      "advancedSegmentation",
      "comparativeReporting", 
      "unlimitedSeats",
      "multivariateTest",
      "dynamicContent",
    ],
  },
  {
    key: "plus",
    name: "Plus",
    description: "Make your forms more beautiful and on-brand & analyze.",
    monthly: 199,
    yearly: 199 * 12 * 0.8,
    features: [
      "advancedSegmentation",
      "comparativeReporting",
      "unlimitedSeats", 
      "multivariateTest",
      "dynamicContent",
    ],
  },
  {
    key: "business",
    name: "Business",
    description: "Make your forms more beautiful and on-brand & analyze.",
    monthly: 399,
    yearly: 399 * 12 * 0.8,
    features: [
      "advancedSegmentation",
      "comparativeReporting",
      "unlimitedSeats",
      "multivariateTest", 
      "dynamicContent",
    ],
  },
]
</script>