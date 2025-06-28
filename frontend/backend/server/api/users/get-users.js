import pool from "../../utils/db";

export default defineEventHandler(async () => {
  const res = await pool.query("SELECT * FROM users");
  return { users: res.rows };
});
