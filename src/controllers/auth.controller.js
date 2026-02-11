const service = require("../services/auth.service");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const result = await service.login(email, password);

  if (!result) return res.status(401).json({ message: "Invalid credentials" });

  res.json(result);
};
