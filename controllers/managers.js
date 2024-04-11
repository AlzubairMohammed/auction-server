const httpStatus = require("../utils/httpStatus");
const asyncWrapper = require("../middlewares/asyncWrapper");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { models } = require("../database/connection");
const { managers } = models;
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

exports.getManagers = asyncWrapper(async (req, res, next) => {
  const data = await managers.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getManager = asyncWrapper(async (req, res, next) => {
  const data = await managers.findOne({
    where: { id: req.params.id },
    attributes: {
      exclude: ["password"],
    },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createManager = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const oldManager = await managers.findOne({
    where: {
      email,
    },
  });
  if (oldManager) {
    const error = errorResponse.create(
      "Manager already exists",
      400,
      httpStatus.FAIL
    );
    return next(error);
  }
  req.body.password = await bcrypt.hash(password, 10);
  const data = await managers.create(req.body);
  const token = await jwt({
    email: data.email,
    id: data.id,
  });
  data.token = token;
  await data.save();
  return res.json({
    status: httpStatus.SUCCESS,
    data: "Manager created successfuly",
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

  const manager = await managers.findOne({
    where: {
      email,
    },
  });

  if (!manager) {
    const error = errorResponse.create(
      "Manager not found",
      400,
      httpStatus.FAIL
    );
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, manager.password);

  if (manager && matchedPassword) {
    const token = await jwt({
      email: manager.email,
      role: manager.role,
      id: manager.id,
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

exports.updateManager = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  const id = req.params.id;
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const data = await managers.update(req.body, {
    where: { id },
  });
  console.log(data);
  if (!data[0]) {
    const error = errorResponse.create(
      `Manager with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  res.json({ status: httpStatus.SUCCESS, data: "Manager updated successfuly" });
});

exports.deleteManager = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await managers.destroy({ where: { id } });
  if (!data) {
    const error = errorResponse.create(
      `Manager with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: "Manager deleted" });
});
