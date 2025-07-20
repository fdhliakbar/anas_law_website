import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './src/routes/auth.js'
import articleRoutes from './src/routes/articles.js'
import userRoutes from './src/routes/users.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // Dev frontend
    'https://yourdomain.com', // Production frontend URL
    process.env.FRONTEND_URL
  ],
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static files untuk uploads
app.use('/uploads', express.static('uploads'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/users', userRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Anas Law Backend API',
    status: 'running',
    version: '1.0.0'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`)
})