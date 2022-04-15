const express = require("express");
const contacts = express.Router();
const Contact = require("../models/Contact");
const { requireAdmin } = require("../services/auth");

contacts.get("/", requireAdmin, async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send({ contacts });
  } catch (err) {
    next(err);
  }
});

contacts.get("/:id", requireAdmin, async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (contact === null) {
      return res.status(404).send({ message: "Cannot find contact" });
    }
    res.status(200).send({ contact });
  } catch (err) {
    next(err);
  }
});

contacts.post("/", async (req, res, next) => {
  try {
    const { email, phone, channel, message } = req.body;
    if (!(email || phone) || !message) {
      return res
        .status(400)
        .send("Email or phone number and message are required");
    }

    let newContact = !phone
      ? { email, message }
      : { email, phone, channel, message };
    const contact = await Contact.create(newContact);
    res.status(201).send({ contact });
  } catch (err) {
    next(err);
  }
});

contacts.delete("/", requireAdmin, async (req, res) => {
  try {
    await Contact.deleteMany();
  } catch (err) {
    res.status(500).send({
      message: "Could not delete all contacts",
    });
  }
  res.status(204).send();
});

module.exports = contacts;
