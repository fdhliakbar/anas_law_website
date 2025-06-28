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
        <div class="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 flex justify-between items-center flex-shrink-0">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12.37,6.16a1,1,0,0,0-1.23.79l-1.48,6.07a1,1,0,0,0,.6,1.13,1,1,0,0,0,1.13-.6l1.48-6.07A1,1,0,0,0,12.37,6.16Z"/><path d="M19.14,4.24,12,1.06,4.86,4.24A2,2,0,0,0,3.5,6.15V11a9.17,9.17,0,0,0,8,9,1,1,0,0,0,.15,0,1,1,0,0,0,.15,0,9.17,9.17,0,0,0,8-9V6.15A2,2,0,0,0,19.14,4.24ZM12,18.5a7.17,7.17,0,0,1-6-7.5V6.8l6-2.9,6,2.9V11A7.17,7.17,0,0,1,12,18.5Z"/></svg>
            </div>
            <div>
              <h3 class="font-bold text-lg">Anas Law</h3>
              <p class="text-green-100 text-sm flex items-center">
                <span class="w-2.5 h-2.5 bg-green-300 rounded-full mr-2"></span>
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
            <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
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
              <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                AL
              </div>
              <div class="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border">
                <div class="text-gray-800 text-sm leading-relaxed whitespace-pre-line">{{ message.text }}</div>
                <div class="text-xs text-gray-500 mt-2">{{ message.time }}</div>
              </div>
            </div>
            <div v-else class="max-w-sm">
              <div class="bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-2xl rounded-tr-md p-4 shadow-sm">
                <div class="text-sm leading-relaxed">{{ message.text }}</div>
                <div class="text-xs text-green-100 mt-2">{{ message.time }}</div>
              </div>
            </div>
          </div>
          
          <!-- Indikator Mengetik -->
          <div v-if="isTyping" class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
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
            <button @click="sendQuickMessage('Saya ingin konsultasi gratis')" class="px-3 py-2 bg-green-50 text-green-800 rounded-lg text-xs hover:bg-green-100 transition-colors font-medium border border-green-200">
              📞 Konsultasi Gratis
            </button>
            <button @click="sendQuickMessage('Apa saja layanan hukum yang tersedia?')" class="px-3 py-2 bg-blue-50 text-blue-800 rounded-lg text-xs hover:bg-blue-100 transition-colors font-medium border border-blue-200">
              ⚖️ Layanan Hukum
            </button>
            <button @click="sendQuickMessage('Berapa biaya konsultasi?')" class="px-3 py-2 bg-teal-50 text-teal-800 rounded-lg text-xs hover:bg-teal-100 transition-colors font-medium border border-teal-200">
              💰 Biaya
            </button>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="flex-1 relative">
              <input v-model="currentMessage" @keyup.enter="sendMessage" type="text" placeholder="Ketik pertanyaan Anda..." class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm" :disabled="isTyping">
            </div>
            <button @click="sendMessage" :disabled="!currentMessage.trim() || isTyping" class="w-12 h-12 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-xl flex items-center justify-center transition-colors">
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
          class="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
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
        
        <div class="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white" :class="hasApiKey ? 'bg-green-500' : 'bg-red-500'"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

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
    const token = import.meta.env.VITE_OPENROUTER_API_KEY
    return !!(token && 
              token !== 'your_openrouter_api_key_here' && 
              token.startsWith('sk-or-v1-') && 
              token.length > 30)
  } catch (error) {
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

// Proses pesan (AI atau fallback)
const processMessage = async (message) => {
  isTyping.value = true
  
  try {
    let response
    
    if (hasApiKey.value) {
      // Try AI response
      response = await getAIResponse(message)
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
      addMessage('Maaf, saya sedang mengalami kendala teknis. Silakan hubungi kami langsung di +62 8xx-xxxx-xxxx untuk bantuan segera.', false)
      isTyping.value = false
    }, 1000)
  }
}

// Panggil AI
const getAIResponse = async (message) => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://anaslaw.com',
        'X-Title': 'Anas Law Customer Service'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [
          {
            role: 'system',
            content: `Anda adalah customer service profesional dari Anas Law, firma hukum terpercaya di Indonesia. Berikan jawaban yang profesional, informatif, dan membantu. Fokus pada:

- Layanan hukum: Pidana, Perdata, Keluarga, Bisnis
- Konsultasi gratis 30 menit untuk klien baru
- Biaya konsultasi: Rp 500.000/jam setelah sesi gratis
- Jam operasional: Senin-Jumat 09:00-17:00
- Kontak: WhatsApp dan telepon tersedia

Jawab dengan ramah, professional, dan jangan sebutkan bahwa Anda adalah AI.`
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
      return data.choices[0]?.message?.content || generateSmartResponse(message)
    } else {
      throw new Error('AI service unavailable')
    }
  } catch (error) {
    return generateSmartResponse(message)
  }
}

