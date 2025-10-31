import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
// || "mongodb://localhost:27017/mafia-game"
const EMAIL_USER = process.env.EMAIL_USER || "your_email@example.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "your_email_password";
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRE || "7d";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASS = process.env.ADMIN_PASS;
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_KEY = process.env.CLOUD_KEY;
const CLOUD_SECRET = process.env.CLOUD_SECRET;

export default {
  PORT,
  MONGO_URI,
  EMAIL_USER,
  EMAIL_PASS,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ADMIN_EMAIL,
  ADMIN_PASS,
  CLOUD_NAME,
  CLOUD_KEY,
  CLOUD_SECRET,
};
