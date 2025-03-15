import mongoose from "mongoose";

const AbuseReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  couponId: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
  reason: String,
  reportedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "reviewed", "actionTaken"] },
});

const AbuseReport = mongoose.model("AbuseReport", AbuseReportSchema);

export default AbuseReport;
