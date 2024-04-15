const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { direct_capitalization_evaluations } = models;

exports.createDirectCapitalizationEvaluation = asyncWrapper(
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
      return next(error);
    }
    let data = await direct_capitalization_evaluations.create(req.body);
    return res.json({ status: httpStatus.SUCCESS, data });
  }
);

exports.getDirectCapitalizationEvaluations = asyncWrapper(async (req, res) => {
  let data = await direct_capitalization_evaluations.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getDirectCapitalizationEvaluation = asyncWrapper(async (req, res) => {
  let data = await direct_capitalization_evaluations.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: quarters,
        as: "quarters",
      },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editDirectCapitalizationEvaluation = asyncWrapper(async (req, res) => {
  let data = await direct_capitalization_evaluations.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteDirectCapitalizationEvaluation = asyncWrapper(
  async (req, res) => {
    let data = await direct_capitalization_evaluations.destroy({
      where: { id: req.params.id },
    });
    return res.json({ status: httpStatus.SUCCESS, data });
  }
);
