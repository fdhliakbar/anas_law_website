<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="border-b border-gray-200 bg-white px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <button @click="goBack" class="text-gray-600 hover:text-black transition mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 class="font-bold text-2xl text-black">Legal Chat Support</h1>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <span class="text-sm text-gray-600">{{ userCount }} users online</span>
        </div>
      </div>
    </header>

    <!-- Chat Container -->
    <div class="flex flex-col h-screen">
      <!-- Welcome Section -->
      <div class="bg-gray-50 border-b border-gray-200 p-6">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="font-bold text-3xl text-black mb-4">Get Instant Legal Help</h2>
          <p class="text-lg text-gray-600">
            Connect with our legal experts for immediate assistance with your legal questions
          </p>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="flex-1 overflow-hidden">
        <div class="h-full flex flex-col max-w-4xl mx-auto">
          <div class="flex-1 overflow-y-auto p-6" ref="messageContainer">
            <div class="space-y-4">
              <!-- Welcome Message -->
              <div class="flex justify-start">
                <div class="max-w-xs lg:max-w-md">
                  <div class="bg-gray-100 rounded-2xl px-4 py-3">
                    <p class="text-gray-800">
                      👋 Welcome to Anas Law Chat Support! How can we help you with your legal needs today?
                    </p>
                  </div>
                  <p class="text-xs text-gray-500 mt-1 pl-3">Legal Assistant</p>
                </div>
              </div>

              <!-- Chat Messages -->
              <div
                v-for="(msg, index) in messages"
                :key="index"
                :class="['flex', msg.sender === 'You' ? 'justify-end' : 'justify-start']"
              >
                <div class="max-w-xs lg:max-w-md">
                  <div
                    :class="[
                      'rounded-2xl px-4 py-3',
                      msg.sender === 'You'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-800'
                    ]"
                  >
                    <p>{{ msg.text }}</p>
                  </div>
                  <p class="text-xs text-gray-500 mt-1 pl-3">
                    {{ msg.sender === 'You' ? 'You' : msg.sender }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Input -->
          <div class="border-t border-gray-200 p-6 bg-white">
            <div class="flex items-center space-x-4">
              <div class="flex-1">
                <input
                  v-model="messageText"
                  @keyup.enter="sendMessage"
                  placeholder="Type your legal question here..."
                  class="w-full border-2 border-gray-300 rounded-full px-6 py-3 text-lg focus:outline-none focus:border-black transition"
                />
              </div>
              <button
                @click="sendMessage"
                :disabled="!messageText.trim()"
                class="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-gray-50 border-t border-gray-200 p-6">
      <div class="max-w-4xl mx-auto">
        <h3 class="font-bold text-lg text-black mb-4">Common Legal Questions</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            @click="sendQuickMessage('I need help with a contract review')"
            class="text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-black transition"
          >
            <div class="font-medium text-black">Contract Review</div>
            <div class="text-sm text-gray-600">Need help reviewing a legal document</div>
          </button>
          <button
            @click="sendQuickMessage('I want to schedule a consultation')"
            class="text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-black transition"
          >
            <div class="font-medium text-black">Schedule Consultation</div>
            <div class="text-sm text-gray-600">Book a meeting with our attorneys</div>
          </button>
          <button
            @click="sendQuickMessage('I have a legal emergency')"
            class="text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-black transition"
          >
            <div class="font-medium text-black">Legal Emergency</div>
            <div class="text-sm text-gray-600">Urgent legal assistance needed</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { io } from 'socket.io-client'

const router = useRouter()

// Socket connection
const socket = io('http://localhost:3000')

const messages = ref([])
const messageText = ref('')
const userCount = ref(0)
const messageContainer = ref(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}

const sendMessage = () => {
  if (messageText.value.trim()) {
    const message = {
      sender: 'You',
      text: messageText.value,
      timestamp: new Date()
    }
    
    messages.value.push(message)
    socket.emit('message', message)
    messageText.value = ''
    scrollToBottom()
  }
}

const sendQuickMessage = (text) => {
  messageText.value = text
  sendMessage()
}

const goBack = () => {
  router.go(-1)
}

// Socket event listeners
onMounted(() => {
  socket.on('message', (msg) => {
    if (msg.sender !== 'You') {
      messages.value.push(msg)
      scrollToBottom()
    }
  })

  socket.on('user-count', (count) => {
    userCount.value = count
  })

  socket.on('connect', () => {
    console.log('Connected to chat server')
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from chat server')
  })
})
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
