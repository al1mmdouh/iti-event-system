// role.controller.js
const Role = require("../Models/role");

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

module.exports = createRole;
