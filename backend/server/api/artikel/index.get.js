import pool from '../../utils/db';


export default defineEventHandler(async (event) => {
    try {
        const res = await pool.query('SELECT * FROM artikel');
        return {
            success : true,
            artikel: res.rows,
        };
    } catch (error) {
    console.error('Database error:', error);
    return {
      success: false,
      message: 'Gagal mengambil data artiekl',
    };
  }
})