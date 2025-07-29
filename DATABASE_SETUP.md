# Database Setup Instructions

## Panduan Setup Database PostgreSQL untuk Anas Law Website

### 1. Prerequisites

- PostgreSQL 12+ sudah terinstall
- Node.js dan npm/yarn sudah terinstall
- Akses ke database PostgreSQL (username, password, database name)

### 2. Langkah-langkah Setup

#### A. Persiapan Database

```bash
# 1. Login ke PostgreSQL
psql -U postgres

# 2. Buat database baru (jika belum ada)
CREATE DATABASE anas_law_db;

# 3. Buat user baru (opsional, untuk keamanan)
CREATE USER anas_law_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE anas_law_db TO anas_law_user;

# 4. Connect ke database
\c anas_law_db;
```

#### B. Execute Schema

```bash
# Jalankan file schema SQL
psql -U anas_law_user -d anas_law_db -f DATABASE_SCHEMA.sql

# Atau copy-paste isi file DATABASE_SCHEMA.sql ke psql terminal
```

#### C. Verifikasi Setup

```sql
-- Cek tabel yang berhasil dibuat
\dt

-- Cek struktur tabel artikel
\d artikel

-- Cek data sample
SELECT * FROM artikel;
SELECT * FROM users;
```

### 3. Konfigurasi Backend

#### A. Environment Variables

Buat file `.env` di folder `backend/`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=anas_law_db
DB_USER=anas_law_user
DB_PASSWORD=your_secure_password

# JWT Secret (untuk authentication)
JWT_SECRET=your_very_secure_jwt_secret_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

#### B. Database Connection

File `backend/server/utils/db.js` sudah dikonfigurasi untuk menggunakan environment variables di atas.

### 4. Testing Database Connection

#### A. Test Connection

```bash
cd backend
npm run test:db
```

#### B. Manual Test

```sql
-- Test insert artikel
INSERT INTO artikel (judul, deskripsi, gambar) VALUES
('Test Artikel', 'Ini adalah test artikel', '/uploads/test.jpg');

-- Test select
SELECT * FROM artikel WHERE judul LIKE '%Test%';

-- Test artikel views tracking
INSERT INTO article_views (artikel_id, ip_address, user_agent, is_unique_visitor) VALUES
(1, '127.0.0.1', 'Mozilla/5.0 Test', true);

-- Test stats query
SELECT
    (SELECT COUNT(*) FROM artikel) as total_articles,
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM article_views) as total_views,
    (SELECT COUNT(DISTINCT ip_address) FROM article_views) as unique_visitors;
```

### 5. Migration Notes

#### A. Jika Sudah Ada Tabel Artikel

```sql
-- Backup data lama
CREATE TABLE artikel_backup AS SELECT * FROM artikel_old;

-- Alter struktur jika diperlukan
ALTER TABLE artikel ADD COLUMN IF NOT EXISTS content_artikel TEXT;
ALTER TABLE artikel ADD COLUMN IF NOT EXISTS link_artikel VARCHAR(500);
ALTER TABLE artikel ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Migrasi data
INSERT INTO artikel (judul, deskripsi, gambar, created_at)
SELECT judul, deskripsi, gambar, created_at FROM artikel_old;
```

#### B. Update Existing article_views Table

```sql
-- Jika tabel article_views sudah ada tapi struktur berbeda
ALTER TABLE article_views ADD COLUMN IF NOT EXISTS user_agent TEXT;
ALTER TABLE article_views ADD COLUMN IF NOT EXISTS is_unique_visitor BOOLEAN DEFAULT false;

-- Drop foreign key constraint jika ada (karena sistem tidak menggunakan FK)
-- ALTER TABLE article_views DROP CONSTRAINT IF EXISTS fk_artikel_id;
```

### 6. Production Considerations

#### A. Security

- Ganti password default admin: `admin123`
- Gunakan strong JWT secret
- Setup proper database user privileges
- Enable SSL untuk database connection

#### B. Performance

```sql
-- Tambahan index untuk production
CREATE INDEX IF NOT EXISTS idx_artikel_status ON artikel(created_at) WHERE created_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_views_daily ON article_views(artikel_id, ip_address, DATE(viewed_at));

-- Vacuum dan analyze untuk optimasi
VACUUM ANALYZE artikel;
VACUUM ANALYZE article_views;
VACUUM ANALYZE users;
```

#### C. Backup Strategy

```bash
# Daily backup
pg_dump -U anas_law_user anas_law_db > backup_$(date +%Y%m%d).sql

# Restore dari backup
psql -U anas_law_user -d anas_law_db < backup_20241201.sql
```

### 7. Troubleshooting

#### Common Issues:

1. **Connection Error**

   ```
   Error: connection to server on socket "/tmp/.s.PGSQL.5432" failed
   ```

   - Pastikan PostgreSQL service running
   - Cek port dan host configuration

2. **Authentication Failed**

   ```
   Error: password authentication failed for user
   ```

   - Cek username/password di .env
   - Cek pg_hba.conf configuration

3. **Table Not Found**

   ```
   Error: relation "artikel" does not exist
   ```

   - Pastikan schema sudah di-execute
   - Cek database name yang benar

4. **Permission Denied**
   ```
   Error: permission denied for table artikel
   ```
   - Grant proper privileges ke user
   - Cek ownership tabel

### 8. Development Tips

#### A. Useful Queries

```sql
-- Reset auto-increment
ALTER SEQUENCE artikel_artikel_id_seq RESTART WITH 1;

-- Clear all data (untuk testing)
TRUNCATE TABLE article_views, artikel, users RESTART IDENTITY CASCADE;

-- Check table sizes
SELECT
    tablename,
    pg_size_pretty(pg_total_relation_size(tablename::regclass)) as size
FROM pg_tables
WHERE schemaname = 'public';
```

#### B. Mock Data Generator

```sql
-- Generate sample artikel untuk testing
INSERT INTO artikel (judul, deskripsi, gambar, content_artikel)
SELECT
    'Artikel Test ' || generate_series,
    'Deskripsi untuk artikel test ' || generate_series,
    '/uploads/test' || generate_series || '.jpg',
    '<p>Konten artikel test ' || generate_series || '</p>'
FROM generate_series(1, 50);

-- Generate sample views untuk testing analytics
INSERT INTO article_views (artikel_id, ip_address, user_agent, is_unique_visitor)
SELECT
    (random() * 50 + 1)::integer,
    ('192.168.1.' || (random() * 254 + 1)::integer)::inet,
    'Test Browser ' || generate_series,
    random() > 0.5
FROM generate_series(1, 1000);
```

---

## Next Steps

1. **Execute DATABASE_SCHEMA.sql** di PostgreSQL
2. **Setup .env file** dengan konfigurasi database
3. **Test connection** dengan endpoint test-db
4. **Verify CRUD operations** menggunakan frontend
5. **Test tracking views** dengan membuka artikel
6. **Check admin dashboard** untuk melihat statistik

Jika ada masalah, silakan cek file DEBUG_GUIDE.md untuk troubleshooting detail.
