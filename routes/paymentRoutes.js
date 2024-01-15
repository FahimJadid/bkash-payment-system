const express = require("express");
const { paymentCreate } = require("../controllers/paymentController");

const router = express.Router();

router.post("/bkash/create", paymentCreate);

module.exports = router;
