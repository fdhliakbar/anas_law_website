import database from "../../utils/database.js";

export default defineEventHandler(async (event) => {
  // Set CORS headers agar endpoint bisa diakses dari frontend
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "*", // Ganti * dengan origin frontend jika perlu
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  // Handle preflight OPTIONS request
  if (event.node.req.method === "OPTIONS") {
    return "";
  }

  // Ambil semua data user dari database menggunakan database service
  const res = await database.getUsers();
  return { users: res.rows };
});
