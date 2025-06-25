<template>
  <div class="article-management">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Legal Articles Management</h1>
      <button 
        @click="openArticleModal(null)" 
        class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Add New Article
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      <span class="block sm:inline">{{ error }}</span>
    </div>

    <!-- Articles list -->
    <div v-else-if="articles.length === 0" class="text-center py-8 text-gray-500">
      No articles found. Create your first article!
    </div>
    
    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="article in articles" :key="article.id" 
           class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
        <div class="h-48 overflow-hidden">
          <img 
            v-if="article.image" 
            :src="article.image" 
            :alt="article.title" 
            class="w-full h-full object-cover"
          >
          <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
            <span class="text-gray-400">No image</span>
          </div>
        </div>
        
        <div class="p-4 flex-grow">
          <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{{ article.title }}</h3>
          <p class="text-sm text-gray-600 mb-3 line-clamp-3">{{ article.summary }}</p>
          <div class="text-xs text-gray-500">
            <span>{{ formatDate(article.publishedAt) }}</span>
            <span class="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
              {{ article.category }}
            </span>
          </div>
        </div>
        
        <div class="p-4 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button 
            @click="openArticleModal(article)" 
            class="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Edit
          </button>
          <button 
            @click="confirmDelete(article)" 
            class="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
          <button 
            @click="togglePublish(article)" 
            class="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            {{ article.published ? 'Unpublish' : 'Publish' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Article Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800">
              {{ isEditing ? 'Edit Article' : 'Create New Article' }}
            </h2>
            <button @click="showModal = false" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="saveArticle">
            <div class="mb-4">
              <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                id="title"
                v-model="currentArticle.title"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div class="mb-4">
              <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                v-model="currentArticle.category"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="Corporate Law">Corporate Law</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Family Law">Family Law</option>
                <option value="Property Law">Property Law</option>
                <option value="Tax Law">Tax Law</option>
                <option value="Labor Law">Labor Law</option>
                <option value="Intellectual Property">Intellectual Property</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="summary" class="block text-sm font-medium text-gray-700 mb-1">Summary</label>
              <textarea
                id="summary"
                v-model="currentArticle.summary"
                rows="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              ></textarea>
            </div>

            <div class="mb-4">
              <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                id="content"
                v-model="currentArticle.content"
                rows="10"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              ></textarea>
            </div>

            <div class="mb-4">
              <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                id="image"
                v-model="currentArticle.image"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div class="mb-4 flex items-center">
              <input
                type="checkbox"
                id="published"
                v-model="currentArticle.published"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="published" class="ml-2 block text-sm text-gray-700">Publish immediately</label>
            </div>

            <div class="flex justify-end mt-6 space-x-3">
              <button
                type="button"
                @click="showModal = false"
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                :disabled="saving"
              >
                <span v-if="saving">Saving...</span>
                <span v-else>{{ isEditing ? 'Update' : 'Create' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Confirm Deletion</h3>
        <p class="text-gray-700 mb-6">
          Are you sure you want to delete the article "{{ articleToDelete?.title }}"? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            @click="deleteArticle"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            :disabled="deleting"
          >
            <span v-if="deleting">Deleting...</span>
            <span v-else>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleManagement',
  data() {
    return {
      articles: [],
      loading: true,
      error: null,
      showModal: false,
      showDeleteModal: false,
      currentArticle: {
        title: '',
        category: 'Corporate Law',
        summary: '',
        content: '',
        image: '',
        published: false
      },
      articleToDelete: null,
      isEditing: false,
      saving: false,
      deleting: false
    }
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch('http://localhost:3000/api/articles');
        
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
    
    openArticleModal(article) {
      if (article) {
        // Edit existing article
        this.currentArticle = { ...article };
        this.isEditing = true;
      } else {
        // Create new article
        this.currentArticle = {
          title: '',
          category: 'Corporate Law',
          summary: '',
          content: '',
          image: '',
          published: false,
          publishedAt: null
        };
        this.isEditing = false;
      }
      this.showModal = true;
    },
    
    async saveArticle() {
      this.saving = true;
      try {
        const url = this.isEditing 
          ? `http://localhost:3000/api/articles/${this.currentArticle.id}`
          : 'http://localhost:3000/api/articles';
        
        const method = this.isEditing ? 'PUT' : 'POST';
        
        // Set publication date if publishing for the first time
        if (this.currentArticle.published && !this.currentArticle.publishedAt) {
          this.currentArticle.publishedAt = new Date().toISOString();
        }
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token auth
          },
          body: JSON.stringify(this.currentArticle)
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to save article');
        }
        
        // Refresh the articles list
        await this.fetchArticles();
        this.showModal = false;
        
        // Show success message
        alert(this.isEditing ? 'Article updated successfully!' : 'Article created successfully!');
      } catch (err) {
        console.error('Error saving article:', err);
        alert(`Failed to save article: ${err.message}`);
      } finally {
        this.saving = false;
      }
    },
    
    confirmDelete(article) {
      this.articleToDelete = article;
      this.showDeleteModal = true;
    },
    
    async deleteArticle() {
      if (!this.articleToDelete) return;
      
      this.deleting = true;
      try {
        const response = await fetch(`http://localhost:3000/api/articles/${this.articleToDelete.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token auth
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete article');
        }
        
        // Remove the deleted article from the list
        this.articles = this.articles.filter(a => a.id !== this.articleToDelete.id);
        this.showDeleteModal = false;
        this.articleToDelete = null;
        
        // Show success message
        alert('Article deleted successfully!');
      } catch (err) {
        console.error('Error deleting article:', err);
        alert(`Failed to delete article: ${err.message}`);
      } finally {
        this.deleting = false;
      }
    },
    
    async togglePublish(article) {
      try {
        const updatedArticle = { ...article, published: !article.published };
        
        // Set publication date if publishing for the first time
        if (updatedArticle.published && !updatedArticle.publishedAt) {
          updatedArticle.publishedAt = new Date().toISOString();
        }
        
        const response = await fetch(`http://localhost:3000/api/articles/${article.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token auth
          },
          body: JSON.stringify(updatedArticle)
        });
        
        if (!response.ok) {
          throw new Error('Failed to update article status');
        }
        
        // Update the article in the local list
        const index = this.articles.findIndex(a => a.id === article.id);
        if (index !== -1) {
          this.articles[index] = { ...this.articles[index], published: !article.published };
          if (this.articles[index].published && !this.articles[index].publishedAt) {
            this.articles[index].publishedAt = new Date().toISOString();
          }
        }
        
        // Show success message
        alert(`Article ${updatedArticle.published ? 'published' : 'unpublished'} successfully!`);
      } catch (err) {
        console.error('Error updating article status:', err);
        alert(`Failed to update article status: ${err.message}`);
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Not published';
      
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    }
  }
}
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
