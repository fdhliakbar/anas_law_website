import database from "../../utils/database.js";

export default defineEventHandler(async (event) => {
  // Add CORS headers
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PUT,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  if (event.node.req.method === "OPTIONS") {
    return "";
  }

  try {
    // Hanya terima method PUT atau PATCH
    if (!["PUT", "PATCH"].includes(event.node.req.method)) {
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed",
      });
    }

    // Ambil data dari request body
    const body = await readBody(event);
    const { artikel_id, judul, deskripsi, link_artikel, content_artikel } =
      body;

    // Validasi artikel_id wajib ada
    if (!artikel_id) {
      throw createError({
        statusCode: 400,
        statusMessage: "artikel_id wajib diisi",
      });
    }

    if (!judul && !deskripsi && !link_artikel && !content_artikel) {
      throw createError({
        statusCode: 400,
        statusMessage:
          "Minimal harus ada judul, deskripsi, link_artikel, atau content_artikel yang akan diupdate.",
      });
    }

    // Cek apakah artikel ada
    const checkQuery = 'SELECT artikel_id FROM artikel WHERE artikel_id = $1';
    const checkResult = await pool.query(checkQuery, [artikel_id]);
    
    if (checkResult.rows.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Artikel tidak ditemukan",
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
          statusMessage: "Judul tidak boleh lebih dari 50 karakter",
        });
      }
    }

    if (deskripsi !== undefined) {
      if (!deskripsi || deskripsi.trim().length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: "Deskripsi tidak boleh kosong",
        });
      }
      updateFields.push(`deskripsi = $${paramCounter}`);
      values.push(deskripsi.trim());
      paramCounter++;
    }

    if (link_artikel !== undefined) {
      if (link_artikel && link_artikel.length > 100) {
        throw createError({
          statusCode: 400,
          statusMessage: "Link artikel tidak boleh lebih dari 100 karakter",
        });
      }
    }

    if (content_artikel !== undefined) {
      if (!content_artikel || content_artikel.trim().length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: "Content artikel tidak boleh kosong",
        });
      }
      updateFields.push(`content_artikel = $${paramCounter}`);
      values.push(content_artikel.trim());
      paramCounter++;
    }

    if (updateFields.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tidak ada field yang akan diupdate'
      });
    }

    // Add artikel_id to values for WHERE clause
    values.push(artikel_id);

    // Execute update query
    const updateQuery = `
      UPDATE artikel 
      SET ${updateFields.join(', ')}
      WHERE artikel_id = $${paramCounter}
      RETURNING artikel_id, judul, link_artikel, content_artikel
    `;

    const result = await database.updateArticle(artikel_id, updates);

    return {
      success: true,
      message: "Artikel berhasil diupdate",
      data: result.rows[0],
    };
  } catch (error) {
    console.error("Error updating article:", error);

    if (error.statusCode) {
      throw error;
    }

    // Handle database constraints
    if (error.code === "23514") {
      throw createError({
        statusCode: 400,
        statusMessage: "Data tidak sesuai dengan format yang diharapkan",
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Terjadi kesalahan server internal",
    });
  }
});
