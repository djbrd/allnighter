const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose
  .connect(process.env.ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Cannot connect to the database", err);
    process.exit();
  });

const app = express();

// app setup
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/health"));
app.use("/api", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/parts", require("./routes/parts"));
app.use("/api/chapters", require("./routes/chapters"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/accessBids", require("./routes/accessBids"));

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message, stack: err.stack });
});

// server setup
const port = process.env.PORT || 3000;

app.listen(port);
