const express = require("express");
const health = express.Router();

// health check
health.get("/", (req, res) => {
  res.send("Okay");
});

module.exports = health;
