const { body } = require("express-validator");

exports.directCapitalizationEvaluationValidator = () => {
  return [
    body("cross_income")
      .notEmpty()
      .withMessage("Field is required .")
      .isDecimal()
      .withMessage("Field must be a float."),
    body("operation_income_rate")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be a number."),
    body("capitalization_rate")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be a number."),
    body("realestate_id")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be a number."),
  ];
};
