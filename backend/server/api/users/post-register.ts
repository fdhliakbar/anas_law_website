import dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Ini untuk connect ke PostgreSQL
  const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
  });

  await client.connect();

  try {
    // Simpan data ke tabel users
    await client.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      body.email,
      body.password,
    ]);
    return { message: "User registered successfully" };
  } catch (error: any) {
    return { message: "Registration failed", error: error.message };
  } finally {
    await client.end();
  }
});
