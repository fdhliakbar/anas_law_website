<template>
  <div class="max-w-7xl mx-auto px-4 py-12 space-y-12">
    <!-- Gambar utama -->
    <div class="flex justify-center">
      <img
        src="/src/assets/images/injury.jpg"
        alt="Injury Image"
        class="rounded-2xl w-[400px] shadow-md"
      />
    </div>

    <!-- Judul dan Deskripsi -->
    <div class="text-center">
      <h2 class="text-4xl font-bold">Our Expertise in Personal Injury Cases</h2>
      <p class="mt-2 text-gray-600 max-w-2xl mx-auto">
        Discover how we specialize in personal injury cases, ranging from
        accidents to medical malpractice. Let us guide you through this
        challenging time.
      </p>
    </div>

    <!-- Grid Items -->
    <div class="grid md:grid-cols-2 gap-8">
      <div
        v-for="(post, index) in expertiseItems"
        :key="index"
        class="flex items-start gap-4"
      >
        <img
          :src="post.image"
          alt=""
          class="w-20 h-20 rounded-xl object-cover"
        />
        <div>
          <h3 class="text-xl font-semibold">{{ post.title }}</h3>
          <p class="text-gray-600 text-sm">{{ post.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const expertiseItems = [
  {
    title: "Slip and Fall Injuries",
    description: "Securing compensation for slip and falls accidents",
    image: "/src/assets/images/feris.jpg",
  },
  {
    title: "Medical Malpractice",
    description: "Ensuring accountability for medical malpractice",
    image: "/src/assets/images/feris.jpg",
  },
  {
    title: "Car Accidents",
    description: "Seeking fair compensation for car accident injuries",
    image: "/src/assets/images/feris.jpg",
  },
  {
    title: "Catastrophic Injuries",
    description: "Helping secure compensation for life-altering injuries.",
    image: "/src/assets/images/feris.jpg",
  },
  {
    title: "Workplace Injuries",
    description: "Assisting in workers' injury and compensation claims",
    image: "/src/assets/images/feris.jpg",
  },
  {
    title: "20+",
    description: "Another personal injury cases we can help for you",
    image: "/src/assets/images/feris.jpg",
  },
];
</script>
