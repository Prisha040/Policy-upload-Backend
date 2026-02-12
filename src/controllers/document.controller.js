const service = require("../services/document.service");
const path = require("path");
const fs = require("fs");

// ==========================
// UPLOAD
// ==========================
exports.upload = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!req.file) {
      return res.status(400).json({
        message: 'No file received. Use form-data with key "document".',
      });
    }

    const data = await service.uploadDoc(title, req.file);

    return res.status(201).json({
      message: "File uploaded successfully",
      data,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// ==========================
// READ ALL
// ==========================
exports.getAll = async (req, res) => {
  try {
    const docs = await service.getAllDocs();

    return res.status(200).json(docs);
  } catch (err) {
    console.error("Get All Error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// ==========================
// VIEW FILE
// ==========================
exports.viewDocumentForEmployee = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const doc = await service.getDocumentForEmployee(id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    const buffer = Buffer.from(doc.file_base64, "base64");

    res.setHeader("Content-Type", doc.file_type);
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=policy.pdf"
    );

    return res.send(buffer);

  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};


// ==========================
// UPDATE (HR)
// ==========================
exports.updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    // 🔹 Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Valid document ID is required" });
    }

    // 🔹 Validate Title (optional if you want required)
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    // 🔹 Validate File (if your update requires file)
    if (!req.file) {
      return res.status(400).json({
        message: "File is required for update",
      });
    }

    const updated = await service.updateDoc(id, title, req.file);

    if (!updated) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.status(200).json({
      message: "Document updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Update Error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// ==========================
// DELETE
// ==========================
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Valid document ID is required" });
    }

    const filePath = await service.deleteDoc(id);

    if (!filePath) {
      return res.status(404).json({ message: "Document not found" });
    }

    const absolutePath = path.resolve(process.cwd(), filePath);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    return res.status(200).json({
      message: "Document deleted successfully",
    });
  } catch (err) {
    console.error("Delete Error:", err);
    return res.status(500).json({ error: err.message });
  }
};


exports.getApprovedForEmployee = async (req, res) => {
  try {
    const docs = await service.getApprovedDocs();
    return res.json(docs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.viewDocument = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid document id" });
    }

    // normal view (HR / Manager – no status restriction)
    const doc = await service.getDocument(id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    const buffer = Buffer.from(doc.file_base64, "base64");

    res.setHeader("Content-Type", doc.file_type);
    // inline = open in browser/postman
    res.setHeader("Content-Disposition", "inline; filename=policy.pdf");

    return res.send(buffer);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
