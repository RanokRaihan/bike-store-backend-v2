import mongoose from "mongoose";
import { db_name, mongodb_uri } from "../config";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${mongodb_uri}/${db_name}`);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};
