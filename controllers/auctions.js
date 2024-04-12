const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const { auctions } = models;

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
  let data = await auctions.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getAuction = asyncWrapper(async (req, res) => {
  let data = await auctions.findOne({ where: { id: req.params.id } });
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
