import { supabase } from '../config/supabase.js'

export const getUsers = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query

    const { data, error } = await supabase
      .from('users')
      .select('users_id, name, email, role, created_at')
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1)

    if (error) {
      console.error('Get users error:', error)
      throw error
    }

    res.json({
      success: true,
      data,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: data.length
      }
    })
  } catch (error) {
    console.error('Error getting users:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data users',
      error: error.message
    })
  }
}

export const getUserById = async (req, res) => {
  try {
    const { users_id } = req.params

    const { data, error } = await supabase
      .from('users')
      .select('users_id, name, email, role, created_at')
      .eq('users_id', users_id)
      .single()

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      })
    }

    res.json({
      success: true,
      data
    })
  } catch (error) {
    console.error('Error getting user by id:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data user',
      error: error.message
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { users_id } = req.params
    const { name, email, role } = req.body

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name dan email harus diisi'
      })
    }

    const updateData = { 
      name, 
      email,
      updated_at: new Date().toISOString()
    }

    // Only admin can change role
    if (req.user.role === 'admin' && role) {
      updateData.role = role
    }

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('users_id', users_id)
      .select('users_id, name, email, role, updated_at')

    if (error) {
      console.error('Update user error:', error)
      throw error
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      })
    }

    res.json({
      success: true,
      message: 'User berhasil diupdate',
      data: data[0]
    })
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal update user',
      error: error.message
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { users_id } = req.params

    // Prevent admin from deleting themselves
    if (req.user.id === users_id) {
      return res.status(400).json({
        success: false,
        message: 'Tidak bisa menghapus akun sendiri'
      })
    }

    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('users_id', users_id)
      .select()

    if (error) {
      console.error('Delete user error:', error)
      throw error
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      })
    }

    res.json({
      success: true,
      message: 'User berhasil dihapus'
    })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({
      success: false,
      message: 'Gagal hapus user',
      error: error.message
    })
  }
}
