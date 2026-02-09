const multer = require("multer");
const path = require("path");
const fs = require("fs");

// absolute path (safe)
const uploadDir = path.join(process.cwd(), "uploads", "documents");

// ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^\w.-]/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  }
});

module.exports = multer({ storage });
