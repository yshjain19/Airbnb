const express = require("express");
const router = express.Router({mergeParams : true});
const Listing = require("../MODELS/listing.js");

const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const Reviews = require("../MODELS/reviews.js");
const {isloggidn , validateReview , isReviewOwner} = require("../middleware.js");


router.post("/",isloggidn,validateReview ,wrapAsync(async (req, res) => {
    let data = await Listing.findById(req.params.id);
    let newreview =  new Reviews(req.body.review);
    newreview.author = req.user._id;
    data.reviews.push(newreview);
    await newreview.save();
    await data.save();

    req.flash("success","New Review add sucessfully");
    res.redirect(`/listings/${req.params.id}`);
}));
// review delete rought

router.delete("/:review_id",isloggidn,isReviewOwner,wrapAsync(async(req,res)=>{
    let {id , review_id} = req.params;
    await Reviews.findByIdAndDelete(review_id);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:review_id}});
    req.flash("Delet","Post Deleted sucessfully");
    res.redirect(`/listings/${id}`);
}))

module.exports = router;