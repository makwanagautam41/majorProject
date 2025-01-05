const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {
  isLoggedIn,
  validateListings,
  isOwner,
  fileFilter,
} = require("../middleware");
const listingsController = require("../controllers/listingsController");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage, fileFilter });

router
  .route("/")

  // this route will use for getting all listings
  .get(wrapAsync(listingsController.index))

  //this route will use for creating listing
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListings,
    wrapAsync(listingsController.createNewListing)
  );

// opens new form page
router.get("/new", isLoggedIn, listingsController.renderNewForm);

// for searching
router.get("/search", wrapAsync(listingsController.searchListings));

router
  .route("/:id")
  // show listing
  .get(wrapAsync(listingsController.showListings))

  // update rotue
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListings,
    wrapAsync(listingsController.updateListing)
  )

  // delete route
  .delete(isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing));

// edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.renderEditForm)
);

module.exports = router;
