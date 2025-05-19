import pool from '../../utils/db';


export default defineEventHandler(async (event) => {
  const id = event.context.params.id

  if (!id) {
    return {
      statusCode: 400,
      message: 'ID user wajib disertakan.'
    }
  }

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id])

    if (result.rowCount === 0) {
      return {
        statusCode: 404,
        message: 'User tidak ditemukan.'
      }
    }

    return {
      message: 'User berhasil dihapus.',
      deletedUser: result.rows[0]
    }
  } catch (error) {
    console.error('Error delete user:', error)
    return {
      statusCode: 500,
      message: 'Terjadi kesalahan pada server.'
    }
  }
})