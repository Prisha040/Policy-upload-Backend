const multer = require("multer");

// ✅ Store file in memory (NOT on disk)
const storage = multer.memoryStorage();

module.exports = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // optional: 5MB limit
  }
});
