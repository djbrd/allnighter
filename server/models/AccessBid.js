const mongoose = require("mongoose");

const accessBidSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
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
