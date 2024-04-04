const router = require("express").Router();
const { areasValidator } = require("../validations/areas");
const {
  getAreas,
  getArea,
  createArea,
  editArea,
  deleteArea,
} = require("../controllers/areas");

router
  .post("/", areasValidator(), createArea)
  .get("/", getAreas)
  .get("/:id", getArea)
  .put("/:id", editArea)
  .delete("/:id", deleteArea);

module.exports = router;
