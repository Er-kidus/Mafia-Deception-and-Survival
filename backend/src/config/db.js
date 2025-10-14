import mongoose from "mongoose";
import config from "./config.js";

export const connection = async () => {
  try {
    const con = await mongoose.connect(config.MONGO_URI);
    console.log("✔️ Successfully connected to the Database");
  } catch (error) {
    console.log("❌ Failed to connect to the mongo DB");
  }
};
