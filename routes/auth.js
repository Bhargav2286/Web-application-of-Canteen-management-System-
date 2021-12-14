//=============================================================
//     AUTHENTICATION ROUTES
//=============================================================

var express = require("express"),
    router = express.Router({mergeParams: true}),
    passport = require("passport"),
    User = require("../models/user");

// SHOW - show the login page
router.get("/login", function(req, res) {
  // console.log("[auth]", req.url);
  res.render("users/login", {user: req.user});
});

// LOGIN - users can login
router.post("/login", passport.authenticate("local", {failureRedirect: "/login"}), function(req, res) {
  // console.log("[auth]", req.url);
  res.redirect("/");
});

// LOGOUT - users can logout
router.get("/logout", function(req, res) {
  // console.log("[auth]", req.url);
  req.logout();
  res.redirect("/");
});

module.exports = router;
