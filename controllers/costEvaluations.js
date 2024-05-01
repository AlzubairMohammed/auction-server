const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models, sequelize } = require("../database/connection");
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
    include: [
      {
        model: direct_costs,
        as: "direct_costs",
        include: [
          {
            model: direct_cost_components,
            as: "direct_cost_components",
          },
        ],
      },
      {
        model: indirect_costs,
        as: "indirect_costs",
        include: [
          {
            model: indirect_cost_components,
            as: "indirect_cost_components",
          },
        ],
      },
      {
        model: depreciations,
        as: "depreciations",
      },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createCostEvaluation = asyncWrapper(async (req, res, next) => {
  const transaction = await sequelize.transaction();
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let costEvaluationData = await cost_evaluations.create(
    {
      realestate_id: req.body.realestate_id,
      total_cost: directCostTotal + indirectCostTotal,
      building_cost: directCostTotal,
      building_cost_after_depreciation: realestateCostAfterDepreciation,
    },
    { transaction }
  );
  let directCostData = await direct_costs.create(
    {
      cost_evaluation_id: costEvaluationData.id,
      direct_cost: directCostTotal,
    },
    { transaction }
  );
  let directCostComponentsData = await Promise.all(
    directCostOperations.map((item) => {
      return direct_cost_components.create(
        {
          direct_cost_id: directCostData.id,
          name: item.name,
          area: item.area,
          meter_price: item.meter_price,
          total: item.meter_price * item.area,
        },
        { transaction }
      );
    })
  );
  let indirectCostData = await indirect_costs.create(
    {
      cost_evaluation_id: costEvaluationData.id,
      indirect_cost: indirectCostTotal,
    },
    { transaction }
  );
  let indirectCostComponentsData = await Promise.all(
    indirectCostOperations.map((item) => {
      return indirect_cost_components.create(
        {
          indirect_cost_id: indirectCostData.id,
          name: item.name,
          percentage: item.costType === "percentage" ? item.precentage : null,
          price: item.costType === "price" ? item.precentage : null,
        },
        { transaction }
      );
    })
  );
  let depreciationData = await depreciations.create(
    {
      cost_evaluation_id: costEvaluationData.id,
      depreciation_rate: depreciationRateValue,
      depreciation_value: depreciationCost,
      realestate_life_span: depreciationRate.realestate_life_span,
      realestate_expected_life_span:
        depreciationRate.realestate_expected_life_span,
      realestate_expanded_life_span:
        depreciationRate.realestate_expanded_life_span,
      type: depreciationRate.type,
    },
    { transaction }
  );
  transaction.commit();
  return res.json({ status: httpStatus.SUCCESS, depreciationData });
});

exports.editCostEvaluation = asyncWrapper(async (req, res) => {
  let data = await cost_evaluations.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({
    status: httpStatus.SUCCESS,
    directCostData,
  });
});

exports.deleteCostEvaluation = asyncWrapper(async (req, res) => {
  let data = await cost_evaluations.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
