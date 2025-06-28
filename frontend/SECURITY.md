# 🔒 Security Guidelines

**PENTING: Jangan pernah commit API keys ke GitHub!**

## ✅ Cara Aman Menyimpan API Keys

### 1. Environment Variables (.env)
```env
# ✅ AMAN - File ini sudah di .gitignore
VITE_OPENROUTER_API_KEY=your-api-key-here
VITE_HUGGING_FACE_TOKEN=your-token-here
```

### 2. Konfigurasi yang Aman
```javascript
// ✅ AMAN - Menggunakan environment variables
token: import.meta.env.VITE_OPENROUTER_API_KEY

// ❌ BAHAYA - Hardcoded API key
token: 'sk-or-v1-actual-api-key-here'
```

## 🚨 Files yang TIDAK BOLEH di-commit

- `.env` - Environment variables
- Semua file dengan API keys hardcoded
- Test files dengan credentials asli

## ✅ Files yang BOLEH di-commit

- `.env.example` - Template tanpa API keys asli
- `ai-config.js` - Menggunakan import.meta.env
- Test files dengan placeholder API keys

## 🔍 Pre-commit Checklist

Sebelum commit, pastikan:

1. ✅ Tidak ada hardcoded API keys
2. ✅ File `.env` sudah di .gitignore
3. ✅ Semua API keys menggunakan environment variables
4. ✅ Test files menggunakan placeholders

### Quick Check Command:
```bash
# Cari hardcoded API keys
grep -r "sk-or-v1-" . --exclude-dir=node_modules
grep -r "hf_" . --exclude-dir=node_modules

# Cek status git
git status
```

## 🛡️ Production Security

### Server Environment
```bash
# Set di server production
export VITE_OPENROUTER_API_KEY="your-production-key"
export VITE_HUGGING_FACE_TOKEN="your-production-token"
```

### Vercel/Netlify
Gunakan dashboard untuk set environment variables:
- `VITE_OPENROUTER_API_KEY`
- `VITE_HUGGING_FACE_TOKEN`
- `VITE_SITE_URL`
- `VITE_SITE_NAME`

## 🚫 Jika API Key Ter-commit

1. **Segera** revoke/regenerate API key
2. Update `.env` dengan key baru
3. Restart development server
4. **Jangan** mencoba menghapus dari git history

## 📞 Contact Security

Jika menemukan security issue:
1. Jangan buat public issue
2. Contact maintainer directly
3. Report melalui private channel

---

**Remember: Security is everyone's responsibility!** 🔐
