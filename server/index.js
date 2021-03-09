const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);

const app = express();

// app setup
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));

require("./routes/home")(app);
require("./routes/auth")(app);

// server setup
const port = process.env.PORT || 3090;

app.listen(port);
