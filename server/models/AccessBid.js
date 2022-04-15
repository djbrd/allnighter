const mongoose = require("mongoose");

const accessBidSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      maxLength: 256,
    },
    phone: {
      type: String,
      maxLength: 256,
    },
    channel: {
      type: String,
      maxLength: 16,
    },
    message: {
      type: String,
      maxLength: 4000,
    },
    formats: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const AccessBid = mongoose.model("AccessBid", accessBidSchema);
module.exports = AccessBid;
