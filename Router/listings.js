const express = require("express");
const router = express.Router({mergeParams : true});
const Listing = require("../MODELS/listing.js");

const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { listingsSchema  } = require("../schema.js");








const validateListing = (req, res, next) => {
    let { error } = listingsSchema.validate(req.body);

    if (error) {
        return next(new expressError(400, error.details[0].message));
    }
    next();
}



router.get("/",
    wrapAsync(async (req, res) => {
        let alllistings = await Listing.find({})
        res.render("index", { alllistings });
    }))
router.get("/new", (req, res) => {
    res.render("new");
})
router.get("/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let data = await Listing.findById(id).populate("reviews");
        res.render("show", { data });
        
    }))
router.post("/", validateListing, wrapAsync(async (req, res) => {
    let { title, description, image, price, country, location } = req.body;

    let sample = new Listing({
        title: title,
        description: description,
        price: price,
        location: location,
        country: country,
    })
    
    await sample.save()
    res.redirect("/listings");
}));

router.get("/:id/edit",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let post = await Listing.findById(id);
        
        res.render("edit", { post });
    }))
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
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
router.delete("/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let data = await Listing.findByIdAndDelete(id);
        res.redirect("/listings");
    }))

    module.exports = router;