const Speaker = require("../Models/userModel");
const jwt = require("jsonwebtoken");

// speaker login --> x
// more generalized --> after login
// make table users with email and password
//with reference to every collection
//--> admin, student, speaker

const login = async (req, res, next) => {
  let user, role;
  const { email, password } = req.body;
  try {
    user = await Speaker.findOne({ email });
    if (user) {
      role = "speaker";
    }
    // else {
    //   user = await Student.findOne({ email });
    //   if (user) {
    //     role = "student";
    //   } else {
    //     user = await Admin.findOne({ email });
    //     if (admin) {
    //       role = "admin";
    //     } else {
    //     }
    //   }
    // }

    // const speaker = await Speaker.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Not Authenticated",
      });
    }
    let token = jwt.sign(
      {
        id: user._id,
        role,
      },
      "mySecretKey",
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
