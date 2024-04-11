const router = require("express").Router();
const {
  getAdmins,
  getAdmin,
  createAdmin,
  login,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admins");
const {
  loginValidation,
  createAdminValidator,
} = require("../validations/adminsValidation");
router.get("/", getAdmins);
router.get("/:id", getAdmin);
router.post("/", createAdminValidator(), createAdmin);
router.post("/login", loginValidation(), login);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
module.exports = router;
