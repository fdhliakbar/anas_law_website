# Anas Law Firm Backend API

Backend API untuk website Anas Law Firm menggunakan Express.js dan Supabase.

## Features

- 🔐 Authentication (Register/Login dengan JWT)
- 📄 CRUD Artikel dengan upload gambar
- 👥 User Management (Admin only)
- 🗄️ Database Supabase PostgreSQL
- 🚀 Deploy-ready untuk Railway

## Tech Stack

- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer
- **Deployment**: Railway

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Articles
- `GET /api/articles` - Get semua artikel (public)
- `POST /api/articles` - Create artikel baru (admin only)
- `PUT /api/articles/:id` - Update artikel (admin only)
- `DELETE /api/articles/:id` - Delete artikel (admin only)

### Users (Admin Only)
- `GET /api/users` - Get semua users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Environment Variables

```env
NODE_ENV=production
PORT=3001

# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT
JWT_SECRET=your-jwt-secret

# Frontend URL (untuk CORS)
FRONTEND_URL=https://anaslawfirm.com
```

## Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dengan credentials Anda

# Run development server
npm run dev

# Run production server
npm start
```

## Database Schema

Jalankan SQL ini di Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  users_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles table
CREATE TABLE artikel (
  artikel_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  judul TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  gambar TEXT,
  link_artikel TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Deploy ke Railway

1. Push repository ke GitHub
2. Connect Railway dengan GitHub repo
3. Set environment variables di Railway dashboard
4. Deploy otomatis

## Default Admin User

- Email: `admin@anaslawfirm.com`
- Password: `admin123`

## Usage Examples

### Register User
```javascript
fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
})
```

### Login
```javascript
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@anaslawfirm.com',
    password: 'admin123'
  })
})
```

### Get Articles
```javascript
fetch('/api/articles')
  .then(res => res.json())
  .then(data => console.log(data))
```

### Create Article (Admin)
```javascript
const formData = new FormData()
formData.append('judul', 'Judul Artikel')
formData.append('deskripsi', 'Deskripsi artikel...')
formData.append('link_artikel', 'https://example.com')
formData.append('gambar', file) // File object

fetch('/api/articles', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
})
```
