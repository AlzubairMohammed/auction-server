const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { realestates, realestate_owners, realestate_licenses } = models;

exports.createRealestate = asyncWrapper(async (req, res, next) => {
  const {
    license_number,
    license_issuance_place_id,
    license_date,
    license_path,
    license_realestate_type_id,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await realestates.create(req.body);
  await realestate_licenses.create({
    realestate_id: data.id,
    number: license_number,
    issuance_place_id: license_issuance_place_id,
    date: license_date,
    path: license_path,
    realestate_type_id: license_realestate_type_id,
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getRealestates = asyncWrapper(async (req, res) => {
  let data = await realestates.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getRealestate = asyncWrapper(async (req, res) => {
  let data = await realestates.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: realestate_owners,
        as: "realestate_owners",
      },
    ],
    include: [
      {
        model: realestate_licenses,
        as: "realestate_licenses",
      },
    ],
  });

  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editRealestate = asyncWrapper(async (req, res) => {
  let data = await realestates.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteRealestate = asyncWrapper(async (req, res) => {
  let data = await realestates.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
