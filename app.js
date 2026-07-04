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
app.use(flash());
app.use(session(sessionOptions));
app.use(express.json());
app.use(methodOverride('_method'))
app.set("views", path.join(__dirname, "views/listings"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));

app.use("/listings", listingRoughter);
app.use("/listings/:id/review", reviewRoughter);

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

