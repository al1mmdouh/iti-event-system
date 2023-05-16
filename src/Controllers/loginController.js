const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

// speaker login --> x
// more generalized --> after login
// make table users with email and password
//with reference to every collection
//--> admin, student, speaker

const login = async (req, res, next) => {
  let user;
  const { email, password } = req.body;
  try {
    user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Not Authenticated",
      });
    }
    let token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
