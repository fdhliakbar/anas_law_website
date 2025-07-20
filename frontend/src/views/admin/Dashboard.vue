<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-lg flex flex-col">
      <div class="h-20 flex items-center justify-center border-b">
        <span class="text-2xl font-bold text-indigo-700">Anas Law Firm</span>
      </div>
      <nav class="flex-1 px-4 py-6">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/admin/dashboard"
              class="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold"
            >
              <span class="material-icons mr-3">dashboard</span>
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/article-management"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span class="material-icons mr-3">article</span>
              Article Management
            </router-link>
          </li>
          <li>
            <button
              @click="openUserModal"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left"
            >
              <span class="material-icons mr-3">people</span>
              User Management
            </button>
          </li>
          <li>
            <button
              @click="openProfileModal"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full text-left"
            >
              <span class="material-icons mr-3">account_circle</span>
              Profile Settings
            </button>
          </li>
          <li>
            <a
              href="/"
              class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <span class="material-icons mr-3">home</span>
              Back to Website
            </a>
          </li>
        </ul>
        <div class="mt-10">
          <h4 class="text-xs text-gray-400 uppercase mb-2">Account</h4>
          <ul class="space-y-1">
            <li>
              <button
                @click="logout"
                class="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
              >
                <span class="material-icons mr-3">logout</span>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="flex items-center justify-between bg-white px-8 py-6 shadow">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p class="text-gray-600">Welcome back, {{ currentUser.name || 'Admin' }}</p>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-500">{{ currentDate }}</span>
          <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
            {{ currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'A' }}
          </div>
        </div>
      </header>
      
      <!-- Dashboard Content -->
      <main class="flex-1 p-8 overflow-y-auto">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 mb-1">Total Articles</p>
                <p class="text-2xl font-bold text-gray-800">{{ stats.totalArticles }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="material-icons text-blue-600">article</span>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 mb-1">Total Users</p>
                <p class="text-2xl font-bold text-gray-800">{{ stats.totalUsers }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="material-icons text-green-600">people</span>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 mb-1">This Month</p>
                <p class="text-2xl font-bold text-gray-800">{{ stats.thisMonth }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span class="material-icons text-purple-600">trending_up</span>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 mb-1">Active Today</p>
                <p class="text-2xl font-bold text-gray-800">{{ stats.activeToday }}</p>
              </div>
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span class="material-icons text-orange-600">today</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Articles -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl shadow p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-800">Recent Articles</h2>
              <router-link 
                to="/admin/article-management" 
                class="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                View All
              </router-link>
            </div>
            <div class="space-y-3">
              <div v-if="recentArticles.length === 0" class="text-gray-500 text-center py-4">
                No articles yet
              </div>
              <div 
                v-for="article in recentArticles" 
                :key="article.artikel_id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 class="font-medium text-gray-800">{{ article.judul }}</h3>
                  <p class="text-sm text-gray-600">{{ formatDate(article.created_at) }}</p>
                </div>
                <span class="text-green-600 text-sm">Published</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-xl shadow p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div class="space-y-3">
              <router-link 
                to="/admin/article-management"
                class="w-full flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              >
                <div class="flex items-center">
                  <span class="material-icons text-indigo-600 mr-3">add_circle</span>
                  <span class="font-medium text-indigo-700">Create New Article</span>
                </div>
                <span class="material-icons text-indigo-600">arrow_forward</span>
              </router-link>
              
              <a 
                href="/"
                class="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <div class="flex items-center">
                  <span class="material-icons text-green-600 mr-3">visibility</span>
                  <span class="font-medium text-green-700">View Website</span>
                </div>
                <span class="material-icons text-green-600">arrow_forward</span>
              </a>
              
              <button 
                @click="refreshStats"
                class="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <div class="flex items-center">
                  <span class="material-icons text-orange-600 mr-3">refresh</span>
                  <span class="font-medium text-orange-700">Refresh Data</span>
                </div>
                <span class="material-icons text-orange-600">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Profile Settings Modal -->
    <div v-if="showProfileModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Profile Settings</h3>
          <button @click="showProfileModal = false" class="text-gray-400 hover:text-gray-600">
            <span class="material-icons">close</span>
          </button>
        </div>
        <form @submit.prevent="updateProfile">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input 
              v-model="profileForm.name" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              v-model="profileForm.email" 
              type="email" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">New Password (optional)</label>
            <input 
              v-model="profileForm.password" 
              type="password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Leave blank to keep current password"
            >
          </div>
          <div class="flex justify-end space-x-3">
            <button 
              type="button" 
              @click="showProfileModal = false"
              class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- User Management Modal -->
    <div v-if="showUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">User Management</h3>
          <button @click="showUserModal = false" class="text-gray-400 hover:text-gray-600">
            <span class="material-icons">close</span>
          </button>
        </div>
        
        <!-- Users Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in allUsers" :key="user.users_id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'" 
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    v-if="user.users_id !== currentUser.id"
                    @click="deleteUser(user.users_id)" 
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                  <span v-else class="text-gray-400">Current User</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-if="allUsers.length === 0" class="text-center py-4 text-gray-500">
          No users found
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AdminDashboard',
  setup() {
    const router = useRouter()
    const stats = ref({
      totalArticles: 0,
      totalUsers: 0,
      thisMonth: 0,
      activeToday: 0
    })
    const recentArticles = ref([])
    const currentUser = ref({})
    const allUsers = ref([])
    
    // Modal states
    const showProfileModal = ref(false)
    const showUserModal = ref(false)
    
    // Profile form
    const profileForm = ref({
      name: '',
      email: '',
      password: ''
    })

    const currentDate = computed(() => {
      return new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    })

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const loadUserData = () => {
      const userData = localStorage.getItem('user')
      if (userData) {
        currentUser.value = JSON.parse(userData)
      }
    }

    const loadStats = async () => {
      try {
        // Load articles stats
        const articlesResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/articles`)
        if (articlesResponse.ok) {
          const articlesData = await articlesResponse.json()
          stats.value.totalArticles = articlesData.data?.length || 0
          
          // Get recent articles (last 5)
          recentArticles.value = articlesData.data?.slice(0, 5) || []
          
          // Calculate this month articles
          const thisMonth = new Date().getMonth()
          const thisYear = new Date().getFullYear()
          stats.value.thisMonth = articlesData.data?.filter(article => {
            const articleDate = new Date(article.created_at)
            return articleDate.getMonth() === thisMonth && articleDate.getFullYear() === thisYear
          }).length || 0
        }

        // Load users stats (only if admin)
        const token = localStorage.getItem('authToken')
        if (token && currentUser.value.role === 'admin') {
          const usersResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (usersResponse.ok) {
            const usersData = await usersResponse.json()
            stats.value.totalUsers = usersData.data?.length || 0
          }
        }

        // Mock active today (could be from analytics)
        stats.value.activeToday = Math.floor(Math.random() * 50) + 10

      } catch (error) {
        console.error('Error loading stats:', error)
      }
    }

    const loadAllUsers = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (token && currentUser.value.role === 'admin') {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (response.ok) {
            const data = await response.json()
            allUsers.value = data.data || []
          }
        }
      } catch (error) {
        console.error('Error loading users:', error)
      }
    }

    const updateProfile = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const updateData = {
          name: profileForm.value.name,
          email: profileForm.value.email
        }
        
        if (profileForm.value.password) {
          updateData.password = profileForm.value.password
        }

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${currentUser.value.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updateData)
        })

        const data = await response.json()
        
        if (response.ok && data.success) {
          // Update localStorage
          const updatedUser = { ...currentUser.value, ...data.data }
          localStorage.setItem('user', JSON.stringify(updatedUser))
          currentUser.value = updatedUser
          
          alert('Profile updated successfully!')
          showProfileModal.value = false
          profileForm.value.password = '' // Clear password field
        } else {
          alert(data.message || 'Failed to update profile')
        }
      } catch (error) {
        console.error('Error updating profile:', error)
        alert('Error updating profile')
      }
    }

    const deleteUser = async (userId) => {
      if (!confirm('Are you sure you want to delete this user?')) {
        return
      }

      try {
        const token = localStorage.getItem('authToken')
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()
        
        if (response.ok && data.success) {
          alert('User deleted successfully!')
          loadAllUsers() // Reload users list
          loadStats() // Reload stats
        } else {
          alert(data.message || 'Failed to delete user')
        }
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Error deleting user')
      }
    }

    const openProfileModal = () => {
      profileForm.value = {
        name: currentUser.value.name,
        email: currentUser.value.email,
        password: ''
      }
      showProfileModal.value = true
    }

    const openUserModal = () => {
      loadAllUsers()
      showUserModal.value = true
    }

    const refreshStats = () => {
      loadStats()
    }

    const logout = () => {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      router.push('/')
    }

    onMounted(() => {
      loadUserData()
      loadStats()
    })

    return {
      stats,
      recentArticles,
      currentUser,
      currentDate,
      formatDate,
      refreshStats,
      logout,
      showProfileModal,
      showUserModal,
      profileForm,
      allUsers,
      updateProfile,
      deleteUser,
      openProfileModal,
      openUserModal
    }
  }
}
</script>

<style>
/* Add Material Icons if not already included */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
