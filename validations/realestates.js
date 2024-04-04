const { body } = require("express-validator");

exports.auctionsValidator = () => {
  return [
    body("assignment_number")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("auction_type").notEmpty().withMessage("Field is required ."),
  ];
};
