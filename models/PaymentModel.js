const mongoose = require("mongoose");

const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    userID: {
      type: String,
    },
    amount: {
      type: Number,
    },

    trxID: {
      type: String,
    },
    paymentID: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
