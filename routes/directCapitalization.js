const router = require("express").Router();
const {
  directCapitalizationEvaluationValidator,
} = require("../validations/directCapitalizationEvaluations");
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
  .post(
    "/",
    directCapitalizationEvaluationValidator(),
    createDirectCapitalizationEvaluation
  )
  .put("/:id", editDirectCapitalizationEvaluation)
  .delete("/:id", deleteDirectCapitalizationEvaluation);

module.exports = router;
