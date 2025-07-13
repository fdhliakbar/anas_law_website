<!-- filepath: c:\laragon\www\anas_law_website\frontend\src\components\Testimonials.vue -->
<template>
  <div class="py-5 bg-[#F6F9E1]">
    <div
      class="container flex flex-col items-center justify-center w-full p-6 mx-auto text-center xl:px-0"
    >
      <div class="text-sm font-bold tracking-wider text-indigo-600 uppercase">
        {{ $t('testimonials.badge') }}
      </div>
      <h2
        class="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl"
      >
        {{ $t('testimonials.title') }}
      </h2>
      <p
        class="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl"
      >
        {{ $t('testimonials.description') }}
      </p>
    </div>
    
    <!-- Testimonial Slider -->
    <div class="container p-6 mx-auto mb-10 xl:px-0">
      <div class="relative max-w-4xl mx-auto">
        <!-- Slider Container -->
        <div 
          class="overflow-hidden rounded-2xl"
          @mouseenter="pauseAutoSlide"
          @mouseleave="resumeAutoSlide"
        >
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            ref="sliderContainer"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
          >
            <!-- Fadhli Testimonial -->
            <div class="w-full flex-shrink-0">
              <div class="bg-white shadow-lg px-8 py-12 md:px-16 md:py-16">
                <p class="text-2xl md:text-3xl leading-relaxed text-gray-700 text-center mb-8">
                  "{{ $t('testimonials.clients.fadhli.review').split($t('testimonials.clients.fadhli.highlight1'))[0] }}
                  <mark class="mx-1 text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4">{{ $t('testimonials.clients.fadhli.highlight1') }}</mark>
                  {{ $t('testimonials.clients.fadhli.review').split($t('testimonials.clients.fadhli.highlight1'))[1].split($t('testimonials.clients.fadhli.highlight2'))[0] }}
                  <mark class="mx-1 text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4">{{ $t('testimonials.clients.fadhli.highlight2') }}</mark>
                  {{ $t('testimonials.clients.fadhli.review').split($t('testimonials.clients.fadhli.highlight2'))[1] }}"
                </p>
                <div class="text-center">
                  <div class="text-xl font-medium text-gray-800">
                    {{ $t('testimonials.clients.fadhli.name') }}
                  </div>
                  <div class="text-gray-500 mt-1">{{ $t('testimonials.clients.fadhli.position') }}</div>
                </div>
              </div>
            </div>

            <!-- Dylan Testimonial -->
            <div class="w-full flex-shrink-0">
              <div class="bg-white shadow-lg px-8 py-12 md:px-16 md:py-16">
                <p class="text-2xl md:text-3xl leading-relaxed text-gray-700 text-center mb-8">
                  "{{ $t('testimonials.clients.dylan.review').split($t('testimonials.clients.dylan.highlight1'))[0] }}
                  <mark class="mx-1 text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4">{{ $t('testimonials.clients.dylan.highlight1') }}</mark>
                  {{ $t('testimonials.clients.dylan.review').split($t('testimonials.clients.dylan.highlight1'))[1] }}"
                </p>
                <div class="text-center">
                  <div class="text-xl font-medium text-gray-800">
                    {{ $t('testimonials.clients.dylan.name') }}
                  </div>
                  <div class="text-gray-500 mt-1">{{ $t('testimonials.clients.dylan.position') }}</div>
                </div>
              </div>
            </div>

            <!-- Gabrielle Testimonial -->
            <div class="w-full flex-shrink-0">
              <div class="bg-white shadow-lg px-8 py-12 md:px-16 md:py-16">
                <p class="text-2xl md:text-3xl leading-relaxed text-gray-700 text-center mb-8">
                  "{{ $t('testimonials.clients.gabrielle.review').split($t('testimonials.clients.gabrielle.highlight1'))[0] }}
                  <mark class="mx-1 text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4">{{ $t('testimonials.clients.gabrielle.highlight1') }}</mark>
                  {{ $t('testimonials.clients.gabrielle.review').split($t('testimonials.clients.gabrielle.highlight1'))[1] }}"
                </p>
                <div class="text-center">
                  <div class="text-xl font-medium text-gray-800">
                    {{ $t('testimonials.clients.gabrielle.name') }}
                  </div>
                  <div class="text-gray-500 mt-1">{{ $t('testimonials.clients.gabrielle.position') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Dots -->
        <div class="flex justify-center mt-6 space-x-2">
          <button
            v-for="(testimonial, index) in testimonials"
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-indigo-600' : 'bg-gray-300 hover:bg-gray-400'"
          ></button>
        </div>

        <!-- Navigation Arrows -->
        <button
          @click="previousSlide"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const autoSlideInterval = ref(null)
const touchStartX = ref(0)
const touchEndX = ref(0)

const testimonials = [
  { key: 'fadhli' },
  { key: 'dylan' },
  { key: 'gabrielle' }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % testimonials.length
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? testimonials.length - 1 : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const startAutoSlide = () => {
  autoSlideInterval.value = setInterval(() => {
    nextSlide()
  }, 4000) // Changed to 4 seconds for better readability
}

const pauseAutoSlide = () => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value)
  }
}

const resumeAutoSlide = () => {
  startAutoSlide()
}

// Touch handlers for swipe functionality
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const swipeThreshold = 50
  const diff = touchStartX.value - touchEndX.value
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide()
    } else {
      previousSlide()
    }
  }
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  pauseAutoSlide()
})
</script>

<style scoped>
.slider-container {
  cursor: grab;
}

.slider-container:active {
  cursor: grabbing;
}
</style>
