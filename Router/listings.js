const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../MODELS/listing.js");

const wrapAsync = require("../utils/wrapAsync.js");
const {isloggidn , isredirectUrl , isOwner, validateListing} = require("../middleware.js");


// ===================== READ ALL LISTINGS =====================

router.get("/",
    wrapAsync(async (req, res) => {
        let alllistings = await Listing.find({})
        res.render("listings/index", { alllistings });
    }))
// ===================== SHOW NEW LISTING FORM =====================
router.get("/new",isloggidn ,(req, res) => {
    res.render("listings/new");
})
// ===================== SHOW SINGLE LISTING =====================
router.get("/:id",wrapAsync(async (req, res) => {
        let { id } = req.params;
        let data = await Listing.findById(id).populate({path:"reviews",populate:{ path:"author"}}).populate("owner");
        console.log(data);
        if (!data) {
            req.flash("error", " Listing you requested does not exist!");
            return res.redirect("/listings");
        }
        res.render("listings/show", { data });

    }))
// ===================== CREATE NEW LISTING =====================
router.post("/", isloggidn,validateListing ,wrapAsync(async (req, res) => {
    // console.log(req.user)
    let { title, description, image, price, country, location } = req.body;

    let sample = new Listing({
        title: title,
        description: description,
        price: price,
        location: location,
        country: country,
        owner: req.user._id,
    })

    await sample.save();
    // Flash message after successful creation
    req.flash("success", "New post add sucessfully");
    res.redirect("/listings");
}));
// ===================== SHOW EDIT FORM =====================

router.get("/:id/edit", isloggidn, isOwner, wrapAsync(async (req, res) => {
        let { id } = req.params;
        let post = await Listing.findById(id);
        if (!post) {
            req.flash("error", " Listing you requested does not exist!");
            return res.redirect("/listings");
        }
        res.render("listings/edit", { post });
    }))
// ===================== UPDATE LISTING =====================
router.put("/:id", isloggidn, isOwner, validateListing, wrapAsync(async (req, res) => {
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
    req.flash("success", "Post updated successfully");
    res.redirect("/listings");
}));
// ===================== DELETE LISTING =====================
router.delete("/:id", isloggidn, isOwner,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let data = await Listing.findByIdAndDelete(id);
        req.flash("Delet", "Post Deleted sucessfully");
        res.redirect("/listings");
    }))

module.exports = router;