const router = require("express").Router();
const {
  realestateOwnersValidator,
} = require("../validations/realestateOwners");
const {
  getRealestateOwners,
  getRealestateOwner,
  createRealestateOwner,
  editRealestateOwner,
  deleteRealestateOwner,
} = require("../controllers/realestateOwners");

router
  .get("/", getRealestateOwners)
  .get("/:id", getRealestateOwner)
  .post("/", realestateOwnersValidator(), createRealestateOwner)
  .put("/:id", editRealestateOwner)
  .delete("/:id", deleteRealestateOwner);

module.exports = router;
