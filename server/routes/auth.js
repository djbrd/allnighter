const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");
const requireSignin = require("../services/auth").requireSignin;

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  // sub == subject, iat == issued at time
  return jwt.sign({ sub: user.id, iat: timestamp }, config.secret);
};

module.exports = (app) => {
  app.post("/signup", (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).send({ error: "Email and password required" });
    }

    // See if a user with given email exists
    User.findOne({ email: email }, (err, existingUser) => {
      if (err) {
        return next(err);
      }
      // If user exists return error
      if (existingUser) {
        return res.status(422).send({ email: "Email is in use" });
      }

      // Else, create and save user record
      const user = new User({ email, password });
      user.save((err) => {
        if (err) {
          return next(err);
        }

        res.json({ token: tokenForUser(user) });
      });
    });
  });

  app.post("/signin", requireSignin, (req, res, next) => {
    res.json({ token: tokenForUser(req.user) });
  });
};
