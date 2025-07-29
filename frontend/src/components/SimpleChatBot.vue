<template>
  <!-- Kontainer utama. HANYA untuk positioning. BUKAN flex container. -->
  <div class="fixed bottom-6 right-6 z-[9999]">
    
    <!-- Jendela Chat Profesional -->
    <!-- Dibungkus dengan <transition> dan diposisikan absolut di atas tombol. -->
    <transition name="chat-window-fade">
      <div 
        v-if="isOpen" 
        class="absolute right-0 bottom-20 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
        style="background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);"
      >
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 flex justify-between items-center flex-shrink-0">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12.37,6.16a1,1,0,0,0-1.23.79l-1.48,6.07a1,1,0,0,0,.6,1.13,1,1,0,0,0,1.13-.6l1.48-6.07A1,1,0,0,0,12.37,6.16Z"/><path d="M19.14,4.24,12,1.06,4.86,4.24A2,2,0,0,0,3.5,6.15V11a9.17,9.17,0,0,0,8,9,1,1,0,0,0,.15,0,1,1,0,0,0,.15,0,9.17,9.17,0,0,0,8-9V6.15A2,2,0,0,0,19.14,4.24ZM12,18.5a7.17,7.17,0,0,1-6-7.5V6.8l6-2.9,6,2.9V11A7.17,7.17,0,0,1,12,18.5Z"/></svg>
            </div>
            <div>
              <h3 class="font-bold text-lg">Anas Law</h3>
              <p class="text-blue-100 text-sm flex items-center">
                <span class="w-2.5 h-2.5 bg-blue-300 rounded-full mr-2"></span>
                Customer Service
              </p>
            </div>
          </div>
          <button @click="toggleChat" class="text-white/80 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Area Pesan -->
        <div class="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/30">
          <!-- Pesan Selamat Datang -->
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              AL
            </div>
            <div class="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border max-w-xs">
              <p class="text-gray-800 text-sm leading-relaxed">
                Selamat datang di <strong>Anas Law</strong>! 👋
                <br><br>
                Saya siap membantu menjawab pertanyaan hukum Anda dan memberikan informasi tentang layanan kami.
                <br><br>
                <em>Konsultasi awal 30 menit gratis!</em> 🆓
              </p>
              <div class="text-xs text-gray-500 mt-2">
                {{ new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }}
              </div>
            </div>
          </div>
          
          <!-- Pesan Dinamis -->
          <div v-for="(message, index) in chatMessages" :key="index" class="flex" :class="message.isUser ? 'justify-end' : 'justify-start'">
            <div v-if="!message.isUser" class="flex items-start space-x-3 max-w-sm">
              <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                AL
              </div>
              <div class="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border">
                <div class="text-gray-800 text-sm leading-relaxed whitespace-pre-line">{{ message.text }}</div>
                <div class="text-xs text-gray-500 mt-2">{{ message.time }}</div>
              </div>
            </div>
            <div v-else class="max-w-sm">
              <div class="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl rounded-tr-md p-4 shadow-sm">
                <div class="text-sm leading-relaxed">{{ message.text }}</div>
                <div class="text-xs text-blue-100 mt-2">{{ message.time }}</div>
              </div>
            </div>
          </div>
          
          <!-- Indikator Mengetik -->
          <div v-if="isTyping" class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              AL
            </div>
            <div class="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border max-w-xs">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Area Input -->
        <div class="p-4 bg-white border-t border-gray-200 flex-shrink-0">
          <div class="flex flex-wrap gap-2 mb-3">
            <button @click="sendQuickMessage('Saya ingin konsultasi gratis')" class="px-3 py-2 bg-blue-50 text-blue-800 rounded-lg text-xs hover:bg-blue-100 transition-colors font-medium border border-blue-200">
              📞 Konsultasi Gratis
            </button>
            <button @click="sendQuickMessage('Apa saja layanan hukum yang tersedia?')" class="px-3 py-2 bg-blue-50 text-blue-800 rounded-lg text-xs hover:bg-blue-100 transition-colors font-medium border border-blue-200">
              ⚖️ Layanan Hukum
            </button>
            <button @click="sendQuickMessage('Berapa biaya konsultasi?')" class="px-3 py-2 bg-cyan-50 text-cyan-800 rounded-lg text-xs hover:bg-cyan-100 transition-colors font-medium border border-cyan-200">
              💰 Biaya
            </button>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="flex-1 relative">
              <input v-model="currentMessage" @keyup.enter="sendMessage" type="text" placeholder="Ketik pertanyaan Anda..." class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" :disabled="isTyping">
            </div>
            <button @click="sendMessage" :disabled="!currentMessage.trim() || isTyping" class="w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl flex items-center justify-center transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
          
          <div class="text-center mt-3">
            <p class="text-xs text-gray-500">Powered by <strong>Anas Law</strong> • Customer Service</p>
          </div>
        </div>
      </div>
    </transition>

    <!-- Tombol Chat -->
    <!-- Diposisikan absolut di pojok, terisolasi dari jendela chat. -->
    <div class="absolute bottom-0 right-0">
      <div class="relative">
        <div v-if="hasUnreadMessages && !isOpen" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">
          {{ unreadCount }}
        </div>
        
        <button
          @click="toggleChat"
          class="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
          :class="{ 'animate-pulse': isTyping && !isOpen }"
        >
          <!-- Ikon berubah berdasarkan status `isOpen` -->
          <svg v-if="!isOpen" class="w-8 h-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
           <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
        
        <div class="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white" :class="hasApiKey ? 'bg-blue-500' : 'bg-sky-500'"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// State Management
