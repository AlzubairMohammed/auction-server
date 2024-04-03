const router = require("express").Router();
const {
  installmentUserRegisterValidator,
} = require("../validations/installmentUserRegister");
const {
  userRegister,
  getRequests,
  getInstallment,
  getInstallments,
  createInstallment,
  deleteInstallment,
  updateInstallment,
  getUserInstallment,
  getRequest,
  updateRequest,
  updateMonth,
} = require("../controllers/installments");

router.post("/user-register", installmentUserRegisterValidator(), userRegister);
router.get("/requests", getRequests);
router.get("/requests/:id", getRequest);
router.put("/requests/:id", updateRequest);
router
  .get("/", getInstallments)
  .get("/user/:id", getUserInstallment)
  .post("/", createInstallment)
  .get("/:id", getInstallment)
  .delete("/:id", deleteInstallment)
  .put("/:id", updateInstallment)
  .put("/months/:id", updateMonth);
module.exports = router;
