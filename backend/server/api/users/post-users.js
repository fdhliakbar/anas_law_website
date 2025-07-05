import pool from "../../utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const body = await readBody(event).catch(() => ({}));

  if (method === "POST" && body.action === "register") {
    const { name, email, password, confirmPassword, role } = body;
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedRoles = ["users", "admin"];

    if (!name) {
      errors.push("Nama Wajib Diisi");
    }
    if (!email) {
      errors.push("Email wajib diisi");
    } else if (!emailRegex.test(email)) {
      errors.push("Format email tidak valid");
    }
    if (!password) {
      errors.push("Password wajib diisi");
    } else if (password.length < 8) {
      errors.push("Password minimal 8 karakter");
    } else if (password !== confirmPassword) {
      errors.push("Konfirmasi password tidak cocok");
    }
    if (!role) {
      errors.push("Role Wajib diisi");
    } else if (!allowedRoles.includes(role)) {
      errors.push("Role tidak valid");
    }

    if (errors.length > 0) {
      return {
        statusCode: 400,
        message: "Input tidak valid",
        errors: errors,
      };
    }

    try {
      const existingUser = await pool.query(
        "SELECT users_id FROM users WHERE email = $1",
        [email],
      );

      if (existingUser.rows.length > 0) {
        return {
          statusCode: 409,
          message: "Email ini sudah terdaftar",
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUserResult = await pool.query(
        `INSERT INTO users(name, email, password, role) 
         VALUES($1, $2, $3, $4) 
         RETURNING users_id, name, email, role`,
        [name, email, hashedPassword, role],
      );

      return {
        statusCode: 201,
        message: "User berhasil ditambahkan",
        user: newUserResult.rows[0],
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        message: "Terjadi kesalahan pada server",
      };
    }
  }

  if (method === "POST" && body.action === "login") {
    const { email, password } = body;

    if (!email || !password) {
      return { statusCode: 400, message: "Email dan password wajib diisi" };
    }
    try {
      const userResult = await pool.query(
        "SELECT users_id, name, email, password, role FROM users WHERE email = $1",
        [email],
      );
      if (userResult.rows.length === 0) {
        return { statusCode: 401, message: "Email atau password salah" };
      }

      const user = userResult.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return { statusCode: 401, message: "Email atau password salah" };
      }

      // --- PERBAIKAN DIMULAI DI SINI ---

      const payload = {
        users_id: user.users_id, // FIX 1: Nama properti dan referensi diperbaiki
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d", // FIX 2: Nilai diubah ke format waktu yang valid
      });

      // --- PERBAIKAN SELESAI ---

      return {
        message: "Login berhasil",
        token: token,
      };
    } catch (error) {
      console.error(error);
      return { statusCode: 500, message: "Terjadi kesalahan pada server" };
    }
  }
});
