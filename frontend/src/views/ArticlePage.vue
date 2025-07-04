<template>
  <Header />
  
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
    <div class="container mx-auto px-4 mt-25">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          {{ $t('articles.title') }}
        </h1>
        <p class="text-xl text-blue-200 max-w-2xl mx-auto">
          {{ $t('articles.subtitle') }}
        </p>
      </div>
    </div>
  </section>

  <!-- Search & Filter Section -->
  <section class="py-8 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <!-- Search Bar -->
        <div class="relative flex-1 max-w-md">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('articles.searchPlaceholder')"
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @input="filterArticles"
          />
          <svg class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="filterByCategory(category.id)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Articles Grid -->
  <section class="py-12">
    <div class="container mx-auto px-4">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">{{ $t('articles.loading') }}</p>
      </div>

      <!-- No Results -->
      <div v-else-if="filteredArticles.length === 0" class="text-center py-12">
        <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ $t('articles.noResults') }}</h3>
        <p class="text-gray-500">{{ $t('articles.noResultsDesc') }}</p>
      </div>

      <!-- Articles Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="article in paginatedArticles"
          :key="article.id"
          class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
        >
          <!-- Article Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div class="absolute top-4 left-4">
              <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                {{ getCategoryName(article.categoryId) }}
              </span>
            </div>
          </div>

          <!-- Article Content -->
          <div class="p-6">
            <div class="flex items-center text-sm text-gray-500 mb-3">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {{ formatDate(article.publishedAt) }}
              <span class="mx-2">•</span>
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ article.readTime }} min read
            </div>

            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {{ article.title }}
            </h3>

            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ article.excerpt }}
            </p>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img
                  :src="article.author.avatar"
                  :alt="article.author.name"
                  class="w-8 h-8 rounded-full mr-2"
                />
                <span class="text-sm text-gray-700 font-medium">
                  {{ article.author.name }}
                </span>
              </div>

              <router-link
                :to="`/article/${article.slug}`"
                class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                {{ $t('articles.readMore') }}
                <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </router-link>
            </div>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-12">
        <nav class="flex items-center space-x-2">
          <button
            @click="currentPage > 1 && (currentPage--)"
            :disabled="currentPage === 1"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ $t('articles.previous') }}
          </button>

          <span
            v-for="page in visiblePages"
            :key="page"
            @click="page !== '...' && (currentPage = page)"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-lg cursor-pointer',
              page === currentPage
                ? 'bg-blue-600 text-white'
                : page === '...'
                ? 'text-gray-400 cursor-default'
                : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
            ]"
          >
            {{ page }}
          </span>

          <button
            @click="currentPage < totalPages && (currentPage++)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ $t('articles.next') }}
          </button>
        </nav>
      </div>
    </div>
  </section>


  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const { t } = useI18n()

// Reactive data
const articles = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('all')
const currentPage = ref(1)
const articlesPerPage = 9
const emailSubscription = ref('')
const subscribing = ref(false)

// Categories
const categories = ref([
  { id: 'all', name: t('articles.categories.all') },
  { id: 'corporate', name: t('articles.categories.corporate') },
  { id: 'criminal', name: t('articles.categories.criminal') },
  { id: 'family', name: t('articles.categories.family') },
  { id: 'property', name: t('articles.categories.property') },
  { id: 'employment', name: t('articles.categories.employment') }
])

// Sample articles data
const sampleArticles = [
  {
    id: 1,
    title: 'Panduan Lengkap Hukum Kontrak Bisnis di Indonesia',
    excerpt: 'Memahami seluk-beluk hukum kontrak bisnis sangat penting untuk melindungi kepentingan perusahaan Anda. Artikel ini membahas dasar-dasar hukum kontrak yang perlu diketahui.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categoryId: 'corporate',
    publishedAt: '2024-01-15',
    readTime: 8,
    slug: 'panduan-hukum-kontrak-bisnis',
    author: {
      name: 'Dr. Ahmad Veritas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 2,
    title: 'Hak dan Kewajiban dalam Hukum Keluarga',
    excerpt: 'Panduan komprehensif tentang hak dan kewajiban suami istri, hak asuh anak, dan pembagian harta gono-gini menurut hukum Indonesia.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categoryId: 'family',
    publishedAt: '2024-01-10',
    readTime: 6,
    slug: 'hak-kewajiban-hukum-keluarga',
    author: {
      name: 'Siti Nurhaliza, S.H.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b098?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 3,
    title: 'Proses Hukum Pidana: Dari Penyidikan hingga Persidangan',
    excerpt: 'Memahami tahapan-tahapan dalam proses hukum pidana di Indonesia, mulai dari penyidikan, penuntutan, hingga persidangan di pengadilan.',
    image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categoryId: 'criminal',
    publishedAt: '2024-01-05',
    readTime: 10,
    slug: 'proses-hukum-pidana-indonesia',
    author: {
      name: 'Budi Santoso, S.H., M.H.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 4,
    title: 'Jual Beli Properti: Aspek Hukum yang Perlu Diperhatikan',
    excerpt: 'Tips dan panduan lengkap mengenai aspek hukum dalam transaksi jual beli properti, termasuk pengecekan sertifikat dan proses balik nama.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categoryId: 'property',
    publishedAt: '2024-01-01',
    readTime: 7,
    slug: 'aspek-hukum-jual-beli-properti',
    author: {
      name: 'Rina Melati, S.H.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 5,
    title: 'Hukum Ketenagakerjaan: Hak Pekerja dan Pengusaha',
    excerpt: 'Panduan lengkap tentang hak dan kewajiban pekerja serta pengusaha menurut Undang-Undang Ketenagakerjaan Indonesia.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categoryId: 'employment',
    publishedAt: '2023-12-28',
    readTime: 9,
    slug: 'hukum-ketenagakerjaan-indonesia',
    author: {
      name: 'Dr. Ahmad Veritas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  },
  {
    id: 6,
    title: 'Pendirian PT: Syarat dan Prosedur Lengkap',
    excerpt: 'Langkah-langkah detail dalam pendirian Perseroan Terbatas (PT) di Indonesia, termasuk persyaratan dokumen dan biaya yang diperlukan.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    categoryId: 'corporate',
    publishedAt: '2023-12-25',
    readTime: 8,
    slug: 'pendirian-pt-syarat-prosedur',
    author: {
      name: 'Siti Nurhaliza, S.H.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b098?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  }
]

// Computed properties
const filteredArticles = computed(() => {
  let filtered = articles.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(article => article.categoryId === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query)
    )
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / articlesPerPage)
})

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * articlesPerPage
  const end = start + articlesPerPage
  return filteredArticles.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

// Methods
const filterArticles = () => {
  currentPage.value = 1
}

const filterByCategory = (categoryId) => {
  selectedCategory.value = categoryId
  currentPage.value = 1
}

const getCategoryName = (categoryId) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category ? category.name : ''
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const subscribeNewsletter = async () => {
  if (!emailSubscription.value) return

  subscribing.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert(t('articles.newsletter.success'))
    emailSubscription.value = ''
  } catch (error) {
    alert(t('articles.newsletter.error'))
  } finally {
    subscribing.value = false
  }
}

const loadArticles = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    articles.value = sampleArticles
  } catch (error) {
    console.error('Error loading articles:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadArticles()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>