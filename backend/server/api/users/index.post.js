import pool from '../../utils/db'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const {name, email, password, role } = body

  // Validasi sederhana
  if (!name || !email || !password || !role) {
    return {
      statusCode: 400,
      message: 'Semua field wajib diisi.'
    }
  }   

  try {

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4,) RETURNING *',
      [name, email, hashedPassword, role]
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
