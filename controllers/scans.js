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
  // return res.status(500).json(req.body);
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
        if (property.multiple) {
          property.value = Object.values(property.value);
          property.value.map(async (value) => {
            // return res.status(500).json(value, "multiple value");
            await realestate_properties.create({
              realestate_id: req.body.realestate_id,
              property_id: value.property_id,
              properties_option_id: value.id,
            });
          });
        } else if (property.type === "single" && property.value) {
          console.log(property, "property");
          await realestate_properties.create({
            realestate_id: req.body.realestate_id,
            property_id: property.id,
            properties_option_id: property.value.id,
          });
        } else {
          console.log(property.id, "property id");
          // return res.status(500).json(property.id);
          await realestate_properties.create({
            realestate_id: req.body.realestate_id,
            property_id: property.id,
            value: property.value,
          });
        }
      })
    );
  }
  if (req.body.components) {
    req.body.components = Object.values(req.body.components);
    await Promise.all(
      req.body.components.map(async (component) => {
        await realestate_components.create({
          realestate_id: req.body.realestate_id,
          component_id: component.id,
          value: component.value,
        });
      })
    );
  }
  if (req.files) {
    if (Array.isArray(req.files[0])) {
      await Promise.all(
        req.files[0].map(async (file) => {
          const dateNow = new Date().toISOString().replace(/[:\.]/g, "-");
          const filePath = `uploads/realestates/${dateNow}-${file.name}`;
          const desData = await realestate_images_descriptions.create({
            description: imagesNames[counter++].name,
          });
          await realestate_images.create({
            realestate_id: req.body.realestate_id,
            realestate_images_description_id: desData.id,
            path: filePath,
          });
          await file.mv(filePath);
        })
      );
    } else {
      const file = req.files[0];
      const dateNow = new Date().toISOString().replace(/[:\.]/g, "-");
      const filePath = `uploads/realestates/${dateNow}-${file.name}`;
      const desData = await realestate_images_descriptions.create({
        description: imagesNames[counter++].name,
      });
      await realestate_images.create({
        realestate_id: req.body.realestate_id,
        realestate_images_description_id: desData.id,
        path: filePath,
      });
      await file.mv(filePath);
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
