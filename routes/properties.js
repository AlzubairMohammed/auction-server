const router = require("express").Router();
const { propertiesValidator } = require("../validations/properties");
const {
  getProperties,
  getProperty,
  createProperty,
  editProperty,
  deleteProperty,
} = require("../controllers/properties");

router
  .get("/", getProperties)
  .get("/:id", getProperty)
  .post("/", propertiesValidator(), createProperty)
  .put("/:id", editProperty)
  .delete("/:id", deleteProperty);

module.exports = router;
