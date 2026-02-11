const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const documentRoutes = require("./routes/document.routes");
const managerRoutes = require("./routes/manager.routes");  // ⭐ ADD THIS

const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);

// Serve uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// HR document routes
app.use("/api/documents", documentRoutes);

// Manager routes ⭐
app.use("/api", managerRoutes);

module.exports = app;
