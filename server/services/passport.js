const passport = require("passport");
const User = require("../models/User");
const config = require("../config/keys");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Indicate to passport that the username field is 'email' (not default 'username')
const localOptions = { usernameField: "email" };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify username and password
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    user.comparePasswords(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user id in the payload exists in db
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    // If so, call 'done' with that user, else call 'done' without a user
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use strategies
passport.use(jwtLogin);
passport.use(localLogin);
