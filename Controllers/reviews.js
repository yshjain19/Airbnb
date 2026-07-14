const Listing = require("../MODELS/listing.js");
const Reviews = require("../MODELS/reviews.js");

module.exports.createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    const review = new Reviews(req.body.review);
    review.author = req.user._id;
    listing.reviews.push(review);
    await review.save();
    await listing.save();

    req.flash("success", "New review added successfully");
    res.redirect(`/listings/${req.params.id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, review_id } = req.params;
    await Reviews.findByIdAndDelete(review_id);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: review_id } });

    req.flash("Delet", "Post Deleted sucessfully");
    res.redirect(`/listings/${id}`);
};
