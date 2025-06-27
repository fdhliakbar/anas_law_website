// Test OpenRouter API Key dengan model GRATIS
const API_KEY = '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'

async function testOpenRouterAPI() {
  console.log('🧪 Testing OpenRouter API dengan model GRATIS...')
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://anaslaw.com',
        'X-Title': 'Anas Law AI Assistant'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free', // Model GRATIS
        messages: [
          {
            role: 'user',
            content: 'Hello, this is a test message. Please respond briefly in Indonesian.'
          }
        ],
        max_tokens: 100,
        temperature: 0.7,
        top_p: 0.9,
        stream: false
      })
    })
    
    console.log('📊 Status:', response.status)
    console.log('📊 Status Text:', response.statusText)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error Response:', errorText)
      
      // Specific error handling
      if (response.status === 401) {
        console.error('🔑 MASALAH AUTENTIKASI:')
        console.error('- API Key mungkin invalid atau expired')
        console.error('- Account OpenRouter belum diverifikasi')
        console.error('- Perlu membuat API key baru di https://openrouter.ai/')
      } else if (response.status === 429) {
        console.error('⏰ RATE LIMIT EXCEEDED:')
        console.error('- Terlalu banyak request dalam waktu singkat')
        console.error('- Tunggu beberapa menit sebelum mencoba lagi')
      } else if (response.status === 402) {
        console.error('💳 PAYMENT REQUIRED:')
        console.error('- Model ini mungkin tidak gratis')
        console.error('- Coba model lain dengan ":free" suffix')
      }
      return
    }
    
    const data = await response.json()
    console.log('✅ SUCCESS! Response:', data)
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      console.log('🤖 AI Response:', data.choices[0].message.content)
      console.log('📈 Usage:', data.usage)
    }
    
  } catch (error) {
    console.error('🚨 Network Error:', error.message)
  }
}

testOpenRouterAPI()
