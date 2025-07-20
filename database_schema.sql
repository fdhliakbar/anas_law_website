-- SQL Schema untuk Supabase Database
-- Jalankan script ini di SQL Editor dashboard Supabase

-- 1. Tabel Users
CREATE TABLE IF NOT EXISTS users (
    users_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel Artikel
CREATE TABLE IF NOT EXISTS artikel (
    artikel_id SERIAL PRIMARY KEY,
    judul VARCHAR(50) NOT NULL,
    link_artikel VARCHAR(100),
    content_artikel TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Indexes untuk performa
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_artikel_created_at ON artikel(created_at DESC);

-- 4. Function untuk update timestamp otomatis
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Triggers untuk update timestamp
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_artikel_updated_at ON artikel;
CREATE TRIGGER update_artikel_updated_at
    BEFORE UPDATE ON artikel
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 6. Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE artikel ENABLE ROW LEVEL SECURITY;

-- Policies untuk tabel users
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert themselves" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (auth.uid()::text = users_id::text);
CREATE POLICY "Users can delete their own data" ON users FOR DELETE USING (auth.uid()::text = users_id::text);

-- Policies untuk tabel artikel  
CREATE POLICY "Anyone can view articles" ON artikel FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert articles" ON artikel FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update articles" ON artikel FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete articles" ON artikel FOR DELETE USING (auth.role() = 'authenticated');

-- 7. Insert sample data (opsional)
-- Users sample
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', '$2b$10$example.hash.here', 'admin'),
('Regular User', 'user@example.com', '$2b$10$example.hash.here', 'user')
ON CONFLICT (email) DO NOTHING;

-- Artikel sample
INSERT INTO artikel (judul, link_artikel, content_artikel) VALUES 
('Welcome Article', 'https://example.com/welcome', 'This is a welcome article for the law website.'),
('Legal Services Overview', 'https://example.com/services', 'Overview of our comprehensive legal services.')
ON CONFLICT DO NOTHING;

-- 8. Grants dan permissions (jika diperlukan)
-- GRANT USAGE ON SCHEMA public TO anon, authenticated;
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
-- GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

COMMENT ON TABLE users IS 'Table for storing user accounts and authentication data';
COMMENT ON TABLE artikel IS 'Table for storing law articles and blog posts';

-- Selesai!
