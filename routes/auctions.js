const router = require("express").Router();
const { auctionsValidator } = require("../validations/auctions");
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
  .post("/", auctionsValidator(), createAuction)
  .get("/:id", getAuction)
  .get("/", getAuctions)
  .delete("/:id", deleteAuction)
  .put("/:id", editAuction)
  .post("/search", search)
  .get("/admin/:id", getAminAuctions);

module.exports = router;
