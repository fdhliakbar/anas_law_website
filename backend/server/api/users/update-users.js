// file: server/api/users/update-users.js

import database from "../../utils/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "PUT") {
    return { statusCode: 405, message: "Method Not Allowed" };
  }

  // --- LANGKAH 1: AUTENTIKASI ---
  const authHeader = event.node.req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { statusCode: 401, message: "Akses ditolak. Token tidak tersedia." };
  }
  const token = authHeader.split(" ")[1];

  let loggedInUser;
  try {
    loggedInUser = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return {
      statusCode: 401,
      message: "Token tidak valid atau sudah kadaluwarsa.",
    };
  }

  // --- LANGKAH 2: DAPATKAN DATA DARI BODY & TOKEN ---
  const body = await readBody(event);
  const { name, email, password, confirmPassword } = body; // HAPUS: Tidak perlu lagi id_to_update dari body

  // BARU: ID pengguna yang akan diupdate diambil langsung dari token yang sudah terverifikasi.
  const id_to_update = loggedInUser.users_id;

  if (!name && !email && !password) {
    return {
      statusCode: 400,
      message:
        "Minimal harus ada nama, email, atau password yang akan diupdate.",
    };
  }

  // --- LANGKAH 3: OTORISASI (Sudah Otomatis) ---
  // Karena kita mengambil ID dari token, kita tidak perlu lagi mengecek hak akses.
  // Pengguna dijamin hanya bisa mengupdate datanya sendiri.

  // --- LANGKAH 4: PROSES KE DATABASE ---
  try {
    // Validasi email baru jika ada
    if (email) {
      const emailCheck = await database.checkEmailExists(email, id_to_update);
      if (emailCheck.rows.length > 0) {
        return {
          statusCode: 409,
          message: "Email baru sudah digunakan oleh pengguna lain.",
        };
      }
    }

    // Validasi password jika ingin diubah
    let hashedPassword = null;
    if (password) {
      if (password.length < 8) {
        return {
          statusCode: 400,
          message: "Password minimal 8 karakter.",
        };
      }
      if (password !== confirmPassword) {
        return {
          statusCode: 400,
          message: "Konfirmasi password tidak cocok.",
        };
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user menggunakan database service
    const result = await database.updateUser(id_to_update, {
      name,
      email,
      password: hashedPassword
    });

    return {
      statusCode: 200,
      message: "Profil berhasil diupdate.",
      user: result.rows[0],
    };
  } catch (error) {
    console.error("Update user error:", error);
    return { statusCode: 500, message: "Terjadi kesalahan pada server." };
  }
});
