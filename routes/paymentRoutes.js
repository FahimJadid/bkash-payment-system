const express = require("express");
const { bkashAuth } = require("../middlewares/bkashMiddleware");
const {
  createPayment,
  paymentCallback,
  paymentRefund,
} = require("../controllers/paymentController");
const { initiateTransaction } = require("../controllers/sslcommerzController");

const router = express.Router();

// Bkash Routes
router.post("/bkash/create", bkashAuth, createPayment);
router.get("/bkash/callback", bkashAuth, paymentCallback);
router.get("/bkash/refund/:trxID", bkashAuth, paymentRefund);

// SSLCOMMERZ Routes
router.post("/ssl/initialize", initiateTransaction);

module.exports = router;
