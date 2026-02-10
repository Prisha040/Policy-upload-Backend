const router = require("express").Router();
const upload = require("../middlewares/upload.middleware");
const controller = require("../controllers/document.controller");

router.post("/upload", upload.single("document"), controller.upload);
// READ
router.get("/", controller.getAll);
router.get("/:id/view", controller.viewDocument);

// UPDATE (HR can replace file + title)
router.put("/:id", upload.single("document"), controller.updateDocument);

// DELETE
router.delete("/:id", controller.remove);

module.exports = router;
