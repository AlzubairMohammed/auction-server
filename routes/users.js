const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const {
  loginValidation,
  createUserValidator,
} = require("../validations/authValidation");
router.post("/login", loginValidation(), login);
router.post("/", createUserValidator(), createUser);
module.exports = router;
