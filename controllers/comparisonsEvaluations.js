const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const {
  comparisons_evaluations,
  comparisons_evaluation_properties,
  comparisons_evaluation_realestates,
  comparisons_evaluation_realestates_properties,
} = models;

exports.getComparisonsEvaluations = asyncWrapper(async (req, res) => {
  let data = await comparisons_evaluations.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getComparisonsEvaluation = asyncWrapper(async (req, res) => {
  let data = await comparisons_evaluations.findOne({
    include: [
      {
        model: comparisons_evaluation_realestates,
        as: "comparisons_evaluation_realestates",
        include: [
          {
            model: comparisons_evaluation_realestates_properties,
            as: "comparisons_evaluation_realestates_properties",
            include: [
              {
                model: comparisons_evaluation_properties,
                as: "comparisons_evaluation_property",
              },
            ],
          },
        ],
      },
    ],
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createComparisonsEvaluation = asyncWrapper(async (req, res, next) => {
  let comparisons = req.body.comparisons;
  let properties = req.body.properties;
  let result = 0;
  let counter1 = comparisons.length;
  let counter2 = comparisons[0].length;
  while (counter1--) {
    let nestedCounter = counter2;
    let realestateItem = [...comparisons[counter1]];
    while (nestedCounter--) {
      if (nestedCounter) {
        if (nestedCounter === 1) {
          result +=
            (realestateItem[0].percentage *
              realestateItem[counter2 - 1].percentage) /
            100;
        } else {
          realestateItem[0].percentage +=
            (comparisons[counter1][0].percentage *
              realestateItem[nestedCounter - 1].percentage) /
            100;
        }
      }
    }
  }
  result = result.toFixed(2);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let propertiesData = await Promise.all(
    properties.map(async (property) => {
      try {
        const data = await comparisons_evaluation_properties.create({
          name: property,
        });
        return data.id;
      } catch (error) {
        console.error(`Error creating property: ${error}`);
      }
    })
  );
  let comparisonsEvaluationsData = await comparisons_evaluations.create({
    realestate_id: req.body.realestate_id,
    meter_price: result,
  });
  let comparisonsEvaluationRealestatesData =
    await comparisons_evaluation_realestates.create({
      comparisons_evaluation_id: comparisonsEvaluationsData.id,
    });

  let coun = 0;
  let counter = comparisons.length;
  while (counter--) {
    let comparisonsEvaluationRealestatesData =
      await comparisons_evaluation_realestates.create({
        comparisons_evaluation_id: comparisonsEvaluationsData.id,
      });
    let nestedCounter = comparisons[counter].length;
    while (nestedCounter--) {
      await comparisons_evaluation_realestates_properties.create({
        comparisons_evaluation_realestate_id:
          comparisonsEvaluationRealestatesData.id,
        comparisons_evaluation_properties_id: propertiesData[nestedCounter],
        value: comparisons[counter][nestedCounter].value,
        percentage: comparisons[counter][nestedCounter].percentage,
      });
      coun++;
    }
    coun = 0;
  }

  return res.json({
    status: httpStatus.SUCCESS,
    data: comparisonsEvaluationsData,
  });
});

exports.editComparisonsEvaluation = asyncWrapper(async (req, res) => {
  let data = await comparisons_evaluations.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteComparisonsEvaluation = asyncWrapper(async (req, res) => {
  let data = await comparisons_evaluations.destroy({
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});
