const { models } = require("../database/connection");
const { validationResult } = require("express-validator");
const httpStatus = require("../utils/httpStatus");
const errorResponse = require("../utils/errorResponse");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { appartments, appartment_images, cities, areas } = models;
const path = require("path");

exports.creatAppartment = asyncWrapper(async (req, res, next) => {
  const { images } = req.files;
  let fileName = "";
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const data = await appartments.create(req.body);
  if (Array.isArray(images)) {
    images.map(async (image) => {
      fileName = Date.now() + image.name + "";
      const filepath = path.join(__dirname, "../uploads/appartments", fileName);
      image.mv(filepath, (err) => {
        if (err) {
          const error = errorResponse.create(err, 500, httpStatus.FAIL);
          return next(error);
        }
      });
      imageDate = await appartment_images.create({
        image: fileName,
        appartment_id: data.id,
      });
    });
  } else {
    fileName = Date.now() + images.name + "";
    const filepath = path.join(__dirname, "../uploads/products", fileName);
    images.mv(filepath, (err) => {
      if (err) {
        const error = ErrorResponse.create(err, 500, httpStatus.FAIL);
        return next(error);
      }
    });
    imageDate = await appartment_images.create({
      image: fileName,
      appartment_id: data.id,
    });
  }
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getAppartment = asyncWrapper(async (req, res, next) => {
  const data = await appartments.findByPk(req.params.id, {
    include: [
      { model: cities, as: "city" },
      { model: areas, as: "area" },
      { model: appartment_images, as: "appartment_images" },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getAppartments = asyncWrapper(async (req, res) => {
  const data = await appartments.findAll({
    include: [
      { model: areas, as: "area" },
      { model: cities, as: "city" },
      { model: appartment_images, as: "appartment_images" },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.updateAppartment = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.ERROR);
    next(error);
  }
});

exports.deleteAppartment = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await appartments.destroy({ where: { id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
