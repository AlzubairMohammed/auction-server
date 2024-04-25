const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const {
  scans,
  realestate_properties,
  realestate_components,
  realestate_images,
} = models;

exports.getScans = asyncWrapper(async (req, res) => {
  let data = await scans.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getScan = asyncWrapper(async (req, res) => {
  let data = await scans.findOne({
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createScan = asyncWrapper(async (req, res, next) => {
  req.body = convertFormData(req.body);
  if (req.body.properties) {
    req.body.properties = Object.values(req.body.properties);
  }
  req.images = Object.values(req.images);
  const imagesNames = req.body.imagesNames;
  let counter = 0;
  const transaction = await models.sequelize.transaction();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await scans.create(req.body);
  if (req.body.properties) {
    await Promise.all(
      req.body.properties.map(async (property) => {
        await realestate_properties.create({
          realestate_id: req.body.realestate_id,
          property_id: property.property_id,
          value: property.value,
          isFeature: property.isFeature,
        });
      })
    );
  }
  if (req.body.components) {
    await Promise.all(
      req.body.components.map(async (component) => {
        await realestate_components.create({
          realestate_id: req.body.realestate_id,
          component_id: component.component_id,
          value: component.value,
          isFeature: component.isFeature,
        });
      })
    );
  }
  if (req.images) {
    if (Array.isArray(req.images)) {
      await Promise.all(
        req.images.map(async (file) => {
          await realestate_images.create({
            realestate_id: req.body.realestate_id,
            name: imagesNames[counter++].name,
            path: file.name,
          });
          const dateNow = new Date().toISOString().replace(/[:\.]/g, "-");
          const filePath = `uploads/realestates/${dateNow}-${file.name}`;
          await file.mv(filePath);
        })
      );
    } else {
      const file = req.images;
      await realestate_images.create({
        realestate_id: req.body.realestate_id,
        name: imagesNames[counter++].name,
        path: file.name,
      });
    }
  }
  await transaction.commit();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editScan = asyncWrapper(async (req, res) => {
  let data = await scans.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteScan = asyncWrapper(async (req, res) => {
  let data = await scans.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
