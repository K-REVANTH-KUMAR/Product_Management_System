const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const adminEmail = "admin@example.com";
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin account already exists");
        } else {
            const hashedPassword = await bcrypt.hash("Admin@123", 10);

            await User.create({
                name: "Project Admin",
                email: adminEmail,
                password: hashedPassword,
                role: "admin"
            });

            console.log("Admin account created");
            console.log("Email: admin@example.com");
            console.log("Password: Admin@123");
            console.log("Change this demo password before using the project outside local practice.");
        }

        await mongoose.disconnect();
    } catch (error) {
        console.log("Admin setup failed:", error.message);
        process.exitCode = 1;
    }
}

createAdmin();
