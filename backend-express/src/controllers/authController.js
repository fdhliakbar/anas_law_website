import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabase } from '../config/supabase.js'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, dan password harus diisi'
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password minimal 6 karakter'
      })
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah terdaftar'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Insert user
    const { data, error } = await supabase
      .from('users')
      .insert([{ 
        name, 
        email, 
        password: hashedPassword,
        role: 'user'
      }])
      .select('users_id, name, email, role')

    if (error) {
      console.error('Register error:', error)
      throw error
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: data[0].users_id, 
        email: data[0].email, 
        role: data[0].role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      token,
      user: {
        id: data[0].users_id,
        name: data[0].name,
        email: data[0].email,
        role: data[0].role
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal registrasi',
      error: error.message
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password harus diisi'
      })
    }

    // Get user by email
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !data) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, data.password)
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: data.users_id, 
        email: data.email, 
        role: data.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({
      success: true,
      message: 'Login berhasil',
      token,
      user: {
        id: data.users_id,
        name: data.name,
        email: data.email,
        role: data.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal login',
      error: error.message
    })
  }
}

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id

    const { data, error } = await supabase
      .from('users')
      .select('users_id, name, email, role, created_at')
      .eq('users_id', userId)
      .single()

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      })
    }

    res.json({
      success: true,
      user: {
        id: data.users_id,
        name: data.name,
        email: data.email,
        role: data.role,
        created_at: data.created_at
      }
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil profil',
      error: error.message
    })
  }
}
