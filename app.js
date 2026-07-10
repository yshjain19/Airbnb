const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const Listing = require("./MODELS/listing.js");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("./utils/expressError.js");
const { listingsSchema, reviewSchema } = require("./schema.js");
const Reviews = require("./MODELS/reviews.js");
const session = require("express-session");
const flash = require("connect-flash");
const listingRoughter = require("./Router/listings.js");
const reviewRoughter = require("./Router/review.js");
const UserRoughter = require("./Router/User.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./MODELS/user.js");
main()
    .then(() => {
        console.log("connection successful")
    })
    .catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
}

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: { _expires: Date.now() + 7 * 24 * 60 * 60 * 1000, originalMaxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.engine('ejs', ejsMate);
app.use(express.json());
app.use(methodOverride('_method'))
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.Delet=req.flash("Delet");
    res.locals.error=req.flash("error");
    next();
})

app.get("/registerUser" , async(req,res)=>{
    let fakeUser = new User({
        email:"student@gmail.com",
        username:"delta-user"
    });
    let newUser = await User.register(fakeUser,"hellow");
    res.send(newUser);
})

app.use("/listings", listingRoughter);
app.use("/listings/:id/review", reviewRoughter);
app.use("/",UserRoughter);

app.get("/", (req, res) => {
    
    res.send("workin");
});


app.use((req, res, next) => {
    next(new expressError(404, "Page not found"));
});
app.use((err, req, res, next) => {

    let { status = 500, message = "Something went wrond" } = err;
    // res.status(status).send(message);
    res.status(status).render("error", { message });
})
app.listen(3000, () => {
    console.log("app is listening");
})

