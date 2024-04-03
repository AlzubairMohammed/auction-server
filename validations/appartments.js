const { body } = require("express-validator");

exports.appartmentsValidator = () => {
  return [
    body("city_id").notEmpty().withMessage("Field is required ."),
    body("area_id").notEmpty().withMessage("Field is required ."),
    body("type")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be integer ."),
    body("street_name")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("building_name")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string"),
    body("building_no")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("price")
      .notEmpty()
      .withMessage("Field is required .")
      .isDecimal()
      .withMessage("Field must be string ."),
    body("owner_name")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("owner_phone")
      .notEmpty()
      .withMessage("Field is required .")
      .isLuhnNumber()
      .withMessage("Field must be phone number ."),
    body("lat")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string"),
    body("lng")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("status")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be integer ."),
  ];
};
