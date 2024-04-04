const { body } = require("express-validator");

exports.quartersValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("city_id")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be integer ."),
  ];
};
