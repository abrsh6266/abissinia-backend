// seeder/starSeeder.ts
import mongoose from "mongoose";
import Star from "../models/Star"; // Adjust the path as necessary
import { stars } from "./starData"; // Adjust the path as necessary

const seedStars = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Abrsh:abrsha159753@task-manager.yedy7op.mongodb.net/?retryWrites=true&w=majority&appName=Task-manager"
    );

    await Star.deleteMany(); // Clear existing stars if needed

    for (const starData of stars) {
      const newStar = new Star(starData);
      await newStar.save();
    }

    console.log("All stars have been seeded.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding stars:", error);
    mongoose.connection.close();
  }
};

seedStars();
