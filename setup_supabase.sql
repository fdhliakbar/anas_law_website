-- COPY DAN PASTE SCRIPT INI KE SUPABASE SQL EDITOR

-- 1. Tabel Users
CREATE TABLE IF NOT EXISTS users (
    users_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
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

-- 3. Insert sample data
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', '$2b$10$example.hash.here', 'admin'),
('Test User', 'user@example.com', '$2b$10$example.hash.here', 'user')
ON CONFLICT (email) DO NOTHING;

INSERT INTO artikel (judul, link_artikel, content_artikel) VALUES 
('Welcome Article', 'https://example.com/welcome', 'This is a welcome article for the law website.'),
('Legal Services', 'https://example.com/services', 'Overview of our legal services.')
ON CONFLICT DO NOTHING;
