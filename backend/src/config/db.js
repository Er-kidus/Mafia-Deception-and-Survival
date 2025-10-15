import mongoose from "mongoose";
import config from "./config.js";

export const connection = async () => {
  try {
    const con = await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✔️ Successfully connected to the Database");
  } catch (error) {
    console.error("❌ Failed to connect to the mongo DB:");
    console.error(error.message); // This shows the actual reason
  }
};
