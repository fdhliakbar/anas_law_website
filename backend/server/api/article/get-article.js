import database from "../../utils/database.js";

export default defineEventHandler(async (event) => {
  try {
    // Ambil query parameters
    const query = getQuery(event);
    const { artikel_id, limit = 10, offset = 0 } = query;

    let result;

    if (artikel_id) {
      // Get artikel by ID
      result = await database.getArticleById(artikel_id);
      
      if (result.rows.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Artikel tidak ditemukan'
        });
      }
    } else {
      // Get all artikel with pagination
      result = await database.getArticles(parseInt(limit), parseInt(offset));
    }

    // Get total count for pagination (hanya jika tidak mencari artikel spesifik)
    let totalCount = 0;
    if (!artikel_id) {
      const countResult = await database.getArticleCount();
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