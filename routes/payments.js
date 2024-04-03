const router = require("express").Router();

const { monthPayment, paymentCallback } = require("../controllers/payments");

router.post("/", monthPayment);
router.get("/error", (req, res) => {
  return res.status(400).json({ status: false });
});
router.get("/success", paymentCallback);

module.exports = router;
