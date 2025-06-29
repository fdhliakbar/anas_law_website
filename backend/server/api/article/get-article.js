import pool from "../../utils/db.js";

export default defineEventHandler(async (event) => {
  try {
    // Ambil query parameters
    const query = getQuery(event);
    const { artikel_id, limit = 10, offset = 0 } = query;

    let sqlQuery;
    let values = [];

    if (artikel_id) {
      // Get artikel by ID
      sqlQuery = `
        SELECT artikel_id, judul, link_artikel, content_artikel
        FROM artikel 
        WHERE artikel_id = $1
      `;
      values = [artikel_id];
    } else {
      // Get all artikel with pagination
      sqlQuery = `
        SELECT artikel_id, judul, link_artikel, content_artikel
        FROM artikel 
        ORDER BY artikel_id DESC
        LIMIT $1 OFFSET $2
      `;
      values = [parseInt(limit), parseInt(offset)];
    }

    const result = await pool.query(sqlQuery, values);

    if (artikel_id && result.rows.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Artikel tidak ditemukan'
      });
    }

    // Get total count for pagination
    let totalCount = 0;
    if (!artikel_id) {
      const countResult = await pool.query('SELECT COUNT(*) FROM artikel');
      totalCount = parseInt(countResult.rows[0].count);
    }

    return {
      success: true,
      data: artikel_id ? result.rows[0] : result.rows,
      ...(artikel_id ? {} : {
        pagination: {
          total: totalCount,
          limit: parseInt(limit),
          offset: parseInt(offset),
          totalPages: Math.ceil(totalCount / parseInt(limit))
        }
      })
    };

  } catch (error) {
    console.error('Error getting articles:', error);
    
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Terjadi kesalahan server internal'
    });
  }
});