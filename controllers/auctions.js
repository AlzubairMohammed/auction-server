const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models, sequelize } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const { model } = require("mongoose");
const {
  auctions,
  users,
  realestates,
  realestate_properties,
  realestate_components,
  components,
  realestate_images,
  realestate_images_descriptions,
  realestate_owners,
  realestate_licenses,
  realestate_documents,
  realestate_files,
  comparisons_evaluations,
  cost_evaluations,
  direct_costs,
  direct_cost_components,
  indirect_costs,
  indirect_cost_components,
  depreciations,
  comparisons_evaluation_realestates,
  comparisons_evaluation_realestates_properties,
  scans,
  realestate_features,
  realestate_feature_options,
  properties,
  properties_options,
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
  const limit = +req.query.limit || 100;
  const offset = +req.query.offset || 0;
  let whereClause = {};
  if (req.query.key && req.query.value) {
    whereClause[req.query.key] = { [Op.like]: `%${req.query.value}%` };
  }
  let data = await auctions.findAll({
    where: whereClause,
    limit,
    offset,
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getAuction = asyncWrapper(async (req, res) => {
  let data = await auctions.findOne({
    where: { id: req.params.id },
    include: {
      model: realestates,
      as: "realestates",
      include: [
        {
          model: realestate_owners,
          as: "realestate_owners",
        },
        {
          model: realestate_licenses,
          as: "license",
        },
        {
          model: realestate_documents,
          as: "document",
        },
        {
          model: realestate_files,
          as: "realestate_files",
        },
        {
          model: scans,
          as: "scans",
        },
        {
          model: realestate_components,
          as: "realestate_components",
          include: [{ model: components, as: "component" }],
        },
        {
          model: realestate_properties,
          as: "realestate_properties",
          include: [
            {
              model: properties,
              as: "property",
            },
            {
              model: properties_options,
              as: "properties_option",
            },
          ],
        },
        {
          model: comparisons_evaluations,
          as: "comparisons_evaluations",
          include: [
            {
              model: comparisons_evaluation_realestates,
              as: "comparisons_evaluation_realestates",
              include: [
                {
                  model: comparisons_evaluation_realestates_properties,
                  as: "comparisons_evaluation_realestates_properties",
                },
              ],
            },
          ],
        },
        {
          model: cost_evaluations,
          as: "cost_evaluations",
          include: [
            {
              model: direct_costs,
              as: "direct_costs",
              include: [
                {
                  model: direct_cost_components,
                  as: "direct_cost_components",
                },
              ],
            },
            {
              model: indirect_costs,
              as: "indirect_costs",
              include: [
                {
                  model: indirect_cost_components,
                  as: "indirect_cost_components",
                },
              ],
            },
            {
              model: depreciations,
              as: "depreciations",
            },
          ],
        },
      ],
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
