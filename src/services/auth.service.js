const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.login = async (email, password) => {
  const result = await db.query(
    "SELECT id,email,password,role FROM users WHERE email=$1",
    [email],
  );

  if (result.rows.length === 0) return null;

  const user = result.rows[0];

  if (user.password !== password) return null;

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  return {
    token,
    role: user.role,
  };
};
