# Supabase Setup Guide

## Langkah-langkah untuk menggunakan Supabase sebagai database online:

### 1. Buat Akun Supabase
1. Kunjungi [supabase.com](https://supabase.com)
2. Daftar dengan akun GitHub atau email
3. Buat project baru

### 2. Setup Database Schema
Setelah project dibuat, buka SQL Editor di dashboard Supabase dan jalankan script SQL yang tersedia di file `database_schema.sql` di root folder project. Script ini akan membuat:

- Tabel `users` dengan kolom: users_id, name, email, password, role, created_at, updated_at
- Tabel `artikel` dengan kolom: artikel_id, judul, link_artikel, content_artikel, created_at, updated_at
- Indexes untuk performa
- Triggers untuk auto-update timestamp
- Row Level Security policies
- Sample data (opsional)

Atau copy-paste script berikut ke SQL Editor:

```sql
-- Lihat file database_schema.sql untuk script lengkap
-- Atau jalankan: \i database_schema.sql
```

### 3. Dapatkan Konfigurasi Supabase
1. Di dashboard Supabase, klik Settings > API
2. Copy URL dan Keys:
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **Anon Key**: untuk operasi client-side
   - **Service Role Key**: untuk operasi server-side (RAHASIA!)

### 4. Update Environment Variables
Buat file `.env` di folder backend dan isi dengan:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# JWT Secret (generate random string)
JWT_SECRET=your-jwt-secret-here

# Existing configurations...
```

### 5. Cara Beralih ke Supabase
Aplikasi sudah dikonfigurasi untuk otomatis menggunakan Supabase jika environment variables Supabase tersedia. 

**Untuk menggunakan Supabase:**
- Pastikan `SUPABASE_URL` dan `SUPABASE_ANON_KEY` ada di file `.env`
- Restart aplikasi

**Untuk kembali ke PostgreSQL:**
- Hapus atau comment environment variables Supabase
- Pastikan `DATABASE_URL` tersedia untuk PostgreSQL
- Restart aplikasi

### 6. Testing
1. Start aplikasi: `npm run dev`
2. Test endpoint registrasi dan login
3. Cek di dashboard Supabase apakah data tersimpan

### 7. Tips Keamanan
- **JANGAN** commit file `.env` ke git
- **JANGAN** bagikan Service Role Key
- Gunakan Row Level Security (RLS) untuk proteksi data
- Update CORS settings di Supabase jika perlu

### 8. Monitoring
- Dashboard Supabase menyediakan:
  - Database Explorer
  - API Logs
  - Auth Management
  - Real-time monitoring

## Keuntungan Supabase
- ✅ Database online yang selalu tersedia
- ✅ Dashboard untuk monitoring
- ✅ Built-in authentication (opsional)
- ✅ Real-time subscriptions
- ✅ File storage
- ✅ Edge functions
- ✅ Free tier yang generous

## Migrasi Data (jika ada)
Jika Anda sudah memiliki data di PostgreSQL lokal:

1. Export data dari PostgreSQL lokal:
```bash
pg_dump -h localhost -U username -d database_name --data-only --inserts > data.sql
```

2. Import ke Supabase melalui SQL Editor di dashboard
