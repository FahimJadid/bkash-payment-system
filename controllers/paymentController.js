const asyncHandler = require("express-async-handler");
const axios = require("axios");
const Payment = require("../models/PaymentModel");

const globals = require("node-global-storage");
const { v4: uuidv4 } = require("uuid");

const createPayment = asyncHandler(async (req, res) => {
  const { amount, userID } = req.body;
  try {
    const { data } = await axios.post(
      process.env.bkash_create_payment_url,
      {
        mode: "0011",
        payerReference: " ",
        callbackURL: `http://localhost:5000/api/v1/payment/bkash/callback`,
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
    throw new Error({ error: error.message });
  }
});

const paymentCallback = asyncHandler(async (req, res) => {
  const { paymentID, status } = req.query;

  // console.log(req.query);

  try {
    if (status === "cancel" || status === "failure") {
      return res.redirect(`http://localhost:5173/error/${status}`);
    }

    if (status === "success") {
      const { data } = await axios.post(
        process.env.bkash_execute_payment_url,
        { paymentID },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: globals.get("id_token"),
            "X-APP-Key": process.env.BKASH_APP_KEY,
          },
        }
      );
      if (data && data.statusCode === "0000") {
        console.log("Payment Successful !!! ");
        // save response in your db
        await Payment.create({
          userID: uuidv4().substring(0, 5),
          paymentID,
          amount: parseInt(data.amount),
          trxID: data.trxID,
          date: data.paymentExecuteTime,
        });

        return res.redirect(`http://localhost:5173/success`);
      } else {
        return res.redirect(
          `http://localhost:5173/error/${data.statusMessage}`
        );
      }
    }
  } catch (error) {
    // throw new Error({ error: error.message });
    return res.redirect(`http://localhost:5173/error/${error.message}`);
  }
});

const paymentRefund = asyncHandler(async (req, res) => {
  const { trxID } = req.params;
  try {
    const payment = await Payment.findOne({ trxID });
    if (!payment) {
      return res.status(400).json({ message: "Payment not found" });
    }
    const { data } = await axios.post(
      process.env.bkash_refund_transaction_url,
      {
        paymentID: payment.paymentID,
        amount: payment.amount,
        trxID,
        sku: "payment refund",
        reason: "Faulty Product",
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

    if (data && data.statusCode === "0000") {
      return res.status(200).json({ message: "Refund Successful" });
    } else {
      return res.status(400).json({ message: "Refund Failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Refund Failed" });
  }
});

module.exports = { createPayment, paymentCallback, paymentRefund };
