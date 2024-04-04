const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { realestate_owners } = models;

exports.getRealestateOwners = asyncWrapper(async (req, res) => {
  let data = await realestate_owners.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getRealestateOwner = asyncWrapper(async (req, res) => {
  let data = await realestate_owners.findOne({
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createRealestateOwner = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await realestate_owners.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editRealestateOwner = asyncWrapper(async (req, res) => {
  let data = await realestate_owners.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteRealestateOwner = asyncWrapper(async (req, res) => {
  let data = await realestate_owners.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
