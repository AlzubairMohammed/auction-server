const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { quarters } = models;

exports.getQuarters = asyncWrapper(async (req, res) => {
  let data = await quarters.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getQuarter = asyncWrapper(async (req, res) => {
  let data = await quarters.findOne({
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createQuarter = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await quarters.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editQuarter = asyncWrapper(async (req, res) => {
  let data = await quarters.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteQuarter = asyncWrapper(async (req, res) => {
  let data = await quarters.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getQuartersByCity = asyncWrapper(async (req, res) => {
  let data = await quarters.findAll({
    where: { city_id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});
