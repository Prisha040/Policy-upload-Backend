const express = require('express');
const cors = require('cors');
const path = require('path');

const documentRoutes = require('./routes/document.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/documents', documentRoutes);

module.exports = app;
