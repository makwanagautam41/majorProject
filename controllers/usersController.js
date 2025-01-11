const { cloudinary } = require("../cloudConfig");
const User = require("../models/userModel");

module.exports.renderSignupPage = (req, res) => {
  res.render("users/signup");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, mobile, age, adhar, password } = req.body;
    const newUser = new User({ username, email, mobile, age, adhar });
    const registerdUser = await User.register(newUser, password);

    if (req.file) {
      let url = req.file.path;
      let filename = req.file.filename;
      registerdUser.profileImage = { url, filename };
      await registerdUser.save();
    }
    // res.send(req.file);
    req.login(registerdUser, (err) => {
      if (err) return next(err);
      //console.log(registerdUser);
      req.flash("success", "welcome to airbnb");
      res.redirect("/listings");
    });
  } catch (e) {
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginPage = (req, res) => {
  res.render("users/login");
};

module.exports.login = async (req, res) => {
  req.flash("success", "welcome back to airbnb");
  // console.log("redirect url [" + res.locals.redirectUrl + "]");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.renderProfilePage = (req, res) => {
  res.render("users/profile", { user: req.user });
};

module.exports.renderEditProfilePage = (req, res) => {
  // console.log(req.user);
  res.render("users/edit-profile", { user: req.user });
};

module.exports.editProfile = async (req, res) => {
  const { username, email, mobile, age, adhar } = req.body;

  try {
    // Fetch the user from the database
    const user = await User.findById(req.user._id);

    // Update user fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;
    if (age) user.age = age;
    if (adhar) user.adhar = adhar;

    await user.save();

    // Update the session to reflect the changes
    req.login(user, (err) => {
      if (err) {
        req.flash("error", "An error occurred while updating your session.");
        return res.redirect("/edit-profile");
      }
      req.flash("success", "Profile updated successfully");
      res.redirect("/profile");
    });
  } catch (error) {
    req.flash("error", "An error occurred while updating your profile.");
    res.redirect("/edit-profile");
  }
};

module.exports.editProfileImage = async (req, res) => {
  try {
    if (req.file) {
      const user = await User.findById(req.user._id);

      if (!req.file) {
        req.flash("error", "No file uploaded.");
        return res.redirect("/profile");
      }

      if (user.profileImage && user.profileImage.filename) {
        try {
          await cloudinary.uploader.destroy(user.profileImage.filename);
        } catch (err) {
          req.flash("error", "Error while deleting previous image");
          return res.redirect("/profile");
        }
      }

      let url = req.file.path;
      let filename = req.file.filename;

      user.profileImage = {
        url,
        filename,
      };

      await user.save();

      req.login(user, (err) => {
        if (err) {
          req.flash("error", "Error While Upading Session");
          return res.redirect("/profile");
        } else {
          req.flash("success", "Profile Image Updated Successfully");
          return res.redirect("/profile");
        }
      });
    } else {
      req.flash("error", "No file uploaded.");
      return res.redirect("/profile");
    }
  } catch (err) {
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }

    req.flash("error", "Error updating profile image. Please try again later.");
    return res.redirect("/profile");
  }
};

module.exports.removeProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.profileImage && user.profileImage.filename) {
      try {
        await cloudinary.uploader.destroy(user.profileImage.filename);
      } catch (err) {
        req.flash("error", "Error while deleting previous image");
        return res.redirect("/profile");
      }
    }

    let url =
      "https://res.cloudinary.com/djbqtwzyf/image/upload/v1736612676/download_xbdz3s.jpg";
    let filename = "download_xbdz3s";

    user.profileImage = {
      url,
      filename,
    };

    await user.save();

    req.login(user, (err) => {
      if (err) {
        req.flash("error", "Error While Upading Session");
        return res.redirect("/profile");
      } else {
        req.flash("success", "Profile Image Updated Successfully");
        return res.redirect("/profile");
      }
    });
  } catch (err) {
    req.flash(
      "error",
      "Error while deleting profile image, Please try again later."
    );
    return res.redirect("/profile");
  }
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    } else {
      req.flash("success", "you are logged out successfully");
      res.redirect("/listings");
    }
  });
};
