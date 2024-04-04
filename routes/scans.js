const router = require("express").Router();
const { scansValidator } = require("../validations/scans");
const {
  getScans,
  getScan,
  createScan,
  editScan,
  deleteScan,
} = require("../controllers/scans");

router
  .get("/", getScans)
  .get("/:id", getScan)
  .post("/", scansValidator(), createScan)
  .put("/:id", editScan)
  .delete("/:id", deleteScan);

module.exports = router;
