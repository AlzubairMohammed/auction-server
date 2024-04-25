const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models, sequelize } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { properties, properties_options } = models;
const { convertFormData } = require("../utils/convertFormData.js");

exports.getProperties = asyncWrapper(async (req, res) => {
  let data = await properties.findAll({
    include: [
      {
        model: properties_options,
        as: "properties_options",
      },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getProperty = asyncWrapper(async (req, res) => {
  let data = await properties.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: properties_options,
        as: "properties_options",
      },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createProperty = asyncWrapper(async (req, res, next) => {
  req.body = convertFormData(req.body);
  let data;
  let options = Object.values(req.body.options);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  try {
    transaction = await sequelize.transaction();
    data = await properties.create(req.body, { transaction });
    if (options) {
      options = options.map((option) => {
        option.property_id = data.id;
        return option;
      });
      const optionData = await properties_options.bulkCreate(options, {
        transaction,
      });
    }
    await transaction.commit();
    return res.json({ status: httpStatus.SUCCESS, data });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    next(error);
  }
});

exports.editProperty = asyncWrapper(async (req, res) => {
  let transaction;
  let data;
  let options = req.body.options;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  try {
    transaction = await sequelize.transaction();
    await properties.update(req.body, {
      where: { id: req.params.id },
      transaction,
    });
    await properties_options.destroy({ where: { property_id: req.params.id } });
    options = options.map((option) => {
      option.property_id = req.params.id;
      return option;
    });
    const optionData = await properties_options.bulkCreate(options, {
      transaction,
    });
    await transaction.commit();
    return res.json({ status: httpStatus.SUCCESS, data, optionData });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    next(error);
  }
});

exports.deleteProperty = asyncWrapper(async (req, res) => {
  let data = await properties.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
