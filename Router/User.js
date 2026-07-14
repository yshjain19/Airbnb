const express = require("express");
const passport = require("passport");
const router = express.Router({ mergeParams: true });
const usersController = require("../Controllers/users.js");
const { isredirectUrl, isloggidn } = require("../middleware.js");

// show signup page
router.get("/signup", usersController.renderRegister);

// save signup information
router.post("/signup", usersController.createUser);

// show login page
router.get("/login", usersController.renderLogin);

// handle login submission
router.post(
     "/login",
     isredirectUrl,
     passport.authenticate("local", {
          failureRedirect: "/login",
          failureFlash: true
     }),
     usersController.loginUser
);

// logout
router.get("/logout", isloggidn, usersController.logout);

module.exports = router;