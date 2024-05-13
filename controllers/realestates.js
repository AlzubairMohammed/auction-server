const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models, sequelize } = require("../database/connection");
const { Op } = require("sequelize");
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
  comparisons_evaluations,
  comparisons_evaluation_realestates,
  comparisons_evaluation_realestates_properties,
  cost_evaluations,
  direct_costs,
  direct_cost_components,
  indirect_costs,
  indirect_cost_components,
  depreciations,
} = models;

exports.createRealestate = asyncWrapper(async (req, res, next) => {
  const transaction = await sequelize.transaction();
  req.body = convertFormData(req.body);
  if (req.body.owners) {
    req.body.owners = Object.values(req.body.owners);
  }
  req.files = Object.values(req.files);
  const fileNames = req.body.filesNames;
  // return res.json({ "Files list": req.files[0][1].name });
  let counter = 0;
  // return res.json({ status: httpStatus.SUCCESS, data: req.body });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const { owners, document } = req.body;
  // create realestate document
  if (document) {
    const documentData = await realestate_documents.create(document, {
      transaction,
    });
    req.body.document_id = documentData.id;
  }
  // create realestate license
  if (req.body.license) {
    const licenseData = await realestate_licenses.create(req.body.license, {
      transaction,
    });
    req.body.license_id = licenseData.id;
  }
  // create realestate
  let data = await realestates.create(req.body, { transaction });
  // upload files
  if (req.files) {
    if (Array.isArray(req.files[0])) {
      await Promise.all(
        req.files[0].map(async (file) => {
          const dateNow = new Date().toISOString().replace(/[:\.]/g, "-");
          const filePath = `uploads/realestates/${dateNow}-${file.name}`;
          await realestate_files.create(
            {
              realestate_id: data.id,
              name: filePath,
              path: file.name,
            },
            { transaction }
          );
          await file.mv(filePath);
        })
      );
    } else {
      const file = req.files;
      await realestate_files.create(
        {
          realestate_id: data.id,
          name: fileNames[counter++].name,
          path: file.name,
        },
        { transaction }
      );
    }
  }
  // create realestate owners
  if (owners) {
    await realestate_owners.bulkCreate(
      owners.map(
        (owner) => ({
          realestate_id: data.id,
          ...owner,
        }),
        { transaction }
      )
    );
  }
  // create realestate document
  transaction.commit();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getRealestates = asyncWrapper(async (req, res) => {
  const limit = +req.query.limit || 100;
  const offset = +req.query.offset || 0;
  let whereClause = {};
  if (req.query.key && req.query.value) {
    whereClause[req.query.key] = { [Op.like]: `%${req.query.value}%` };
  }
  let data = await realestates.findAll(
    {
      where: whereClause,
      limit,
      offset,
    },
    {
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
    }
  );
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

exports.getNotEvaluatedRealestates = asyncWrapper(async (req, res) => {
  let data = await realestates.findAll({
    where: { is_evaluated: false },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});
