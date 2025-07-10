<template>
  <section class="py-16 bg-white text-gray-800">
    <div class="text-center mb-12">
      <p class="text-[#B49F2B] font-semibold uppercase">Blog</p>
      <h2 class="text-4xl font-bold mt-2 mb-4">
        {{ $t('blog.title') }}
      </h2>
      <p class="text-gray-500 max-w-xl mx-auto">
        {{ $t('blog.description') }}
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
              >{{ $t('blog.news') }}</span
            >
            <span
              class="text-xs font-semibold bg-purple-100 text-purple-600 px-3 py-1 rounded-full"
              >{{ $t('blog.inspiration') }}</span
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
        <router-link to="/article">More Post</router-link>
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const blogPosts = computed(() => [
  {
    title: t('blog.defaultTitle'),
    description: t('blog.defaultDescription'),
    image: "/src/assets/images/lawyer01.jpg",
    author: t('blog.defaultAuthor'),
    company: t('blog.defaultCompany'),
    authorImage: "/src/assets/images/feris.jpg",
  },
  {
    title: t('blog.defaultTitle'),
    description: t('blog.defaultDescription'),
    image: "/src/assets/images/lawyer01.jpg",
    author: t('blog.defaultAuthor'),
    company: t('blog.defaultCompany'),
    authorImage: "/src/assets/images/feris.jpg",
  },
  {
    title: t('blog.defaultTitle'),
    description: t('blog.defaultDescription'),
    image: "/src/assets/images/lawyer01.jpg",
    author: t('blog.defaultAuthor'),
    company: t('blog.defaultCompany'),
    authorImage: "/src/assets/images/feris.jpg",
  },
])
</script>

<style scoped>
/* Tambahan styling opsional */
</style>
