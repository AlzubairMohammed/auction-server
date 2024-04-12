const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { realestates, realestate_owners, realestate_licenses } = models;

exports.createRealestate = asyncWrapper(async (req, res, next) => {
  const { owners } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  // create realestate
  let data = await realestates.create(req.body);
  // create realestate license
  req.body.license.realestate_id = data.id;
  await realestate_licenses.create(req.body.license);
  // create realestate owners
  if (owners) {
    await realestate_owners.bulkCreate(
      owners.map((owner) => ({
        realestate_id: data.id,
        name: owner.name,
        identity_number: owner.identity_number,
        nationality: owner.nationality,
        ownership_percentage: owner.ownership_percentage,
      }))
    );
  }
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
