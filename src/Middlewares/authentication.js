const jwt = require("jsonwebtoken");
const Role = require("../Models/roleModel");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      status: "fail",
      message: "Missing authorization header",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const role = await Role.findById(decodedToken.role);
    req.userId = decodedToken.userId;
    req.role = role.role;
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "Invalid Token",
    });
  }
};

function checkRole(roles) {
  return async (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }
    next();
  };
}

module.exports = { authenticate, checkRole };
