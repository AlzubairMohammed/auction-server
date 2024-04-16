const { body } = require("express-validator");

exports.directCapitalizationEvaluationValidator = () => {
  return [
    body("crossIncome")
      .notEmpty()
      .withMessage("Field is required .")
      .isDecimal()
      .withMessage("Field must be a float."),
    body("operationPercentage")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be a number."),
    body("capitalizationPercentage")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be a number."),
  ];
};
