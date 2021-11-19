const requireAuth = require("../services/auth").requireAuth;

module.exports = (app) => {
  app.get("/authroute", requireAuth, (req, res) => {
    res.send(["wine", "women"]);
  });

  app.get("/", (req, res) => {
    res.send("It's a gasssss");
  });
};
