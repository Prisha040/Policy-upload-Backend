const service = require("../services/document.service");
const path = require("path");
const fs = require("fs");

// UPLOAD
exports.upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file received. Use form-data with key "document".'
      });
    }

    const data = await service.uploadDoc(
      req.body.title,
      req.file
    );

    return res.status(201).json({
      message: "File uploaded successfully",
      data
    });

  } catch (err) {
    console.error("Upload Error:", err);
    return res.status(500).json({ error: err.message });
  }
};


// READ ALL
exports.getAll = async (req, res) => {
  try {
    const docs = await service.getAllDocs();

    if (!docs || docs.length === 0) {
      return res.status(404).json({ message: "No documents found" });
    }

    return res.status(200).json(docs);

  } catch (err) {
    console.error("Get All Error:", err);
    return res.status(500).json({ error: err.message });
  }
};


// VIEW FILE
exports.viewDocument = async (req, res) => {
  const doc = await service.getDocument(req.params.id);
 
  const buffer = Buffer.from(doc.file_base64, "base64");
 
  res.setHeader("Content-Type", doc.file_type);
  res.send(buffer);
};


// UPDATE (HR)
exports.updateDocument = async (req, res) => {
  try {
    const updated = await service.updateDoc(
      req.params.id,
      req.body.title,
      req.file
    );

    if (!updated) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.status(200).json({
      message: "Document updated successfully",
      data: updated
    });

  } catch (err) {
    console.error("Update Error:", err);
    return res.status(500).json({ error: err.message });
  }
};


// DELETE
exports.remove = async (req, res) => {
  try {
    const filePath = await service.deleteDoc(req.params.id);

    if (!filePath) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Delete physical file safely
    const absolutePath = path.resolve(process.cwd(), filePath);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    return res.status(200).json({
      message: "Document deleted successfully"
    });

  } catch (err) {
    console.error("Delete Error:", err);
    return res.status(500).json({ error: err.message });
  }
};
