<template>
  <div class="chat-container">
    <div class="chat-box">
      <div class="chat-header">
        <h2>Live Chat</h2>
        <span class="user-count">Users Online: {{ userCount }}</span>
      </div>

      <div class="chat-messages" ref="messageContainer">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.sender === 'You' ? 'me' : 'friend']"
        >
          <span class="sender">{{ msg.sender }}</span>
          <span class="text">{{ msg.text }}</span>
        </div>
      </div>

      <div class="chat-input">
        <input
          v-model="messageText"
          @keyup.enter="sendMessage"
          placeholder="Type a message..."
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { io } from 'socket.io-client'

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

onMounted(() => {
  socket.on('connect', () => {
    console.log('Connected to server')
  })

  socket.on('userCount', (count) => {
    userCount.value = count
  })

  socket.on('receiveMessage', (msg) => {
    messages.value.push({ sender: 'Friend', text: msg })
    scrollToBottom()
  })
})

const sendMessage = () => {
  if (messageText.value.trim() !== '') {
    messages.value.push({ sender: 'You', text: messageText.value })
    socket.emit('sendMessage', messageText.value)
    messageText.value = ''
    scrollToBottom()
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.chat-box {
  width: 400px;
  height: 90vh; /* Container chat tinggi 90% viewport */
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-shrink: 0; /* supaya header tidak mengecil */
}

.user-count {
  font-size: 14px;
  color: #555;
}

.chat-messages {
  flex-grow: 1; /* agar pesan memenuhi ruang sisa */
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  background: #f9f9f9;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.message {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  max-width: 75%;
  word-wrap: break-word;
}

.message.friend {
  align-self: flex-start; /* kiri */
  background: #e0f7fa;
  border-radius: 12px 12px 12px 0;
  padding: 8px 12px;
  text-align: left;
}

.message.me {
  align-self: flex-end; /* kanan */
  background: #c8e6c9;
  border-radius: 12px 12px 0 12px;
  padding: 8px 12px;
  text-align: right;
}

.sender {
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 2px;
  color: #333;
}

.text {
  font-size: 14px;
}

.chat-input {
  display: flex;
  gap: 10px;
  flex-shrink: 0; /* supaya input tidak mengecil */
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.chat-input button {
  padding: 10px 20px;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.chat-input button:hover {
  background-color: #1565c0;
}
</style>
