const express = require("express");
const loginController = require("../Controllers/login");

const loginRoute = express.Router();

loginRoute.route("/login").post(loginController);

module.exports = loginRoute;
