const express = require("express");
const auth = express.Router();

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { requireSignin, requireFacebook } = require("../services/auth");
const { OAuth2Client } = require("google-auth-library");

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  // sub == subject, iat == issued at time
  return jwt.sign({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
};

const userResponse = (user) => {
  return {
    token: tokenForUser(user),
    userName: user.email.split("@")[0],
    admin: user.email == process.env.ADMIN_EMAIL,
  };
};

auth.post("/signup", (req, res, next) => {
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
        return res.status(422).send({ error: err });
      }

      res.json(userResponse(user));
    });
  });
});

auth.post("/signin", requireSignin, (req, res, next) => {
  res.json(userResponse(req.user));
});

auth.post("/auth/google", async (req, res, next) => {
  const { tokenId } = req.body;

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, sub, name, given_name, family_name } = ticket.getPayload();
  const filter = { email };
  const update = { googleId: sub };

  let user = await User.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  });

  res.json(userResponse(user));
});

auth.post("/auth/facebook", requireFacebook, async (req, res, next) => {
  res.json(userResponse(req.user));
});

module.exports = auth;
