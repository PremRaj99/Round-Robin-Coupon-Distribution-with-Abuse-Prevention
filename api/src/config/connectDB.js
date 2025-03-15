import mongoose from "mongoose";
import { MONGO } from "../constant.js";

const connectDB = async () => {
  try {
    console.log(MONGO)
    const conn = await mongoose.connect(MONGO);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;