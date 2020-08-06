const { Schema, model } = require("mongoose");

const notification = new Schema({
  MERCHANT_ID: {
    type: String,
    default: "Not",
  },
  AMOUNT: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Notification", notification);
