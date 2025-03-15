import mongoose from "mongoose";

const CouponDistributionSchema = new mongoose.Schema({
  couponId: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedAt: { type: Date, default: Date.now },
  isRedeemed: Boolean,
  redeemedAt: Date,
  abuseFlag: Boolean,
});

const CouponDistribution = mongoose.model(
  "CouponDistribution",
  CouponDistributionSchema
);

export default CouponDistribution;
