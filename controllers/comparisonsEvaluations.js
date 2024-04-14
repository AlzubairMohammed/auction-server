const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { comparisons_evaluations } = models;

exports.getComparisonsEvaluations = asyncWrapper(async (req, res) => {
  let data = await comparisons_evaluations.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getComparisonsEvaluation = asyncWrapper(async (req, res) => {
  let data = await comparisons_evaluations.findOne({
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createComparisonsEvaluation = asyncWrapper(async (req, res, next) => {
  let multiArray = req.body;
  let result = 0;
  let counter1 = multiArray.length;
  let counter2 = multiArray[0].length;
  while (counter1--) {
    let nestedCounter = counter2;
    let realestateItem = [...multiArray[counter1]];
    while (nestedCounter--) {
      if (nestedCounter) {
        if (nestedCounter === 1) {
          result +=
            (realestateItem[0].percentage *
              realestateItem[counter2 - 1].percentage) /
            100;
        } else {
          realestateItem[0].percentage +=
            (multiArray[counter1][0].percentage *
              realestateItem[nestedCounter - 1].percentage) /
            100;
        }
      }
    }
  }
  return res.json({ status: httpStatus.SUCCESS, result });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await comparisons_evaluations.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
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
