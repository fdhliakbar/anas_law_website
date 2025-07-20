import express from 'express'
import { 
  createArticle, 
  getArticles, 
  updateArticle, 
  deleteArticle,
  upload 
} from '../controllers/articleController.js'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/', getArticles) // GET /api/articles

// Protected routes (admin only)
router.post('/', authenticateToken, requireAdmin, upload.single('gambar'), createArticle)
router.put('/:artikel_id', authenticateToken, requireAdmin, upload.single('gambar'), updateArticle)
router.delete('/:artikel_id', authenticateToken, requireAdmin, deleteArticle)

export default router
