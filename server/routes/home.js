const requireAuth = require("../services/auth").requireAuth;

module.exports = (app) => {
  app.get("/", requireAuth, (req, res) => {
    res.send(["wine", "women"]);
  });
};
