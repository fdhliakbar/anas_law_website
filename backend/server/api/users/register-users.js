import pool from "../../utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  if (method !== "POST") {
    return {
      statusCode: 405,
      message: "jangan pake method post tuan, tidak tersedia",
    };
  }
  const body = await readBody(event).catch(() => ({}));
  if (method === "POST" && body.action === "register") {
    const { name, email, password, role } = body;

    if (!name) errors.push("Nama wajib diisi.");
    if (!email) errors.push("Email wajib diisi.");
    if (!password) errors.push("Password wajib diisi.");
    if (!role) errors.push("Role wajib diisi.");

    if (!name || !email || !password || !role) {
      return {
        statusCode: 405,
        message: "Semau field wajib di isi",
      };
    }

      if (!emailRegex.test(email)) {
        errors.push("Format Email tidak valid");
        
      }

      if (password.length < 8) {
       errors.push("Password Minimal 8 karatker");
      }

      const allowedRoles = ["Admin", "users"]
      if (!allowedRoles.includes(role)) {
      errors.push;
        
      }
  }


});
