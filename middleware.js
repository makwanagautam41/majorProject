const { listingSchema, reviewSchema } = require("./Schema");
const ExpresError = require("./utils/ExpressError");
const Listing = require("./models/listingModel");
const Review = require("./models/reviewModel");

// middleware to check user is loggedIn or not
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.url = req.originalUrl;
    req.flash("error", "you must be logged in to create listings");
    return res.redirect("/login");
  }
  next();
};

// middleware is use to validate listings
module.exports.validateListings = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpresError(400, errMsg);
  } else {
    next();
  }
};

// middleware is use to check the validation of review
module.exports.validateReviews = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log("Validation Error: ", error.details);
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpresError(400, errMsg);
  } else {
    next();
  }
};

// middleware is use to save the orginalUrl in session
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.url) {
    res.locals.redirectUrl = req.session.url;
  }
  next();
};

// middleware use to check user is owner of the listing or not
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currentUser._id)) {
    req.flash("error", "you are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// middleware use to check user is owner of the review or not
module.exports.isReviewOwner = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.owner.equals(res.locals.currentUser._id)) {
    req.flash("error", "you are not authorized to delete this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// middle ware for listings and proifle image
module.exports.fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed."),
      false
    );
  }
};
