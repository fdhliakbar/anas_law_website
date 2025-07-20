import express from 'express'
import { 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from '../controllers/userController.js'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authenticateToken)

// Admin-only routes
router.get('/', requireAdmin, getUsers) // GET /api/users
router.get('/:users_id', requireAdmin, getUserById) // GET /api/users/:id
router.put('/:users_id', requireAdmin, updateUser) // PUT /api/users/:id  
router.delete('/:users_id', requireAdmin, deleteUser) // DELETE /api/users/:id

export default router
