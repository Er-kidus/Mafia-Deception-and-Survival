import mongoose from "mongoose";
import User from "../src/models/User.js";
import config from "../src/config/config.js";
async function seedAdmin() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check for existing admin
    const existingAdmin = await User.findOne({ email: config.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Create new admin user
    const adminUser = new User({
      username: "System Administrator",
      email: config.ADMIN_EMAIL,
      password: config.ADMIN_PASS,
      role: "admin",
    });

    await adminUser.save();

    console.log("🎉 Admin user created successfully!");
    console.log(`📧 Email: ${config.adminEmail}`);
    console.log(`🔑 Password: ${config.adminPassword}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
