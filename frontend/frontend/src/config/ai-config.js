// OpenRouter API Configuration - FREE MODELS ONLY
// SECURE: Menggunakan environment variables untuk kredensial

export const AI_CONFIG = {
  // OpenRouter (Multiple AI models access) - 100% FREE MODELS
  OPENROUTER: {
    // SECURE: Token dibaca dari environment variable
    token: import.meta.env.VITE_OPENROUTER_API_KEY,
    baseUrl: 'https://openrouter.ai/api/v1',
    
    // Validasi token
    isValid() {
      const token = this.token
      return !!(token && 
               token !== 'your_openrouter_api_key_here' && 
               token.startsWith('sk-or-v1-') && 
               token.length > 30)
    },
    
    // Models gratis yang tersedia
    models: {
      // 100% FREE MODELS - Tidak ada biaya sama sekali
      llama_free: 'meta-llama/llama-3.1-8b-instruct:free',
      qwen_free: 'qwen/qwen-2-7b-instruct:free', 
      gemma_free: 'google/gemma-2-9b-it:free',
      phi_free: 'microsoft/phi-3-mini-128k-instruct:free',
      mistral_free: 'mistralai/mistral-7b-instruct:free',
      // Default model yang akan digunakan
      default: 'meta-llama/llama-3.1-8b-instruct:free'
    },
    
    // Konfigurasi untuk model gratis
    config: {
      max_tokens: 150, // Dibatasi untuk model gratis
      temperature: 0.7,
      top_p: 0.9,
      stream: false
    }
  }
}

/*
🔒 KEAMANAN API KEY:
❌ JANGAN pernah hardcode API key di kode
✅ GUNAKAN environment variables (.env file)
✅ PASTIKAN .env ada di .gitignore
✅ GUNAKAN .env.example sebagai template

📋 SETUP INSTRUCTIONS:
1. Copy .env.example menjadi .env
2. Daftar di https://openrouter.ai/
3. Verifikasi email Anda
4. Masuk ke dashboard dan buat API key
5. Copy API key ke file .env
6. Restart development server

MODEL GRATIS YANG TERSEDIA:
- meta-llama/llama-3.1-8b-instruct:free (Recommended)
- qwen/qwen-2-7b-instruct:free
- google/gemma-2-9b-it:free
- microsoft/phi-3-mini-128k-instruct:free
- mistralai/mistral-7b-instruct:free

⚠️ RATE LIMITS:
- Model gratis memiliki batasan request per menit
- Biasanya 10-20 request per menit per model
- Tidak ada biaya finansial
*/

export default AI_CONFIG
