import pool from "../../utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const {nama, experience, bio, photo_url, users } = body;

  if (!nama || !experience || !bio || !photo_url || !users) {
    return {
      statusCode: 400,
      message: "Semua field wajib di isi",
    };
  }

  try {
    const result = await pool.query(
      "INSERT INTO lawyers (nama, experience, bio, photo_url, users) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nama, experience, bio, photo_url, users]
    );

    return {
      message: "Lawyer berhasil di tambahkan",
      user: result.rows[0],
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "terjadi kesalahan server",
      error: error.message,
    };
  }
});
