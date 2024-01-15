const asyncHandler = require("express-async-handler");

const createPayment = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createPayment };
