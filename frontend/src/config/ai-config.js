// OpenRouter API Configuration - FREE MODELS ONLY
// Menggunakan model AI gratis melalui OpenRouter

export const AI_CONFIG = {
  // OpenRouter (Multiple AI models access) - 100% FREE MODELS
  OPENROUTER: {
    token: import.meta.env.VITE_OPENROUTER_API_KEY,
    baseUrl: 'https://openrouter.ai/api/v1',
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
PENTING - CARA MENDAPATKAN API KEY GRATIS:
1. Daftar di https://openrouter.ai/
2. Verifikasi email Anda
3. Masuk ke dashboard dan buat API key
4. Copy API key ke file .env ini
5. Pastikan menggunakan model dengan ":free" di nama model
6. Model gratis memiliki rate limit tapi tidak ada biaya

MODEL GRATIS YANG TERSEDIA:
- meta-llama/llama-3.1-8b-instruct:free (Recommended)
- qwen/qwen-2-7b-instruct:free
- google/gemma-2-9b-it:free
- microsoft/phi-3-mini-128k-instruct:free
- mistralai/mistral-7b-instruct:free

RATE LIMITS:
- Model gratis memiliki batasan request per menit
- Biasanya 10-20 request per menit per model
- Tidak ada biaya finansial
*/

export default AI_CONFIG
