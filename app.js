if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpresError = require("./utils/ExpressError");
const listingRouter = require("./routes/listingRouter");
const reviewRouter = require("./routes/reviewRouter");
const userRouter = require("./routes/userRouter");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userModel");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY;

main()
  .then(() => {
    console.log("connceted to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_DB_URL);
}

app.listen(8080, () => {
  console.log("server is running on port 8080");
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

const store = MongoStore.create({
  mongoUrl: MONGO_DB_URL,
  crypto: {
    secret: SESSION_SECRET_KEY,
  },
  touchAfter: 24 * 3600,
});

store.once("error", () => {
  console.log("Error in mongo session store", err);
});

const sessionOption = {
  store,
  secret: SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// middlware to Catch-all for 404 errors
app.all("*", (req, res, next) => {
  next(new ExpresError(404, "Page Not Found"));
});

// Global error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;

  // Handle the 404 error specifically
  if (statusCode === 404) {
    res.status(404).render("includes/pageNotFound", { message });
  } else {
    // For other errors, render a generic error page
    res.status(statusCode).render("includes/error", { err });
  }
});
