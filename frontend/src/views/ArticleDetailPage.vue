<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"
      ></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <!-- Back to Dashboard Button -->
      <div class="mb-6">
        <button
          @click="goToDashboard"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Dashboard Admin
        </button>
      </div>

      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      >
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> {{ error }}</span>
      </div>
      <div class="mt-6 text-center">
        <router-link
          to="/articles"
          class="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Return to Articles
        </router-link>
      </div>
    </div>

    <!-- Article content -->
    <div v-else class="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <!-- Back to Dashboard Button -->
      <div class="mb-6">
        <button
          @click="goToDashboard"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 mr-4"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Dashboard Admin
        </button>

        <router-link
          to="/articles"
          class="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <svg
            class="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Articles
        </router-link>
      </div>

      <article class="bg-white rounded-lg shadow-md overflow-hidden">
        <div
          v-if="article.image"
          class="w-full h-64 sm:h-80 md:h-96 bg-gray-200"
        >
          <img
            :src="article.image"
            :alt="article.title"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="p-6 sm:p-8">
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <span
              class="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full"
            >
              {{ article.category }}
            </span>
            <span class="text-sm text-gray-500">
              Published on {{ formatDate(article.publishedAt) }}
            </span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-6">
            {{ article.title }}
          </h1>

          <div class="prose prose-indigo max-w-none">
            <!-- Convert article content from markdown to HTML if needed -->
            <p class="text-gray-700 text-lg mb-6">{{ article.summary }}</p>

            <div v-html="formattedContent"></div>
          </div>
        </div>
      </article>

      <!-- Share buttons -->
      <div class="mt-8 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <span class="text-gray-700">Share:</span>
          <button
            class="text-blue-600 hover:text-blue-800"
            @click="shareOnFacebook"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <button
            class="text-blue-400 hover:text-blue-600"
            @click="shareOnTwitter"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
              ></path>
            </svg>
          </button>
          <button
            class="text-green-600 hover:text-green-800"
            @click="shareOnWhatsapp"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M17.415 14.382c-.298-.149-1.759-.867-2.031-.967-.272-.099-.47-.148-.669.15-.198.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <button
          @click="copyLink"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          <svg
            class="-ml-1 mr-2 h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
            />
          </svg>
          Copy Link
        </button>
      </div>

      <!-- Related articles section could be added here -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleDetailPage",
  data() {
    return {
      article: null,
      loading: true,
      error: null,
    };
  },
  computed: {
    formattedContent() {
      if (!this.article || !this.article.content) return "";

      // Simple paragraph formatting - you might want to use a markdown parser
      return this.article.content
        .split("\n\n")
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join("");
    },
  },
  created() {
    this.fetchArticle();
  },
  methods: {
    async fetchArticle() {
      this.loading = true;
      this.error = null;

      try {
        const articleId = this.$route.params.id;
        const response = await fetch(
          `http://localhost:3000/api/articles/${articleId}`
        );

        if (!response.ok) {
          throw new Error("Article not found");
        }

        this.article = await response.json();

        // Track article view using the actual artikel_id from the response
        await this.trackArticleView(this.article.artikel_id || articleId);

        // Update page title
        document.title = `${this.article.title} | Law Firm`;
      } catch (err) {
        console.error("Error fetching article:", err);
        this.error = err.message;
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

    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
    },

    shareOnTwitter() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(this.article.title);
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        "_blank"
      );
    },

    shareOnWhatsapp() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(this.article.title);
      window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
    },

    copyLink() {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err);
        });
    },

    goToDashboard() {
      this.$router.push("/admin/dashboard");
    },

    async trackArticleView(articleId) {
      try {
        await fetch("http://localhost:3000/api/admin/track-view", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            articleId: articleId,
          }),
        });
      } catch (error) {
        // Silent fail - view tracking shouldn't break the user experience
        console.log("View tracking failed:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Additional styling for article content */
</style>
