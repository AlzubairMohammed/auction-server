const { check } = require("express-validator");
exports.realestateValidator = () => {
  return [
    check("customer_name").notEmpty().withMessage("Customer name is required"),
    check("customer_number")
      .notEmpty()
      .withMessage("Customer number is required"),
    check("owner_name").notEmpty().withMessage("Owner name is required"),
    check("owner_number").notEmpty().withMessage("Owner number is required"),
    check("auction_id").notEmpty().withMessage("Auction ID is required"),
    check("license[*].number")
      .notEmpty()
      .withMessage("License number is required"),
    check("license[*].issuance_place_id")
      .notEmpty()
      .withMessage("Issuance place ID is required"),
    check("license[*].date")
      .notEmpty()
      .isDate()
      .withMessage("License date is required and must be a valid date"),
    check("license[*].path").notEmpty().withMessage("License path is required"),
    check("license[*].realestate_type_id")
      .notEmpty()
      .withMessage("Real estate type ID is required"),
    check("owners.*.name").notEmpty().withMessage("Owner name is required"),
    check("owners.*.identity_number")
      .notEmpty()
      .withMessage("Identity number is required"),
    check("owners.*.nationality")
      .notEmpty()
      .withMessage("Nationality is required"),
    check("owners.*.ownership_percentage")
      .notEmpty()
      .isNumeric()
      .withMessage("Ownership percentage is required and must be a number"),
    check("files.*.name").notEmpty().withMessage("File name is required"),
  ];
};
