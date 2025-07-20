// file: server/api/users/delete-users.js

import database from "../../utils/database.js";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "DELETE") {
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

  // --- LANGKAH 2: DAPATKAN ID LANGSUNG DARI TOKEN ---
  // HAPUS: Tidak perlu lagi mengambil ID dari body
  const id_to_delete = loggedInUser.users_id;

  // --- LANGKAH 3: PROSES KE DATABASE ---
  try {
    // Ambil nama user sebelum dihapus
    const userInfo = await database.getUserById(id_to_delete);
    if (userInfo.rows.length === 0) {
      return { statusCode: 404, message: "Pengguna tidak ditemukan." };
    }

    const result = await database.deleteUser(id_to_delete);

    // Cek apakah ada baris yang terhapus
    if (result.rowCount === 0) {
      // Ini jarang terjadi jika token valid, tapi bagus untuk keamanan
      return { statusCode: 404, message: "Pengguna tidak ditemukan." };
    }

    return {
      statusCode: 200,
      message: `Akun untuk pengguna '${userInfo.rows[0].name}' berhasil dihapus.`,
    };
  } catch (error) {
    console.error("Delete user error:", error);
    return { statusCode: 500, message: "Terjadi kesalahan pada server." };
  }
});
