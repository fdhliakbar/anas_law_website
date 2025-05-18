import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // dari Neon.tech
  ssl: {
    rejectUnauthorized: false
  }
})

export default pool
