# 🤖 Panduan Setup AI Chatbot Anas Law

## ✅ Status Saat Ini:
- ✅ Gemini API: Sudah aktif (AIzaSyAJCaebYe6ajF5rYwIjZ1aM8-Pg_1SAkM8)
- ⏳ OpenRouter API: Belum diatur (opsional)

## 🔄 Cara Kerja Sistem:

### Urutan Fallback:
1. **OpenRouter** (jika API key tersedia) → Model Llama gratis atau premium
2. **Gemini** (sudah aktif) → Google AI
3. **Smart Fallback** → Respons manual yang cerdas

## 🚀 Cara Aktivasi Lengkap:

### Opsi 1: Hanya Gemini (Sudah Aktif!)
```bash
# Chatbot sudah bisa digunakan dengan Gemini!
# Tidak perlu setup tambahan
```

### Opsi 2: Tambah OpenRouter (Rekomendasi)
```bash
1. Buka https://openrouter.ai
2. Daftar akun gratis
3. Buat API key baru
4. Edit file .env.local:
   VITE_OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxx
5. Restart development server
```

## 🎯 Keunggulan Sistem Saat Ini:

### ✅ Gemini (Sudah Aktif):
- Gratis quota besar
- Response berkualitas tinggi
- Bahasa Indonesia natural
- Cepat dan reliable

### ✅ OpenRouter (Opsional):
- Akses multiple AI models
- Model gratis (Llama) tersedia
- Bisa upgrade ke GPT-4, Claude, dll
- Lebih stabil untuk high traffic

### ✅ Smart Fallback:
- Respons manual yang cerdas
- Tetap profesional meski AI down
- Info lengkap Anas Law
- Selalu tersedia 24/7

## 🧪 Test Chatbot:

### Test Questions:
1. "Halo, saya butuh konsultasi hukum"
2. "Apa saja layanan yang tersedia?"
3. "Berapa biaya konsultasinya?"
4. "Bagaimana cara booking konsultasi?"
5. "Jam operasional kantor kapan?"

## 📊 Monitoring:

### Di Browser Console:
```
🤖 Trying AI providers...
🔄 Trying OpenRouter...  (jika available)
❌ OpenRouter failed: ...  (jika gagal)
🔄 Trying Gemini...
✅ Gemini success!  (jika berhasil)
```

## 🔧 Troubleshooting:

### Jika Chatbot Tidak Merespons:
1. Check browser console untuk error
2. Pastikan .env.local sudah benar
3. Restart development server
4. Check quota Gemini API

### Jika Response Lambat:
- Normal, ada delay 1.5-2.5 detik untuk natural feel
- Gemini biasanya cepat (~1-2 detik)

### Jika Response Tidak Sesuai:
- Sistem prompt sudah dioptimasi untuk Anas Law
- Response akan konsisten tentang layanan hukum
- Fallback system akan handle edge cases

## 💡 Tips Optimasi:

1. **Monitoring Usage**: Check quota Gemini di Google Cloud Console
2. **Backup Plan**: OpenRouter sebagai backup yang reliable
3. **Custom Responses**: Edit `generateSmartResponse()` untuk kustomisasi
4. **Analytics**: Tambah tracking untuk popular questions

## 🔗 Links Berguna:
- Gemini API Console: https://makersuite.google.com
- OpenRouter Dashboard: https://openrouter.ai/keys
- Gemini Pricing: https://ai.google.dev/pricing

---

**Status: ✅ SIAP DIGUNAKAN dengan Gemini!**
**Optional: Tambah OpenRouter untuk redundansi**
