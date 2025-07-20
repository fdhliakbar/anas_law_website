// API Configuration untuk Backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002/api'

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}

export const apiEndpoints = {
  // Authentication
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  profile: `${API_BASE_URL}/auth/profile`,
  
  // Articles
  articles: `${API_BASE_URL}/articles`,
  createArticle: `${API_BASE_URL}/articles`,
  getArticle: (id) => `${API_BASE_URL}/articles?artikel_id=${id}`,
  updateArticle: (id) => `${API_BASE_URL}/articles/${id}`,
  deleteArticle: (id) => `${API_BASE_URL}/articles/${id}`,
  
  // Users (Admin only)
  users: `${API_BASE_URL}/users`,
  getUser: (id) => `${API_BASE_URL}/users/${id}`,
  updateUser: (id) => `${API_BASE_URL}/users/${id}`,
  deleteUser: (id) => `${API_BASE_URL}/users/${id}`
}

// Helper function untuk request dengan authorization
export const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem('authToken')
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }
  
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  }
  
  try {
    const response = await fetch(url, mergedOptions)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed')
    }
    
    return data
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}

console.log('🌐 API Base URL:', API_BASE_URL)
