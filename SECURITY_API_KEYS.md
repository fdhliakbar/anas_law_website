# 🔒 KEAMANAN API KEY - ANAS LAW CHATBOT

## ⚠️ PENTING: Jangan Commit Kredensial ke GitHub!

### 🛡️ File yang HARUS Ada di .gitignore:
```
.env
.env.local
.env.development
.env.production
frontend/.env
frontend/.env.local
frontend/.env.development
frontend/.env.production
```

### 🔧 Setup Environment Variables:

1. **Copy Template:**
   ```bash
   cp frontend/.env.example frontend/.env
   ```

2. **Edit file .env:**
   ```
   VITE_OPENROUTER_API_KEY=your_actual_api_key_here
   ```

3. **Dapatkan API Key:**
   - Daftar di https://openrouter.ai/
   - Verifikasi email
   - Buat API key di dashboard
   - Copy ke file .env

### 🚫 JANGAN PERNAH:
- ❌ Hardcode API key di kode
- ❌ Commit file .env ke GitHub
- ❌ Share API key di chat/email
- ❌ Simpan API key di file yang ter-commit

### ✅ SELALU:
- ✅ Gunakan environment variables
- ✅ Pastikan .env di .gitignore
- ✅ Gunakan .env.example sebagai template
- ✅ Rotasi API key secara berkala

### 🔍 Cara Cek Keamanan:
```bash
# Pastikan .env tidak ter-track git
git status

# Pastikan .env ada di .gitignore
cat .gitignore | grep ".env"
```

### 📱 Production Deployment:
Untuk production, set environment variables di:
- Vercel: Environment Variables tab
- Netlify: Site settings > Environment variables
- Railway: Variables tab
- Heroku: Config Vars

### 🆘 Jika API Key Ter-commit:
1. **IMMEDIATELY** revoke API key di OpenRouter dashboard
2. Buat API key baru
3. Update di environment variables
4. **NEVER** revert commit yang berisi API key

---
🏛️ **Anas Law** - Professional Legal Services with Secure AI Assistant
