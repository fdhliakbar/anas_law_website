// Free AI API Configuration
// Ganti dengan API keys yang sebenarnya

export const AI_CONFIG = {
  // Hugging Face (Free tier: 30,000 requests/month)
  // Sign up at: https://huggingface.co/join
  HUGGING_FACE: {
    token: import.meta.env.VITE_HUGGING_FACE_TOKEN, // Token yang valid
    models: {
      chat: 'microsoft/DialoGPT-medium',
      legal: 'microsoft/DialoGPT-large',
      instruct: 'google/flan-t5-base'
    }
  },
  
  // Cohere (Free tier: 100 API calls/minute)
  // Sign up at: https://cohere.ai/
  COHERE: {
    token: 'your-cohere-api-key-here', // Ganti dengan token asli
    model: 'command-light' // Free model
  },
  
  // OpenAI (Tidak gratis, tapi disediakan untuk referensi)
  OPENAI: {
    token: 'your-openai-api-key', // Membutuhkan pembayaran
    model: 'gpt-3.5-turbo'
  },
  
  // AI21 (Free tier tersedia)
  // Sign up at: https://studio.ai21.com/
  AI21: {
    token: 'your-ai21-api-key',
    model: 'j2-light'
  },

  // OpenRouter (Multiple AI models access)
  // FREE MODELS ONLY - Zero cost AI models
  OPENROUTER: {
    token: import.meta.env.VITE_OPENROUTER_API_KEY,
    baseUrl: 'https://openrouter.ai/api/v1',
    models: {
      // 100% FREE MODELS
      llama_free: 'meta-llama/llama-3.1-8b-instruct:free',
      qwen_free: 'qwen/qwen-2-7b-instruct:free', 
      gemma_free: 'google/gemma-2-9b-it:free',
      phi_free: 'microsoft/phi-3-mini-128k-instruct:free',
      mistral_free: 'mistralai/mistral-7b-instruct:free',
      default: 'meta-llama/llama-3.1-8b-instruct:free'
    }
  }
}

// Petunjuk mendapatkan API Keys GRATIS:

/* 
1. HUGGING FACE (RECOMMENDED - GRATIS):
   - Daftar di https://huggingface.co/join
   - Pergi ke Settings > Access Tokens
   - Create New Token
   - Copy token dan ganti di HUGGING_FACE.token

2. COHERE (GRATIS dengan limit):
   - Daftar di https://cohere.ai/
   - Pergi ke Dashboard > API Keys
   - Generate API Key
   - Copy dan ganti di COHERE.token

3. OPENROUTER (MULTIPLE AI MODELS):
   - Daftar di https://openrouter.ai/
   - Pergi ke Keys > Create Key  
   - Akses ke GPT, Claude, Llama dan model lainnya
   - Pay-per-use pricing yang sangat terjangkau
   - Sudah dikonfigurasi dengan token yang valid

4. AI21 (Free tier):
   - Daftar di https://studio.ai21.com/
   - Dapatkan API key dari dashboard
   - Copy dan ganti di AI21.token

5. Untuk produksi, simpan keys ini di environment variables:
   - VITE_HUGGING_FACE_TOKEN
   - VITE_COHERE_TOKEN
   - VITE_AI21_TOKEN
   - VITE_OPENROUTER_TOKEN
*/

export default AI_CONFIG
