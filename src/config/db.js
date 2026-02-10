const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("❌ Database connection failed:", err.message);
  }
  console.log("Database connected successfully");
  release(); // release client back to pool
});

module.exports = pool;
