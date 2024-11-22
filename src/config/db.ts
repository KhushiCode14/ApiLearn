import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    // Add event listeners
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB...");
    });

    mongoose.connection.on("error", (error) => {
      console.error("Failed to connect to MongoDB...", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connection lost...");
    });

    // Connect to MongoDB
    await mongoose.connect(config.databaseUrl as string);
    console.log("MongoDB connection established successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
