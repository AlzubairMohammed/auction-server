const { body } = require("express-validator");

exports.auctionsValidator = () => {
  return [
    body("assignment_number")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("auction_type").notEmpty().withMessage("Field is required ."),
    body("start_date")
      .notEmpty()
      .withMessage("Field is required .")
      .isDate()
      .withMessage("Field must be date ."),
    body("name")
      .isString()
      .withMessage("Field must be string .")
      .notEmpty()
      .withMessage("Field is required ."),
    body("end_date")
      .notEmpty()
      .withMessage("Field is required .")
      .isDate()
      .withMessage("Field must be date ."),
    body("user_id").notEmpty().withMessage("Field is required ."),
  ];
};