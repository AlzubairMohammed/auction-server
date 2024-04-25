const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { convertFormData } = require("../utils/convertFormData.js");
const {
  realestates,
  realestate_owners,
  realestate_licenses,
  realestate_documents,
  realestate_files,
} = models;

exports.createRealestate = asyncWrapper(async (req, res, next) => {
  req.body = convertFormData(req.body);
  if (req.body.owners) {
    req.body.owners = Object.values(req.body.owners);
  }
  req.files = Object.values(req.files);
  const fileNames = req.body.filesNames;
  let counter = 0;
  // return res.json({ status: httpStatus.SUCCESS, data: req.body });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const { owners, document } = req.body;
  // create realestate

  let data = await realestates.create(req.body);
  // upload files
  if (req.files) {
    if (Array.isArray(req.files)) {
      await Promise.all(
        req.files.map(async (file) => {
          await realestate_files.create({
            realestate_id: data.id,
            name: fileNames[counter++].name,
            path: file.name,
          });
          const dateNow = new Date().toISOString().replace(/[:\.]/g, "-");
          const filePath = `uploads/realestates/${dateNow}-${file.name}`;
          await file.mv(filePath);
        })
      );
    } else {
      const file = req.files;
      await realestate_files.create({
        realestate_id: data.id,
        name: fileNames[counter++].name,
        path: file.name,
      });
    }
  }
  // create realestate document
  if (document) {
    document.realestate_id = data.id;
    await realestate_documents.create(document);
  }
  // create realestate license
  req.body.license.realestate_id = data.id;
  await realestate_licenses.create(req.body.license);
  // create realestate owners
  if (owners) {
    await realestate_owners.bulkCreate(
      owners.map((owner) => ({
        realestate_id: data.id,
        ...owner,
      }))
    );
  }
  // create realestate document

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
      {
        model: realestate_documents,
        as: "realestate_documents",
      },
      {
        model: realestate_files,
        as: "realestate_files",
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
