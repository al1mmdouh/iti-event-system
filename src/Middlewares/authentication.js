const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    const decodedToken = await jwt.verify(token, "mySecretKey");
  } catch (error) {
    next(error);
  }
  next();
};

module.exports = auth;
