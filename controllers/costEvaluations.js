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
  const { directCostOperations, indirectCostOperations, depreciationRate } =
    req.body;
  let directCostTotal = 0;
  let indirectCostTotal = 0;
  let depreciationRateValue = 0;
  let depreciationCost = 0;
  let realestateCostAfterDepreciation = 0;
  let sum = 0;
  for (const item of directCostOperations) {
    sum += item?.meter_price * item?.area;
  }
  directCostTotal = sum;
  sum = 0;

  for (const item of indirectCostOperations) {
    if (item.costType === "percentage") {
      sum += (directCostTotal / 100) * +item.precentage;
    } else {
      sum += +item?.precentage;
    }
  }
  indirectCostTotal = sum;
  realestateCostAfterDepreciation = 0;

  if (depreciationRate.type === "const") {
    depreciationRateValue =
      (+depreciationRate.realestate_life_span /
        +depreciationRate.realestate_expected_life_span) *
      100;
    depreciationRateValue = Math.round(depreciationRateValue);
    depreciationCost =
      ((indirectCostTotal + directCostTotal) * depreciationRateValue) / 100;
    realestateCostAfterDepreciation =
      indirectCostTotal + directCostTotal - depreciationCost;
  } else {
    depreciationRateValue =
      (+depreciationRate.realestate_expanded_life_span /
        +depreciationRate.realestate_expected_life_span) *
      100;
    depreciationRateValue = Math.round(depreciationRateValue);
    depreciationCost =
      ((indirectCostTotal + directCostTotal) * depreciationRateValue) / 100;
    realestateCostAfterDepreciation =
      indirectCostTotal + directCostTotal - depreciationCost;
  }

  return res.status(500).json({
    status: httpStatus.SUCCESS,
    directCostOperations,
    indirectCostOperations,
    directCostTotal,
    indirectCostTotal,
    depreciationRateValue,
    depreciationCost,
    realestateCostAfterDepreciation,
  });

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
