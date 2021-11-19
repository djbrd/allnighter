const passportService = require("./passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });
const requireFacebook = passport.authenticate("facebook-token", {
  session: false,
});

module.exports = { requireAuth, requireSignin, requireFacebook };
