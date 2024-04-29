const router = require("express").Router();
const { rolesValidator } = require("../validations/roles");
const {
  getRoles,
  getRole,
  createRole,
  editRole,
  deleteRole,
} = require("../controllers/roles");

router
  .get("/", getRoles)
  .get("/:id", getRole)
  .post("/", rolesValidator(), createRole)
  .delete("/:id", deleteRole)
  .put("/:id", editRole);

module.exports = router;
