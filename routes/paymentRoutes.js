const express = require("express");
const { createPayment } = require("../controllers/paymentController");
const { bkashAuth } = require("../middlewares/bkashMiddleware");

const router = express.Router();

router.post("/bkash/create", bkashAuth, createPayment);

module.exports = router;
