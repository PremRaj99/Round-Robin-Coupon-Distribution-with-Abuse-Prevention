import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export default async function verifyJWT(req, res, next) {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decodedToken;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      // Token is invalid
      next(new ApiError(401, "Invalid access token"));
    } else if (error.name === "TokenExpiredError") {
      // Token has expired
      next(new ApiError(401, "Access token has expired"));
    } else {
      // Generic error
      next(new ApiError(500, "Something went wrong in JWT verification"));
    }
  }
}