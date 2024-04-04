const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { auctions } = models;

const createAuction = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await auctions.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

const getAuctions = asyncWrapper(async (req, res) => {
  let data = await auctions.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

const getAuction = asyncWrapper(async (req, res) => {
  let data = await auctions.findOne({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});

const editAuction = asyncWrapper(async (req, res) => {
  let data = await auctions.update(req.body, { where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});

const deleteAuction = asyncWrapper(async (req, res) => {
  let data = await auctions.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});

// Export the controller functions
module.exports = {
  createAuction,
  getAuctions,
  getAuction,
  editAuction,
  deleteAuction,
};
