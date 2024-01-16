const express = require("express");
const { bkashAuth } = require("../middlewares/bkashMiddleware");
const {
  createPayment,
  paymentCallback,
  paymentRefund,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/bkash/create", bkashAuth, createPayment);
router.get("/bkash/callback", bkashAuth, paymentCallback);
router.get("/bkash/refund/:trxID", bkashAuth, paymentRefund);

module.exports = router;
