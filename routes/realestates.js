const router = require("express").Router();
const { realestateValidator } = require("../validations/realestates");
const {
  getRealestates,
  getRealestate,
  createRealestate,
  editRealestate,
  deleteRealestate,
  getNotEvaluatedRealestates,
} = require("../controllers/realestates");

router
  .get("/notEvaluated", getNotEvaluatedRealestates)
  .post("/", realestateValidator(), createRealestate)
  .get("/:id", getRealestate)
  .get("/", getRealestates)
  .delete("/:id", deleteRealestate)
  .put("/:id", editRealestate);

module.exports = router;
