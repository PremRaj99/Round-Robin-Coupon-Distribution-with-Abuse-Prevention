import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    couponCode: { type: String, unique: true },
    discount: Number,
    minPurchaseAmount: Number,
    maxUsage: Number,
    usageCount: {
      type: Number,
      default: 0,
    },
    expiresOn: Date,
    status: { type: String, enum: ["active", "expired", "disabled"] },
    allowedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    blacklistedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    allowedMultipleUsage: Boolean,
    isGlobal: Boolean,
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model("Coupon", CouponSchema);

export default Coupon;
