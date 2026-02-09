const service = require("../services/document.service");
const path = require("path");
const fs = require("fs");

exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file received. Use form-data with key "document".'
      });
    }

    // pass BOTH title + file
    const data = await service.uploadDoc(
      req.body.title,
      req.file
    );

    return res.status(201).json({
      message: "File uploaded successfully",
      data
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};


// READ ALL
exports.getAll = async (req, res) => {
  const docs = await service.getAllDocs();
  res.json(docs);
};

// VIEW FILE
exports.viewDocument = async (req, res) => {
  const filePath = await service.getPath(req.params.id);
  res.sendFile(path.resolve(process.cwd(), filePath));
};

// UPDATE (HR)
exports.updateDocument = async (req, res) => {
  const updated = await service.updateDoc(
    req.params.id,
    req.body.title,
    req.file
  );
  res.json(updated);
};


// DELETE
exports.remove = async (req, res) => {
  const filePath = await service.deleteDoc(req.params.id);
  fs.unlinkSync(path.resolve(process.cwd(), filePath));
  res.json({ message: "Document deleted" });
};