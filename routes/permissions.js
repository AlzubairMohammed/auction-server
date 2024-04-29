const router = require("express").Router();
const { perimissionsValidator } = require("../validations/permissions");
const {
  getPermissions,
  getPermission,
  createPermission,
  editPermission,
  deletePermission,
} = require("../controllers/permissions");

router
  .get("/", getPermissions)
  .get("/:id", getPermission)
  .post("/", perimissionsValidator(), createPermission)
  .put("/:id", editPermission)
  .delete("/:id", deletePermission);

module.exports = router;
