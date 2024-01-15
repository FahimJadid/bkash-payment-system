const asyncHandler = require("express-async-handler");

const paymentCreate = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { paymentCreate };
