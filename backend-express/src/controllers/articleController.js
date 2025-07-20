import { supabase } from '../config/supabase.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Setup multer untuk upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
    cb(null, uniqueName)
  }
})

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('File harus berupa gambar'), false)
  }
}

export const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
})

export const createArticle = async (req, res) => {
  try {
    const { judul, deskripsi, link_artikel } = req.body
    const gambar = req.file ? `/uploads/${req.file.filename}` : null

    const { data, error } = await supabase
      .from('artikel')
      .insert([
        { 
          judul, 
          deskripsi, 
          gambar,
          link_artikel,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) throw error

    res.status(201).json({
      success: true,
      message: 'Artikel berhasil dibuat',
      data: data[0]
    })
  } catch (error) {
    console.error('Error creating article:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal membuat artikel',
      error: error.message
    })
  }
}

export const getArticles = async (req, res) => {
  try {
    const { artikel_id, limit = 10, offset = 0 } = req.query

    let query = supabase
      .from('artikel')
      .select('*')
      .order('created_at', { ascending: false })

    if (artikel_id) {
      query = query.eq('artikel_id', artikel_id).single()
    } else {
      query = query.range(offset, offset + limit - 1)
    }

    const { data, error } = await query

    if (error) throw error

    // Add full URL for images
    const baseUrl = process.env.RAILWAY_STATIC_URL || `${req.protocol}://${req.get('host')}`
    
    const processedData = Array.isArray(data) 
      ? data.map(article => ({
          ...article,
          gambar: article.gambar ? `${baseUrl}${article.gambar}` : null
        }))
      : { ...data, gambar: data.gambar ? `${baseUrl}${data.gambar}` : null }

    res.json({
      success: true,
      data: processedData,
      ...(artikel_id ? {} : { 
        pagination: { 
          limit: parseInt(limit), 
          offset: parseInt(offset) 
        } 
      })
    })
  } catch (error) {
    console.error('Error getting articles:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil artikel',
      error: error.message
    })
  }
}

export const updateArticle = async (req, res) => {
  try {
    const { artikel_id } = req.params
    const { judul, deskripsi, link_artikel } = req.body

    const { data, error } = await supabase
      .from('artikel')
      .update({ 
        judul, 
        deskripsi, 
        link_artikel,
        updated_at: new Date().toISOString()
      })
      .eq('artikel_id', artikel_id)
      .select()

    if (error) throw error

    res.json({
      success: true,
      message: 'Artikel berhasil diupdate',
      data: data[0]
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal update artikel',
      error: error.message
    })
  }
}

export const deleteArticle = async (req, res) => {
  try {
    const { artikel_id } = req.params

    const { error } = await supabase
      .from('artikel')
      .delete()
      .eq('artikel_id', artikel_id)

    if (error) throw error

    res.json({
      success: true,
      message: 'Artikel berhasil dihapus'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal hapus artikel',
      error: error.message
    })
  }
}