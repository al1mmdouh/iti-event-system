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

const createRole = async () => {
  try {
    const adminRole = await Role.create({ id: 1, role: "admin" });
    const studentRole = await Role.create({ id: 2, role: "student" });
    const speakerRole = await Role.create({ id: 3, role: "speaker" });
    console.log(
      "Roles created successfully:",
      adminRole,
      studentRole,
      speakerRole
    );
  } catch (error) {
    console.error("Error creating roles:", error);
  }
};

createRole();

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
