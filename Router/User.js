const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../MODELS/user.js")

router.get("/signup", (req, res, next) => {
     res.render("User/signup");
     
});



router.post("/signup", async (req, res) => {
     try {
          const { username, email, password } = req.body;

          const newUser = new User({
               username,
               email
          });

          const registeredUser = await User.register(newUser, password);

          req.flash("success", "Welcome to Wanderlust!");

          res.redirect("/listings");
     } catch (err) {
          req.flash("error", err.message);
          res.redirect("/signup");
     }
});


module.exports = router;