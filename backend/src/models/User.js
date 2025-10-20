import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import crypto from "crypto";
import { type } from "os";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "A user should have a username"],
      min: [4, "A username should be greater than 4"],
      max: [10, "A username should be less than 10"],
    },

    nickname: {
      type: String,
      default: function () {
        const coolNames = [
          "ShadowHunter",
          "NightWolf",
          "BlazePhoenix",
          "IronFang",
          "MysticRaven",
          "ThunderStrike",
          "LunarEclipse",
          "CrimsonViper",
          "FrostDragon",
          "StormBreaker",
        ];
        return coolNames[Math.floor(Math.random() * coolNames.length)];
      },
      trim: true,
      required: [true, "A user should have a nickname"],
      min: [4, "A nickname should be greater than 4"],
      max: [10, "A nickname should be less than 10"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please provide a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    avatarUrl: {
      type: String,
      default:
        "https://tse1.mm.bing.net/th/id/OIP.WafwdUOq5b5T7RVq_rUJoQHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.genResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 60 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
