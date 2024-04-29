const jwt = require("jsonwebtoken");
const httpStatus = require("../utils/httpStatus");
const errorResponse = require("../utils/errorResponse");
const { models } = require("../database/connection");
const { users, user_roles, role_permissions, permissions, roles } = models;
const verifyToken = async (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    const error = errorResponse.create(
      "token is required",
      401,
      httpStatus.ERROR
    );
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  try {
    console.log(token, "token");
    let currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    currentUser = await users.findOne({
      where: { id: currentUser.id },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: user_roles,
          as: "user_roles",
          include: [
            {
              model: roles,
              as: "role",
              include: [
                {
                  model: role_permissions,
                  as: "role_permissions",
                  include: [
                    {
                      model: permissions,
                      as: "permission",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    req.currentUser = currentUser;
    next();
  } catch (err) {
    const error = errorResponse.create("invalid token", 401, httpStatus.ERROR);
    return next(error);
  }
};

module.exports = verifyToken;
