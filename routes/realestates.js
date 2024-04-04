const router = require("express").Router();
const { realestateValidator } = require("../validations/realestates");
const {
  getRealestates,
  getRealestate,
  createRealestate,
  editRealestate,
  deleteRealestate,
} = require("../controllers/realestates");

router
  .post("/", realestateValidator(), createRealestate)
  .get("/:id", getRealestate)
  .get("/", getRealestates)
  .delete("/:id", deleteRealestate)
  .put("/:id", editRealestate);

module.exports = router;
