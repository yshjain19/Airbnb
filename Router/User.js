const express = require("express");
const passport = require("passport");
const router = express.Router({ mergeParams: true });
const usersController = require("../Controllers/users.js");
const { isredirectUrl, isloggidn } = require("../middleware.js");

// show signup page
// signup routes
router.route("/signup")
     .get(usersController.renderRegister)
     .post(usersController.createUser);

// login routes
router.route("/login")
     .get(usersController.renderLogin)
     .post(
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