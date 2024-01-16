const express = require("express");
const { bkashAuth } = require("../middlewares/bkashMiddleware");
const {
  createPayment,
  paymentCallback,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/bkash/create", bkashAuth, createPayment);
router.get("/bkash/callback", bkashAuth, paymentCallback);

module.exports = router;
