# makwanagautam41-majorProject


## Overview
This project is a web application inspired by the functionality of Airbnb, where users can list, browse, and review properties. It is built using modern web development practices and technologies to provide a seamless experience for both hosts and guests.

## Features
- User Authentication: Sign up, log in, and manage user profiles.
- Property Listings: Users can create, edit, and browse property listings.
- Reviews: Users can leave and view reviews for listed properties.
- Error Handling: Robust error pages and messaging.
- Responsive Design: Fully responsive UI for an optimal user experience across devices.


## Project Structure

makwanagautam41-majorProject/
├── Schema.js                # Database schema and configuration
├── app.js                   # Main application entry point
├── cloudConfig.js           # Configuration for cloud services (e.g., image uploads)
├── middleware.js            # Custom middleware for the app
├── package.json             # Node.js package configuration
├── controllers/             # Business logic controllers
│   ├── listingsController.js
│   ├── reviewsController.js
│   └── usersController.js
├── init/                    # Initialization scripts
│   ├── data.js              # Initial data population scripts
│   └── index.js             # Setup-related configurations
├── models/                  # Database models
│   ├── listingModel.js
│   ├── reviewModel.js
│   └── userModel.js
├── public/                  # Static assets
│   ├── css/                 # CSS files
│   │   ├── rating.css
│   │   └── style.css
│   └── js/                  # JavaScript files
│       └── script.js
├── routes/                  # Application routes
│   ├── listingRouter.js
│   ├── reviewRouter.js
│   └── userRouter.js
├── utils/                   # Utility functions
│   ├── ExpressError.js      # Custom error handling class
│   └── wrapAsync.js         # Wrapper for async error handling
└── views/                   # EJS view templates
    ├── error.ejs            # Error page
    ├── includes/            # Reusable components
    │   ├── error.ejs
    │   ├── footer.ejs
    │   ├── message.ejs
    │   ├── navbar.ejs
    │   └── pageNotFound.ejs
    ├── layouts/             # Layout templates
    │   └── boilerplate.ejs
    ├── listings/            # Listing-related pages
    │   ├── edit.ejs
    │   ├── index.ejs
    │   ├── new.ejs
    │   └── show.ejs
    └── users/               # User-related pages
        ├── edit-profile.ejs
        ├── login.ejs
        ├── profile.ejs
        └── signup.ejs



## Installation

1.  **Clone the repository**:
  ```bash
  git clone https://github.com/your-username/makwanagautam41-majorProject.git
  cd makwanagautam41-majorProject
  ```

2. **Install dependencies**:
  - npm install

3. **Set up the database by configuring Schema.js and running (for only testing localy data)**
  - cd init
  - node init/index.js

4. **Start the development server**:
  - nodemon app.js

```bash
  NOTE : make sure to change local database configuration in app.js and use your own .env file credential for working properly. Here i Userd Clodinary Storage for storing listings iamge and profile image. As well as also used mongodb for storing all users and listings information.
```

5. **Access the app in your browser at `http://localhost:8080`.


## Technologies Used
- Backend: Node.js, Express.js
- Frontend: EJS templates, CSS
- Database: MongoDB
- Other: Cloudinary for image uploads, custom error handling middleware
