<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Legal Publications
        </h1>
        <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Stay updated with the latest legal news, analyses, and insights
        </p>
      </div>

      <!-- Add Article Button -->
      <div class="flex justify-end mb-6">
        <button
          @click="goToAddArticle"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Artikel
        </button>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"
        ></div>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      >
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <!-- No articles found -->
      <div v-else-if="filteredArticles.length === 0" class="text-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-gray-900">
          No articles found
        </h3>
        <p class="mt-1 text-gray-500">There are no articles available yet.</p>
      </div>

      <!-- Articles List -->
      <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="article in filteredArticles"
          :key="article.artikel_id"
          class="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
        >
          <div class="h-48 overflow-hidden">
            <img
              v-if="article.gambar"
              :src="article.gambar"
              :alt="article.judul"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div
              v-else
              class="h-48 bg-gradient-to-r from-indigo-100 to-blue-100 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-16 text-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>

          <div class="p-6">
            <span class="ml-3 text-xs text-gray-500">{{
              formatDate(article.created_at)
            }}</span>

            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {{ article.judul }}
            </h3>

            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ article.deskripsi }}
            </p>

            <a
              v-if="article.link_artikel"
              :href="article.link_artikel"
              target="_blank"
              class="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Baca Artikel
              <svg
                class="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Pagination if needed -->
      <div
        v-if="filteredArticles.length > 0 && totalPages > 1"
        class="mt-12 flex justify-center"
      >
        <nav class="inline-flex rounded-md shadow">
          <button
            @click="currentPage = Math.max(currentPage - 1, 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          >
            Previous
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            class="px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
            :class="
              currentPage === page
                ? 'bg-indigo-50 text-indigo-600 border-indigo-500 z-10'
                : 'text-gray-700 hover:bg-gray-50'
            "
          >
            {{ page }}
          </button>
          <button
            @click="currentPage = Math.min(currentPage + 1, totalPages)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            :class="{
              'opacity-50 cursor-not-allowed': currentPage === totalPages,
            }"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicArticlesList",
  data() {
    return {
      articles: [],
      loading: true,
      error: null,
      currentPage: 1,
      articlesPerPage: 9,
    };
  },
  computed: {
    filteredArticles() {
      // Pagination only, no category filter
      const startIndex = (this.currentPage - 1) * this.articlesPerPage;
      const endIndex = startIndex + this.articlesPerPage;
      return this.articles.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.articles.length / this.articlesPerPage);
    },
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(
          "http://localhost:3000/api/article/get-articles"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await response.json();
        if (Array.isArray(data.articles)) {
          this.articles = data.articles;
        } else if (Array.isArray(data.data)) {
          this.articles = data.data;
        } else if (data.data) {
          this.articles = [data.data];
        } else {
          this.articles = [];
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        this.error = "Failed to load articles. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    formatDate(dateString) {
      if (!dateString) return "";

      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    },

    goToAddArticle() {
      this.$router.push("/admin/article-management");
    },
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
