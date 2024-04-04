const { body } = require("express-validator");

exports.scansValidator = () => {
  return [
    body("lat")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("lng")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("user_id")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be integer ."),
    body("realestate_id")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be integer ."),
  ];
};
