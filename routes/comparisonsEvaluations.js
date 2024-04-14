const router = require("express").Router();
const {
  comparisonsEvaluationsValidator,
} = require("../validations/comparisonsEvaluations");
const {
  getComparisonsEvaluations,
  getComparisonsEvaluation,
  createComparisonsEvaluation,
  editComparisonsEvaluation,
  deleteComparisonsEvaluation,
} = require("../controllers/comparisonsEvaluations");

router
  .get("/", getComparisonsEvaluations)
  .get("/:id", getComparisonsEvaluation)
  .post("/", comparisonsEvaluationsValidator(), createComparisonsEvaluation)
  .put("/:id", editComparisonsEvaluation)
  .delete("/:id", deleteComparisonsEvaluation);

module.exports = router;
