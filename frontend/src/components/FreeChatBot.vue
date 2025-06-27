<template>
  <!-- 🆓 100% FREE AI ChatBot -->
  <div class="fixed bottom-6 right-6 z-[9999]">
    <!-- Chat Widget -->
    <div
      v-if="isOpen"
      class="mb-4 w-80 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div :class="['absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white', aiOnline ? 'bg-green-400 animate-pulse' : 'bg-red-400']"></div>
          </div>
          <div>
            <h3 class="font-semibold text-sm">🆓 FREE AI Legal Assistant</h3>
            <select 
              v-model="selectedModel" 
              @change="updateAiModel"
              class="text-xs bg-white/20 border border-white/30 rounded px-2 py-1 text-white mt-1"
            >
              <option value="meta-llama/llama-3.1-8b-instruct:free">🦙 Llama 3.1 FREE</option>
              <option value="qwen/qwen-2-7b-instruct:free">🐉 Qwen 2 FREE</option>
              <option value="google/gemma-2-9b-it:free">💎 Gemma 2 FREE</option>
              <option value="microsoft/phi-3-mini-128k-instruct:free">🔵 Phi-3 FREE</option>
              <option value="mistralai/mistral-7b-instruct:free">🌪️ Mistral FREE</option>
            </select>
            <p class="text-xs opacity-90 mt-1">{{ aiStatus }}</p>
          </div>
        </div>
        <button @click="toggleChat" class="text-white hover:text-gray-200 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" ref="messagesContainer">
        <!-- Welcome Message -->
        <div v-if="messages.length === 0" class="flex justify-start">
          <div class="bg-white rounded-lg p-3 max-w-64 shadow-sm border">
            <div class="flex items-center space-x-2 mb-2">
              <div class="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <span class="text-white text-xs font-bold">🆓</span>
              </div>
              <span class="text-xs font-semibold text-gray-700">FREE AI Assistant</span>
            </div>
            <p class="text-sm text-gray-800 mb-2">
              Halo! Saya adalah <strong>AI Legal Assistant</strong> yang 100% GRATIS! 🤖⚖️🆓
            </p>
            <p class="text-xs text-gray-600 mb-3">
              Saya menggunakan AI model open-source gratis:
            </p>
            <ul class="text-xs text-gray-600 space-y-1">
              <li>• Llama 3.1 dari Meta 🦙</li>
              <li>• Qwen 2 dari Alibaba 🐉</li>
              <li>• Gemma 2 dari Google 💎</li>
              <li>• Phi-3 dari Microsoft 🔵</li>
              <li>• Mistral dari Mistral AI 🌪️</li>
            </ul>
            <div class="mt-3 text-xs text-green-600 bg-green-50 p-2 rounded">
              🆓 100% FREE - No Cost - Zero Charge!
            </div>
            <div class="mt-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
              🤖 Model: {{ aiModel }}
            </div>
          </div>
        </div>

        <!-- Chat Messages -->
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['flex', message.isUser ? 'justify-end' : 'justify-start']"
        >
          <div
            :class="[
              'rounded-lg p-3 max-w-64 text-sm shadow-sm',
              message.isUser
                ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white'
                : 'bg-white text-gray-800 border'
            ]"
          >
            <div v-if="!message.isUser" class="flex items-center space-x-2 mb-1">
              <div class="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
              <span class="text-xs font-medium text-gray-600">{{ aiModel }} (FREE)</span>
            </div>
            <div class="whitespace-pre-line">{{ message.text }}</div>
            <span class="text-xs opacity-70 mt-2 block">{{ message.time }}</span>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex justify-start">
          <div class="bg-white rounded-lg p-3 max-w-64 border shadow-sm">
            <div class="flex items-center space-x-2">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-green-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-green-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
              <span class="text-xs text-gray-500">FREE AI sedang berpikir...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div v-if="showQuickActions" class="p-3 border-t border-gray-200 bg-white">
        <p class="text-xs text-gray-600 mb-2 font-medium">🆓 Tanya FREE AI:</p>
        <div class="grid grid-cols-1 gap-2 text-xs">
          <button
            @click="sendQuickMessage('Jelaskan perbedaan hukum pidana dan perdata secara sederhana')"
            class="text-left p-2 bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 rounded border border-green-200 text-gray-700 transition"
          >
            🧠 Tanya FREE AI tentang Hukum
          </button>
          <button
            @click="sendQuickMessage('Berapa biaya konsultasi di Anas Law?')"
            class="text-left p-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded border border-blue-200 text-gray-700 transition"
          >
            💰 Info Biaya & Layanan
          </button>
          <button
            @click="sendQuickMessage('Bagaimana cara membuat janji konsultasi?')"
            class="text-left p-2 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded border border-purple-200 text-gray-700 transition"
          >
            📅 Booking Konsultasi
          </button>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-3 border-t border-gray-200 bg-white rounded-b-lg">
        <div class="flex space-x-2">
          <input
            v-model="currentMessage"
            @keyup.enter="sendMessage"
            placeholder="Tanyakan apa saja ke FREE AI Legal Assistant..."
            class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
            :disabled="isTyping"
          />
          <button
            @click="sendMessage"
            :disabled="!currentMessage.trim() || isTyping"
            class="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center"
          >
            <svg v-if="!isTyping" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
            <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </button>
        </div>
        <div class="flex items-center justify-between mt-2">
          <p class="text-xs text-gray-500">
            🆓 Powered by {{ aiModel }} (FREE)
          </p>
          <div class="flex items-center space-x-1">
            <div class="w-2 h-2 rounded-full" :class="aiOnline ? 'bg-green-400' : 'bg-red-400'"></div>
            <span class="text-xs text-gray-500">{{ aiOnline ? 'FREE AI Online' : 'Offline' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Toggle Button -->
    <button
      @click="toggleChat"
      class="relative w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center group animate-pulse"
    >
      <div v-if="!isOpen" class="relative">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <!-- FREE Badge -->
        <div class="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs px-1 py-0.5 rounded-full font-bold animate-bounce">
          FREE
        </div>
      </div>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>

      <!-- Tooltip -->
      <div class="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        🆓 Chat dengan FREE AI Legal Assistant
      </div>
    </button>

    <!-- Notification Badge -->
    <div v-if="hasUnreadMessages && !isOpen" class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
      {{ unreadCount }}
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import AI_CONFIG from '../config/ai-config.js'

const isOpen = ref(false)
const currentMessage = ref('')
const messages = ref([])
const isTyping = ref(false)
const showQuickActions = ref(true)
const hasUnreadMessages = ref(false)
const unreadCount = ref(0)
const messagesContainer = ref(null)
const aiOnline = ref(false)
const aiStatus = ref('Menghubungkan ke FREE AI...')
const aiModel = ref('FREE AI')
const selectedModel = ref('meta-llama/llama-3.1-8b-instruct:free')

// Konfigurasi OpenRouter dengan model GRATIS
console.log('🔑 Checking API Key:', import.meta.env.VITE_OPENROUTER_API_KEY ? 'Found' : 'Missing')
console.log('🔑 API Key starts with:', import.meta.env.VITE_OPENROUTER_API_KEY?.substring(0, 15) + '...')
console.log('🔑 AI_CONFIG.OPENROUTER.token:', AI_CONFIG.OPENROUTER.token ? 'Found' : 'Missing')

const OPENROUTER_API = {
  url: 'https://openrouter.ai/api/v1/chat/completions',
  token: AI_CONFIG.OPENROUTER.token,
  headers: {
    'Authorization': `Bearer ${AI_CONFIG.OPENROUTER.token}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': import.meta.env.VITE_SITE_URL || 'https://anaslaw.com',
    'X-Title': import.meta.env.VITE_SITE_NAME || 'Anas Law FREE AI Assistant'
  }
}

// System prompt untuk konteks hukum (dioptimalkan untuk model gratis)
const LEGAL_CONTEXT = `You are a helpful AI legal assistant for Anas Law firm in Indonesia. 

Key Information:
- Firm: Anas Law Indonesia
- Services: Criminal law, Civil law, Family law, Business law
- Free consultation: First 30 minutes FREE
- Consultation fee: Rp 500,000/hour
- Hours: Monday-Friday 09:00-17:00
- Emergency: 24/7 available
- Experience: 15+ years

Instructions:
- Respond in Indonesian language
- Be professional but friendly
- Keep responses under 80 words (shorter for free models)
- Provide general legal information, not specific legal advice
- Always suggest direct consultation for complex cases
- Use simple, clear language

User question: `

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    hasUnreadMessages.value = false
    unreadCount.value = 0
    showQuickActions.value = messages.value.length === 0
  }
}

const updateAiModel = () => {
  const modelNames = {
    'meta-llama/llama-3.1-8b-instruct:free': 'Llama 3.1 FREE',
    'qwen/qwen-2-7b-instruct:free': 'Qwen 2 FREE',
    'google/gemma-2-9b-it:free': 'Gemma 2 FREE',
    'microsoft/phi-3-mini-128k-instruct:free': 'Phi-3 FREE',
    'mistralai/mistral-7b-instruct:free': 'Mistral FREE'
  }
  aiModel.value = modelNames[selectedModel.value] || 'FREE AI'
  console.log('🔄 FREE AI Model changed to:', aiModel.value)
}

const sendMessage = async () => {
  if (!currentMessage.value.trim() || isTyping.value) return
  
  const userMessage = {
    text: currentMessage.value,
    isUser: true,
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  }
  
  messages.value.push(userMessage)
  const messageText = currentMessage.value
  currentMessage.value = ''
  showQuickActions.value = false
  
  // Show AI thinking
  isTyping.value = true
  aiStatus.value = 'FREE AI sedang berpikir...'
  
  try {
    console.log('🆓 Sending to FREE AI:', messageText)
    
    // Call OpenRouter with FREE model
    const aiResponse = await callFreeOpenRouterAPI(messageText)
    
    const botMessage = {
      text: aiResponse,
      isUser: false,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
    
    messages.value.push(botMessage)
    aiStatus.value = 'FREE AI Online & Ready'
    aiOnline.value = true
    console.log('✅ FREE AI response successful')
    
  } catch (error) {
    console.error('❌ FREE AI Error:', error.message)
    
    // Fallback to knowledge base
    const fallbackResponse = getSmartFallbackResponse(messageText.toLowerCase())
    
    const botMessage = {
      text: `${fallbackResponse}\n\n💡 *Respons dari knowledge base - FREE AI sedang tidak tersedia*`,
      isUser: false,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
    
    messages.value.push(botMessage)
    aiStatus.value = 'Local Knowledge Base'
    aiOnline.value = false
    aiModel.value = 'Smart Local AI'
  } finally {
    isTyping.value = false
    
    if (!isOpen.value) {
      hasUnreadMessages.value = true
      unreadCount.value++
    }
    
    scrollToBottom()
  }
}

const callFreeOpenRouterAPI = async (message) => {
  const messages = [
    {
      role: "system",
      content: LEGAL_CONTEXT.replace("User question: ", "")
    },
    {
      role: "user", 
      content: message
    }
  ]
  
  const requestBody = {
    model: selectedModel.value,
    messages: messages,
    max_tokens: AI_CONFIG.OPENROUTER.config.max_tokens, // Menggunakan config dari AI_CONFIG
    temperature: AI_CONFIG.OPENROUTER.config.temperature,
    top_p: AI_CONFIG.OPENROUTER.config.top_p,
    stream: AI_CONFIG.OPENROUTER.config.stream
  }
  
  console.log('📡 Calling FREE OpenRouter API...')
  console.log('🤖 Model:', selectedModel.value)
  console.log('📦 Request body:', requestBody)
  
  const response = await fetch(OPENROUTER_API.url, {
    method: 'POST',
    headers: OPENROUTER_API.headers,
    body: JSON.stringify(requestBody)
  })
  
  console.log('📡 Response status:', response.status)
  
  if (!response.ok) {
    const errorText = await response.text()
    console.error('API Error:', errorText)
    
    // Handle specific errors
    if (response.status === 401) {
      throw new Error(`🔑 API Key bermasalah! Silakan:\n1. Cek API key di file .env\n2. Buat API key baru di https://openrouter.ai/keys\n3. Pastikan account sudah diverifikasi`)
    } else if (response.status === 429) {
      throw new Error(`⏰ Rate limit exceeded! Tunggu beberapa menit sebelum mencoba lagi.`)
    } else if (response.status === 402) {
      throw new Error(`💳 Model tidak gratis! Pastikan menggunakan model dengan ":free" suffix.`)
    }
    
    throw new Error(`❌ OpenRouter Error ${response.status}: ${errorText}`)
  }
  
  const data = await response.json()
  console.log('📦 FREE AI Response data:', data)
  
  // Parse OpenRouter response
  let aiText = ''
  if (data.choices && data.choices[0] && data.choices[0].message) {
    aiText = data.choices[0].message.content
  } else {
    throw new Error('Invalid response format from FREE OpenRouter')
  }
  
  // Clean up response
  aiText = aiText
    .replace(/^(Answer|Response|Reply):\s*/i, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  
  if (!aiText || aiText.length < 5) {
    throw new Error('FREE AI response too short or empty')
  }
  
  console.log('✅ Parsed FREE AI response:', aiText)
  return aiText
}

const sendQuickMessage = (message) => {
  currentMessage.value = message
  sendMessage()
}

// Smart fallback for when AI is not available
const getSmartFallbackResponse = (message) => {
  const keywords = {
    greetings: ['halo', 'hai', 'hi', 'hello', 'selamat'],
    services: ['layanan', 'service', 'bantuan', 'jasa'],
    pricing: ['biaya', 'harga', 'tarif', 'cost', 'price', 'gratis'],
    booking: ['janji', 'temu', 'appointment', 'jadwal', 'booking'],
    criminal: ['pidana', 'criminal', 'pencurian', 'narkoba', 'korupsi'],
    civil: ['perdata', 'civil', 'kontrak', 'sengketa', 'ganti rugi'],
    family: ['keluarga', 'family', 'cerai', 'divorce', 'anak', 'warisan'],
    emergency: ['darurat', 'emergency', 'urgent', 'segera']
  }
  
  const responses = {
    greetings: 'Halo! Selamat datang di Anas Law! 👋 Saya FREE AI assistant yang siap membantu dengan pertanyaan hukum Anda. Ada yang bisa dibantu? 💼🆓',
    
    services: 'Anas Law melayani berbagai bidang hukum:\n• Hukum Pidana 🚔\n• Hukum Perdata 📄\n• Hukum Keluarga 👨‍👩‍👧‍👦\n• Hukum Bisnis 🏢\n\nKonsultasi pertama GRATIS 30 menit! 🆓',
    
    pricing: 'Biaya layanan Anas Law:\n• Konsultasi awal: GRATIS 30 menit! 🆓\n• Konsultasi lanjutan: Rp 500.000/jam ⏰\n• Penanganan kasus: Sesuai kompleksitas\n\nManfaatkan konsultasi gratis untuk evaluasi! 🎯',
    
    booking: 'Cara booking konsultasi:\n1. Klik "Book Consultation" 🌐\n2. Pilih waktu tersedia 📅\n3. Isi form detail kasus 📝\n4. Konfirmasi via WhatsApp 💬\n\nJam operasional: Senin-Jumat 09:00-17:00',
    
    criminal: 'Layanan Hukum Pidana:\n• Tindak pidana umum 🚔\n• Kasus narkoba 💊\n• Korupsi & penipuan 💰\n• KDRT & kekerasan ⚠️\n\nTim berpengalaman 15+ tahun siap membantu!',
    
    civil: 'Hukum Perdata yang kami tangani:\n• Sengketa kontrak 📄\n• Masalah properti 🏠\n• Wanprestasi & ganti rugi 💸\n• Mediasi sengketa 🤝\n\nKonsultasi gratis untuk evaluasi awal!',
    
    family: 'Layanan Hukum Keluarga:\n• Konsultasi pernikahan 💒\n• Mediasi perceraian 💔\n• Hak asuh anak 👶\n• Pembagian harta 💰\n• Warisan & hibah 📋\n\nPendampingan sensitif & confidential 🔒',
    
    emergency: '🚨 LAYANAN DARURAT 24/7 🚨\n\n📞 Hotline: +62 8xx-xxxx-xxxx\n📧 Emergency: emergency@anaslaw.com\n💬 WhatsApp tersedia\n\n⚡ Response time: < 30 menit'
  }
  
  // Check for keyword matches
  for (const [category, keywordList] of Object.entries(keywords)) {
    if (keywordList.some(keyword => message.includes(keyword))) {
      return responses[category] || responses.default
    }
  }
  
  // Default response
  return 'Terima kasih atas pertanyaan Anda! 🤔 Untuk informasi yang lebih akurat dan sesuai kasus spesifik Anda, saya sarankan konsultasi langsung dengan tim lawyer berpengalaman kami.\n\nKonsultasi pertama GRATIS 30 menit! 📞🆓'
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// Test FREE AI connectivity on mount
onMounted(async () => {
  console.log('🎯 FREE ChatBot component mounted!')
  console.log('🚀 Testing FREE OpenRouter AI connectivity...')
  
  // Initialize AI model name
  updateAiModel()
  
  try {
    // Test dengan pesan sederhana
    await callFreeOpenRouterAPI('Hello, are you working?')
    aiOnline.value = true
    aiStatus.value = 'FREE AI Online & Ready'
    console.log('✅ FREE OpenRouter AI connection successful!')
  } catch (error) {
    console.log('⚠️ FREE AI offline, using local mode:', error.message)
    aiOnline.value = false
    aiStatus.value = 'Local Knowledge Base'
    aiModel.value = 'Smart Local AI'
  }
  
  // Show welcome notification after delay
  setTimeout(() => {
    if (!isOpen.value && messages.value.length === 0) {
      hasUnreadMessages.value = true
      unreadCount.value = 1
    }
  }, 5000)
})
</script>

<style scoped>
/* Custom animations */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
