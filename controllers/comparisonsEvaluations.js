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