const isOpen = ref(false)
const currentMessage = ref('')
const isTyping = ref(false)
const hasUnreadMessages = ref(false)
const unreadCount = ref(0)
const chatMessages = ref([])

// Cek ketersediaan API Key
const hasApiKey = computed(() => {
  try {
    const openrouterToken = import.meta.env.VITE_OPENROUTER_API_KEY
    const geminiToken = import.meta.env.VITE_GEMINI_API_KEY
    
    // More detailed validation
    const hasOpenRouter = !!(openrouterToken && 
                            openrouterToken !== 'your_openrouter_api_key_here' && 
                            openrouterToken.startsWith('sk-or-v1-') &&
                            openrouterToken.length > 50)
    
    const hasGemini = !!(geminiToken && 
                        geminiToken !== 'your_gemini_api_key_here' && 
                        geminiToken.startsWith('AIza') &&
                        geminiToken.length > 30)
    
    // Enhanced logging
    if (import.meta.env.DEV) {
      console.log('🔑 API Key Validation:')
      console.log('- OpenRouter Valid:', hasOpenRouter, openrouterToken ? `(${openrouterToken.length} chars)` : '(missing)')
      console.log('- Gemini Valid:', hasGemini, geminiToken ? `(${geminiToken.length} chars)` : '(missing)')
    }
    
    return hasOpenRouter || hasGemini
  } catch (error) {
    console.error('❌ Error checking API keys:', error)
    return false
  }
})

// Buka/tutup jendela chat
const toggleChat = () => {
  isOpen.value = !isOpen.value
  
  if (isOpen.value) {
    hasUnreadMessages.value = false
    unreadCount.value = 0
  }
}

// Tambah pesan ke chat
const addMessage = (text, isUser = false) => {
  const message = {
    text,
    isUser,
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  }
  chatMessages.value.push(message)
  
  // Auto scroll to bottom
  setTimeout(() => {
    const chatArea = document.querySelector('.overflow-y-auto')
    if (chatArea) {
      chatArea.scrollTop = chatArea.scrollHeight
    }
  }, 100)
}

// Kirim pesan
const sendMessage = async () => {
  if (!currentMessage.value.trim() || isTyping.value) return
  
  const message = currentMessage.value.trim()
  currentMessage.value = ''
  
  // Add user message
  addMessage(message, true)
  
  // Process response
  await processMessage(message)
}

// Kirim pesan cepat
const sendQuickMessage = async (message) => {
  if (isTyping.value) return
  
  // Add user message
  addMessage(message, true)
  
  // Process response
  await processMessage(message)
}

// Proses pesan dengan multiple AI providers
const processMessage = async (message) => {
  isTyping.value = true
  
  try {
    let response
    
    if (hasApiKey.value) {
      // Try AI response with fallback chain
      response = await getAIResponseWithFallback(message)
    } else {
      // Use smart fallback
      response = generateSmartResponse(message)
    }
    
    // Simulate typing delay for natural feel
    setTimeout(() => {
      addMessage(response, false)
      isTyping.value = false
      
      if (!isOpen.value) {
        hasUnreadMessages.value = true
        unreadCount.value++
      }
    }, 1500 + Math.random() * 1000) // Random delay 1.5-2.5s
    
  } catch (error) {
    setTimeout(() => {
      addMessage('Maaf, saya sedang mengalami kendala teknis. Silakan hubungi kami langsung di +62 813-9487-9411 untuk bantuan segera.', false)
      isTyping.value = false
    }, 1000)
  }
}

