const { body } = require("express-validator");

exports.citiesValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
  ];
};
