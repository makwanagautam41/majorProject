const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateReviews, isLoggedIn, isReviewOwner } = require("../middleware");
const reviewsController = require("../controllers/reviewsController");

// reviews post route
router.post(
  "/",
  isLoggedIn,
  validateReviews,
  wrapAsync(reviewsController.createReview)
);

// review delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewOwner,
  wrapAsync(reviewsController.deleteReview)
);

module.exports = router;
