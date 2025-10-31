import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { uploadToCloudinary } from "../middleware/uploadMiddleware.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

export const registration = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "❌ Email already registered. Please use a different email.",
      });
    }
    const user = await User.create({ username, email, password });

    const token = generateToken(user);

    res.status(201).json({
      message: "✔️ User Registered successfully",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "❌ User not Found",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "❌ Invalid Credentials" });
    }
    const token = generateToken(user);

    res.status(200).json({
      message: "✔️ User found successfully.",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "❌ User not Found",
      });
    }
    const resetToken = user.genResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `http://localhost:8080/api/auth/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Password Reset Request",
      `Reset your password using this link: ${resetURL}`
    );

    res.status(200).json({
      message: "Reset link sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Invalid or missing token." });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Old password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.error("[changePassword] Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user;
    const { username, email, nickname } = req.body;

    const updatedUserData = {};
    if (username) updatedUserData.username = username;
    if (email) updatedUserData.email = email;
    if (nickname) updatedUserData.nickname = nickname;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "users");
      updatedUserData.avatar = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  registration,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  updateProfile,
};
