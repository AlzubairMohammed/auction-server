const httpStatus = require("../utils/httpStatus");
const asyncWrapper = require("../middlewares/asyncWrapper");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { models } = require("../database/connection");
const { admins } = models;
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

exports.getAdmins = asyncWrapper(async (req, res, next) => {
  const data = await admins.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getAdmin = asyncWrapper(async (req, res, next) => {
  const data = await admins.findOne({
    where: { id: req.params.id },
    attributes: {
      exclude: ["password"],
    },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createAdmin = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const oldAdmin = await admins.findOne({
    where: {
      email,
    },
  });
  if (oldAdmin) {
    const error = errorResponse.create(
      "Admin already exists",
      400,
      httpStatus.FAIL
    );
    return next(error);
  }
  req.body.password = await bcrypt.hash(password, 10);
  const data = await admins.create(req.body);
  const token = await jwt({
    email: data.email,
    id: data.id,
  });
  data.token = token;
  await data.save();
  return res.json({
    status: httpStatus.SUCCESS,
    data: "Admin created successfuly",
  });
});

exports.login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    const error = errorResponse.create(
      "email and password are required",
      400,
      httpStatus.FAIL
    );
    return next(error);
  }

  const admin = await admins.findOne({
    where: {
      email,
    },
  });

  if (!admin) {
    const error = errorResponse.create("Admin not found", 400, httpStatus.FAIL);
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, admin.password);

  if (admin && matchedPassword) {
    const token = await jwt({
      email: admin.email,
      role: admin.role,
      id: admin.id,
    });

    return res.json({
      status: httpStatus.SUCCESS,
      data: { auth_type: "Bearer", token },
    });
  } else {
    const error = errorResponse.create(
      "something wrong",
      500,
      httpStatus.ERROR
    );
    return next(error);
  }
});

exports.updateAdmin = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  const id = req.params.id;
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const data = await admins.update(req.body, {
    where: { id },
  });
  console.log(data);
  if (!data[0]) {
    const error = errorResponse.create(
      `Admin with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  res.json({ status: httpStatus.SUCCESS, data: "Admin updated successfuly" });
});

exports.deleteAdmin = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await admins.destroy({ where: { id } });
  if (!data) {
    const error = errorResponse.create(
      `Admin with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: "Admin deleted" });
});
