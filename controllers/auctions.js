const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models, sequelize } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const {
  auctions,
  users,
  realestates,
  realestate_properties,
  realestate_components,
  realestate_images,
  realestate_images_descriptions,
} = models;

exports.createAuction = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await auctions.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getAuctions = asyncWrapper(async (req, res) => {
  const limit = +req.query.limit || 10;
  const offset = +req.query.offset || 0;
  let data = await auctions.findAll({ limit, offset });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getAuction = asyncWrapper(async (req, res) => {
  let data = await auctions.findOne({
    where: { id: req.params.id },
    include: {
      model: realestates,
      as: "realestates",
      include: {
        model: realestate_properties,
        as: "realestate_properties",
        model: realestate_components,
        as: "realestate_components",
        model: realestate_images,
        as: "realestate_images",
        include: {
          model: realestate_images_descriptions,
          as: "realestate_images_description",
        },
      },
    },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editAuction = asyncWrapper(async (req, res) => {
  let data = await auctions.update(req.body, { where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteAuction = asyncWrapper(async (req, res) => {
  let data = await auctions.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.search = asyncWrapper(async (req, res) => {
  let data = await auctions.findAll({
    where: {
      [req.body.key]: { [Op.like]: `%${req.body.value}%` },
    },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getAminAuctions = asyncWrapper(async (req, res) => {
  const limit = +req.query.limit || 10;
  const offset = +req.query.offset || 0;
  let data = await auctions.findAll({
    limit,
    offset,
    include: {
      model: users,
      as: "user",
      attributes: { exclude: ["password"] },
      where: { admin_id: req.params.id },
    },
  });

  return res.json({ status: httpStatus.SUCCESS, data });
});
