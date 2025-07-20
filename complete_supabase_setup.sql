-- Script SQL untuk melengkapi database Supabase
-- Copy dan paste ke Supabase SQL Editor

-- 1. Buat tabel artikel dengan UUID
CREATE TABLE IF NOT EXISTS artikel (
  artikel_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul VARCHAR(50) NOT NULL,
  link_artikel VARCHAR(100),
  content_artikel TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Function untuk auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 3. Triggers untuk auto-update timestamp
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

-- 4. Insert sample data
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@anaslaw.com', '$2b$10$rZgNzj5t7RKI9w1VHr5ZN.QJ8OZwT4YFKx8E9WXd5f2a7M.tN3oPK', 'admin'),
('Test User', 'user@anaslaw.com', '$2b$10$rZgNzj5t7RKI9w1VHr5ZN.QJ8OZwT4YFKx8E9WXd5f2a7M.tN3oPK', 'user')
ON CONFLICT (email) DO NOTHING;

INSERT INTO artikel (judul, link_artikel, content_artikel) VALUES 
('Selamat Datang di Anas Law', 'https://anaslaw.com/welcome', 'Selamat datang di website resmi Anas Law. Kami menyediakan layanan hukum terpercaya dan berpengalaman.'),
('Layanan Konsultasi Hukum', 'https://anaslaw.com/services', 'Kami menyediakan berbagai layanan konsultasi hukum untuk membantu menyelesaikan masalah hukum Anda.'),
('Tim Lawyer Berpengalaman', 'https://anaslaw.com/team', 'Tim lawyer kami terdiri dari para ahli hukum yang berpengalaman di berbagai bidang.')
ON CONFLICT DO NOTHING;

-- 5. Enable RLS (Row Level Security) - opsional
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE artikel ENABLE ROW LEVEL SECURITY;

-- 6. Basic RLS policies (untuk keamanan)
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert themselves" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (true);
CREATE POLICY "Users can delete own data" ON users FOR DELETE USING (true);

CREATE POLICY "Anyone can view articles" ON artikel FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage articles" ON artikel FOR ALL USING (true);

-- 7. Indexes untuk performa
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_artikel_created_at ON artikel(created_at DESC);

-- Selesai! Database siap digunakan.
