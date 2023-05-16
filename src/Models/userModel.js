const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "student",
  },
});

// is exist + role

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

User.validateIdsRole = async (ids, role) => {
  const id = ids.map((id) => mongoose.Types.ObjectId(id));
  const students = await User.find({
    _id: { $in: id },
    role,
  });
  if (students.length !== ids.length) {
    return res.status(401).json({
      status: "fail",
      message: `Invalid ${role}s`,
    });
  }
  return true;
};

module.exports = User;
