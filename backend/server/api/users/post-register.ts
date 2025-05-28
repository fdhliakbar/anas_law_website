import { Client } from "pg";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Ini untuk connect ke PostgreSQL
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "admin123",
    port: 5432,
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
