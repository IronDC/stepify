const express = require("express");
const passportRouter = express.Router();
const User = require("../models/user");
const { hashPassword, checkHashed } = require("../lib/hashing");
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

// Require user model
passportRouter.get("/signup", (req, res, next) => {
  res.render("passport/signup");
})

passportRouter.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  const existUser = await User.findOne({ username });
  if (!existUser) {
    const NewUser = await User.create({ username, password: hashPassword(password) });
    console.log("User Created");
    res.redirect("/");
  } else {
    res.render("/signup");
  }

})
passportRouter.get("/login", (req, res, next) => {
  res.render("passport/login");
})

passportRouter.post(
  "/login",
  passport.authenticate("local", { successRedirect: "/", failureRedirect: "/signup" })
);

passportRouter.get("/logout", async (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});

module.exports = passportRouter;