const express = require("express");
const accessBids = express.Router();
const AccessBid = require("../models/AccessBid");
const { requireAdmin } = require("../services/auth");

const FORMATS = ["book", "epub", "web", "kindle", "mp3"];

accessBids.get("/", requireAdmin, async (req, res, next) => {
  try {
    const accessBids = await AccessBid.find();
    res.status(200).send({ accessBids });
  } catch (err) {
    next(err);
  }
});

accessBids.get("/:id", requireAdmin, async (req, res, next) => {
  try {
    const accessBid = await AccessBid.findById(req.params.accessBidId);
    if (accessBid === null) {
      return res.status(404).send({ message: "Cannot find accessBid" });
    }
    res.status(200).send({ accessBid });
  } catch (err) {
    next(err);
  }
});

accessBids.post("/", async (req, res, next) => {
  try {
    const { email, phone, channel, message, otherDescription } = req.body;
    if (!(email || phone)) {
      return res.status(400).send("Email or phone number is required");
    }

    let formats = FORMATS.reduce((selected, format) => {
      if (req.body[format]) {
        selected.push(format);
      }
      return selected;
    }, []);

    if (req.body.other) {
      if (!otherDescription) {
        return res.status(400).send("Description of other format required");
      }
      formats.push(otherDescription);
    }

    if (!formats.length) {
      return res.status(400).send("At least one format must be selected");
    }

    let newAccessBid = !phone
      ? { email, message, formats }
      : { email, phone, channel, message, formats };
    const accessBid = await AccessBid.create(newAccessBid);
    res.status(201).send({ accessBid });
  } catch (err) {
    next(err);
  }
});

accessBids.delete("/", requireAdmin, async (req, res) => {
  try {
    await AccessBid.deleteMany();
  } catch (err) {
    res.status(500).send({
      message: "Could not delete all accessBids",
    });
  }
  res.status(204).send();
});

module.exports = accessBids;
