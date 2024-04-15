const router = require("express").Router();
const { citiesValidator } = require("../validations/cities");
const {
  getDirectCapitalizationEvaluations,
  getDirectCapitalizationEvaluation,
  createDirectCapitalizationEvaluation,
  editDirectCapitalizationEvaluation,
  deleteDirectCapitalizationEvaluation,
} = require("../controllers/directCapitalizationEvaluations");

router
  .get("/", getDirectCapitalizationEvaluations)
  .get("/:id", getDirectCapitalizationEvaluation)
  .post("/", citiesValidator(), createDirectCapitalizationEvaluation)
  .put("/:id", editDirectCapitalizationEvaluation)
  .delete("/:id", deleteDirectCapitalizationEvaluation);

module.exports = router;
