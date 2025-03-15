import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { options } from "../utils/cookieOption.js";
import createSlug from "../utils/createSlug.js";

const generateAccessAndRefreshTokens = asyncHandler(async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh token"
    );
  }
});

export const signup = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  const username = createSlug(fullName);

  const isUserExist = await User.findOne({ email }).select("email").lean();

  if (isUserExist) {
    throw new ApiError(400, "User already exists with this email");
  }

  const user = await User.create({
    fullName,
    username,
    email,
    password,
    role: "user",
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  res
    .status(201)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        201,
        { accessToken, refreshToken },
        "User created successfully"
      )
    );
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password").lean();

  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  res
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, { accessToken, refreshToken }, "Login successful")
    );
});
