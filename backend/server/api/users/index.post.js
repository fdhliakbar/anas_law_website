import pool from "../../utils/db";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, email, password, role } = body;

  // Validasi sederhana
  if (!name || !email || !password || !role) {
    return {
      statusCode: 400,
      message: "Semua field wajib diisi.",
    };
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      message: "Format email tidak valid.",
    };
  }

  // Validasi password (minimal 8 karakter)
  if (password.length < 8) {
    return {
      statusCode: 400,
      message: "Password harus minimal 8 karakter.",
    };
  }

  try {
    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return {
        statusCode: 400,
        message: "Email sudah terdaftar.",
      };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Fixed the SQL query (removed extra comma after $4)
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, role]
    );

    // Don't return password in response
    const { password: _, ...userWithoutPassword } = result.rows[0];

    return {
      statusCode: 201,
      message: "User berhasil ditambahkan.",
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "Terjadi kesalahan pada server.",
    };
  }
});
