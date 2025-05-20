// server/api/users/index.js
import pool from '../../utils/db';

export default defineEventHandler(async (event) => {
  try {
    const res = await pool.query('SELECT * FROM lawyers');
    return {
      success: true,
      lawyers: res.rows,
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      success: false,
      message: 'Gagal mengambil data users',
    };
  }
});
