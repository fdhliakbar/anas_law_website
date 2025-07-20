# ✅ Checklist Setup Supabase

Ikuti checklist ini untuk memastikan setup Supabase berhasil:

## 📋 Persiapan Awal

- [ ] **Buat Akun Supabase**: Daftar di [supabase.com](https://supabase.com)
- [ ] **Buat Project Baru**: Di dashboard Supabase
- [ ] **Catat Credentials**: URL dan API Keys

## 🗄️ Database Setup

- [ ] **Jalankan SQL Schema**: 
  - Buka SQL Editor di dashboard Supabase
  - Copy-paste isi file `database_schema.sql`
  - Execute script
- [ ] **Verifikasi Tabel**: Pastikan tabel `users` dan `artikel` terbuat
- [ ] **Cek Sample Data**: Pastikan ada sample data (opsional)

## ⚙️ Environment Configuration

### Backend (.env)
- [ ] **Copy Template**: `cp .env.example .env`
- [ ] **Set Supabase URL**: `SUPABASE_URL=https://your-project-ref.supabase.co`
- [ ] **Set Anon Key**: `SUPABASE_ANON_KEY=your-anon-key`
- [ ] **Set Service Key**: `SUPABASE_SERVICE_ROLE_KEY=your-service-key`
- [ ] **Set JWT Secret**: `JWT_SECRET=your-random-secret`

### Frontend (.env)
- [ ] **Copy Template**: `cp .env.example .env` 
- [ ] **Set Frontend Vars**: 
  - `VITE_SUPABASE_URL=https://your-project-ref.supabase.co`
  - `VITE_SUPABASE_ANON_KEY=your-anon-key`

## 🧪 Testing

- [ ] **Test Database Connection**:
  ```bash
  cd backend
  npm run test:db
  ```
- [ ] **Test Backend APIs**:
  ```bash
  cd backend
  npm run dev
  ```
- [ ] **Test Frontend**:
  ```bash
  cd frontend  
  npm run dev
  ```

## 🔧 Troubleshooting

### ❌ Database Connection Failed
- Periksa SUPABASE_URL dan SUPABASE_ANON_KEY di .env
- Pastikan project Supabase aktif
- Cek RLS policies di dashboard

### ❌ API Errors
- Pastikan schema database sudah dijalankan
- Cek apakah JWT_SECRET sudah diset
- Verifikasi environment variables

### ❌ CORS Issues
- Periksa konfigurasi Supabase CORS
- Pastikan domain frontend dalam whitelist

## 📈 Setelah Setup Berhasil

### Features yang Tersedia:
- ✅ **Hybrid Database**: Otomatis switch PostgreSQL ↔ Supabase
- ✅ **User Management**: Register, login, update, delete
- ✅ **Article Management**: CRUD operations untuk artikel
- ✅ **Authentication**: JWT-based auth
- ✅ **Online Database**: 24/7 availability dengan Supabase

### Monitoring:
- 📊 **Supabase Dashboard**: Real-time monitoring
- 📈 **API Usage**: Track requests dan performance
- 🔒 **Security**: Built-in RLS dan auth

### Next Steps:
1. **Deploy Backend**: Heroku, Vercel, atau Netlify
2. **Deploy Frontend**: Vercel, Netlify, atau GitHub Pages  
3. **Setup Domain**: Custom domain untuk production
4. **Monitoring**: Setup error tracking dan analytics

## 🆘 Support

Jika ada masalah:
1. Cek console errors di browser
2. Cek logs di terminal backend
3. Cek database logs di Supabase dashboard
4. Review konfigurasi environment variables

---

**✨ Selamat! Database Anda sekarang online dan siap digunakan!**
