import pool from '../../utils/db'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { id, name, email, password, role } = body

  // Validasi sederhana
  if (!id || !name || !email || !password || !role) {
    return {
      statusCode: 400,
      message: 'Semua field wajib diisi.'
    }
  }   

  try {

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const result = await pool.query(
      'INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, name, email, hashedPassword, role]
    )

    return {
      message: 'User berhasil ditambahkan.',
      user: result.rows[0]
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      message: 'Terjadi kesalahan pada server.'
    }
  }
})
