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

      <!-- Category Filter -->
      <div class="mb-8 flex justify-center flex-wrap gap-2">
        <button
          @click="selectedCategory = null"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="selectedCategory === null ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
        >
          All Categories
        </button>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
        >
          {{ category }}
        </button>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <!-- No articles found -->
      <div v-else-if="filteredArticles.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-gray-900">No articles found</h3>
        <p class="mt-1 text-gray-500">
          {{ selectedCategory ? `No articles in ${selectedCategory} category.` : 'There are no articles available yet.' }}
        </p>
      </div>

      <!-- Articles List -->
      <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div 
          v-for="article in filteredArticles" 
          :key="article.id" 
          class="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
        >
          <div class="h-48 overflow-hidden">
            <img 
              v-if="article.image" 
              :src="article.image" 
              :alt="article.title" 
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            >
            <div v-else class="h-48 bg-gradient-to-r from-indigo-100 to-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex items-center mb-3">
              <span class="text-xs font-semibold px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                {{ article.category }}
              </span>
              <span class="ml-3 text-xs text-gray-500">{{ formatDate(article.publishedAt) }}</span>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {{ article.title }}
            </h3>
            
            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ article.summary }}
            </p>
            
            <router-link 
              :to="{ name: 'ArticleDetail', params: { id: article.id } }"
              class="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Read more
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Pagination if needed -->
      <div v-if="filteredArticles.length > 0 && totalPages > 1" class="mt-12 flex justify-center">
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
            :class="currentPage === page ? 'bg-indigo-50 text-indigo-600 border-indigo-500 z-10' : 'text-gray-700 hover:bg-gray-50'"
          >
            {{ page }}
          </button>
          <button 
            @click="currentPage = Math.min(currentPage + 1, totalPages)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
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
  name: 'PublicArticlesList',
  data() {
    return {
      articles: [],
      loading: true,
      error: null,
      selectedCategory: null,
      currentPage: 1,
      articlesPerPage: 9,
      categories: [
        'Corporate Law',
        'Criminal Law',
        'Family Law',
        'Property Law',
        'Tax Law',
        'Labor Law',
        'Intellectual Property'
      ]
    };
  },
  computed: {
    filteredArticles() {
      let filtered = this.articles;
      
      // Filter by category if one is selected
      if (this.selectedCategory) {
        filtered = filtered.filter(article => article.category === this.selectedCategory);
      }
      
      // Calculate start and end indices for pagination
      const startIndex = (this.currentPage - 1) * this.articlesPerPage;
      const endIndex = startIndex + this.articlesPerPage;
      
      return filtered.slice(startIndex, endIndex);
    },
    totalPages() {
      let filtered = this.articles;
      if (this.selectedCategory) {
        filtered = filtered.filter(article => article.category === this.selectedCategory);
      }
      return Math.ceil(filtered.length / this.articlesPerPage);
    }
  },
  created() {
    this.fetchArticles();
  },
  watch: {
    selectedCategory() {
      // Reset to first page when changing category
      this.currentPage = 1;
    }
  },
  methods: {
    async fetchArticles() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch('http://localhost:3000/api/articles/published');
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const data = await response.json();
        this.articles = data;
      } catch (err) {
        console.error('Error fetching articles:', err);
        this.error = 'Failed to load articles. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    }
  }
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
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
