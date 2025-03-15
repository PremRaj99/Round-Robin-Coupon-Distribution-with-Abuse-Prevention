import Coupon from "../models/coupon.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createCoupon = asyncHandler(async (req, res, next) => {
  const {
    couponCode,
    discount,
    minPurchaseAmount,
    maxUsage,
    expiresOn,
    status,
    allowedUsers,
    blacklistedUsers,
    allowedMultipleUsage,
    isGlobal,
  } = req.body;

  const coupon = await Coupon.create({
    couponCode,
    discount,
    minPurchaseAmount,
    maxUsage,
    expiresOn,
    status,
    allowedUsers,
    blacklistedUsers,
    allowedMultipleUsage,
    isGlobal,
  });

  res
    .status(201)
    .json(new ApiResponse(201, coupon, "Coupon created successfully"));
});

export const getAllCoupons = asyncHandler(async (req, res, next) => {
  const coupons = await Coupon.find({ isDeleted: false });

  res.status(200).json(new ApiResponse(200, coupons, "All coupons"));
});

export const validateCoupon = asyncHandler(async (req, res, next) => {
  const { couponCode } = req.body;

  const coupon = await Coupon.findOne({
    couponCode,
    status: "active",
    isDeleted: false,
  });

  if (!coupon) {
    return next(new ApiError(404, "Coupon not found"));
  }

  res.status(200).json(new ApiResponse(200, coupon, "Coupon details"));
});

export const getCouponById = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ApiError(404, "Coupon not found"));
  }

  res.status(200).json(new ApiResponse(200, coupon, "Coupon details"));
});

export const updateCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ApiError(404, "Coupon not found"));
  }

  const {
    couponCode,
    discount,
    minPurchaseAmount,
    maxUsage,
    expiresOn,
    status,
    allowedUsers,
    blacklistedUsers,
    allowedMultipleUsage,
    isGlobal,
  } = req.body;

  coupon.couponCode = couponCode;
  coupon.discount = discount;
  coupon.minPurchaseAmount = minPurchaseAmount;
  coupon.maxUsage = maxUsage;
  coupon.expiresOn = expiresOn;
  coupon.status = status;
  coupon.allowedUsers = allowedUsers;
  coupon.blacklistedUsers = blacklistedUsers;
  coupon.allowedMultipleUsage = allowedMultipleUsage;
  coupon.isGlobal = isGlobal;

  await coupon.save();

  res
    .status(200)
    .json(new ApiResponse(200, coupon, "Coupon updated successfully"));
});

export const deleteCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ApiError(404, "Coupon not found"));
  }

  coupon.isDeleted = true;

  await coupon.save();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Coupon deleted successfully"));
});
