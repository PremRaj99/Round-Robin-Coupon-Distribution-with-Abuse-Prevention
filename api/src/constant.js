import dotenv from "dotenv";
import path from "path";

const __dirname = path.resolve();
const DevEnvPath = path.resolve(__dirname, "./.env.development");
const ProdEnvPath = path.resolve(__dirname, "./.env.production");

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ProdEnvPath : DevEnvPath,
});

export const NODE_ENV = process.env.NODE_ENV || "development";

export const PORT = process.env.PORT || 3000;
export const DB_NAME = process.env.DB_NAME || "api";
export const MONGO =
  `${process.env.MONGO}/${DB_NAME}?retryWrites=true&w=majority` ||
  `mongodb://localhost:27017/${DB_NAME}`;

// ------------------ FRONTEND AND BACKEND ------------------
export const CORS_ORIGIN =
  process.env.CORS_ORIGIN || "http://localhost:" + PORT;
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:" + PORT;
export const BASE_URL = process.env.BASE_URL || "http://localhost:" + PORT;

// ------------------ JWT ------------------
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
