const Listing = require("../models/listingModel");
const { cloudinary } = require("../cloudConfig");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.createNewListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url + " " + filename);
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id; // Corrected line
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "Successfully made a new listing");
  res.redirect("/listings");
};

module.exports.showListings = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "owner",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Cannot find that listing");
    return res.redirect("/listings"); // Added return statement
  }
  res.render("./listings/show", { listing });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Cannot find that listing");
    res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace(
    "upload",
    "upload/w_250,h_300,e_blur:150"
  );
  res.render("./listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  // Delete the old image from Cloudinary if it exists
  if (listing.image && listing.image.filename) {
    await cloudinary.uploader.destroy(listing.image.filename);
  }

  listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  // Now, update the listing with the new image
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated Successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;

  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Cannot find that listing");
      return res.redirect("/listings");
    }

    if (listing.image && listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }

    await Listing.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted a listing");
    res.redirect("/listings");
  } catch (err) {
    req.flash("error", "Something went wrong, try again later");
    res.redirect("/listings");
  }
};

module.exports.searchListings = async (req, res) => {
  const searchQuery = req.query.query;
  const listings = await Listing.find({
    title: { $regex: searchQuery, $options: "i" },
  });

  if (listings.length === 0) {
    req.session.noListingsFound = true;
  } else {
    req.session.noListingsFound = false;
  }

  res.render("./listings/index.ejs", {
    allListings: listings,
    searchQuery,
    noListingsFound: req.session.noListingsFound,
  });
};
