const router = require("express").Router();
const { quartersValidator } = require("../validations/quarters");
const {
  getQuarters,
  getQuarter,
  editQuarter,
  deleteQuarter,
  createQuarter,
} = require("../controllers/quarters");

router
  .post("/", quartersValidator(), createQuarter)
  .get("/", getQuarters)
  .get("/:id", getQuarter)
  .put("/:id", editQuarter)
  .delete("/:id", deleteQuarter);

module.exports = router;
