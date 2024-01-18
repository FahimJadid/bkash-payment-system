const asyncHandler = require("express-async-handler");
const axios = require("axios");
const Payment = require("../models/PaymentModel");
const SSLCommerzPayment = require("sslcommerz-lts");
const { v4: uuidv4 } = require("uuid");

const initiateTransaction = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const data = {
    total_amount: amount ? amount : "1",
    currency: "BDT",
    tran_id: uuidv4().substring(0, 8),
    success_url: "http://localhost:5173/payment/ssl/success",
    fail_url: "http://localhost:5173/payment/ssl/fail",
    cancel_url: "http://localhost:5173/payment/ssl/cancel",
    ipn_url: "http://localhost:5173/payment/ssl/notification",
    shipping_method: "No",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "cust@yahoo.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    multi_card_name: "mastercard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    value_c: "ref003_C",
    value_d: "ref004_D",
  };
  try {
    const sslcz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      false
    );

    const apiResponse = await sslcz.init(data);

    if (apiResponse && apiResponse.GatewayPageURL) {
      res.json({ GatewayPageURL: apiResponse.GatewayPageURL });
    } else {
      console.error("SSLCommerz initiation response is missing GatewayPageURL");
      throw new Error(error);
    }
  } catch (error) {
    console.error("Error initiating SSLCommerz payment:", error);
    throw new Error(error);
  }
});

module.exports = { initiateTransaction };
