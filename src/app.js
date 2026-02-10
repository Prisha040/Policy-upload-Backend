const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require("multer");

const documentRoutes = require('./routes/document.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/documents', documentRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File size must be less than 5MB"
      });
    }
  }

  if (err.message === "Only PDF files are allowed") {
    return res.status(400).json({ message: err.message });
  }

  next(err);
});

module.exports = app;


