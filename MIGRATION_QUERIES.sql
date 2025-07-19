-- ===================================================================
-- MIGRATION QUERIES - ALTERNATIF SETUP DATABASE
-- ===================================================================
--
-- File ini berisi query alternatif untuk berbagai skenario setup:
-- 1. Setup dari scratch (database kosong)
-- 2. Migration dari tabel artikel yang sudah ada
-- 3. Update struktur tabel existing
-- 4. Rollback/cleanup queries
--
-- ===================================================================

-- SKENARIO UTAMA: FRESH INSTALL/SETUP DARI AWAL (RECOMMENDED)
-- ===================================================================
-- Jalankan bagian ini jika ingin setup database dari awal (kosong)
-- Pastikan sudah membuat database: CREATE DATABASE db_mpti;
-- Pastikan sudah mengaktifkan extension UUID: CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- DROP TABLES (jika ingin reset total, hati-hati!)
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS artikel CASCADE;
DROP TABLE IF EXISTS lawyers CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    users_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'users',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LAWYERS TABLE
CREATE TABLE IF NOT EXISTS lawyers (
    lawyer_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    experience INTEGER NOT NULL DEFAULT 0,
    rating INTEGER NOT NULL DEFAULT 0,
    fee INTEGER NOT NULL,
    old_fee INTEGER,
    photo VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ARTIKEL TABLE
CREATE TABLE IF NOT EXISTS artikel (
    artikel_id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    deskripsi TEXT NOT NULL,
    content_artikel TEXT NOT NULL,
    gambar VARCHAR(255) NOT NULL,
    link_artikel VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    booking_id SERIAL PRIMARY KEY,
    lawyer_id INTEGER NOT NULL REFERENCES lawyers(lawyer_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(users_id) ON DELETE CASCADE,
    nama_pembooking VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    nomor_handphone VARCHAR(20) NOT NULL,
    tanggal_booking DATE NOT NULL,
    waktu_booking TIME WITHOUT TIME ZONE NOT NULL,
    pesan TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    reschedule_reason TEXT,
    reschedule_date DATE,
    reschedule_time TIME WITHOUT TIME ZONE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_bookings_lawyer_id ON bookings(lawyer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_tanggal ON bookings(tanggal_booking);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);

-- ===================================================================
-- END FRESH INSTALL BLOCK
-- ===================================================================

-- SKENARIO 1: SETUP DARI SCRATCH (RECOMMENDED)
-- ===================================================================

-- Gunakan query ini jika database masih kosong atau ingin setup clean
-- Copy dari DATABASE_SCHEMA.sql atau jalankan file tersebut langsung

\echo 'Setting up fresh database...'

-- Drop all existing tables (HATI-HATI!)
DROP TABLE IF EXISTS article_views CASCADE;
DROP TABLE IF EXISTS artikel CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Kemudian jalankan DATABASE_SCHEMA.sql atau copy isinya di sini

\echo 'Fresh database setup completed. Run DATABASE_SCHEMA.sql next.'

-- ===================================================================

-- SKENARIO 2: MIGRATION DARI TABEL EXISTING
-- ===================================================================

-- Gunakan query ini jika sudah ada tabel artikel dengan struktur berbeda

\echo 'Starting migration from existing tables...'

-- A. Backup existing data
CREATE TABLE IF NOT EXISTS artikel_backup AS 
SELECT * FROM artikel WHERE 1=1; -- Change WHERE condition as needed

CREATE TABLE IF NOT EXISTS users_backup AS 
SELECT * FROM users WHERE 1=1; -- If users table exists

-- B. Check existing struktur
\echo 'Checking existing table structure...'
\d artikel

-- C. Add missing columns to existing artikel table
DO $$ 
BEGIN
    -- Add columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='artikel' AND column_name='content_artikel') THEN
        ALTER TABLE artikel ADD COLUMN content_artikel TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='artikel' AND column_name='link_artikel') THEN
        ALTER TABLE artikel ADD COLUMN link_artikel VARCHAR(500);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='artikel' AND column_name='updated_at') THEN
        ALTER TABLE artikel ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    END IF;
    
    -- Ensure primary key is artikel_id (not id)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='artikel' AND column_name='artikel_id') THEN
        -- If using 'id' instead of 'artikel_id', rename it
        IF EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='artikel' AND column_name='id') THEN
            ALTER TABLE artikel RENAME COLUMN id TO artikel_id;
        ELSE
            -- Add artikel_id if doesn't exist
            ALTER TABLE artikel ADD COLUMN artikel_id SERIAL PRIMARY KEY;
        END IF;
    END IF;
    
    RAISE NOTICE 'Migration columns added successfully';
