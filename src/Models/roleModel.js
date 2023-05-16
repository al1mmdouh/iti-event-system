const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    unique: true,
    enum: ["admin", "student", "speaker"],
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
