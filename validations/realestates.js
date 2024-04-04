const { body } = require("express-validator");

exports.realestateValidator = () => {
  return [
    body("customer_name")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("owner_name")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("owner_number")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("customer_number")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("auction_id")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be integer ."),
    body("license_number")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("license_issuance_place_id")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be integer ."),
    body("license_date")
      .notEmpty()
      .withMessage("Field is required .")
      .isDate()
      .withMessage("Field must be date ."),
    body("license_path")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("license_realestate_type_id")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be integer ."),
    body("owners.*.name")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("owners.*.identity_number")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("owners.*.nationality")
      .notEmpty()
      .withMessage("Field is required .")
      .isString()
      .withMessage("Field must be string ."),
    body("owners.*.ownership_percentage")
      .notEmpty()
      .withMessage("Field is required .")
      .isInt()
      .withMessage("Field must be string ."),
  ];
};
