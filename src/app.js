const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require("./routes/auth.routes");

const documentRoutes = require('./routes/document.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Serve uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/documents', documentRoutes);
app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;

