const router = require("express").Router();
const {
  realestateComponentsValidator,
} = require("../validations/realestateComponents");
const {
  getComponents,
  getComponent,
  createComponent,
  editComponent,
  deleteComponent,
} = require("../controllers/realestateComponents");

router
  .post("/", realestateComponentsValidator(), createComponent)
  .get("/", getComponents)
  .get("/:id", getComponent)
  .put("/:id", editComponent)
  .delete("/:id", deleteComponent);

module.exports = router;