// AI Response dengan multiple providers (OpenRouter -> Gemini -> Fallback)
const getAIResponseWithFallback = async (message) => {
  console.log('🤖 Starting AI response chain for:', message.substring(0, 50) + '...')
  
  // Try OpenRouter first (if available)
  const openrouterKey = import.meta.env.VITE_OPENROUTER_API_KEY
  if (openrouterKey && 
      openrouterKey !== 'your_openrouter_api_key_here' &&
      openrouterKey.startsWith('sk-or-v1-')) {
    try {
      console.log('🔄 Attempting OpenRouter...')
      const response = await getOpenRouterResponse(message)
      if (response && response.trim()) {
        console.log('✅ OpenRouter success! Response length:', response.length)
        return response
      }
      console.log('⚠️ OpenRouter returned empty response')
    } catch (error) {
      console.log('❌ OpenRouter failed:', error.message)
      console.log('Full error:', error)
    }
  } else {
    console.log('⏭️ OpenRouter skipped (key not available)')
  }
  
  // Try Gemini as backup (if available)
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (geminiKey && 
      geminiKey !== 'your_gemini_api_key_here' &&
      geminiKey.length > 20) {
    try {
      console.log('🔄 Attempting Gemini...')
      const response = await getGeminiResponse(message)
      if (response && response.trim()) {
        console.log('✅ Gemini success! Response length:', response.length)
        return response
      }
      console.log('⚠️ Gemini returned empty response')
    } catch (error) {
      console.log('❌ Gemini failed:', error.message)
      console.log('Full error:', error)
    }
  } else {
    console.log('⏭️ Gemini skipped (key not available)')
  }
  
  // If all AI providers fail, use smart fallback
  console.log('🛡️ Using smart fallback response')
  return generateSmartResponse(message)
}

// OpenRouter API
const getOpenRouterResponse = async (message) => {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://anaslaw.com',
      'X-Title': 'Anas Law Customer Service'
    },
    body: JSON.stringify({
      model: 'google/gemma-2-9b-it:free',
      messages: [
        {
          role: 'system',
          content: `Anda adalah customer service profesional dari Anas Law, firma hukum terpercaya di Indonesia. 

PENTING: Jawab pertanyaan sesuai dengan konteks yang tepat. Jika ditanya tentang topik di luar layanan hukum, berikan jawaban yang benar lalu arahkan ke layanan kami.

Informasi Anas Law:
- Layanan hukum: Pidana, Perdata, Keluarga, Bisnis
- Konsultasi gratis 30 menit untuk klien baru
- Biaya konsultasi: Rp 500.000/jam setelah sesi gratis
- Jam operasional: Senin-Jumat 09:00-17:00
- Kontak: WhatsApp +62 813-9487-9411

Jawab dengan ramah, professional dalam bahasa Indonesia, maksimal 150 kata. Jangan sebutkan bahwa Anda adalah AI.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    })
  })
  
  if (response.ok) {
    const data = await response.json()
    return data.choices[0]?.message?.content
  }
  throw new Error(`OpenRouter API failed with status: ${response.status}`)
}

// Gemini API
const getGeminiResponse = async (message) => {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Anda adalah customer service profesional dari Anas Law, firma hukum terpercaya di Indonesia. 

PENTING: Jawab pertanyaan dengan benar dan akurat. Jika ditanya tentang hal di luar layanan hukum, berikan jawaban yang tepat terlebih dahulu, kemudian arahkan ke layanan kami.

Informasi Anas Law:
- Layanan: Hukum Pidana, Perdata, Keluarga, Bisnis
- Konsultasi gratis 30 menit untuk klien baru
- Biaya: Rp 500.000/jam setelah sesi gratis
- Jam operasional: Senin-Jumat 09:00-17:00
- Kontak: WhatsApp +62 813-9487-9411

Pertanyaan: ${message}

Instruksi: Jawab dengan akurat, ramah, professional dalam bahasa Indonesia, maksimal 150 kata. Jangan sebutkan bahwa Anda adalah AI.`
        }]
      }],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7
      }
    })
  })
  
  if (response.ok) {
    const data = await response.json()
    return data.candidates[0]?.content?.parts[0]?.text
  }
  throw new Error(`Gemini API failed with status: ${response.status}`)
}

