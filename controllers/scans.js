const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { scans } = models;

exports.getScans = asyncWrapper(async (req, res) => {
  let data = await scans.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getScan = asyncWrapper(async (req, res) => {
  let data = await scans.findOne({
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createScan = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await scans.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editScan = asyncWrapper(async (req, res) => {
  let data = await scans.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteScan = asyncWrapper(async (req, res) => {
  let data = await scans.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
