import pkg from "pg";
const { Pool } = pkg;

const config = useRuntimeConfig();

const pool = new Pool({
  user: process.env.DB_USER, // Auto pakai nilai dari .env
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;