const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { cities } = models;

exports.createCity = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await cities.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getCities = asyncWrapper(async (req, res) => {
  let data = await cities.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getCity = asyncWrapper(async (req, res) => {
  let data = await cities.findOne({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editCity = asyncWrapper(async (req, res) => {
  let data = await cities.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteCity = asyncWrapper(async (req, res) => {
  let data = await cities.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