// Smart fallback response generator
const generateSmartResponse = (message) => {
  const msg = message.toLowerCase()
  
  // General knowledge questions with accurate answers + redirect to services
  if (msg.includes('facebook') || msg.includes('zuckerberg')) {
    return 'Mark Zuckerberg adalah pendiri Facebook yang didirikan pada tahun 2004.\n\nApakah Anda memerlukan bantuan hukum terkait teknologi, media sosial, atau hak kekayaan intelektual? Kami menyediakan konsultasi gratis 30 menit!'
  }
  
  if (msg.includes('presiden pertama') || msg.includes('soekarno')) {
    return 'Ir. Soekarno adalah Presiden pertama Republik Indonesia (1945-1967).\n\nBtw, apakah Anda memerlukan bantuan hukum? Tim Anas Law siap membantu dengan konsultasi gratis 30 menit!'
  }
  
  // Legal-related responses
  if (msg.includes('gratis') || msg.includes('free') || msg.includes('konsultasi')) {
    return 'Ya! Kami menyediakan konsultasi gratis 30 menit untuk klien baru. Setelah itu Rp 500.000/jam. Hubungi kami di WhatsApp +62 813-9487-9411 untuk jadwalkan konsultasi Anda!'
  }
  
  if (msg.includes('biaya') || msg.includes('tarif') || msg.includes('harga')) {
    return 'Biaya konsultasi kami:\n\n• 30 menit pertama: GRATIS untuk klien baru\n• Selanjutnya: Rp 500.000/jam\n• Jam kerja: Senin-Jumat 09:00-17:00\n\nHubungi kami di +62 813-9487-9411!'
  }
  
  if (msg.includes('layanan') || msg.includes('service') || msg.includes('bantuan hukum')) {
    return 'Layanan hukum Anas Law:\n\n⚖️ Hukum Pidana\n📋 Hukum Perdata\n👨‍👩‍👧‍👦 Hukum Keluarga\n🏢 Hukum Bisnis\n\nKonsultasi gratis 30 menit! WhatsApp: +62 813-9487-9411'
  }
  
  if (msg.includes('jam') || msg.includes('buka') || msg.includes('operasional')) {
    return 'Jam operasional Anas Law:\n📅 Senin - Jumat: 09:00 - 17:00\n📞 Emergency konsultasi bisa via WhatsApp: +62 813-9487-9411\n\nSilakan hubungi kami!'
  }
  
  // Default professional response
  return 'Terima kasih atas pertanyaan Anda. Untuk mendapatkan jawaban yang lebih detail dan akurat, silakan hubungi tim legal kami:\n\n📞 WhatsApp: +62 813-9487-9411\n🆓 Konsultasi gratis 30 menit untuk klien baru\n⏰ Senin-Jumat 09:00-17:00\n\nTim Anas Law siap membantu!'
}

// Panggil AI (keep existing method name for compatibility)
const getAIResponse = getOpenRouterResponse

// Lifecycle and Debug
onMounted(() => {
  console.log('🏛️ Anas Law Customer Service loaded!')
  
  // Immediate environment check
  const openrouterToken = import.meta.env.VITE_OPENROUTER_API_KEY
  const geminiToken = import.meta.env.VITE_GEMINI_API_KEY
  const isDebugMode = import.meta.env.VITE_CHATBOT_DEBUG === 'true'
  
  console.log('🔍 Environment Status:')
  console.log('- Mode:', import.meta.env.MODE)
  console.log('- OpenRouter Available:', !!(openrouterToken && openrouterToken.startsWith('sk-or-v1-')))
  console.log('- Gemini Available:', !!(geminiToken && geminiToken.length > 20))
  console.log('- Debug Mode:', isDebugMode)
  console.log('- Has API Keys:', hasApiKey.value)
  
  // Test fetch capability
  console.log('🌐 Testing network connectivity...')
  fetch('https://httpbin.org/get')
    .then(response => response.json())
    .then(data => console.log('✅ Network OK:', data.origin))
    .catch(error => console.log('❌ Network Error:', error))
  
  console.log(`💡 Chatbot Status: ${hasApiKey.value ? '✅ AI Ready' : '⚠️ Using Fallback Only'}`)
})
</script>

<style scoped>
/* Transisi untuk Jendela Chat */
.chat-window-fade-enter-active,
.chat-window-fade-leave-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.chat-window-fade-enter-from,
.chat-window-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Scrollbar Kustom */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

</style>
