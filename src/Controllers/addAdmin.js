const Role = require("./../Models/roleModel");
const User = require("./../Models/userModel");

const addAdminUser = async () => {
  try {
    // Check if the admin role exists, and create it if it doesn't
    let adminRole = await Role.findOne({ role: "admin" });
    if (!adminRole) {
      adminRole = await Role.create({ role: "admin" });
    }

    // Create the admin user
    const adminUser = new User({
      fullname: "Admin User",
      email: "admin@admin.com",
      password: "Admin123",
      role: adminRole._id,
    });

    // Save the admin user to the database
    await adminUser.save();

    console.log("Admin user created successfully:", adminUser);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

addAdminUser();

