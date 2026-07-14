const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const reviewsController = require("../Controllers/reviews.js");
const { isloggidn, validateReview, isReviewOwner } = require("../middleware.js");

router.post("/", isloggidn, validateReview, wrapAsync(reviewsController.createReview));

router.delete("/:review_id", isloggidn, isReviewOwner, wrapAsync(reviewsController.deleteReview));

module.exports = router;