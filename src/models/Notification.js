const { Schema, model } = require("mongoose");

const notification = new Schema({
  MERCHANT_ID: {
    type: String,
    default: "Not",
  },
  AMOUNT: {
    type: String,
    default: "",
  },
  intid: {
    type: String,
    default: "",
  },
  MERCHANT_ORDER_ID: {
    type: String,
    default: "",
  },
  P_EMAIL: {
    type: String,
    default: "",
  },
  P_PHONE: {
    type: String,
    default: "",
  },
  CUR_ID: {
    type: String,
    default: "",
  },
  SIGN: {
    type: String,
    default: "",
  },
  us_id: {
    type: String,
    default: "",
  },
  us_username: {
    type: String,
    default: "",
  },
  us_chatid: {
    type: String,
    default: "",
  },
});

module.exports = model("Notification", notification);
