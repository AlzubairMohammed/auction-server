const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { realestate_features } = models;

exports.getScanRealestateFeatures = asyncWrapper(async (req, res) => {
  let data = await realestate_features.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getScanRealestateFeature = asyncWrapper(async (req, res) => {
  let data = await realestate_features.findOne({
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createScanRealestateFeature = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await realestate_features.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editScanRealestateFeature = asyncWrapper(async (req, res) => {
  let data = await realestate_features.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteScanRealestateFeature = asyncWrapper(async (req, res) => {
  let data = await realestate_features.destroy({
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});
