import pool from "../../utils/db.js";

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  if (event.node.req.method === "OPTIONS") {
    return "";
  }

  try {
    if (event.node.req.method !== "POST") {
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed",
      });
    }

    // Parse multipart form
    const form = new IncomingForm({
      uploadDir: "./public/uploads",
      keepExtensions: true,
    });
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    console.log("FIELDS:", fields);
    console.log("FILES:", files);

    const judul = fields.judul?.toString().trim();
    const deskripsi = fields.deskripsi?.toString().trim();
    const link_artikel = fields.link_artikel
      ? fields.link_artikel.toString().trim()
      : null;
    const gambarFile = Array.isArray(files.gambar)
      ? files.gambar[0]
      : files.gambar;

    if (!judul || !deskripsi || !gambarFile || !gambarFile.filepath) {
      throw createError({
        statusCode: 400,
        statusMessage: "Semua field wajib diisi dan file gambar harus valid",
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

    if (error.statusCode) throw error;
    if (error.code === "23505") {
      throw createError({
        statusCode: 409,
        statusMessage: "Artikel dengan judul tersebut sudah ada",
      });
    }
    if (error.code === "23514") {
      throw createError({
        statusCode: 400,
        statusMessage: "Data tidak sesuai dengan format yang diharapkan",
      });
    }
    if (error.code === "23502") {
      throw createError({
        statusCode: 400,
        statusMessage: "Data wajib tidak boleh kosong",
      });
    }
    if (error.code === "22001") {
      throw createError({
        statusCode: 400,
        statusMessage: "Data melebihi panjang maksimum yang diizinkan",
      });
    }
    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      throw createError({
        statusCode: 503,
        statusMessage: "Database tidak dapat diakses",
      });
    }
    if (error.code) {
      throw createError({
        statusCode: 500,
        statusMessage: "Terjadi kesalahan database",
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Terjadi kesalahan server internal",
    });
  }
});
