const express = require("express");
const registerController = require("./../Controllers/registerController");
const {
  userValidationRules,
  validateUser,
} = require("../Middlewares/userValidation");

const registerRoute = express.Router();

// validate input FullName, email, password
registerRoute
  .route("/register")
  .post(userValidationRules(), validateUser, registerController);

module.exports = registerRoute;
