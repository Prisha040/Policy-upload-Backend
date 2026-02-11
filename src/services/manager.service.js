const db = require("../config/db");

// Manager sees pending documents
exports.getPendingDocs = async () => {
  const { rows } = await db.query(
    `SELECT id, title, file_name, created_by, created_at, status
     FROM documents
     WHERE status = 'pending'
     ORDER BY created_at DESC`
  );
  return rows;
};


// Manager approves or rejects
exports.updateStatus = async (id, status) => {
  const { rows } = await db.query(
    `UPDATE documents
     SET status = $1,
         reviewed_at = NOW(),
         reviewed_by = 'manager@test.com'
     WHERE id = $2
     RETURNING id, title, status, reviewed_at, reviewed_by`,
    [status, id]
  );
  return rows[0];
};
