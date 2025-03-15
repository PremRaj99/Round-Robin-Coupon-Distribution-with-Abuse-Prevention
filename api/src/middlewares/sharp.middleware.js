import sharp from "sharp";
import { ApiError } from "../utils/ApiError.js";

const processImages = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next();
  }

  try {
    const { width, height } = req.query;
    if (!width || !height) {
      return next();
    }
    const processPromises = Object.keys(req.files).map(async (key) => {
      const file = req.files[key][0]; // Only single file per key

      if (file.mimetype.startsWith("image/")) {
        const processedImage = await sharp(file.buffer)
          .resize({ width: width, height: height }) // Resize to 300x300
          .toFormat("jpeg") // Convert to JPEG
          .jpeg({ quality: 80 }) // 80% quality
          .toBuffer();

        file.buffer = processedImage; // Replace original buffer
      }
    });

    await Promise.all(processPromises);
    next();
  } catch (error) {
    throw new ApiError(500, "Error processing images");
  }
};

export default processImages;
