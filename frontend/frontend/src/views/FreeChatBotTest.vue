<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          🆓 100% FREE AI ChatBot Test
        </h1>
        <p class="text-lg text-gray-600 mb-6">
          Testing FREE AI models from OpenRouter - Zero cost, unlimited potential!
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="font-bold text-green-600 mb-2">🦙 Llama 3.1</h3>
            <p class="text-sm text-gray-600">Meta's open-source model</p>
            <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">FREE</span>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="font-bold text-blue-600 mb-2">🐉 Qwen 2</h3>
            <p class="text-sm text-gray-600">Alibaba's advanced model</p>
            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">FREE</span>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="font-bold text-purple-600 mb-2">💎 Gemma 2</h3>
            <p class="text-sm text-gray-600">Google's efficient model</p>
            <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">FREE</span>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold mb-4">🔥 Test Questions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            @click="testQuestion('Jelaskan perbedaan hukum pidana dan perdata')"
            class="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg text-left hover:shadow-md transition"
          >
            <h3 class="font-semibold text-gray-800">🧠 Legal Question</h3>
            <p class="text-sm text-gray-600">Test legal knowledge</p>
          </button>
          
          <button 
            @click="testQuestion('Apa itu kontrak kerja?')"
            class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg text-left hover:shadow-md transition"
          >
            <h3 class="font-semibold text-gray-800">📄 Contract Law</h3>
            <p class="text-sm text-gray-600">Employment contracts</p>
          </button>
          
          <button 
            @click="testQuestion('Bagaimana proses cerai di Indonesia?')"
            class="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg text-left hover:shadow-md transition"
          >
            <h3 class="font-semibold text-gray-800">👨‍👩‍👧‍👦 Family Law</h3>
            <p class="text-sm text-gray-600">Divorce proceedings</p>
          </button>
          
          <button 
            @click="testQuestion('Berapa biaya layanan Anas Law?')"
            class="p-4 bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200 rounded-lg text-left hover:shadow-md transition"
          >
            <h3 class="font-semibold text-gray-800">💰 Pricing Info</h3>
            <p class="text-sm text-gray-600">Service costs</p>
          </button>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold mb-4">📊 API Status</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-semibold mb-2">Connection Status</h3>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span class="text-green-600">OpenRouter Connected</span>
            </div>
          </div>
          
          <div>
            <h3 class="font-semibold mb-2">Available Models</h3>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>✅ meta-llama/llama-3.1-8b-instruct:free</li>
              <li>✅ qwen/qwen-2-7b-instruct:free</li>
              <li>✅ google/gemma-2-9b-it:free</li>
              <li>✅ microsoft/phi-3-mini-128k-instruct:free</li>
              <li>✅ mistralai/mistral-7b-instruct:free</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-8">
        <p class="text-gray-600 mb-4">
          Cari tombol chat dengan badge "FREE" di kanan bawah! 👇
        </p>
        <div class="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
          <span class="text-green-800">🆓 Chat dengan FREE AI sekarang!</span>
        </div>
      </div>
    </div>
    
    <!-- FREE ChatBot Component -->
    <FreeChatBot />
  </div>
</template>

<script setup>
import FreeChatBot from '@/components/FreeChatBot.vue'

const testQuestion = (question) => {
  // This would ideally trigger the chatbot to open with the question
  console.log('Test question:', question)
  alert(`Test question: "${question}"\n\nCoba klik tombol FREE ChatBot di kanan bawah dan ketik pertanyaan ini!`)
}
</script>