END $$;

-- D. Create or update users table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- E. Create or update article_views table
DROP TABLE IF EXISTS article_views; -- Recreate to ensure correct structure
CREATE TABLE article_views (
    view_id SERIAL PRIMARY KEY,
    artikel_id INTEGER NOT NULL,
    ip_address INET NOT NULL,
    user_agent TEXT,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_unique_visitor BOOLEAN DEFAULT false
);

-- F. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_artikel_created_at ON artikel(created_at);
CREATE INDEX IF NOT EXISTS idx_artikel_judul ON artikel(judul);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_article_views_artikel_id ON article_views(artikel_id);
CREATE INDEX IF NOT EXISTS idx_article_views_ip_address ON article_views(ip_address);

\echo 'Migration completed successfully!'

-- ===================================================================

-- SKENARIO 3: UPDATE STRUCTURE ONLY (MINIMAL CHANGES)
-- ===================================================================

-- Gunakan query ini jika ingin update struktur tanpa drop/recreate

\echo 'Updating table structure...'

-- Update artikel table
DO $$ 
BEGIN
    -- Add missing columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='artikel' AND column_name='user_agent') THEN
        ALTER TABLE article_views ADD COLUMN user_agent TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='artikel' AND column_name='is_unique_visitor') THEN
        ALTER TABLE article_views ADD COLUMN is_unique_visitor BOOLEAN DEFAULT false;
    END IF;
    
    -- Update data types if needed
    -- ALTER TABLE artikel ALTER COLUMN judul TYPE VARCHAR(255);
    -- ALTER TABLE artikel ALTER COLUMN gambar TYPE VARCHAR(500);
    
    RAISE NOTICE 'Structure update completed';
END $$;

-- ===================================================================

-- SKENARIO 4: VERIFICATION QUERIES
-- ===================================================================

-- Query untuk memverifikasi setup database

\echo 'Running verification queries...'

-- Check if all tables exist
SELECT 
    table_name,
    CASE 
        WHEN table_name IN ('artikel', 'users', 'article_views') THEN 'REQUIRED'
        ELSE 'OPTIONAL'
    END as status
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check artikel table structure
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'artikel'
ORDER BY ordinal_position;

-- Check if sample data exists
SELECT 
    'artikel' as table_name,
    COUNT(*) as row_count
FROM artikel
UNION ALL
SELECT 
    'users' as table_name,
    COUNT(*) as row_count
FROM users
UNION ALL
SELECT 
    'article_views' as table_name,
    COUNT(*) as row_count
FROM article_views;

-- Test basic functionality
SELECT 
    artikel_id,
    judul,
    LENGTH(deskripsi) as deskripsi_length,
    gambar,
    created_at
FROM artikel 
ORDER BY created_at DESC 
LIMIT 3;

\echo 'Verification completed!'

-- ===================================================================

-- SKENARIO 5: CLEANUP/ROLLBACK QUERIES
-- ===================================================================

-- Query untuk membersihkan atau rollback changes

-- A. Remove all data but keep structure
-- TRUNCATE TABLE article_views RESTART IDENTITY;
-- TRUNCATE TABLE artikel RESTART IDENTITY CASCADE;
-- TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- B. Drop all custom tables (DANGEROUS!)
-- DROP TABLE IF EXISTS article_views CASCADE;
-- DROP TABLE IF EXISTS artikel CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- C. Restore from backup (if backup exists)
-- INSERT INTO artikel SELECT * FROM artikel_backup;
-- INSERT INTO users SELECT * FROM users_backup;

