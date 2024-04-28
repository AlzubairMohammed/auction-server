const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models, sequelize } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { convertFormData } = require("../utils/convertFormData.js");
const {
  scans,
  realestate_properties,
  realestate_components,
  realestate_images,
  realestates,
  realestate_images_descriptions,
} = models;

exports.getScans = asyncWrapper(async (req, res) => {
  let data = await scans.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getScan = asyncWrapper(async (req, res) => {
  let data = await scans.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: realestates,
        as: "realestate",
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
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createScan = asyncWrapper(async (req, res, next) => {
  req.body = convertFormData(req.body);
  if (req.body.properties) {
    req.body.properties = Object.values(req.body.properties);
  }
  req.files = Object.values(req.files);
  const imagesNames = req.body.imagesNames;
  let counter = 0;
  const transaction = await sequelize.transaction();
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
          property_id: property.id,
          value: property.value,
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
        });
      })
    );
  }
  if (req.files) {
    if (Array.isArray(req.files)) {
      await Promise.all(
        req.files.map(async (file) => {
          const desData = await realestate_images_descriptions.create({
            description: imagesNames[counter++].name,
          });
          await realestate_images.create({
            realestate_id: req.body.realestate_id,
            realestate_images_description_id: desData.id,
            path: file.name,
          });
          const dateNow = new Date().toISOString().replace(/[:\.]/g, "-");
          const filePath = `uploads/realestates/${dateNow}-${file.name}`;
          await file.mv(filePath);
        })
      );
    } else {
      const file = req.files;
      const desData = await realestate_images_descriptions.create({
        description: imagesNames[counter++].name,
      });
      await realestate_images.create({
        realestate_id: req.body.realestate_id,
        realestate_images_description_id: desData.id,
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
