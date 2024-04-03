const router = require("express").Router();
const { login } = require("../controllers/users");
const { loginValidation } = require("../validations/authValidation");
router.post("/login", loginValidation(), login);
module.exports = router;
