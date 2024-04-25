const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { components } = models;

exports.getComponents = asyncWrapper(async (req, res) => {
  let data = await components.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getComponent = asyncWrapper(async (req, res) => {
  let data = await components.findOne();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createComponent = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await components.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editComponent = asyncWrapper(async (req, res) => {
  let data = await components.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteComponent = asyncWrapper(async (req, res) => {
  let data = await components.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
