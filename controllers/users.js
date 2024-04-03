const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");

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

  const user = await User.findOne({
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
