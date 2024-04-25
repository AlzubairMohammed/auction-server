const { body } = require("express-validator");

exports.realestateComponentsValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
  ];
};