// Respons fallback
const generateSmartResponse = (message) => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('konsultasi') || lowerMessage.includes('gratis')) {
    return `Terima kasih atas minat Anda! 

Kami menyediakan konsultasi gratis 30 menit untuk klien baru. Konsultasi ini mencakup:

• Evaluasi awal kasus Anda
• Penjelasan opsi hukum yang tersedia  
• Estimasi biaya penanganan
• Strategi terbaik untuk kasus Anda

Untuk booking konsultasi gratis, silakan hubungi:
📞 +62 8xx-xxxx-xxxx
💬 WhatsApp tersedia
⏰ Senin-Jumat: 09:00-17:00

Apakah ada yang ingin Anda tanyakan tentang layanan kami?`
  }
  
  if (lowerMessage.includes('layanan') || lowerMessage.includes('hukum')) {
    return `Anas Law menyediakan layanan hukum lengkap:

🚔 **Hukum Pidana**
Pembelaan kasus kriminal, narkoba, korupsi, KDRT

📄 **Hukum Perdata** Sengketa kontrak, properti, wanprestasi, ganti rugi

👨‍👩‍👧‍👦 **Hukum Keluarga**
Perceraian, hak asuh anak, pembagian harta, warisan

🏢 **Hukum Bisnis**
Pendirian PT, kontrak bisnis, merger & akuisisi

Dengan pengalaman 15+ tahun, kami siap membantu kasus Anda. Mau konsultasi gratis dulu?`
  }
  
  if (lowerMessage.includes('biaya') || lowerMessage.includes('tarif') || lowerMessage.includes('harga')) {
    return `Struktur biaya Anas Law transparan dan kompetitif:

🆓 **Konsultasi Awal: GRATIS 30 menit**
• Evaluasi kasus
• Penjelasan opsi hukum
• Estimasi biaya

💼 **Konsultasi Lanjutan: Rp 500.000/jam**
• Konsultasi mendalam
• Persiapan dokumen
• Strategi hukum

⚖️ **Penanganan Kasus**
Biaya disesuaikan dengan kompleksitas kasus. Estimasi akan diberikan setelah evaluasi awal.

📋 **Layanan Dokumen**
Mulai dari Rp 250.000 untuk dokumen standar.

Ingin memanfaatkan konsultasi gratis dulu?`
  }
  
  if (lowerMessage.includes('booking') || lowerMessage.includes('janji') || lowerMessage.includes('appointment')) {
    return `Mudah booking konsultasi dengan Anas Law:

📱 **Online Booking**
1. Klik tombol "Book Consultation" di website
2. Pilih tanggal & waktu yang tersedia
3. Isi form detail kasus
4. Konfirmasi via WhatsApp

📞 **Telepon Langsung**
+62 8xx-xxxx-xxxx (jam operasional)

💬 **WhatsApp**
Tersedia 24/7 untuk booking dan pertanyaan

⏰ **Jadwal Tersedia**
• Senin-Jumat: 09:00-17:00
• Sabtu: 09:00-13:00 (khusus appointment)

Mau saya bantu booking sekarang?`
  }
  
  if (lowerMessage.includes('kontak') || lowerMessage.includes('alamat') || lowerMessage.includes('lokasi')) {
    return `Kontak Anas Law:

📍 **Alamat Kantor**
[Alamat lengkap kantor Anas Law]
Jakarta, Indonesia

📞 **Telepon**
+62 8xx-xxxx-xxxx

💬 **WhatsApp**
+62 8xx-xxxx-xxxx (24/7)

📧 **Email**
info@anaslaw.com

🌐 **Website**
www.anaslaw.com

⏰ **Jam Operasional**
Senin-Jumat: 09:00-17:00
Sabtu: 09:00-13:00 (appointment only)

Ada yang bisa kami bantu hari ini?`
  }
  
  // Default professional response
  return `Terima kasih atas pertanyaan Anda.

Untuk memberikan jawaban yang tepat dan sesuai dengan kebutuhan hukum Anda, saya merekomendasikan untuk konsultasi langsung dengan tim lawyer kami.

🆓 **Konsultasi gratis 30 menit tersedia!**

Silakan hubungi:
📞 +62 8xx-xxxx-xxxx  
💬 WhatsApp: tersedia 24/7
🌐 Website: anaslaw.com

Tim kami siap membantu dengan pertanyaan hukum Anda secara professional dan confidential.

Ada yang bisa saya bantu lagi?`
}

// Lifecycle
console.log('🏛️ Anas Law Customer Service loaded!')
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
