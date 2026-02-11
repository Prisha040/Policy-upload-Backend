const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const documentRoutes = require("./routes/document.routes");

const app = express();

app.use(cors());
app.use(express.json());

// auth
app.use("/api/auth", authRoutes);

// Serve uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// documents
app.use("/api/documents", documentRoutes);

module.exports = app;
