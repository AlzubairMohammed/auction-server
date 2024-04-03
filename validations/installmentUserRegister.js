const { body } = require("express-validator");

exports.installmentUserRegisterValidator = () => {
  return [
    // body("rent_id").isInt("Rent id must be integer ."),
    body("name")
      .notEmpty()
      .withMessage("Name can't be null .")
      .isString()
      .withMessage("Name must be string format ."),
    body("email")
      .isEmail()
      .withMessage("Email must be in email format like name@provider.com ."),
    body("phone").isMobilePhone().withMessage("Phone must in right format ."),
    body("have_family").isBoolean().withMessage("This field must be boolean ."),
    body("salary").isDecimal().withMessage("Field must be decimal ."),
    body("nationality").isString("Field must be string ."),
    body("gender").isInt().withMessage("Field must be integer ."),
    body("user_id").isInt().withMessage("Field must be integer ."),
    body("more_info"),
    body("expect_rent_date")
      .isDate()
      .withMessage("Field must be in date format")
      .notEmpty()
      .withMessage("Field can't be null"),
  ];
};
