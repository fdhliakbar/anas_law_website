-- ===================================================================
-- SCHEMA DATABASE UNTUK SISTEM MANAJEMEN ARTIKEL ANAS LAW WEBSITE
-- ===================================================================
-- 
-- Catatan: File ini berisi query SQL untuk membuat struktur database
-- yang diperlukan untuk sistem manajemen artikel dengan fitur:
-- - CRUD artikel (Create, Read, Update, Delete)
-- - Upload dan manajemen gambar
-- - User management (admin/user roles)
-- - Tracking views dan statistik artikel
-- - Dashboard admin dengan analytics
--
-- Jalankan query ini di PostgreSQL database Anda
-- ===================================================================

-- 1. TABEL ARTIKEL (PRIMARY TABLE)
-- Tabel utama untuk menyimpan data artikel
DROP TABLE IF EXISTS artikel CASCADE;

CREATE TABLE artikel (
    artikel_id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT,
    gambar VARCHAR(500), -- Path ke file gambar (contoh: /uploads/filename.jpg)
    link_artikel VARCHAR(500), -- URL eksternal artikel (opsional)
    content_artikel TEXT, -- Konten lengkap artikel (rich text/HTML)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index untuk performa query
CREATE INDEX idx_artikel_created_at ON artikel(created_at);
CREATE INDEX idx_artikel_judul ON artikel(judul);

-- Trigger untuk auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_artikel_updated_at 
    BEFORE UPDATE ON artikel 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ===================================================================

-- 2. TABEL USERS (USER MANAGEMENT)
-- Tabel untuk manajemen user (admin dan user biasa)
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Password yang sudah di-hash (bcrypt)
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Index untuk performa query
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Trigger untuk auto-update updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ===================================================================

-- 3. TABEL ARTICLE_VIEWS (TRACKING STATISTIK)
-- Tabel untuk tracking views artikel dan analytics
DROP TABLE IF EXISTS article_views CASCADE;

CREATE TABLE article_views (
    view_id SERIAL PRIMARY KEY,
    artikel_id INTEGER NOT NULL, -- Reference ke artikel.artikel_id (tanpa foreign key constraint)
    ip_address INET NOT NULL,
    user_agent TEXT,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_unique_visitor BOOLEAN DEFAULT false -- True jika ini adalah view unik dalam 24 jam
);

-- Index untuk performa query
CREATE INDEX idx_article_views_artikel_id ON article_views(artikel_id);
CREATE INDEX idx_article_views_ip_address ON article_views(ip_address);
CREATE INDEX idx_article_views_viewed_at ON article_views(viewed_at);
CREATE INDEX idx_article_views_unique ON article_views(artikel_id, ip_address, viewed_at);

-- ===================================================================

-- 4. DATA SAMPLE (OPSIONAL)
-- Insert admin user default (password: admin123)
INSERT INTO users (username, email, password_hash, role, full_name) VALUES 
('admin', 'admin@anaslaw.com', '$2b$10$xDZ7VRhQK.gJXvU5Nt9.z.XqR8Q9L8sJ6Y8bN8xV5T2wN9pQ7K.m6', 'admin', 'Administrator'),
('user1', 'user1@example.com', '$2b$10$xDZ7VRhQK.gJXvU5Nt9.z.XqR8Q9L8sJ6Y8bN8xV5T2wN9pQ7K.m6', 'user', 'Test User');

-- Insert sample artikel
INSERT INTO artikel (judul, deskripsi, gambar, link_artikel, content_artikel) VALUES 
('Panduan Hukum Bisnis untuk Startup', 
 'Artikel ini membahas aspek-aspek hukum penting yang perlu diperhatikan oleh startup dalam menjalankan bisnis mereka.',
 '/uploads/sample1.jpg',
 'https://example.com/panduan-hukum-bisnis',
 '<h2>Pengantar</h2><p>Dalam dunia startup yang dinamis, pemahaman terhadap aspek hukum bisnis sangat penting...</p>'),

('Hak Kekayaan Intelektual di Era Digital',
 'Membahas pentingnya perlindungan hak kekayaan intelektual dalam era transformasi digital.',
 '/uploads/sample2.jpg',
 'https://example.com/hak-kekayaan-intelektual',
 '<h2>Pentingnya HKI</h2><p>Di era digital, perlindungan hak kekayaan intelektual menjadi semakin krusial...</p>'),

('Aspek Hukum dalam E-Commerce',
 'Panduan lengkap mengenai regulasi dan aspek hukum yang harus diperhatikan dalam bisnis e-commerce.',
 '/uploads/sample3.jpg',
 'https://example.com/hukum-ecommerce',
 '<h2>Regulasi E-Commerce</h2><p>Bisnis e-commerce harus mematuhi berbagai regulasi yang berlaku...</p>');

-- ===================================================================

-- 5. QUERY UTILITAS (UNTUK MAINTENANCE)

-- Query untuk mengecek struktur tabel
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'artikel' 
-- ORDER BY ordinal_position;

-- Query untuk melihat statistik artikel
-- SELECT 
--     COUNT(*) as total_artikel,
--     COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as artikel_bulan_ini
-- FROM artikel;

-- Query untuk melihat artikel terpopuler (berdasarkan views)
-- SELECT 
--     a.artikel_id,
--     a.judul,
--     COUNT(av.view_id) as total_views,
--     COUNT(CASE WHEN av.is_unique_visitor = true THEN 1 END) as unique_visitors
-- FROM artikel a
-- LEFT JOIN article_views av ON a.artikel_id = av.artikel_id
-- GROUP BY a.artikel_id, a.judul
-- ORDER BY total_views DESC
-- LIMIT 10;

-- ===================================================================

-- 6. CATATAN PENTING

-- UNTUK MIGRASI DARI SISTEM LAMA:
-- Jika Anda sudah memiliki tabel artikel dengan nama atau struktur berbeda,
-- sesuaikan query di atas atau lakukan migrasi data.

-- UNTUK BACKUP:
-- Selalu backup database sebelum menjalankan query DDL (CREATE, DROP, ALTER)

-- UNTUK PRODUCTION:
-- - Ganti password default admin
-- - Sesuaikan constraint dan validasi sesuai kebutuhan
-- - Pertimbangkan penambahan foreign key constraint jika diperlukan
-- - Setup proper indexing berdasarkan query pattern aplikasi

-- UNTUK DEVELOPMENT:
-- - Gunakan data sample untuk testing
-- - Monitor performa query dengan EXPLAIN ANALYZE
-- - Sesuaikan konfigurasi PostgreSQL untuk development

-- ===================================================================
-- END OF SCHEMA
-- ===================================================================
