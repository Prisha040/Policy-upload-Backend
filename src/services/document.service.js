const db = require("../config/db");
const fs = require("fs");
const path = require("path");

exports.uploadDoc = async (title, file) => {
  const base64 = file.buffer.toString("base64");

  const { rows } = await db.query(
    `INSERT INTO documents (title, file_name, file_base64, file_type, file_size)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING id, title, status`,
    [
      title,                 // $1
      file.originalname,     // $2
      base64,                // $3
      file.mimetype,         // $4
      file.size              // $5 
    ]
  );

  return rows[0];
};


// READ ALL
exports.getAllDocs = async () => {
  const { rows } = await db.query(
    "SELECT id, title, status, file_name, file_size FROM documents ORDER BY id DESC",
  );
  return rows;
};

// GET PATH
exports.getDocument = async (id) => {
  const { rows } = await db.query(
    "SELECT file_base64, file_type, file_name FROM documents WHERE id=$1",
    [id],
  );
  return rows[0];
};

// UPDATE (HR replaces file + title)
exports.updateDoc = async (id, title, file) => {
  const base64 = file.buffer.toString("base64");

  const { rows } = await db.query(
    `UPDATE documents
     SET title=$1,
         file_name=$2,
         file_base64=$3,
         file_type=$4,
         file_size=$5,
         status='pending'
     WHERE id=$6
     RETURNING id, title, status`,
    [title, file.originalname, base64, file.mimetype, file.size, id],
  );

  if (!rows.length) throw new Error("Document not found");
  return rows[0];
};

// DELETE
exports.deleteDoc = async (id) => {
  const { rows } = await db.query(
    "DELETE FROM documents WHERE id=$1 RETURNING id",
    [id],
  );
  return rows[0];
};

exports.getApprovedDocs = async () => {
  const { rows } = await db.query(
    "SELECT id, title, status FROM documents WHERE status = 'approved'"
  );
  return rows;
};

exports.getDocumentForEmployee = async (id) => {
  const { rows } = await db.query(
    `SELECT file_base64, file_type, status
     FROM documents
     WHERE id = $1`,
    [id]
  );

  if (!rows.length) return null;

  if (rows[0].status !== "approved") {
    throw new Error("Document not approved");
  }

  return rows[0];
};
