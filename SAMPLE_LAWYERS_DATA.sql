-- SAMPLE LAWYERS DATA
-- Query untuk menambahkan sample data lawyers ke database

-- Insert sample lawyers yang sesuai dengan gambar
INSERT INTO lawyers (name, specialty, experience, rating, fee, old_fee, photo, available, created_at) VALUES
('Muhammad Ainun Najib Surahman, S.H., LLM', 'Founder & Managing Partner', 5, 5, 1500000, 2000000, '/uploads/lawyers/lawyer1.jpg', true, CURRENT_TIMESTAMP),
('Anggi Saputra, S.H., LLM.', 'Founder and Managing Partner', 4, 5, 1200000, 1500000, '/uploads/lawyers/lawyer2.jpg', true, CURRENT_TIMESTAMP),
('Wahyudi, S.H., M.H. Kes', 'Senior Partner', 4, 5, 1300000, 1600000, '/uploads/lawyers/lawyer3.jpg', true, CURRENT_TIMESTAMP),
('Dewi Indri Lestari, S.H.', 'Partner', 4, 4, 1000000, 1200000, '/uploads/lawyers/lawyer4.jpg', true, CURRENT_TIMESTAMP),
('Durohim Amnan, S.H., M.H.', 'Partner', 6, 5, 1400000, 1700000, '/uploads/lawyers/lawyer5.jpg', true, CURRENT_TIMESTAMP),
('Lalu Hartawan Mandala Putra, S.H., C.me.', 'Partner', 3, 5, 1100000, 1300000, '/uploads/lawyers/lawyer6.jpg', true, CURRENT_TIMESTAMP);

-- Lawyers untuk spesialisasi yang berbeda
INSERT INTO lawyers (name, specialty, experience, rating, fee, old_fee, photo, available, created_at) VALUES
('Dr. Ahmad Fauzi, S.H., M.H.', 'Hukum Pidana', 15, 5, 2000000, 2500000, '/uploads/lawyers/lawyer7.jpg', true, CURRENT_TIMESTAMP),
('Sari Dewi Purnama, S.H., LLM', 'Hukum Keluarga', 8, 4, 1200000, 1500000, '/uploads/lawyers/lawyer8.jpg', true, CURRENT_TIMESTAMP),
('Bambang Wijaya, S.H., M.H.', 'Hukum Bisnis', 12, 5, 1800000, 2200000, '/uploads/lawyers/lawyer9.jpg', true, CURRENT_TIMESTAMP),
('Rina Sartika, S.H.', 'Hukum Perburuhan', 6, 4, 1000000, 1200000, '/uploads/lawyers/lawyer10.jpg', true, CURRENT_TIMESTAMP),
('Hendro Gunawan, S.H., M.H.', 'Hukum Properti', 10, 5, 1600000, 2000000, '/uploads/lawyers/lawyer11.jpg', true, CURRENT_TIMESTAMP),
('Maya Kusuma, S.H., LLM', 'Hukum Internasional', 7, 4, 1400000, 1700000, '/uploads/lawyers/lawyer12.jpg', true, CURRENT_TIMESTAMP);

-- Lawyers junior
INSERT INTO lawyers (name, specialty, experience, rating, fee, old_fee, photo, available, created_at) VALUES
('Andi Pratama, S.H.', 'Associate Lawyer', 2, 4, 800000, 1000000, '/uploads/lawyers/lawyer13.jpg', true, CURRENT_TIMESTAMP),
('Fitri Handayani, S.H.', 'Junior Associate', 1, 4, 600000, 800000, '/uploads/lawyers/lawyer14.jpg', true, CURRENT_TIMESTAMP),
('Rudi Hermawan, S.H.', 'Legal Consultant', 3, 4, 900000, 1100000, '/uploads/lawyers/lawyer15.jpg', true, CURRENT_TIMESTAMP);

-- Update existing lawyer data if needed
UPDATE lawyers SET 
    specialty = CASE 
        WHEN name LIKE '%Ainun%' THEN 'Corporate Law & Litigation'
        WHEN name LIKE '%Anggi%' THEN 'Business Law & Contract'
        WHEN name LIKE '%Wahyudi%' THEN 'Criminal Law & Defense'
        WHEN name LIKE '%Dewi%' THEN 'Family Law & Divorce'
        WHEN name LIKE '%Durohim%' THEN 'Labor Law & Employment'
        WHEN name LIKE '%Lalu%' THEN 'Property Law & Real Estate'
        ELSE specialty
    END
WHERE lawyer_id IN (SELECT lawyer_id FROM lawyers LIMIT 6);
