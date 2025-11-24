import User from "../models/User";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
  const email = "admin@example.com"; // You can change this

  const existingAdmin = await User.findOne({ email });

  if (!existingAdmin) {
    const hashed = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email,
      password: hashed,
      role: "admin"
    });

    console.log("✔ Default admin created:");
    console.log("   Email: admin@example.com");
    console.log("   Password: admin123");
  } else {
    console.log("✔ Admin already exists");
  }
};
