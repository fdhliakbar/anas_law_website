<template>
  <section class="w-full bg-white py-24 px-4" id="hero">
    <div class="max-w-5xl mx-auto flex flex-col items-center text-center">
      <h1 class="font-bold text-5xl md:text-7xl text-black mb-8 leading-tight">
        {{ $t('hero.title') }}
      </h1>
      <p class="text-lg md:text-xl text-black mb-12">
        {{ $t('hero.subtitle') }}
      </p>
      <div class="flex flex-col md:flex-row gap-4">
        <button
          class="border border-black bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
        >
          {{ $t('hero.scheduleConsultation') }}
        </button>
        <button
          class="border border-black text-black px-8 py-4 rounded-lg text-lg font-semibold bg-white hover:bg-black hover:text-white transition"
        >
          {{ $t('hero.getInTouch') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style scoped></style>
