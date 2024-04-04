const router = require("express").Router();
const { realestateTyesValidator } = require("../validations/realestateTypes");
const {
  getRealestateTypes,
  getRealestateType,
  createRealestateType,
  editRealestateType,
  deleteRealestateType,
} = require("../controllers/realestateTypes");

router
  .get("/", getRealestateTypes)
  .get("/:id", getRealestateType)
  .post("/", realestateTyesValidator(), createRealestateType)
  .put("/:id", editRealestateType)
  .delete("/:id", deleteRealestateType);

module.exports = router;
