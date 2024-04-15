const { body } = require("express-validator");

exports.directCapitalizationEvaluationValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
  ];
};
