const express = require("express");
const passport = require("passport");
const router = express.Router({ mergeParams: true });
const User = require("../MODELS/user.js")
const {isredirectUrl, isloggidn} = require("../middleware.js");
// show signup page
router.get("/signup", (req, res, next) => {
     res.render("User/signup");
});

// save signup information
router.post("/signup", async (req, res) => {
     try {
          const { username, email, password } = req.body;

          const newUser = new User({
               username,
               email
          });

          const registeredUser = await User.register(newUser, password);

          req.login(registeredUser, (err) => {
               if (err) {
                    req.flash("error", err.message);
                    return res.redirect("/signup");
               }
               req.flash("success", "Welcome to Wanderlust!");
               res.redirect("/listings");
          });
     } catch (err) {
          req.flash("error", err.message);
          res.redirect("/signup");
     }
});

// show login page
router.get("/login", async (req, res, next) => {
     res.render("User/login");
});

// handle login submission
router.post(
     "/login",
     isredirectUrl,
     passport.authenticate("local", {
          failureRedirect: "/login",
          failureFlash: true
     }),
     (req, res) => {
          req.flash("success", "Welcome back!");
          res.redirect(res.locals.isredirectUrl || "/listings");
     }
);

// logout
router.get("/logout",isloggidn, (req, res, next) => {
     req.logout((err) => {
          if (err) {
               return next(err);
          }
          req.flash("success", "Goodbye!");
          res.redirect("/listings");
     });
});

module.exports = router;