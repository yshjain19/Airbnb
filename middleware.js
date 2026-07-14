
const Listing = require("./MODELS/listing.js");
const Reviews = require("./MODELS/reviews.js");
const expressError = require("./utils/expressError.js");
const { listingsSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");

module.exports.isloggidn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be loggdin");
        req.session.redirectUrl = req.originalUrl;
        return res.redirect("/login");
    }
    next();
}

module.exports.isredirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.isredirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;

    try {
        const listing = await Listing.findById(id);

        if (!listing) {
            req.flash("error", "Listing you requested does not exist!");
            return res.redirect("/listings");
        }

        if (!req.user || !listing.owner || !listing.owner.equals(req.user._id)) {
            req.flash("error", "You are not the owner of this listing");
            return res.redirect(`/listings/${id}`);
        }

        next();
    } catch (err) {
        next(err);
    }
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingsSchema.validate(req.body);

    if (error) {
        return next(new expressError(400, error.details[0].message));
    }
    next();
}


module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        return next(new expressError(400, error.details[0].message));
    }
    next();
}

module.exports.isReviewOwner = async (req, res, next) => {
    const { review_id } = req.params;

    try {
        const review = await Reviews.findById(review_id);

        if (!review) {
            req.flash("error", "Review you requested does not exist!");
            return res.redirect("/listings");
        }

        if (!req.user || !review.author || !review.author.equals(req.user._id)) {
            req.flash("error", "You are not the owner of this review");
            return res.redirect(`/listings/${req.params.id}`);
        }

        next();
    } catch (err) {
        next(err);
    }
}