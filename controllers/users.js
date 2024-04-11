const httpStatus = require("../utils/httpStatus");
const asyncWrapper = require("../middlewares/asyncWrapper");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { models } = require("../database/connection");
const { users } = models;
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

exports.getUsers = asyncWrapper(async (req, res, next) => {
  const data = await users.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getUser = asyncWrapper(async (req, res, next) => {
  const data = await users.findOne({
    where: { id: req.params.id },
    attributes: {
      exclude: ["password"],
    },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createUser = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const oldUser = await users.findOne({
    where: {
      email,
    },
  });
  if (oldUser) {
    const error = errorResponse.create(
      "User already exists",
      400,
      httpStatus.FAIL
    );
    return next(error);
  }
  req.body.password = await bcrypt.hash(password, 10);
  const data = await users.create(req.body);
  const token = await jwt({
    email: data.email,
    id: data.id,
  });
  data.token = token;
  await data.save();
  return res.json({
    status: httpStatus.SUCCESS,
    data: "User created successfuly",
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

  const user = await users.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    const error = errorResponse.create("user not found", 400, httpStatus.FAIL);
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    const token = await jwt({
      email: user.email,
      role: user.role,
      id: user.id,
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

exports.updateUser = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  const id = req.params.id;
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const data = await users.update(req.body, {
    where: { id },
  });
  console.log(data);
  if (!data[0]) {
    const error = errorResponse.create(
      `User with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  res.json({ status: httpStatus.SUCCESS, data: "User updated successfuly" });
});

exports.deleteUser = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await users.destroy({ where: { id } });
  if (!data) {
    const error = errorResponse.create(
      `User with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: "User deleted" });
});
