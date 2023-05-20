const express = require("express");
const registerController = require("../Controllers/register");
const { validate } = require("../Middlewares/validation");
const { userCreateValidationRules } = require("../Models/user");

const registerRoute = express.Router();

// validate input FullName, email, password
registerRoute
  .route("/register")
  .post(validate(userCreateValidationRules), registerController);

module.exports = registerRoute;
// /auth -> 2 --> /auth/register , /auth/login
