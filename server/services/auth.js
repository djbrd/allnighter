const passportService = require("./passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireAdmin = [
  requireAuth,
  (req, res, next) => {
    console.log(req.user);
    if (req.user.email != process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: "Admin rights required" });
    }
    next();
  },
];

const requireSignin = passport.authenticate("local", { session: false });
const requireFacebook = passport.authenticate("facebook-token", {
  session: false,
});

module.exports = { requireAuth, requireAdmin, requireSignin, requireFacebook };
