const service = require("../services/manager.service");

exports.getPending = async (req, res) => {
  try {
    const docs = await service.getPendingDocs();
    res.status(200).json(docs);
  } catch (err) {
    console.error("Pending Docs Error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.changeStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await service.updateStatus(req.params.id, status);

    if (!updated) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({
      message: `Document ${status}`,
      data: updated
    });

  } catch (err) {
    console.error("Status Error:", err);
    res.status(500).json({ error: err.message });
  }
};
