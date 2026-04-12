import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["8.8.8.8","1.1.1.1"]);
const MONGO_URI = process.env.MONGO_URI!;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to db");
  } catch (err) {
    console.error("Error connecting:", err);
  }
};