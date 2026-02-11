require("dotenv").config();

const app = require("./src/app");
const db = require("./src/config/db");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Test DB connection
db.query("select 1")
  .then(() => console.log("PostgreSQL connected successfully"))
  .catch(err => console.error("DB connection failed:", err.message));
