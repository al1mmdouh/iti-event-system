const { request } = require("express");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, "mySecretKey");

  next();
};
