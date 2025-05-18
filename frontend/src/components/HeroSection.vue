<template>
  <section class="w-full bg-white py-24 px-4" id="hero">
    <div class="max-w-5xl mx-auto flex flex-col items-center text-center">
      <h1 class="font-bold text-5xl md:text-7xl text-black mb-8 leading-tight">
        Your Compassionate<br />
        Personal Injury Advocates
      </h1>
      <p class="text-lg md:text-xl text-black mb-12">
        We're here to fight for your rights and secure the compensation you
        deserve after a personal injury.<br />
        Your recovery is our priority
      </p>
      <div class="flex flex-col md:flex-row gap-4">
        <button
          class="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 transition"
        >
          Schedule now
        </button>
        <button
          class="border border-black text-black px-8 py-4 rounded-lg text-lg font-semibold bg-white hover:bg-gray-100 transition"
        >
          Get in touch
        </button>
      </div>
    </div>

    <div>
      <img src="../assets/images/justice.jpg" alt="" />
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style scoped></style>
