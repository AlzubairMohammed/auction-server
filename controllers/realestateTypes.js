const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { realestate_types } = models;

exports.getRealestateTypes = asyncWrapper(async (req, res) => {
  let data = await realestate_types.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getRealestateType = asyncWrapper(async (req, res) => {
  let data = await realestate_types.findOne({
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createRealestateType = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await realestate_types.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editRealestateType = asyncWrapper(async (req, res) => {
  let data = await realestate_types.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteRealestateType = asyncWrapper(async (req, res) => {
  let data = await realestate_types.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
