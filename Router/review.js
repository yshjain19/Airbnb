const express = require("express");
const router = express.Router({mergeParams : true});
const Listing = require("../MODELS/listing.js");

const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { reviewSchema } = require("../schema.js");
const Reviews = require("../MODELS/reviews.js");


const validateReview= (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        return next(new expressError(400, error.details[0].message));
    }
    next();
}


router.post("/",validateReview ,wrapAsync(async (req, res) => {
    let data = await Listing.findById(req.params.id);
    let newreview = await new Reviews(req.body.review);
    data.reviews.push(newreview);
    await newreview.save();
    await data.save();
    res.redirect(`/listings/${req.params.id}`);
}));
// review delete rought

router.delete("/:review_id",wrapAsync(async(req,res)=>{
    let {id , review_id} = req.params;
    await Reviews.findByIdAndDelete(review_id);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:review_id}});
   
    res.redirect(`/listings/${id}`);
}))

module.exports = router;