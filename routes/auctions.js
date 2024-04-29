const router = require("express").Router();
const { auctionsValidator } = require("../validations/auctions");
const verfiyToken = require("../middlewares/userVerifyToken");
const permissions = require("../middlewares/permissions");
const {
  getAuctions,
  getAuction,
  createAuction,
  editAuction,
  deleteAuction,
  search,
  getAminAuctions,
} = require("../controllers/auctions");

router
  .get("/", verfiyToken, permissions("pr1"), getAuctions)
  .get("/:id", getAuction)
  .post("/", auctionsValidator(), createAuction)
  .delete("/:id", deleteAuction)
  .put("/:id", editAuction)
  .post("/search", search)
  .get("/admin/:id", getAminAuctions);

module.exports = router;
