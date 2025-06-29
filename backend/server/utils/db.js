// file: utils/db.js

import pkg from "pg";
const { Pool } = pkg;

const config = useRuntimeConfig();

// Membuat koneksi HANYA menggunakan connection string
const pool = new Pool({
  connectionString: config.databaseUrl, // 'databaseUrl' adalah camelCase dari 'DATABASE_URL'
});

export default pool;
