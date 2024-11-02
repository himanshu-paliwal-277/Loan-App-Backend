import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MongoDB_URL = process.env.DB_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(MongoDB_URL);
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("Error connecting to database");
    console.log(error);
  }
};
