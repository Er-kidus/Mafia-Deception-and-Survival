import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../utils/cloudinary.js";
const storage = multer.memoryStorage();

// Multer middleware
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/pjpeg",
      "image/x-png",
      "image/avif",
      "image/gif",
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "Only image files are allowed!"
      );
      cb(error);
    }
  },
});

export const uploadToCloudinary = async (fileBuffer, folder = "users") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};
