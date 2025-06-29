import pool from "../../utils/db.js";

export default defineEventHandler(async (event) => {
  try {
    // Hanya terima method POST
    if (event.node.req.method !== "POST") {
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed",
      });
    }

    // Ambil data dari request body
    const body = await readBody(event);

    // Validasi input yang diperlukan
    if (!body.judul || !body.content_artikel) {
      throw createError({
        statusCode: 400,
        statusMessage: "Judul dan content artikel wajib diisi",
      });
    }

    // Sanitasi input
    const judul = body.judul.toString().trim();
    const content_artikel = body.content_artikel.toString().trim();
    const link_artikel = body.link_artikel
      ? body.link_artikel.toString().trim()
      : null;

    // Validasi panjang data sesuai dengan constraint database
    if (judul.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Judul tidak boleh kosong",
      });
    }

    if (judul.length > 50) {
      throw createError({
        statusCode: 400,
        statusMessage: "Judul tidak boleh lebih dari 50 karakter",
      });
    }

    if (content_artikel.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Content artikel tidak boleh kosong",
      });
    }

    if (link_artikel && link_artikel.length > 100) {
      throw createError({
        statusCode: 400,
        statusMessage: "Link artikel tidak boleh lebih dari 100 karakter",
      });
    }

    // Validasi format URL jika link_artikel ada
    if (link_artikel) {
      const urlPattern =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(link_artikel)) {
        throw createError({
          statusCode: 400,
          statusMessage: "Format link artikel tidak valid",
        });
      }
    }

    // Query untuk insert artikel baru dengan timestamp
    const query = `
      INSERT INTO artikel (judul, link_artikel, content_artikel, created_at, updated_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING artikel_id, judul, link_artikel, content_artikel, created_at, updated_at
    `;

    const values = [judul, link_artikel, content_artikel];

    // Eksekusi query dalam transaksi
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const result = await client.query(query, values);

      if (result.rows.length === 0) {
        throw createError({
          statusCode: 500,
          statusMessage: "Gagal menyimpan artikel",
        });
      }

      await client.query("COMMIT");

      const newArticle = result.rows[0];

      // Return response sukses
      return {
        success: true,
        message: "Artikel berhasil disimpan",
        data: {
          artikel_id: newArticle.artikel_id,
          judul: newArticle.judul,
          link_artikel: newArticle.link_artikel,
          content_artikel: newArticle.content_artikel,
          created_at: newArticle.created_at,
          updated_at: newArticle.updated_at,
        },
      };
    } catch (dbError) {
      await client.query("ROLLBACK");
      throw dbError;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error posting article:", error);

    // Jika error sudah di-handle oleh createError, lempar ulang
    if (error.statusCode) {
      throw error;
    }

    // Handle error database constraint
    if (error.code === "23505") {
      // Unique violation
      throw createError({
        statusCode: 409,
        statusMessage: "Artikel dengan judul tersebut sudah ada",
      });
    }

    if (error.code === "23514") {
      // Check constraint violation
      throw createError({
        statusCode: 400,
        statusMessage: "Data tidak sesuai dengan format yang diharapkan",
      });
    }

    if (error.code === "23502") {
      // Not null violation
      throw createError({
        statusCode: 400,
        statusMessage: "Data wajib tidak boleh kosong",
      });
    }

    if (error.code === "22001") {
      // String data too long
      throw createError({
        statusCode: 400,
        statusMessage: "Data melebihi panjang maksimum yang diizinkan",
      });
    }

    // Connection errors
    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      throw createError({
        statusCode: 503,
        statusMessage: "Database tidak dapat diakses",
      });
    }

    // Generic database error
    if (error.code) {
      throw createError({
        statusCode: 500,
        statusMessage: "Terjadi kesalahan database",
      });
    }

    // Generic server error
    throw createError({
      statusCode: 500,
      statusMessage: "Terjadi kesalahan server internal",
    });
  }
});
