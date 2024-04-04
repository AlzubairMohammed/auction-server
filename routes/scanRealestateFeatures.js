const router = require("express").Router();
const {
  scanRealestateFeaturesValidator,
} = require("../validations/scanRealestateFeatures");
const {
  getScanRealestateFeatures,
  getScanRealestateFeature,
  createScanRealestateFeature,
  editScanRealestateFeature,
  deleteScanRealestateFeature,
} = require("../controllers/scanRealestateFeatures");

router
  .get("/", getScanRealestateFeatures)
  .get("/:id", getScanRealestateFeature)
  .post("/", scanRealestateFeaturesValidator(), createScanRealestateFeature)
  .put("/:id", editScanRealestateFeature)
  .delete("/:id", deleteScanRealestateFeature);

module.exports = router;
