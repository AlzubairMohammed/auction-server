const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { areas, cities } = models;

exports.getAreas = asyncWrapper(async (req, res) => {
  let data = await areas.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getArea = asyncWrapper(async (req, res) => {
  let data = await areas.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: cities,
        as: "cities",
      },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createArea = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await areas.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editArea = asyncWrapper(async (req, res) => {
  let data = await areas.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteArea = asyncWrapper(async (req, res) => {
  let data = await areas.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
