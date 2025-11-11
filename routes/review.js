const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const {validateReview, isLoggedIn, isReviewAuthor} = require("../middlewares.js");

// Post Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    
    if (!listing) {
      req.flash("error", "Cannot find the listing you’re trying to review!");
      return res.redirect("/listings");
    }
    
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new review saved");

    req.flash("success", "Your review has been added successfully!");

    res.redirect(`/listings/${listing._id}`)
}));

// Delete Review Route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    let {id, reviewId} = req.params;

    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found. It may have been deleted.");
      return res.redirect("/listings");
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      req.flash("error", "Review not found or may have already been deleted.");
      return res.redirect(`/listings/${id}`);
    }

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully!");

    res.redirect(`/listings/${id}`);
}));

module.exports = router;