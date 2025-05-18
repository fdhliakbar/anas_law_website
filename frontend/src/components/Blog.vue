<template>
  <section class="py-16 bg-white text-gray-800">
    <div class="text-center mb-12">
      <p class="text-orange-600 font-semibold uppercase">Blog</p>
      <h2 class="text-4xl font-bold mt-2 mb-4">
        Our Regular Updated Blog Posts
      </h2>
      <p class="text-gray-500 max-w-xl mx-auto">
        Explore how MyCase is reshaping the legal landscape, providing attorneys
        with powerful tools to streamline their practice.
      </p>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
    >
      <div
        v-for="(post, index) in blogPosts"
        :key="index"
        class="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300"
      >
        <img
          :src="post.image"
          alt="Blog Post Image"
          class="rounded-t-2xl w-full h-60 object-cover"
        />
        <div class="p-6">
          <div class="flex gap-2 mb-3">
            <span
              class="text-xs font-semibold bg-orange-100 text-orange-600 px-3 py-1 rounded-full"
              >News</span
            >
            <span
              class="text-xs font-semibold bg-purple-100 text-purple-600 px-3 py-1 rounded-full"
              >Inspiration</span
            >
          </div>
          <h3 class="text-lg font-semibold mb-2">{{ post.title }}</h3>
          <p class="text-gray-500 text-sm mb-4">{{ post.description }}</p>
          <div class="flex items-center gap-3 mt-auto">
            <img
              :src="post.authorImage"
              alt="Author"
              class="w-10 h-10 rounded-full"
            />
            <div>
              <p class="text-sm font-medium">{{ post.author }}</p>
              <p class="text-xs text-gray-400">{{ post.company }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-8 gap-2">
      <button
        class="border border-black text-black px-6 py-2 rounded-lg text-lg font-semibold bg-white hover:bg-black hover:text-white transition"
      >
        More Posts
      </button>
    </div>
  </section>
</template>

<script setup>
const blogPosts = [
  {
    title: "MyCase: Transforming Legal Practice",
    description:
      "Embark on a journey through the innovation that is MyCase, redefining how legal...",
    image: "/src/assets/images/lawyer01.jpg",
    author: "Fadhli Akbar",
    company: "Anas Law Office",
    authorImage: "/src/assets/images/feris.jpg",
  },
  {
    title: "How MyCase: Addresses Legal Challenges",
    description:
      "MyCase stands out through its unique features and user-centric design.",
    image: "/src/assets/images/justice.jpg",
    author: "Fadhli Akbar",
    company: "Anas Law Office",
    authorImage: "/src/assets/images/feris.jpg",
  },
  {
    title: "MyCase: Transforming Legal Practice",
    description:
      "Embark on a journey through the innovation that is MyCase, redefining how legal...",
    image: "/src/assets/images/lawyer01.jpg",
    author: "Fadhli Akbar",
    company: "Anas Law Office",
    authorImage: "/src/assets/images/feris.jpg",
  },
  {
    title: "MyCase: Transforming Legal Practice",
    description:
      "Embark on a journey through the innovation that is MyCase, redefining how legal...",
    image: "/src/assets/images/lawyer01.jpg",
    author: "Fadhli Akbar",
    company: "Anas Law Office",
    authorImage: "/src/assets/images/feris.jpg",
  },
  {
    title: "MyCase: Transforming Legal Practice",
    description:
      "Embark on a journey through the innovation that is MyCase, redefining how legal...",
    image: "/src/assets/images/lawyer01.jpg",
    author: "Fadhli Akbar",
    company: "Anas Law Office",
    authorImage: "/src/assets/images/feris.jpg",
  },
  {
    title: "MyCase: Transforming Legal Practice",
    description:
      "Embark on a journey through the innovation that is MyCase, redefining how legal...",
    image: "/src/assets/images/lawyer01.jpg",
    author: "Fadhli Akbar",
    company: "Anas Law Office",
    authorImage: "/src/assets/images/feris.jpg",
  },
];
</script>

<style scoped>
/* Tambahan styling opsional */
</style>
