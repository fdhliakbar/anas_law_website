const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Pool } = require("pg");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("PostgreSQL connection error:", err);
    return;
  }
  console.log("PostgreSQL Connected");
});

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});