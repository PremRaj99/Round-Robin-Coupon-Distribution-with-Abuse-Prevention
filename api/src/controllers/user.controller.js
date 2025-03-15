import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const userInfo = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json(new ApiResponse(200, user, "User details"));
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({ isDeleted: false });

  res.status(200).json(new ApiResponse(200, users, "All users"));
});

export const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  res.status(200).json(new ApiResponse(200, user, "User details"));
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    return next(new ApiError(400, "Old password is incorrect"));
  }

  user.password = newPassword;

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  const { fullName, email, role } = req.body;

  user.fullName = fullName;
  user.email = email;
  if (req.role === "admin") user.role = role;

  await user.save();

  res.status(200).json(new ApiResponse(200, null, "User updated successfully"));
});
