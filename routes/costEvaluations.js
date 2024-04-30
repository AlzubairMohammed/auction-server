const router = require("express").Router();
const { costEvaluationsValidator } = require("../validations/costEvaluations");
const {
  getCostEvaluations,
  getCostEvaluation,
  createCostEvaluation,
  editCostEvaluation,
  deleteCostEvaluation,
} = require("../controllers/costEvaluations");

router
  .get("/", getCostEvaluations)
  .get("/:id", getCostEvaluation)
  .post("/", costEvaluationsValidator(), createCostEvaluation)
  .put("/:id", editCostEvaluation)
  .delete("/:id", deleteCostEvaluation);

module.exports = router;
