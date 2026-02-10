const db = require("../config/db");
const fs = require("fs");
const path = require("path");

exports.uploadDoc = async (title, file) => {
  const base64 = file.buffer.toString("base64");

  const { rows } = await db.query(
    `INSERT INTO documents (title, file_base64, file_type, file_size)
     VALUES ($1,$2,$3,$4)
     RETURNING id, title, status`,
    [title, base64, file.mimetype, file.size]
  );

  return rows[0];
};


// READ ALL
exports.getAllDocs = async () => {
  const { rows } = await db.query(
    "SELECT id, title, status, file_base64 FROM documents ORDER BY id DESC"
  );
  return rows;
};


// GET PATH
exports.getDocument = async (id) => {
  const { rows } = await db.query(
    "SELECT file_base64, file_type FROM documents WHERE id=$1",
    [id]
  );
  return rows[0];
};


// UPDATE (HR replaces file + title)
exports.updateDoc = async (id, title, file) => {
  // get old file
  const { rows } = await db.query(
    "SELECT file_path FROM documents WHERE id=$1",
    [id]
  );

  if (!rows.length) throw new Error("Document not found");

  // delete old file
  fs.unlinkSync(path.resolve(process.cwd(), rows[0].file_path));

  // update DB
  const updated = await db.query(
    `UPDATE documents
     SET title=$1, file_path=$2, file_type=$3, file_size=$4, status='pending'
     WHERE id=$5 RETURNING *`,
    [title, file.path, file.mimetype, file.size, id]
  );

  return updated.rows[0];
};


// DELETE
exports.deleteDoc = async (id) => {
  const { rows } = await db.query(
    "DELETE FROM documents WHERE id=$1 RETURNING file_path",
    [id]
  );
  return rows[0].file_path;
};
