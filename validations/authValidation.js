const { body } = require("express-validator");

exports.createUserValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name cannot be empty")
      .isString()
      .withMessage("Name must be a string"),
    body("password")
      .notEmpty()
      .withMessage("Password cannot be empty")
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 4 })
      .withMessage("name at least is 4 digits"),
  ];
};
exports.loginValidation = () => {
  return [
    body("email").notEmpty().withMessage("you must to send email"),
    body("password")
      .notEmpty()
      .withMessage("you must to send password")
      .isLength({ min: 4 })
      .withMessage("password at least 4 digits"),
  ];
};
