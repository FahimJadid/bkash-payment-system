const asyncHandler = require("express-async-handler");
const axios = require("axios");
const globals = require("node-global-storage");
const { v4: uuidv4 } = require("uuid");

const createPayment = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  try {
    const { data } = await axios.post(
      process.env.bkash_create_payment_url,
      {
        mode: "0011",
        payerReference: " ",
        callbackURL: `${process.env.backend_callback_url}}`,
        amount: amount ? amount : "1",
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "Inv" + uuidv4(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: globals.get("id_token"),
          "X-APP-Key": process.env.BKASH_APP_KEY,
        },
      }
    );

    // console.log(data);
    return res.status(200).json({ bkashURL: data.bkashURL });
  } catch (error) {
    throw new Error(error.message);
  }
});

const paymentCallback = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = { createPayment, paymentCallback };
