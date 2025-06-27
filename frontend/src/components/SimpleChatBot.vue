<template>
  <!-- Simple Chat Button Test -->
  <div class="fixed bottom-6 right-6 z-[9999]">
    <button
      @click="toggleChat"
      class="w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl animate-bounce"
    >
      💬
    </button>
    
    <!-- Simple Chat Window -->
    <div v-if="isOpen" class="mb-4 w-80 h-96 bg-white rounded-lg shadow-xl border">
      <div class="bg-blue-600 text-white p-4 rounded-t-lg">
        <h3>Test ChatBot</h3>
      </div>
      <div class="p-4">
        <p>ChatBot berhasil di load! 🎉</p>
        <p>API Key tersedia: {{ hasApiKey ? '✅' : '❌' }}</p>
        <button @click="testAPI" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Test API
        </button>
        <div v-if="apiResponse" class="mt-2 p-2 bg-gray-100 rounded text-sm">
          {{ apiResponse }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isOpen = ref(false)
const apiResponse = ref('')

// Check if AI config is available
const hasApiKey = computed(() => {
  try {
    const AI_CONFIG = {
      OPENROUTER: {
        token: import.meta.env.VITE_OPENROUTER_API_KEY || 'YOUR_OPENROUTER_API_KEY_HERE'
      }
    }
    return !!AI_CONFIG.OPENROUTER.token && AI_CONFIG.OPENROUTER.token !== 'YOUR_OPENROUTER_API_KEY_HERE'
  } catch (error) {
    return false
  }
})

const toggleChat = () => {
  isOpen.value = !isOpen.value
  console.log('🎯 Simple ChatBot clicked! Open:', isOpen.value)
}

const testAPI = async () => {
  try {
    apiResponse.value = 'Testing API...'
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://anaslaw.com',
        'X-Title': 'Anas Law AI Assistant'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'user', content: 'Hi, just testing. Respond with "API works!"' }
        ],
        max_tokens: 50
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      apiResponse.value = `✅ Success: ${data.choices[0].message.content}`
    } else {
      apiResponse.value = `❌ Error: ${response.status}`
    }
  } catch (error) {
    apiResponse.value = `❌ Error: ${error.message}`
  }
}

console.log('🚀 Simple ChatBot component loaded!')
</script>