-- D. Reset sequences
-- ALTER SEQUENCE artikel_artikel_id_seq RESTART WITH 1;
-- ALTER SEQUENCE users_user_id_seq RESTART WITH 1;
-- ALTER SEQUENCE article_views_view_id_seq RESTART WITH 1;

-- ===================================================================

-- SKENARIO 6: PRODUCTION OPTIMIZATION
-- ===================================================================

-- Query untuk optimasi production

-- A. Additional indexes for better performance
CREATE INDEX IF NOT EXISTS idx_artikel_judul_text ON artikel USING gin(to_tsvector('english', judul));
CREATE INDEX IF NOT EXISTS idx_artikel_deskripsi_text ON artikel USING gin(to_tsvector('english', deskripsi));
CREATE INDEX IF NOT EXISTS idx_article_views_daily ON article_views(artikel_id, DATE(viewed_at));
CREATE INDEX IF NOT EXISTS idx_article_views_unique_check ON article_views(artikel_id, ip_address, viewed_at);

-- B. Setup triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_artikel_updated_at ON artikel;
CREATE TRIGGER update_artikel_updated_at 
    BEFORE UPDATE ON artikel 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- C. Setup constraints for data integrity
ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS users_email_format 
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS users_username_length 
    CHECK (length(username) >= 3);

ALTER TABLE artikel ADD CONSTRAINT IF NOT EXISTS artikel_judul_not_empty 
    CHECK (length(trim(judul)) > 0);

-- D. Analyze tables for query optimization
ANALYZE artikel;
ANALYZE users;
ANALYZE article_views;

\echo 'Production optimization completed!'

-- ===================================================================

-- SKENARIO 7: DEVELOPMENT HELPERS
-- ===================================================================

-- Query helper untuk development

-- A. Generate sample data
DO $$
BEGIN
    -- Only insert if tables are empty
    IF (SELECT COUNT(*) FROM artikel) = 0 THEN
        INSERT INTO artikel (judul, deskripsi, gambar, content_artikel, link_artikel) VALUES
        ('Sample Article 1', 'This is a sample article for testing', '/uploads/sample1.jpg', '<p>Sample content 1</p>', 'https://example.com/1'),
        ('Sample Article 2', 'Another sample article', '/uploads/sample2.jpg', '<p>Sample content 2</p>', 'https://example.com/2'),
        ('Sample Article 3', 'Third sample article', '/uploads/sample3.jpg', '<p>Sample content 3</p>', 'https://example.com/3');
        
        RAISE NOTICE 'Sample articles inserted';
    END IF;
    
    IF (SELECT COUNT(*) FROM users WHERE role = 'admin') = 0 THEN
        INSERT INTO users (username, email, password_hash, role, full_name) VALUES
        ('admin', 'admin@example.com', '$2b$10$XYZ123', 'admin', 'Admin User'),
        ('testuser', 'test@example.com', '$2b$10$XYZ123', 'user', 'Test User');
        
        RAISE NOTICE 'Sample users inserted';
    END IF;
END $$;

-- B. Quick stats query
SELECT 
    'ARTIKEL' as category,
    COUNT(*) as count,
    MIN(created_at) as oldest,
    MAX(created_at) as newest
FROM artikel
UNION ALL
SELECT 
    'USERS' as category,
    COUNT(*) as count,
    MIN(created_at) as oldest,
    MAX(created_at) as newest
FROM users
UNION ALL
SELECT 
    'VIEWS' as category,
    COUNT(*) as count,
    MIN(viewed_at) as oldest,
    MAX(viewed_at) as newest
FROM article_views;

\echo 'Database setup completed! Ready for development/production.'

-- ===================================================================
-- END OF MIGRATION QUERIES
-- ===================================================================
