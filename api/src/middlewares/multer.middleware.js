import multer from "multer";
import uploadOnS3 from "../utils/fileUpload.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Multer config (Memory Storage)
const upload = multer({ storage: multer.memoryStorage() });

const uploadFilesToS3 = asyncHandler(async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return next();
    }

    const uploadPromises = Object.keys(req.files).map(async (key) => {
      const file = req.files[key][0];
      if (file) {
        const fileUrl = await uploadOnS3(file);
        req.body[key] = fileUrl; // Store file URL in request body
      }
    });

    await Promise.all(uploadPromises);
    next();
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message || "Error in uploading files");
  }
});

export { upload, uploadFilesToS3 };
