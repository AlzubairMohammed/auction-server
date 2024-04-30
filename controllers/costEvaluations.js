const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const {
  cost_evaluations,
  direct_costs,
  direct_cost_components,
  indirect_costs,
  indirect_cost_components,
  depreciations,
} = models;

exports.getCostEvaluations = asyncWrapper(async (req, res) => {
  let data = await cost_evaluations.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getCostEvaluation = asyncWrapper(async (req, res) => {
  let data = await cost_evaluations.findOne({
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createCostEvaluation = asyncWrapper(async (req, res, next) => {
  const { directCostOperations } = req.body;
  let sum = 0;
  for (const item of directCostOperations) {
    sum += item?.meter_price * item?.area;
  }
  return res.json({ status: httpStatus.SUCCESS, sum });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await cost_evaluations.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editCostEvaluation = asyncWrapper(async (req, res) => {
  let data = await cost_evaluations.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteCostEvaluation = asyncWrapper(async (req, res) => {
  let data = await cost_evaluations.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
