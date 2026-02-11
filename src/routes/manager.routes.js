const express = require("express");
const router = express.Router();
const controller = require("../controllers/manager.controller");

router.get("/manager/pending", controller.getPending);
router.put("/manager/:id/status", controller.changeStatus);

module.exports = router;
