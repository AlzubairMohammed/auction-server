const router = require("express").Router();
const {
  getManagers,
  getManager,
  createManager,
  login,
  updateManager,
  deleteManager,
} = require("../controllers/managers");
const {
  loginValidation,
  createManagerValidator,
} = require("../validations/managers");
router.get("/", getManagers);
router.get("/:id", getManager);
router.post("/", createManagerValidator(), createManager);
router.post("/login", loginValidation(), login);
router.put("/:id", updateManager);
router.delete("/:id", deleteManager);
module.exports = router;
