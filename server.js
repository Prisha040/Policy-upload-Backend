require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const db = require("./src/config/db");

db.query("select 1")
  .then(() => console.log("PostgreSQL connected successfully"))
  .catch(err => console.error("DB connection failed:", err.message));
