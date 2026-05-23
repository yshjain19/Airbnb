const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const Listing = require("./MODELS/listing.js");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("./utils/expressError.js");
const { listingsSchema ,reviewSchema } = require("./schema.js");
const Reviews = require("./MODELS/reviews.js");
const reviews = require("./MODELS/reviews.js");
main()
    .then(() => {
        console.log("connection successful")
    })
    .catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
}
app.use(express.json());
app.use(methodOverride('_method'))
app.set("views", path.join(__dirname, "views/listings"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {

    res.send("workin");
});

const validateListing = (req, res, next) => {
    let { error } = listingsSchema.validate(req.body);

    if (error) {
        return next(new expressError(400, error.details[0].message));
    }
    next();
}
const validateReview= (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        return next(new expressError(400, error.details[0].message));
    }
    next();
}
// app.get("/listing", async (req,res)=>{
//     let sample = new Listing ({
//         title:"My New ville",
//         discription:"By the beach",
//         price:1200,
//         location:"calangute, GOa",
//         country:"india"
//     })
//     await sample.save()
//     .then((res)=>{console.log(res)}) .catch((err)=>{console.log(err)});

//     res.send("sucessful testing");
// })
app.get("/listings",
    wrapAsync(async (req, res) => {
        let alllistings = await Listing.find({})
        res.render("index", { alllistings });
    }))
app.get("/listings/new", (req, res) => {
    res.render("new");
})
app.get("/listings/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let data = await Listing.findById(id).populate("reviews");
        res.render("show", { data });
        console.log(data);
    }))
app.post("/listings", validateListing, wrapAsync(async (req, res) => {
    let { title, description, image, price, country, location } = req.body;
    // console.log(req.body);
    let sample = new Listing({
        title: title,
        description: description,
        price: price,
        location: location,
        country: country,
    })
    // let result=listingsSchema.validate(req.body);
    // console.log(result);
    await sample.save()
    res.redirect("/listings");
}));

app.get("/listings/:id/edit",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let post = await Listing.findById(id);
        console.log(post);
        res.render("edit", { post });
    }))
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { title, description, image, price, country, location } = req.body;
    await Listing.findByIdAndUpdate(id, {
        title,
        description,
        image: { url: image },
        price,
        country,
        location
    });
    res.redirect("/listings");
}));
app.delete("/listings/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let data = await Listing.findByIdAndDelete(id);
        res.redirect("/listings");
    }))

// review rout
app.post("/listings/:id/review",validateReview ,wrapAsync(async (req, res) => {
    let data = await Listing.findById(req.params.id);
    let newreview = await new Reviews(req.body.review);
    data.reviews.push(newreview);
    await newreview.save();
    await data.save();
    res.redirect(`/listings/${req.params.id}`);
}));
// review delete rought

app.delete("/listings/:id/review/:review_id",wrapAsync(async(req,res)=>{
    let {id , review_id} = req.params;
    await Reviews.findByIdAndDelete(review_id);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:review_id}});
    // console.log(id);
    // console.log(review_id);
    res.redirect(`/listings/${id}`);
}))
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

