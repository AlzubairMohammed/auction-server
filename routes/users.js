const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const {
  loginValidation,
  createUserValidator,
} = require("../validations/usersValidation");
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUserValidator(), createUser);
router.post("/login", loginValidation(), login);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
module.exports = router;
