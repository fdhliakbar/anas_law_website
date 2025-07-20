import database from "../../utils/database.js";

export default defineEventHandler(async (event) => {
  try {
    // Hanya terima method PUT atau PATCH
    if (!['PUT', 'PATCH'].includes(event.node.req.method)) {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      });
    }

    // Ambil data dari request body
    const body = await readBody(event);
    const { artikel_id, judul, link_artikel, content_artikel } = body;

    // Validasi artikel_id wajib ada
    if (!artikel_id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'artikel_id wajib diisi'
      });
    }

    // Cek apakah artikel ada
    const checkResult = await database.getArticleById(artikel_id);
    
    if (checkResult.rows.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Artikel tidak ditemukan'
      });
    }

    // Validasi minimal ada satu field yang akan diupdate
    if (judul === undefined && link_artikel === undefined && content_artikel === undefined) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Minimal harus ada satu field yang akan diupdate'
      });
    }

    // Validasi input
    if (judul !== undefined) {
      if (!judul || judul.trim().length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Judul tidak boleh kosong'
        });
      }
      if (judul.length > 50) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Judul tidak boleh lebih dari 50 karakter'
        });
      }
    }

    if (link_artikel !== undefined) {
      if (link_artikel && link_artikel.length > 100) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Link artikel tidak boleh lebih dari 100 karakter'
        });
      }
    }

    if (content_artikel !== undefined) {
      if (!content_artikel || content_artikel.trim().length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Content artikel tidak boleh kosong'
        });
      }
    }

    // Update artikel menggunakan database service
    const updates = {};
    if (judul !== undefined) updates.judul = judul.trim();
    if (link_artikel !== undefined) updates.link_artikel = link_artikel ? link_artikel.trim() : null;
    if (content_artikel !== undefined) updates.content_artikel = content_artikel.trim();

    const result = await database.updateArticle(artikel_id, updates);

    return {
      success: true,
      message: 'Artikel berhasil diupdate',
      data: result.rows[0]
    };

  } catch (error) {
    console.error('Error updating article:', error);
    
    if (error.statusCode) {
      throw error;
    }

    // Handle database constraints
    if (error.code === '23514') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Data tidak sesuai dengan format yang diharapkan'
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Terjadi kesalahan server internal'
    });
  }
});
