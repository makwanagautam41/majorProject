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
* **/controllers/** (Contains business logic controllers)
    * `listingsController.js`: Handles logic for managing listings.
    * `reviewsController.js`: Manages review-related functionalities.
    * `usersController.js`: Handles user-related operations.

* **/init/** (Initialization scripts for the application)
    * `data.js`: Script for populating initial data.
    * `index.js`: Setup and configuration scripts.

* **/models/** (Defines database models)
    * `listingModel.js`: Schema for listing data.
    * `reviewModel.js`: Schema for review data.
    * `userModel.js`: Schema for user data.

* **/public/** (Static assets)
    * **/css/** (Contains CSS stylesheets)
        * `rating.css`: Styles for rating components.
        * `style.css`: Main stylesheet for the application.
    * **/js/** (Contains JavaScript files)
        * `script.js`: Script for user interactions.

* **/routes/** (Defines application routes)
    * `listingRouter.js`: Routes for listing management.
    * `reviewRouter.js`: Routes for review-related operations.
    * `userRouter.js`: Routes for user management.

* **/utils/** (Utility functions and helpers)
    * `ExpressError.js`: Custom error handling class.
    * `wrapAsync.js`: Wrapper for handling asynchronous errors.

* **/views/** (EJS view templates)
    * `error.ejs`: Template for error pages.
    * **/includes/** (Reusable components)
        * `error.ejs`: Error message partial.
        * `footer.ejs`: Footer component.
        * `message.ejs`: Flash message component.
        * `navbar.ejs`: Navigation bar component.
        * `pageNotFound.ejs`: 404 error page template.
    * **/layouts/** (Layout templates)
        * `boilerplate.ejs`: Main layout template.
    * **/listings/** (Templates for listing-related views)
        * `edit.ejs`: Edit listing page.
        * `index.ejs`: Listing index page.
        * `new.ejs`: New listing form.
        * `show.ejs`: Show listing details.
    * **/users/** (Templates for user-related views)
        * `edit-profile.ejs`: Edit user profile page.
        * `login.ejs`: User login page.
        * `profile.ejs`: User profile page.
        * `signup.ejs`: User registration form.

* **Other Files:**
    * `Schema.js`: Defines the database schema and configurations.
    * `app.js`: Main application entry point.
    * `cloudConfig.js`: Configuration for cloud services (e.g., image uploads).
    * `middleware.js`: Custom middleware for the application.
    * `package.json`: Node.js package configuration.


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
  NOTE : make sure to change local database configuration in app.js and use your own .env file credential for working properly.
Here i Userd Clodinary Storage for storing listings iamge and profile image.
As well as also used mongodb for storing all users and listings information.
```

5. **Access the app in your browser at `http://localhost:8080`.


## Technologies Used
- Backend: Node.js, Express.js
- Frontend: EJS templates, CSS
- Database: MongoDB
- Other: Cloudinary for image uploads, custom error handling middleware
