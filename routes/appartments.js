const router = require("express").Router();
const { appartmentsValidator } = require("../validations/appartments");
const {
  creatAppartment,
  getAppartment,
  getAppartments,
  deleteAppartment,
} = require("../controllers/appartments");

router
  .post("/", appartmentsValidator(), creatAppartment)
  .get("/:id", getAppartment)
  .get("/", getAppartments)
  .delete("/:id", deleteAppartment);

module.exports = router;
