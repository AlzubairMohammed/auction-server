const errorResponse = require("../utils/errorResponse");

module.exports = (role) => {
  return (req, res, next) => {
    if (
      !Object.values(
        req?.currentUser?.user_roles[0]?.role?.role_permissions
      ).some((r) => r?.permission?.name === role)
    ) {
      return next(errorResponse.create("this role is not authorized", 401));
    }
    next();
  };
};
