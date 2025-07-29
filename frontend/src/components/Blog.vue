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

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#B49F2B]"></div>
      <span class="ml-3 text-gray-600">Memuat artikel...</span>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-12">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto max-w-md">
        <p class="font-bold">Error!</p>
        <p class="text-sm">{{ error }}</p>
      </div>
      <button 
        @click="fetchArticles" 
        class="mt-4 bg-[#B49F2B] text-white px-4 py-2 rounded hover:bg-[#A08A26] transition"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Articles grid -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
    >
      <div
        v-for="(post, index) in blogPosts"
        :key="post.artikel_id || index"
        class="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 cursor-pointer"
        @click="goToArticle(post.artikel_id)"
      >
        <img
          :src="post.image"
          :alt="post.title"
          class="rounded-t-2xl w-full h-60 object-cover"
          @error="handleImageError"
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
          <h3 class="text-lg font-semibold mb-2 line-clamp-2">{{ post.title }}</h3>
          <p class="text-gray-500 text-sm mb-4 line-clamp-3">{{ post.description }}</p>
          <div class="flex items-center gap-3 mt-auto">
            <img
              :src="post.authorImage"
              :alt="post.author"
              class="w-10 h-10 rounded-full"
              @error="(e) => e.target.src = '/src/assets/images/founder.jpg'"
            />
            <div>
              <p class="text-sm font-medium">{{ post.author }}</p>
              <p class="text-xs text-gray-400" v-if="post.created_at">{{ formatDate(post.created_at) }}</p>
              <p class="text-xs text-gray-400" v-else>{{ post.company }}</p>
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
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

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
/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Loading animation */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Hover effects */
.cursor-pointer:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease-in-out;
}
</style>
