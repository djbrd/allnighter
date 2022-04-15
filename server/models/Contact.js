const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
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
      required: true,
      maxLength: 4000,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
