<template>
  <section class="w-full bg-white py-16 px-4">
    <div
      class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12"
    >
      <!-- Left: Text -->
      <div class="flex-1" data-aos="fade-right">
        <h2
          class="font-bold text-4xl md:text-6xl text-black mb-8 leading-tight"
        >
          How Our Legal Team Can<br />
          Assist You
        </h2>
        <p class="text-lg md:text-xl text-gray-800 mb-10 max-w-xl">
          Learn about our personalized approach to every case. We provide expert
          legal counsel, negotiate with insurance companies, and fight for your
          rightful compensation
        </p>
        <button
          class="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 transition"
        >
          Schedule now
        </button>
      </div>
      <!-- Right: Video -->
      <div class="flex-1 flex justify-center">
        <img
          src="../assets/images/founder.jpg"
          alt="Legal Team"
          class="rounded-3xl w-full max-w-xl object-cover"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Schedule",
};
</script>
