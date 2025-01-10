const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, validateImageFile } = require("../middleware");
const usersController = require("../controllers/usersController");
const { isLoggedIn, fileFilter } = require("../middleware");
const multer = require("multer");
const { userProfileStorage } = require("../cloudConfig");
const upload = multer({ storage: userProfileStorage, fileFilter });

router
  .route("/signup")

  .get(usersController.renderSignupPage)
  .post(upload.single("User[profileImage]"), wrapAsync(usersController.signup));

router
  .route("/login")

  .get(usersController.renderLoginPage)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usersController.login
  );

router.get("/profile", isLoggedIn, usersController.renderProfilePage);

router.get("/edit-profile", isLoggedIn, usersController.renderEditProfilePage);
router.post(
  "/edit-profile",
  isLoggedIn,
  wrapAsync(usersController.editProfile)
);

router.post(
  "/edit-profile-image",
  isLoggedIn,
  (req, res, next) => {
    upload.single("profileImage")(req, res, (err) => {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/profile");
      }
      next();
    });
  },
  usersController.editProfileImage
);

router.get("/logout", usersController.logout);

module.exports = router;
