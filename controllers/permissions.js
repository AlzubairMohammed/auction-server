const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { permissions } = models;

exports.getPermissions = asyncWrapper(async (req, res) => {
  let data = await permissions.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getPermission = asyncWrapper(async (req, res) => {
  let data = await permissions.findOne({
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createPermission = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await permissions.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editPermission = asyncWrapper(async (req, res) => {
  let data = await permissions.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deletePermission = asyncWrapper(async (req, res) => {
  let data = await permissions.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
