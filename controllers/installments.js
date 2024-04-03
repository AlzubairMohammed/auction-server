const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const {
  installment_user_register,
  users,
  rents,
  out_appartments,
  installments,
  appartments,
  installment_months,
  cities,
  areas,
  appartment_images,
} = models;
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
exports.userRegister = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await installment_user_register.create(req.body);
  req.body.rent.register_id = data.id;
  if (req.body.rent) data.rent = await out_appartments.create(req.body.rent);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getRequests = asyncWrapper(async (req, res, next) => {
  const data = await installment_user_register.findAll({
    include: [
      {
        model: users,
        as: "user",
      },
      {
        model: rents,
        as: "rent",
      },
      {
        model: out_appartments,
        as: "out_appartments",
        include: [
          { model: cities, as: "city" },
          { model: areas, as: "area" },
        ],
      },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});
exports.getRequest = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await installment_user_register.findOne({
    where: { id },
    include: [
      {
        model: users,
        as: "user",
      },
      {
        model: rents,
        as: "rent",
      },
      {
        model: out_appartments,
        as: "out_appartments",
        include: [
          { model: cities, as: "city" },
          { model: areas, as: "area" },
        ],
      },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.updateRequest = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  let data = await installment_user_register.findOne({ where: { id } });
  if (data) {
    const request = await installment_user_register.update(req.body, {
      where: { id },
    });
    return res.json({ status: httpStatus.SUCCESS, request });
  }
});

exports.getInstallment = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await installments.findOne({
    where: { id },
    include: [
      {
        model: appartments,
        as: "appartment",
        include: [
          {
            model: appartment_images,
            as: "appartment_images",
          },
          { model: cities, as: "city" },
          { model: areas, as: "area" },
        ],
      },
      { model: installment_user_register, as: "installment_user_register" },
      { model: installment_months, as: "installment_months" },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getInstallments = asyncWrapper(async (req, res, next) => {
  const data = await installments.findAll({
    include: [
      { model: appartments, as: "appartment" },
      { model: installment_user_register, as: "installment_user_register" },
      { model: installment_months, as: "installment_months" },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createInstallment = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.ERROR);
    next(error);
  }
  const appartmentId = req.body.appartment_id;
  const appartment = await appartments.findOne({ where: { id: appartmentId } });
  let data = await installments.create(req.body);
  const installment_id = data.id;
  let now = new Date(req.body.installment_start_date);

  for (let index = 0; index < 12; index++) {
    let nextMonthDate = new Date(
      now.getFullYear(),
      now.getMonth() + index,
      now.getDate()
    );
    await installment_months.create({
      installment_id,
      date: nextMonthDate,
      price: appartment.price / 12,
    });
  }
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.updateInstallment = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.ERROR);
    next(error);
  }
  // const data = await
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteInstallment = asyncWrapper(async (req, res, next) => {
  return res.json("Installment deleted");
});

exports.getUserInstallment = asyncWrapper(async (req, res, next) => {
  const data = await installment_user_register.findOne({
    where: { user_id: req.params.id },
    include: [
      {
        model: rents,
        as: "rent",
      },
      {
        model: installments,
        as: "installments",
        include: [
          {
            model: installment_months,
            as: "installment_months",
          },
          {
            model: appartments,
            as: "appartment",
            include: [{ model: appartment_images, as: "appartment_images" }],
          },
        ],
      },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.updateMonth = asyncWrapper(async (req, res, next) => {
  // return res.json(req.body);
  req.body.paid_date = new Date();
  req.body.status = true;
  const id = req.params.id;
  const data = await installment_months.update(req.body, { where: { id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
