const asyncWrapper = require("../middlewares/asyncWrapper.js");
const { models } = require("../database/connection");
const httpStatus = require("../utils/httpStatus.js");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const { roles, role_permissions } = models;

exports.getRoles = asyncWrapper(async (req, res) => {
  let data = await roles.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getRole = asyncWrapper(async (req, res) => {
  let data = await roles.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: role_permissions,
        as: "role_permissions",
      },
    ],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createRole = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  let data = await roles.create(req.body);
  let rolePermissions = req.body.permissions;
  if (rolePermissions && rolePermissions.length > 0) {
    await role_permissions.bulkCreate(
      rolePermissions.map((permission) => ({
        role_id: data.id,
        permission_id: permission,
      }))
    );
  }
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.editRole = asyncWrapper(async (req, res) => {
  let data = await roles.update(req.body, {
    where: { id: req.params.id },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.deleteRole = asyncWrapper(async (req, res) => {
  let data = await roles.destroy({ where: { id: req.params.id } });
  return res.json({ status: httpStatus.SUCCESS, data });
});
