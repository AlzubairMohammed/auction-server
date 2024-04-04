const { body } = require("express-validator");

exports.realestateTyesValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
  ];
};
