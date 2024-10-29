import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = async () => {
  try {
   
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Error connecting mongoDB with database", err.message);
  }
};

export default Connection;
